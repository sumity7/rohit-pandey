import Link from "next/link";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

/**
 * Home hero built around the supplied artwork (photograph, party imagery and
 * background are all in the image, nothing is drawn over the person).
 * Every breakpoint keeps the same reading: identity on the LEFT, beside the
 * portrait on the RIGHT.
 *
 * - xl and up: the artwork fills the hero below the navbar; all the
 *   text sits in its dark left third. The hero is at least as tall as the
 *   screen (up to 90rem), so no white shows under it on a first view; the
 *   artwork covers the area and keeps the portrait on the right edge.
 * - below xl: the artwork stands at the bottom of the stage at its own ratio
 *   (phones: mobile artwork 16:9, tablets: desktop artwork), never cropped.
 *   Eyebrow, name, designation and the Khalilabad line run down the left
 *   beside the portrait, over a shade on the artwork's flag side; the
 *   introduction and buttons follow full width so nothing has to shrink.
 *
 * A single <picture> carries the artwork, so each breakpoint downloads one
 * image: the mobile file below 768px, the desktop file from 768px up.
 */
export default function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  const { person, hero } = t;

  const details = (
    <>
      <span aria-hidden className="block h-[3px] w-14 bg-white/80" />
      <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">{hero.intro}</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
        <Link
          href={href(lang, "/about")}
          className="btn min-h-11 justify-center bg-white text-brand-red transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-tint hover:text-red-dk"
        >
          {hero.ctaProfile}
        </Link>
        <Link
          href={href(lang, "/contact")}
          className="btn min-h-11 justify-center border border-white/70 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
        >
          {hero.ctaContact}
        </Link>
      </div>
    </>
  );

  return (
    <section aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-red-deep">
      <div className="relative">
        {/* Artwork: one picture. Phones and tablets sit it at the bottom of the
            stage at its own ratio; from xl it fills the hero below the navbar. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 aspect-video md:aspect-[1792/1000] xl:top-[var(--nav-h)] xl:aspect-auto"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/rohit-pandey-hero-banner.jpg" />
            <img
              src="/images/rohit-pandey-hero-banner-mobile.jpg"
              alt=""
              width={1100}
              height={614}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover object-right xl:object-[right_25%]"
            />
          </picture>
          {/* blend the artwork's top edge into the deep red above it */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-red-deep to-transparent xl:h-16" />
          {/* shade the flag side the text runs over; clear of the portrait */}
          <div className="absolute inset-y-0 left-0 w-[64%] bg-linear-to-r from-red-deep via-red-deep/75 to-transparent md:w-[56%] xl:hidden" />
          {/* settle the base into the section */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent to-red-deep xl:hidden" />
          {/* a scrim over the flags and crowd on the left keeps the text readable */}
          <div className="absolute inset-y-0 left-0 hidden w-[62%] bg-linear-to-r from-red-deep/90 via-red-deep/55 to-transparent xl:block" />
        </div>

        <div className="shell relative flex min-h-[calc(var(--nav-h)+56.25vw+1.5rem)] items-start pb-6 pt-[calc(var(--nav-h)+1.25rem)] md:min-h-[calc(var(--nav-h)+55.8vw+2rem)] xl:min-h-[max(40.5rem,min(calc(100svh-5px),90rem))] xl:items-center xl:pb-16 xl:pt-[calc(var(--nav-h)+1rem)]">
          <div className="anim-rise w-full xl:w-auto xl:max-w-[min(36vw,34rem)]">
            <p className="text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.1em] text-ink-soft sm:text-[0.8125rem] sm:tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] [&:lang(hi)]:text-[0.875rem] [&:lang(hi)]:normal-case">
              {hero.eyebrow}
            </p>

            {/* Name, designation and the Khalilabad line keep to the left, beside the portrait */}
            <div className="w-[56%] md:w-[46%] xl:w-auto">
              <h1
                id="hero-title"
                className="mt-3 font-heading text-[clamp(2rem,9vw,3.5rem)] leading-[1.02] md:mt-4 xl:mt-5 xl:text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)] [&:lang(hi)]:leading-[1.2] [&:lang(hi)]:tracking-normal"
              >
                {person.name}
              </h1>

              <p className="mt-2 text-[clamp(0.9375rem,3.6vw,1.25rem)] font-medium leading-snug text-ink-soft xl:mt-4 xl:text-[clamp(1.125rem,0.98rem+0.6vw,1.5rem)] [&:lang(hi)]:tracking-normal">
                {person.role}
              </p>

              <p className="mt-4 text-[0.9375rem] leading-snug text-ink-soft sm:text-base xl:text-[1.0625rem]">{hero.line}</p>
            </div>

            <div className="mt-6 hidden xl:block">{details}</div>
          </div>
        </div>
      </div>

      {/* Introduction and actions, full width below the stage (phones, tablets) */}
      <div className="shell relative pb-12 pt-6 sm:pb-14 xl:hidden">{details}</div>

      <div aria-hidden className="flag-strip relative" />
    </section>
  );
}
