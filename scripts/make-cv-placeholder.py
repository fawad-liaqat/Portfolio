"""
Makes a temporary placeholder at public/cv/Fawad_Liaqat_CV.pdf so the
"Download CV" links never break. Replace the file with the real CV (same
name) when it is ready; this script is then no longer needed.

How to rerun (from the repo root, normal user, no admin rights needed):

    python scripts/make-cv-placeholder.py

Needs: Python with the `playwright` package and Google Chrome installed.
Set CHROME_PATH if Chrome is not at /usr/bin/google-chrome.
"""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "public" / "cv" / "Fawad_Liaqat_CV.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
  body { font-family: Arial, Helvetica, sans-serif; color: #0F1B2D; margin: 0;
         display: flex; align-items: center; justify-content: center; height: 90vh; }
  h1 { font-size: 30px; margin: 0 0 12px; }
  p { font-size: 15px; color: #3D4A5C; margin: 0; }
</style></head><body><div>
  <h1>Fawad Liaqat</h1>
  <p>CV coming soon. Contact: fawadliaqat666@gmail.com</p>
</div></body></html>"""

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=os.environ.get("CHROME_PATH", "/usr/bin/google-chrome"),
        args=["--no-sandbox"],
    )
    page = browser.new_page()
    page.set_content(PAGE)
    page.pdf(path=str(OUT), format="A4")
    browser.close()

print(f"Wrote {OUT}")
