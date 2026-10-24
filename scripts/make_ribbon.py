"""Render the static fallback for the hero ribbon (mirrors the vertex shader in src/scripts/hero-wave.ts).

Usage: python scripts/make_ribbon.py <out.webp> <width> <height> [light]
(light: gold "ink" on Soft Ivory, matching the light theme)
Requires numpy, pillow and opencv-python-headless.
"""
import sys
import numpy as np
import cv2
from PIL import Image

out, W, H = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
light = len(sys.argv) > 4 and sys.argv[4] == 'light'
aspect = W / H
mobile = aspect < 1  # portrait renders use the mobile framing (matches canvas width < 700px in the browser)
SS = 2  # supersample
w2, h2 = W * SS, H * SS
acc = np.zeros((h2, w2, 3), np.float32)

LINES, SAMPLES = 72, 2600
t = 9.0
gold = np.array([0.788, 0.584, 0.290], np.float32)
hot = np.array([1.0, 0.88, 0.66], np.float32)
deep = np.array([0.55, 0.36, 0.14], np.float32)


def smoothstep(a, b, x):
    x = np.clip((x - a) / (b - a), 0, 1)
    return x * x * (3 - 2 * x)


layers = [
    dict(seed=2.3, width=1.1, yoff=-0.46, scale=0.94, bright=0.34),
    dict(seed=0.0, width=0.74, yoff=-0.6, scale=1.0, bright=0.8),
]
u = np.linspace(-1, 1, SAMPLES).astype(np.float32)
for L in layers:
    yoff = L['yoff'] + (-0.16 if mobile else 0)
    scale = L['scale'] * (1.25 if mobile else 1)
    for li in range(LINES):
        v = li / (LINES - 1)
        s = L['seed']
        x = u * 1.95
        base = 0.2 * np.sin(u * 2.1 + t * 0.42 + s) + 0.08 * np.sin(u * 4.3 - t * 0.55 + s * 2) + 0.08 * u
        a = u * 1.75 + t * 0.32 + 0.9 * np.sin(u * 1.2 - t * 0.23 + s)
        w = L['width'] * (0.72 + 0.28 * np.sin(u * 2.7 + t * 0.3 + s))
        o = (v - 0.5) * w
        py, pz = base + o * np.cos(a), o * np.sin(a)
        zc = 2.3 - pz
        ys = np.clip(aspect, 0.9, 2.0)
        nx = x * 1.42 / zc * scale
        ny = py * 1.42 / zc * ys * scale + yoff
        ends = 1 - smoothstep(0.72, 1.0, np.abs(u))
        across = 0.45 + 0.35 * np.sin(np.pi * v) + 0.9 * abs(2 * v - 1) ** 12
        pulse = np.exp(-((((u * 0.5 + 0.5 - t * 0.07) % 1.0) - 0.5) ** 2) / 0.004)
        alpha = (0.19 + 0.34 * pulse) * ends * across * L['bright']
        col = deep[None] * (1 - smoothstep(-0.9, 0.2, u))[:, None] + gold[None] * smoothstep(-0.9, 0.2, u)[:, None]
        col = col * (1 - np.clip(pulse * 0.8, 0, 1))[:, None] + hot[None] * np.clip(pulse * 0.8, 0, 1)[:, None]
        px = ((nx + 1) * 0.5 * w2).astype(np.int32)
        pyy = ((1 - (ny + 1) * 0.5) * h2).astype(np.int32)
        ok = (px >= 0) & (px < w2) & (pyy >= 0) & (pyy < h2)
        # sample density ~ 1 px; scale alpha to match a 1px GL line
        np.add.at(acc, (pyy[ok], px[ok]), (col * alpha[:, None])[ok] * 1.4)

acc = cv2.resize(acc, (W, H), interpolation=cv2.INTER_AREA) * SS
glow = cv2.GaussianBlur(acc, (0, 0), sigmaX=W / 90)
if light:
    # subtractive "ink": remove the complement of the line colour from Soft Ivory (mirrors the shader)
    lum = acc.mean(axis=2, keepdims=True)
    ink = np.array([0.043, 0.090, 0.173], np.float32)[None, None]  # ivory minus champagne (#E9D9BC)
    dens = lum * 4.5 + cv2.GaussianBlur(lum, (0, 0), sigmaX=W / 90)[..., None] * 2.0
    img = np.array([244, 240, 232], np.float32)[None, None] / 255 - ink * dens * 1.6
else:
    img = acc * 1.3 + glow * 2.6
    img = img / (1 + img * 0.4)
    img += np.array([10, 9, 9], np.float32)[None, None] / 255
img = np.clip(img, 0, 1)
Image.fromarray((img * 255).astype(np.uint8)).save(out, quality=84, method=6)
print('saved', out)
