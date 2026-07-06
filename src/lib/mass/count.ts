// THE BLACK LEDGER · TRUE COUNT — the money math (SPEC v7.1 §1).
// Every count derives from claims.csv; a wrong count is a build failure.
// Data governs PROPORTION (§0.2): bill dimensions are the US $100 bill's real
// dimensions; every aggregate is a zero-air packing of the unit below it, so
// every volume on screen is the bills' true volume. Nothing is styled.

import { getClaim } from '../data';

/** the US hundred-dollar bill, millimetres (BEP published dimensions) */
export const BILL_MM = { L: 156.1, W: 66.3, T: 0.1092 };

export const STACK_BILLS = 100; // one strapped stack = $10,000
export const BLOCK_BILLS = 10_000; // one tray (10 × 10 stacks, one layer) = $1,000,000
export const PALLET_BILLS = 1_000_000; // one pallet (100 trays high) = $100,000,000

/** the zero-air nesting law, metres — each unit is exactly the bills it contains */
export const UNITS = {
  bill: { w: BILL_MM.L / 1000, h: BILL_MM.T / 1000, d: BILL_MM.W / 1000 },
  /** 100 bills, piled */
  stack: { w: BILL_MM.L / 1000, h: (BILL_MM.T * STACK_BILLS) / 1000, d: BILL_MM.W / 1000 },
  /** 10 × 10 stacks in one layer — a tray of $1,000,000 */
  tray: {
    w: (BILL_MM.L * 10) / 1000,
    h: (BILL_MM.T * STACK_BILLS) / 1000,
    d: (BILL_MM.W * 10) / 1000,
  },
  /** 100 trays, stacked — a pallet of $100,000,000 */
  pallet: {
    w: (BILL_MM.L * 10) / 1000,
    h: (BILL_MM.T * STACK_BILLS * 100) / 1000,
    d: (BILL_MM.W * 10) / 1000,
  },
};

function check(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`[true-count] wrong count is a build failure: ${msg}`);
}

// the packing must conserve volume exactly — zero air, zero loss
const billVolMM3 = BILL_MM.L * BILL_MM.W * BILL_MM.T;
const palletVolM3 = UNITS.pallet.w * UNITS.pallet.h * UNITS.pallet.d;
check(
  Math.abs(palletVolM3 - (PALLET_BILLS * billVolMM3) / 1e9) < 1e-9,
  'pallet volume must equal exactly one million bill volumes'
);

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

// ---- the per-second landing rate (v7.1 §3.1; the M1 beat's frame count) ----
export const PER_SECOND_USD = getClaim('C-0013').amount! / 31_536_000; // $3,206.11…
export const BILLS_PER_SECOND = Math.floor(PER_SECOND_USD / 100); // 32 — the spec's own floor (§3.1)
check(BILLS_PER_SECOND === 32, `bills/second ${BILLS_PER_SECOND} ≠ 32 (v7.1 §3.1)`);

/** payload handed to the GL module — everything it may draw, nothing it may invent */
export function massPayload() {
  return {
    admitted: ADMITTED,
    billMM: BILL_MM,
    units: UNITS,
    stackBills: STACK_BILLS,
    blockBills: BLOCK_BILLS,
    palletBills: PALLET_BILLS,
    billsPerSecond: BILLS_PER_SECOND,
    perSecondUSD: PER_SECOND_USD,
  };
}
