"""
Makes public/og.png, the 1200x630 social preview image.

How to rerun (from the repo root, normal user, no admin rights needed):

    python scripts/make-og.py

Needs: Python with the `playwright` package and Google Chrome installed.
Set CHROME_PATH if Chrome is not at /usr/bin/google-chrome
(on Windows, for example: C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe).

The text is read from data/site.ts (name, oneliner, tagline), so rerun this
after changing any of those. Fonts load from Google Fonts, so the machine
needs internet access. Without it the image falls back to Arial.
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
# The second sentence of the headline is drawn in the accent colour.
first, _, second = headline.partition(". ")
first = first + "." if second else first

FONTS_URL = (
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600"
    "&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=block"
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
  body {{ width: 1200px; height: 630px; background: #070B14; color: #EEF3FA;
         padding: 68px 80px; display: flex; flex-direction: column;
         background-image:
           linear-gradient(rgba(151,173,214,.10) 1px, transparent 1px),
           linear-gradient(90deg, rgba(151,173,214,.10) 1px, transparent 1px);
         background-size: 60px 60px; }}
  .name {{ font: 600 30px "Space Grotesk", Arial, sans-serif;
           display: flex; align-items: center; gap: 16px; }}
  .name::before {{ content: ""; width: 14px; height: 14px; border-radius: 3px;
                   background: #4FE3C1; }}
  h1 {{ font: 600 84px/1.04 "Space Grotesk", Arial, sans-serif;
        letter-spacing: -0.03em; margin-top: auto; }}
  h1 span {{ display: block; color: #4FE3C1; }}
  .rail {{ position: relative; height: 2px; margin-top: 44px;
           background: rgba(79,227,193,.35); }}
  .rail::after {{ content: ""; position: absolute; left: 30%; top: -2px;
                  width: 120px; height: 6px; border-radius: 6px;
                  background: linear-gradient(90deg, transparent, #4FE3C1); }}
  .tagline {{ font: 500 24px "IBM Plex Mono", "Courier New", monospace;
              color: #A9B6C9; margin-top: 28px; }}
</style></head><body>
  <p class="name">{html.escape(name)}</p>
  <h1>{html.escape(first)}<span>{html.escape(second)}</span></h1>
  <div class="rail"></div>
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
