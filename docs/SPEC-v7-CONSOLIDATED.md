# THE BLACK LEDGER — SPEC v7-CONSOLIDATED · THE IN-FORCE LAW
## Purpose: this single document supplies every definition that SPEC-v7.1-TRUE-COUNT.md references. It consolidates, verbatim, the surviving law of the retired concept documents (v5, v6, v7) so that ONLY in-force material enters this repo. Register this in docs/ alongside v7.1. Where v7.1 conflicts with anything here, v7.1 wins. Phases and gating are governed exclusively by v7.1 §5 and the standing session rules.

## VOID BY OWNER DECISION — never build, reference, or reconstruct:
- All of v5 [MK] (instrument marks: seismograph, balance, plumb bob, drill — the Rive dependency with them) and all v5 [DS] bore-shaft/geology dressing and [GL] dust/particle systems.
- All of v6 (the archive world: lamps, dust, pointer-light, the Document object, descent staging). 
- All particle systems of any kind (struck again by v7.1 §0.1).
- The nautical/mining/archive vocabulary on any visitor-facing surface.
If any of the above appears in code or copy, it is drift; remove it.

## SURVIVING v6 CLAUSE (the only one): THE WIT LICENSE — measured dry wit is licensed at most one line per scene, in the register of the 404 line ("Unlike $206.9 billion, we can say so with confidence."). Never sarcasm at people; only at the absurdity of the arithmetic. New wit lines require the owner's verbatim approval in a phase report before shipping; v7.1's captions are pre-approved.

## RENDERER BASELINE (carried from the retired stack law): one persistent renderer for the whole site — WebGPU first, automatic WebGL2 fallback; scenes swap, the context never rebuilds; renderer choice logged as a single mono console line.

---
# PART A — RETAINED SUBSYSTEMS (verbatim from v5; all still binding)

**Stack additions (all open-source, all npm):** `three` (r17x, `WebGPURenderer` with automatic WebGL2 fallback — the 2026 Developer-Award signal), `troika-three-text` (SDF text rendering for shader-treated typography), `postprocessing` (grain, vignette, chromatic aberration), `@dimforge/rapier2d` (physics for the instruments and cursor), `@rive-app/canvas` (the eight instrument marks become rigged animations), Web Audio API (no library), existing GSAP/ScrollTrigger/SplitText/Lenis retained as the choreography layer driving shader uniforms.
**Budgets amended:** JS ≤ 650KB gz total, GL boot deferred until after first paint (LCP budget unchanged at 2.0s — the type paints first, the scene fades in beneath it ≤ 1.2s later). 60fps desktop / ≥45fps mobile mid-range, measured, evidenced.

## [TY] SHADER TYPOGRAPHY — the numbers are rendered, not typeset (the Chipsa move, made ours)
TY-01 The eight monument numbers render as SDF text (troika) in Fraunces, lit by the scene; the DOM keeps a visually-hidden accessible copy (screen readers and SEO read real text; the GPU draws it).
TY-02 Materialization replaces SplitText on monuments: each number resolves from an ink-noise field — a simplex-noise dissolve driven 1→0 over 1.1s as the monument crosses 60% viewport; the noise scale is 240 at start (illegible static) → 0 (crisp). A number literally condenses out of noise: classification resolving into fact.
TY-03 The live counter's changing digits do TY-02 per digit at 90ms — every second, one or two digits re-condense.
TY-04 Velocity smear: `uVel` drives 0–14px vertical motion-blur (directional gaussian in the text shader) on monument numbers while scrolling; text is never blurred at rest.
TY-05 Refraction at stratum boundaries: during a Descent, as a number crosses a strata line, it refracts — 4px displacement + 1.5px RGB split for 300ms (render-target lens, the Artlife two-lens technique, used ONLY at boundaries).
TY-06 Captions, prose, mono data remain real DOM text always — shaders touch numbers only. Selection, copy-citation, and find-in-page keep working.

