// THE BLACK LEDGER · EDITION II — the six FILES' pages (SPEC v4 §5.2).
// Context → method → record, 3–5 paragraphs of authored prose under §7 voice
// law, adapted from the Edition I dossier canon. Every figure is interpolated
// from claims.csv at build; a hard-coded figure is a build failure (v4 §9).

import { getClaim } from '../data';
import { FILES, type FileEntry } from './files';

const grouper = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = (n: number) => '$' + grouper.format(Math.round(n));
const bn = (n: number, d = 1) => `$${(n / 1e9).toFixed(d)} billion`;
const tn = (n: number, d = 1) => `$${(n / 1e12).toFixed(d)} trillion`;

const CONFIDENCE_LABEL: Record<number, string> = {
  1: 'CONFIDENCE 1 — OFFICIAL',
  2: 'CONFIDENCE 2 — AUTHENTICATED LEAK',
  3: 'CONFIDENCE 3 — RELEASED RECORD',
  4: 'CONFIDENCE 4 — ESTIMATE',
  5: 'CONFIDENCE 5 — UNVERIFIED',
};

export interface FilePage extends FileEntry {
  context: string[];
  equation: string[];
  assumptions: string[];
  stamp: string;
  records: string[];
}

const c9 = getClaim('C-0009');
const c10 = getClaim('C-0010');
const c11 = getClaim('C-0011');
const c16 = getClaim('C-0016');
const c18 = getClaim('C-0018');
const c19 = getClaim('C-0019');
const c20 = getClaim('C-0020');
const c21 = getClaim('C-0021');
const c24 = getClaim('C-0024');
const c25 = getClaim('C-0025');

const ciaShare = Math.round((c19.amount! / c18.amount!) * 100); // 28
const nsaShare = Math.round((c20.amount! / c18.amount!) * 100); // 21
const unreportedRise = (((c9.amount! - c10.amount!) / c10.amount!) * 100).toFixed(1); // 25.9

