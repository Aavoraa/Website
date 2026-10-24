"""Prepare client logos (from the AAVORAA portfolio deck, slide 22) for the Clients section.

- Deck "tile" images (logo + name on a dark brown tile) are keyed to transparent and cropped to the logo graphic.
- Logos with white lettering are recoloured to dark ink so they read on the white logo cards.
- Output: public/clients/<slug>.png (trimmed, transparent where possible, max 160px tall).

Usage: python scripts/make_client_logos.py "<deck>/ppt/media" public/clients
"""
import os
import sys
import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
INK = np.array([42, 36, 32], np.float32)  # dark ink for white lettering

# file, slug, mode ('tile' = dark deck tile, 'png' = logo file), recolour white lettering?
LOGOS = [
    ('image9.jpg', 'nova-pinnacle', 'tile', False),
    ('image10.jpg', 'i-cons-technologies', 'tile', True),
    ('image11.jpg', 'v3-data-solutions', 'tile', False),
    ('image12.jpg', 'ramani-cars', 'tile', False),
    ('image13.jpg', 'ibm', 'tile', False),
    ('image14.jpg', 'rubfila-international', 'tile', False),
    ('image15.jpg', 'sundaram-motors', 'tile', False),
    ('image16.jpg', 'klassy-homes', 'tile', False),
    ('image17.jpg', 'kpr-mill', 'tile', False),
    ('image18.jpg', 'coliseum-sports', 'tile', False),
    ('image19.jpg', 'morris-garages', 'tile', False),
    ('image21.png', 'taqua-silks', 'png', False),
    ('image22.png', 'essa-garments', 'png', False),
    ('image23.png', 'pothys', 'png', False),
    ('image24.png', 'holy-sai-international-school', 'png', False),
    ('image25.png', 'fairway-heritage-group', 'png', False),
    ('image26.png', 'follow-up-media', 'png', True),
    ('image27.jpeg', 'harvey-norman', 'png', False),
    ('image28.png', 'osg-connect', 'png', False),
    ('image29.png', 'mahogany-millworks', 'png', False),
    ('image30.png', 'property-wealth', 'png', True),
    ('image31.png', 'maxcorp', 'png', False),
    ('image33.png', 'oceans-talent', 'png', False),
    ('image34.png', 'prisms-group', 'png', False),
    ('image35.png', 'lucas-health-tech', 'png', True),
    ('image36.png', 'hedge-effective-advisory', 'png', True),
    ('image37.png', 'signalverified', 'png', False),
    ('image40.jpeg', 'itp', 'png', False),
    ('image41.png', 'greens-property-developers', 'png', False),
]


def recolour_white(arr):
    rgb = arr[:, :, :3].astype(np.float32)
    lum = rgb.mean(axis=2)
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    white = np.clip((lum - 170) / 60, 0, 1) * (sat < 40)
    rgb = rgb * (1 - white[..., None]) + INK * white[..., None]
    arr[:, :, :3] = rgb.astype(np.uint8)
    return arr


def trim(img, pad=4):
    a = np.array(img)[:, :, 3]
    ys, xs = np.where(a > 12)
    if not len(xs):
        return img
    return img.crop((max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad + 1, img.width), min(ys.max() + pad + 1, img.height)))


for fname, slug, mode, white_ink in LOGOS:
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        print('missing', fname)
        continue
    im = Image.open(path).convert('RGBA')
    arr = np.array(im)
    if mode == 'tile':
        rgb = arr[:, :, :3].astype(np.float32)
        border = np.concatenate([rgb[:3].reshape(-1, 3), rgb[-3:].reshape(-1, 3), rgb[:, :3].reshape(-1, 3), rgb[:, -3:].reshape(-1, 3)])
        bg = np.median(border, axis=0)
        dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
        alpha = np.clip((dist - 22) / 28, 0, 1)
        arr[:, :, 3] = (alpha * 255).astype(np.uint8)
        # keep only the first (left-most) cluster of columns = the logo graphic; drop the name text beside it
        cols = (alpha > 0.5).any(axis=0)
        xs = np.where(cols)[0]
        if len(xs):
            start = xs[0]
            end = start
            gap = 0
            for x in range(start, len(cols)):
                if cols[x]:
                    end = x
                    gap = 0
                else:
                    gap += 1
                    if gap > 16:
                        break
            arr[:, end + 1:, 3] = 0
    if white_ink:
        arr = recolour_white(arr)
    out = trim(Image.fromarray(arr))
    if out.height > 160:
        out.thumbnail((10_000, 160), Image.LANCZOS)
    out.save(os.path.join(OUT, slug + '.png'), optimize=True)
    print(slug, out.size)
