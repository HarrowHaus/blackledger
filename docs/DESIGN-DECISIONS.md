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

## Phase 2 — The Face

| element | decision | derivation (one line) |
|---|---|---|
| Monument figures derived + asserted | every figure computed from claims.csv; the build throws if a derived figure drifts from §3's verbatim value | a hard-coded figure is a build failure (v4 §9); the surface may show only what the record can prove |
| Monument 6's "8" | carried as a status figure, build-asserted against C-0017's own note ("the eighth year in a row") | a status claim's figure lives in its record, not in a loose constant |
| Long-figure size (`monument__num--long`) | the 16-character exact figure renders at clamp(2.25rem, 10.5vw, 8.5rem) instead of §2's display clamp | the exact unreported figure must stand on ONE line to be read as a single fact — legibility of evidence outranks scale (DEVIATION, reported) |
| Worded figures wrap at word boundaries | SplitText type words,chars | "$115.5 billion" breaking mid-word would corrupt the fact; the word is the unit of meaning |
| `.hang * { text-indent: 0 }` | hanging-punctuation indent stops at the container | the hang belongs to the pulled figure's first line, not to every bored-out character |
| Per-digit roll count-up | each split digit rolls 0→final over the same 0.9s beat as the materialization | count-up and char materialization occupy one beat (§3); tabular digits roll in place with zero shift |
| Live counter = wall-clock × rate | value is always rate × seconds since arrival; display updates once per second, paused when hidden | the budget spends in real time whether or not the tab watches — the display pauses, the fact does not (v4 §6 + v4.1 §3.6) |
| Counter runs under reduced motion | text updates once per second, no animation | the live figure is content, not decoration; reduced motion removes motion, not facts |
| Away-line reserved height | the "+$X while you were away" line owns its line-height from first paint | its arrival must not shift the monument (CLS 0, v4 §6) |
| Rail desktop-only | ticks hidden below 720px | v4 §3 verbatim: mobile is the snap feed; the gauge rail is a desktop instrument |
| Scroll-snap on coarse pointers only | `@media (pointer: coarse)` gates `scroll-snap-type` | v4 §1: snap is the mobile feed's discipline; desktop momentum belongs to Lenis, and the two fight if overlapped |
| Citation-on-copy source labels | compact per-source labels (e.g. "USAspending FY2025"), falling back to the registered source name | v4.1 §3.3's own example format; provenance must read like a citation, not a database row |
| Stub marks (8 + broken line) | single-stroke surveyor geometry: plumb bob, core column, borehole rings, benchmark, sounding line, level, weighted line, ring-with-drop | Phase 2 placeholders in the §5.1 family, replaced by the hand-drawn set in Phase 5 |
| Stub SVG favicon (plumb bob, bone on ground) | shipped now, refined in Phase 5 | v4.1 §1 names the favicon; an empty tab icon is an unauthored element too |
| 404 shipped in Phase 2 | designed artifact with §2's verbatim copy + broken-line stub mark; `not_found_handling: "404-page"` in wrangler | the Face's FILES/RECORD links precede their pages by two phases; the net under them is specified, so it went up with them |
| Visually-hidden h1 "THE BLACK LEDGER" | | headings must be hierarchical (v4.1 §5) on a page whose only visible text is evidence |
| WONK K in the top-left wordmark | the K of BLACK set in Fraunces WONK 1 inside the mono wordmark | v4.1 §1 verbatim — the single controlled quirk, placed exactly where it names itself |

## Phase 3 — The Descent

