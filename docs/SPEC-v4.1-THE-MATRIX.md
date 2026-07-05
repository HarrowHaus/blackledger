# THE BLACK LEDGER — SPEC v4.1 · THE MATRIX
## Co-binding addendum to SPEC-v4-THE-SOUNDING.md. Where v4 is silent, v4.1 speaks. Where they conflict, v4.1 wins.

# §0 — CORRECTION OF METHOD

The phrase "baseline vocabulary plus one signature invention" in prior discussion was an inference from a third-party analysis, not a judging rule. It is retired. The actual stated evaluation system (Awwwards, official): **Design 40 · Usability 30 · Creativity 20 · Content 10**, scored 1–10 by ≥18 jurors, outliers dropped; HM ≥6.5; SOTD ≈8+; a separate Developer Award judged against Developer Guidelines (≥7); a Mobile Excellence award judged on Google's mobile criteria (≥70/100).

**The governing rule of Edition II is therefore: NO UNAUTHORED ELEMENT.** Every element at every scale — a focus ring, a selection color, a 404 page, an easing curve — must derive from the concept (depth as proof; a sounding of a sealed budget) and must be able to state that derivation in one line. The Descent remains the largest organ, but it is one organ among a hundred deliberate ones. Anything that cannot state its derivation is redesigned or removed.

**The ritual that enforces it:** before final proof, the builder produces `docs/DESIGN-DECISIONS.md` — the Micro-Choice Ledger — listing every element with its one-line derivation.

---

# §1 — DESIGN (40%): THE MICRO-CHOICE INVENTORY

**Typography micro-law (all mandatory):**
- Numbers: tabular lining figures always (`font-variant-numeric: tabular-nums lining-nums`); prose: proportional oldstyle (`oldstyle-nums`) — data stands at attention, prose sits. This contrast is the type system's thesis.
- Hanging punctuation on pulled numbers ($ and % hang outside the measure via negative text-indent technique).
- Fraunces WONK axis: used at exactly ONE place — the "K" of the wordmark BLACK (WONK 1). A single controlled quirk; nowhere else.
- Measures: CONTEXT prose ≤ 34ch mobile / 58ch desktop; METHOD mono lines ≤ 46ch; no hyphenation in mono, `hyphens: auto` with `-webkit-hyphenate-limit-lines: 2` in prose.
- Real typographic characters everywhere: ’ “ ” — · × ÷ ≈. A straight quote in the built output is a defect.
- Letter-spaced true caps for mono labels (0.14em); never uppercase Fraunces.
- Leading tracks optical size: display 0.95, context 1.6, mono data 1.5.

**Color & state micro-law:**
- The 5 tokens stand. Interaction states never invent colors: hover = underline (1px, `--bone`, offset 3px); press = underline + translateY(1px); focus-visible = 1px `--ember` outline offset 2px (never the default blue ring); disabled does not exist (nothing on this site is disabled).
- `::selection` = `--ember` background, `--ground` text — highlighting a fact stamps it.
- `-webkit-tap-highlight-color: transparent`; `accent-color: var(--ember)`.
- Scrollbar: styled thin, `--hairline` track; the thumb turns `--ember` ONLY inside a Descent (the borehole has a lining).
- `<meta name="theme-color" content="#141210">`; favicon = the plumb-bob mark, `--bone` on `--ground` (SVG favicon + fallback).

**Surface & depth micro-law:**
- Strata backgrounds: SURFACE `#141210` → CONTEXT `#131110` → METHOD `#12100E` → RECORD `#17140F` (bedrock is 4% warmer-lighter: you can feel bottom). Verify these read as intentional on OLED and LCD.
- Grain shader (v4 §6 budget rule stands); grain amplitude increases 15% with each stratum — deeper is grittier.
- Safe areas: `env(safe-area-inset-*)` respected; monuments use `100svh`; the gauge never collides with iOS home indicator.

# §2 — USABILITY (30%)

- Orientation is never lost: wordmark = home, `RECORD` persistent top-right, depth gauge in descents, monument rail on the Face, three exits from any Descent (× ASCEND, scroll-past, browser Back).
- Entry: no preloader theater. First paint ≤ 400ms of ink-settle (opacity 0→1 on the ground + wordmark); if fonts aren't ready, system fallback metrics are size-adjusted (`size-adjust`) so nothing shifts.
- Hit targets ≥ 44×44. Contrast: verify `--bone-dim` on `--ground` ≥ 4.5:1 (adjust the dim token up if measurement fails, and record the adjustment in the Decision Ledger).
- **The 404 page is a designed artifact**, verbatim copy: heading `Unrecorded.` body `This page does not exist. Unlike $206.9 billion last year, we can say so with confidence.` link `→ return to the surface`. Mono, one mark (broken sounding line).
- **Print stylesheet for `/record`** — an audit should print. One-color, `--ground` becomes white, bone becomes ink-black, marks render, URL footnotes expand after links, page numbers real. This is rare, cheap, and perfectly in-concept.
- Motion respect: no parallax translation > 24px on mobile; `prefers-reduced-motion` parity per v4; Lenis disabled entirely under reduced motion.
- Performance budgets of v4 §6 stand and are usability scoring, not just dev scoring.

