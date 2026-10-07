import type { Metadata } from "next";
import OfficeSection from "@/components/OfficeSection";
import PageHeader from "@/components/PageHeader";
import SocialLinks from "@/components/SocialLinks";
import { resolveLang } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang, t } = await resolveLang(params);
  return pageMetadata({ lang, path: "/contact", title: t.meta.contact.title, description: t.meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang, t } = await resolveLang(params);
  const c = t.contact;
  return (
    <>
      <PageHeader
        lang={lang}
        trail={[{ name: t.nav.contact, path: "/contact" }]}
        title={c.title}
        intro={c.intro}
        titleSize="md"
      />
      <OfficeSection lang={lang} t={t} heading={false} />
      <section aria-labelledby="follow-title" className="shell py-16 md:py-24">
        <h2 id="follow-title" className="text-xl font-black">
          {c.channels}
        </h2>
        <SocialLinks variant="list" className="mt-6 max-w-xl" />
      </section>
    </>
  );
}
