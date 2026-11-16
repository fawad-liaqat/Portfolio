export type ProjectStatus = "completed" | "in-progress" | "forthcoming";

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
}

export const projects: Project[] = [
  {
    id: "awaaz-onboard",
    category: "Inclusion",
    title: "AwaazOnboard",
    subtitle: "Voice as a second authentication factor for basic phone users",
    summary:
      "My final year project, built with a team. It explores voice as a supporting identity check for people who bank through basic phones on 2G networks.",
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
    category: "Payments",
    summary:
      "A dashboard on the distance between Raast's rollout and everyday use, built on State Bank data for FY25. An update to FY26 data is in progress.",
    title: "Raast Adoption Gap Tracker",
    subtitle:
      "Interactive dashboard mapping the distance between Raast infrastructure rollout and actual behavioral adoption across Pakistan.",
    description: [
      "Raast transaction volumes doubled in FY25. Pakistan now processes 9.1 billion retail transactions worth PKR 612 trillion annually, with 88% flowing through digital channels. These numbers suggest success. They are incomplete. 98% of ATM transactions remain cash withdrawals. Rural POS terminal density is a fraction of urban coverage. The dashboard renders four analytical blocks from SBP Annual Payment Systems Review FY25 data, including a computed Adoption Gap Index (the ratio of active digital transactions to total registered accounts), converting a complex behavioral problem into a single trackable number.",
    ],
    tech: ["React", "Recharts", "SBP FY25 Data", "Behavioral Modeling"],
    status: "completed",
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
      "US tariffs on semiconductors rose from 7.5% to 25% between 2022 and 2025. India raised duties on PCBs and POS components to 18%. Pakistan imports nearly all its fintech hardware; every POS terminal, biometric scanner, and QR device arrives through a supply chain now subject to compounding tariff pressure. Users adjust three levers (tariff rate, local assembly percentage, and subsidy offset) and watch a waterfall chart recalculate cost amplification at each stage in real time. Every assumption is surfaced in a collapsible panel. The model is transparent by design.",
    ],
    tech: ["React", "Recharts", "US ITC HTS Data", "Cost Modeling"],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/tariff-shock-simulator/",
  },
  {
    id: "cbdc-matrix",
    category: "Digital currency",
    summary:
      "A comparison of Pakistan's planned Digital Rupee with five central bank digital currencies abroad, across architecture, privacy, offline use, onboarding and interoperability.",
    title: "CBDC Design Tradeoff Matrix",
    subtitle:
      "Structured comparison of Pakistan's planned Digital Rupee with five central bank digital currencies abroad.",
    description: [
      "The State Bank has been preparing a Digital Rupee pilot. Nigeria's eNaira saw 98.5% of issued wallets go unused. The Bahamas' Sand Dollar struggles with merchant acceptance. This matrix compares the Digital Rupee against five global implementations across the dimensions that matter: architecture model, privacy design, offline transaction capability, financial inclusion onboarding, and interoperability with existing payment rails. Each dimension includes analytical commentary for emerging market contexts. Data sourced from BIS papers, the Atlantic Council CBDC Tracker, and the CBDC Registry.",
    ],
    tech: [
      "BIS Data",
      "Atlantic Council",
      "CBDC Registry",
      "Comparative Analysis",
    ],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/CBDC-Design-Tradeoff-Matrix/",
  },
  {
    id: "voice-feasibility",
    category: "Inclusion",
    summary:
      "A companion tool to AwaazOnboard. It scores whether voice authentication is workable for a given network, device, noise level and regulatory setting. The weights are my own judgement, not empirical estimates.",
    title: "Voice Biometric Feasibility Checker",
    subtitle:
      "Decision tool for whether voice authentication is viable given local network, device and regulatory constraints.",
    description: [
      "During AwaazOnboard's feasibility analysis, we identified a critical incompatibility: the G.729 codec's 4kHz frequency ceiling eliminates the spectral features that VoiceGesture's Doppler-based liveness detection requires. This tool generalizes that finding into a reusable assessment framework. A user enters the network, device, noise and regulatory conditions, and the tool returns a weighted feasibility score with a recommendation. Scoring derived from what we learned building authentication for 2G networks in rural Pakistan.",
    ],
    tech: [
      "React",
      "AwaazOnboard Research",
      "G.729 Analysis",
      "SBP KYC Framework",
    ],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/voice-biometric-checker/",
  },
  {
    id: "regulatory-timeline",
    category: "Regulation",
    summary:
      "An annotated timeline of State Bank, PTA, NADRA and SECP actions that shaped digital finance in Pakistan from 2019 to January 2026, each linked to its source.",
    title: "Pakistan Open Banking Regulatory Timeline",
    subtitle:
      "Annotated timeline of SBP, PTA, NADRA and SECP regulatory actions shaping digital finance from 2019 to 2026.",
    description: [
      "Pakistan's fintech regulatory landscape has moved faster in seven years than most markets manage in fifteen. From NPSS 2019 through Raast's phased launch, EMI Regulations of 2023, the Digital Bank Framework, BPRD Circular 01 of 2025, the CBDC pilot,, and NADRA Digital Identity Regulations 2025, the stack is deep and still changing. This timeline lays the chronology out for people building products rather than for lawyers. Each milestone gets a one-sentence annotation answering: what changed, and what it means for fintech architecture. Each entry links to the official circular or gazette it draws on.",
    ],
    tech: ["React", "SBP Circulars", "PTA Regulations", "NADRA", "SECP"],
    status: "completed",
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
      "Pakistan's EMI transaction volume doubled to PKR 471 billion in FY25, with 5.8 million e-wallet users. As volume scales, fraud exposure scales with it. This model compares three scenarios: baseline manual review (30% detection rate), an automated rule engine (55 to 65%), and machine learning detection (80 to 92%). It outputs a break even analysis showing the exact monthly transaction volume at which ML fraud detection becomes cost-positive. Implementation costs use published AWS and GCP pricing. Fraud data specific to Pakistani EMIs is not public, a gap the model documents rather than ignores.",
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
    category: "Digital currency",
    summary:
      "What it costs to send USD 500 to Pakistan through banks, money transfer operators, mobile wallets and stablecoin channels, across five corridors. Stablecoin prices are a dated snapshot.",
    title: "Stablecoin Remittance Cost Comparison",
    subtitle:
      "Remittance costs across banks, MTOs, mobile wallets and stablecoin channels for Pakistan's top five inbound corridors.",
    description: [
      "Pakistan received over $30 billion in remittances in FY25, primarily from the UAE, Saudi Arabia, the UK, the US, and Qatar. This analysis puts stablecoin channels alongside traditional banks and MTOs in one frame, corridor by corridor. This analysis compares the total cost of sending $500 through four channels: traditional banks, MTOs (Western Union, Wise), mobile wallets (JazzCash, Easypaisa), and stablecoin rails (USDT/USDC via Binance P2P). Cost includes explicit fees, FX spread, and time-value based on settlement speed. Stablecoin data is a point-in-time snapshot with collection date stated explicitly.",
    ],
    tech: [
      "World Bank RPW Data",
      "Binance P2P",
      "On-chain Analysis",
      "SBP FX Manual",
    ],
    status: "completed",
    demoUrl:
      "https://fawad-liaqat.github.io/Stablecoin-Remittance-Cost-Comparison/",
  },
];
