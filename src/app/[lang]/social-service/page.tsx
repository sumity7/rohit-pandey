import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SocialService from "@/components/social-service/SocialService";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/social-service">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({
    lang,
    path: "/social-service",
    title: t.meta.socialService.title,
    description: t.meta.socialService.description,
  });
}

export default async function SocialServicePage({ params }: PageProps<"/[lang]/social-service">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.socialService, path: "/social-service" }]}
        title={t.socialService.title}
        intro={t.socialService.lead}
        tone="gradient"
        titleSize="md"
      />
      <SocialService lang={lang} t={t} heading={false} />
    </>
  );
}