| element | decision | derivation (one line) |
|---|---|---|
| CSS `position: sticky` as the pin mechanism | each stratum is 150svh tall with a 100svh sticky face; GSAP handles the scrub (0.6) on top | the pin must be unbreakable inside a nested scrolled overlay — sticky is the native pin, and the borehole cannot afford a jammed drill |
| Second Lenis instance per descent | created on open with the overlay as wrapper, destroyed on ascend; never created under reduced motion | v4 §4 verbatim: "one Lenis-scrolled column"; the borehole has its own momentum |
| Strata attribute drives background | `data-stratum` on the overlay, CSS transition 500ms between the four v4.1 §1 hexes | depth is continuous; the ground darkens as you sink and warms at bedrock |
| Content resolve on scrub | each stratum's body rises from 15% opacity over scrub 0.6 as it pins | v4 §4: content "resolves" as the stratum pins — resolution is the reward for depth |
| Proportion fill in bone, track in hairline | the bar's fill is data, not signal | ember is reserved (v4 §2): live digits, stamps, gauge tick — a static proportion is evidence, so it speaks in bone |
| Percentages floored, not rounded | 2.952% renders "2.9%" | the ledger never overstates — and §4's verbatim monument-2 caption confirms truncation |
| Monument 6 has no proportion bar | the audit is a status claim with no dollar figure | a bar against outlays requires a dollar numerator; drawing one would invent data (DEVIATION, reported) |
| CONTEXT copy for monuments 1, 3–8 | authored from each claim's public_note + one comparison, §7 voice law | v4 §4 prescribes the recipe and gives only monument 2 verbatim; the rest are flagged to the owner in the phase report |
| Stamp entry once, 200ms scale-settle | scale 1.35→1 with opacity, fired on first entry only | v4 §4 verbatim: a stamp is pressed once; re-stamping on every pass would make it a decoration |
| FLIP ghost element | a fixed clone of the tapped number animates monument→header in 500ms, then the real header figure appears | v4 §4 verbatim: the number shrinks from monument scale to the header — the fact survives the descent |
| History: pushState on open, back() on ascend | deep links `#/sounding/{slug}` open directly; popstate always closes/opens to match | v4 §4: browser Back always works; a URL per descent makes every sounding addressable |
| Rubber-band exit needs 250ms at bottom | bottom intent within the settle window is ignored | the release must be deliberate; accidental overscroll must not eject the reader from bedrock |
| Ledger rows for every claim the figure uses | monuments derived from two claims show both rows at bedrock | the record stratum is the claim's actual row (v4 §4); a derived figure owes the reader both parents |
| Provenance fragments (v4.1 §3.4) | C-0009 descents show the actual USAspending JSON entry; others show their claims.csv rows as JSON | bedrock under bedrock is the raw data we actually hold — nothing staged |
| File stake at bedrock only where a file cites the claim | C-0009 → THE UNREPORTED LINE, C-0017 → THE BOOKS | §5.2: files are "reachable from relevant RECORD strata" — relevance is citation, not decoration |
| Grain shader not built | the §1 option stays unexercised | v4 §1/§6: optional and budget-gated; the quietest thing that serves depth is ground, not texture (recorded, not silent) |
| `[hidden] { display: none !important }` base guard | | a closed borehole leaves no chrome behind — no author display rule may resurrect hidden overlay parts (owner-reported defect, fixed) |
| Monument-by-monument settle on desktop | Lenis-native snap: when wheel momentum dies, the feed glides to the nearest monument top (or the footer) | v4 §3: one number per viewport is the Face's discipline on every input, not only on touch (owner correction) |
| Stratum-by-stratum settle in the Descent | same Lenis snap against stratum tops; CSS mandatory snap on touch | the borehole descends in strata, not in pixels — depth is discrete (owner correction) |

## Phase 4 — Files + Record

