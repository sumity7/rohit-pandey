import Link from "next/link";
import { updates } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import PublicLifeExplorer, { type ExplorerItem } from "./PublicLifeExplorer";

/** Documented public activity — each entry links to its published note. */
function ActivityList({ lang, t, size = "md" }: { lang: Locale; t: Dict; size?: "md" | "lg" }) {
  return (
    <ol className={`grid gap-4 ${size === "lg" ? "md:grid-cols-3 md:gap-5" : ""}`}>
      {updates.map((u) => (
        <li key={u.slug}>
          <Link
            href={href(lang, `/updates/${u.slug}`)}
            className="card-flip group flex h-full flex-col rounded-md border border-line p-5 md:p-6"
          >
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold text-red">{u.period[lang]}</span>
              <span className="text-muted">{u.category[lang]}</span>
            </span>
            <span className="mt-3 block font-display text-lg font-semibold leading-snug tracking-[-0.01em] [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
              {u.title[lang]}
            </span>
            {size === "lg" && <span className="mt-3 block text-[0.9375rem] text-ink-soft">{u.summary[lang]}</span>}
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-ink-soft">
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

export default function PublicLifeSection({
  lang,
  t,
  variant = "home",
}: {
  lang: Locale;
  t: Dict;
  variant?: "home" | "page";
}) {
  const p = t.publicLife;

  if (variant === "page") {
    return (
      <section aria-label={p.title} className="shell py-16 md:py-24">
        <h2 className="title-md text-red">{p.title}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{p.intro}</p>
        <div className="mt-10">
          <ActivityList lang={lang} t={t} size="lg" />
        </div>
      </section>
    );
  }

  const items: ExplorerItem[] = updates.slice(0, 3).map((u) => {
    const m = u.image
      ? { src: u.image.src, width: u.image.width, height: u.image.height, alt: u.image.alt[lang] }
      : u.video
        ? { src: u.video.poster, width: u.video.width, height: u.video.height, alt: u.video.label[lang], video: true }
        : undefined;
    return {
      slug: u.slug,
      href: href(lang, `/updates/${u.slug}`),
      period: u.period[lang],
      category: u.category[lang],
      title: u.title[lang],
      summary: u.summary[lang],
      media: m,
    };
  });

  return (
    <section aria-labelledby="public-life-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <p className="eyebrow">{p.label}</p>
        <h2 id="public-life-title" className="title-lg mt-5 text-red">
          {p.title}
        </h2>
        <p className="mt-5 max-w-2xl text-ink-soft">{p.intro}</p>
        <div className="mt-10">
          <PublicLifeExplorer items={items} readMore={t.updates.readMore} />
        </div>
        <Link href={href(lang, "/public-life")} className="link-draw mt-10 text-red-dk">
          {t.nav.publicLife} <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
