import Image from "next/image";
import Link from "next/link";
import { updates } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { socials } from "@/lib/site";
import SocialLinks from "./SocialLinks";

const facebook = socials.find((s) => s.id === "facebook")!;
const pagePlugin = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebook.url)}&tabs=timeline&width=500&height=640&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

/** Latest from social media: the Facebook timeline beside a scrolling list of the newest updates. */
export default function SocialFeed({ lang, t }: { lang: Locale; t: Dict }) {
  const s = t.social;

  return (
    <section aria-labelledby="social-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <p className="eyebrow">{s.label}</p>
        <h2 id="social-title" className="title-lg mt-5 text-red">
          {s.title}
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">{s.facebook}</h3>
              <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="link-draw text-sm text-red-dk">
                {s.openFacebook} <span aria-hidden>↗</span>
              </a>
            </div>
            <iframe
              title={`${s.facebook} — ${facebook.handle}`}
              src={pagePlugin}
              loading="lazy"
              className="h-[640px] w-full overflow-hidden rounded-md border border-line bg-sand"
              allow="encrypted-media"
            />
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">{s.latest}</h3>
              <Link href={href(lang, "/updates")} className="link-draw text-sm text-red-dk">
                {s.all} <span aria-hidden>→</span>
              </Link>
            </div>
            <ul
              tabIndex={0}
              aria-label={s.latest}
              className="h-[640px] space-y-4 overflow-y-auto overscroll-contain rounded-md border border-line p-3 focus-visible:outline-2 focus-visible:outline-red"
            >
              {updates.map((u) => {
                const thumb = u.image?.src ?? u.video?.poster;
                return (
                  <li key={u.slug}>
                    <Link
                      href={href(lang, `/updates/${u.slug}`)}
                      className="card-flip group flex gap-4 rounded-md border border-line p-3"
                    >
                      {thumb && (
                        <span className="relative block h-24 w-28 shrink-0 overflow-hidden rounded bg-sand">
                          <Image src={thumb} alt="" fill sizes="7rem" className="object-cover" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-red">{u.period[lang]}</span>
                        <span className="mt-1 line-clamp-3 block font-display font-semibold leading-snug [&:lang(hi)]:leading-normal">
                          {u.title[lang]}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <SocialLinks className="mt-8" />
      </div>
    </section>
  );
}
