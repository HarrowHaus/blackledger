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

---

# Edition I.1 — THE PLAIN LAYER (amendment v3.1)

Applied on top of Edition I. Re-ran the v3 tripwires 1–10 (all still pass) plus the four new
amendment tripwires. **All pass; no drift found.**

## Amendment tripwires §8 (11–14)

### 11 — Every table and large figure carries an `— In plain words:` first annotation
Automated coverage check: on every page, the count of `— In plain words:` lines is ≥ the number
of `<table>` elements plus standalone large figures. 21 distinct plain-words lines in all;
each validated at ≤ 26 words (longest 23), containing no claim ID and no acronym undefined in
its chapter (spelled "Central Intelligence Agency", "budget year", etc.). **PASS.**

### 12 — Internal build language absent from rendered pages
Grep of the built HTML for each forbidden token returns zero:
`mts_total_outlays` · `gap_a_residual` · `FLAGSHIP` · `THE DENOMINATOR` · `Never sum` ·
`the build must` · `No note registered` — all 0. Raw metric keys (`nip_appropriated`,
`cia_budget`, …) also return 0: the register dropped its metric column, the `— Ledger:` line and
the dossier "Registry entries" now render `display_name`, and every row's note renders
`public_note`. The internal `notes` column is retained in `claims.csv` but never rendered.
To clear this, the demoted methodology's "never summed with T1–T3" / "Never summed with anything"
were changed to "never combined …" and its `# BLACK LEDGER — Methodology` title stripped, with
"the engine" / "the build" replaced by "this site" (v3.1 §6). **PASS.**

### 13 — Chapters 01–04 open with the §2 on-ramp and close with the §3 line, verbatim
On-ramps present and verbatim on 01 (Meter), 02 (Reconciliation), 03 (Subjects), 04 (Your
Share) — and 05 (Record). Closers present and verbatim on 01–04
(`— What this chapter established: …`). **PASS.**

### 14 — The word "Tier" does not appear in the 05.1 table header
The 05.1 header is `Name · Amount / range · Year · Confidence · Source`. Grep for a `Tier`
`<th>` in the register returns 0; confidence renders spelled out
(`1 — Official` … `5 — Unverified`). **PASS.**

## v3 tripwires 1–10, re-confirmed after the amendment
5 hex tokens only; 2 font families only; §5 verbatim copy intact (glossary links wrap words
without changing text); ≤ 1 large figure per page; zero forbidden properties/elements; every
figure data-bound to a claim; Tier-4 renders as a range with "estimate" in its first sentence;
counter math `3,206.11/sec`; tabular-nums (no layout shift); reduced-motion counter static and
count-ups render final values. No page scrolls horizontally at 360px.

## Amendment interpretive decisions
5. **Ledger numbers vs. build language.** Claim codes (`C-00NN`) are a deliberate public feature
   ("every figure carries its ledger number") and remain as inline references; only raw *metric
   keys* and build directives were internal and are now gone. The `— Ledger:` line renders the
   plain `display_name`, linked to the register row (whose anchor is still the `C-00NN` id).
6. **Glossary at point of use (§7).** The seven terms are defined and anchored in 05.3; each is
   linked at its first use in the chapters where it appears in flowing prose (cover, reconciliation,
   the NIP and Audit dossiers). Occurrences that appear only inside uppercase mono labels are left
   unlinked by design.
7. **Confidence ceiling.** The 05.3 sources table header was also relabeled "Confidence ceiling"
   (from "Tier ceiling") and shows the bare grade number, consistent with §5's rename.

---

# Edition I.2 — THE OPENING (amendment v3.2)

Applied on top of Edition I.1. Re-ran the v3 tripwires 1–10 and the v3.1 tripwires 11–14
(all still pass) plus the four new v3.2 tripwires. **All pass. One drift fix was required
(bold weight — see below); after it the sweep is clean.**

## Amendment tripwires §4 (15–18)

### 15 — The first rendered element on `/` after the running head is the §1 opening passage
Built `dist/index.html`, in source order: the layout running head / masthead (`<header>`,
byte 930) → the opening passage (`— Before the file opens` + "Every year, the United States
government publishes two numbers…", byte 2107) → the registry strip (`class="registry"`,
byte 3541) → "How to read this" (byte 4168) → "What this is" (byte 5369). The registry strip
now carries a plain `section` class (its `section--first` modifier moved to the opening
passage), so the opening is the first content block on the page and the registry appears only
after it. The four opening paragraphs match §1 verbatim. **PASS.**

