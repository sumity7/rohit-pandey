import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import JsonLd from "@/components/JsonLd";
import NewsStrip from "@/components/NewsStrip";
import OfficeSection from "@/components/OfficeSection";
import SocialSection from "@/components/SocialSection";
import SocialService from "@/components/social-service/SocialService";
import VideoSection, { getVideoItems } from "@/components/VideoSection";
import VisionSection from "@/components/VisionSection";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/", title: t.meta.home.title, description: t.meta.home.description, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  // The featured video section always shows the site's own videos, even when the
  // same story is also listed under Social service.
  const videos = getVideoItems(lang);

  return (
    <>
      <JsonLd data={[personJsonLd(lang), websiteJsonLd(lang)]} />
      <Hero lang={lang} t={t} />
      <HomeIntro lang={lang} t={t} />
      <SocialService lang={lang} t={t} />
      <VisionSection lang={lang} t={t} />
      <VideoSection t={t} items={videos} />
      <NewsStrip lang={lang} t={t} />
      <SocialSection lang={lang} t={t} />
      <OfficeSection lang={lang} t={t} />
    </>
  );
}
