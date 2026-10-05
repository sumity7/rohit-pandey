import Link from "next/link";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

/**
 * Home hero built around the supplied artwork (photograph, party imagery and
 * background are all in the image — nothing is drawn over the person).
 * Every breakpoint keeps the same reading: identity on the LEFT, beside the
 * portrait on the RIGHT.
 *
 * - xl and up: the desktop artwork fills the hero below the navbar; all the
 *   text sits in its dark left third. Height follows the artwork's 820:312
 *   ratio, so it is never zoomed beyond what the composition allows.
 * - below xl: the artwork stands at the bottom of the stage at its own ratio
 *   (phones: mobile artwork 16:9, tablets: desktop artwork), never cropped.
 *   Eyebrow, name, designation and values run down the left beside the
 *   portrait, over a shade on the artwork's flag side; the introduction and
 *   buttons follow full width so nothing has to shrink to fit.
 *
 * Only one artwork is ever displayed per breakpoint.
 */
export default function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  const { person, hero } = t;

  const details = (
    <>
      <span aria-hidden className="block h-[3px] w-14 rounded-full bg-white/80" />
      <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">{hero.intro}</p>
      <p className="mt-2 max-w-[34rem] text-base text-muted xl:text-[0.9375rem]">{hero.joined}</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
        <Link
          href={href(lang, "/about")}
          className="btn group justify-between bg-white text-brand-red transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-tint hover:text-red-dk xs:justify-start"
        >
          {hero.ctaProfile}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href={href(lang, "/contact")}
          className="btn group justify-between border border-white/70 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 xs:justify-start"
        >
          {hero.ctaContact}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </>
  );

  return (
    <section aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-red-deep">
      <div className="relative">
        {/* Artwork — phones and tablets: bottom of the stage, natural ratio */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 aspect-video bg-[url(/images/rohit-pandey-hero-mobile.jpg)] bg-cover bg-center bg-no-repeat md:aspect-[820/312] md:bg-[url(/images/rohit-pandey-hero-desktop.jpg)] xl:hidden"
        >
          {/* blend the artwork's top edge into the deep red above it */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-red-deep to-transparent" />
          {/* shade the flag side the text runs over; clear of the portrait */}
          <div className="absolute inset-y-0 left-0 w-[64%] bg-linear-to-r from-red-deep via-red-deep/75 to-transparent md:w-[56%]" />
          {/* settle the base into the section */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent to-red-deep" />
        </div>

        {/* Artwork — desktop. It starts below the navbar so the bar never sits
            on the portrait; the deep red above continues its dark top edge. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[var(--nav-h)] hidden bg-[url(/images/rohit-pandey-hero-desktop.jpg)] bg-cover bg-right bg-no-repeat xl:block"
        >
          <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-red-deep to-transparent" />
        </div>
        {/* A light scrim deepens the artwork's own dark left side for the text */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-[rgb(70_4_4/0.45)] to-transparent xl:block"
        />

        <div className="shell relative flex min-h-[calc(var(--nav-h)+56.25vw+1.5rem)] items-start pb-6 pt-[calc(var(--nav-h)+1.25rem)] md:min-h-[calc(var(--nav-h)+38.05vw+2rem)] xl:min-h-[max(40.5rem,calc(100vw/2.628+var(--nav-h)))] xl:items-center xl:pb-16 xl:pt-[calc(var(--nav-h)+1rem)]">
          <div className="anim-rise w-full xl:w-auto xl:max-w-[min(36vw,34rem)]">
            <p className="flex items-start gap-2.5 text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.1em] text-ink-soft before:mt-[0.6em] before:h-0.5 before:w-5 before:shrink-0 before:bg-white/80 before:content-[''] sm:text-[0.8125rem] sm:tracking-[0.12em] xl:gap-3 xl:text-xs xl:tracking-[0.16em] xl:before:w-7 [&:lang(hi)]:text-[0.875rem] [&:lang(hi)]:normal-case">
              {hero.eyebrow}
            </p>

            {/* Name, designation and values keep to the left, beside the portrait */}
            <div className="w-[56%] md:w-[46%] xl:w-auto">
              <h1
                id="hero-title"
                className="mt-3 font-display text-[clamp(2rem,9vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.03em] md:mt-4 xl:mt-5 xl:text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)] xl:tracking-[-0.035em] [&:lang(hi)]:leading-[1.2] [&:lang(hi)]:tracking-normal"
              >
                {person.name}
              </h1>

              <p className="mt-2 font-display text-[clamp(0.9375rem,3.6vw,1.25rem)] font-medium leading-snug text-ink-soft xl:mt-4 xl:text-[clamp(1.125rem,0.98rem+0.6vw,1.5rem)] [&:lang(hi)]:tracking-normal">
                {person.role}
              </p>

              {/* Values: each item carries its own marker, so a wrap never
                  strands a divider — stacked beside the portrait on phones,
                  a flowing row from sm up */}
              <ul className="mt-4 grid gap-y-1.5 text-[0.9375rem] font-medium sm:mt-5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:text-base xl:text-[1.0625rem]">
                {hero.values.map((v) => (
                  <li key={v} className="flex items-center gap-2.5 sm:whitespace-nowrap">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-green ring-2 ring-white/25" />
                    {v}
                  </li>
                ))}
              </ul>
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