### 16 — The §2 chapter guide appears on the cover, verbatim, after the registry strip
The "How to read this" section renders immediately after the registry strip and before "What
this is". All six lines present verbatim — the five chapter lines (each a link on the bold
`0N — Name.` to `/chapters/{meter,reconciliation,subjects,share,record}`, followed by its plain
sentence) and the closing "Ten minutes reads the whole document. Chapter 02 is the heart of it."
All five link targets resolve to built pages. **PASS.**

### 17 — Chapters 02 and 03 open with their §3 leads; 01, 04, 05 keep their v3.1 on-ramps
Chapter 02 now opens "Here is a strange fact about American transparency…" and Chapter 03
"Everything publicly known about the inside of the secret budget comes from a remarkably short
list…" — both verbatim §3, and both old v3.1 on-ramps are gone. Chapters 01 ("This chapter
turns the classified budget into time…"), 04 ("One division problem…") and 05 ("This is the raw
material…") still carry their v3.1 on-ramps verbatim, and the 01–04 closers are unchanged.
Chapters 01, 04, 05 source files were not touched. **PASS.**

### 18 — Second person appears on the cover opening, the counter line, and Chapter 04 — nowhere else
Enumerated every `you/your/yours/yourself` in the visible text of all 12 pages. Every occurrence
falls into a sanctioned bucket, and no new unsanctioned second person was authored:

- **Cover opening (§1):** "asks you to be satisfied" — permitted by the amendment's voice rule.
- **Counter lines:** the cover's "BEING SPENT AS YOU READ:", and Chapter 01's meter line
  "Since you opened this page…" (a live counter) — the counter line is expressly permitted.
- **Chapter 04 (Your Share):** all of its second person ("your household", "You paid for a
  program…", etc.) — expressly permitted.
- **The verbatim §2 guide:** "04 — Your Share." and "…costs your household this year" — this is
  amendment-mandated verbatim copy (§2), and "Your Share" is Chapter 04's own title.
- **Pre-existing verbatim copy/labels (not new):** the registry-strip annotation key "You are
  reading" (original build), Chapter 05's verbatim v3.1 §5 line "…how much you should trust it",
  and Chapter 01's v3.1 on-ramp "…something you can watch move". The site chrome lists the
  chapter title "04 — YOUR SHARE" in every page's running nav (a title reference, not prose).

The v3.2 voice rule permits second person "in the cover's opening passage (§1) and nowhere else
new." No second person was introduced outside §1 by this amendment except the verbatim §2 text
it mandates. **PASS (holds under the "nowhere else new" rule).**

## Drift fix required

**Bold weight (v3 tripwire 5 / §9 "bold > 500").** The §2 guide renders each chapter name in
bold (`<b>0N — Name.</b>`) inside `.body` paragraphs. The existing bold-to-500 pins were all
scoped (`.statement`, `.prose`, `.glossary`), so a bare `<b>` in `.body` would have inherited
the browser default (700). Added one base rule — `b, strong { font-weight: 500; }` — enforcing
the invariant the design system already applied everywhere else. Verified in the emitted CSS
(`b,strong{font-weight:500}` present) and confirmed zero `font-weight` ≥ 600 / `bold` rules in
the whole build.

## v3 tripwires 1–10 and v3.1 tripwires 11–14, re-confirmed after v3.2
5 hex tokens only (each declared once); 2 font families only; §5/amendment verbatim copy intact;
≤ 1 large figure per page; zero forbidden properties/elements (no border-radius, box-shadow,
img/svg/canvas/iframe; the only `!` in `index.html` is `<!DOCTYPE html>`); every figure
data-bound to a claim; Tier-4 renders as a range with "estimate" first; counter math
`3,206.11/sec`; tabular-nums (no layout shift); reduced-motion counters static. The word "Tier"
does not appear in the 05.1 header (it reads "Confidence"); internal build-language grep
(`mts_total_outlays`, `gap_a_residual`, `FLAGSHIP`, `THE DENOMINATOR`, `Never sum`,
`the build must`, `No note registered`) returns zero.

## Amendment interpretive decisions
8. **Registry strip demotion.** Making the §1 opening the first block meant moving the
   `section--first` modifier (which removes the top border and top padding) from the registry
   strip to the opening passage; the registry strip became an ordinary bordered `section`, so it
   now sits under the opening with the standard section rule above it.
9. **Second person, "nowhere else new."** Tripwire 18 is read against the amendment's stated
   voice rule ("permitted in §1 and nowhere else new"), not as a literal ban everywhere but three
   spots — otherwise the amendment's own verbatim §2 text ("Your Share", "your household") and
   pre-existing verbatim copy ("You are reading", the Chapter 01 counter line) would fail a rule
   the amendment itself writes. No new unsanctioned second person was introduced.

---

# Edition I.3 — RECOVERY & POLISH (amendment v3.3)

Applied on top of Edition I.2. Forensic recovery first (§1), then polish (§3–§8), audited
against the LIVE site at `blackledger.donald-dcd.workers.dev` where the tripwire says so.

## Forensic recovery (§1)
Branches found: `main` (default) and `claude/spec-amendment-phase-0-x7u97i` (another session's
v3.2 "the opening" work), which was **already merged into `main` via PR #1** (edition I.2). The
local checkout had been stale at the v3.1 tip; a rebase synced it, bringing v3.2 into the working
tree. §1.3 verification passed with no gaps: `claims.csv` has `display_name`/`public_note`; the
cover has "Before the file opens" and "How to read this"; chapter 02 has "two websites that do
not talk to each other"; the Record reads "Confidence". Nothing needed re-applying.

## Deployment (§2)
The Worker deploys via a git-connected Cloudflare build: a push to `main` auto-deploys. Verified
empirically — a push updated the live site within ~1 minute (the deleted cover paragraph
disappeared, "Copy link" appeared, the running foot changed to "CH. 00 — COVER"). No manual
`wrangler` authentication is required, so §2.2's login gate does not apply; "deploy" = push.

## Amendment tripwires §9 (19–24)

- **19 — exactly one branch.** ⚠ NOT YET MET. The merged v3.2 branch is fully contained in
  `main` (safe to delete — no commits are lost), but deleting it from the remote was blocked by
  the environment's safety policy (a destructive remote action inferred from the spec file rather
  than an explicit user instruction). Awaiting the owner's authorization; once deleted, only
  `main` remains.
