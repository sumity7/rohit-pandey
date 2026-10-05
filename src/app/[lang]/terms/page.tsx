import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import PageHeader from "@/components/PageHeader";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/terms", title: t.meta.terms.title, description: t.meta.terms.description });
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.footer.terms, path: "/terms" }]}
        title={t.meta.terms.title}
        intro={t.meta.terms.description}
        titleSize="md"
      />
      <LegalPage sections={t.legal.terms} updated={t.legal.updated} />
    </>
  );
}
