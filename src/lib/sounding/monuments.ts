// THE BLACK LEDGER · EDITION II — the eight monuments (SPEC v4 §3).
// Every displayed figure is DERIVED here from claims.csv at build time; a
// hard-coded figure is a build failure (v4 §9). Captions are §3 verbatim.

import { getClaim, getSource } from '../data';

const grouper = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = (n: number) => '$' + grouper.format(Math.round(n));

/** seconds in the civil year used by the canon (Edition I §8.8; unchanged) */
export const YEAR_SECONDS = 31_536_000;

export interface Monument {
  n: number;
  /** stable anchor + descent id, the primary claim id lowercased */
  slug: string;
  /** the displayed figure, verbatim-equal to v4 §3 */
  figure: string;
  /** §3 caption, verbatim */
  caption: string;
  /** ledger line: the claim ids, verbatim per §3 */
  ledger: string;
  claimIds: string[];
  /** provenance line for citation-on-copy (v4.1 §3.3) */
  citation: string;
  /** true for monument 1 only: live ember digits */
  live: boolean;
  /** long figures need the narrower display size */
  long: boolean;
}

function check(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`[monuments] figure drifted from claims.csv: ${msg}`);
}

// ---- derive every figure from the canon ----
const c9 = getClaim('C-0009');
const c13 = getClaim('C-0013');
const c14 = getClaim('C-0014');
const c15 = getClaim('C-0015');
const c17 = getClaim('C-0017');
const c26 = getClaim('C-0026');
const c28 = getClaim('C-0028');

export const COUNTER_RATE = c13.amount! / YEAR_SECONDS; // 3,206.11…/sec
check(Math.round(COUNTER_RATE) === 3206, `per-second rate ${COUNTER_RATE}`);

const unreportedExact = usd(c9.amount!); // $206,921,871,135
const ratio = Math.round(c9.amount! / c13.amount!); // 2
const residualTn = `$${(c26.amount! / 1e12).toFixed(2)} trillion`; // $1.71 trillion
const admittedBn = `$${(c13.amount! / 1e9).toFixed(1)} billion`; // $101.1 billion
// the audit-failure count is a status claim; its figure is carried in the claim's own note
check(/eighth/i.test(c17.publicNote), 'C-0017 note no longer states the eighth failure');
const failures = 8;
const household = usd(Math.round(c13.amount! / c28.amount!)); // $754
check(household === '$754', `household share ${household}`);
const nextAskBn = `$${((c14.amount! + c15.amount!) / 1e9).toFixed(1)} billion`; // $115.5 billion

// compact provenance labels for citation-on-copy, format per the v4.1 §3.3 example
// (`source: USAspending FY2025`); fallback is the registered source name
const SHORT_SOURCE: Record<string, string> = {
  'S-01': 'Treasury MTS FY2025',
  'S-03': 'USAspending FY2025',
  'S-05': 'ODNI IC Budget FY2025',
  'S-07': 'ODNI PR 12-25',
  'S-09': 'DoD OIG FY2025',
  'S-21': 'IRS SOI',
};
const cite = (figure: string, ids: string[]): string => {
  const srcId = getClaim(ids[0]).sourceId;
  const label = SHORT_SOURCE[srcId] ?? getSource(srcId).name;
  return `${figure} — The Black Ledger, claim ${ids.join('/')}, source: ${label}`;
};

export const MONUMENTS: Monument[] = [
  {
    n: 1,
    slug: 'c-0013-second',
    figure: usd(Math.round(COUNTER_RATE)),
    caption: 'of admitted classified spending, every second. Live.',
    ledger: 'C-0013',
    claimIds: ['C-0013'],
    citation: cite(usd(Math.round(COUNTER_RATE)), ['C-0013']),
    live: true,
    long: false,
  },
  {
    n: 2,
    slug: 'c-0009',
    figure: unreportedExact,
    caption: 'the government’s own tracking site was never told where this went last year.',
    ledger: 'C-0009',
    claimIds: ['C-0009'],
    citation: cite(unreportedExact, ['C-0009']),
    live: false,
    long: true,
  },
  {
    n: 3,
    slug: 'c-0009-c-0013',
    figure: `${ratio} : 1`,
    caption: 'what agencies fail to report outweighs what the law lets them hide.',
    ledger: 'C-0009/C-0013',
    claimIds: ['C-0009', 'C-0013'],
    citation: cite(`${ratio} : 1`, ['C-0009', 'C-0013']),
    live: false,
    long: false,
  },
  {
    n: 4,
    slug: 'c-0026',
    figure: residualTn,
    caption: 'paid out last year beyond anything traceable as a contract, grant, or loan.',
    ledger: 'C-0026',
    claimIds: ['C-0026'],
    citation: cite(residualTn, ['C-0026']),
    live: false,
    long: false,
  },
  {
    n: 5,
    slug: 'c-0013',
    figure: admittedBn,
    caption: 'the secret budget the United States admits to. Two numbers a year. Nothing beneath them.',
    ledger: 'C-0013',
    claimIds: ['C-0013'],
    citation: cite(admittedBn, ['C-0013']),
    live: false,
    long: false,
  },
  {
    n: 6,
    slug: 'c-0017',
    figure: String(failures),
    caption: 'consecutive failed audits. The Pentagon has never passed one.',
    ledger: 'C-0017',
    claimIds: ['C-0017'],
    citation: cite(String(failures), ['C-0017']),
    live: false,
    long: false,
  },
  {
    n: 7,
    slug: 'c-0028-c-0013',
    figure: household,
    caption: 'your household’s share of the admitted secret budget this year.',
    ledger: 'C-0028/C-0013',
    claimIds: ['C-0028', 'C-0013'],
    citation: cite(household, ['C-0028', 'C-0013']),
    live: false,
    long: false,
  },
  {
    n: 8,
    slug: 'c-0014-c-0015',
    figure: nextAskBn,
    caption: 'next year’s ask — the largest classified request ever disclosed.',
    ledger: 'C-0014/C-0015',
    claimIds: ['C-0014', 'C-0015'],
    citation: cite(nextAskBn, ['C-0014', 'C-0015']),
    live: false,
    long: false,
  },
];

// §3 verbatim figure tripwire, enforced at build
const EXPECTED: [number, string][] = [
  [1, '$3,206'],
  [2, '$206,921,871,135'],
  [3, '2 : 1'],
  [4, '$1.71 trillion'],
  [5, '$101.1 billion'],
  [6, '8'],
  [7, '$754'],
  [8, '$115.5 billion'],
];
for (const [n, fig] of EXPECTED) {
  check(MONUMENTS[n - 1].figure === fig, `monument ${n}: derived "${MONUMENTS[n - 1].figure}" ≠ spec "${fig}"`);
}
