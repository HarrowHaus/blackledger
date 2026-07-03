// THE BLACK LEDGER — figure formatting + enforcement (spec §4, §2.2, §8).
// Two registers of number, per spec §4.4:
//   - the ONE large figure per chapter: full-precision digits ($7,009,973,667,049)
//   - running annotation figures: abbreviated ($7.010 tn, $206.9 bn, $3,206 / sec)

import type { Claim } from './data';

/** Spec §5 / §8.8: the declared per-second rate of acknowledged classified spend. */
export const COUNTER_RATE = 3206.11;

const grouper = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Grouped integer dollars, e.g. 7009973667049.3 → "$7,009,973,667,049". */
export function usd(n: number): string {
  return '$' + grouper.format(Math.round(n));
}

/** Grouped number without the dollar sign, e.g. 134000000 → "134,000,000". */
export function grouped(n: number): string {
  return grouper.format(Math.round(n));
}

/**
 * The one large figure per chapter — full-precision integer dollars from a claim.
 * Refuses Tier-4 (ranges only, spec §8.7) and status/range claims.
 */
export function bigFigure(claim: Claim): string {
  if (claim.tier === 4) {
    throw new Error(`[format] Claim ${claim.id} is Tier 4 — expose a range, never a point figure (spec §8.7).`);
  }
  if (claim.amount === null) {
    throw new Error(`[format] Claim ${claim.id} has no point amount to render as a large figure.`);
  }
  return usd(claim.amount);
}

/** Exact grouped dollars from a claim's point amount (ledger tables, register). */
export function exactUsd(claim: Claim): string {
  if (claim.tier === 4) {
    throw new Error(`[format] Claim ${claim.id} is Tier 4 — ranges only (spec §8.7).`);
  }
  if (claim.amount === null) {
    throw new Error(`[format] Claim ${claim.id} has no point amount.`);
  }
  return usd(claim.amount);
}

/** Abbreviated running-annotation figure: choose the largest natural unit. */
export function abbrev(n: number, decimals?: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e12) return `$${(n / 1e12).toFixed(decimals ?? 3)} tn`;
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(decimals ?? 1)} bn`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(decimals ?? 1)} m`;
  return usd(n);
}

/** Tier-4 range as an abbreviated band, e.g. "$18–24 bn" (spec §8.7). Uses en dash U+2013. */
export function rangeAbbrev(claim: Claim, decimals = 0): string {
  if (claim.low === null || claim.high === null) {
    throw new Error(`[format] Claim ${claim.id} has no low/high band to render as a range.`);
  }
  const abs = Math.max(Math.abs(claim.low), Math.abs(claim.high));
  if (abs >= 1e12) {
    return `$${(claim.low / 1e12).toFixed(decimals)}–${(claim.high / 1e12).toFixed(decimals)} tn`;
  }
  if (abs >= 1e9) {
    return `$${(claim.low / 1e9).toFixed(decimals)}–${(claim.high / 1e9).toFixed(decimals)} bn`;
  }
  // percent bands (e.g. C-0027 10–12 percent)
  if (claim.unit === 'percent') return `${claim.low}–${claim.high}%`;
  return `$${claim.low}–${claim.high}`;
}

/** "Tier 1", "Tier 4", etc. */
export function tierLabel(claim: Claim): string {
  return `Tier ${claim.tier}`;
}

/**
 * The standard Ledger annotation value (spec §3):
 *   "C-0013 · Tier 1 · retrieved 2026-07-02"
 */
export function ledgerRef(claim: Claim): string {
  return `${claim.id} · Tier ${claim.tier} · retrieved ${claim.retrieved}`;
}
