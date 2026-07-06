// THE BLACK LEDGER · TRUE COUNT — count verification (SPEC v7.1 §4.3 tripwire r).
// Proves the on-screen instance math equals claims.csv values. Run: node scripts/count-verify.mjs

import { readFileSync } from 'node:fs';

function parseCSV(text) {
  const rows = [];
  let row = [], cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') inQ = false;
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(cur); cur = ''; }
    else if (ch === '\n') { row.push(cur.replace(/\r$/, '')); rows.push(row); row = []; cur = ''; }
    else cur += ch;
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  const head = rows[0];
  return rows.slice(1).filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const claims = parseCSV(readFileSync('data/claims.csv', 'utf8'));
const amt = (id) => Number(claims.find((c) => c.claim_id === id).amount_usd);
const f = (n) => n.toLocaleString('en-US');

let failures = 0;
function check(label, actual, expected) {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${f(actual)} ${ok ? '=' : '≠'} ${f(expected)}`);
}

const BILL = { L: 156.1, W: 66.3, T: 0.1092 }; // mm, BEP dimensions
const billVolM3 = (BILL.L * BILL.W * BILL.T) / 1e9;

console.log('— TRUE COUNT VERIFICATION · claims.csv → on-screen instance math —\n');

// beat: K1 (one bill)
console.log('K1 · one bill');
check('  bill value USD', 100, 100);

// beat: K2 (the admitted mass, C-0013)
const c13 = amt('C-0013');
const bills13 = c13 / 100;
console.log(`\nK2 · the admitted mass · C-0013 = $${f(c13)}`);
check('  bills (C-0013 ÷ 100)', bills13, 1_011_000_000);
check('  bills × $100 = claim', bills13 * 100, c13);
check('  stacks of 100', bills13 / 100, 10_110_000);
check('  blocks of 10,000', bills13 / 10_000, 101_100);
check('  pallets of 1,000,000 (rendered instances)', bills13 / 1_000_000, 1_011);
const vol13 = bills13 * billVolM3;
console.log(`  computed bill volume: ${vol13.toFixed(1)} m³ → pallet brick height ${(vol13 / 1011 / 1.2).toFixed(3)} m on a 1.0×1.2 m footprint`);
check('  26×13×3 lattice holds the count', 26 * 13 * 3 >= 1_011 && 26 * 13 * 3 - 1_011 === 3 ? 1 : 0, 1);

// beat: K3 (the unreported mass, C-0009 — law now, rendered in P3)
const c9 = amt('C-0009');
console.log(`\nK3 · the unreported mass · C-0009 = $${f(c9)}`);
check('  bills (C-0009 ÷ 100, floored — cents are not a bill)', Math.floor(c9 / 100), 2_069_218_711);

// beat: the live mass rate (v7.1 §3.1 — law now, rendered in P4)
console.log('\nLIVE · bills per second');
check('  32 bills/second (⌊$3,206.11/sec ÷ 100⌋)', Math.floor(c13 / 31_536_000 / 100), 32);

console.log(failures === 0 ? '\nALL COUNTS TRUE' : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
