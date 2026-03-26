export const siteConfig = {
  name: 'Fawad Liaqat',
  title: 'Fawad Liaqat \u00B7 FinTech Infrastructure',
  description: 'Building the systems that move money where it doesn\'t yet reach. FinTech infrastructure, blockchain, and emerging markets.',
  tagline: 'FinTech Infrastructure \u00B7 Blockchain \u00B7 Emerging Markets',
  oneliner: 'Building the systems that move money where it doesn\'t yet reach.',
  url: 'https://fawadliaqat.com',
  email: 'fawadliaqat666@gmail.com',
  social: {
    linkedin: 'https://linkedin.com/in/fawadliaqat',
    github: 'https://github.com/fawadliaqat',
  },
  about: {
    intro: 'I work on authentication and payment infrastructure for markets where the formal banking system has not arrived. The gap I operate in is specific: between the regulatory frameworks that define how financial services should work and the network constraints that determine how they actually can. AwaazOnboard \u2014 a voice biometric authentication layer built for Pakistan\'s open banking stack \u2014 is the clearest expression of that work: an identity system designed against SBP and NADRA regulations, compressed to function over 2G voice channels, and tested against the reality that 98% of ATM usage in Pakistan is still cash withdrawal.',
    market: 'Pakistan is not a case study I selected. It is the market I know. I have mapped the SBP regulatory stack from NPSS 2019 through BPRD Circular 01 of 2025 and the Digital Rupee pilot. I have extracted POS deployment data from SBP payment systems reviews and cross-referenced it against Karandaaz financial inclusion surveys. I have modeled the cost chain from US semiconductor tariffs through to merchant acquisition cost in Lahore. The specificity is the credential. Most fintech portfolios gesture at emerging markets. This one works inside a particular one.',
    standard: 'Everything in this portfolio traces to a source or states its assumption. Charts use verified SBP data with extraction dates documented. Models surface every parameter and sensitivity range. Where data does not exist \u2014 Pakistan-specific EMI fraud rates, per-unit POS terminal import costs, diaspora investment preferences for tokenized assets \u2014 the gap is named, not papered over. The standard is not perfection. It is transparency.',
    pillars: [
      {
        title: 'Infrastructure, Not Application',
        desc: 'Authentication layers, payment rails, regulatory compliance architectures. The work sits one level below the products people see. FAPI 1.0 security profiles, VaaS delivery models, SBP framework design \u2014 the infrastructure that other applications depend on.',
      },
      {
        title: 'Emerging Market Structural Thinking',
        desc: 'Every problem is framed through structural constraint: 2G bandwidth ceilings, 62% adult literacy, cash economies that coexist with digital payment rails, regulatory environments that move faster than the infrastructure they regulate.',
      },
      {
        title: 'Regulatory Fluency as Design Constraint',
        desc: 'SBP BPRD Circular 01 of 2025. NADRA Digital Identity Regulations 2025. PTA Critical Infrastructure Rules. SECP Sandbox Framework. PDPA 2023. These are not compliance checkboxes. They are the binding constraints that shape every architectural decision.',
      },
      {
        title: 'Precision as Working Standard',
        desc: 'Claimed figures become projected when the data does not support certainty. Chart titles match their data source, not the narrative. Unit economics are verified against source documents. If it cannot be sourced or clearly qualified, it does not appear.',
      },
    ],
  },
  networkNodes: [
    { id: 'SBP', x: 0.5, y: 0.45, r: 22, color: '#C840E9' },
    { id: 'Raast', x: 0.5, y: 0.25, r: 18, color: '#7B61FF' },
    { id: '1LINK', x: 0.3, y: 0.3, r: 14, color: '#FF6B9D' },
    { id: 'JazzCash', x: 0.2, y: 0.5, r: 12, color: '#C840E9' },
    { id: 'Easypaisa', x: 0.15, y: 0.7, r: 12, color: '#C840E9' },
    { id: 'Alfalah', x: 0.35, y: 0.65, r: 11, color: '#7B61FF' },
    { id: 'HBL', x: 0.65, y: 0.65, r: 11, color: '#7B61FF' },
    { id: 'MCB', x: 0.8, y: 0.5, r: 11, color: '#7B61FF' },
    { id: 'UBL', x: 0.85, y: 0.7, r: 11, color: '#7B61FF' },
    { id: 'NADRA', x: 0.7, y: 0.3, r: 15, color: '#FF6B9D' },
    { id: 'NTC', x: 0.75, y: 0.15, r: 10, color: '#A8A3B8' },
    { id: 'Karandaaz', x: 0.35, y: 0.15, r: 10, color: '#00FF88' },
    { id: 'PTA', x: 0.2, y: 0.2, r: 12, color: '#FF6B9D' },
    { id: 'SECP', x: 0.6, y: 0.82, r: 12, color: '#FF6B9D' },
  ],
  networkEdges: [
    ['SBP', 'Raast'], ['SBP', '1LINK'], ['SBP', 'NADRA'], ['SBP', 'SECP'], ['SBP', 'PTA'],
    ['Raast', 'JazzCash'], ['Raast', 'Easypaisa'], ['Raast', 'Alfalah'], ['Raast', 'HBL'],
    ['Raast', 'MCB'], ['Raast', 'UBL'], ['1LINK', 'JazzCash'], ['1LINK', 'Alfalah'],
    ['NADRA', 'NTC'], ['NADRA', 'Raast'], ['PTA', 'NTC'], ['Karandaaz', 'SBP'], ['SECP', 'Alfalah'],
  ],
  particleFragments: [
    'SBP_BPRD_01', 'FAPI_1.0', 'G.729', 'NADRA_2025', 'KYC_T2', 'RAAST',
    '96.7%', '8kHz', '2G', 'PDPA_2023', 'SECP', 'VaaS', 'EMI_REG',
    'PTA_CI', 'FMU_AML', 'BISP', 'PKR_612T', '3.7M', 'CBDC', '1LINK',
    'JazzCash', 'Easypaisa', 'HBL', 'MCB', 'UBL', 'Karandaaz',
  ],
} as const;
