export type ProjectStatus = "completed" | "in-progress" | "forthcoming";

/** The layer of the DPI stack a project addresses. "all" means it spans the stack. */
export type StackLayerId = "identity" | "payments" | "data";

/** A headline number for a card. Only add one that traces to a source. */
export interface KeyFigure {
  value: string;
  label: string;
  source: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  status: ProjectStatus;
  featured?: boolean;
  demoUrl?: string;
  repoUrl?: string;
  /** Short card text. The longer description sits behind "More detail". */
  summary: string;
  /** Archived items stay in the repo and are listed under "Earlier work". */
  archived?: boolean;
  /** Pins the project to a layer in the hero diagram (see data/stack.ts). */
  layer?: StackLayerId | "all";
  /** Optional. Shown on the card when present. */
  keyFigure?: KeyFigure;
  /** Month the data and text were last refreshed, e.g. "November 2026". */
  updated?: string;
}

export const projects: Project[] = [
  {
    id: "awaaz-onboard",
    layer: "identity",
    category: "Inclusion",
    title: "AwaazOnboard",
    subtitle: "Voice as a second authentication factor for basic phone users",
    summary:
      "A four person project I led on architecture and unit economics. It explores voice as a supporting identity check for people who bank through basic phones on 2G networks.",
    description: [
      "AwaazOnboard explores voice as a second authentication factor for people who bank through basic phones on 2G networks. The aim is that identity checks tied to NADRA records, and payments on rails like Raast, can reach users who have no smartphone or mobile data.",
      "The hard part is the network. Narrowband voice codecs remove much of the audio detail that speaker verification models rely on. The work therefore focuses on enrollment in controlled settings and on models that tolerate compressed audio.",
      "The design treats voice as a supporting factor alongside existing biometric verification, in line with how the project reads State Bank of Pakistan requirements. The project is in progress, and accuracy figures will be published once testing is complete.",
    ],
    tech: ["Speaker verification", "ECAPA-TDNN", "FastAPI", "2G voice channels"],
    status: "in-progress",
    featured: true,
  },
  {
    id: "raast-tracker",
    layer: "payments",
    category: "Payments",
    summary:
      "A dashboard on the distance between Raast's growth and who actually uses it, on State Bank data for FY26.",
    title: "Raast Adoption Gap Tracker",
    subtitle:
      "Dashboard tracking the gap between Pakistan's Raast payment rail and everyday use, access first, then use.",
    description: [
      "Raast moved 2,755 million transactions in FY26, more than double the year before, and digital channels carried 92% of retail payments by count. By value the digital share was 38%. Only 27% of Pakistani adults had an account in the latest Findex survey, while most of those who do already pay digitally. The dashboard uses the State Bank's FY26 Payment Systems Review and Findex 2025, puts a numbered source on every figure, and computes an Adoption Gap Index of about 52 person to person payments per registered Raast ID a year.",
    ],
    tech: ["React", "Recharts", "SBP FY26 Data", "Findex 2025"],
    status: "completed",
    updated: "November 2026",
    demoUrl: "https://fawad-liaqat.github.io/raast-tracker/",
  },
  {
    id: "tariff-simulator",
    category: "Earlier work",
    summary:
      "An interactive model of how tariffs on electronic components could feed into payment hardware costs.",
    archived: true,
    title: "Tariff Shock Propagation Simulator",
    subtitle:
      "Interactive model tracing how US tariff increases on semiconductors propagate through to fintech hardware costs in Pakistan.",
    description: [
      "Archived. Not updated since March 2026. US tariffs on semiconductors rose from 7.5% to 25% between 2022 and 2025. India raised duties on PCBs and POS components to 18%. Pakistan imports nearly all its fintech hardware; every POS terminal, biometric scanner, and QR device arrives through a supply chain now subject to compounding tariff pressure. Users adjust three levers (tariff rate, local assembly percentage, and subsidy offset) and watch a waterfall chart recalculate cost amplification at each stage in real time. Every assumption is surfaced in a collapsible panel. The model is transparent by design.",
    ],
    tech: ["React", "Recharts", "US ITC HTS Data", "Cost Modeling"],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/tariff-shock-simulator/",
  },
  {
    id: "cbdc-matrix",
    layer: "payments",
    category: "Digital currency",
    summary:
      "A comparison of Pakistan's planned Digital Rupee with five central bank digital currencies abroad, across architecture, privacy, offline use, onboarding and interoperability.",
    title: "CBDC Design Tradeoff Matrix",
    subtitle:
      "Structured comparison of Pakistan's planned Digital Rupee with five central bank digital currencies abroad.",
    description: [
      "The State Bank announced a Digital Rupee pilot in 2025, but its start could not be confirmed as of November 2026. Nigeria's eNaira saw about 98.5% of wallets unused in any given week, and the Bahamas' Sand Dollar has struggled with merchant acceptance. This matrix compares the planned Digital Rupee with five implementations abroad across architecture, privacy design, offline capability, onboarding for inclusion, and interoperability with existing payment rails, with commentary for emerging markets. Sources include BIS papers, central bank publications and the State Bank's FY26 payment systems review; each is listed with its date. Updated November 2026.",
    ],
    tech: [
      "BIS Data",
      "Atlantic Council",
      "CBDC Registry",
      "Comparative Analysis",
    ],
    status: "completed",
    updated: "November 2026",
    demoUrl: "https://fawad-liaqat.github.io/CBDC-Design-Tradeoff-Matrix/",
  },
  {
    id: "voice-feasibility",
    layer: "identity",
    category: "Inclusion",
    summary:
      "A companion tool to AwaazOnboard. It scores whether voice authentication is workable for a given network, device, noise level and regulatory setting. The weights are my own judgement, not empirical estimates.",
    title: "Voice Biometric Feasibility Checker",
    subtitle:
      "Decision tool for whether voice authentication is viable given network, device, noise, language and regulatory conditions.",
    description: [
      "During AwaazOnboard's feasibility analysis, we found that VoiceGesture, a liveness detection method that relies on an inaudible 20 kHz tone and Doppler shifts, cannot work over a G.729 telephone voice channel. This tool generalises that question. A user enters five conditions (network, device, noise, speaker language or dialect, and regulatory setup) and gets a weighted feasibility score, a recommendation and any correlated risks. The weights are my judgement, not estimates from field data, and the tool cites the standards and SBP framework it relies on.",
    ],
    tech: [
      "React",
      "AwaazOnboard Research",
      "G.729 Analysis",
      "SBP KYC Framework",
    ],
    status: "completed",
    updated: "November 2026",
    demoUrl: "https://fawad-liaqat.github.io/voice-biometric-checker/",
  },
  {
    id: "regulatory-timeline",
    layer: "all",
    category: "Regulation",
    summary:
      "An annotated timeline of State Bank, PTA, NADRA, SECP and PVARA actions that shaped digital finance in Pakistan from 2019 to October 2026, each linked to its source.",
    title: "Pakistan Open Banking Regulatory Timeline",
    subtitle:
      "Annotated timeline of SBP, PTA, NADRA, SECP and PVARA regulatory actions shaping digital finance from 2019 to 2026.",
    description: [
      "Pakistan's fintech rules have moved quickly since 2019: NPSS, Raast's phased launch, the 2023 EMI regulations, the digital bank framework, the 2025 onboarding framework and NADRA's digital identity rules, and in 2026 the Virtual Assets Act, banking access for licensed virtual asset providers and the State Bank's draft Open Banking Regulations. This timeline lays the chronology out for people building products. Each milestone gets a short note on what changed and what it means for fintech architecture, and the page ends with a numbered list of sources marked primary or secondary. Updated November 2026.",
    ],
    tech: ["React", "SBP Circulars", "PTA Regulations", "NADRA", "SECP"],
    status: "completed",
    updated: "November 2026",
    demoUrl:
      "https://fawad-liaqat.github.io/Pakistan-Fintech-Regulatory-Timeline/",
  },
  {
    id: "fraud-model",
    category: "Earlier work",
    summary:
      "A cost and benefit model of fraud detection options for electronic money institutions, built on stated assumptions.",
    archived: true,
    title: "AI Fraud Detection Cost-Benefit Model",
    subtitle:
      "Financial model comparing AI fraud detection implementation cost against fraud losses for Pakistani electronic money institutions.",
    description: [
      "Archived. Not updated since March 2026. Pakistan's EMI transaction volume doubled to PKR 471 billion in FY25, with 5.8 million e-wallet users. As volume scales, fraud exposure scales with it. This model compares three scenarios: baseline manual review (30% detection rate), an automated rule engine (55 to 65%), and machine learning detection (80 to 92%). It outputs a break even analysis showing the exact monthly transaction volume at which ML fraud detection becomes cost-positive. Implementation costs use published AWS and GCP pricing. Fraud data specific to Pakistani EMIs is not public, a gap the model documents rather than ignores.",
    ],
    tech: [
      "Excel",
      "SBP FY25 EMI Data",
      "ACFE 2024 Report",
      "Financial Modeling",
    ],
    status: "completed",
    demoUrl:
      "https://fawad-liaqat.github.io/AI-Fraud-Detection-Cost-Benefit-Dashboard/",
  },
  {
    id: "stablecoin-remittance",
    layer: "payments",
    category: "Digital currency",
    summary:
      "What it costs to send USD 500 to Pakistan through banks, money transfer operators, mobile wallets and stablecoin channels, across five corridors. Stablecoin prices are a dated snapshot.",
    title: "Stablecoin Remittance Cost Comparison",
    subtitle:
      "Remittance costs across banks, MTOs, mobile wallets and stablecoin channels for Pakistan's top five inbound corridors.",
    description: [
      "Pakistan received a record US$41.6 billion in workers' remittances in FY26. In June 2026 the largest sources were Saudi Arabia, the UAE, the UK and the US. This analysis puts stablecoin channels alongside banks, money transfer operators and mobile wallets, corridor by corridor, and compares the total cost of sending $500: explicit fees, FX spread and the time value of settlement. Prices are a snapshot dated 30 March 2026; the legal context (Virtual Assets Act 2026, the State Bank's April 2026 circular on licensed providers) was updated in November 2026.",
    ],
    tech: [
      "World Bank RPW Data",
      "Binance P2P",
      "SBP FX Manual",
    ],
    status: "completed",
    updated: "November 2026",
    demoUrl:
      "https://fawad-liaqat.github.io/Stablecoin-Remittance-Cost-Comparison/",
  },
];
