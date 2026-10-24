"""Rebuild the horizontal AAVORAA lockup with a different tagline (set TAGLINE below).

The site currently uses the official artwork ("BEYOND POSSIBILITIES"); this script is only needed if the tagline changes.

The mark and wordmark are untouched; only the separate tagline element of the supplied lockup
("AAVORA LOGO (5).png", 2000x2000) is replaced. The new tagline matches the original's geometry
(cap height 38px, centred under the wordmark, same overall width, Montserrat SemiBold) and its gold gradient.

Usage: python scripts/make_logo_tagline.py "<path to AAVORA LOGO (5).png>" <out.png> [<og out.jpg> <ribbon.webp>]
Requires pillow, numpy, fonttools, brotli.
"""
import io
import sys
import numpy as np
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

TAGLINE = 'BEYOND TECHNOLOGIES'
SRC, OUT = sys.argv[1], sys.argv[2]
FONT_WOFF2 = 'node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2'

# Original tagline geometry (measured on the 2000px source)
TAG_X0, TAG_X1 = 950, 1632           # horizontal extent
TAG_Y0, TAG_Y1 = 1025, 1063          # cap top / baseline (cap height 38px)
CENTER_X = (TAG_X0 + TAG_X1) / 2
GRAD_L = np.array([176, 116, 44], np.float32)    # sampled left colour
GRAD_R = np.array([204, 158, 92], np.float32)    # sampled right colour

# Montserrat SemiBold: woff2 -> in-memory TTF for Pillow
f = TTFont(FONT_WOFF2)
f.flavor = None
buf = io.BytesIO()
f.save(buf)
buf.seek(0)


def render(text, size, tracking):
    font = ImageFont.truetype(io.BytesIO(buf.getvalue()), size)
    widths = [font.getbbox(ch)[2] - font.getbbox(ch)[0] if ch != ' ' else font.getlength(' ') for ch in text]
    adv = [font.getlength(ch) for ch in text]
    total = int(sum(adv) + tracking * (len(text) - 1)) + 20
    img = Image.new('L', (total, size * 2), 0)
    d = ImageDraw.Draw(img)
    x = 10
    for ch, a in zip(text, adv):
        d.text((x, size // 2), ch, font=font, fill=255)
        x += a + tracking
    arr = np.array(img)
    ys, xs = np.where(arr > 10)
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


# find a font size whose cap height is 38px, then tracking so the width matches the original
cap = TAG_Y1 - TAG_Y0 + 1
size = 40
for _ in range(40):
    h = render('B', size, 0).size[1]
    if h == cap:
        break
    size += 1 if h < cap else -1
lo, hi = 0.0, 60.0
for _ in range(30):
    mid = (lo + hi) / 2
    w = render(TAGLINE, size, mid).size[0]
    lo, hi = (mid, hi) if w < (TAG_X1 - TAG_X0 + 1) else (lo, mid)
mask = render(TAGLINE, size, (lo + hi) / 2)

# gold gradient fill
mw, mh = mask.size
t = np.linspace(0, 1, mw, dtype=np.float32)[None, :, None]
rgb = GRAD_L[None, None] * (1 - t) + GRAD_R[None, None] * t
rgb = np.repeat(rgb, mh, axis=0)
tag = np.dstack([rgb, np.array(mask, np.float32)]).astype(np.uint8)
tag_img = Image.fromarray(tag, 'RGBA')

# replace the old tagline on the source lockup
src = Image.open(SRC).convert('RGBA')
arr = np.array(src)
arr[1000:, 900:, 3] = 0
base = Image.fromarray(arr)
base.alpha_composite(tag_img, (int(round(CENTER_X - mw / 2)), TAG_Y0))

a = np.array(base)[:, :, 3]
ys, xs = np.where(a > 8)
lockup = base.crop((xs.min() - 6, ys.min() - 6, xs.max() + 7, ys.max() + 7))
lockup.thumbnail((1200, 1200), Image.LANCZOS)
lockup.save(OUT, optimize=True)
print('lockup', lockup.size, 'font size', size)

# optional: social sharing image
if len(sys.argv) > 4:
    og_out, ribbon = sys.argv[3], sys.argv[4]
    im = Image.open(ribbon).convert('RGB')
    w, h = im.size
    ch = int(w * 630 / 1200)
    og = im.crop((0, h - ch, w, h)).resize((1200, 630), Image.LANCZOS).convert('RGBA')
    logo = lockup.copy()
    logo.thumbnail((600, 190), Image.LANCZOS)
    og.alpha_composite(logo, ((1200 - logo.size[0]) // 2, 120))
    og.convert('RGB').save(og_out, quality=86)
    print('og', og_out)
