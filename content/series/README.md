# Series content

Each part of the series lives in its own folder here: `part1/`, `part2/`, and
so on. The site reads these files at build time. The text is not edited in
the site repo; change it at the source and copy it in again.

Files a part needs before it appears as a page:

- `brief.md` the full brief. Its first heading is used as the page title.
- `explainer.md` the plain words version, shown first.
- `sources.md` the source list. Its table rows (`| S1 | ... |`) become the
  numbered Sources list on the page.

Optional:

- A data file (`scorecard.json`, `adoption_data.json`, `comparison.json`,
  `casebook.json`). Its name and shape are declared for each part in
  `data/series.ts`; `lib/series-data.ts` turns each shape into a table.

- `method.md` the method and decision log, shown collapsed as "Method and
  decisions".

`gaps.md` stays with the research and is not copied here.

Until a part has the three required files, the series section shows it as an
"In progress" card. The short finding and the card text for each part are in
`data/series.ts`.

The sync script copies a part only when its research folder also has
`method.md` and `gaps.md`, so a part goes live only once it is complete.

To copy a part in (from the repo root, normal user):

    bash scripts/sync-series.sh /path/to/work           (all parts)
    bash scripts/sync-series.sh /path/to/work/part2 2   (one part)

Sources read from files the owner supplied are shown with their page
references and official URL only; the local file name is never shown.
