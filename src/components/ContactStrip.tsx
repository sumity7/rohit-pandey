import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import { href, type Locale } from "@/lib/i18n";

export default function ContactStrip({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <section aria-labelledby="contact-strip-title" className="surface-tint">
      <div className="shell flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="flex items-center gap-5">
          <span className="relative block size-16 shrink-0 overflow-hidden rounded-full bg-sand-deep md:size-20">
            <Image
              src={images.namaste.src}
              width={images.namaste.width}
              height={images.namaste.height}
              alt={t.contact.namasteAlt}
              sizes="80px"
              className="absolute left-1/2 top-[8%] w-[92%] max-w-none -translate-x-1/2"
            />
          </span>
          <h2 id="contact-strip-title" className="title-md text-red">
            {t.contact.strip}
          </h2>
        </div>
        <Link href={href(lang, "/contact")} className="btn shrink-0 bg-green-dk text-white hover:bg-green-deep">
          {t.contact.title}
        </Link>
      </div>
    </section>
  );
}
