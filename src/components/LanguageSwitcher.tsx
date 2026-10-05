"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";

const labels: Record<Locale, { short: string; lang: string }> = {
  en: { short: "EN", lang: "en" },
  hi: { short: "हिंदी", lang: "hi" },
};

export default function LanguageSwitcher({
  lang,
  label,
  className = "",
}: {
  lang: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${lang}`;

  return (
    <nav aria-label={label} className={`flex items-center text-sm ${className}`}>
      {(Object.keys(labels) as Locale[]).map((l, i) => {
        const active = l === lang;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="h-3.5 w-px bg-line" />
            )}
            {active ? (
              <span aria-current="true" lang={labels[l].lang} className="inline-flex min-h-11 min-w-11 items-center justify-center font-semibold text-ink">
                {labels[l].short}
              </span>
            ) : (
              <Link
                href={switchLocalePath(pathname, l)}
                hrefLang={labels[l].lang}
                lang={labels[l].lang}
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors hover:text-red"
              >
                {labels[l].short}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
