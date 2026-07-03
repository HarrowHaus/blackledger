This document is the rulebook. Every page of the site links to it. Nothing gets published that doesn't follow it.

## 1. What we are measuring
Two distinct gaps, never conflated:

**GAP-A — The Visibility Gap.** Treasury says the government spent X (Monthly Treasury Statement, Total Outlays). The award-tracking system (USAspending) can show Y as contracts, grants, loans, and direct payments. X − Y is the residual. Most of the residual is *explainable* — interest on the debt, federal salaries and operations, intragovernmental flows. This site's job is to decompose the residual with sources until what remains is genuinely unexplained, and to show that the disclosed classified budget lives inside it.

**GAP-B — The Acknowledged Black Budget's Interior.** The government publishes exactly two classified-spending numbers per year: the NIP topline (mandatory, 50 U.S.C. §3306) and the MIP topline (voluntary since 2007). FY2025 appropriated: $73.3B + $27.8B = $101.1B. Beneath those toplines, attribution comes only from: summed "classified programs" line items in DoD justification books (Tier 1), declassified budget histories (Tier 1/3), the leaked FY2013 budget justification (Tier 2), FOIA fragments (Tier 3), and bounded models (Tier 4). The remainder is displayed as *unattributed classified spending* — a range, never a point.

## 2. Evidence tiers
- **T1 Official** — agency-published figure. May appear in headlines.
- **T2 Authenticated leak** — document authenticated or undisputed by government, reported by major outlets. May appear in headlines with a leak badge.
- **T3 FOIA / court** — released record, court record, or figure from an OIG/GAO report. Headline-eligible.
- **T4 Modeled / testimony** — bounded inference with published assumptions, or sworn testimony without documents. Rendered ONLY as shaded ranges, never combined with grades 1–3, never in a headline number.
- **T5 Claimed** — books, interviews, forums, anonymous sources. Stored and displayed in a visually separate register ("The Unverified Shelf"). Never combined with anything.

## 3. The traps that killed prior attempts — and the rules that avoid them

### 3.1 The $21T trap
The Skidmore/Fitts figure aggregates *unsupported journal-entry adjustments* — gross accounting churn where the same dollar is re-booked repeatedly in both directions. It is evidence of **unauditable books** (real, confirmed by DoD OIG and GAO), not of missing cash. Claim C-0025 ($6.5T Army FY2015, DODIG-2016-113) is ingested at Tier 3 with this framing hard-coded in its notes and is quarantined from all sums. The site presents adjustment figures on their own page ("The Books Don't Balance") that explains what an unsupported adjustment is, with the DoD's 8 consecutive audit failures (C-0017) as the honest headline instead.

### 3.2 The obligations-vs-outlays trap
Treasury MTS reports **outlays** (checks actually cut). USAspending mostly reports **obligations** (legal commitments, which can outlay over years). The Spending Explorer total ($10.33T FY2025) also grosses up intragovernmental transfers, which is why it *exceeds* total outlays ($7.01T). Rule: GAP-A subtractions must compare like with like. The v1 residual (C-0026) is labeled as a first-order approximation; this site's first analytical task is the outlay-basis decomposition using MTS Table 5 classifications (interest, Social Security, Medicare, defense, etc. — all published monthly) so the residual shrinks to what genuinely lacks a public paper trail.

### 3.3 The false-precision trap
Any number produced by a model gets a range and a published assumption list, full stop. Example: C-0024 projects CIA's FY2013 NIP share (28%) onto FY2025's NIP and gets ~$20.5B — displayed as $18–24B with a visible "12 years of drift" caveat, at Tier 4.

## 4. Inference models (all output T4 ranges)
- **4.1 Ratio persistence:** agency shares from the FY2013 leaked CBJ carried forward with a widening band (±1.25%/yr compounding), sanity-checked against the CRS ~11%-of-defense ratio (C-0027).
- **4.2 Line-item archaeology:** year-over-year diff of R-1/P-1 justification books; programs that appear, balloon, then vanish into "classified programs" get flagged with entry/exit deltas.
- **4.3 Contractor triangulation:** classified/restricted-segment revenue from 10-Ks bounds the contractor-facing slice.
- **4.4 Workforce/facility proxies:** clearance-holder counts, launch cadence × published launch-cost ranges, construction obligations near known installations. Ensemble-only; individually meaningless.

## 5. The corrections culture
Public, append-only corrections log (same pattern as spendingnow.org). Claims are versioned via `supersedes`; nothing is silently edited. Every chart carries: source ID, retrieval date, tier badge, and a link to the raw file in `/sources/`.

## 6. Update cadence
- Monthly: MTS tables (≈8th business day) → GAP-A refresh
- Nightly-capable but monthly is fine: USAspending pulls
- Annually (Oct–Nov): NIP/MIP appropriated disclosures → toplines CSV
- Annually (Feb–Mar): budget request + justification books → archaeology diff
- Annually (Nov–Dec): DoD AFR + audit result
- Quarterly: contractor 10-K/10-Q classified-revenue scrape
