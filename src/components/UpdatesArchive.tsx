import Link from "next/link";
import { updates } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

/** Editorial list of every update, newest first. */
export default function UpdatesArchive({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <ol className="grid gap-4">
      {updates.map((item) => (
        <li key={item.slug}>
          <Link
            href={href(lang, `/updates/${item.slug}`)}
            className="card-flip group grid gap-3 rounded-md border border-line p-6 md:grid-cols-12 md:gap-8 md:p-8"
          >
            <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-1">
              <span className="font-semibold text-red">{item.period[lang]}</span>
              <span className="text-sm text-muted">{item.category[lang]}</span>
            </div>
            <div className="md:col-span-7">
              <h2 className="title-md">{item.title[lang]}</h2>
              <p className="mt-3 max-w-2xl text-ink-soft">{item.summary[lang]}</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start text-sm font-semibold md:col-span-2 md:justify-self-end">
              {t.updates.readMore}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
