import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

/**
 * Inner-page introduction. Always a dark band (the fixed navbar is white on
 * transparent at the top), sized to its content. Pages vary the composition:
 * - `media`: a cutout portrait anchored to the bottom-right edge
 * - `aside`: supporting facts or an index beside the title
 * - neither: a compact text-only band
 */
export default function PageHeader({
  lang,
  trail,
  eyebrow,
  title,
  intro,
  aside,
  media,
  mediaSide = "right",
  backdrop,
  tone = "deep",
  titleSize = "lg",
}: {
  lang: Locale;
  trail: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
  media?: React.ReactNode;
  /** Which side the media sits on from md up. On phones it always follows the title. */
  mediaSide?: "left" | "right";
  /** A film that fills the whole header from md up (text sits on top of it). On phones it follows the text at its own 9:16 ratio. */
  backdrop?: React.ReactNode;
  tone?: "deep" | "gradient";
  titleSize?: "xl" | "lg" | "md";
}) {
  const t = getDictionary(lang);
  const crumbs = [{ name: t.nav.home, path: "/" }, ...trail];
  const side = media ?? aside;

  const titleClass =
    titleSize === "xl"
      ? "font-heading text-[clamp(2.75rem,1.6rem+5vw,5.5rem)] leading-[1.02] [&:lang(hi)]:leading-[1.2] [&:lang(hi)]:tracking-normal"
      : titleSize === "md"
        ? "title-md"
        : "title-lg";

  return (
    <header
      className={`on-dark relative overflow-hidden ${tone === "gradient" ? "surface-gradient" : "surface-deep"} ${backdrop ? "md:min-h-[100svh]" : ""} ${
        media && mediaSide === "right" ? "flag-wedge [--wb-x:40%] [--wt-x:100%] [--wt-y:62%] md:[--wb-x:74%] md:[--wt-x:100%] md:[--wt-y:calc(var(--nav-h)+0.75rem)]" : ""
      }`}
    >
      <JsonLd data={breadcrumbJsonLd(lang, trail)} />
      <div className={`shell pt-[calc(var(--nav-h)+1.25rem)] ${backdrop ? "relative z-10" : ""}`}>
        <nav aria-label={t.nav.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.path} className="flex min-w-0 items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="max-w-[60vw] truncate text-ink-soft">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={href(lang, c.path)} className="inline-flex min-h-11 items-center hover:text-ink">
                      {c.name}
                    </Link>
                  )}
                  {!last && <span aria-hidden>/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={`grid gap-10 md:grid-cols-12 md:gap-8 ${media ? "items-end" : "md:items-end"}`}>
          <div
            className={`pb-12 pt-10 md:pb-16 md:pt-14 ${
              media && mediaSide === "left" ? "order-1 md:order-2 md:col-span-6" : side ? "md:col-span-7" : "md:col-span-9"
            }`}
          >
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={`${eyebrow ? "mt-5" : ""} ${titleClass}`}>{title}</h1>
            {intro && <p className="lede mt-5 max-w-2xl">{intro}</p>}
          </div>
          {media && mediaSide === "left" && (
            <div className="order-2 pb-12 md:order-1 md:col-span-6 md:pb-16 md:pt-14">{media}</div>
          )}
          {media && mediaSide === "right" && <div className="-mt-4 flex justify-end self-end md:col-span-5 md:mt-0">{media}</div>}
          {!media && aside && <div className="pb-12 md:col-span-5 md:pb-16">{aside}</div>}
        </div>
      </div>
      {backdrop && (
        <div className="relative aspect-[9/16] w-full md:absolute md:inset-0 md:aspect-auto">
          {backdrop}
          {/* keeps the title and text readable over the film; the captions at the bottom stay clear */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-3/4 bg-linear-to-b from-red-deep/90 via-red-deep/55 to-transparent md:block"
          />
        </div>
      )}
      <div aria-hidden className={`flag-strip ${backdrop ? "relative z-10 md:absolute md:inset-x-0 md:bottom-0" : ""}`} />
    </header>
  );
}
