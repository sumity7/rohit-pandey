import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import ContentSlot from "./ContentSlot";

/**
 * Profile: a short biography and verified facts beside a photograph.
 * On the about page the portrait already leads the page header, so this
 * section shows the text alone.
 */
export default function ProfileIntro({
  lang,
  t,
  variant = "home",
}: {
  lang: Locale;
  t: Dict;
  variant?: "home" | "page";
}) {
  const { about } = t;
  const home = variant === "home";

  const facts = (
    <dl className="grid border-t border-line sm:grid-cols-2">
      {about.facts.map((f, i) => (
        <div
          key={f.k}
          className={`border-b border-line py-4 ${i % 2 === 0 ? "sm:pr-6" : "sm:border-l sm:pl-6"} ${
            i === about.facts.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""
          }`}
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted [&:lang(hi)]:text-sm [&:lang(hi)]:normal-case">
            {f.k}
          </dt>
          <dd className="mt-1 font-medium">{f.v}</dd>
        </div>
      ))}
    </dl>
  );

  if (!home) {
    return (
      <section aria-label={about.label} className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-7">
            <h2 className="title-md text-red">{about.title}</h2>
            {about.bio.map((p, i) => (
              <p key={p} className={i === 0 ? "lede" : "text-ink-soft"}>
                {p}
              </p>
            ))}
            <div className="grid gap-3 pt-4">
              <ContentSlot label={t.slot.label}>{about.slotLegal}</ContentSlot>
              <ContentSlot label={t.slot.label}>{about.slotEducation}</ContentSlot>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">{facts}</div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="about-title" className="bg-white py-20 md:py-28">
      <div className="shell grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="eyebrow">{about.label}</p>
          <h2 id="about-title" className="title-lg mt-5 text-red">
            {about.title}
          </h2>
          <div className="mt-7 max-w-2xl space-y-4">
            <p className="lede">{about.bio[0]}</p>
            <p className="text-ink-soft">{about.bio[1]}</p>
          </div>
          <div className="mt-9 max-w-2xl">{facts}</div>
          <Link href={href(lang, "/about")} className="link-draw mt-8 text-red-dk">
            {about.readMore} <span aria-hidden>→</span>
          </Link>
        </div>

        <figure className="md:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-md bg-sand shadow-lg">
            <Image
              src={images.aboutHome.src}
              alt={about.portraitAlt}
              fill
              sizes="(min-width: 768px) 26rem, 20rem"
              className="object-cover object-[64%_30%]"
            />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,var(--red)_0_50%,var(--green)_50%_100%)]" />
          </div>
        </figure>
      </div>
    </section>
  );
}
