# THE BLACK LEDGER — DEFINITIVE BUILD SPECIFICATION (v3)
## Zero-drift handoff. This document supersedes all prior design briefs and prototypes. Prior prototypes (v1 paper-document, v2 poster-type) are REJECTED and must not be referenced.

**To the build agent:** You are typesetting a document, not designing a website. Every design decision has been made. Every line of copy is written below. Your job is faithful execution. Where this spec is silent, the rule is: do the quietest possible thing. If you catch yourself adding an effect, a color, a font, an icon, or a word not in this spec — stop, delete it, re-read §9 (Forbidden).

---

# §0. REFERENCE STANDARD

The register is https://audit.devoco.studio/en (People's Audit, DEVOCO STUDIO). Study its restraint before writing any code. Its qualities, which are binding here:
- A dark printed document, paginated, chaptered as separate routes.
- Two typefaces only. No display font. Scale comes from size and space, not weight or novelty.
- Every fact is followed by terse ledger annotations beginning with "— ".
- One live per-second counter, with its computation printed beneath it.
- A case-registry header (case number, scope, subject, sources, opened date).
- A defendant/subject block. An epigraph. A glossary. A colophon. Page numbers.
- The voice makes no accusations. It documents.

We are not cloning it. We are producing the American volume in the same imprint.

---

# §1. STACK & DATA BINDING (unchanged from package)

- Astro, MPA mode, static output. No backend. No LLM. No analytics.
- All figures render from `data/claims.csv` / `data/toplines_nip_mip.csv` at build time. A dollar figure typed into a template is a build failure. Every rendered figure carries its claim ID.
- Exactly one runtime fetch: the cover counter baseline may refresh from Treasury MTS Table 5 (CORS-clean, keyless, 24h localStorage cache, silent fallback to build-time value C-0004).
- Fonts self-hosted (download at build; no runtime Google Fonts request).
- Routes:
  - `/` → 00 COVER
  - `/chapters/meter` → 01 THE METER
  - `/chapters/reconciliation` → 02 THE RECONCILIATION
  - `/chapters/subjects` → 03 SUBJECTS (index) + `/chapters/subjects/{slug}` per dossier
  - `/chapters/share` → 04 YOUR SHARE
  - `/chapters/record` → 05 THE RECORD (sources, methodology, corrections, share)

---

# §2. DESIGN TOKENS (locked — no additions, no substitutions)

## 2.1 Color (5 values total; nothing else may appear)
| token | hex | use |
|---|---|---|
| `--ground` | `#0B0B0A` | page background, everywhere |
| `--ink` | `#E7E4DC` | primary text |
| `--ink-dim` | `#8A877D` | annotations, metadata, captions |
| `--line` | `#2A2925` | all rules/borders (1px only) |
| `--signal` | `#C8371F` | ONE use-class: the live counter digits, ratio results, and the single accent word permitted per chapter. Never for decoration, never for backgrounds, never for hover states. |

Hover state = `--ink` → `--ground` inversion is FORBIDDEN. Hover = underline only.
No gradients. No shadows. No border-radius (0 everywhere). No opacity animations on text.

## 2.2 Typography (2 families, locked)
| role | family | notes |
|---|---|---|
| Text (body, headings) | **Newsreader** (variable, incl. italic) | headings use weight 500, never bold-800; body weight 400; italics for epigraph + deck lines only |
| Data (figures, annotations, labels, nav, tables) | **IBM Plex Mono** | weights 400/500 only |

Type scale (rem, base 16px): 0.625 (labels/annotations), 0.75 (meta), 0.9375 (mono data), 1.0625 (body), 1.5 (section titles), 2.25 (chapter titles), 4.5–7 fluid (the one large figure per chapter, mono 500, letter-spacing -0.02em). Nothing larger. Chapter titles are Newsreader 500, sentence case with terminal period — not uppercase, not poster-sized.

Uppercase + letter-spacing (0.18em) is reserved for mono labels only (nav, registry keys, running heads).

## 2.3 Layout
- Single column, max-width 720px for text; data blocks may extend to 960px.
- Page gutter 24px mobile / 48px desktop.
- Vertical rhythm: sections separated by exactly one `--line` rule + 96px; annotation clusters 8px line spacing.
- A running head on every page (mono, 0.625rem, `--ink-dim`): left = `THE BLACK LEDGER · EDITION I · MMXXVI`, right = current chapter label.
- A running foot on every page: left = `FILE No. {NNN} — {CHAPTER NAME}`, right = `P. {page} / {total}`. Page numbers are computed at build across the whole document and are real.

