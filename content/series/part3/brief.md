# Open banking and the informed consumer

**Part 3 of 4: the State Bank's draft Open Banking Regulations read as a consumer product, against the UK, Brazil and India**

Fawad Liaqat. Evidence as of 17 November 2026. Source markers such as [S1] resolve to the Sources section at the end. Section numbers such as s. 7.2 refer to the draft itself [S1].

## Where Parts 1 and 2 leave us

Part 1 found that Pakistan's payment rail works but its data sharing layer is still a draft. Part 2 looked at who is outside the system and found that access comes first: only 27 percent of adults hold an account in the latest global survey [S5, p. 298]. This part reads the State Bank's open banking draft through three lenses: customer protection, customer experience and financial inclusion. If the rules are adopted as drafted, what will a customer need to understand to benefit from them and stay safe, and who has to work together to get that understanding to people?

## What the draft establishes

The State Bank of Pakistan (SBP) published the draft Open Banking Regulations 2026 for public consultation. It is dated 30 October 2026, though the text itself prints no date and no comment deadline [S1]. The draft names the Payment Systems and Electronic Fund Transfers Act 2007 as its legal basis [S1, s. 4, p. 5]. In plain terms:

**Who must open up, and what.** Every bank, microfinance bank and electronic money institution must expose APIs to authorised third party providers [S1, s. 5.1, p. 5]. Only two kinds of data are in scope: account balance and transaction history, for current, saving and other payment accounts, including branchless banking accounts and wallets [S1, s. 2(i), p. 4; s. 5.2, p. 5].

**What the new firms may do.** Payment initiation providers may start business to business payments, consumer to business payments such as bills, and transfers between a business's own accounts. Account information providers may offer credit scoring and a combined balance view [S1, s. 5.3, pp. 5 to 6]. Person to person payments are not on the list. The stated aim is digital payments and credit for merchants and small firms [S1, s. 3, p. 5].

**Raast as the hub.** Third party providers must use Raast's central API hub, under standards set by Raast Payments Pakistan (RPP). Bilateral or multilateral links through designated operators are also allowed for account information [S1, s. 5.4, p. 6]. RPP, an SBP subsidiary, now runs Raast [S2, p. 58].

**Authorisation.** New providers get in principle approval, then test in the sandbox; existing banks and payment firms need 30 days' notice [S1, s. 6, p. 6].

**Consent.** Consent must be explicit, specific and time bound, and must state scope, duration, purpose and, for payments, daily and monthly limits [S1, s. 7, p. 7]. Providers may never ask for a customer's bank PIN or password [S1, s. 7(iii), p. 7]. The journey has four steps: the customer starts on the provider's app; the provider checks identity through NADRA biometric verification; the bank sends a one time password to the registered mobile number; the customer then confirms with an M-PIN or T-PIN inside the bank's own app [S1, s. 7.1 to 7.3, pp. 7 to 8].

**Revocation.** Both bank and provider must offer an online dashboard of active and past consents. A customer can revoke at any time, and revocation takes effect when either party receives it [S1, s. 7.4 and 7.5, p. 8]. The provider must then delete or anonymise the data within 30 days and confirm this to the customer [S1, s. 13(ii), p. 11].

**Liability.** For payments, the bank answers to the customer for unauthorised, failed or late payments unless the provider caused the loss. In either case the bank must credit the customer within seven business days of a valid claim and recover from the provider later [S1, s. 8.1, pp. 8 to 9]. In a dispute the burden of proof sits with the firms, and a log showing that a PIN was used is not enough on its own to blame the customer [S1, s. 8.2, p. 9]. RPP settles disputes between bank and provider [S1, s. 8.2, p. 9].

**Recourse.** Complaints can come in by email, phone, chat, web form or branch, must be acknowledged within an hour, and disputes must be resolved within 30 days, with escalation to SBP [S1, Annexure A, pp. 14 to 15]. If a lender refuses credit because of a score from an account information provider, it must say so and name the provider [S1, s. 11(iv), p. 10]. Banks and providers must run awareness programmes on rights and recourse [S1, s. 11(vii), p. 10].

**Interface rules.** Journeys must show key payment details first, allow cancellation before money moves, and avoid confusing wording, excess text, repeated requests, ads and cross selling [S1, s. 14, p. 12].

**Price.** RPP will not charge providers for payment initiation or data sharing, and customers paying a business through a provider pay nothing [S1, s. 15, p. 12].

