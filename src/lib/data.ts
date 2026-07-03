// THE BLACK LEDGER — build-time data layer (spec Phase 2).
// Parses the CSV package into typed objects. Every rendered dollar figure must
// resolve to a claims.csv row (see format.ts / getClaim) or the build fails.
//
// The CSV/JSON package is pulled in as build-time asset imports (Vite `?raw` /
// JSON), not read via `node:fs`. This keeps the data layer adapter-agnostic:
// the content is inlined at build and never needs a Node runtime, so any
// bundler/target (static, or an SSR adapter) can build it.

import { parseCSV } from './csv';
import claimsCsv from '../../data/claims.csv?raw';
import sourcesCsv from '../../data/sources.csv?raw';
import toplinesCsv from '../../data/toplines_nip_mip.csv?raw';
import correctionsCsv from '../../data/corrections.csv?raw';
import agencyFY2025 from '../../sources/usaspending_explorer_agency_fy2025.json';

// ---- Types -------------------------------------------------------------

export type Tier = 1 | 2 | 3 | 4 | 5;

export interface Claim {
  id: string;
  metric: string;
  fiscalYear: string;
  /** point value in USD (or the modeled unit); null for status/range-only claims */
  amount: number | null;
  low: number | null;
  high: number | null;
  unit: string;
  tier: Tier;
  method: string;
  sourceId: string;
  retrieved: string;
  /** internal-only build notes (amendment v3.1 §4) — MUST NOT render on any public page */
  notes: string;
  /** public, plain-language name shown in the register and every — Ledger: reference (v3.1 §4) */
  displayName: string;
  /** public, plain-language note shown as the row's note (v3.1 §4) */
  publicNote: string;
  /** true when the claim carries only a low/high band (Tier 4 ranges) */
  isRange: boolean;
}

export interface Source {
  id: string;
  name: string;
  publisher: string;
  url: string;
  retrieved: string;
  tierCeiling: Tier;
  rawFile: string;
  notes: string;
}

export interface ToplineRow {
  fiscalYear: string;
  nipRequestedBn: number | null;
  nipAppropriatedBn: number | null;
  mipRequestedBn: number | null;
  mipAppropriatedBn: number | null;
  totalAppropriatedBn: number | null;
  notes: string;
  sourceUrl: string;
}

export interface Correction {
  id: string;
  date: string;
  claimId: string;
  description: string;
  status: string;
}

// ---- Parsers -----------------------------------------------------------

function num(v: string): number | null {
  if (v === undefined || v === null || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function tier(v: string): Tier {
  const n = Number(v);
  if (n >= 1 && n <= 5) return n as Tier;
  throw new Error(`[data] invalid evidence_tier "${v}"`);
}

export const claims: Claim[] = parseCSV(claimsCsv).map((r) => {
  const amount = num(r.amount_usd);
  const low = num(r.amount_low);
  const high = num(r.amount_high);
  return {
    id: r.claim_id,
    metric: r.metric,
    fiscalYear: r.fiscal_year,
    amount,
    low,
    high,
    unit: r.unit,
    tier: tier(r.evidence_tier),
    method: r.method,
    sourceId: r.source_id,
    retrieved: r.retrieved,
    notes: r.notes,
    displayName: r.display_name,
    publicNote: r.public_note,
    isRange: amount === null && low !== null && high !== null,
  };
});

export const sources: Source[] = parseCSV(sourcesCsv).map((r) => ({
  id: r.source_id,
  name: r.name,
  publisher: r.publisher,
  url: r.url,
  retrieved: r.retrieved,
  tierCeiling: tier(r.tier_ceiling),
  rawFile: r.raw_file,
  notes: r.notes,
}));

export const toplines: ToplineRow[] = parseCSV(toplinesCsv).map((r) => ({
  fiscalYear: r.fiscal_year,
  nipRequestedBn: num(r.nip_requested_bn),
  nipAppropriatedBn: num(r.nip_appropriated_bn),
  mipRequestedBn: num(r.mip_requested_bn),
  mipAppropriatedBn: num(r.mip_appropriated_bn),
  totalAppropriatedBn: num(r.total_appropriated_bn),
  notes: r.notes,
  sourceUrl: r.source_url,
}));

export const corrections: Correction[] = parseCSV(correctionsCsv).map((r) => ({
  id: r.correction_id,
  date: r.date,
  claimId: r.claim_id,
  description: r.description,
  status: r.status,
}));

// ---- Lookups -----------------------------------------------------------

const claimMap = new Map(claims.map((c) => [c.id, c]));
const sourceMap = new Map(sources.map((s) => [s.id, s]));

/** Resolve a claim by ID. Throws at build if the ID is unknown (spec §1: fail the build). */
export function getClaim(id: string): Claim {
  const c = claimMap.get(id);
  if (!c) {
    throw new Error(
      `[data] Unknown claim "${id}". Every rendered figure must resolve to a claims.csv row (spec §1).`,
    );
  }
  return c;
}

export function getSource(id: string): Source {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`[data] Unknown source "${id}".`);
  return s;
}

// ---- Provenance JSON ---------------------------------------------------

export interface AgencyRow {
  name: string;
  amount: number;
  code: string | null;
}

/** USAspending Spending Explorer agency breakdown, FY2025 (spec 03/06). */
export function agencyBreakdownFY2025(): { total: number; results: AgencyRow[] } {
  const raw = agencyFY2025 as { total: number; results: { name: string; amount: number; code?: string | null }[] };
  return {
    total: raw.total,
    results: raw.results.map((a) => ({ name: a.name, amount: a.amount, code: a.code ?? null })),
  };
}
