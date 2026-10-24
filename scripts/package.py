"""Zip the production build (dist/) for upload to GoDaddy.

Run via `npm run package` (builds first). Creates AAVORAA-website-godaddy.zip in the project root.
Paths use forward slashes so the archive extracts correctly on GoDaddy's Linux servers
(Windows' built-in "Send to > Compressed folder" can produce broken paths there).
"""
import os
import zipfile

OUT = 'AAVORAA-website-godaddy.zip'
if not os.path.isdir('dist'):
    raise SystemExit('dist/ not found - run "npm run build" first')
if os.path.exists(OUT):
    os.remove(OUT)

count = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for root, _dirs, files in os.walk('dist'):
        for name in files:
            full = os.path.join(root, name)
            z.write(full, os.path.relpath(full, 'dist').replace(os.sep, '/'))
            count += 1

print(f'{OUT}: {count} files, {os.path.getsize(OUT) / 1024 / 1024:.1f} MB')
