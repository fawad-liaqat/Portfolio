export type ProjectStatus = "completed" | "in-progress" | "forthcoming";

/** The layer of the DPI stack a project addresses. "all" means it spans the stack. */
export type StackLayerId = "identity" | "payments" | "data";

/** A headline number for a card. Only add one that traces to a source. */
export interface KeyFigure {
  value: string;
  label: string;
  source: string;
}

/** A secondary link on a card, such as an earlier edition. */
export interface ExtraLink {
  label: string;
  url: string;
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
  /** Pins the project to a layer in the hero diagram (see data/stack.ts). */
  layer?: StackLayerId | "all";
  /** Optional. Shown on the card when present. */
  keyFigure?: KeyFigure;
  /** Month the data and text were last refreshed, e.g. "November 2026". */
  updated?: string;
  /** Secondary links shown under the main link, such as an earlier edition. */
  links?: ExtraLink[];
}

export const projects: Project[] = [
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
    links: [
      { label: "FY25 edition", url: "https://fawad-liaqat.github.io/raast-tracker/?edition=fy25" },
      { label: "Progress FY25 to FY26", url: "https://fawad-liaqat.github.io/raast-tracker/#progress" },
    ],
  },
  {
    id: "awaaz-onboard",
    layer: "identity",
    category: "Inclusion",
    title: "AwaazOnboard",
    subtitle: "Voice as a second authentication factor for basic phone users",
    summary:
      "In a team of four, I led the API architecture. It explores voice as a supporting identity check for people who bank through basic phones on 2G networks.",
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
];
