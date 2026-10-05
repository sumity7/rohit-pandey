import type { Metadata } from "next";
import PortraitFrame from "@/components/PortraitFrame";
import PageHeader from "@/components/PageHeader";
import ProfileIntro from "@/components/ProfileIntro";
import PublicConnect from "@/components/PublicConnect";
import JourneySection from "@/components/JourneySection";
import JsonLd from "@/components/JsonLd";
import { images } from "@/lib/content";
import { resolveLang } from "@/lib/page";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/about", title: t.meta.about.title, description: t.meta.about.description });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <JsonLd data={personJsonLd(lang)} />
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.about, path: "/about" }]}
        eyebrow={t.about.label}
        title={t.person.name}
        titleSize="xl"
        intro={`${t.person.role} · ${t.person.placeLong}`}
        tone="gradient"
        media={
          <PortraitFrame
            image={images.about}
            alt={t.about.portraitAlt}
            sizes="(min-width: 768px) 20rem, 64vw"
            preload
            flush
            inset="pt-[10%] px-[6%]"
            className="w-[min(64vw,16rem)] md:w-[min(100%,20rem)]"
          />
        }
      />
      <ProfileIntro lang={lang} t={t} variant="page" />
      <JourneySection lang={lang} t={t} variant="page" />
      <PublicConnect t={t} />
    </>
  );
}
