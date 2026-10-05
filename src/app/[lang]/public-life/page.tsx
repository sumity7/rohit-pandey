import type { Metadata } from "next";
import ContactStrip from "@/components/ContactStrip";
import PageHeader from "@/components/PageHeader";
import PublicLifeHeroVideo from "@/components/PublicLifeHeroVideo";
import PublicLifeSection from "@/components/PublicLifeSection";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/public-life">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({
    lang,
    path: "/public-life",
    title: t.meta.publicLife.title,
    description: t.meta.publicLife.description,
  });
}

export default async function PublicLifePage({ params }: PageProps<"/[lang]/public-life">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.publicLife, path: "/public-life" }]}
        title={t.meta.publicLife.title}
        intro={t.meta.publicLife.description}
        tone="gradient"
        titleSize="xl"
        backdrop={<PublicLifeHeroVideo label={t.publicLife.videoLabel} />}
      />
      <PublicLifeSection lang={lang} t={t} />
      <ContactStrip lang={lang} t={t} />
    </>
  );
}
