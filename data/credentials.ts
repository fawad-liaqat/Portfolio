/**
 * Training section content (components/portfolio/CredentialsSection.tsx).
 * Each group is one row: a short label, an optional provider line, and items.
 * Add a new course by adding a string to `items`.
 */
export interface CredentialGroup {
  id: string;
  label: string;
  /** Who ran the courses or programme. Optional. */
  provider?: string;
  items: string[];
}

export const credentials: CredentialGroup[] = [
  {
    id: "education",
    label: "Education",
    items: [
      "BS Financial Technology, FAST NUCES Islamabad. Graduating January 2027.",
    ],
  },
  {
    id: "courses",
    label: "Courses",
    provider: "Saïd Business School, University of Oxford, on Coursera",
    items: [
      "AI Fundamentals in Financial Services",
      "Designing the Future of Finance",
      "Open Data and Intelligent Finance",
    ],
  },
  {
    id: "programme",
    label: "Programme",
    items: [
      "EAG Associate Programme, 2026 cohort. Economic Advisory Group. Workshops on macroeconomic policy, trade, international economics and structural transformation.",
    ],
  },
];
