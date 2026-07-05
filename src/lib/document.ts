// THE BLACK LEDGER — document structure.
// Real, build-time pagination (spec §2.3) and navigation (spec §6) derive from here.

export interface DocPage {
  /** ordinal page number across the whole document (1-based) */
  page: number;
  /** three-digit file number shown in the running foot */
  fileNo: string;
  /** route path */
  path: string;
  /** chapter name shown in the running foot, e.g. "THE METER" */
  chapterName: string;
  /** the running-head / nav label for the chapter this page belongs to */
  chapterLabel: string;
  /** dossier pages only: the FILE label used in next-links, e.g. "FILE 03/01" (v3.4 §2.3) */
  fileLabel?: string;
}

// Top-level chapters for the header nav (spec §6).
export const NAV: { label: string; path: string; match: string }[] = [
  { label: '00 — COVER', path: '/', match: 'cover' },
  { label: '01 — METER', path: '/chapters/meter', match: 'meter' },
  { label: '02 — RECONCILIATION', path: '/chapters/reconciliation', match: 'reconciliation' },
  { label: '03 — SUBJECTS', path: '/chapters/subjects', match: 'subjects' },
  { label: '04 — YOUR SHARE', path: '/chapters/share', match: 'share' },
  { label: '05 — RECORD', path: '/chapters/record', match: 'record' },
];

// Ordered document. Page numbers and the total are computed from this list.
const ORDER: Omit<DocPage, 'page' | 'fileNo'>[] = [
  { path: '/', chapterName: 'COVER', chapterLabel: '00 — COVER' },
  { path: '/chapters/meter', chapterName: 'THE METER', chapterLabel: '01 — METER' },
  { path: '/chapters/reconciliation', chapterName: 'THE RECONCILIATION', chapterLabel: '02 — RECONCILIATION' },
  { path: '/chapters/subjects', chapterName: 'SUBJECTS', chapterLabel: '03 — SUBJECTS' },
  { path: '/chapters/subjects/national-intelligence-program', chapterName: 'THE NATIONAL INTELLIGENCE PROGRAM', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/01' },
  { path: '/chapters/subjects/leaked-interior', chapterName: 'THE LEAKED INTERIOR', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/02' },
  { path: '/chapters/subjects/projection', chapterName: 'THE PROJECTION', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/03' },
  { path: '/chapters/subjects/audit', chapterName: 'THE AUDIT', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/04' },
  { path: '/chapters/subjects/adjustments', chapterName: 'THE ADJUSTMENTS', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/05' },
  { path: '/chapters/subjects/unreported-line', chapterName: 'THE UNREPORTED LINE', chapterLabel: '03 — SUBJECTS', fileLabel: 'FILE 03/06' },
  { path: '/chapters/share', chapterName: 'YOUR SHARE', chapterLabel: '04 — YOUR SHARE' },
  { path: '/chapters/record', chapterName: 'THE RECORD', chapterLabel: '05 — RECORD' },
];

export const PAGES: DocPage[] = ORDER.map((p, i) => ({
  ...p,
  page: i + 1,
  fileNo: String(i + 1).padStart(3, '0'),
}));

export const TOTAL_PAGES = PAGES.length;

function normalize(pathname: string): string {
  // strip trailing slash (except root) so lookups are stable
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

export function pageFor(pathname: string): DocPage {
  const key = normalize(pathname);
  const found = PAGES.find((p) => p.path === key);
  if (!found) {
    throw new Error(
      `[document] No page registered for path "${pathname}". Add it to src/lib/document.ts ORDER.`,
    );
  }
  return found;
}

export function nextPage(pathname: string): DocPage | null {
  const cur = pageFor(pathname);
  return PAGES[cur.page] ?? null; // PAGES is 0-based; cur.page is 1-based → next
}

export function navFor(pathname: string): string {
  const key = normalize(pathname);
  if (key === '/') return 'cover';
  const seg = key.split('/')[2] ?? '';
  if (['meter', 'reconciliation', 'subjects', 'share', 'record'].includes(seg)) return seg;
  return 'subjects'; // dossier pages live under chapter 03
}
