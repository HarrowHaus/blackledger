// THE BLACK LEDGER · EDITION II — descent content (SPEC v4 §4; v4.1 §3.4).
// Four strata per monument, all derived from the claims canon at build time.
// CONTEXT copy: monument 2 is §4 verbatim; the others are authored from each
// claim's public_note plus one comparison, under §7 voice law (flagged in the
// phase report). METHOD equations are the actual computations. RECORD rows are
// the actual ledger rows. Provenance fragments are the raw data we hold.

import { getClaim, getSource } from '../data';
import { MONUMENTS, YEAR_SECONDS, type Monument } from './monuments';
import { fileForClaim, type FileEntry } from './files';
import agencyFY2025 from '../../../sources/usaspending_explorer_agency_fy2025.json';

const grouper = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = (n: number) => '$' + grouper.format(Math.round(n));

const c1 = getClaim('C-0001');
const outlays = c1.amount!;

/** percentage of total outlays, one decimal, floored — the ledger never overstates
    (and §4's verbatim caption for monument 2 is "2.9%": 2.952 truncates, it does not round up) */
const pctOfOutlays = (n: number) => (Math.floor((n / outlays) * 1000) / 10).toFixed(1);

export interface DescentData {
  slug: string;
  figure: string;
  caption: string;
  context: string[];
  /** proportion mark; null where the monument has no dollar figure (status claims) */
  bar: { pct: number; caption: string } | null;
  equation: string[];
  assumptions: string[];
  stamp: string;
  record: {
    id: string;
    metric: string;
    amount: string;
    year: string;
    sourceName: string;
    sourceUrl: string;
    retrieved: string;
  }[];
  file: FileEntry | null;
  provenance: string;
}

// human-readable source pages (carried over from the Edition I record); raw API
// endpoints are provenance, not destinations
const HUMAN_URL: Record<string, string> = {
  'S-01':
    'https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/summary-of-receipts-and-outlays-of-the-u-s-government/',
  'S-02': 'https://www.usaspending.gov/search',
  'S-03': 'https://www.usaspending.gov/explorer/agency',
  'S-04': 'https://www.usaspending.gov/explorer/agency',
};

function recordRow(claimId: string) {
  const c = getClaim(claimId);
  const s = getSource(c.sourceId);
  return {
    id: c.id,
    metric: c.metric,
    amount: c.amount !== null ? (c.unit === 'USD' ? usd(c.amount) : grouper.format(c.amount)) : c.unit,
    year: c.fiscalYear,
    sourceName: s.name,
    sourceUrl: HUMAN_URL[s.id] ?? s.url,
    retrieved: c.retrieved,
  };
}

function claimFragment(claimId: string): object {
  const c = getClaim(claimId);
  return {
    claim_id: c.id,
    metric: c.metric,
    fiscal_year: c.fiscalYear,
    amount_usd: c.amount,
    unit: c.unit,
    evidence_tier: c.tier,
    method: c.method,
    source_id: c.sourceId,
    retrieved: c.retrieved,
  };
}

const unreportedRaw = (agencyFY2025 as { results: { name: string; amount: number }[] }).results.find(
  (r) => r.name === 'Unreported Data'
);

const barCaption = (n: number) => `${pctOfOutlays(n)}% of everything the Treasury paid out`;

const c9 = getClaim('C-0009');
const c11 = getClaim('C-0011');
const c12 = getClaim('C-0012');
const c13 = getClaim('C-0013');
const c14 = getClaim('C-0014');
const c15 = getClaim('C-0015');
const c16 = getClaim('C-0016');
const c5 = getClaim('C-0005');
const c26 = getClaim('C-0026');
const c28 = getClaim('C-0028');

const CONTENT: Record<
  string,
  Pick<DescentData, 'context' | 'bar' | 'equation' | 'assumptions'> & { records: string[] }
