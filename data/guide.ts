/**
 * "Where to start": the short guide under the hero, and the one line hooks
 * at the top of each group in the Work section.
 *
 * Each guide item is a question a reader might have and where to go for it.
 * `href` can point at a series part, a section on this page or a live tool.
 * Keep the wording short: a question, then an action.
 */
import { seriesPath } from "./series";

export interface GuideItem {
  id: string;
  question: string;
  action: string;
  href: string;
  /** True for links that leave the site (they open in a new tab). */
  external?: boolean;
}

export const guide = {
  eyebrow: "Where to start",
  title: "Pick what you came for",
  items: [
    {
      id: "dpi",
      question: "Want to understand DPI?",
      action: "Start with Part 1",
      href: seriesPath(1),
    },
    {
      id: "visual",
      question: "Prefer to see the data?",
      action: "Open the Raast tracker",
      href: "https://fawad-liaqat.github.io/raast-tracker/",
      external: true,
    },
    {
      id: "protection",
      question: "Care about consumer protection?",
      action: "Read Part 3 on open banking",
      href: seriesPath(3),
    },
    {
      id: "cases",
      question: "Want real examples?",
      action: "See the use cases in Part 4",
      href: seriesPath(4),
    },
  ] satisfies GuideItem[],
};

/** Headings and hooks for the three groups in the Work section, in page order. */
export const workGroups = {
  title: "Series, articles and projects",
  series: {
    label: "Series",
    hook: "The big picture in four short parts. New here? Start with Part 1.",
  },
  articles: {
    label: "Articles",
    hook: "One question each, argued in depth.",
  },
  projects: {
    label: "Projects",
    hook: "Tools and dashboards you can open and try.",
  },
};
