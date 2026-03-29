export interface Signal {
  id: string;
  value: string;
  isNumeric: boolean;
  target?: number;
  suffix?: string;
  label: string;
  context: string;
}

export const signals: Signal[] = [
  {
    id: "accuracy",
    value: "<1% FAR · <5% FRR",
    isNumeric: false,
    label: "Authentication targets",
    context:
      "Targets for speaker verification on AMR-NB narrowband audio against SBP KYC thresholds",
  },
  {
    id: "compliance",
    value: "SBP BPRD 2025 · Banking on Equality · NFIS 2028",
    isNumeric: false,
    label: "Regulatory alignment",
    context:
      "Built against SBP Circular No. 1 of 2025, gender inclusion policy, and national financial inclusion strategy",
  },
  {
    id: "network",
    value: "AMR-NB · 8 kbps · 2G",
    isNumeric: false,
    label: "Network constraint",
    context:
      "Engineered for 2G narrowband compression where 48% of Pakistan mobile users operate",
  },
  {
    id: "beneficiaries",
    value: "9M BISP · 58M reached",
    isNumeric: true,
    target: 9,
    suffix: "M direct",
    label: "Market scale",
    context:
      "9 million registered BISP beneficiaries, 58 million citizens reached by program; the population excluded by smartphone assumptions",
  },
];
