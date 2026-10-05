import Image from "next/image";
import Link from "next/link";
import { updates, type Update } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

function cover(u: Update, lang: Locale) {
  if (u.image) return { src: u.image.src, alt: u.image.alt[lang] };
  if (u.video) return { src: u.video.poster, alt: u.video.label[lang] };
  return undefined;
}

/** Latest updates: one featured story with its photograph, then the next three as cards. */
export default function LatestUpdates({ lang, t }: { lang: Locale; t: Dict }) {
  const l = t.latest;
  const [lead, ...rest] = updates;
  if (!lead) return null;
  const cards = rest.slice(0, 3);
  const leadCover = cover(lead, lang);
  const leadHref = href(lang, `/updates/${lead.slug}`);

  return (
    <section id="updates" aria-labelledby="latest-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="latest-title" className="title-lg text-red">
            {l.title}
          </h2>
          <Link href={href(lang, "/updates")} className="link-draw text-red-dk">
            {l.all} <span aria-hidden>→</span>
          </Link>
        </div>

        <article className="group mt-10 grid items-center gap-8 border-t border-ink/60 pt-8 lg:grid-cols-12 lg:gap-14">
          {leadCover && (
            <Link href={leadHref} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-md bg-sand lg:col-span-7">
              <Image
                src={leadCover.src}
                alt=""
                width={1280}
                height={960}
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          )}
          <div className={leadCover ? "lg:col-span-5" : "lg:col-span-12"}>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="rounded-sm bg-red px-2 py-0.5 text-[0.8125rem] font-semibold text-white">{l.featured}</span>
              <span className="font-semibold text-red">{lead.category[lang]}</span>
              <span aria-hidden className="hidden text-line sm:inline">
                |
              </span>
              <span className="text-muted">{lead.period[lang]}</span>
            </p>
            <h3 className="mt-3 font-display text-[1.65rem] font-semibold leading-snug tracking-[-0.01em] [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
              <Link href={leadHref} className="hover:text-red">
                {lead.title[lang]}
              </Link>
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{lead.summary[lang]}</p>
            <Link href={leadHref} className="link-draw mt-6 text-red-dk">
              {l.readMore} <span aria-hidden>→</span>
            </Link>
          </div>
        </article>

        {cards.length > 0 && (
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((u) => {
              const c = cover(u, lang);
              const to = href(lang, `/updates/${u.slug}`);
              return (
                <article key={u.slug} className="group flex h-full flex-col border-t border-ink/60 pt-5">
                  {c && (
                    <Link href={to} tabIndex={-1} aria-hidden className="mb-5 block overflow-hidden rounded-md bg-sand">
                      <Image
                        src={c.src}
                        alt=""
                        width={1280}
                        height={960}
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="font-semibold text-red">{u.category[lang]}</span>
                      <span aria-hidden className="hidden text-line sm:inline">
                        |
                      </span>
                      <span className="text-muted">{u.period[lang]}</span>
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.01em] [&:lang(hi)]:leading-normal [&:lang(hi)]:tracking-normal">
                      <Link href={to} className="hover:text-red">
                        {u.title[lang]}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{u.summary[lang]}</p>
                    <Link href={to} className="link-draw mt-6 self-start text-red-dk">
                      {l.readMore} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
