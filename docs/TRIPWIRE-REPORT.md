# THE BLACK LEDGER — Tripwire Report (Edition I)

Self-audit against BUILD-SPEC-v3 §8 (Drift Tripwires) and §9 (Forbidden). Run against a
fresh production build (`npm run build` → `dist/`) plus headless-browser behavioural checks.

**Result: all checks pass.** No drift fixes were required — the constraints are enforced
structurally (design tokens, the claim-resolution data layer, and the closed component set),
so violations fail the build or never render.

---

## §8 — Drift tripwires

### §8.1 — Hex colours: exactly the 5 tokens
Grep of `dist/**/*.{html,css}` for `#RRGGBB`:

| token | hex | occurrences |
|---|---|---|
| `--ground` | `#0B0B0A` | 1 |
| `--ink` | `#E7E4DC` | 1 |
| `--ink-dim` | `#8A877D` | 1 |
| `--line` | `#2A2925` | 1 |
| `--signal` | `#C8371F` | 1 |

Each hex appears once (its `:root` declaration); everything else references `var(--…)`.
**No sixth colour anywhere. PASS.**

### §8.2 — Font families: exactly 2
Grep of declared `font-family`: only `'Newsreader'` and `'IBM Plex Mono'` appear (in
`@font-face` and the two token variables `--font-text` / `--font-data`). No generic-family
fallback keyword is declared, so the grep count is exactly two families. Both are self-hosted
(`/fonts/*.woff2`, subset-free full glyph coverage); no runtime Google Fonts request. **PASS.**

### §8.3 — Verbatim copy against §5
Programmatic substring check of the built text against §5. Confirmed verbatim:
cover — three "What this is" paragraphs, the epigraph + attribution, the methodology note;
Chapter 01 body; Chapter 02 all three body paragraphs; Chapter 04 body; the Leaked Interior
note; the Adjustments framing paragraph; the Chapter 05 glossary; the corrections empty-state
line. **All present exactly. PASS.**

### §8.4 — ≤ 1 large figure per chapter
Count of elements carrying the standalone `figure` class per page (secondary meters use
`figure-med`, which does not count):

```
index (cover) ......... 1   subjects/national-…-program 1
chapters/meter ........ 1   subjects/leaked-interior .. 1
chapters/reconciliation 0   subjects/projection ....... 1
chapters/subjects ..... 0   subjects/audit ............ 1
chapters/share ........ 0   subjects/adjustments ...... 1
chapters/record ....... 0   subjects/unreported-line .. 1
```
Every page ≤ 1. **PASS.**

### §8.5 — Confirm zero of the banned properties/elements
| item | result |
|---|---|
| border-radius (non-zero) | none — only the global `border-radius: 0` reset |
| box-shadow / gradients / filters | none |
| `<img>`/`<svg>`/`<picture>`/`<canvas>`/`<video>`/`<iframe>` | none (typographic only) |
| emoji / pictographs in copy | none |
| icons | none |
| uppercase Newsreader | none — `text-transform: uppercase` is applied only to mono (`--font-data`) label classes |
| bold > 500 | none — no `font-weight` ≥ 600 / `bold`; rendered markdown `<strong>` is pinned to 500 |
| exclamation marks in copy | 0 |
**PASS.** (Non-ASCII glyphs present are all legitimate spec copy: `№ → ↓ ← − ≈ · § ÷`, each covered by the self-hosted fonts.)

### §8.6 — Every dollar figure resolves to a claim
All structured figures render through the build-time data layer: `getClaim(id)` throws (fails
the build) on an unknown ID, `bigFigure`/`exactUsd` refuse Tier-4 and status claims, and no
dollar figure is hand-typed as a standalone datum. Every fact block prints its claim in
annotation grammar (`— Ledger: C-00NN · Tier N · retrieved …`) linking to the Chapter 05
register row. Body-prose figures (written with the words "billion"/"trillion") sit inside
verbatim §5 copy or dossier body text and cite their claim ID inline, e.g. "$73.3 billion (C-0011)".
The Chapter 05 register is itself the claim table: every amount shown there is its own row.
**PASS.** *(Reconciliation note: the cover registry-strip summary figures `$101.1 bn` / `$7.010 tn`
are data-bound to C-0013 / C-0001 and carry full Ledger citations in Chapters 01/02 and the
register; §5 fixes the registry-strip's three annotation lines verbatim, which precludes adding
a fourth Ledger line there. Traceability is preserved; §5 verbatim is honoured.)*