## [PT] PARTICLES & POST
PT-01 Post chain (in order): film grain (animated, luminance-weighted, amplitude per stratum per v4.1), vignette (0.18, deepening 0.04 per stratum), chromatic aberration ONLY during descent transit (0 at rest → 0.0022 at max travel speed → 0).
PT-02 `uVel` adds ±1px barrel micro-distortion at viewport edges while scrolling fast (imperceptible at rest — the page has optics).
PT-03 On the 404: the post chain renders at minimum exposure — the site with the light off. (Particle reference removed; particles are void.)

## [AU] AUDIO — off by default, one mono toggle `SOUND: OFF/ON` in the footer, state persisted
AU-01 Room tone: near-silent brown noise, -46dB, low-pass sweeping 800Hz (surface) → 220Hz (bedrock) — depth you can hear.
AU-02 The Pulse: a single soft wood-block tick per second, -30dB, only when sound is on and tab visible.
AU-03 Stratum crossing: one deeper tick (pitched down per stratum).
AU-04 The stamp: a felt-muted thump on CONFIDENCE stamp entry.
AU-05 All synthesized with WebAudio oscillators/noise buffers — zero audio files, zero bytes.

## [HP] HAPTICS — Android/supported only, silently absent elsewhere
HP-01 `navigator.vibrate(8)` on stratum crossings; `vibrate([12,30,12])` on the stamp; nothing else, ever.

## [PF] THE FALLBACK LADDER (the pro pattern, stated once, enforced everywhere)
PF-01 Tier A: WebGPU, all systems. Tier B: WebGL2, reduced instance LOD counts (identical true totals per v7.1 §4.2), PT-02 off. Tier C: no GL (reduced-motion, low battery via `getBattery` where available, <45fps sustained 3s, or context loss) — the existing Edition II typographic site, verbatim, with GL modules never even fetched (dynamic import gating).
PF-02 Tier decisions are logged as one mono console line and recorded in the tripwire report from real device tests.
PF-03 Tier C is a first-class citizen: it must remain pixel-perfect forever; every future change ships in both A/B and C.

## [MO] MOBILE-SPECIFIC
MO-01 Descent on touch: the shaft travel is driven by natural scroll (no gesture invention); FLIP + travel budgeted to sustain 45fps on a 3-year-old Android — evidence required.
MO-02 Device-orientation parallax (opt): ±4px camera drift from gyro, requested only after first zoom interaction, never prompted with a modal.
MO-03 Thumb-reach: SOUND toggle, ASCEND, and RECORD all within bottom 25% on mobile.

---
# PART B — THE v7 LAW (verbatim and in force; the plane is DEMOTED by v7.1 §2.2 to the L3/L4 method-and-record instrument, but its definitions below govern that instrument)

# §0 — THE FUSION LAW (governs every decision)
Every aesthetic choice must state its UX function; every UX choice must state its aesthetic consequence. One line each, both directions, in the Decision Ledger. An element with scenery-only justification ("atmosphere," "mood," "depth of feeling") is a violation. The prior metaphor-worlds (case file, shaft, archive) are formally retired; no vocabulary from them appears on any surface.

# §1 — THE PLANE (the whole site is one composition)
P-01 One continuous 2D magnitude-plane on the GL canvas: FY2025 total outlays ($7.010T, C-0001) is the ground field — rendered as a fine unit-grid (1 cell = $100M ⇒ 70,100 cells, instanced, bone at 6% opacity on ground).
P-02 Every claim occupies its true proportional area on the plane, positioned by category: traceable mass (C-0005) as the dominant region; the residual (C-0026) as the region literally left over; the admitted budget (C-0013) sited inside the residual at its actual 1.4% scale; the unreported line (C-0009) beside it at 2.9%; next year's ask, household share, audits sited as satellites with computed areas. Composition is not designed — it is computed from claims.csv. Layout IS the dataset.
P-03 Labels: each region carries its figure in shader text (v5 TY) scaled by `log(amount)` — size is never art-directed. Captions (v4 copy, verbatim) render at fixed readable size on approach (zoom-gated).
P-04 Ember appears exactly twice on the plane: the live-accretion cell (P-06) and the current focus ring. Nothing else.
P-05 Mobile is the primary composition: the plane is portrait-proportioned; L0 fits the thesis regions in one thumb-view; pinch and scroll both drive zoom (scroll = zoom on the focused region; pinch = free). Desktop gets the same plane larger, cursor = focus, wheel = zoom.
P-06 THE PULSE, fused: once per second, one $3,206 unit visibly accretes onto the admitted region's edge (a cell fills, 300ms). At L0 it reads as a living edge; at L1 you can watch the budget grow cell by cell. The heartbeat is now data.

