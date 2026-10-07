import { pressItems } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { SHOW_CONTENT_SLOTS } from "@/lib/site";
import ContentSlot from "./ContentSlot";

/** Real press reports only. Hidden until the campaign supplies them. */
export default function NewsStrip({ lang, t }: { lang: Locale; t: Dict }) {
  if (pressItems.length === 0 && !SHOW_CONTENT_SLOTS) return null;

  return (
    <section aria-labelledby="news-title" className="bg-white pb-20 md:pb-28">
      <div className="shell border-t border-line pt-10">
        <h2 id="news-title" className="text-xl font-black">
          {t.news.title}
        </h2>
        {pressItems.length > 0 ? (
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {pressItems.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block min-h-11">
                  <span className="block text-sm text-muted">
                    {p.outlet}, {formatDate(p.date, lang)}
                  </span>
                  <span className="mt-1 block font-semibold leading-snug group-hover:text-red">{p.title[lang]}</span>
                  <span className="sr-only"> ({t.footer.newTab})</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <ContentSlot label={t.slot.label} className="mt-6">
            {t.news.slot}
          </ContentSlot>
        )}
      </div>
    </section>
  );
}