## 2.4 Motion
Permitted: (1) the live counter incrementing once per second; (2) number counters on chapter 02 that count up once when scrolled into view over 1.2s, ease-out, respecting `prefers-reduced-motion` (render final value instantly). NOTHING ELSE MOVES. No parallax, no scroll-triggered reveals, no hover animations, no redaction bars, no typewriter effects.

---

# §3. THE ANNOTATION GRAMMAR (the signature — apply relentlessly)

Every fact block on every page is followed by annotation lines. Syntax is exact:

```
— {key}: {value}
```

- Mono, 0.625rem, `--ink-dim`, 8px apart, no bullets, em-dash U+2014 followed by one space.
- Ordering when present: Source → Registry/claim → Date → Computation → Context.
- Computations are always shown when a figure is derived. Format: `— Computation: $101.1 bn ÷ 31,536,000 sec / year`
- Claim references: `— Ledger: C-0013 · Tier 1 · retrieved 2026-07-02` — the claim ID links to its row anchor in Chapter 05's register.
- Never more than 6 annotation lines per block. Never fewer than 2.

This grammar replaces ALL prior citation UI (no badges as pills, no popovers, no modals, no cards). Tier appears as plain text inside the Ledger annotation line, nothing more.

---

# §4. VOICE & COPY RULES (binding on every sentence)

1. Declarative. Present tense. No exclamation marks anywhere in the product.
2. **No accusations.** The document documents. The mandatory disclaimer sentence (§5, Chapter 00) states this explicitly.
3. No outrage adjectives: forbidden words include *staggering, shocking, massive, unbelievable, insane, hidden agenda, they, elites*. The numbers carry the weight; adjectives discredit them.
4. Numbers are written `$7.010 tn`, `$206.9 bn`, `$3,206 / sec` in running annotation; full-precision digits (`$7,009,973,667,049`) appear only as the one large figure per chapter.
5. Every claim of fact must be traceable to a claims.csv row. If a sentence cannot cite a claim ID, cut the sentence.
6. Second person appears exactly twice in the whole document: the cover counter line ("as you read") and Chapter 04 ("your share").
7. British-style restraint, American spelling.

---

# §5. COMPLETE COPY — VERBATIM (typeset exactly; do not paraphrase, extend, or "improve")

## CHAPTER 00 — COVER (`/`)

**Registry strip** (top of page, mono, two columns of key/value pairs):
```
CASE №            2026 / 001
SCOPE             $101.1 bn acknowledged · $7.010 tn audited
SUBJECT           Classified expenditure of the United States · FY2025
SOURCES           20 registered · 27 claims
OPENED            02 Jul 2026
```
Annotations beneath strip:
```
— Official registry
— Jurisdiction: United States of America
— You are reading: {visitor local time, mono, updates each minute}
```

**Section: What this is** (label `— What this is`, then three body paragraphs, exactly these):

> An open audit of the classified expenditure of the United States for fiscal year 2025 — compiled entirely from official disclosures, authenticated leaked documents, records released under the Freedom of Information Act, and published audits, designed for any reader.
>
> The United States publishes exactly two classified spending figures each year. The first, the National Intelligence Program topline, is required by statute — 50 U.S.C. §3306. The second, the Military Intelligence Program topline, has been disclosed voluntarily by the Department of Defense every year since 2007. For fiscal year 2025 the two figures total $101.1 billion. Below these toplines, disclosure ends. The department responsible for the majority of this spending has failed its financial audit eight consecutive times and is the only major federal agency never to have passed one.
>
> This document brings the available numbers into one place. It makes no accusations; it documents what is published, what is admitted, and what can be bounded. Every figure links to its source and carries a stated evidence tier. Nothing modeled is ever combined with anything official.

**Epigraph** (Newsreader italic, centered, with attribution line in mono):

> a regular Statement and Account of the Receipts and Expenditures of all public Money shall be published from time to time.
>
> — Constitution of the United States · Article I, Section 9, Clause 7 · 1787