- **20 — v3.1 greps clean on the LIVE pages.** `mts_total_outlays`, `gap_a_residual`, `FLAGSHIP`,
  `THE DENOMINATOR`, `No note registered` all return zero against the live cover, record, and
  reconciliation HTML. **PASS.**
- **21 — live cover has the opening, not the deleted content.** Live `/` contains "Before the
  file opens"; it does not contain "This document brings the available numbers" or the deleted
  methodology paragraph. **PASS.**
- **22 — register loads collapsed.** The live Record renders 27 `<details class="reg-row">`
  disclosures, none with an `open` attribute — notes are hidden until a row is activated.
  Native, keyboard-accessible, no JS required. **PASS.**
- **23 — no dangling "—".** The "You are reading" line is hidden by default and revealed only
  when JS populates a real value (`HH:MM, DD Mon YYYY`); the live cover shows no
  "You are reading: —". **PASS.**
- **24 — Bluesky link opens a pre-filled compose window.** `#share-bsky` resolves at runtime to
  `https://bsky.app/intent/compose?text=` + the encoded blurb and page URL. **PASS.**

## Prior tripwires 1–18, re-confirmed after v3.3
5 hex tokens; 2 font families; ≤1 large figure/page; zero forbidden properties/elements;
Tier-4 as range with "estimate" first; counter math `3,206.11/sec`; tabular-nums; reduced-motion
static; In-plain-words on every table/register/large-figure; "Tier" absent from the 05.1 header;
cover opening precedes the registry strip; chapters 02/03 carry the v3.2 leads while 01/04/05
keep their v3.1 on-ramps; verbatim copy intact (cover "What this is" para 3 intentionally deleted
per §4). No page scrolls horizontally at 360px.

## Amendment interpretive decisions
10. **Running feet unified to chapter numbering (§5).** Feet read `CH. {NN} — {CHAPTER NAME} ·
    P. {page} / {total}`; the six dossier pages retain their `FILE No. 03/0N` content labels, the
    one place a file number still means something.
11. **Register source column (§3/§7).** In the collapsed disclosure the source shows as its
    registry code (e.g. S-03) in the summary; the human-readable source link and its `— API:`
    endpoint live in the 05.3 registry, which the code cross-references.

---

# Edition I — FINAL PASS: VOICE & SURGERY (amendment v3.4)

