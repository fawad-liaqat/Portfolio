"""
Makes public/og.png, the 1200x630 social preview image.

How to rerun (from the repo root, normal user, no admin rights needed):

    python scripts/make-og.py

Needs: Python with the `playwright` package and Google Chrome installed.
Set CHROME_PATH if Chrome is not at /usr/bin/google-chrome
(on Windows, for example: C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe).

The text is read from data/site.ts (name, oneliner, tagline), so rerun this
after changing any of those. Fonts load from Google Fonts, so the machine
needs internet access. Without it the image falls back to Georgia and Arial.
On a machine that cannot reach Google, set OG_FONT_CSS to the path of a CSS
file with @font-face rules for the three families and it is used instead.
Nothing other than public/og.png is written to disk.
"""
import html
import os
import re
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = (ROOT / "data" / "site.ts").read_text(encoding="utf-8")
OUT = ROOT / "public" / "og.png"


def field(name: str) -> str:
    """Read a top level string field from data/site.ts."""
    match = re.search(rf'^\s*{name}:\s*"((?:[^"\\]|\\.)*)"', SITE, re.M)
    if not match:
        raise SystemExit(f"Could not find {name} in data/site.ts")
    # site.ts writes the middle dot as \u00B7. Turn such escapes into characters.
    return re.sub(r"\\u([0-9A-Fa-f]{4})", lambda m: chr(int(m.group(1), 16)), match.group(1))

name, headline, tagline = field("name"), field("oneliner"), field("tagline")

FONTS_URL = (
    "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600"
    "&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=block"
)
font_css = os.environ.get("OG_FONT_CSS")
FONTS = (
    f"<style>{Path(font_css).read_text(encoding='utf-8')}</style>"
    if font_css
    else f'<link rel="stylesheet" href="{FONTS_URL}">'
)

PAGE = f"""<!doctype html>
<html><head><meta charset="utf-8">{FONTS}<style>
  * {{ box-sizing: border-box; margin: 0; }}
  body {{ width: 1200px; height: 630px; background: #FAF8F3; color: #14213D;
         padding: 72px 80px; display: flex; flex-direction: column;
         border-top: 14px solid #0B5D4B; }}
  .name {{ font: 500 30px "IBM Plex Sans", Arial, sans-serif; }}
  h1 {{ font: 600 76px/1.1 "Source Serif 4", Georgia, serif;
        letter-spacing: -0.01em; margin-top: auto; text-wrap: balance; }}
  .tagline {{ font: 500 25px "IBM Plex Mono", "Courier New", monospace;
              color: #5B6472; margin-top: 44px; padding-top: 28px;
              border-top: 2px solid #E3DFD5; }}
</style></head><body>
  <p class="name">{html.escape(name)}</p>
  <h1>{html.escape(headline)}</h1>
  <p class="tagline">{html.escape(tagline)}</p>
</body></html>"""

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=os.environ.get("CHROME_PATH", "/usr/bin/google-chrome"),
        args=["--no-sandbox"],
    )
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    page.set_content(PAGE, wait_until="networkidle")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(300)
    page.screenshot(path=str(OUT))
    browser.close()

print(f"Wrote {OUT}")
