/**
 * The four part series. Content for each part is in content/series/partN/
 * (see content/series/README.md). A part becomes a page once its files are
 * there; until then it shows as an "In progress" card.
 *
 * `finding` is the one line shown on the card and under the page title.
 * For a published part, take it from the part's own text.
 */
/**
 * How a part's data file is shaped. Each shape has a reader in
 * lib/series-data.ts that turns it into a table for the page.
 *  scorecard  part1/scorecard.json: layers of indicators by country, with a status
 *  comparison part3/comparison.json: dimensions by country
 *  tables     part2/adoption_data.json: a list of small tables
 *  casebook   part4/casebook.json: one case per sector, plus shared conditions
 */
export type DataShape = "scorecard" | "comparison" | "tables" | "casebook";

export interface SeriesData {
  /** File name inside content/series/partN/. */
  file: string;
  shape: DataShape;
  /** Section heading on the page, and its menu label. */
  label: string;
}

/**
 * A chart drawn from the same data as a part's table. Each panel is one
 * measure, with one bar per row (for example per country).
 *  - For a record table: `table` is its id (such as "T1") and `columns`
 *    lists the column keys to plot, as they appear in the data file.
 *  - For a matrix (scorecard or comparison): `rows` lists the row ids to
 *    plot; each cell's first number is used.
 * `source` is the visible source line; ids such as S4 become links.
 */
export interface SeriesChart {
  title: string;
  unit?: "%";
  table?: string;
  columns?: string[];
  rows?: string[];
  source: string;
  /** Bar to emphasise, such as "Pakistan". */
  highlight?: string;
}

export interface SeriesPart {
  number: number;
  /** Short title used on cards. The page title comes from brief.md. */
  title: string;
  /** What the part covers, for the card while it is in progress. */
  scope: string;
  /** One line finding, shown once the part is published. Taken from the part's own text. */
  finding?: string;
  /** The part's table data, if it has any. */
  data?: SeriesData;
  /** Charts shown above the table, drawn from the same data. */
  charts?: SeriesChart[];
}

export const seriesTitle = "Pakistan built the rails";
export const seriesIntro =
  "A four part series on Pakistan's digital public infrastructure: what has been built, who is still outside it, and what would bring them in.";

export const seriesParts: SeriesPart[] = [
  {
    number: 1,
    title: "How complete is the stack?",
    scope: "Identity, payments and data sharing in Pakistan, compared with India, Brazil and Egypt.",
    // From the closing lines of part1/explainer.md.
    finding:
      "Pakistan has mostly built these systems. The open question is why so many people are still outside them.",
    data: { file: "scorecard.json", shape: "scorecard", label: "Scorecard" },
    charts: [
      {
        title:
          "Access and use: adults with an account, and adults who made or received a digital payment (% of adults 15 and over)",
        unit: "%",
        rows: ["P6", "P5"],
        source: "S4 Global Findex 2025, Table B.1, pp. 295 to 298",
        highlight: "Pakistan",
      },
    ],
  },
  {
    number: 2,
    title: "The adoption gap",
    scope: "Who is outside the system and why: access first, then use among account holders.",
    // From "What this means for Part 3" in part2/brief.md.
    finding:
      "Access is the first gap, and it is mostly about women, income, phones and family permission.",
    data: { file: "adoption_data.json", shape: "tables", label: "Data" },
    charts: [
      {
        title: "Account, digital payments, phone and internet use by country (% of adults 15 and over)",
        unit: "%",
        table: "T1",
        columns: [
          "has_account",
          "made_or_received_digital_payment",
          "owns_mobile_phone",
          "used_internet_past_3_months",
        ],
        source: "S1 Global Findex 2025, Table B.1, pp. 295 to 298",
        highlight: "Pakistan",
      },
    ],
  },
  {
    number: 3,
    title: "Open banking and the informed consumer",
    scope: "The State Bank's draft open banking rules read as a consumer product, with lessons from the UK, Brazil and India.",
    // From "Why it matters" in part3/explainer.md.
    finding: "Rights on paper help only people who know them and can use them.",
    data: { file: "comparison.json", shape: "comparison", label: "Comparison" },
  },
  {
    number: 4,
    title: "A casebook of use cases",
    scope: "One documented success story per sector, and what it would take in Pakistan.",
    // From "The series in one line" in part4/explainer.md.
    finding:
      "Pakistan has built the rails. The next step is helping more people get on them, and giving them good reasons to stay.",
    data: { file: "casebook.json", shape: "casebook", label: "Casebook" },
  },
];

/** URL path of a part's page. */
export function seriesPath(n: number) {
  return `/series/part-${n}/`;
}