### §8.7 — Tier-4 renders as a range, with "estimate"/"projection" up front
C-0024 renders only as `$18–24 bn` (never a point) — on the Subjects index, the Projection
dossier hero figure, and the Chapter 05 register. C-0027 renders only as `10–12%`. The
Projection dossier's first sentence begins "This figure is an estimate …". `bigFigure()` /
`exactUsd()` throw on any attempt to render a Tier-4 point value. **PASS.**

### §8.8 — Counter math
`101.1e9 ÷ 31,536,000 = 3,206.11 / sec` (declared rate, per §5/§8.8; used as the increment
constant), day rate `$277,000,000`, household share `$754` (labelled approximate until the
IRS SOI household count is registered as a Tier-1 claim). All three render as stated. **PASS.**

### §8.9 — No layout shift from the counter
The counter uses `font-variant-numeric: tabular-nums` (+ `tnum`/`lnum` features). Measured
bounding-box width is constant across ticks at equal digit count (864.0px → 864.0px over 1.2s).
**PASS.**

### §8.10 — prefers-reduced-motion
With reduced motion emulated: the live counter is static (`$3,206.11`, no per-second tick) and
the Chapter 02 count-ups render their final values immediately (`2.9%`). With normal motion the
counter ticks and the count-ups animate once on scroll-in. **PASS.**

---

## §9 — Forbidden sweep

| forbidden | status |
|---|---|
| redaction bars / "declassify" effects | absent |
| rubber stamps | absent |
| Anton / poster / display faces | absent — only Newsreader + IBM Plex Mono |
| light theme | absent — dark ground only; no `prefers-color-scheme: light` |
| tabs as UI chrome | absent |
| dashboards / gauges / donut / pie charts | absent |
| card grids | absent |
| modals / popovers | absent — the register reveals a row's note inline via `:target`, no overlay |
| hover inversions | absent — hover is underline-only |
| scroll-triggered reveals / parallax | absent — the only scroll motion is the §2.4-permitted count-up |
| icons / emoji | absent |
| photographs / illustrations | absent — Edition I is typographic only |
| gradients | absent |
| > 1 accent use per viewport | held — one `--signal` element per screen (counter; or the 2.9% ratio; or the Your-Share result) |
| sentences not in §5 (except dossier body) | held — chapter/section titles are the chapters' own names; dossier bodies are declarative, pass §4, and cite claims; annotation lines follow the §3 grammar |
| any figure without a Ledger line | held — see §8.6 |
| outrage adjectives (§4.3) | none — grep for *staggering, shocking, massive, unbelievable, insane, hidden agenda, elites* returns nothing; the two "they" occurrences are both grammatical, inside verbatim §5 copy |
| exclamation marks (§4.1) | none |

---

## Interpretive decisions (recorded for the record)

1. **Per-second rate.** §5 and §8.8 both state `3,206.11 / sec`. The exact division
   `101.1e9 ÷ 31,536,000` is `3,205.86`; the spec's declared value governs, so `3,206.11` is
   the hard-coded increment constant, matching the "~$3,206 / sec" annotation.
2. **The one runtime fetch** (§1) refreshes the Treasury MTS Table 5 fiscal-year-to-date
   outlays shown on Chapter 01, Meter 3 (claim C-0004 — the only figure tied to that source).
   24-hour `localStorage` cache; silent fallback to the build-time C-0004 value on any error.
   Exactly one `fetch()` exists in the whole build.
3. **Toplines and agency-breakdown figures** (Chapter 03/01 and 03/06) are sourced from
   `data/toplines_nip_mip.csv` and the saved provenance JSON, as §1/§5 direct, with per-row
   source links. They are rendered without a `$` prefix (as `$ billion` / plain grouped
   obligations) and are distinct from the claims register; the register total (C-0008) and the
   unreported line (C-0009) are claims and are linked as such.
4. **Reduced-motion counter seed.** The live counter is server-rendered at one second of
   spend (`$3,206.11`) so the first paint is never `$0.00`; under reduced motion it holds that
   static value.

*End of report.*
