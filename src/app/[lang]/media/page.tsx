import type { Metadata } from "next";
import MediaGallery from "@/components/MediaGallery";
import { galleryLabels, toGalleryItems } from "@/components/MediaSection";
import PageHeader from "@/components/PageHeader";
import VideoSection from "@/components/VideoSection";
import { fullGallery } from "@/lib/content";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/media">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/media", title: t.meta.media.title, description: t.meta.media.description });
}

export default async function MediaPage({ params }: PageProps<"/[lang]/media">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.media, path: "/media" }]}
        eyebrow={t.media.label}
        title={t.media.title}
        intro={t.media.intro}
        titleSize="md"
      />
      <section aria-label={t.media.label} className="shell py-14 md:py-20">
        <MediaGallery items={toGalleryItems(t, fullGallery)} labels={galleryLabels(t)} archiveLabel={t.media.archive} />
      </section>
      <VideoSection lang={lang} t={t} variant="page" />
    </>
  );
}
