// THE BLACK LEDGER · EDITION II — OG poster cards (SPEC v4.1 §3.7).
// Build-time generated: the number at monument scale + the confidence stamp +
// the thesis line. Every figure is derived from data/claims.csv and asserted
// against the §3 verbatim values — a hard-coded figure is a build failure.
//
// Usage: node scripts/og.mjs --fonts <dir with fraunces.ttf + plexmono.ttf>
// Output: public/og/{slug}.png (1200×630) + app icons in public/.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const fontsDir = process.argv[includesIdx('--fonts') + 1] ?? 'scripts/fonts';
function includesIdx(flag) {
  const i = process.argv.indexOf(flag);
  return i === -1 ? process.argv.length - 2 : i;
}

// ---- minimal CSV (quoted fields) ----
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
const amt = (id) => {
  const c = claims.find((c) => c.claim_id === id);
  if (!c) throw new Error(`no claim ${id}`);
  return Number(c.amount_usd);
};

const grouper = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = (n) => '$' + grouper.format(Math.round(n));

const THESIS_1 = 'The United States admits $101.1 billion of classified spending a year —';
const THESIS_2 = 'and fails to account for twice that. Every figure is traceable to its source.';

const CARDS = [
  { slug: 'c-0013-second', figure: usd(Math.round(amt('C-0013') / 31_536_000)), size: 300 },
  { slug: 'c-0009', figure: usd(amt('C-0009')), size: 118 },
  { slug: 'c-0009-c-0013', figure: `${Math.round(amt('C-0009') / amt('C-0013'))} : 1`, size: 300 },
  { slug: 'c-0026', figure: `$${(amt('C-0026') / 1e12).toFixed(2)} trillion`, size: 150 },
  { slug: 'c-0013', figure: `$${(amt('C-0013') / 1e9).toFixed(1)} billion`, size: 150 },
  { slug: 'c-0017', figure: '8', size: 340 },
  { slug: 'c-0028-c-0013', figure: usd(Math.round(amt('C-0013') / amt('C-0028'))), size: 300 },
  { slug: 'c-0014-c-0015', figure: `$${((amt('C-0014') + amt('C-0015')) / 1e9).toFixed(1)} billion`, size: 150 },
];
const EXPECT = ['$3,206', '$206,921,871,135', '2 : 1', '$1.71 trillion', '$101.1 billion', '8', '$754', '$115.5 billion'];
CARDS.forEach((c, i) => {
  if (c.figure !== EXPECT[i]) throw new Error(`card ${c.slug}: ${c.figure} ≠ ${EXPECT[i]}`);
});

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function cardSVG({ figure, size }, ember) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#141210"/>
  <text x="64" y="78" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="#8F877A">THE BLACK LEDGER</text>
  <text x="600" y="368" text-anchor="middle" font-family="Fraunces" font-weight="340" font-size="${size}" fill="${ember ? '#C8511F' : '#E8E0CE'}">${esc(figure)}</text>
  <g transform="translate(64,444) rotate(-3)">
    <rect x="0" y="0" width="368" height="56" fill="none" stroke="#C8511F" stroke-width="2"/>
    <text x="184" y="37" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="20" letter-spacing="3" fill="#C8511F">CONFIDENCE 1 — OFFICIAL</text>
  </g>
  <text x="64" y="556" font-family="IBM Plex Mono" font-size="19" fill="#8F877A">${esc(THESIS_1)}</text>
  <text x="64" y="586" font-family="IBM Plex Mono" font-size="19" fill="#8F877A">${esc(THESIS_2)}</text>
  <line x1="64" y1="104" x2="1136" y2="104" stroke="#2C2823" stroke-width="1"/>
</svg>`;
}

const PLUMB = (s, w) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#141210"/>
  <g fill="none" stroke="#E8E0CE" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 7.5 C31.7 14 32.3 24 31.9 36.5"/>
    <path d="M32 36.5 L26.4 44.2 L31.7 56.2 L37.3 44.6 Z"/>
  </g>
</svg>`;

const fonts = [`${fontsDir}/fraunces.ttf`, `${fontsDir}/plexmono.ttf`];
const render = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: fonts, loadSystemFonts: false },
  }).render().asPng();

mkdirSync('public/og', { recursive: true });
for (const card of CARDS) {
  const png = render(cardSVG(card, card.slug === 'c-0013-second'), 1200);
  writeFileSync(`public/og/${card.slug}.png`, png);
  console.log('og:', card.slug, png.length, 'bytes');
}
for (const [name, s] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  writeFileSync(`public/${name}`, render(PLUMB(64, 3.5), s));
  console.log('icon:', name);
}
console.log('done');
