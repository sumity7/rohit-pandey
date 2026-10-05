import Link from "next/link";
import { updates } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

/** Public Life: every update once, as a card, newest first. The page header carries the title and intro. */
export default function PublicLifeSection({ lang, t }: { lang: Locale; t: Dict }) {
  const p = t.publicLife;

  return (
    <section aria-labelledby="public-life-title" className="shell py-16 md:py-28">
      <h2 id="public-life-title" className="sr-only">
        {p.title}
      </h2>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {updates.map((u) => (
          <li key={u.slug}>
            <Link
              href={href(lang, `/updates/${u.slug}`)}
              className="card-flip group flex h-full flex-col rounded-md border border-line p-5 md:p-6"
            >
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                <time dateTime={u.date} className="font-semibold text-red">
                  {formatDate(u.date, lang)}
                </time>
                {u.location && <span className="text-muted">{u.location[lang]}</span>}
              </span>
              <span className="mt-3 block text-lg font-semibold leading-snug [&:lang(hi)]:leading-normal">{u.title[lang]}</span>
              <span className="mt-3 block text-[0.9375rem] text-ink-soft">{u.summary[lang]}</span>
              <span className="mt-auto pt-4 text-sm font-semibold text-ink-soft">{t.updates.readMore}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
