import type { Locale } from "./i18n";

/**
 * Dates are stored as ISO strings at the precision that is actually known:
 * "2026-10-04" (day), "2026-09" (month) or "2026" (year only).
 */
const months: Record<Locale, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  hi: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
};

export function formatDate(date: string, lang: Locale): string {
  const [y, m, d] = date.split("-");
  if (!m) return y;
  const month = months[lang][Number(m) - 1];
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

/** A full ISO date for metadata and sorting, padding month or year precision. */
export function isoDate(date: string): string {
  const [y, m = "01", d = "01"] = date.split("-");
  return `${y}-${m}-${d}`;
}

/** Newest first. Less precise dates sort after precise ones in the same period. */
export function byNewest<T extends { date: string }>(a: T, b: T): number {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

/** YouTube publishes full timestamps; show them like every other date. */
export function formatTimestamp(timestamp: string, lang: Locale): string {
  return formatDate(timestamp.slice(0, 10), lang);
}