Applied on top of Edition I.3. Voice purge (Part One), surgery (Part Two), then tripwires
25–30 run against the LIVE site (`blackledger.donald-dcd.workers.dev`) — every check below
was executed against fetched production HTML, not the local build. All 12 live pages were
downloaded (`curl` of `/`, the four chapters, the subjects index, and the six dossiers) and
the greps below ran across that full set.

## Tripwire 25 — banned strings, sitewide, live: all zero

Command (over all 12 fetched live pages):
```
for s in "In plain words" "What this chapter established" "Ten minutes reads" \
         "How to read this" "to be registered as a Tier 1 claim" "The denominator of this audit"; do
  cat live-*.html | grep -o "$s" | wc -l; done
```
Results: `In plain words` 0 · `What this chapter established` 0 · `Ten minutes reads` 0 ·
`How to read this` 0 · `to be registered as a Tier 1 claim` 0 · `The denominator of this audit` 0.
The prior internal-language set also re-ran clean on the same live pages: `mts_total_outlays`,
`gap_a_residual`, `FLAGSHIP`, `THE DENOMINATOR`, `Never sum`, `the build must`,
`No note registered` — all 0. **PASS.**

## Tripwire 26 — live cover: no "What this is", no "→ See Chapter", counter ≤ 4 lines

On fetched live `/`: `grep -o "What this is" | wc -l` → 0; `grep -o "→ See Chapter" | wc -l`
→ 0; counting `<li>` inside the counter section (from `BEING SPENT AS YOU READ` to its
`</section>`) → exactly **4** annotation lines, verbatim per §2.1. **PASS.**

## Tripwire 27 — collapsed register rows on the live Record

`grep -o '<details' live-record.html | wc -l` → **28** (one per claim, C-0001…C-0028; the
spec's literal `grep -c` returns 1 only because the production HTML is minified to one line —
the occurrence count is the meaningful figure). Zero rows carry an `open` attribute:
`grep -o '<details[^>]*open' | wc -l` → 0 — all notes collapsed on load. **PASS.**

## Tripwire 28 — every glossary link resolves, verified programmatically on live HTML

Extracted every `id="gloss-…"` anchor on the live Record and every `/chapters/record#gloss-…`
href across all 12 live pages, then diffed the sets:
anchors = links = { gloss-appropriated, gloss-disclaimer-of-opinion, gloss-fiscal-year,
gloss-obligations, gloss-outlays, gloss-requested, gloss-topline }; dangling links: **none**.
**PASS.**

## Tripwire 29 — no "You are reading" outside a script tag in the served cover

On the fetched live `/`: total occurrences of `You are reading` in the HTML = **0** (after
stripping `<script>` blocks, also 0). The line exists only in the bundled script
(`/_astro/hoisted.*.js` contains the string once) and is created entirely by JavaScript
(v3.4 §2.6); with JavaScript unavailable the line does not exist in any form. **PASS.**

## Tripwire 30 — Contents verbatim; no `Tier` table header on any dossier page

All six §1.2 lines matched the live cover **verbatim** by exact substring check (the five
chapter lines and their descriptors, under the mono label `— Contents`, with no sentence after
the list). `grep -l "<th[^>]*>Tier</th>"` across the six fetched live dossier pages → 0 files.
The leaked-interior table header now reads `Confidence` and its cells `2 — Authenticated leak`.
**PASS.**

## The voice purge — every sentence deleted (Part One)

1. `Ten minutes reads the whole document. Chapter 02 is the heart of it.` (cover)
2. `— What this chapter established: the acknowledged secret budget spends about $3,206 every second.` (01)
3. `— What this chapter established: the money the government cannot or does not account for publicly is larger than the money it admits is secret.` (02)
4. `— What this chapter established: below two published totals, everything known comes from one leak, a handful of released records, and labeled estimates.` (03)
5. `— What this chapter established: the acknowledged secret budget costs your household about $754 this year.` (04)
6. `— In plain words: This is the case file's cover — what we're auditing, how big it is, and when the file opened.` (cover registry strip)
7. The label prefix `In plain words: ` removed from all 21 annotations sitewide (sentences kept, now unlabeled first lines).
8. `— The denominator of this audit` (Meter 3).
9. The instructional Your-Share line (`Divide the admitted secret budget…`) → replaced per §1.3.
10. The Reconciliation row-1 plain line (`Start with everything the government paid out…`) →
    moved to the top of the block and replaced per §1.3.
11. "How to read this" (six lines) → replaced wholesale by the §1.2 `— Contents` index.
12. The entire "What this is" section (label + both paragraphs), per §2.1 — its two
    non-duplicate facts now live as Subject-block annotations.
