import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

/** A short introduction on the left with a photograph on the right, and the facts a voter looks for first. */
export default function HomeIntro({ lang, t }: { lang: Locale; t: Dict }) {
  const { about, location } = t;
  const facts = [location.facts[0], location.facts[1], about.facts[0], about.facts[3], about.facts[4]];

  return (
    <section aria-labelledby="about-title" className="bg-white py-20 md:py-32">
      <div className="shell">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 id="about-title" className="title-lg text-red">
              {about.title}
            </h2>
            <div className="mt-8 max-w-2xl space-y-4">
              <p className="lede">{about.bio[0]}</p>
              <p className="text-ink-soft">{about.bio[1]}</p>
            </div>
            <Link href={href(lang, "/about")} className="link-draw mt-8 min-h-11 items-center text-red-dk">
              {about.readMore}
            </Link>
          </div>

          <figure className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-md bg-sand shadow-lg md:ml-auto md:mr-0">
              <Image
                src={images.aboutHome.src}
                alt={about.portraitAlt}
                fill
                sizes="(min-width: 768px) 26rem, 92vw"
                className="object-cover object-[62%_30%]"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,var(--red)_0_50%,var(--green)_50%_100%)]" />
            </div>
          </figure>
        </div>

        <dl className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {facts.map((f) => (
            <div key={f.k} className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted [&:lang(hi)]:text-sm [&:lang(hi)]:normal-case">
                {f.k}
              </dt>
              <dd className="mt-1.5 font-medium">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
