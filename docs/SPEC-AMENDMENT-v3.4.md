# THE BLACK LEDGER — SPEC AMENDMENT v3.4 · FINAL PASS: VOICE & SURGERY
## Applies on top of v3–v3.3. Where they conflict, v3.4 wins.

**Two jobs.** First, a voice purge governed by one new rule. Second, the surgical fixes from the end-to-end audit. Everything here is a deletion, a replacement, or a small addition — no redesign, no new concepts.

---

# PART ONE — THE VOICE RULE

**New binding rule (amends v3 §4):** *The document never addresses its own reading experience.* It does not tell the reader how to read it, how long it takes, which part matters most, what a chapter established, or that it is about to speak plainly. Plainness is achieved by writing plainly, never by announcing it. Navigation is an index, not advice.

## 1.1 DELETIONS (remove entirely, sitewide)
- The sentence `Ten minutes reads the whole document. Chapter 02 is the heart of it.`
- Every chapter closer line beginning `— What this chapter established:` (all four).
- The line `— In plain words: This is the case file's cover — what we're auditing, how big it is, and when the file opened.`
- The label prefix `In plain words: ` from EVERY annotation sitewide. The sentence that followed the label stays (except where Part One or Two replaces it below), now as an ordinary unlabeled first annotation line. Amends v3.1 §1: the required first annotation under every table, ledger block, meter, and large figure is simply *a plain-English sentence, ≤26 words, no jargon* — with no label.

## 1.2 "HOW TO READ THIS" → "CONTENTS" (replace the section wholesale, verbatim)
The mono label becomes `— Contents`. The six lines become a flat index (chapter link, then em-dash, then descriptor — Newsreader, body size). No sentence follows the list.

> **01 — The Meter** — the acknowledged budget, per second and per day.
> **02 — The Reconciliation** — total spending, minus traceable spending; what remains.
> **03 — Subjects** — six files: the totals, the leak, one estimate, the audits, a misused number, the unreported line.
> **04 — Your Share** — the acknowledged budget, per household.
> **05 — The Record** — every figure, its source, its confidence grade.

## 1.3 REWRITTEN ANNOTATION LINES (instructional plain-lines replaced, verbatim)
- Your Share formula, first annotation: `— About $754 for every household that files a federal return.` (replaces the "Divide the admitted secret budget…" line)
- Reconciliation, first ledger block: the plain sentence moves from under row 1 to directly under the block heading and becomes: `— Everything paid out, minus everything traceable. What remains is the space the tracking cannot see.`
- Meter 3: delete the line `— The denominator of this audit`; its plain first line becomes: `— Everything the whole government has paid out so far this budget year.`

# PART TWO — SURGERY (from the end-to-end audit)

## 2.1 COVER
- **Delete the entire "What this is" section** (label and both paragraphs). Its two non-duplicate facts move into the Subject block as annotations, appended after the existing ones, verbatim:
```
— Disclosure of the first figure is required by 50 U.S.C. §3306; the second is volunteered.
— The department responsible for most of it has failed eight consecutive audits — the only major agency never to pass one.
```
- **Counter annotations reduce to exactly four**, verbatim:
```
— About $3,206 of acknowledged classified spending accrues every second.
— Computation: $101.1 bn ÷ 31,536,000 sec / year
— NIP: $73.3 bn (C-0011) · MIP: $27.8 bn (C-0012)
— Source: ODNI PR 39-25 · DoD MIP release · FY2025
```
- **Delete both inline cross-links** `→ See Chapter 01 — The Meter` and `→ See Chapter 02 — The Reconciliation` (the nav and foot link already cover them). The line `Full registry of sources → Chapter 05` stays.
- Final cover order: opening passage → registry strip → Contents (1.2) → epigraph → counter → subject block (with its two new annotations) → sources link line → colophon.

## 2.2 METER
- Meter 1 currently duplicates the cover counter verbatim. It keeps the FULL six-line annotation set; the cover keeps only the four in 2.1. Meter 1's first line becomes: `— The acknowledged secret budget, accruing in real time since you opened this page.`

## 2.3 SUBJECTS & DOSSIERS
- The index's next-link label `↓ CHAPTER 03 — THE NATIONAL INTELLIGENCE PROGRAM` becomes `↓ FILE 03/01 — THE NATIONAL INTELLIGENCE PROGRAM`. Dossier-to-dossier next/prev labels use FILE numbering likewise.
- Every dossier table header cell reading `Tier` becomes `Confidence`, with cell values spelled out as in the Record (`2 — Authenticated leak`, etc.). One vocabulary sitewide.
- Fix the `— Registry entries` list so each entry renders as one line (`— The Army's $6.5 trillion bookkeeping problem`), never a dangling `—` on its own line.

