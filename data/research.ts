import type { ExtraLink } from "./projects";

export interface ResearchPaper {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "published" | "forthcoming" | "draft";
  url?: string;
  /** Month the article was last refreshed, e.g. "November 2026". */
  updated?: string;
  /** Secondary links, such as an earlier edition. */
  links?: ExtraLink[];
}

export const research: ResearchPaper[] = [
  {
    id: "behavioral-last-mile",
    category: "Payments",
    title:
      "The Behavioral Last Mile: Why Pakistan's Payment Rails Run Ahead of Its People",
    description:
      "Pakistan's payment rails carry 92% of retail payments by count, yet only 27% of adults have an account. Updated in November 2026 with SBP FY26 and Findex 2025 data, the article argues access comes first, then trust, incentives, and design and literacy, compared with India's UPI and Kenya's M-Pesa.",
    status: "published",
    updated: "November 2026",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/behavioral-last-mile/",
    links: [
      {
        label: "FY25 edition",
        url: "https://fawad-liaqat.github.io/Research-Articles/articles/behavioral-last-mile/fy25/",
      },
      {
        label: "Progress FY25 to FY26",
        url: "https://fawad-liaqat.github.io/Research-Articles/articles/behavioral-last-mile/#progress",
      },
    ],
  },
  {
    id: "cbdc-low-literacy",
    category: "Digital currency",
    title:
      "Why CBDCs Fail at the Interface: Design Lessons from the eNaira and Sand Dollar for Pakistan's Digital Rupee",
    description:
      "Design analysis of CBDC user experience failures and lessons for a Pakistani digital rupee. Audits the eNaira and Sand Dollar and maps their failures against Pakistan's census literacy data and payment networks. The digital rupee pilot was announced in 2025; its live status was unconfirmed as of November 2026.",
    status: "published",
    updated: "November 2026",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/cbdc-low-literacy/",
  },
  {
    id: "agentic-ai-compliance",
    category: "Regulation and AI",
    title:
      "Agentic AI in Financial Compliance: Mapping the Regulatory Gap in Pakistan",
    description:
      "Policy analysis of the gap in Pakistan's published rules for agentic AI in financial compliance, compared with the EU AI Act (high risk duties now from December 2027), Singapore's final MAS AI risk management guidelines (October 2026) and the UK's Mills Review (July 2026), with a regulatory gap matrix and proposals for the SBP. Updated November 2026.",
    status: "published",
    updated: "November 2026",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/agentic-ai-compliance/",
  },
];