**Data protection.** Data must stay in Pakistan unless held with an approved cloud provider, and derived scores may not reveal unrelated personal inferences [S1, s. 13, p. 11]. These protections rest on SBP circulars [S1, s. 13(i), p. 11], because Pakistan has no data protection law; the bill is a draft [S6, pp. 46 to 47].

## How it compares

Table 1 compares four systems on five dimensions. Every cell carries a source marker.

| Dimension | Pakistan (draft) | United Kingdom | Brazil | India |
|---|---|---|---|---|
| Who mandated it | SBP regulation covering all banks, MFBs and EMIs [S1] | Competition authority order of 2017 on the nine largest banks [S10] [S11] | Central bank, with mandatory data sharing participants [S7] | RBI licenses aggregators; banks that are information providers must share on valid consent [S14] |
| Hub or distributed | Central hub on Raast, bilateral links also allowed [S1] | Shared standards, directory and certification body [S10]; traffic routing NOT FOUND | Standardised system among participants [S7]; routing NOT FOUND | Several licensed aggregators pass data through without holding it [S14] |
| Consent model | Explicit, time bound, limits; NADRA biometric, OTP, app PIN [S1] | NOT FOUND in sources read | Customer authorises sharing [S7]; recurring payments can be cancelled any time with a maximum amount [S7] | Consent artefact with purpose, recipients, expiry; revocable [S14] |
| Liability for unauthorised payments | Bank credits within 7 business days, recovers from provider [S1] | Account provider refunds by end of next business day [S12]; firms must prove authorisation [S19] | NOT FOUND for open finance; Pix refund mechanism for fraud [S7] | No standalone liability clause; one month grievance limit, then RBI Ombudsman [S14] |
| Uptake so far | Three firms in the sandbox; no live service [S3] [S4] | 16.56 million connected users, Nov 2025 [S8]; over 40 million payments in May 2026 [S9] | 96 million accounts, over 154 million active consents, end 2025 [S7] | 352.19 million accounts linked, 595.11 million consents fulfilled, by 30 Sep 2026 [S15] |

Three things stand out.

First, Pakistan's draft is the most central of the four. The UK began with an order on nine banks that created a standards body [S10, p. 15], which is now being replaced by a not for profit "future entity" without statutory enforcement powers [S10, pp. 7 and 19 to 20]. India licenses several private aggregators that may not keep the data they pass on [S14, paras 4.1 and 5(7)]. Pakistan puts all banks in from day one and routes traffic through a public hub [S1, s. 5.1 and 5.4]. That eases control of standards and statistics, but makes RPP a single point that must work.

Second, the draft borrows proven protections. Its burden of proof rule [S1, s. 8.2] closely follows UK payments law, where the provider must prove a disputed payment was authenticated and a record of PIN use is not enough on its own [S19]. Its credit refusal notice goes a step further than the UK rule I read. UK law makes a lender name the credit reference agency when it refuses credit on that agency's information [S20]; the draft also covers offers on worse terms and tells the customer she can obtain the underlying information [S1, s. 11(iv)]. The refund clock is slower: seven business days, which the bank may withhold if it suspects customer negligence [S1, s. 8.1(iv)], against the UK's end of the next business day [S12].

Third, scale took years elsewhere. The UK order dates from 2017 [S11], and Brazil's open finance completed five years in 2025 [S7, p. 102]. Pakistan's open banking cohort entered the sandbox in January 2026 for up to six months [S3, p. 20] [S4].

## The consumer view: protection, experience, inclusion

CGAP's framework for a responsible digital finance ecosystem is a useful frame. It holds that no single actor can make consumers safe and able to get value from digital finance; authorities, providers, consumer representatives and market facilitators each carry part of the load, led by one authority with a clear consumer protection mandate [S21, pp. 9 to 10 and p. 12]. Read that way, the draft does well on the provider side and less well on the consumer side.

**Protection.** To benefit and stay safe, a customer has to understand four things: what she shares and for how long; how to see and cancel that agreement; who repays her if money goes missing; and where to complain. The draft writes each one down. Consent must state scope, duration and purpose [S1, s. 7]. Revocation is immediate [S1, s. 7.5]. The bank pays first [S1, s. 8.1(iv)]. Complaints have channels and deadlines [S1, Annexure A].

**Experience.** The journey assumes a person who already holds an account, has the provider's app and the bank's app, can pass a biometric check, receive an OTP and read a dashboard [S1, s. 7.1 to 7.4]. The interface rules [S1, s. 14] write good design into law. But consent and revocation are online only [S1, s. 7.4], while complaints can be made by phone or in a branch [S1, Annexure A]. SBP counts 46.1 million call centre and IVR banking users [S3, p. 9]. The UK built its model for a population where only 2 percent of adults are digitally excluded [S13, p. 13].

