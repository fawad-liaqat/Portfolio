#!/usr/bin/env bash
# Renders the first page of the CV PDF to the image shown on /cv/.
# Run from the site folder after replacing public/cv/Fawad_Liaqat_CV.pdf:
#   bash scripts/make-cv-image.sh
# Needs pdftoppm (poppler) and Python with Pillow. 150 dpi gives 1275 x 1650 pixels for a letter
# page: sharp on phones and laptops, and small enough to load quickly.
set -euo pipefail
cd "$(dirname "$0")/.."
pdftoppm -png -r 150 -f 1 -l 1 -singlefile public/cv/Fawad_Liaqat_CV.pdf public/cv/Fawad_Liaqat_CV
# Reduce to 16 colours: the page is black text with blue links, so this keeps
# it sharp and cuts the file to about a third (needs Python with Pillow).
python3 -c "
from PIL import Image
p = 'public/cv/Fawad_Liaqat_CV.png'
im = Image.open(p).convert('RGB')
im.quantize(colors=16, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(p, optimize=True)
"
ls -l public/cv/Fawad_Liaqat_CV.png
