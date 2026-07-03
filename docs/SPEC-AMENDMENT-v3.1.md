# THE BLACK LEDGER — SPEC AMENDMENT v3.1 · THE PLAIN LAYER
## Applies on top of BLACK-LEDGER-BUILD-SPEC-v3.md. Where they conflict, v3.1 wins. All other v3 rules (tokens, forbidden list, tripwires, annotation grammar) remain in force.

**Problem this amendment fixes:** the live site ships internal build language as public copy (raw metric keys, notes addressed to the build agent, the internal methodology rendered verbatim), and tables appear before any plain-language setup. This amendment adds a plain layer without changing the design system.

---

# §1. NEW ANNOTATION TYPE — "In plain words"

A new sanctioned line in the §3 annotation grammar:

```
— In plain words: {one sentence, no jargon, ≤ 26 words}
```

Rules:
- REQUIRED as the FIRST annotation line under: every table, every ledger block, every large figure, every meter.
- Written for a reader with no budget knowledge. Test: would a high-schooler understand it cold?
- Never contains a claim ID, statute number, or acronym unless the acronym was defined in that same chapter.

# §2. CHAPTER ON-RAMPS (verbatim; insert as the first body text of each chapter, before any figure or table)

**01 — THE METER:**
> This chapter turns the classified budget into time. The government publishes one yearly total for secret spending; divided into seconds and days, that total becomes something you can watch move.

**02 — THE RECONCILIATION:**
> This chapter does one piece of arithmetic that no other website does. The Treasury publishes how much the government actually paid out last year. A second government website tracks where that money went. Subtract the second number from the first, and you get everything the tracking can't see. The secret budget lives inside that difference. Here is the subtraction, line by line.

**03 — SUBJECTS (index page):**
> Six case files. Each one takes a single number from the ledger — a disclosed budget, a leaked document, a failed audit — and explains where it came from, what it covers, and how much confidence it deserves.

**04 — YOUR SHARE:**
> One division problem. The acknowledged secret budget, split across every American household that files a tax return.

