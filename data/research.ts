export interface ResearchPaper {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "published" | "forthcoming" | "draft";
  url?: string;
}

export const research: ResearchPaper[] = [
  {
    id: "behavioral-last-mile",
    category: "Payments Infrastructure",
    title:
      "The Behavioral Last Mile: Why 88% Digital Infrastructure Produces 60% Cash Economies",
    description:
      "Pakistan's digital payment paradox as a case study in the gap between infrastructure availability and behavioral adoption. Introduces a three-layer analytical framework — trust deficit, incentive misalignment, literacy friction — benchmarked against India's UPI trajectory and Kenya's M-Pesa rollout.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/behavioral-last-mile/",
  },
  {
    id: "tariff-cascades",
    category: "Macro-Financial",
    title:
      "Tariff Cascades and Fintech Infrastructure: How Trade Policy Shapes Digital Inclusion Timelines",
    description:
      "An emerging market analysis tracing cost propagation from semiconductor tariffs to merchant deployment delays. Builds a five-link cost model from tariff announcement through to implied delay in meeting SBP's 70% digital payment adoption target by 2030.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/tariff-cascades/",
  },
  {
    id: "cbdc-low-literacy",
    category: "CBDC Design",
    title:
      "CBDC Design for Low-Literacy Populations: What the eNaira and Sand Dollar Got Wrong",
    description:
      "Design analysis of CBDC user experience failures and lessons for Pakistan's Digital Rupee. Conducts a design audit of both CBDCs and maps failures against Pakistan's demographic reality — 62% adult literacy, severe urban-rural gaps, predominantly 2G/3G rural connectivity.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/cbdc-low-literacy/",
  },
  {
    id: "agentic-ai-compliance",
    category: "Regulatory",
    title:
      "Agentic AI in Compliance: Regulatory Implications of Autonomous Decision-Making in Pakistani Financial Services",
    description:
      "Policy analysis mapping the regulatory vacuum around agentic AI in SBP's framework. Maps the vacuum against the EU AI Act, Singapore's MAS FEAT principles, and the UK FCA's evolving AI discussion papers, producing a regulatory gap matrix with specific recommendations.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/agentic-ai-compliance/",
  },
  {
    id: "tokenized-remittances",
    category: "Blockchain",
    title:
      "Tokenized Remittances: A Feasibility Framework for Blockchain-Based Diaspora Investment in Pakistan",
    description:
      "Can asset tokenization convert Pakistan's $30 billion remittance flow from consumption into productive investment? Designs the regulatory, technical, and economic framework for compliant tokenized investment products accessible from abroad.",
    status: "published",
    url: "https://fawad-liaqat.github.io/Research-Articles/articles/tokenized-remittances/",
  },
];
