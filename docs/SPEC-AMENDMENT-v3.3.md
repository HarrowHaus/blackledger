# THE BLACK LEDGER — SPEC AMENDMENT v3.3 · RECOVERY & POLISH
## Applies on top of v3, v3.1, v3.2. Where they conflict, v3.3 wins. All prior rules otherwise remain in force.

**Situation:** the live site at blackledger.donald-dcd.workers.dev is still v3.0. The v3.1 (plain layer) and v3.2 (the opening) amendments are not visible in production — they either live on an unmerged branch, were never applied, or were pushed but never deployed. This amendment is first a recovery order, then a polish order.

---

# §1. FORENSIC RECOVERY (do this before touching any code)

1. `git fetch --all --prune`. List every branch, local and remote.
2. **Every branch that is not the default branch gets merged into the default branch, then deleted (local and remote).** If merge conflicts arise, resolve them by keeping the most recent amendment work (v3.2 > v3.1 > v3.0 content). After this step, exactly one branch exists.
3. Verify the working tree actually contains the v3.1 and v3.2 work: claims.csv has `display_name` and `public_note` columns; the cover source contains "Before the file opens" and "How to read this"; chapter 02 contains "two websites that do not talk to each other"; the Record table says "Confidence". 
4. **Whatever is missing, apply it now** from `docs/SPEC-AMENDMENT-v3.1.md` and `docs/SPEC-AMENDMENT-v3.2.md`, verbatim, per those documents.
5. Report to me in plain language what you found: which branches existed, what was on them, and whether the amendments had been applied, partially applied, or never run.

# §2. DEPLOYMENT (the site must update when we push)

1. Detect how this Worker deploys (look for `wrangler.toml` / `wrangler.jsonc` and any CI config).
2. From now on, **every phase that changes the site ends with a deploy**, not just a push: run the project's deploy command (typically `npx wrangler deploy` or the build+deploy script). If authentication fails, stop and tell me the single command I need to run (`npx wrangler login`) and wait.
3. After the final deploy, fetch `https://blackledger.donald-dcd.workers.dev/` yourself and confirm the phrase "Before the file opens" is present in the served HTML. The job is not done until the LIVE site shows the work.

# §3. THE RECORD — COLLAPSED NOTES

The 05.1 register currently interleaves every note as a full-width table row, doubling the table's length. Change: each claim renders as ONE row; its note and annotations are hidden by default and expand inline when the row is activated (use a native `<details>`-style disclosure — semantic, keyboard-accessible, no modal, no JS required). The component list (v3 §7) is amended to add: **14. Expandable register row.** Collapsed is the default state on page load, always.

# §4. COVER DE-DUPLICATION (verbatim structure)

The cover currently repeats "makes no accusations; it documents" and will repeat it a third time once v3.2's opening is live. Final cover order, top to bottom — nothing else, nothing reordered:

1. Opening passage ("Before the file opens", v3.2 §1)
2. Registry strip
3. "How to read this" (v3.2 §2)
4. "What this is" — **paragraphs 1 and 2 only; paragraph 3 ("This document brings the available numbers…") is deleted**
5. Epigraph
6. The counter
7. Subject block
8. Colophon

The cover's standalone "METHODOLOGY:" paragraph is **deleted entirely** (its content lives in 05.2). The link line `Full registry of sources → Chapter 05` moves to sit directly beneath the Subject block.

# §5. NUMBERING — ONE SYSTEM

Chapter numbers and FILE numbers currently diverge (Chapter 02 shows "FILE No. 003"). Fix: running feet use chapter numbering everywhere — format `CH. {NN} — {CHAPTER NAME} · P. {page} / {total}` (cover is `CH. 00 — COVER`). FILE numbers survive in exactly one place: the six dossier pages inside Subjects keep their `FILE No. 03/0N` labels, because there they mean something.

# §6. SHARE LINKS THAT WORK (05.5)

