# THE BLACK LEDGER · EDITION II — THE MICRO-CHOICE LEDGER
### v4.1 §0: every element states its one-line derivation from the concept — depth is proof; a sounding of a sealed budget. Elements without derivations are fixed or cut. This file accretes per phase and is completed in Phase 5.7.

## Phase 1 — Scaffold

| element | decision | derivation (one line) |
|---|---|---|
| Fraunces roman font file | variable, all four axes kept: opsz 9–144, wght 300–600, SOFT 0–80, WONK 0–1; latin subset; 70.2 KB | the voice that changes with depth needs the full optical range in one file (v4 §1/§2) |
| SOFT axis capped at 80 (not 100) | instancing limit | the spec's only SOFT value is 80 (surface numbers); carrying unused softness is weight without depth |
| Fraunces italic font file | pinned static: opsz 18, wght 400, SOFT 0, WONK 0; 14.8 KB | italic exists for one role — the 1.125rem caption at the surface — so it carries exactly that voice and nothing else (budget: v4 §6) |
| IBM Plex Mono 400/500 | re-subset to the site's exact character inventory, hinting stripped; 5.3 KB each | bedrock speaks in monospace; the instrument carries only the characters the record actually uses |
| Font character set | ASCII + § ° ± · × ÷ – — ’ “ ” … № → ↓ − ≈ ≤ ≥ + figure space | computed from the data canon and specs — the fonts carry the record's alphabet, no more |
| Fallback @font-faces (Georgia / Courier New, size-adjust + overrides) | metrics matched to Fraunces/Plex from font tables | nothing shifts while the real voice loads (v4.1 §2: size-adjust so nothing shifts) |
| `--bone-dim` contrast | measured 5.26:1 on `--ground` — passes ≥4.5:1, token unchanged | v4.1 §2 mandated verification; no adjustment needed |
| Strata background tokens | `#141210 / #131110 / #12100E / #17140F` as CSS custom properties | v4.1 §1 verbatim — deeper is darker; bedrock is 4% warmer-lighter so you can feel bottom |
| Prose numerals oldstyle, data numerals tabular lining | body defaults oldstyle; `.data/.num/.mono/.display` re-assert tabular lining | v4.1 §1 verbatim — data stands at attention, prose sits |
| `::selection` ember on ground | | v4.1 §1 verbatim — highlighting a fact stamps it |
| Focus ring 1px ember, offset 2px | `:focus-visible` only | v4.1 §1 verbatim — attention is the signal color, never the browser's blue |
| Hover/press states | underline 1px bone offset 3px; press adds translateY(1px) | v4.1 §1 verbatim — interaction states never invent colors |
| Scrollbar thin, hairline track; ember thumb only under `html.descending` | | v4.1 §1 verbatim — the borehole has a lining |
| Ink-settle entry | body opacity 0→1, 400ms, ease-out, disabled under reduced motion | v4.1 §2 verbatim — first paint is ink arriving, no preloader theater |
| Motion core | GSAP + ScrollTrigger + SplitText + DrawSVG; Lenis `autoRaf:false` synced via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`; Lenis never constructed under reduced motion | v4 §1 verbatim wiring; v4.1 §2 (Lenis disabled entirely under reduced motion) |
| `color-scheme: dark` on html | | the ledger has one ground; form controls and UA surfaces must sit in the same dark (no light theme — v4 §8) |
| `viewport-fit=cover` + (Phase 2) safe-area insets | | monuments own the whole screen; the gauge must respect the device's own edges (v4.1 §1) |
| Newsreader font files retained temporarily | Edition I pages still reference them until the Face flips | transitional only — removed when Edition I routes are replaced; will not ship in Edition II's final CSS |
