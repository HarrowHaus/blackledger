# THE BLACK LEDGER — SPECIFICATION v4 · "THE SOUNDING"
## Edition II. This document REPLACES all prior design specs (v3–v3.4) for look, structure, motion, and copy. The data canon (data/*.csv, sources/, docs/METHODOLOGY.md) remains in force unchanged. Prior page structure, the case-registry framing, and the em-dash annotation grammar are RETIRED — they must not appear in Edition II.

**To the build agent:** you are building an award-candidate site. The concept, stack, tokens, copy, and motion are decided below. Your craft is in execution quality — 60fps, flawless mobile, obsessive detail — not in adding ideas. Where the spec is silent: do the quietest thing that serves depth.

---

# §0 — THE CONCEPT (memorize before coding)

**Depth is proof.** The subject is a budget you may know the *size* of but never the *contents* — a hole in the public record. So the site is organized by descent, not by chapters. The surface is nothing but monumental numbers. Each number can be sounded: the deeper the visitor goes, the closer they get to evidence. Four strata, always in this order:

`SURFACE` (the number) → `CONTEXT` (what it means) → `METHOD` (how it's computed, and its confidence) → `RECORD` (the raw claim, source, provenance).

**The signature invention — THE DESCENT:** tapping a number does not navigate; it *bores*. A full-screen takeover in which the visitor scrolls DOWN through the four strata of that single number, with a depth gauge tracking them, and the typography itself changing voice with depth (warm display serif at the surface → instrument mono at bedrock). Progressive disclosure as epistemology. This one interaction is the award thesis; every hour of polish goes here first.

**The one-sentence thesis** (site meta description, OG cards, and the only marketing line permitted): `The United States admits $101.1 billion of classified spending a year — and fails to account for twice that. Every figure on this site is traceable to its source.`

# §1 — STACK (locked; all open-source; no dependency timidity)

- **Astro** (static output, islands for interactive units). Deploys to the existing Cloudflare Worker.
- **GSAP** core + **ScrollTrigger** + **SplitText** + **DrawSVGPlugin** (all now 100% free; install from npm `gsap`). ScrollTrigger drives every scroll-bound animation; SplitText drives number/char materialization; DrawSVG strokes the mark system.
- **Lenis** for smooth momentum scroll (the 2026 standard), synced to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`.
- **CSS scroll-snap** on the surface feed (mobile), Lenis-compatible.
- Optional, budget-permitting (§6): a single full-page **WebGL grain shader** (OGL, tiny) giving the dark ground a faint paper/ink grain that responds subtly (±2px parallax) to scroll velocity. If it costs more than 3ms/frame on a mid-range phone, cut it without asking.
- Fonts self-hosted, variable, `font-display: swap`, subset: **Fraunces** (variable: opsz 9–144, wght 300–600, SOFT, WONK axes) and **IBM Plex Mono** (400/500). No other families ever.
- No React. No Tailwind. Vanilla + GSAP inside Astro islands.

# §2 — DESIGN TOKENS (locked)

| token | value | use |
|---|---|---|
| `--ground` | `#141210` | page; warm near-black (warmer than Edition I) |
| `--bone` | `#E8E0CE` | primary type; the beige, warmed |
| `--bone-dim` | `#8F877A` | metadata, gauge labels, strata keys |
| `--hairline` | `#2C2823` | 1px rules only |
| `--ember` | `#C8511F` | the signal: live digits, confidence stamps, the descent gauge's current-stratum tick. Never decoration, never backgrounds. |

Typography scale & depth mapping (the "voice changes with depth" system):
- SURFACE: Fraunces, opsz 144, wght 340, SOFT 80 — numbers at `clamp(4.5rem, 22vw, 15rem)`, tabular figures via `font-variant-numeric: tabular-nums`; captions Fraunces italic 1.125rem.
- CONTEXT: Fraunces opsz 28, wght 400, body 1.125rem/1.6, max 34ch on mobile.
- METHOD: transition zone — headings Fraunces, data lines IBM Plex Mono 0.8125rem.
- RECORD: IBM Plex Mono only. The bedrock speaks in monospace.
Radius 0 everywhere. Shadows: none. Borders: 1px `--hairline` only.

# §3 — THE FACE (the surface feed; this is the homepage, and it is the whole homepage)

Mobile-first: each monument fills one viewport (`100svh`), scroll-snap `y mandatory`, one number + one caption + one small mark. Desktop: same feed, numbers larger, gauge rail visible left. No header menu; a single wordmark `THE BLACK LEDGER` top-left (mono, 0.625rem, letterspaced) and `RECORD` top-right linking to bedrock.

The eight monuments, in order, copy verbatim (number / caption / ledger):
1. `$3,206` — `of admitted classified spending, every second. Live.` — C-0013 (live counter, ember digits)
2. `$206,921,871,135` — `the government's own tracking site was never told where this went last year.` — C-0009
3. `2 : 1` — `what agencies fail to report outweighs what the law lets them hide.` — C-0009/C-0013
4. `$1.71 trillion` — `paid out last year beyond anything traceable as a contract, grant, or loan.` — C-0026
5. `$101.1 billion` — `the secret budget the United States admits to. Two numbers a year. Nothing beneath them.` — C-0013
6. `8` — `consecutive failed audits. The Pentagon has never passed one.` — C-0017
7. `$754` — `your household's share of the admitted secret budget this year.` — C-0028/C-0013
8. `$115.5 billion` — `next year's ask — the largest classified request ever disclosed.` — C-0014/C-0015

Surface motion (ScrollTrigger per monument): number materializes once via SplitText chars (y: 0.6em → 0, stagger 0.02, duration 0.9, ease `expo.out`) as the monument enters 60% viewport; count-up for numeric values over the same beat (tabular-nums prevents layout shift); caption fades in 150ms later; the monument's mark draws in via DrawSVG (1.2s) simultaneously. Nothing scrubs on the Face — arrivals only, once. A thin ember progress tick on the left rail marks which monument is in view.

# §4 — THE DESCENT (the signature; build this like it's the whole site)

Trigger: tapping/clicking a monument (or its `SOUND THIS NUMBER ↓` affordance, mono, 0.6875rem). The takeover animates in 500ms: the tapped number performs a FLIP-style shrink from monument scale to a fixed header position (GSAP FLIP or manual transform), the ground darkens 6%, and a **depth gauge** appears on the right edge — a vertical rule with four ticks labeled `SURFACE / CONTEXT / METHOD / RECORD` (mono 0.5625rem, rotated on mobile to a bottom bar). The current stratum's tick is ember.

Inside: one Lenis-scrolled column, each stratum pinned briefly (`pin: true, scrub: 0.6`) as its content resolves:
- **CONTEXT stratum:** 2–3 short sentences (from the claim's public_note plus one comparison), and one **proportion mark**: a single hairline bar showing this number against total outlays, its fill drawn on scrub. Example, monument 2, verbatim: `The tracking site keeps a line it labels "Unreported Data" — money agencies never told it about. Secret programs are part of this line, but not all of it. It grew $42.5 billion in one year.` plus bar caption `2.9% of everything the Treasury paid out`.
- **METHOD stratum:** the computation set as a worked equation (mono), the confidence grade rendered as a physical **ember stamp** (bordered, rotated −3°, stamped-in with a 200ms scale-settle on entry): `CONFIDENCE 1 — OFFICIAL`. Assumptions listed for any estimate. Typography has now shifted to mono.
- **RECORD stratum (bedrock):** the claim's actual ledger row (ID, metric, amount, year, source link, retrieval date), a link `→ the full record`, and the source's human-stake line (§5.2). Background here is 4% lighter — you can feel you've hit bottom.
Exit: an ever-present `× ASCEND` (top-right), scroll-past-bedrock also exits (rubber-band + release), and browser Back always works (history state per descent). NEVER trap the visitor — award juries punish tunnels.

Reduced motion (`prefers-reduced-motion`): descents cut instantly between strata; no pinning, no scrub, no count-ups — final states only. This must be genuinely equivalent, not broken.

# §5 — THE MARK SYSTEM & THE FILES

**5.1 Marks (AI-authored, then vectorized).** One drawing system: *surveyor's and boring marks* — plumb bob, core sample, borehole rings, benchmark, sounding line, level. Eight marks (one per monument) + one wordmark device. Production rule: generate references with an image model if needed, but the shipped asset is a clean single-color SVG (stroke `--bone`, 1.5px, no fills, hand-traced imperfection preserved), animated only via DrawSVG. One mark per monument, max ~15% viewport. These marks are the site's handwriting — the proof a person made it; keep them slightly irregular.

**5.2 The Files (named subjects).** The six dossiers survive as `FILES`, reachable from relevant RECORD strata and a `FILES` index in the footer of the Face. Renamed to named subjects, each with a one-line human stake (verbatim):
- `LANGLEY` — the CIA: 28% of the budget in the only year we ever saw inside. (C-0019)
- `FORT MEADE` — the NSA: a fifth of the black budget, and the reason we know any of this — its contractor walked out with the document. (C-0020, C-0018)
- `THE DOCUMENT` — the 2013 leak: Edward Snowden's disclosure, the Washington Post's decision to publish, the only map that exists. (C-0018)
- `THE BOOKS` — the Pentagon's audit: eight failures, twenty-six weaknesses, and the inspectors who keep writing it down. (C-0017, C-0016)
- `THE SIX-POINT-FIVE TRILLION` — the misused number: what the Army's unsupported entries actually prove, and what they don't. (C-0025)
- `THE UNREPORTED LINE` — the confession in the machine: the government's own site admitting what it isn't told. (C-0009, C-0010)
File pages use the descent template (context → method → record) with 3–5 paragraphs of authored prose obeying §7.

# §6 — PERFORMANCE, A11Y, MOTION BUDGET (award juries score this)

- Animate `transform` and `opacity` ONLY. Passive listeners. `will-change` applied just-in-time and removed.
- Budgets, mobile mid-range: LCP < 2.0s, CLS = 0 (tabular-nums + fixed-height monuments), INP < 200ms, JS < 180KB gzipped total, fonts < 120KB subset.
- Lighthouse ≥ 90 performance on the Face, mobile emulation — a tripwire, not a wish.
- Full keyboard path: monuments focusable, Enter descends, Esc ascends, gauge is `aria-hidden` with an equivalent `aria-live` stratum announcement.
- The live counter uses `requestAnimationFrame`-batched updates once per second, tabular-nums, and pauses when tab is hidden.

# §7 — VOICE (carried forward, tightened)

All v3.4 voice law stands: declarative, no accusations, no outrage adjectives, no meta-narration, no exclamation marks, second person only where specified, every figure resolves to a claims.csv row. The em-dash annotation grammar is retired; metadata renders as mono key/value lines without theatrical dashes. Confidence vocabulary (1 — Official … 5 — Unverified) is unchanged. Estimates render as ranges with assumptions, never blended.

# §8 — WHAT IS RETIRED / FORBIDDEN IN EDITION II

The case-registry strip and `CASE №` framing · the em-dash `—` annotation grammar · "FILE No. 0X/0Y" numbering (files are now named) · chapter structure and pagination footers · epigraph on the surface (it moves to the RECORD page footer) · light theme · emoji, icons-as-decoration, stock imagery, photography · carousels · cursor-following gimmicks · text that narrates the reading experience · any second typeface beyond the two · scroll-hijacking that blocks exit · loading screens longer than 400ms.

# §9 — ROUTES & DATA

`/` The Face (8 monuments + footer: FILES index, RECORD link, thesis line, colophon `PUBLISHED AS AN OPEN AUDIT · EDITION II · MMXXVI`). Descents are overlays with history states (`/#/sounding/{claim}` style), not page loads. `/files/{slug}` six files. `/record` bedrock: the full claims register (collapsed rows, Confidence vocabulary), methodology (v3.4 public preface + technical rulebook), sources with human links + `API:` metadata lines, glossary with anchors, corrections, the constitutional epigraph as the closing element, share links (Copy link / Bluesky intent / email). All figures build from `data/claims.csv` exactly as before; a hard-coded figure is a build failure.

# §10 — PHASES & TRIPWIRES

PHASE 0 — Tag the current build `edition-1` in git; register this spec in `docs/`. 
PHASE 1 — Scaffold: Astro, fonts subset + self-hosted, tokens, Lenis+GSAP wiring, data layer.
PHASE 2 — The Face: all eight monuments, marks stubbed as simple geometry, arrival motion, live counter, snap feed, left rail.
PHASE 3 — The Descent: full takeover for ALL eight monuments from the claim data + §4 copy rules, depth gauge, stamps, FLIP entry, exits, reduced-motion parity.
PHASE 4 — Files + Record: six named files, bedrock page, glossary anchors, share intents.
PHASE 5 — Marks: produce the eight SVG marks per §5.1 (draw programmatically or trace generated references), wire DrawSVG.
PHASE 6 — PROOF: run every tripwire against the LIVE deployed site with pasted evidence in `docs/TRIPWIRE-REPORT.md`.

TRIPWIRES: (a) Lighthouse mobile ≥90 perf on `/`, screenshot the score; (b) CLS 0 on the Face; (c) grep live pages for `Case №`, `— In plain words`, `FILE No. 0`, `What this chapter established` → zero; (d) exactly 5 hex colors, 2 font families in built CSS; (e) reduced-motion pass: descents functional with zero animation; (f) keyboard-only full journey recorded in the report; (g) every monument figure matches its claims.csv row programmatically; (h) 390×844 viewport screenshots of all 8 monuments + one full descent attached to the report; (i) JS bundle ≤180KB gzip, report the number.

---
# §11 — PROMPT FOR CLAUDE CODE — paste everything below this line
# (Before pasting: put SPEC-v4-THE-SOUNDING.md in the blackledger repo folder.)

You are building Edition II of THE BLACK LEDGER — an award-candidate rebuild. The file `SPEC-v4-THE-SOUNDING.md` in this directory is the complete and binding specification; it replaces all prior design specs, while `data/`, `sources/`, and `docs/METHODOLOGY.md` remain canon. I am not a coder — report in plain language, never ask me to write or edit code.

GIT & DEPLOY RULES — absolute, entire session: one branch (the default) only; never create a branch; never open a pull request; every commit is performed by a Haiku subagent (stage, message, commit, push); every phase ends with a successful push AND a successful deploy of the Worker, and the phase is not done until the live URL serves the phase's work.

Execute the spec's §10 phases in order, 0 through 6. Before Phase 1, restate the concept (§0) and the signature invention in your own words in one paragraph so I can confirm you've understood — then proceed without waiting. During Phase 6, every tripwire result in `docs/TRIPWIRE-REPORT.md` must include pasted evidence (scores, grep output, bundle sizes, screenshots); a checkmark without evidence does not count, and the phase is not complete until every check passes against the LIVE site.

When finished, tell me in plain language: what the Face feels like on a phone, how the Descent behaves for monument 2 top to bottom, the Lighthouse score and bundle size, and anything in the spec you could not achieve exactly as written — with what you did instead.
