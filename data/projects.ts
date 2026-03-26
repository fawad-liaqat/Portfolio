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
}

export const projects: Project[] = [
  {
    id: "awaaz-onboard",
    category: "Biometric Infrastructure",
    title: "AwaazOnboard",
    subtitle:
      "Voice Biometric Authentication Infrastructure for Pakistan's Unbanked Populations",
    description: [
      "AwaazOnboard is a voice biometric authentication layer built for Pakistan's open banking infrastructure. It exists because 3.7 million BISP beneficiaries need to verify their identity to access welfare disbursements, and the formal banking system assumes broadband connectivity and smartphone screens that most of them do not have. The system authenticates users through G.729-compressed voice at 8kHz — the hard ceiling of 2G networks serving rural Pakistan — and achieves 96.7% accuracy against SBP KYC Tier 2 thresholds without requiring a data connection that the infrastructure cannot deliver.",
      "The technical challenge was not building a voice biometric system. It was building one that works under constraints the literature ignores. The G.729 codec strips frequencies above 4kHz, which eliminates the spectral features that most voice biometric systems depend on. We redesigned the enrollment architecture around partner-embedded voice capture in controlled acoustic environments — a pivot that preserved liveness detection while respecting the codec's bandwidth reality.",
      "Regulatory alignment is not a feature list. It is the architecture. AwaazOnboard was designed against SBP BPRD Circular 01 of 2025, NADRA Digital Identity Regulations 2025, FAPI 1.0 security profiles for open banking, PTA critical infrastructure rules, SECP sandbox requirements, PDPA 2023 data protection obligations, and FMU anti-money laundering guidelines.",
    ],
    tech: [
      "Python",
      "React",
      "FAPI 1.0",
      "G.729",
      "NADRA API",
      "SBP BPRD",
      "VaaS Architecture",
    ],
    status: "in-progress",
    featured: true,
  },
  {
    id: "raast-tracker",
    category: "Payments Infrastructure",
    title: "Raast Adoption Gap Tracker",
    subtitle:
      "Interactive dashboard mapping the distance between Raast infrastructure rollout and actual behavioral adoption across Pakistan.",
    description: [
      "Raast transaction volumes doubled in FY25. Pakistan now processes 9.1 billion retail transactions worth PKR 612 trillion annually, with 88% flowing through digital channels. These numbers suggest success. They are incomplete. 98% of ATM transactions remain cash withdrawals. Rural POS terminal density is a fraction of urban coverage. The dashboard renders four analytical blocks from SBP Annual Payment Systems Review FY25 data, including a computed Adoption Gap Index — the ratio of active digital transactions to total registered accounts — converting a complex behavioral problem into a single trackable number.",
    ],
    tech: ["React", "Recharts", "SBP FY25 Data", "Vercel"],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/raast-tracker/",
  },
  {
    id: "tariff-simulator",
    category: "Macro-Financial",
    title: "Tariff Shock Propagation Simulator",
    subtitle:
      "Interactive model tracing how US tariff increases on semiconductors propagate through to fintech hardware costs in Pakistan.",
    description: [
      "US tariffs on semiconductors rose from 7.5% to 25% between 2022 and 2025. India raised duties on PCBs and POS components to 18%. Pakistan imports nearly all its fintech hardware — every POS terminal, biometric scanner, and QR device arrives through a supply chain now subject to compounding tariff pressure. Users adjust three levers — tariff rate, local assembly percentage, and subsidy offset — and watch a waterfall chart recalculate cost amplification at each stage in real time. Every assumption is surfaced in a collapsible panel. The model is transparent by design.",
    ],
    tech: ["React", "Recharts", "US ITC HTS Data", "Cost Modeling"],
    status: "completed",
    demoUrl: "https://fawad-liaqat.github.io/tariff-shock-simulator/",
  },
  {
    id: "cbdc-matrix",
    category: "CBDC Design",
    title: "CBDC Design Tradeoff Matrix",
    subtitle:
      "Structured comparison of Pakistan's Digital Rupee pilot against five global CBDC implementations.",
    description: [
      "The SBP's CBDC pilot launched in 2025. Nigeria's eNaira saw 98.5% of issued wallets go unused. The Bahamas' Sand Dollar struggles with merchant acceptance. This matrix compares the Digital Rupee against five global implementations across the dimensions that matter: architecture model, privacy design, offline transaction capability, financial inclusion onboarding, and interoperability with existing payment rails. Each dimension includes analytical commentary for emerging market contexts. Data sourced from BIS papers, the Atlantic Council CBDC Tracker, and the CBDC Registry.",
    ],
    tech: [
      "BIS Data",
      "Atlantic Council",
      "CBDC Registry",
      "Comparative Analysis",
    ],
    status: "in-progress",
  },
  {
    id: "voice-feasibility",
    category: "Biometric Infrastructure",
    title: "Voice Biometric Feasibility Checker",
    subtitle:
      "Decision tool evaluating whether voice-based authentication is viable given local network, device, and regulatory constraints.",
    description: [
      "During AwaazOnboard's feasibility analysis, we identified a critical incompatibility: the G.729 codec's 4kHz frequency ceiling eliminates the spectral features that VoiceGesture's Doppler-based liveness detection requires. This tool generalizes that finding into a reusable assessment framework. A user inputs four parameters — network bandwidth (2G through WiFi), device capability, ambient noise environment, and regulatory requirements. The tool computes a weighted composite feasibility score — bandwidth 30%, noise 25%, regulatory 25%, device 20% — and outputs a clear recommendation. Scoring derived from what we learned building authentication for 2G networks in rural Pakistan.",
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
    category: "Regulatory",
    title: "Pakistan Open Banking Regulatory Timeline",
    subtitle:
      "Interactive annotated timeline of every SBP, PTA, NADRA, and SECP regulatory action shaping digital finance from 2019 to 2026.",
    description: [
      "Pakistan's fintech regulatory landscape has moved faster in seven years than most markets manage in fifteen. From NPSS 2019 through Raast's phased launch, EMI Regulations of 2023, the Digital Bank Framework, BPRD Circular 01 of 2025, the CBDC pilot, and NADRA Digital Identity Regulations 2025 — the stack is deep and constantly evolving. No public artifact maps this chronology for builders rather than lawyers. Each milestone gets a one-sentence annotation answering: what changed, and what it means for fintech architecture. Every entry verified against official circulars and gazettes.",
    ],
    tech: ["React", "SBP Circulars", "PTA Regulations", "NADRA", "SECP"],
    status: "completed",
    demoUrl:
      "https://fawad-liaqat.github.io/Pakistan-Fintech-Regulatory-Timeline/",
  },
  {
    id: "fraud-model",
    category: "Fintech Economics",
    title: "AI Fraud Detection Cost-Benefit Model",
    subtitle:
      "Financial model comparing AI fraud detection implementation cost against fraud losses for Pakistani electronic money institutions.",
    description: [
      "Pakistan's EMI transaction volume doubled to PKR 471 billion in FY25, with 5.8 million e-wallet users. As volume scales, fraud exposure scales with it. This model compares three scenarios — baseline manual review (30% detection rate), automated rule engine (55–65%), and ML-based detection (80–92%) — and outputs a break-even analysis showing the exact monthly transaction volume at which ML fraud detection becomes cost-positive. Implementation costs use published AWS and GCP pricing. Pakistan-specific EMI fraud data does not exist — a gap the model documents rather than ignores.",
    ],
    tech: [
      "Excel",
      "SBP FY25 EMI Data",
      "ACFE 2024 Report",
      "Financial Modeling",
    ],
    status: "in-progress",
  },
  {
    id: "stablecoin-remittance",
    category: "Blockchain",
    title: "Stablecoin Remittance Cost Comparison",
    subtitle:
      "Data-driven analysis comparing remittance costs across traditional banks, MTOs, mobile wallets, and stablecoin rails for Pakistan's top five inbound corridors.",
    description: [
      "Pakistan received over $30 billion in remittances in FY25, primarily from the UAE, Saudi Arabia, the UK, the US, and Qatar. Nobody has produced a structured, corridor-specific cost comparison that puts stablecoin channels alongside traditional banks and MTOs in the same analytical frame. This analysis compares the total cost of sending $500 through four channels: traditional banks, MTOs (Western Union, Wise), mobile wallets (JazzCash, Easypaisa), and stablecoin rails (USDT/USDC via Binance P2P). Cost includes explicit fees, FX spread, and time-value based on settlement speed. Stablecoin data is a point-in-time snapshot with collection date stated explicitly.",
    ],
    tech: [
      "World Bank RPW Data",
      "Binance P2P",
      "On-chain Analysis",
      "SBP FX Manual",
    ],
    status: "in-progress",
  },
];