const CONTENT: Record<string, Omit<FilePage, keyof FileEntry>> = {
  langley: {
    context: [
      `In the only year the interior of the intelligence budget was ever visible — fiscal year 2013, in a document the government has never disputed — the Central Intelligence Agency held the largest share: ${bn(c19.amount!)} of a ${bn(c18.amount!)} request, about ${ciaShare}%.`,
      `Every statement about Langley’s budget since is a projection. The method is ratio persistence: the ${ciaShare}% share carried forward onto the appropriated fiscal year 2025 National Intelligence Program of ${bn(c11.amount!)} produces a central value near $20.5 billion. Twelve years of unknown reallocation widen that to a stated range of $${c24.low! / 1e9}–${c24.high! / 1e9} billion, at confidence grade 4 — an estimate, shown only as a range, never added to anything official.`,
      `As a check, the result is compared against the Congressional Research Service finding that intelligence spending has held near 11% of national defense spending since 2007. The two approaches agree to within the band. That agreement is a reason to state a range; it is not a reason to state a point.`,
    ],
    equation: [
      `${ciaShare}% × ${usd(c11.amount!)}`,
      `≈ $20,500,000,000 · drift ±1.25% / yr × 12 yr`,
      `= $${c24.low! / 1e9}–${c24.high! / 1e9} billion`,
    ],
    assumptions: [
      'the 2013 share is assumed to persist within a drift band of ±1.25% per year',
      'the estimate is confidence grade 4; it is never combined with official figures',
    ],
    stamp: CONFIDENCE_LABEL[2],
    records: ['C-0019', 'C-0024', 'C-0011'],
  },
  'fort-meade': {
    context: [
      `The National Security Agency’s share of the leaked fiscal year 2013 request was ${bn(c20.amount!)} — about a fifth of the black budget, second only to the CIA’s.`,
      `Fort Meade holds a second place in this ledger: the document that revealed these numbers left an NSA facility with one of its contractors. The agency whose budget the public glimpsed is the agency whose contractor made the glimpse possible.`,
      `Nothing about the NSA’s budget has been disclosed at that detail since. Its current appropriation is sealed inside the National Intelligence Program topline, and this ledger does not estimate it.`,
    ],
    equation: [
      `${usd(c20.amount!)} ÷ ${usd(c18.amount!)}`,
      `≈ ${nsaShare}% of the FY2013 request`,
    ],
    assumptions: [],
    stamp: CONFIDENCE_LABEL[2],
    records: ['C-0020', 'C-0018'],
  },
  'the-document': {
    context: [
      `In August 2013 the Washington Post published portions of the classified Congressional Budget Justification for fiscal year 2013, disclosed by Edward Snowden. The request totaled ${bn(c18.amount!)} and, for the first and only time, attributed that total to individual agencies — the Central Intelligence Agency at ${bn(c19.amount!)}, the National Security Agency at ${bn(c20.amount!)}, the National Reconnaissance Office at ${bn(c21.amount!)}.`,
      `The government has never disputed the document’s authenticity, which is why its figures are carried here at confidence grade 2 — an authenticated leak, kept separate from official figures and never added to them.`,
      `The document is thirteen years old, and it remains the only complete public map of the intelligence budget’s interior. Every projection in this ledger that leans on it carries that age as a stated caveat.`,
    ],
    equation: [
      `FY2013 CBJ request = ${usd(c18.amount!)}`,
      `published 29 Aug 2013 · never disputed`,
    ],
    assumptions: [],
    stamp: CONFIDENCE_LABEL[2],
    records: ['C-0018', 'C-0019', 'C-0020', 'C-0021'],
  },
  'the-books': {
    context: [
      `The Department of Defense has failed its financial audit eight consecutive times — a disclaimer of opinion in every year since department-wide audits began with fiscal year 2018. It is the only major federal agency never to pass one.`,
      `The fiscal year 2025 result carries twenty-six material weaknesses and two significant deficiencies. Among them, the auditors could not verify the existence and completeness of the F-35 Global Spares Pool, producing a material misstatement on the department’s agency-wide statements. The reported asset base against which these weaknesses stand is ${tn(c16.amount!, 2)}.`,
      `A statutory deadline now applies: the National Defense Authorization Act for fiscal year 2024 requires a clean audit by 31 December 2028. This file records the audit history as published. It draws no inference about the classified budget from the audit result, because none is available.`,
    ],
    equation: [`FY2018 … FY2025`, `= 8 × disclaimer of opinion`, `26 material weaknesses · FY2025`],
    assumptions: [],
    stamp: CONFIDENCE_LABEL[1],
    records: ['C-0017', 'C-0016'],
  },
  'the-six-point-five-trillion': {
    context: [
      `In 2016 the Department of Defense Inspector General examined the Army General Fund statements for fiscal year 2015 and identified ${tn(c25.amount!)} in journal-entry adjustments that lacked adequate documentation or support.`,
      `The figure is gross: a single dollar re-booked ten times, in and out, counts ten times toward it. It measures accounting churn, not missing money.`,
      `It is the clearest published measure of how far the department’s records fall short of an auditable standard, and for that reason it is recorded here and excluded from every total on this site. The circulating claim that trillions “went missing” is not supported by this record, and this ledger does not make it.`,
    ],
    equation: [
      `${usd(c25.amount!)} gross unsupported adjustments · FY2015`,
      `≠ missing cash · excluded from every sum`,
    ],
    assumptions: [],
    stamp: CONFIDENCE_LABEL[3],
    records: ['C-0025'],
  },
  'the-unreported-line': {
    context: [
      `USAspending.gov is the government’s own account of federal spending, agency by agency. It carries a line the platform labels itself: “Unreported Data” — obligations agencies did not report to it. For fiscal year 2025 that line is ${bn(c9.amount!)}, up from ${bn(c10.amount!)} the year before — a rise of ${unreportedRise}% in a single year.`,
      `The line is not a classified-spending figure. It includes classified activity, but it is not limited to it, and this ledger does not claim otherwise.`,
      `What it establishes is narrower and firmer: the government’s primary spending-transparency system publishes, on its own face, the amount it was not told.`,
    ],
    equation: [
      `${usd(c9.amount!)} − ${usd(c10.amount!)}`,
      `= +${usd(c9.amount! - c10.amount!)} · +${unreportedRise}% in one year`,
    ],
    assumptions: [],
    stamp: CONFIDENCE_LABEL[1],
    records: ['C-0009', 'C-0010'],
  },
};

export const FILE_PAGES: FilePage[] = FILES.map((f) => {
  const c = CONTENT[f.slug];
  if (!c) throw new Error(`[files] no page content for ${f.slug}`);
  return { ...f, ...c };
});
