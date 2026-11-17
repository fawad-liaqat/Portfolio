export interface Signal {
  id: string;
  value: string;
  label: string;
  context: string;
  /** Optional longer note, with its sources, shown behind "Details" so the strip stays short. */
  details?: string;
}

// All figures: State Bank of Pakistan, Payment Systems Review FY26
// (July 2025 to June 2026). FY26 figures are provisional in the source.
export const signalsSource =
  "Source: State Bank of Pakistan, Payment Systems Review FY26. FY26 figures are provisional.";

export const signals: Signal[] = [
  {
    id: "retail",
    value: "14.3 billion",
    label: "Retail payments in FY26",
    context:
      "Worth PKR 673 trillion. Up 58% by number and 10% by value in one year.",
  },
  {
    id: "digital-share",
    value: "92% vs 38%",
    label: "Digital share by number vs by value",
    context:
      "Most transactions are digital. Most of the money is not. The value share was 29% in FY25.",
  },
  {
    id: "raast-p2m",
    value: "182.5 million",
    label: "Raast merchant payments in FY26",
    context: "Up from 4.9 million in FY25.",
  },
  {
    id: "qr",
    value: "3.8 million",
    label: "QR enabled merchants",
    context:
      "Up from 1.1 million in June 2025, under a government subsidy.",
    details:
      "The subsidy ran from 1 September 2025 to 30 June 2026 (SBP Governor's Annual Report 2025-26, p. 58). On 13 November 2026 the government said it would continue subsidising merchant fees on Raast QR payments; the terms were not published (Business Recorder).",
  },
];
