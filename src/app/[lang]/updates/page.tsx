import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import UpdatesArchive from "@/components/UpdatesArchive";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/updates">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/updates", title: t.meta.updates.title, description: t.meta.updates.description });
}

export default async function UpdatesPage({ params }: PageProps<"/[lang]/updates">) {
  const { lang, t } = await resolveLang(params);
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.updates, path: "/updates" }]}
        eyebrow={t.updates.label}
        title={t.updates.title}
        intro={t.updates.intro}
        titleSize="md"
      />
      <section aria-label={t.updates.label} className="shell py-14 md:py-20">
        <UpdatesArchive lang={lang} t={t} />
      </section>
    </>
  );
}
