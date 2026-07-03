// THE BLACK LEDGER — Chapter 03 dossier registry (spec §5 ch03).
// Drives the subjects index list and prev/next links. One-line figures are
// derived from claims so they cannot drift.

import { getClaim } from './data';
import { abbrev, rangeAbbrev } from './format';

export interface Dossier {
  n: string; // "01".."06"
  slug: string;
  name: string;
  /** sentence-case title (Newsreader 500, terminal period) */
  title: string;
  /** one-line figure shown on the index row */
  figure: string;
}

export const DOSSIERS: Dossier[] = [
  {
    n: '01',
    slug: 'national-intelligence-program',
    name: 'THE NATIONAL INTELLIGENCE PROGRAM',
    title: 'The National Intelligence Program.',
    figure: `${abbrev(getClaim('C-0011').amount!)} appropriated · FY2025`,
  },
  {
    n: '02',
    slug: 'leaked-interior',
    name: 'THE LEAKED INTERIOR',
    title: 'The leaked interior.',
    figure: `${abbrev(getClaim('C-0018').amount!)} requested · FY2013 · leaked`,
  },
  {
    n: '03',
    slug: 'projection',
    name: 'THE PROJECTION',
    title: 'The projection.',
    figure: `${rangeAbbrev(getClaim('C-0024'))} · CIA FY2025 · modeled`,
  },
  {
    n: '04',
    slug: 'audit',
    name: 'THE AUDIT',
    title: 'The audit.',
    figure: `8 disclaimers · ${abbrev(getClaim('C-0016').amount!, 2)} assets`,
  },
  {
    n: '05',
    slug: 'adjustments',
    name: 'THE ADJUSTMENTS',
    title: 'The adjustments.',
    figure: `${abbrev(getClaim('C-0025').amount!, 1)} unsupported · FY2015`,
  },
  {
    n: '06',
    slug: 'unreported-line',
    name: 'THE UNREPORTED LINE',
    title: 'The unreported line.',
    figure: `${abbrev(getClaim('C-0009').amount!)} · FY2025`,
  },
];

export function dossierBySlug(slug: string): Dossier {
  const d = DOSSIERS.find((x) => x.slug === slug);
  if (!d) throw new Error(`[dossiers] unknown slug "${slug}"`);
  return d;
}

export function dossierNeighbours(slug: string): { prev: Dossier | null; next: Dossier | null } {
  const i = DOSSIERS.findIndex((x) => x.slug === slug);
  return {
    prev: i > 0 ? DOSSIERS[i - 1] : null,
    next: i >= 0 && i < DOSSIERS.length - 1 ? DOSSIERS[i + 1] : null,
  };
}
