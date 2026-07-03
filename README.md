# THE BLACK LEDGER — Edition I

An open audit of the classified expenditure of the United States for fiscal year 2025,
compiled entirely from official disclosures, authenticated leaked documents, records
released under the Freedom of Information Act, and published audits.

Built as a static, paginated document: Astro (MPA / static output), two self-hosted
typefaces, no backend, no analytics, no LLM. Every rendered dollar figure resolves to a
row in `data/claims.csv` at build time or the build fails.

## Repository structure

```
data/       claims.csv · sources.csv · toplines_nip_mip.csv · corrections.csv
sources/    raw API provenance JSON for claims C-0001 through C-0010
docs/       BLACK-LEDGER-BUILD-SPEC-v3.md (the binding spec) · METHODOLOGY.md
src/        Astro site — layouts, components, pages, data layer
public/     self-hosted fonts and static assets
```

- **`data/claims.csv`** — 27 claims, all real figures retrieved 2026-07-02, each with an
  evidence tier and a source ID.
- **`data/toplines_nip_mip.csv`** — the official NIP/MIP table 2006–2026, with per-figure
  ODNI/DoD source URLs.
- **`data/sources.csv`** — 20 registered sources with tier ceilings.
- **`data/corrections.csv`** — the public, append-only corrections register (header only).
- **`sources/*.json`** — raw API provenance for the machine-retrieved claims.
- **`docs/BLACK-LEDGER-BUILD-SPEC-v3.md`** — the only design canon: every token, every
  component, every line of copy, verbatim.
- **`docs/METHODOLOGY.md`** — the analytical rulebook: the two gaps, the evidence tiers,
  the traps and how they are handled.

## Develop

```
npm install
npm run dev        # local dev server
npm run build      # static build to ./dist (fails if any figure lacks a claim)
npm run preview    # preview the built site
```

## Provenance

Every figure carries its ledger number. The full register of claims, sources, methodology,
and corrections lives in Chapter 05 — The Record.
