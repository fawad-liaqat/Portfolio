export interface ResearchPaper {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "published" | "forthcoming" | "draft";
  url?: string;
  archived?: boolean;
  /** Month the article was last refreshed, e.g. "November 2026". */
  updated?: string;
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
  },
  {
    id: "tariff-cascades",
    category: "Payments",
    title:
      "Tariff Cascades and Fintech Infrastructure: How Trade Policy Shapes Digital Inclusion Timelines",
    description:
      "An emerging market analysis tracing cost propagation from semiconductor tariffs to merchant deployment delays. Builds a five-link cost model from tariff announcement through to implied delay in meeting SBP's 70% digital payment adoption target by 2030.",
    status: "published",
    archived: true,
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/tariff-cascades/",
  },
  {
    id: "cbdc-low-literacy",
    category: "Digital currency",
    title:
      "CBDC Design for Low-Literacy Populations: What the eNaira and Sand Dollar Got Wrong",
    description:
      "Design analysis of CBDC user experience failures and lessons for a Pakistani digital rupee. Audits the eNaira and Sand Dollar and maps their failures against Pakistan's census literacy data and payment networks. The digital rupee pilot was announced in 2025; its live status was unconfirmed as of November 2026.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/cbdc-low-literacy/",
  },
  {
    id: "agentic-ai-compliance",
    category: "Regulation and AI",
    title:
      "Agentic AI in Compliance: Regulatory Implications of Autonomous Decision-Making in Pakistani Financial Services",
    description:
      "Policy analysis of the gap in Pakistan's published rules for agentic AI in financial compliance, compared with the EU AI Act (high risk duties now from December 2027), Singapore's final MAS AI risk management guidelines (October 2026) and the UK's Mills Review (July 2026), with a regulatory gap matrix and proposals for the SBP. Updated November 2026.",
    status: "published",
    updated: "November 2026",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/agentic-ai-compliance/",
  },
  {
    id: "tokenized-remittances",
    category: "Digital currency",
    title:
      "Tokenized Remittances: A Feasibility Framework for Blockchain-Based Diaspora Investment in Pakistan",
    description:
      "Could tokenization channel part of Pakistan's US$41.6 billion in FY26 remittances into regulated investment? Maps the foreign exchange rules, the Virtual Assets Act 2026 and the SBP's 2026 VASP circular, and sets out a compliant design and a sandbox path. Updated November 2026.",
    status: "published",
    updated: "November 2026",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/tokenized-remittances/",
  },
];