Replace the current dead links with exactly three, mono text links, no icons:
- `Copy link` — copies the current page URL to the clipboard; on success the link text becomes `Copied.` for 2 seconds.
- `Share on Bluesky` — `https://bsky.app/intent/compose?text={URL-encoded: "The Black Ledger — an open audit of U.S. classified expenditure. " + page URL}`
- `Share by email` — `mailto:?subject=The%20Black%20Ledger&body={URL-encoded page URL}`

# §7. SOURCE LINKS FOR HUMANS (05.3)

Rule: the rendered link for every source points to a page a human can read. Raw API endpoints move into the annotation line `— API: {endpoint}` beneath the source. Specifically: S-01 links `https://fiscaldata.treasury.gov/datasets/monthly-treasury-statement/summary-of-receipts-and-outlays-of-the-u-s-government/`; S-02 links `https://www.usaspending.gov/search`; S-03 and S-04 link `https://www.usaspending.gov/explorer/agency`. All four keep their API endpoints as `— API:` annotations.

# §8. THE CLOCK

"— You are reading: —" currently renders a dangling dash. Fix: populate with the visitor's local time (`HH:MM, DD Mon YYYY`, updating each minute). If JavaScript is unavailable or the value is empty, the entire line is omitted — a missing line is correct; a dangling dash is never rendered.

# §9. TRIPWIRES ADDED (run with all prior sets)

19. `git branch -a` shows exactly one branch after §1.
20. The v3.1 greps (raw metric keys, "FLAGSHIP", "No note registered", etc.) return zero matches on the LIVE deployed pages, not just the local build.
21. The live cover contains "Before the file opens" and does NOT contain the deleted methodology paragraph or "This document brings the available numbers".
22. The Record register loads with all notes collapsed.
23. No rendered line anywhere ends in a dangling "—" with no value.
24. The Bluesky link opens a compose window pre-filled with the page URL.

---

# §10. PROMPT FOR CLAUDE CODE — paste everything below this line
# (Before pasting: put SPEC-AMENDMENT-v3.3.md in the blackledger repo folder.)

You are recovering and polishing THE BLACK LEDGER. The file `SPEC-AMENDMENT-v3.3.md` in this directory is the binding change order; specs v3, v3.1, and v3.2 (in `docs/`) remain in force everywhere it is silent. I am not a coder — report in plain language, never ask me to write or edit code.

GIT RULES — absolute, entire session: after the recovery in Phase 1, everything commits and pushes directly to the single default branch. Never create a branch. Never open a pull request. Every commit is performed by a Haiku subagent (stage, message, commit, push). A phase is not done until the push succeeds — and where the phase changes the site, until the DEPLOY succeeds too.

PHASE 0 — Move `SPEC-AMENDMENT-v3.3.md` into `docs/`. → Haiku commit+push.
PHASE 1 — RECOVERY: execute §1 exactly — fetch and list all branches, merge every non-default branch into the default branch (resolving conflicts in favor of the newest amendment work), delete merged branches local and remote, verify the v3.1/v3.2 content per §1.3, and apply anything missing from those amendment documents verbatim. Then set up deployment per §2 so every subsequent phase ends with a live deploy. Report what you found before continuing. → Haiku commit+push, then deploy.
PHASE 2 — POLISH: apply §3 (collapsed register notes), §4 (cover order and deletions, exactly), §5 (numbering), §6 (share links), §7 (source links), §8 (the clock). → Haiku commit+push, then deploy.
PHASE 3 — AUDIT: run ALL tripwires — v3's 1–10, v3.1's 11–14, v3.2's 15–18, v3.3's 19–24 — against the LIVE site where the tripwire says so. Fix until clean. Update `docs/TRIPWIRE-REPORT.md` with every check and result. → Haiku commit+push, then final deploy.

When finished, tell me in plain language: (1) the forensic story — where the missing amendments were and why the live site was stale, (2) what the cover reads like now, top to bottom, (3) confirmation you fetched the live site and saw the new content with your own request.
