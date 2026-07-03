# THE BLACK LEDGER — SPEC AMENDMENT v3.2 · THE OPENING
## Applies on top of v3 and v3.1. Where they conflict, v3.2 wins. All other rules remain in force.

**Problem this fixes:** the cover opens with the case registry strip — metadata before meaning. A first-time reader needs narrative first: what this is, why it exists, how to read it. The case file begins after the reader has been welcomed into it.

**Voice rule change:** the v3 §4 rule limiting second person is amended — second person is now also permitted in the cover's opening passage (§1 below) and nowhere else new.

---

# §1. THE COVER OPENING (verbatim; becomes the FIRST content on `/`, above the registry strip)

Set in Newsreader, body size, 720px column. A small mono label above it: `— Before the file opens`.

> Every year, the United States government publishes two numbers about its secret spending and asks you to be satisfied.
>
> The first is the cost of its civilian intelligence agencies — the CIA, the NSA, and fifteen others. The second is the cost of military intelligence. For fiscal year 2025 the two add up to $101.1 billion, which works out to about $3,206 every second, including this one. What the money does, which programs it funds, whether any of it works — none of that is published, and by law none of it has to be.
>
> This is not a scandal. It is a system, now in its eighth decade, functioning mostly as designed. But the Constitution that created this government contains a sentence, written in 1787, requiring that "a regular Statement and Account" of all public money "shall be published from time to time." This website takes that sentence literally.
>
> What follows is an audit, assembled from the government's own publications, one authenticated leaked document, records pried loose under the Freedom of Information Act, and estimates that are always labeled as estimates. It is arranged as a case file, because that is what it is. Every number on every page can be traced to its source. Start anywhere.

Then the registry strip (unchanged), then §2, then the rest of the cover as currently built.

# §2. HOW TO READ THIS (verbatim; new section on the cover, directly after the registry strip)

Mono label: `— How to read this`. Six lines, each the chapter link followed by a plain sentence (Newsreader, body size):

> **01 — The Meter.** The secret budget as a clock: what it spends per second, per day, and where those rates come from.
> **02 — The Reconciliation.** One subtraction no other website performs: total spending, minus everything traceable, equals the space the secret budget lives in.
> **03 — Subjects.** Six case files — the published totals, the one great leak, one careful estimate, the failed audits, a famous number that gets misused, and the government's own "unreported" line.
> **04 — Your Share.** One division problem: what the acknowledged secret budget costs your household this year.
> **05 — The Record.** Every number on this site in one table, each with a source, a date, and an honesty grade.
>
> Ten minutes reads the whole document. Chapter 02 is the heart of it.

# §3. EXPANDED NARRATIVE LEADS (verbatim; these REPLACE the v3.1 on-ramps for chapters 02 and 03 only — all other on-ramps and all closers stay)

**02 — THE RECONCILIATION (replaces its v3.1 on-ramp):**
> Here is a strange fact about American transparency: the government runs two websites that do not talk to each other. The Treasury publishes, every month, exactly how much money went out the door — to the dollar. A second site, USAspending.gov, exists to show where that money went. But nobody subtracts one from the other and publishes the difference. This chapter does. The difference is $1.7 trillion, and most of it has boring explanations — interest on the debt, salaries, the machinery of government. The point of doing the arithmetic in public is to account for the boring parts honestly, so that what remains — including the secret budget, and a line the government itself labels "Unreported Data" — can be seen at its true size, inside ordinary math rather than floating in rumor.

**03 — SUBJECTS (replaces its v3.1 on-ramp on the index page):**
> Everything publicly known about the inside of the secret budget comes from a remarkably short list: two totals the government publishes, one internal document that leaked in 2013 and was never disputed, a scattering of records released under public-records law, the Pentagon's own audit failures, and estimates built carefully on top of all of it. That is the whole list. These six files walk through it item by item — what each source is, what it shows, and exactly how much weight it can bear.

# §4. TRIPWIRES ADDED

15. The first rendered element on `/` after the running head is the §1 opening passage — the registry strip appears only after it.
16. The §2 chapter guide appears on the cover, verbatim, after the registry strip.
17. Chapters 02 and 03 open with their §3 leads verbatim; chapters 01, 04, 05 retain their v3.1 on-ramps verbatim.
18. Second person appears on the cover opening, the counter line, and Chapter 04 — nowhere else.

---

# §5. PROMPT FOR CLAUDE CODE — paste everything below this line
# (Before pasting: put SPEC-AMENDMENT-v3.2.md in the blackledger repo folder.)

You are amending THE BLACK LEDGER again. The file `SPEC-AMENDMENT-v3.2.md` in this directory is the binding change order; v3 and v3.1 remain in force everywhere it is silent. I am not a coder — report in plain language, never ask me to write or edit code.

GIT RULES — same as always, absolute, entire session: everything commits and pushes directly to the default branch, never a branch, never a pull request, and every commit is performed by a Haiku subagent (stage, message, commit, push). A phase is not done until the push succeeds.

PHASE 0 — Move `SPEC-AMENDMENT-v3.2.md` into `docs/`. → Haiku commit+push: `docs: register spec amendment v3.2 — the opening`.
PHASE 1 — Cover: insert the §1 opening passage verbatim as the first content above the registry strip, with its mono label. Insert the §2 "How to read this" section verbatim directly after the registry strip. → Haiku commit+push.
PHASE 2 — Chapters: replace the chapter 02 and chapter 03 on-ramps with the §3 leads, verbatim. Do not touch chapters 01, 04, 05. → Haiku commit+push.
PHASE 3 — Audit: run all prior tripwires plus §4's 15–18. Fix until clean, update `docs/TRIPWIRE-REPORT.md`. → Haiku commit+push: `release: edition I.2 — the opening`.

When finished: tell me in plain language what the cover looks like now from top to bottom, and confirm the live site updated (or give me the one redeploy step if it didn't).
