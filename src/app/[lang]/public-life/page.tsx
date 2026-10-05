import type { Metadata } from "next";
import ContactStrip from "@/components/ContactStrip";
import PortraitFrame from "@/components/PortraitFrame";
import PageHeader from "@/components/PageHeader";
import PublicLifeSection from "@/components/PublicLifeSection";
import { images } from "@/lib/content";
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
        eyebrow={t.publicLife.label}
        title={t.meta.publicLife.title}
        intro={t.meta.publicLife.description}
        tone="gradient"
        media={
          <PortraitFrame
            image={images.publicLife}
            alt={t.publicLife.photoAlt}
            sizes="(min-width: 768px) 20rem, 64vw"
            preload
            flush
            inset="pt-[10%] px-[6%]"
            className="w-[min(64vw,16rem)] md:w-[min(100%,20rem)]"
          />
        }
      />
      <PublicLifeSection lang={lang} t={t} variant="page" />
      <ContactStrip lang={lang} t={t} />
    </>
  );
}