## 2.4 YOUR SHARE — remove the leaked build note, register the claim
- Add row **C-0028** to `data/claims.csv`: metric `household_count`, display_name `U.S. households filing federal returns`, fiscal_year 2025, amount 134000000, tier 1, method disclosed, source S-21, public_note `The approximate number of U.S. households filing federal income tax returns, from IRS Statistics of Income.` 
- Add source **S-21** to `data/sources.csv`: name `IRS Statistics of Income — filing statistics`, url `https://www.irs.gov/statistics/soi-tax-stats`, tier_ceiling 1.
- The formula's second annotation becomes, verbatim: `— Ledger: C-0013 · households: C-0028 (approximate)` — the sentence about "to be registered as a Tier 1 claim at build" is deleted and must never render.

## 2.5 THE RECORD
- **Collapsed notes, actually built this time:** each of the 28 claims renders as one `<details>` element — the row is the `<summary>`; the note and annotations are the collapsed content. Markup-level tripwire below.
- **Glossary entries and anchors:** add the v3.1 §7 entries verbatim (Outlays · Obligations · Appropriated · Requested · Topline · Disclaimer of opinion · Fiscal year) to 05.3, each with a stable anchor id (`#gloss-outlays`, `#gloss-obligations`, etc.), and point every glossary link sitewide at the correct anchor. No link may point at a nonexistent anchor.
- The 05.1 intro annotation keeps its two lines with the `In plain words:` label stripped per 1.1.

## 2.6 THE CLOCK
`— You are reading:` must never appear without a value. Render the entire line via JavaScript (insert the line only once the time exists); the static HTML contains no dangling version. If JavaScript is unavailable, the line simply does not exist.

# PART THREE — TRIPWIRES (run against the LIVE deployed site)

25. Sitewide grep for `In plain words`, `What this chapter established`, `Ten minutes reads`, `How to read this`, `to be registered as a Tier 1 claim`, `The denominator of this audit` → zero matches.
26. The cover does not contain `What this is`, `→ See Chapter`, or a counter with more than four annotation lines.
27. `grep -c '<details'` on the built Record page = 28.
28. Every glossary link resolves to an existing anchor id on 05.3 (verify programmatically).
29. The served HTML of the cover contains no `You are reading` string outside a script tag.
30. The Contents section matches §1.2 verbatim; the string `Tier` does not appear as a table header on any dossier page.

---

# PART FOUR — PROMPT FOR CLAUDE CODE — paste everything below this line
# (Before pasting: put SPEC-AMENDMENT-v3.4.md in the blackledger repo folder.)

You are executing the final pass on THE BLACK LEDGER. The file `SPEC-AMENDMENT-v3.4.md` in this directory is the binding change order; all prior specs in `docs/` remain in force where it is silent. I am not a coder — report in plain language, never ask me to write or edit code.

GIT & DEPLOY RULES — absolute, entire session: one branch only (the default); never create a branch; never open a pull request; every commit is performed by a Haiku subagent (stage, message, commit, push); every phase that changes the site ends with a successful DEPLOY of the Worker, and the phase is not done until the deploy succeeds.

PHASE 0 — Move `SPEC-AMENDMENT-v3.4.md` into `docs/`. → Haiku commit+push.
PHASE 1 — VOICE PURGE: execute Part One completely — the deletions in 1.1, the Contents replacement in 1.2 verbatim, the rewritten lines in 1.3 verbatim, and the sitewide removal of the `In plain words: ` label while keeping the sentences. → Haiku commit+push, deploy.
PHASE 2 — SURGERY: execute Part Two completely — cover (2.1, exact final order), meter (2.2), subjects and dossiers (2.3), Your Share with the new C-0028 claim and S-21 source (2.4), the Record's real collapsed notes and glossary anchors (2.5), the clock (2.6). → Haiku commit+push, deploy.
PHASE 3 — PROOF: run tripwires 25–30 against the LIVE site (fetch the deployed pages yourself), plus re-run the prior greps for internal language. For every tripwire, paste the actual command or fetched evidence into `docs/TRIPWIRE-REPORT.md` — a checkmark without evidence does not count. Fix and re-deploy until every check passes on the live URL. → Haiku commit+push, final deploy. Message: `release: edition I — final pass`.

When finished, tell me in plain language: (1) every sentence you deleted in the voice purge, (2) what the cover now reads top to bottom, (3) the live-site evidence that tripwires 25–30 passed.
