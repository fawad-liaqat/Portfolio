# Changelog

## Phase 4: light mode and voice edits (17 November 2026)

Light mode
- A sun or moon button in the header (and a labelled one in the phone menu)
  switches between dark and light. Dark stays the default.
- The light theme overrides the same CSS tokens under `[data-theme="light"]`
  on `<html>`. Every text colour passes WCAG AA in both themes; the checked
  ratios are noted in `styles/globals.css`.
- The choice is kept in the visitor's own browser (localStorage, key
  `theme`). If storage is blocked, the theme still changes for that visit.
  The system colour setting is not followed: with nothing saved, the site
  opens dark.
- A small inline script in `<head>` (see `lib/theme.ts`) applies the saved
  theme before the first paint, so there is no flash on reload. It also sets
  the browser bar colour.
- With JavaScript off the page is dark and the buttons are not shown.
- Printing always uses the light colours.

Copy edits (owner's voice feedback)
- Hero status line now reads as an education line, without "student".
- AwaazOnboard summary names the team size and Fawad's role. The featured
  card now shows its whole summary.
- Connect intro invites feedback and other views.
- Training: "EAG Associate, 2026 cohort", now that the programme is complete.

Still open
- Everything listed as open under phase 3.

## Phase 3: "Signal" dark restyle (17 November 2026)

The light editorial look was rejected as too basic. The site is now dark and
precise, with calm motion and detail that opens when asked for. Structure and
data from phase 2 are kept. The light style is in git history (commit fcc50d6).

What changed
- `styles/globals.css` rewritten for the dark palette: near black blue
  background, one raised surface, one teal accent, amber for key figures.
  Fonts are Space Grotesk, Inter and IBM Plex Mono from the same Google Fonts
  link.
- Hero is short: label, headline, one sentence, status line, two buttons, with
  the stack diagram beside it.
- The stack diagram is now interactive. Each layer is a rail: Identity is a
  steady line, Payments has pulses moving along it, Data sharing is dashed.
  Choosing a layer (hover, tap or arrow keys) shows what exists in Pakistan
  and the projects on it. It is built from radio buttons and CSS, so it works
  without JavaScript. The inline SVG from phase 2 was replaced by HTML and CSS
  so text stays readable on phones. `data/stack.ts` gained `state`, `badge`
  and `note`. The data sharing layer shows "Part 3 of the series, in progress".
- Key figures count up once when they scroll into view. The final values are
  in the HTML.
- Less text on the page. Project cards show the first sentence or two of the
  summary, with the rest behind "Details". Research rows show the title, with
  the description behind "Summary". About is four tiles, with the three
  paragraphs behind "Read more". Training and Connect are compact tiles.
- Research categories now use the same scheme as projects: Payments, Digital
  currency, Regulation and AI. Titles and descriptions are unchanged.
- New `components/portfolio/Enhancements.tsx`: scroll reveal, count up,
  Escape to close an open disclosure, opening a card from a diagram link, and
  pausing the rail pulses when the diagram is off screen.
- Motion is CSS first and switches off under reduced motion. With JavaScript
  off, all content is visible and every disclosure still opens.
- `public/og.png`, `app/icon.svg` and the browser theme colour match the dark
  palette.

Still open
- Everything under "Still open" in phase 2 except the data sharing wording.
- Disclosures animate open in recent Chrome and Edge. Other browsers open
  them at once, without the animation.
- The diagram panel switch needs a browser that supports `:has()` in CSS
  (2023 or later). Older browsers show all three panels.
- Check on a real mid range Android phone, and with the real Google Fonts.

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