**05 — THE RECORD:**
> This is the raw material. Every number used anywhere on this site is a row in the table below, with its source, its date, and an honesty grade from 1 (published by the government itself) to 5 (someone's unverified claim). If a figure isn't in this table, it isn't on this site.

# §3. CHAPTER CLOSERS (verbatim; the last body line of chapters 01–04, before the next-chapter link)

- 01: `— What this chapter established: the acknowledged secret budget spends about $3,206 every second.`
- 02: `— What this chapter established: the money the government cannot or does not account for publicly is larger than the money it admits is secret.`
- 03: `— What this chapter established: below two published totals, everything known comes from one leak, a handful of released records, and labeled estimates.`
- 04: `— What this chapter established: the acknowledged secret budget costs your household about $754 this year.`

# §4. CLAIMS TABLE — PUBLIC NAMES AND PUBLIC NOTES

Add two columns to `data/claims.csv`: `display_name` and `public_note`. The Record table (05.1) and every `— Ledger:` reference now render `display_name`; `public_note` renders as the row's note. The original `notes` column becomes internal-only (kept in the CSV, never rendered). The values, verbatim:

| ID | display_name | public_note |
|---|---|---|
| C-0001 | Total federal spending, FY2025 | Everything the U.S. government actually paid out in fiscal year 2025, from the Treasury's own monthly statement. Every other number on this site is measured against this one. |
| C-0002 | Total federal spending, FY2024 | The prior year's total, for comparison. |
| C-0003 | Total federal spending, FY2023 | Two years prior, for comparison. |
| C-0004 | Federal spending so far this year | Paid out between October 2025 and May 2026 — the current fiscal year in progress. |
| C-0005 | Spending traceable as awards, FY2025 | Everything the government's tracking site can show as contracts, grants, loans, and direct payments. This is the visible part. |
| C-0006 | Spending traceable as awards, FY2024 | The prior year's traceable total. |
| C-0007 | Spending traceable as awards, FY2023 | Two years prior. |
| C-0008 | The tracking site's gross total, FY2025 | Larger than total spending because it counts commitments (not just payments) and money moving between government accounts. Explained in the methodology. |
| C-0009 | Money agencies didn't report, FY2025 | The tracking site keeps a line called "Unreported Data" — money agencies never told it about. Secret programs are part of this line, but not all of it. |
| C-0010 | Money agencies didn't report, FY2024 | The prior year's unreported line. It grew by $42.5 billion — about 26% — in one year. |
| C-0011 | The civilian intelligence budget, FY2025 | The National Intelligence Program: CIA, NSA, and the rest. The law requires this one number to be published each year. Nothing beneath it is disclosed. |
| C-0012 | The military intelligence budget, FY2025 | The Military Intelligence Program. The Pentagon has published this total voluntarily every year since 2007. |
| C-0013 | The acknowledged secret budget, FY2025 | The two disclosed intelligence totals added together. This is everything the government officially admits spending on classified work. |
| C-0014 | Civilian intelligence request, FY2026 | What was asked for next year — $8.5 billion more than the year before. |
| C-0015 | Military intelligence request, FY2026 | Next year's military request. Combined, the FY2026 ask is $115.5 billion — the largest ever disclosed. |
| C-0016 | Assets the Pentagon reports, FY2025 | What the Defense Department says it owns. Its auditors could not verify the books behind this figure. |
| C-0017 | The Pentagon's audit result, FY2025 | Failed, for the eighth year in a row. Auditors found 26 serious accounting problems and could not give an opinion on the books at all. It is the only major federal agency never to pass an audit. |
| C-0018 | The leaked intelligence budget, 2013 | In 2013, a leaked internal document showed — for the first and only time — how the intelligence budget divides between agencies. |
| C-0019 | CIA's budget, 2013 (leaked) | The CIA's share: about 28% of the intelligence budget, the largest of any agency. |
| C-0020 | NSA's budget, 2013 (leaked) | The NSA's share: about 21%. |
| C-0021 | NRO's budget, 2013 (leaked) | The National Reconnaissance Office — the spy-satellite agency: about 20%. |
| C-0022 | NGA's budget, 2013 (leaked) | The mapping and satellite-imagery agency's share. |
| C-0023 | DIA's budget, 2013 (leaked) | The Defense Intelligence Agency's share. |
| C-0024 | Estimated CIA budget today | An estimate, clearly labeled as one: if the CIA still holds roughly its 2013 share, its budget today falls between $18 and $24 billion. Twelve years of unknown change is why this is a range, not a number. |
| C-0025 | The Army's $6.5 trillion bookkeeping problem | In 2015, Pentagon inspectors found $6.5 trillion in accounting entries the Army could not support. This is the same dollars re-entered over and over — proof the books can't be audited, not money that vanished. It is never added to anything on this site. |
| C-0026 | The unexplained difference, FY2025 | Total spending minus traceable spending: $1.7 trillion the tracking can't show. Most of it has ordinary explanations — debt interest, salaries — and this site's job is to account for those before saying anything about the rest. |
| C-0027 | Intelligence's share of defense spending | For nearly twenty years, intelligence has held steady at about 11% of defense spending. This ratio is used only to check whether estimates are plausible. |

Fixes bundled: C-0006/C-0007 no longer render "No note registered"; every internal directive ("FLAGSHIP CLAIM", "Never sum with T1", "the build must decompose") disappears from public view but stays in the internal column.

# §5. THE RECORD TABLE (05.1) — presentation change

- Column order: display name · plain amount · year · confidence · source.
- "Tier" column header becomes **"Confidence"**; cell values render as `1 — Official` / `2 — Authenticated leak` / `3 — Released record` / `4 — Estimate` / `5 — Unverified`.
- Directly under the 05.1 heading, verbatim:
```
— In plain words: every number on this site, in one table — what it is, how big, and how much you should trust it.
— Confidence runs 1 (the government published it) to 5 (someone claimed it). Estimates are never added to official figures.
```

# §6. METHODOLOGY (05.2) — public preface, internal text demoted

Insert before the current methodology text this verbatim preface, under the heading `05.2 — How this site works.`:

> This site measures two gaps. The first: the difference between what the Treasury says the government spent and what the government's own tracking site can show — a difference of $1.7 trillion this year, most of it ordinary and explainable, some of it not. The second: what is known about the inside of the secret budget, beneath the two totals the government publishes.
>
> Every number carries a confidence grade from 1 to 5. Grade 1 means the government published it. Grade 4 means we estimated it, and every estimate is shown as a range with its assumptions printed beside it. Estimates are never mixed into official figures — anywhere, ever.
>
> Two famous claims are handled with care here. The Pentagon really has failed eight audits in a row; that is grade 1, published by its own inspectors. But the "$21 trillion missing" claim circulating online refers to accounting entries booked repeatedly in both directions — proof the books are a mess, not proof the money vanished. This site says the first thing loudly and refuses to say the second, because the difference is what makes the rest of this document trustworthy.
>
> The full technical rulebook follows, unchanged, for readers who want it.

The existing methodology text renders after it under the sub-heading `The technical rulebook.` — and its markdown title line (`# BLACK LEDGER — Methodology`) must be stripped, with references to "the engine" and "the build" replaced by "this site."

# §7. GLOSSARY AT POINT OF USE

First use of each term below, per chapter, renders as an underlined link to its 05.3 glossary entry: outlays · obligations · appropriated · requested · topline · disclaimer of opinion · fiscal year. Add to the glossary (verbatim):

> **Outlays** — money actually paid out. **Obligations** — money legally committed, which may be paid over several years. **Appropriated** — the amount Congress actually approved. **Requested** — the amount an agency asked for. **Topline** — a single total with no breakdown beneath it. **Fiscal year** — the government's accounting year, October through September; FY2025 ended 30 Sep 2025.

# §8. TRIPWIRES ADDED (run with the v3 set)

11. Every table and large figure has an `— In plain words:` line as its first annotation.
12. Grep the built site for: `mts_total_outlays`, `gap_a_residual`, `FLAGSHIP`, `THE DENOMINATOR`, `Never sum`, `the build must`, `No note registered` — all must return zero matches in rendered pages.
13. Every chapter 01–04 opens with its §2 on-ramp and closes with its §3 line, verbatim.
14. The word "Tier" does not appear in the 05.1 table header (it is "Confidence").

---

# §9. PROMPT FOR CLAUDE CODE (paste as-is)

You are amending THE BLACK LEDGER, already built and pushed. The file `docs/SPEC-AMENDMENT-v3.1.md` in this repo is the binding change order; `docs/BLACK-LEDGER-BUILD-SPEC-v3.md` remains in force everywhere the amendment is silent. Same git rules as before, for the whole session: everything commits and pushes directly to the default branch, no branches, no PRs, and every commit is performed by a Haiku subagent that stages, writes the message, commits, and pushes; a phase is not done until the push succeeds.

PHASE A — DATA: Add `display_name` and `public_note` columns to `data/claims.csv` with the exact values from amendment §4. Keep the existing `notes` column; it must never render publicly again. → Haiku commit+push.
PHASE B — COPY: Insert the §2 chapter on-ramps and §3 closers verbatim. Add the `— In plain words:` first-annotation line to every table, ledger block, meter, and large figure per §1 (write the missing plain-words lines yourself ONLY where the amendment doesn't supply one, obeying its ≤26-word no-jargon rule). → Haiku commit+push.
PHASE C — THE RECORD: Rebuild 05.1 per §5 (display names, Confidence column, verbatim intro lines). Insert the §6 methodology preface and demote the technical text as specified. Apply §7 glossary links and new glossary entries. → Haiku commit+push.
PHASE D — AUDIT: Run v3 tripwires 1–10 plus amendment tripwires 11–14. Fix until clean, update `docs/TRIPWIRE-REPORT.md`. → Haiku commit+push: `release: edition I.1 — plain layer`.

When done, tell me in plain language what changed on each chapter.
