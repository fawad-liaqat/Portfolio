"""
Makes one share image (1200x630) per published series part:
public/og/series-part-N.png. Same look as public/og.png (scripts/make-og.py).

How to rerun (from the repo root, normal user, no admin rights needed),
after a part's title or finding changes, or a new part is added:

    python scripts/make-series-og.py

Reads: the first heading of content/series/partN/brief.md (title) and the
`finding` for that part in data/series.ts. Writes only public/og/*.png.
Needs Python with `playwright` and Google Chrome (set CHROME_PATH if Chrome
is not at /usr/bin/google-chrome). Fonts load from Google Fonts; on a
machine without internet, set OG_FONT_CSS to a CSS file with @font-face
rules for Space Grotesk, Inter and IBM Plex Mono.
"""
import html
import os
import re
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SERIES_TS = (ROOT / "data" / "series.ts").read_text(encoding="utf-8")
SITE_TS = (ROOT / "data" / "site.ts").read_text(encoding="utf-8")
OUT = ROOT / "public" / "og"
OUT.mkdir(parents=True, exist_ok=True)

name = re.search(r'^\s*name:\s*"([^"]*)"', SITE_TS, re.M).group(1)
total = len(re.findall(r"^\s*number:\s*\d+,", SERIES_TS, re.M))


def finding(n: int) -> str:
    """The `finding` string of part n in data/series.ts, or "" if none."""
    blocks = re.split(r"\n\s*\{\s*\n\s*number:\s*", SERIES_TS)
    for b in blocks[1:]:
        if b.startswith(f"{n},"):
            m = re.search(r'finding:\s*"((?:[^"\\]|\\.)*)"', b)
            return m.group(1) if m else ""
    return ""


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


def page(n: int, title: str, find: str) -> str:
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>
  * {{ box-sizing: border-box; margin: 0; }}
  body {{ width: 1200px; height: 630px; background: #070B14; color: #EEF3FA;
         padding: 64px 80px; display: flex; flex-direction: column;
         background-image:
           linear-gradient(rgba(151,173,214,.10) 1px, transparent 1px),
           linear-gradient(90deg, rgba(151,173,214,.10) 1px, transparent 1px);
         background-size: 60px 60px; }}
  .top {{ display: flex; justify-content: space-between; align-items: center;
          font: 600 28px "Space Grotesk", Arial, sans-serif; }}
  .name {{ display: flex; align-items: center; gap: 16px; }}
  .name::before {{ content: ""; width: 14px; height: 14px; border-radius: 3px; background: #4FE3C1; }}
  .part {{ font: 500 24px "IBM Plex Mono", monospace; color: #4FE3C1; }}
  h1 {{ font: 600 64px/1.08 "Space Grotesk", Arial, sans-serif; letter-spacing: -0.025em;
        margin-top: auto; text-wrap: balance; }}
  .finding {{ font: 400 28px/1.4 Inter, Arial, sans-serif; color: #A9B6C9; margin-top: 24px;
              max-width: 1000px; }}
  .rail {{ position: relative; height: 2px; margin-top: 36px; background: rgba(79,227,193,.35); }}
  .rail::after {{ content: ""; position: absolute; left: {20 + n * 15}%; top: -2px; width: 120px;
                  height: 6px; border-radius: 6px; background: linear-gradient(90deg, transparent, #4FE3C1); }}
</style></head><body>
  <div class="top"><span class="name">{html.escape(name)}</span>
    <span class="part">Part {n} of {total}</span></div>
  <h1>{html.escape(title)}</h1>
  {f'<p class="finding">{html.escape(find)}</p>' if find else ''}
  <div class="rail"></div>
</body></html>"""


with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=os.environ.get("CHROME_PATH", "/usr/bin/google-chrome"),
        args=["--no-sandbox"],
    )
    tab = browser.new_page(viewport={"width": 1200, "height": 630})
    for n in range(1, total + 1):
        brief = ROOT / "content" / "series" / f"part{n}" / "brief.md"
        if not brief.exists():
            print(f"Part {n}: not published, skipped")
            continue
        title = re.search(r"^#\s+(.+)$", brief.read_text(encoding="utf-8"), re.M).group(1).strip()
        tab.set_content(page(n, title, finding(n)), wait_until="networkidle")
        tab.evaluate("document.fonts.ready")
        tab.wait_for_timeout(300)
        out = OUT / f"series-part-{n}.png"
        tab.screenshot(path=str(out))
        print(f"Wrote {out}")
    browser.close()
