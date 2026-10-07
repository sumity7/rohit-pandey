import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { getUpdate, updates } from "@/lib/content";
import { formatDate, isoDate } from "@/lib/dates";
import { href, htmlLang } from "@/lib/i18n";
import { resolveLang } from "@/lib/page";
import { abs, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

type Props = PageProps<"/[lang]/updates/[slug]">;

async function resolve(params: Props["params"]) {
  const { slug } = await params;
  const base = await resolveLang(params);
  const update = getUpdate(slug);
  if (!update) notFound();
  return { ...base, update };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, update } = await resolve(params);
  return pageMetadata({
    lang,
    path: `/updates/${update.slug}`,
    title: update.title[lang],
    description: update.summary[lang],
    type: "article",
    publishedTime: isoDate(update.date),
    image: update.image
      ? { url: update.image.src, width: update.image.width, height: update.image.height, alt: update.image.alt[lang] }
      : undefined,
  });
}

export default async function UpdatePage({ params }: Props) {
  const { lang, t, update } = await resolve(params);
  const others = updates.filter((u) => u.slug !== update.slug);
  const gallery = update.gallery ?? [];
  const hasMedia = Boolean(update.video || update.image || gallery.length);
  const url = abs(href(lang, `/updates/${update.slug}`));

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: update.title[lang],
    description: update.summary[lang],
    datePublished: isoDate(update.date),
    dateModified: isoDate(update.date),
    inLanguage: htmlLang[lang],
    mainEntityOfPage: url,
    url,
    image: [update.image?.src ?? update.video?.poster ?? "/og/rohit-pandey.jpg", ...(update.gallery?.map((g) => g.src) ?? [])].map(abs),
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Rohit Pandey", url: abs(href(lang)) },
    publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Rohit Pandey" },
    about: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <>
      <JsonLd data={article} />
      <PageHeader
        lang={lang}
        trail={[
          { name: t.nav.publicLife, path: "/public-life" },
          { name: update.title[lang], path: `/updates/${update.slug}` },
        ]}
        eyebrow={[formatDate(update.date, lang), update.location?.[lang], update.category[lang]].filter(Boolean).join(" · ")}
        title={update.title[lang]}
        intro={update.summary[lang]}
        titleSize="md"
      />

      <article className="shell grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-20">
        <div className={hasMedia ? "md:col-span-7 lg:col-span-6 lg:col-start-2" : "md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"}>
          {/* The first line is trimmed to its cap height so the text starts level with the photograph's top edge; browsers without text-box trimming nudge the photographs down instead. */}
          <div className="space-y-6 text-[1.125rem] leading-relaxed text-ink-soft [&:lang(hi)]:leading-[1.9] [&>p:first-child]:[text-box:trim-start_cap_alphabetic]">
            {update.body[lang].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <Link href={href(lang, "/public-life")} className="link-draw mt-12 min-h-11 items-center">
            {t.updates.back}
          </Link>
        </div>

        {/*
         * Every photograph sits in one column beside the text on wider screens, never in a row underneath.
         * On phones the column dissolves: the lead photograph or video comes first, further photographs after the text.
         */}
        {hasMedia && (
          <div className="contents md:sticky md:top-[calc(var(--nav-h)+1.5rem)] md:supports-[not_(text-box:trim-start_cap_alphabetic)]:mt-3.5 md:col-span-5 md:col-start-8 md:block md:space-y-8 md:self-start lg:col-span-4 lg:col-start-9">
            {update.video && (
              <figure className="order-first">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={update.video.poster}
                  width={update.video.width}
                  height={update.video.height}
                  aria-label={update.video.label[lang]}
                  style={{ backgroundImage: `url(${update.video.blur})`, backgroundSize: "cover" }}
                  className="block h-auto w-full rounded-md bg-sand"
                >
                  <source src={update.video.src} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-sm text-muted">{update.video.label[lang]}</figcaption>
              </figure>
            )}

            {update.image && (
              <figure className="order-first">
                <div className="overflow-hidden rounded-md bg-sand">
                  <Image
                    src={update.image.src}
                    width={update.image.width}
                    height={update.image.height}
                    alt={update.image.alt[lang]}
                    sizes="(min-width: 768px) 34vw, 92vw"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{update.image.alt[lang]}</figcaption>
              </figure>
            )}

            {gallery.length > 0 && (
              <ul aria-label={update.title[lang]} className="space-y-8">
                {gallery.map((g) => (
                  <li key={g.src}>
                    <div className="overflow-hidden rounded-md bg-sand">
                      <Image
                        src={g.src}
                        width={g.width}
                        height={g.height}
                        alt={g.alt[lang]}
                        sizes="(min-width: 768px) 34vw, 92vw"
                        className="block h-auto w-full"
                      />
                    </div>
                    <p className="mt-3 text-sm text-muted">{g.alt[lang]}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </article>

      {others.length > 0 && (
        <section aria-labelledby="more-updates" className="surface-tint">
          <div className="shell py-16 md:py-20">
            <h2 id="more-updates" className="text-xl font-black">
              {t.updates.more}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={href(lang, `/updates/${o.slug}`)} className="card-flip block h-full rounded-md border border-line p-6">
                    <span className="text-sm font-semibold text-red">{formatDate(o.date, lang)}</span>
                    <span className="mt-3 block font-display text-xl font-semibold leading-snug">
                      {o.title[lang]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