# §3 — CREATIVITY (20%): THE INVENTION SET (plural, by rule)

1. **The Descent** (v4 §4) — the spine.
2. **The Pulse** — the site has a heartbeat: once per second (one $3,206 increment), the ember tick in the rail/gauge beats (scale 1→1.15→1, 300ms). Everywhere, always, subtle. The budget never stops; neither does the site.
3. **Citation on copy** — selecting and copying any monument figure copies it WITH its provenance: `$206,921,871,135 — The Black Ledger, claim C-0009, source: USAspending FY2025` (clipboard API, graceful no-op if denied). A site about verification makes itself citable.
4. **Below the record** — one extra scroll past bedrock in any Descent reveals the raw provenance JSON fragment for that claim, mono 0.6875rem, dim. Bedrock under bedrock; the dev jury's easter egg is our actual data.
5. **The plumb-line transition** — navigating Face → `/record`: a 1px ember line drops the full viewport height (450ms, `expo.inOut`), then the page follows. The site's one page transition; used nowhere else.
6. **The blurred-tab title** — when the tab loses focus, `document.title` becomes `Still counting — THE BLACK LEDGER`; on return, the live figure since arrival is announced in the counter caption (`+$412,368 while you were away`, computed, tabular). Absence is the subject; the site notices yours.
7. **OG cards per monument** — build-time generated, the number at monument scale + confidence stamp + thesis line; every share is a poster.
All seven derive from one concept. Nothing else qualifies as invention without a Decision-Ledger derivation.

# §4 — CONTENT (10%)

- Zero placeholder text anywhere, ever (tripwire greps lorem/tk/TODO).
- All v4/v3.4 voice law stands; all copy in v4 is canon; Files prose is authored to the same law.
# §5 — DEVELOPER AWARD & MOBILE EXCELLENCE (separate juries, cheap points)

- Semantic HTML throughout (`main/section/figure/figcaption` for monuments; headings hierarchical; landmarks labeled). Valid per W3C validator — tripwire.
- ZERO console errors or warnings on any page — tripwire.
- No render-blocking third-party requests; fonts preloaded; everything same-origin.
- `manifest.webmanifest` + icons (installable is fine; no push, no service-worker complexity beyond static cache if trivial).
- Mobile Excellence: budgets already exceed the ≥70 bar; verify with Lighthouse mobile on `/` and one Descent, screenshots in the report.

# §6 — AMENDED RITUAL & TRIPWIRES (add to v4 §10)

New Phase 5.7 — THE LEDGER OF DECISIONS: produce `docs/DESIGN-DECISIONS.md` listing every element (every token, state, transition, page, mark, easter egg) with its one-line derivation from the concept. Elements without derivations are fixed or cut before Phase 6.

Added tripwires: (j) grep built output for lorem|TODO|TBD|placeholder → zero; (k) straight quotes `"` in rendered copy → zero; (l) W3C-valid HTML, zero console errors, evidence pasted; (m) copy-citation works (paste result shown in report); (n) 404 and print stylesheet screenshots in report; (o) contrast measurements for all token pairs pasted; (p) the Pulse visible in a screen recording or described frame-by-frame; (q) `docs/DESIGN-DECISIONS.md` exists and is complete.

---
# §7 — PROMPT ADDENDUM FOR CLAUDE CODE — paste below the v4 prompt, same message
Additionally: `SPEC-v4.1-THE-MATRIX.md` in this directory is co-binding with the v4 spec — move it to `docs/` in Phase 0 alongside it. Execute v4's phases with v4.1's inventory integrated throughout (not as an afterthought pass): the micro-law of §1–§2 applies from the first component; the seven inventions of §3 are built in their natural phases; Phase 5.7 (the Decision Ledger) runs before Phase 6, and Phase 6 includes v4.1's added tripwires (j)–(q) with pasted evidence. The rule above all rules: no unauthored element — if you add anything the specs don't define, it must appear in the Decision Ledger with its derivation, or it must not exist.