**The counter** (label `BEING SPENT AS YOU READ:`, then the live figure in `--signal`, mono, chapter-scale size, incrementing $3,206.11 per second from page load):
```
— Rate: ~$3,206 / sec
— $101.1 bn — annual acknowledged classified expenditure
— Updated every second
— Computation: $101.1 bn ÷ 31,536,000 sec / year
— NIP: $73.3 bn (C-0011) · MIP: $27.8 bn (C-0012)
— Source: ODNI PR 39-25 · DoD MIP release · FY2025
```
Link line: `→ See Chapter 01 — The Meter`

**Subject block** (label `SUBJECT OF AUDIT:`, then two-line statement, ratio annotation):

> **$101.1 bn** acknowledged and undisclosed in detail — by statute.
> **$206.9 bn** unreported to the government's own tracking system — by practice.

```
— Ratio, unreported to acknowledged: 2.05 : 1
— Acknowledged: C-0013 · Unreported: C-0009
```
Link line: `→ See Chapter 02 — The Reconciliation`

**Methodology note** (label `METHODOLOGY:`, one paragraph):

> All figures are drawn from official sources — the Treasury Monthly Statement, USAspending.gov, the Office of the Director of National Intelligence, the Department of Defense Comptroller and Inspector General — or from authenticated documents and released records, each labeled with its evidence tier. The project makes no accusations. It documents how public money is accounted for, and where the accounting ends.

Link line: `Full registry of sources → Chapter 05`

**Colophon** (mono, `--ink-dim`, centered, bottom of cover):
```
PUBLISHED AS AN OPEN AUDIT
FIRST EDITION · MMXXVI
SET IN NEWSREADER AND IBM PLEX MONO
EVERY FIGURE CARRIES ITS LEDGER NUMBER
```

## CHAPTER 01 — THE METER (`/chapters/meter`)

Purpose: time as the instrument. Three meters stacked, each with the annotation grammar.

Meter 1 — `SINCE YOU OPENED THIS PAGE:` live counter at $3,206/sec (same computation annotations as cover).
Meter 2 — `TODAY:` static figure `$277,000,000` — `— Computation: $101.1 bn ÷ 365 days` `— Ledger: C-0013`.
Meter 3 — `THIS FISCAL YEAR, TOTAL OUTLAYS TO DATE:` figure from C-0004 (`$4,901,851,413,144`), annotations: `— Source: Treasury MTS Table 5 · record 2026-05-31` `— Ledger: C-0004 · Tier 1` `— The denominator of this audit`.

One body paragraph, verbatim:

> The acknowledged classified budget spends roughly what a public school teacher earns in a year every twenty seconds. These meters use only the two disclosed toplines; the unreported and unattributed figures documented in Chapter 02 are not included in any meter, because their annual rates cannot be stated honestly.

## CHAPTER 02 — THE RECONCILIATION (`/chapters/reconciliation`)

The analytical core. Four statements, set as a ledger (mono table rows, right-aligned amounts, 1px rules), each row followed by its annotations:

```
WHAT THE TREASURY PAID OUT, FY2025            $7,009,973,667,049
— Source: Monthly Treasury Statement, Table 5 · Total Outlays
— Ledger: C-0001 · Tier 1 · retrieved 2026-07-02

WHAT IS TRACEABLE AS AWARDS                  − $5,299,254,815,599
— Source: USAspending · all award types, FY2025
— Ledger: C-0005 · Tier 1
— Basis note: outlays and obligations differ; treatment in Chapter 05.2

THE RESIDUAL                                   $1,710,718,851,450
— Computation: C-0001 − C-0005
— Ledger: C-0026
— Composition: debt interest, federal compensation, non-award operations — and everything else
```

Body paragraph, verbatim:

> Most of the residual is explainable, and this document explains it before drawing any conclusion from it. What the residual establishes is simpler: the disclosed classified budget — $101.1 billion — is not a separate universe. It sits inside ordinary Treasury arithmetic, alongside a second figure the government prints itself.

Second ledger block:

```
THE SYSTEM'S OWN LINE FOR WHAT IT ISN'T TOLD     $206,921,871,135
— Label in source: "Unreported Data" · USAspending Spending Explorer, FY2025
— Ledger: C-0009 · Tier 1
— Prior year: $164.4 bn (C-0010) · change: +$42.5 bn · +25.9%
— Note: includes, but is not limited to, classified activity
```

