import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";
import { getDictionary } from "@/lib/dictionary";
import { fontVars } from "@/lib/fonts";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.home.title, template: `%s | ${t.person.name}` },
    description: t.meta.home.description,
    applicationName: t.person.name,
    authors: [{ name: "Rohit Pandey" }],
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#6e0b12",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className={fontVars} data-scroll-behavior="smooth">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {t.nav.skip}
        </a>
        <Navbar lang={lang} t={t.nav} name={t.person.name} role={t.person.role} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer lang={lang} t={t} />
        <StickyContact t={t} />
      </body>
    </html>
  );
}