# §2 — SEMANTIC ZOOM (the strata, as magnification; replaces every descent/travel mechanic)
Z-01 Five levels: L0 the whole plane (the thesis at a glance) → L1 a figure (its region fills the view; monument number + caption) → L2 resolution (full digits condense per v5 TY-02; context sentences; the proportion is now the literal frame you zoomed through) → L3 method (the worked computation set in mono ON the region's surface; CONFIDENCE stamp strikes — AU/HP fire) → L4 record (the ledger row, source link, retrieval date; one more push: raw provenance JSON at maximum magnification).
Z-02 Zoom transitions are continuous (camera scale on the plane, GSAP-scrubbed), 60fps, interruptible at any frame; back-gesture/Esc steps out one level; the URL hash encodes claim+level (shareable, back-button-true).
Z-03 A minimal zoom-scale indicator (mono: `L2 · RESOLUTION`) replaces the depth gauge — top edge, thumb-safe.
Z-04 Every v4 Descent copy block maps 1:1 onto L2–L4, verbatim; nothing is rewritten, only re-staged.

# §3 — SHARPNESS = CONFIDENCE (the signature fusion mechanic)
S-01 Tier 1–3 regions resolve without limit: every zoom level renders crisper, terminal state razor-sharp provenance.
S-02 Tier 4 estimates physically cannot focus: a resolution floor (persistent 6–10px gaussian in their material) that zoom never defeats; their figure renders only as the range band ($18–24B) with its assumptions at L3. Attempting to zoom past the floor produces a gentle optical refusal (the blur breathes, +2px, settles) and the line: `An estimate. It does not sharpen.` — one of the licensed dry lines.
S-03 Tier 5 (future) would render as outline-only regions, hollow, unfillable. Encoded now in the material system.
S-04 The methodology page states the optics in one sentence so the mechanic teaches itself: `On this site, focus is evidence: official figures sharpen without limit; estimates never fully resolve.`

# §4 — MOTION = ARITHMETIC (transitions are computations)
A-01 The reconciliation is played, not told: entering C-0026 at L2 runs the subtraction — the traceable region's cells visibly evacuate the total's field (900ms, staggered), and what remains standing IS the residual, its figure condensing above the remaining mass.
A-02 The 2:1 comparison: the unreported and admitted regions slide adjacent and the ratio measures itself with a hairline bracket.
A-03 Your Share: the admitted region divides — a 1/134,000,000 sliver detaches, magnifies to legibility, and becomes $754. Division as picture.
A-04 Rule: any figure derived by computation must be able to perform its computation on screen at L2. Static explanation of derivable math is a violation.

# §5 — CUTS & GUARDS
C-01 Cut from code in P1: lamps, dust, dolly path, pointer-light, the Document model, all v6 [W]/[D]/[DE] staging, all v5 [MK]/shaft remnants.
C-02 The eight-monument FILES content, record page, methodology, glossary, corrections all persist as L3/L4 destinations and the /record route (Tier C shares them).
C-03 Tier C untouched after every phase — failed phase otherwise.
C-04 Performance: the instanced grid + zoom must hold 60/45fps (desktop/mid-mobile) at every level; evidence per phase.

---
# NOTE ON TRIPWIRES: "all standing tripwires" means every tripwire of v3→v4.1 already in docs/, plus Part A's [PF]-02 evidence rule, plus v7 §5 C-03/C-04 above, plus v7.1 §4.3 (r)(s)(t).