Comparison statement (the thesis ratio, `--signal` on the ratio only):

> **2.9%** of everything the Treasury paid out is unreported to the government's own tracking system.
> **1.4%** is acknowledged as classified.
```
— Computation: $206.9 bn ÷ $7.010 tn · $101.1 bn ÷ $7.010 tn
— The first figure is the one that grew 26% in a year.
```

Closing body paragraph, verbatim:

> No other public resource performs this subtraction. USAspending prints the unreported line but does not total it against the Treasury. The Treasury publishes the total but does not decompose it. The sites that explain federal spending in plain language exclude classified expenditure entirely, and say so in a footnote. This chapter is that footnote, given a ledger of its own.

## CHAPTER 03 — SUBJECTS (`/chapters/subjects` + dossiers)

Index page: registry-style list, each row `FILE No. 03/0N · {NAME} · {one-line figure}` linking to a dossier route. Six dossiers at launch:

- 03/01 THE NATIONAL INTELLIGENCE PROGRAM — toplines 2007–2026 table (from toplines_nip_mip.csv, full, mono, with per-row source links), the statute, the FY2026 request ($81.9 bn, C-0014).
- 03/02 THE LEAKED INTERIOR — the FY2013 budget justification: $52.6 bn request; CIA $14.7 bn · NSA $10.8 bn · NRO $10.3 bn · NGA $4.9 bn · GDIP $4.4 bn (C-0018–C-0023, all Tier 2, source: Washington Post, 29 Aug 2013). Body note, verbatim: *"This is the only complete internal map of the National Intelligence Program ever made public. It is thirteen years old. Every projection built on it is labeled as a projection."*
- 03/03 THE PROJECTION — the single Tier-4 model shown at launch: CIA FY2025, $18–24 bn, with its full assumption list printed (FY2013 share 28% · drift band ±1.25%/yr compounded · sanity check: IC ≈ 11% of national defense, C-0027). Ranges only. The word "estimate" appears in the first sentence.
- 03/04 THE AUDIT — eight consecutive disclaimers; 26 material weaknesses; $4.65 tn reported assets (C-0016); the F-35 Global Spares Pool misstatement; the 2028 statutory deadline (C-0017).
- 03/05 THE ADJUSTMENTS — the $6.5 tn Army journal-entry finding (C-0025, Tier 3), with this verbatim framing paragraph: *"These are unsupported accounting adjustments — the same dollars re-entered repeatedly, in both directions. They are evidence that the books cannot be audited, not evidence that the money is missing. This document reports the finding as the Inspector General wrote it, and no further."*
- 03/06 THE UNREPORTED LINE — C-0009/C-0010 in full, with the USAspending agency breakdown from the saved provenance JSON.

Dossier page template: running head/foot; `FILE No. 03/0N` label; title (Newsreader 500, sentence case); one large figure; annotation block; 2–4 body paragraphs; a `— Registry entries` list of every claim cited; prev/next dossier links.

## CHAPTER 04 — YOUR SHARE (`/chapters/share`)

One formula, set as three mono lines with the result in `--signal`:
```
$101,100,000,000        acknowledged classified expenditure, FY2025
÷ 134,000,000           U.S. households filing federal returns
= $754                  your household's line item, this year
```
```
— Ledger: C-0013 · household count: to be registered as a Tier 1 claim at build (IRS SOI); until registered, label the result "approximate"
— This is the acknowledged portion only — before the unreported line, before the residual.
```
Single body paragraph, verbatim:

> You paid for a program this year. Its name, purpose, and outcome are not available to you, and by statute they do not have to be. This page states only what that arrangement costs per household, using the government's own two numbers.

## CHAPTER 05 — THE RECORD (`/chapters/record`)

- 05.1 THE LEDGER — all 27 claims as a mono registry table (ID · metric · FY · amount or range · tier · method · source), each row an anchor target. Tier-4 rows render ranges only; Tier-5 rows (none at launch) render in `--signal` text with the prefix `UNVERIFIED —`. No modals; a row's notes render inline beneath it in annotation grammar when its anchor is targeted.
- 05.2 METHODOLOGY — render docs/METHODOLOGY.md content, restyled to this system, with the obligations-vs-outlays treatment and the tier definitions verbatim from that file.
- 05.3 REGISTRY OF SOURCES — all 20 sources with URLs and tier ceilings, plus this glossary (verbatim):

