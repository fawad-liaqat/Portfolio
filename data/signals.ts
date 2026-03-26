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
    id: 'accuracy',
    value: '96.7%',
    isNumeric: true,
    target: 96.7,
    suffix: '%',
    label: 'Authentication accuracy',
    context: 'Voice biometric precision against SBP KYC Tier 2 threshold',
  },
  {
    id: 'compliance',
    value: 'FAPI 1.0 \u00B7 NADRA 2025 \u00B7 SBP BPRD 01',
    isNumeric: false,
    label: 'Regulatory compliance',
    context: 'Full stack regulatory alignment across three frameworks',
  },
  {
    id: 'network',
    value: 'G.729 \u00B7 8kHz \u00B7 2G',
    isNumeric: false,
    label: 'Network constraint',
    context: 'Built for narrowband infrastructure, not broadband assumption',
  },
  {
    id: 'beneficiaries',
    value: '3.7M beneficiaries',
    isNumeric: true,
    target: 3.7,
    suffix: 'M beneficiaries',
    label: 'Market context',
    context: 'BISP population served \u2014 the scale of the problem being solved',
  },
];
