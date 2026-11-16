# Changelog

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