> = {
  'c-0013-second': {
    context: [
      'The two disclosed intelligence totals added together — everything the government officially admits spending on classified work.',
      `Spread across the year, that is about ${usd(c13.amount! / YEAR_SECONDS)} every second, including this one.`,
    ],
    bar: { pct: (c13.amount! / outlays) * 100, caption: barCaption(c13.amount!) },
    equation: [
      `${usd(c13.amount!)} ÷ ${grouper.format(YEAR_SECONDS)} s`,
      `= $${(c13.amount! / YEAR_SECONDS).toFixed(2)} / s`,
    ],
    assumptions: [],
    records: ['C-0013'],
  },
  'c-0009': {
    // §4 verbatim
    context: [
      'The tracking site keeps a line it labels “Unreported Data” — money agencies never told it about.',
      'Secret programs are part of this line, but not all of it.',
      'It grew $42.5 billion in one year.',
    ],
    bar: { pct: (c9.amount! / outlays) * 100, caption: barCaption(c9.amount!) },
    equation: [
      'USAspending Spending Explorer · FY2025',
      `“Unreported Data” = ${usd(c9.amount!)}`,
      'disclosed by the system itself; not computed',
    ],
    assumptions: [],
    records: ['C-0009'],
  },
  'c-0009-c-0013': {
    context: [
      `The law lets the government seal ${usd(c13.amount!)} behind two published totals.`,
      `Last year agencies failed to report ${usd(c9.amount!)} to the government’s own tracking site.`,
      'What goes unreported outweighs what is lawfully hidden, two to one.',
    ],
    bar: { pct: (c9.amount! / outlays) * 100, caption: barCaption(c9.amount!) },
    equation: [
      `${usd(c9.amount!)} ÷ ${usd(c13.amount!)}`,
      `= ${(c9.amount! / c13.amount!).toFixed(2)} ≈ 2 : 1`,
    ],
    assumptions: [],
    records: ['C-0009', 'C-0013'],
  },
  'c-0026': {
    context: [
      `Total spending minus traceable spending leaves ${usd(c26.amount!)} the tracking cannot show.`,
      'Most of it has ordinary explanations — debt interest, salaries, the machinery of government.',
      'The secret budget lives inside what remains.',
    ],
    bar: { pct: (c26.amount! / outlays) * 100, caption: barCaption(c26.amount!) },
    equation: [
      `${usd(outlays)} − ${usd(c5.amount!)}`,
      `= ${usd(c26.amount!)}`,
    ],
    assumptions: [],
    records: ['C-0026', 'C-0001', 'C-0005'],
  },
  'c-0013': {
    context: [
      `The National Intelligence Program: ${usd(c11.amount!)}. The Military Intelligence Program: ${usd(c12.amount!)}.`,
      'Two numbers a year; below them, disclosure ends.',
    ],
    bar: { pct: (c13.amount! / outlays) * 100, caption: barCaption(c13.amount!) },
    equation: [
      `${usd(c11.amount!)} + ${usd(c12.amount!)}`,
      `= ${usd(c13.amount!)}`,
    ],
    assumptions: [],
    records: ['C-0013', 'C-0011', 'C-0012'],
  },
  'c-0017': {
    context: [
      'Auditors could not give an opinion on the Pentagon’s books for the eighth consecutive year, and recorded twenty-six serious accounting weaknesses.',
      `The books behind ${usd(c16.amount!)} in reported assets could not be verified.`,
      'It is the only major federal agency never to pass an audit.',
    ],
    bar: null, // a status claim has no dollar figure to set against outlays
    equation: ['FY2018 … FY2025', '= 8 × disclaimer of opinion', 'recorded by the department’s own inspectors'],
    assumptions: [],
    records: ['C-0017', 'C-0016'],
  },
  'c-0028-c-0013': {
    context: [
      `The acknowledged secret budget, divided across the roughly ${grouper.format(c28.amount!)} households that file federal returns.`,
      `About ${usd(c13.amount! / c28.amount!)} per household this year — before the unreported line, before the residual.`,
    ],
    bar: { pct: (c13.amount! / outlays) * 100, caption: barCaption(c13.amount!) },
    equation: [
      `${usd(c13.amount!)} ÷ ${grouper.format(c28.amount!)} households`,
      `≈ ${usd(c13.amount! / c28.amount!)}`,
    ],
    assumptions: ['the household count is approximate (IRS Statistics of Income); the result is labeled approximate'],
    records: ['C-0013', 'C-0028'],
  },
  'c-0014-c-0015': {
    context: [
      `The FY2026 request: ${usd(c14.amount!)} for civilian intelligence, ${usd(c15.amount!)} for military intelligence.`,
      `Combined, the largest classified ask ever disclosed — $8.5 billion more than the year before on the civilian side alone.`,
    ],
    bar: {
      pct: ((c14.amount! + c15.amount!) / outlays) * 100,
      caption: barCaption(c14.amount! + c15.amount!),
    },
    equation: [
      `${usd(c14.amount!)} + ${usd(c15.amount!)}`,
      `= ${usd(c14.amount! + c15.amount!)}`,
    ],
    assumptions: [],
    records: ['C-0014', 'C-0015'],
  },
};

function provenanceFor(m: Monument): string {
  if (m.claimIds.includes('C-0009') && unreportedRaw) {
    return JSON.stringify(
      { source: 'api.usaspending.gov · Spending Explorer · agency · FY2025', fragment: unreportedRaw },
      null,
      2
    );
  }
  return JSON.stringify({ source: 'data/claims.csv', rows: m.claimIds.map(claimFragment) }, null, 2);
}

export const DESCENTS: DescentData[] = MONUMENTS.map((m) => {
  const c = CONTENT[m.slug];
  if (!c) throw new Error(`[descents] no strata content for monument ${m.n} (${m.slug})`);
  const tier = getClaim(m.claimIds[0]).tier;
  if (tier !== 1) throw new Error(`[descents] monument ${m.n} tier drifted — stamp copy assumes grade 1`);
  return {
    slug: m.slug,
    figure: m.figure,
    caption: m.caption,
    context: c.context,
    bar: c.bar,
    equation: c.equation,
    assumptions: c.assumptions,
    stamp: 'CONFIDENCE 1 — OFFICIAL',
    record: c.records.map(recordRow),
    file: m.claimIds.map(fileForClaim).find(Boolean) ?? null,
    provenance: provenanceFor(m),
  };
});
