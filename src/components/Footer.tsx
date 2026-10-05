import Link from "next/link";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { navItems } from "@/lib/nav";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import SectionLink from "./SectionLink";

export default function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <footer className="on-dark surface-deep pb-14 [--color-ink-soft:rgb(255_255_255/0.7)] md:pb-0">
      <div aria-hidden className="flag-strip" />
      <div className="shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="w-fit">
            <Logo size="lg" alt={t.person.name} />
          </p>
          <p className="mt-5 text-ink-soft">{t.person.role}</p>
          <p className="text-ink-soft">{t.person.placeLong}</p>
          <SocialLinks className="mt-7" />
        </div>

        <nav aria-label={t.footer.navigate} className="md:col-span-4">
          <p className="eyebrow">{t.footer.navigate}</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 text-[0.9375rem]">
            {[...navItems, { key: "khalilabad", path: "/khalilabad" } as const].map((item) => (
              <li key={item.key}>
                <SectionLink href={href(lang, item.path)} className="inline-flex min-h-11 items-center text-ink-soft transition-colors hover:text-ink">
                  {t.nav[item.key]}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow">{t.footer.language}</p>
          <LanguageSwitcher lang={lang} label={t.footer.language} className="mt-5 text-base" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-[0.8125rem] text-ink-soft md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 {t.person.name}</span>
            <Link href={href(lang, "/privacy")} className="inline-flex min-h-11 items-center hover:text-ink">
              {t.footer.privacy}
            </Link>
            <Link href={href(lang, "/terms")} className="inline-flex min-h-11 items-center hover:text-ink">
              {t.footer.terms}
            </Link>
            <span className="basis-full text-xs md:basis-auto">{t.footer.disclaimer}</span>
          </div>
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-11 w-fit items-center gap-4 rounded-md border border-line py-1.5 pl-4 pr-1.5 transition-colors hover:border-ink hover:bg-white/10"
          >
            <span className="min-w-0">
              <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">{t.footer.partner}</span>
              <span className="block whitespace-nowrap text-sm font-bold leading-tight text-ink">PRAIB Advisors LLP</span>
            </span>
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-md border border-ink text-ink transition-colors group-hover:bg-white group-hover:text-red-dk"
            >
              ↗
            </span>
            <span className="sr-only">({t.footer.newTab})</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