**Inclusion.** The Karandaaz survey of 2024 gives Pakistani evidence on the skills this journey needs. Only half of adults have ever sent or received a text message, and 78 percent of men but 47 percent of women own a SIM card [S22, p. 10]. On its financial literacy measure, 32 percent of men and 12 percent of women scored as literate [S22, p. 11]. Its digital literacy score is 77 for financially included adults and 42 for the excluded, and 65 for men against 48 for women [S22, p. 30]. These are correlations, not causes. Findex points the same way, with a 30 point gender gap in account ownership and a 65 point gap in phone ownership [S5, p. 98 and p. 25]. The draft does not mention gender, language or basic phones (my search of the text).

Understanding cannot be left to the customer alone. Findex argues that financial education helps but is not enough without consumer protection [S5, p. 239]. Earlier CGAP research found low income customers in India had little awareness of how providers used their data, while borrowers in Nairobi would pay double for loans with privacy features [S16]. Design matters as much as literacy. The draft's awareness duty [S1, s. 11(vii)] has no measure attached. There is a channel to build on: under SBP's financial education roadmap, banks and SBP offices reached 2.6 million people in FY26 [S2, p. 48].

## Who has to work together

CGAP's framework names the actors; the draft gives most of them a concrete job [S21, pp. 12 to 13].

- **SBP and RPP:** final rules, the hub, standards, dispute handling between firms, and public statistics [S1, s. 5.4 and 8.2].
- **Banks, microfinance banks and EMIs:** open APIs, run the dashboard and the authorisation screen, and refund first [S1, s. 5.1, 7.3 and 8.1].
- **Fintechs as providers:** build the product that gives a reason to consent. Neem, Digi Khata and Swich Retail are the open banking cohort in the sandbox [S4]. Press reports describe Neem as an embedded finance platform that lets businesses offer financial services in their own apps [S17], building on banking APIs it launched in 2023 [S18]. What it tests in the sandbox is not public in the sources read. SBP has also approved 14 of more than 30 fintechs that applied to join Raast [S2, p. 58].
- **NADRA:** biometric identity checks in every consent [S1, s. 7.2(i)].
- **Telcos:** the OTP goes to the registered mobile number [S1, s. 7.2(ii)], so SIM registration and delivery matter.
- **Agents:** 837,244 branchless banking agents [S3, p. 9] are where many people meet finance. The draft gives them no role (my reading).
- **Development actors** such as Karandaaz: fund and test consumer research, and link open banking to the education roadmap and Digital Model Villages [S2, p. 48].

## Suggestions for the consultation

These are my suggestions, not findings. Each is tied to a gap in the draft.

1. **A path to view and revoke consents without an app.** The dashboard is online only [S1, s. 7.4] while 46.1 million people use call centre and IVR banking [S3, p. 9]. Allow SMS, IVR or branch revocation, as the draft already does for complaints [S1, Annexure A].
2. **A maximum consent duration and a short consent summary in Urdu.** The draft requires a stated duration but sets no cap [S1, s. 7(i)], and asks for plain language only for complaints [S1, s. 11(iii)]. India's consent artefact carries a fixed expiry date [S14, para 6.3].
3. **Publish monthly open banking statistics and test comprehension in the sandbox.** Sahamati and Open Banking Limited publish monthly figures [S15] [S8]. RPP could publish active consents, revocations and disputes from the Incident Register [S1, s. 8.2], and providers could report whether awareness programmes [S1, s. 11(vii)] actually change understanding.

## Limits

- The draft may change after consultation; no comment deadline appears in the text [S1].
- UK consent rules and routing, and Brazil's routing and liability, are not covered by the sources cited.
- India's figures count accounts and consents, not people [S15]. UK figures count connections, not unique people [S8].
- Neem's description is from press [S17] [S18].
- The CGAP data evidence is from 2020, India and Kenya [S16].

## Next: Part 4

Rights matter only if people have a reason to use them. Part 4 looks for documented cases, by vertical, where a digital payment or data tool made its value obvious, and asks what it would take here.

I would value feedback and other readings of the draft.

## Sources

Primary means the issuing body's own document or data. Secondary means reporting or analysis about it.

