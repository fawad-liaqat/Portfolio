/**
 * The four part series. Content for each part is in content/series/partN/
 * (see content/series/README.md). A part becomes a page once its files are
 * there; until then it shows as an "In progress" card.
 *
 * `finding` is the one line shown on the card and under the page title.
 * For a published part, take it from the part's own text.
 */
export interface SeriesPart {
  number: number;
  /** Short title used on cards while the part is in progress. */
  title: string;
  /** What the part covers, for the card. */
  scope: string;
  /** One line finding, shown once the part is published. */
  finding?: string;
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
  },
  {
    number: 2,
    title: "The adoption gap",
    scope: "Who is outside the system and why: access first, then use among account holders.",
  },
  {
    number: 3,
    title: "Open banking and the informed consumer",
    scope: "The State Bank's draft open banking rules read as a consumer product, with lessons from the UK, Brazil and India.",
  },
  {
    number: 4,
    title: "A casebook of use cases",
    scope: "One documented success story per sector, and what it would take in Pakistan.",
  },
];

/** URL path of a part's page. */
export function seriesPath(n: number) {
  return `/series/part-${n}/`;
}
