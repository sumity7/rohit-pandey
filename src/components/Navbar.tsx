"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { isActive, navItems, scrollTopIfCurrent } from "@/lib/nav";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SectionLink from "./SectionLink";
import SocialLinks from "./SocialLinks";

/**
 * Fixed header that sits transparently over each page's coloured top band
 * and turns deep red once the page scrolls. Every page starts with a dark
 * band (home hero or PageHeader), so white links always have contrast.
 */
export default function Navbar({
  lang,
  t,
  name,
  role,
}: {
  lang: Locale;
  t: Dict["nav"];
  name: string;
  role: string;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const lastPath = useRef(pathname);

  // A reload always starts fresh at the top: stop the browser restoring the
  // previous scroll position (a #section link still lands on its section).
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new route always opens at its top, never part-way down.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const links = navItems.filter((item) => item.key !== "contact");
  const contactActive = isActive(pathname, lang, "/contact");

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-red-deep shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)]" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href={href(lang)}
          onClick={(e) => scrollTopIfCurrent(e, isActive(pathname, lang, "/"))}
          className="min-w-0 shrink-0"
          aria-label={`${name}, ${role}. ${t.home}`}
        >
          <Logo />
        </Link>

        <nav aria-label={t.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-md bg-black/10 p-1 ring-1 ring-white/15 backdrop-blur-sm">
            {links.map((item) => {
              const active = isActive(pathname, lang, item.path);
              const subs =
                item.key === "media"
                  ? [
                      { path: "/media#photos", label: t.mediaPhotos },
                      { path: "/media#videos", label: t.mediaVideos },
                    ]
                  : [];
              return (
                <li key={item.key} className="group relative">
                  <SectionLink
                    href={href(lang, item.path)}
                    onClick={(e) => scrollTopIfCurrent(e, active)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center whitespace-nowrap rounded px-4 text-[0.9375rem] transition-colors ${
                      active ? "bg-white font-semibold text-brand-red" : "text-ink-soft hover:bg-white/12 hover:text-ink"
                    }`}
                  >
                    {t[item.key]}
                  </SectionLink>
                  {subs.length > 0 && (
                    <div className="invisible absolute left-0 top-full z-10 min-w-48 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="rounded-md bg-red-deep p-1 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ring-1 ring-white/20">
                        {subs.map((sub) => (
                          <li key={sub.path}>
                            <SectionLink
                              href={href(lang, sub.path)}
                              className="flex min-h-11 items-center whitespace-nowrap rounded px-4 text-[0.9375rem] text-ink-soft transition-colors hover:bg-white/12 hover:text-ink"
                            >
                              {sub.label}
                            </SectionLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          <div className="hidden xl:block [&_a]:size-10">
            <SocialLinks />
          </div>
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} label={t.language} />
          </div>
          <div className="hidden md:block">
            <Link
              href={href(lang, "/contact")}
              onClick={(e) => scrollTopIfCurrent(e, contactActive)}
              aria-current={contactActive ? "page" : undefined}
              className={`btn min-h-11 py-2.5 pl-5 pr-5 text-[0.875rem] ${
                contactActive
                  ? "bg-green-dk text-white ring-2 ring-white/70"
                  : "bg-white text-brand-red hover:bg-tint hover:text-red-dk"
              }`}
            >
              {t.connect}
            </Link>
          </div>
          <MobileMenu lang={lang} t={t} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
