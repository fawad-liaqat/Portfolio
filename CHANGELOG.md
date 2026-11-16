# Changelog

## Phase 2: redesign (16 November 2026)

The site moved from the dark purple look to a light editorial style
("Working Paper"): paper background, ink headings, green links, rust figures,
hairline rules. Content still lives in `data/` and nothing was deleted.

What changed
- `styles/globals.css` rewritten. Colours, fonts and widths are tokens at the
  top of the file. The old stylesheet is in git history.
- Fonts are now Source Serif 4, IBM Plex Sans and IBM Plex Mono, loaded by the
  same Google Fonts link in `app/layout.tsx`.
- The hero canvas animation is replaced by a static diagram of the identity,
  payments and data sharing layers, with current projects pinned to each
  layer. Layer text is in `data/stack.ts`. Pins come from the new `layer`
  field in `data/projects.ts`. The diagram has a wide drawing for desktop, a
  tall one for phones, and a "Read the diagram as text" version with links.
- The hero no longer fills the screen. The key figures start on the first
  screen on a 1280 by 800 desktop.
- New Training section after Research, from `data/credentials.ts`.
- Project cards show a theme tag, status, title, summary, "More detail" and
  "Open the tool". The subtitle moved inside "More detail". A project can now
  carry an optional `keyFigure` (value, label, source). None is set yet.
- Header shows the name as text. The mobile menu sets `aria-expanded`, closes
  on Escape and returns focus to the button. A "Skip to content" link was added.
- Connect is a plain list of links. Footer simplified.
- Social preview image `public/og.png` (made by `scripts/make-og.py`) and a
  favicon `app/icon.svg`. Twitter card is now `summary_large_image`.
- Browser theme colour set to the paper colour.

Kept in the repo, not mounted
- `components/portfolio/NetworkCanvas.tsx`, `components/landing/`,
  `components/ui/`, and the `networkNodes`, `networkEdges` and
  `particleFragments` lists in `data/site.ts` (the unmounted components still
  import them). Their old CSS is gone, so they would need styling to be reused.

Still open
- No project has a `keyFigure` yet. Add one only with a source.
- No project is pinned to the data sharing layer, so the diagram says
  "No project yet" there.
- No filter on project themes. Cards carry a `data-theme` attribute for later.
- Case study pages, Learn section, CV download.
- Raast tracker update to FY26 data.
- Check the live site on a real Android phone and with the real Google Fonts.
  Testing here used local copies of the same fonts.
- The menu button needs JavaScript. Without it, phone users scroll instead.

## Repositioning, phase 1 (16 November 2026)

Positioning moved from "FinTech Infrastructure, Blockchain, Emerging Markets"
to digital public infrastructure, payments and policy:
"Pakistan built the rails. Adoption is the hard part."

What changed
- The landing gate is no longer mounted, so the whole page is in the served
  HTML. `components/landing/` is kept in the repo, unused.
- New title, description, hero and About copy, all in `data/site.ts`.
- Key figures strip now shows four figures from the State Bank of Pakistan
  Payment Systems Review FY26 (provisional), in `data/signals.ts`.
- Every project has a short `summary`; the long text sits behind "More detail".
- Tariff simulator, fraud model and the tariff article are marked
  `archived: true` and listed under "Earlier work" and "Earlier writing".
  Nothing was deleted.
- Overclaims and em dashes removed from project and research text.
- Added canonical URL, Twitter card, Person structured data, `sitemap.xml`.
- Email link is now a plain `mailto:` link.
- Accessibility: higher contrast muted text, visible keyboard focus,
  reduced motion support. Scanline overlay removed.

Not yet done (phase 2)
- Light editorial redesign and the DPI stack diagram.
- Case study pages, Learn section, credentials block, CV download.
- Social preview image.
- Raast tracker update to FY26 data.
