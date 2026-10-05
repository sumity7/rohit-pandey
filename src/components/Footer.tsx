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
        <div className="shell py-6 text-[0.8125rem] text-ink-soft">
          <span>© 2026 {t.person.name}</span>
        </div>
      </div>
    </footer>
  );
}
