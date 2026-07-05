// THE BLACK LEDGER · EDITION II — the six FILES (SPEC v4 §5.2, names + stakes verbatim).
export interface FileEntry {
  slug: string;
  name: string;
  stake: string;
  cites: string[];
}

export const FILES: FileEntry[] = [
  {
    slug: 'langley',
    name: 'LANGLEY',
    stake: 'the CIA: 28% of the budget in the only year we ever saw inside.',
    cites: ['C-0019'],
  },
  {
    slug: 'fort-meade',
    name: 'FORT MEADE',
    stake:
      'the NSA: a fifth of the black budget, and the reason we know any of this — its contractor walked out with the document.',
    cites: ['C-0020', 'C-0018'],
  },
  {
    slug: 'the-document',
    name: 'THE DOCUMENT',
    stake:
      'the 2013 leak: Edward Snowden’s disclosure, the Washington Post’s decision to publish, the only map that exists.',
    cites: ['C-0018'],
  },
  {
    slug: 'the-books',
    name: 'THE BOOKS',
    stake:
      'the Pentagon’s audit: eight failures, twenty-six weaknesses, and the inspectors who keep writing it down.',
    cites: ['C-0017', 'C-0016'],
  },
  {
    slug: 'the-six-point-five-trillion',
    name: 'THE SIX-POINT-FIVE TRILLION',
    stake:
      'the misused number: what the Army’s unsupported entries actually prove, and what they don’t.',
    cites: ['C-0025'],
  },
  {
    slug: 'the-unreported-line',
    name: 'THE UNREPORTED LINE',
    stake:
      'the confession in the machine: the government’s own site admitting what it isn’t told.',
    cites: ['C-0009', 'C-0010'],
  },
];

/** the file a claim belongs to, if any (files are reachable from relevant RECORD strata — §5.2) */
export function fileForClaim(claimId: string): FileEntry | null {
  return FILES.find((f) => f.cites.includes(claimId)) ?? null;
}