| element | decision | derivation (one line) |
|---|---|---|
| `/record` sits on the record stratum (`#17140F`) | whole-page background | the record page IS bedrock — the descent's bottom made addressable (v4 §9 "bedrock page") |
| Record page voice split | data (register, sources, ledger rows) speaks mono; explanatory prose (methodology, glossary) speaks the context voice | §2's depth voices applied to one page: what is evidence stands at attention, what explains it sits |
| Section labels REGISTER / HOW THIS SITE WORKS / SOURCES / GLOSSARY / CORRECTIONS / SHARE | authored mono caps labels (flagged) | an index, not advice — labels name strata of the record, they do not narrate reading |
| Register rows are `<details>` collapsed | 28 rows, Confidence vocabulary, notes expand inline, deep links open their row | v4 §9 verbatim (collapsed rows); a ledger is scanned closed and opened deliberately |
| `API:` metadata lines without the em-dash | plain mono key/value | v4 §7/§8: the em-dash annotation grammar is retired; metadata is instrument-plain |
| Epigraph as the closing element | last content on /record, above only the colophon | v4 §8 verbatim: the epigraph moved from the surface to the record's foot — the constitutional sentence closes the audit |
| Print stylesheet | white ground, ink-black bone, notes print expanded, URLs expand as footnotes, @page margin + page counters | v4.1 §2 verbatim: an audit should print; disclosure has no meaning on paper |
| File pages = descent template, statically | context prose → mono equation + stamp → ledger rows on the record stratum; no overlay, no gauge | §5.2: files use the descent template; a page you arrived at by URL needs no borehole chrome to feel its strata |
| File prose | 3–5 paragraphs per file, adapted from the Edition I dossier canon, all figures interpolated from claims.csv | §5.2 requires authored prose under §7; the Edition I dossiers are already voice-lawful canon — new words only where names changed |
| File stamps carry the primary claim's grade | LANGLEY/FORT MEADE/THE DOCUMENT: 2 — Authenticated leak; THE BOOKS/THE UNREPORTED LINE: 1 — Official; SIX-POINT-FIVE: 3 — Released record | the stamp is the file's confidence, derived from its first-cited claim, never asserted |
| Plumb-line transition | 1px ember line, scaleY 0→1 from top, 450ms expo.inOut, then navigation; Face→/record only; plain navigation under reduced motion | v4.1 §3.5 verbatim — the site's one page transition, the plumb line dropped to bedrock |
| Edition I fully retired | /chapters/* routes, Document/Dossier layouts, 8 components, app/tokens stylesheets, Newsreader + old Plex files deleted | v4 §2/§8: prior structure is RETIRED and must not appear in Edition II — coexistence ended the moment its replacements shipped |
| `curl()` at the data layer | straight quotes in CSV strings render as ’ “ ” ; the CSV stays byte-identical | v4.1 §1: a straight quote in the built output is a defect; the canon is data, the typography is ours |
| Range claims in ledger rows | C-0024 renders `$18–24 billion (range)`, C-0027 `10–12%` | estimates render as ranges everywhere, never as points (v4 §7) |
| Provenance JSON keeps machine quotes | the below-bedrock `<pre>` fragment is data display, excluded from the curly-quote law | the raw record is quoted as the machine wrote it — curling it would forge the evidence |
| Gauge ticks are controls | SURFACE/CONTEXT/METHOD/RECORD are buttons: tap bores straight to that stratum; ≥44px targets; aria-current on the active tick; aria-hidden dropped in favor of labeled buttons + the aria-live announcer | the gauge is an instrument, not a sticker — a depth gauge you can grab is still a depth gauge (owner correction) |
| Stratum tracking from scroll position | active stratum computed directly from scrollTop against section offsets, replacing ScrollTrigger toggles | the gauge must read true on every device; an instrument that sticks is worse than none (owner-reported defect) |

## Phase 5 — The Marks

| element | decision | derivation (one line) |
|---|---|---|
| The mark set, hand-authored | nine single-stroke SVGs; every "straight" line is a shallow bézier, no circle closes exactly, tick lengths drift | §5.1 verbatim: the site's handwriting — proof a person made it, kept slightly irregular |
| Monument→mark mapping | 1 plumb bob (the constant vertical), 2 core sample with an X-ed unlogged section, 3 level with the bubble off true, 4 borehole rings, 5 benchmark (the one fixed published point), 6 leveling rod with eight graduations, 7 sounding lead, 8 deep bore reaching past its depth bars | each mark is the monument's fact drawn in the surveyor's alphabet |
| Wordmark device | two ledger rules with the plumb line dropped through them; sits in the Face footer above the colophon | §5.1's ninth asset: the ledger and the sounding in one device |
| Final favicon | the real plumb bob path, bone on ground, 3.5px stroke for tab legibility | v4.1 §1 verbatim; the favicon is the mark at its smallest sounding |
| OG poster cards | 8 build-time PNGs (1200×630): ground, mono wordmark, the number at monument scale (ember for the live counter), the −3° ember stamp, thesis line; figures parsed from claims.csv and asserted against §3 | v4.1 §3.7 verbatim — every share is a poster; a hard-coded figure is a build failure even in tooling |
| OG image routing | Face carries the live-counter card; all other pages default to the admitted-budget card | fragment-URL descents cannot carry their own OG tags; the surface speaks for them (DEVIATION, reported) |
| manifest.webmanifest + icons | standalone, ground/theme #141210, SVG + 192/512 PNG + apple-touch-icon, all rasterized from the plumb bob | v4.1 §5: installable is fine; the installed icon is the site's mark, nothing new |
| scripts/og.mjs committed | the card generator lives in the repo; fonts passed by path (instanced TTFs are tooling inputs, not shipped assets) | generated assets must be regenerable, or they are unauthored |

## Phase 5.7 — The completeness pass (v4.1 §6)

Rows the per-phase accretion had not yet stated explicitly:

| element | decision | derivation (one line) |
|---|---|---|
| The five tokens | `#141210 / #E8E0CE / #8F877A / #2C2823 / #C8511F`, byte-exact from v4 §2 | locked by spec; the ground, the bone, the dim, the hairline, the signal — nothing else may exist |
| Built-CSS color inventory vs tripwire (d) | the built output contains exactly 8 six-digit hexes: the 5 tokens + the 3 additional strata depths of v4.1 §1 (surface reuses the ground) | v4 §10(d) says five; v4.1 §1 mandates the strata values; where they conflict, v4.1 wins — the conflict and its resolution are recorded here |
| Print white/black pair | `#fff` ground / `#000` ink exist only inside `@media print` | v4.1 §2 verbatim: on paper the ground becomes white and bone becomes ink-black — print colors are authored, not drift |
| Fallback font families | `Fraunces-fallback` / `PlexMono-fallback` are `local()` metric shims of Georgia / Courier New, no files shipped | two typefaces ever (v4 §1); the shims exist so the real voices arrive without a shift, and vanish on first paint |
| `<meta name="theme-color" #141210>` | | v4.1 §1 verbatim — the browser chrome sits on the same ground |
| Disabled does not exist | no disabled state is styled or shipped anywhere | v4.1 §1 verbatim — nothing on this site is disabled |
| The Pulse | scale 1→1.15→1, 300ms, power1.inOut, once per second, skipped when the tab is hidden and under reduced motion; beats the rail tick on the Face and the gauge tick in a Descent | v4.1 §3.2 verbatim — the budget never stops; neither does the site |
| The blurred-tab title | on blur `document.title` = "Still counting — THE BLACK LEDGER"; on return the missed accrual renders tabular in the counter caption | v4.1 §3.6 verbatim — absence is the subject; the site notices yours |
| Measures | context ≤34ch mobile / 58ch desktop; mono ≤46ch; `hyphens:auto` + `-webkit-hyphenate-limit-lines:2` in prose, no hyphenation in mono | v4.1 §1 verbatim — prose breathes, instruments do not break words |
| Letter-spaced true caps | `.caps`: mono, 0.14em tracking, uppercase; Fraunces is never set in caps | v4.1 §1 verbatim |
| Easing inventory | arrivals expo.out (v4 §3); FLIP + plumb-line expo.inOut (v4 §4, v4.1 §3.5); snap-settles cubic ease-out; the Pulse power1.inOut; stamp power2.out over 200ms (v4 §4) | every curve either quoted from spec or chosen as the quietest deceleration for a settling instrument |
| Rulebook typographic characters | Astro's markdown smartpants renders the METHODOLOGY with curly quotes and real dashes; CSV strings pass through `curl()` | v4.1 §1: a straight quote in the built output is a defect, whatever the source format |
| Descent SURFACE stratum | carries the caption only — the figure itself lives in the fixed header from the moment of the FLIP | the number is not repeated below itself; the surface of a borehole is the rim, not a second monument |
| `→ return to the surface` on file pages | the 404's specified exit line reused as the files' way home | one phrase for one action, wherever the reader stands below the surface |
| Sweep results | built output: 0 lorem/TODO/TBD/placeholder; 0 `console.log` in bundles; 0 straight double quotes in rendered copy; color and family inventories as above | recorded pre-proof so Phase 6 verifies a state already known clean |

**Status: every element shipped in Edition II now carries a derivation. Nothing was found underived; nothing required cutting. The ledger is complete for Phase 6.**

## TRUE COUNT · P1 — the mass rendering core (v7.1 §1, v7-CONSOLIDATED)

| element | decision | derivation (one line) |
|---|---|---|
| §0.1 / C-01 cuts | executed as verified absence — no particle, dust, lamp, pointer-light, dolly, Rive, or world-dressing system has ever existed in this repo (grep evidence in session; all hits were substrings of arrive/clamp/derived) | the VOID list is absolute; absence proven is absence enforced |
| three r185 (spec says r17x) | current npm release of the same WebGPURenderer API family | UX: the maintained renderer is the one that keeps falling back correctly / aesthetic: identical image; implementation adaptation, never the image (v7.1 addendum) |
| Renderer baseline | one `WebGPURenderer`, `await init()`, automatic WebGL2 fallback, backend logged once: `RENDERER: WEBGPU · TIER A · BILLS IN LAW: 1,011,000,000` | v7-CONSOLIDATED verbatim; the console line carries the count so even devtools shows the law |
| The money math (count.ts) | bills = C-0013 ÷ 100 asserted === 1,011,000,000; stacks/blocks/pallets at 100/10,000/1,000,000 bills; K3's 2,069,218,711 and the 32 bills/sec live rate asserted now as law | a wrong count is a build failure (v7.1 §1.1); audacity: true count |
| Bill dimensions 156.1 × 66.3 × 0.1092 mm | BEP-published $100 bill dimensions | data governs proportion (§0.2) — the unit of the whole image is the real object |
| Pallet brick = $100,000,000 | 1.0 × 1.2 m footprint (standard pallet), height 0.942 m = the bills' computed volume ÷ footprint | UX: a countable unit the eye can hold / aesthetic: warehouse bricks, not casino stacks; nothing about the size is styled |
| K2 lattice 26 × 13 × 3, exactly 1,011 filled | the final row runs out three short of the 1,014-slot lattice | the incompleteness is the count made visible — a full box would be a lie of three hundred million dollars |
| K1 authored keyframe | camera (0.13, 0.26, 0.46) looking at origin, bill yawed −0.28; key light hard from the left at 4.2, near-zero fill | §1.3 verbatim: one bill, flat, alone, lit hard from one side, on black — recorded as "authored" |
| K2 authored keyframe | camera (−24, 7.5, 30), mass centered, one hard examination key from above-left, faint rim, void below | §1.3 verbatim: the admitted mass at full scale, hanging in the void, lit like evidence — "authored" |
| Bone-on-ground monochrome bills | MeshStandardMaterial bone, roughness .86–.9, no green | v7.1 §1.2 verbatim: this is a ledger, not a casino |
| Worn-edge bump map | procedural 256² canvas, noise concentrated at the rim, deterministic seed 1011 | §1.1's worn edges without a texture download; the seed is the pallet count — even the noise is counted |
| `?mass=k1|k2` harness param | P1's keyframes render on the live deployment behind a query param; no visible surface change without it | the phase gate demands the live URL serve the phase's work before the pullback (P2) gives the mass its journey |
| `&gl=1` force-WebGL hook | `forceWebGL: true` for Tier B testing | [PF]-02 needs tier evidence; a ladder you cannot stand on each rung of is scenery |
| Dynamic import only | the 209 KB gz scene chunk is referenced by no HTML; reduced-motion never triggers the import | [PF]-01 verbatim: Tier C never even fetches GL |
| Caption overlay in harness | DOM text (monument caption voice), never canvas text | TY-06: captions and prose stay real DOM text always |
| Static keyframes render-on-demand | an 8-frame settle burst, then the loop parks; keyframe changes and resizes re-arm it; P2's scrub will own the live loop | a photograph is not a film — a budget phone pays for every idle frame, so idle frames no longer exist (owner device report: Samsung S21 FE) |
| First real-device tier evidence ([PF]-02) | Samsung S21 FE (6 GB): Tier B renders K1/K2 correctly; initial open "a bit slow" — dominated by the one-time 209 KB gz module fetch + shader compile in the bare harness | recorded toward §4.1's mid-Android floor; P2's deferred-boot law (type first, scene fades in ≤1.2 s later) exists precisely to hide this cost |
