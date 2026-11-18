# Method and decisions: Part 1

## Scope

Part 1 evaluates Pakistan's digital public infrastructure (DPI) against India, Brazil and Egypt. It covers the three layers in the World Bank's framework (digital identity, digital payments, data sharing) and the enabling layer (law, data protection, institutions). It describes status and gaps. It does not explain why adoption lags; that is Part 2.

Evidence cut off: 17 November 2026.

## How I chose the countries

Two benchmarks and one peer.

- **India** is the closest structural match. It is a large South Asian country that built identity, payments and consented data sharing as public systems under similar demographic limits (S10, S8, S11).
- **Brazil** is the closest institutional match. Its central bank runs the instant payment rail and mandated open finance (S5, pp. 93 and 103), as the State Bank does with Raast and its open banking draft (S2, p. 14; S3, p. 6).
- **Egypt** is a realistic peer. It is in the same lower middle income group, its account ownership is nearer Pakistan's, and the World Bank scores it on the same regional framework (S1, pp. 11 and 57; S4, p. 296).

## How I chose the indicators

I started from the World Bank's own tables (digital ID status, fast payment system, data sharing platform, legal frameworks) so that the Pakistan and Egypt cells rest on one consistent primary source. I then added indicators the series needs for its adoption argument: merchant use, a channel for basic phones, digital payment use, account ownership, and phone ownership by gender. The result is 16 indicators: 4 identity, 6 payments, 2 data sharing, 4 enablers.

I considered and dropped indicators where fewer than two countries had a sourced value: QR merchant counts, nonbank access to the payment system, electronic signature operation, and regulatory sandboxes.

## How I assigned statuses

Four build statuses, in the World Bank's categorical style:

- **In place**: live and in general use, per the source.
- **Partial**: some of it exists or works, with a named missing piece.
- **Pilot**: in testing, draft or limited release.
- **Absent**: not live. Includes "under design" and "under development".

Three other labels: **context** for demographic or usage figures that are not a build status, **not assessed** where I found a figure but could give no comparable status, and **not found**.

I compute no numeric score. Ten of 64 cells are still not found, most of them for India and Brazil, so a score would partly measure what I could not find.

Where the World Bank gives a status I use it as written. Where it does not (India, Brazil), the status is my judgement from the cited figure, and the note in each cell says so.

## Rules of evidence

- Every number has a source id, and a printed page number for reports.
- PRIMARY means I read the publisher's own document or page. SECONDARY means press or a third party. NOT FOUND means I did not fill the cell from memory.
- I checked page numbers against the printed page footers and cite the printed page.
- My own calculations (shares, ratios, per merchant averages) are labelled as mine, with their inputs cited.

## What I excluded

- Electronic signatures, although the World Bank groups them with identity. Too little comparator data.
- Cross border links, cybersecurity practice, digital public goods and open source questions.
- Any overall ranking of the four countries.
- Causal claims about adoption.

## Decision log

| # | Decision | Reason |
|---|---|---|
| 1 | I used the World Bank regional assessment as the framework | It is the one source that assesses Pakistan and Egypt with the same method |
| 2 | I kept Egypt as the peer | Same income group and same World Bank framework; I flag its weak data instead of hiding it |
| 3 | I used a categorical scorecard with no score | It matches the source's approach, and too many cells are not found for a fair score |
| 4 | I treat PAK ID as a pilot | The World Bank's summary table says pilot; I disclose the conflicting figure on p. 17 |
| 5 | I accepted secondary sources for the Pix annual total and merchant share | The Banco Central annual report gives users, aliases and a December figure but not these two; each is labelled |
| 6 | I took UPI volumes from Government of India releases | NPCI's own statistics page could not be read; the releases attribute the data to NPCI |
| 7 | I took all account, digital payment and phone ownership figures from Findex Table B.1 | One survey, one year, one method for all four countries |
| 8 | I used the Findex annex value for Pakistan's account ownership (27%) and disclose the 23% printed in its text | The annex table is the report's stated country statistic |
| 9 | I used Findex, not the Central Bank of Egypt's 76.3%, for Egypt's account ownership | The central bank counts accounts in its own database, including prepaid cards and wallets; Findex surveys adults. I report both but compare only Findex |
| 10 | I report both Findex and GSMA on the phone gender gap without choosing | They differ widely for Pakistani women; the argument only needs the direction, which both support |
| 11 | I state Findex's 14 to 25 point phone gap for India and Egypt at group level | Findex gives the range for four economies together, not per country |
| 12 | I computed payments per QR merchant and label it as mine | It is the clearest single sign of the gap between acceptance and use; I state the caveat on the denominator |
| 13 | I ranked the gaps with account ownership first and merchant payments second | Findex shows most Pakistani account owners already pay digitally, so the first gap is access; the UPI merchant share makes the merchant gap measurable |
| 14 | I added "accounts do not guarantee use" as a lesson from India | India: 89% accounts, 48% digital payment use, 16% of owners inactive |
| 15 | I dropped an earlier claim that Egypt's instant payment network handled 263 million transactions in a quarter | It rested on press only, and the central bank report gives no count; I cite value and users instead |
| 16 | I explain why Findex account ownership differs from SBP's inclusion rate | Readers meet both numbers. NFIS defines inclusion as the share of adults with a bank account: 64% in 2023, target 75% by 2028 (S21, pp. 1 and 23). The latest SBP figure is 69% with a 29% gender gap (S22, pp. 47 to 48). The measurement method is not published, so I say the two are not comparable and do not guess the cause |
| 17 | I removed a UPI123Pay transaction limit from the scorecard | I could not support it from the releases I read |
| 18 | I hold financial literacy as a hypothesis for Part 2 | Part 1 has no evidence that settles it |
| 19 | I left low priority items documented but unresearched | None of them carries an argument in this part |

## Sources I read and replaced

These are no longer cited, and I list them so the trail is complete.

- Press reports on UPI volumes (Angel One, 1 Apr 2026; World Trade Scanner, 21 Jul 2026): replaced by S8.
- Forbes Brasil (21 Jul 2026) on Open Finance consents: replaced by S5.
- Daily News Egypt (17 Nov 2025) and Zawya (undated) on InstaPay: replaced by S6.
- Dawn (19 Jul 2024) on census literacy: replaced by S18.
- digitalpakistan.pk (18 Jul 2025) and a third party copy of the Findex report: replaced by S4.
- DLA Piper's India page (updated 13 Feb 2026): replaced by S13.

## Sources I could not read

- NPCI's UPI product statistics page.
- Banco Central do Brasil's Pix statistics page and the Open Finance Brasil dashboard. S5 covers all but the annual Pix total and merchant share.
- The World Bank's Findex data portal. S4 covers the same figures.