> **MTS** — Monthly Treasury Statement, the Treasury's monthly account of receipts and outlays. **NIP / MIP** — National and Military Intelligence Programs, the two disclosed classified toplines. **R-1 / P-1** — the Department of Defense's published research and procurement justification books, in which classified program line items appear with printed dollar amounts. **Disclaimer of opinion** — an auditor's statement that the books cannot support an opinion at all. **CBJ** — Congressional Budget Justification; the FY2013 CBJ, disclosed in 2013, remains the only complete public map of the intelligence budget's interior.

- 05.4 CORRECTIONS — public, append-only; renders data/corrections.csv; if empty, print: `No corrections registered. The register opened 02 Jul 2026.`
- 05.5 SHARE — plain links (copy URL, Bluesky, Mastodon). No icons; text links in mono.

Final colophon (every chapter's foot, and full version here):
```
THE BLACK LEDGER · FIRST EDITION · MMXXVI
COMPILED FROM 20 REGISTERED SOURCES · 27 CLAIMS · METHODOLOGY PUBLIC · CORRECTIONS PUBLIC
SET IN NEWSREADER AND IBM PLEX MONO · PROOF COPY
```

---

# §6. NAVIGATION (exact)

Header (sticky, `--ground`, 1px `--line` bottom): left running head; right chapter list in mono: `00 — COVER · 01 — METER · 02 — RECONCILIATION · 03 — SUBJECTS · 04 — YOUR SHARE · 05 — RECORD`. Current chapter in `--ink`, others `--ink-dim`. Mobile: chapter list collapses to `INDEX` which opens a full-screen list in the same style (no hamburger icon; the word INDEX).
Every chapter ends with: `↓ CHAPTER {NN} — {NAME}` link to the next.

---

# §7. COMPONENTS (closed set — nothing may be built that is not on this list)

1. Registry strip (key/value mono pairs)
2. Annotation block (§3 grammar)
3. Body paragraph (Newsreader, 720px)
4. Epigraph
5. Live counter (mono `--signal` digits + annotations)
6. Ledger table (mono rows, right-aligned amounts, 1px rules; the subtraction variant carries `−` and a double rule above totals)
7. Large figure (one per chapter maximum)
8. Dossier index row / dossier page template
9. Formula block (Chapter 04)
10. Claims register table (05.1)
11. Chapter link line / next-chapter foot link
12. Running head / running foot with real pagination
13. Colophon

---

# §8. DRIFT TRIPWIRES (the build agent must self-check against each before finishing)

1. Grep the built output for `#` colors: exactly the 5 tokens may appear.
2. Grep for font-family: exactly 2 families.
3. Grep copy against §5: cover, chapter paragraphs, dossier framing paragraphs, and glossary must match verbatim.
4. Count large figures per chapter: ≤ 1.
5. Confirm zero: border-radius, box-shadow, gradients, emoji, icons, SVG illustrations, images (this edition is typographic only), uppercase Newsreader, bold >500, exclamation marks.
6. Confirm every rendered dollar figure resolves to a claims.csv row and prints its `— Ledger:` line.
7. Confirm Tier-4 renders as range + the word "estimate"/"projection" in the first sentence of its context.
8. Confirm the counter math: 101.1e9 ÷ 31,536,000 = 3,206.11/sec; day rate 277.0 M; household share 754 (approximate until IRS claim registered).
9. Lighthouse: no layout shift from the counter (fixed-width tabular numerals — `font-variant-numeric: tabular-nums`).
10. `prefers-reduced-motion`: counters render final values, no count-up.

# §9. FORBIDDEN (absolute)

Redaction bars or any "declassify" effect · rubber stamps · Anton or any poster/display face · light theme · tabs as UI chrome · dashboards, gauges, donut/pie charts · card grids · modals and popovers · hover inversions · scroll-triggered reveals · parallax · icons and emoji · photographs or illustrations in Edition I · gradients · more than one accent use per viewport · any sentence not in §5 except dossier body text, which must pass §4 and cite claims · any figure without a Ledger line.

---
*End of specification. The data package (claims.csv, sources.csv, toplines_nip_mip.csv, provenance JSON, METHODOLOGY.md) travels with this file. Build from both. Nothing else is canon.*