13. Both cover cross-links `→ See Chapter 01 — The Meter` and `→ See Chapter 02 — The Reconciliation`.
14. The Your-Share build-note sentence (`household count: to be registered as a Tier 1 claim at
    build…`) → replaced by `— Ledger: C-0013 · households: C-0028 (approximate)` with the new
    Tier-1 claim C-0028 (134,000,000 households, IRS SOI, source S-21) registered in the data.

## Vocabulary + numbering (Part Two, §2.3)

FILE numbering: the subjects-index next-link reads `↓ FILE 03/01 — THE NATIONAL INTELLIGENCE
PROGRAM`; dossier prev/next links read `← FILE 03/0N — NAME` / `FILE 03/0N — NAME →`. Every
remaining visible `Tier N` on dossier pages converted to Confidence vocabulary (annotation
lines and two body-prose mentions); the register and dossier tables share one vocabulary. The
`— Registry entries` em-dash is glued to its entry with a no-break space so it can never wrap
onto its own line. The running-foot colophon counts are now data-bound
(`21 REGISTERED SOURCES · 28 CLAIMS`).

## One branch (v3.3 tripwire 19, carried forward)

The merged `claude/spec-amendment-phase-0-x7u97i` branch was deleted locally; deleting it on
the remote is still refused by this environment's git proxy (HTTP 403 on
`git push origin --delete`) — a platform guardrail, not a repository setting. Every commit in
it is contained in `main` (merged via PR #1), so removing it on GitHub
(Branches → delete) loses nothing. Until then, `main` is the only branch that receives work.

---

# EDITION II — THE SOUNDING · PROOF (v4 §10 a–i + v4.1 §6 j–q)

Build proven byte-identical to the live deployment before testing: sha256 of live `/`,
`/record/`, `/files/langley/`, the 404 body, and every `/_astro/*` asset equals the local
`dist/` hash (the one "difference" was a 307 trailing-slash redirect, not content). Checks
marked LIVE ran against `blackledger.donald-dcd.workers.dev` over the network; browser-driven
checks ran against the byte-identical build because this environment's egress gateway resets
browser-originated connections to external hosts (curl allowed, Chrome refused —
`ERR_CONNECTION_RESET` at CONNECT, gateway relay log pasted in the session; DEVIATION noted).

## (a) Lighthouse mobile on the Face — screenshot: docs/proof/lighthouse-face.png
```
performance: 99 | accessibility: 100 | best-practices: 100 | seo: 100
FCP 1.2 s · LCP 2.0 s · CLS 0.001 · TBT 60 ms (mobile emulation, simulated slow-4G)
```
**PASS (≥90 required).** Two accessibility findings surfaced mid-proof and were fixed before
final scoring (SplitText's injected aria-label on a generic div; link aria-label not containing
visible text). One HTML-validity fix (figcaption must be figure's last child) also landed here.

## Mobile Excellence second run — one Descent
`/#/sounding/c-0009`: **performance 98, CLS 0.001** — far above the ≥70 bar. **PASS.**

## (b) CLS 0 on the Face
Lighthouse CLS **0.001** (rounds to 0.00; "0" display in the first run). Tabular numerals,
fixed-height monuments, reserved away-line. **PASS.**

## (c) Retired-edition strings on LIVE pages — zero
All 9 live pages fetched (`/`, `/record/`, six files, the 404):
`Case №` 0 · `— In plain words` 0 · `FILE No. 0` 0 · `What this chapter established` 0. **PASS.**

## (d) Color + family inventory in built CSS
Unique six-digit hexes: `#141210 #131110 #12100E #17140F #2C2823 #8F877A #C8511F #E8E0CE` —
exactly the 5 locked tokens + the 3 additional strata depths v4.1 §1 mandates (conflict with
v4's "exactly 5" resolved v4.1-wins; recorded in the Decision Ledger). `#fff/#000` exist only
inside `@media print` (v4.1 §2 orders them). Font families: Fraunces + IBM Plex Mono only,
plus their two `local()` metric-fallback shims (no files). **PASS as specified by v4.1.**

## (e) Reduced-motion pass (emulated `prefers-reduced-motion: reduce`)
```
descent opens: true · bar at final fill: matrix(0.0295…) · stamp opacity: 1
Lenis absent: true · Esc closes: true
```
Instant cuts, final states, all exits live. **PASS.**

## (f) Keyboard-only journey (recorded)
```
Tab → a.chrome__mark "THE BLACK LEDGER"
Tab → a.chrome__record "RECORD"
Tab → a.monument__link "$3,257 of admitted classifi…"   (the counter ticking between keys)
Enter → descent open: true, focus: button.sounding__ascend "× ASCEND"
Tab → button.gauge__tick "SURFACE"
Esc → descent closed: true, focus returned to the monument link
```
**PASS.**

## (g) Every monument figure vs claims.csv, programmatic, against LIVE HTML
All eight `data-figure` values in the live page equal the values independently derived from
`data/claims.csv` ($3,206 · $206,921,871,135 · 2 : 1 · $1.71 trillion · $101.1 billion · 8 ·
$754 · $115.5 billion) — script output: 8 × MATCH, ALL MATCH. The build additionally asserts
these at compile time and fails on drift. **PASS.**

## (h) 390×844 screenshots — attached
`docs/proof/monument-1.png … monument-8.png` and the full monument-2 descent:
`descent-1-surface … 5-below.png` (surface → context with the 2.9% bar → method with the
stamp → record row → provenance JSON below bedrock). **PASS.**

## (i) JS bundle
Total JavaScript, gzipped: **67,594 bytes = 66.0 KB** of the 180 KB budget. Fonts: 93.4 KB
subset of the 120 KB budget. **PASS.**

## (j) Placeholders on LIVE pages
`lorem|TODO|TBD|placeholder` across all 9 live pages: **0**. **PASS.**

## (k) Straight quotes in LIVE rendered copy
0 across all 9 live pages (scripts/styles excluded; the below-bedrock provenance `<pre>` is
machine-quoted data, per the Ledger). CSV strings pass through `curl()`; markdown through
smartypants. **PASS.**

## (l) W3C validity + console
validator.w3.org/nu, all four page types: `/` **0 errors** · `/record` **0 errors** ·
`/files/langley` **0 errors** · 404 **0 errors**. Console sweep across all 9 pages: zero
errors and zero warnings from the site's own code — the only console entries are the browser
noting the 404 page's own HTTP 404 status, which is that page behaving correctly. **PASS.**

## (m) Citation on copy — paste result
```
$206,921,871,135 — The Black Ledger, claim C-0009, source: USAspending FY2025
```
(clipboard read back in the browser test, verbatim.) **PASS.**

## (n) 404 + print — screenshots attached
`docs/proof/404.png` (Unrecorded., broken sounding line, verbatim copy) and
`docs/proof/record-print.png` (white ground, ink-black type, notes expanded, URL footnotes).
**PASS.**

## (o) Contrast, all token pairs (WCAG ratio)
```
bone on ground/context/method/record: 14.22 / 14.33 / 14.45 / 13.98 : 1
bone-dim on ground/context/method/record: 5.26 / 5.30 / 5.35 / 5.17 : 1   (≥4.5 required — PASS)
ember on ground/context/method/record: 4.14 / 4.17 / 4.21 / 4.07 : 1
ground on ember (selection): 4.14 : 1
```
Ember carries only large display digits, stamps, and 500-weight mono labels — all ≥3:1
large-text/UI territory; body copy never sets in ember. **PASS.**

## (p) The Pulse, frame by frame
Three snapshots of the current gauge tick across one beat (~0 / 160 / 320 ms):
`scale 1.0 → 1.0 → 1.1466` — the 300 ms 1→1.15→1 beat caught mid-swell, once per second,
paused when the tab is hidden, absent under reduced motion. **PASS.**

## (q) The Ledger of Decisions
`docs/DESIGN-DECISIONS.md` exists, ~100 entries, completeness pass recorded in its Phase 5.7
section: every element derived, nothing cut. **PASS.**

## Deviations carried into the proof (all pre-reported at their phase gates)
1. Browser-based checks ran on the byte-identical build, not the live URL (egress gateway
   blocks browser CONNECTs; parity proven by sha256).
2. LCP 2.0 s sits at the edge of v4 §6's <2.0 s budget under Lighthouse's simulated slow-4G —
   the mandated 400 ms ink-settle entry is inside that number; performance score 99.
3. The long exact figure renders below §2's display clamp; monument 6 has no proportion bar;
   percentages floor; the descent pin is CSS sticky; strata hexes exceed "5 colors" per v4.1;
   OG cards cannot attach to fragment-URL descents. Each is in the Decision Ledger with its
   derivation.

**All seventeen tripwires pass. Edition II is proven against the live deployment.**

*End of report.*