- [S1] State Bank of Pakistan. *Open Banking Regulations (Draft), for public consultation*. https://www.sbp.org.pk/assets/document/Open_Banking_Regulations_for_Public_Consulatation_Draft.pdf. Primary.
- [S2] State Bank of Pakistan. *Governor's Annual Report 2025-26*. Primary.
- [S3] State Bank of Pakistan. *Annual Payment Systems Review FY 2025-26*. https://www.sbp.org.pk/assets/document/publications/Annual-Payment-Systems-Review-FY26.pdf. Primary.
- [S4] State Bank of Pakistan. *SBP announces the shortlisted applicants for the first cohort of its Regulatory Sandbox (press release)*. https://www.sbp.org.pk/press/2026/Pr-06-Jan-2026.pdf. Primary.
- [S5] World Bank. *The Global Findex Database 2025: Connectivity and Financial Inclusion in the Digital Economy*. https://www.worldbank.org/en/publication/globalfindex. Primary.
- [S6] World Bank. *Digital Public Infrastructure for Inclusive Growth: A Regional Assessment for the Middle East, North Africa, Afghanistan, and Pakistan*. https://documents1.worldbank.org/curated/en/099110926084536993/pdf/P507284-0c4a825c-0c5d-40d5-8e72-cc9a23fa2f46.pdf. Primary.
- [S7] Banco Central do Brasil. *Annual Report 2025*. https://bcb.gov.br/content/publications/Annual_Report_docs/AR-2025.pdf. Primary.
- [S8] Open Banking Limited. *Open Banking Limited marks 8 years of transforming the UK's financial landscape*. https://www.openbanking.org.uk/news/open-banking-limited-marks-8-years-of-transforming-the-uks-financial-landscape/. Primary.
- [S9] Open Banking Limited. *1 Billion Payments and Counting for UK Open Banking*. https://www.openbanking.org.uk/insights/1-billion-payments-and-counting-for-uk-open-banking/. Primary.
- [S10] Financial Conduct Authority. *Feedback Statement FS25/4: Design of the Future Entity for UK Open Banking*. https://www.fca.org.uk/publication/feedback/fs25-4.pdf. Primary.
- [S11] Competition and Markets Authority (GOV.UK). *Retail Banking Market Investigation Order 2017*. https://www.gov.uk/government/publications/retail-banking-market-investigation-order-2017. Primary.
- [S12] legislation.gov.uk. *The Payment Services Regulations 2017, regulation 76*. https://www.legislation.gov.uk/uksi/2017/752/regulation/76. Primary.
- [S13] Financial Conduct Authority. *Financial Lives 2024: Key findings from the FCA's Financial Lives May 2024 survey*. https://www.fca.org.uk/publication/financial-lives/financial-lives-survey-2024-key-findings.pdf. Primary.
- [S14] Reserve Bank of India. *Master Direction: Non-Banking Financial Company, Account Aggregator (Reserve Bank) Directions, 2016*. https://rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10598. Primary.
- [S15] Sahamati. *Account Aggregator Ecosystem Dashboard*. https://sahamati.org.in/?p=2028. Primary.
- [S16] CGAP. *Customers Want Data Protection: How Can Open API Providers Deliver?*. https://www.cgap.org/blog/customers-want-data-protection-how-can-open-api-providers-deliver. Secondary.
- [S17] The Express Tribune. *Epic Angels backs Neem in key pre-Series A round*. https://tribune.com.pk/story/2588580/epic-angels-backs-neem-in-key-pre-series-a-round. Secondary.
- [S18] PYMNTS. *Neem Debuts Embedded Payments Infrastructure for Businesses in Pakistan*. https://www.pymnts.com/news/payment-methods/2023/neem-debuts-embedded-payments-infrastructure-for-businesses-in-pakistan/. Secondary.
- [S19] legislation.gov.uk. *The Payment Services Regulations 2017, regulation 75*. https://www.legislation.gov.uk/uksi/2017/752/regulation/75. Primary.
- [S20] legislation.gov.uk. *Consumer Credit Act 1974, section 157*. https://www.legislation.gov.uk/ukpga/1974/39/section/157. Primary.
- [S21] CGAP. *Responsible Digital Finance Ecosystem (RDFE): A Conceptual Framework*. https://www.cgap.org/research/publication/responsible-digital-finance-ecosystem-rdfe-conceptual-framework. Secondary.
- [S22] Karandaaz Pakistan. *Karandaaz Financial Inclusion Survey (K-FIS): Narrative Report*. https://www.karandaaz.com.pk/research/publications/karandaaz-financial-inclusion-survey-k-fis-narrative-report. Primary.
