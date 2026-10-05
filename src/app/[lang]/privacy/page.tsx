import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import PageHeader from "@/components/PageHeader";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/privacy", title: t.meta.privacy.title, description: t.meta.privacy.description });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.footer.privacy, path: "/privacy" }]}
        eyebrow={t.footer.privacy}
        title={t.meta.privacy.title}
        intro={t.meta.privacy.description}
        titleSize="md"
      />
      <LegalPage sections={t.legal.privacy} updated={t.legal.updated} />
    </>
  );
}
