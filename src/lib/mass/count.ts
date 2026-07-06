// THE BLACK LEDGER · TRUE COUNT — the money math (SPEC v7.1 §1).
// Every count derives from claims.csv; a wrong count is a build failure.
// Data governs PROPORTION (§0.2): bill dimensions are the US $100 bill's real
// dimensions; aggregate volumes are computed, never faked.

import { getClaim } from '../data';

/** the US hundred-dollar bill, millimetres (BEP published dimensions) */
export const BILL_MM = { L: 156.1, W: 66.3, T: 0.1092 };

export const STACK_BILLS = 100; // one strapped stack = $10,000
export const BLOCK_BILLS = 10_000; // one block (100 stacks) = $1,000,000
export const PALLET_BILLS = 1_000_000; // one pallet (100 blocks) = $100,000,000

function check(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`[true-count] wrong count is a build failure: ${msg}`);
}

export interface MassCount {
  claimId: string;
  usd: number;
  bills: number;
  stacks: number;
  blocks: number;
  pallets: number; // fractional pallets round UP into a visibly partial final unit
  /** computed physical volume of the bills, m³ (bill volume × count; no packing air) */
  volumeM3: number;
}

export function massFor(claimId: string): MassCount {
  const c = getClaim(claimId);
  check(c.amount !== null, `${claimId} has no point amount`);
  const usd = c.amount!;
  const bills = usd / 100;
  check(Number.isInteger(bills), `${claimId}: ${usd} is not a whole number of hundred-dollar bills`);
  const billVolMM3 = BILL_MM.L * BILL_MM.W * BILL_MM.T;
  return {
    claimId,
    usd,
    bills,
    stacks: Math.ceil(bills / STACK_BILLS),
    blocks: Math.ceil(bills / BLOCK_BILLS),
    pallets: Math.ceil(bills / PALLET_BILLS),
    volumeM3: (bills * billVolMM3) / 1e9,
  };
}

// ---- the admitted mass (C-0013), asserted against v7.1 §1.1's stated count ----
export const ADMITTED = massFor('C-0013');
check(ADMITTED.bills === 1_011_000_000, `admitted bills ${ADMITTED.bills} ≠ 1,011,000,000 (v7.1 §1.1)`);
check(ADMITTED.bills * 100 === ADMITTED.usd, 'bill count × $100 must equal the claim exactly');
check(ADMITTED.pallets === 1_011, `admitted pallets ${ADMITTED.pallets} ≠ 1,011`);

// ---- the unreported mass (C-0009), asserted against v7.1 §1.3 K3's stated count ----
// (K3 renders in P3; the math is law now so the module carries one truth from day one.)
const c9 = getClaim('C-0009');
export const UNREPORTED_BILLS = Math.floor(c9.amount! / 100); // 2,069,218,711 — the cents are not a bill
check(UNREPORTED_BILLS === 2_069_218_711, `unreported bills ${UNREPORTED_BILLS} ≠ 2,069,218,711 (v7.1 §1.3)`);

/** payload handed to the GL module — everything it may draw, nothing it may invent */
export function massPayload() {
  return {
    admitted: ADMITTED,
    billMM: BILL_MM,
    perSecondUSD: getClaim('C-0013').amount! / 31_536_000,
  };
}
