import type { Dict } from "@/lib/dictionary";
import { office } from "@/lib/site";

/** Call and WhatsApp for the office, pinned to the bottom of phone screens. Renders only when the numbers are set. */
export default function StickyContact({ t }: { t: Dict }) {
  if (!office.phone && !office.whatsapp) return null;
  const o = t.contact.office;
  const cls = "flex min-h-12 flex-1 items-center justify-center px-4 text-sm font-semibold";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/20 bg-red-deep text-white shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.5)] md:hidden">
      {office.whatsapp && (
        <a href={`https://wa.me/${office.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${cls} bg-green-dk`}>
          {o.whatsapp}
        </a>
      )}
      {office.phone && (
        <a href={`tel:+${office.phone}`} className={cls}>
          {o.call}
        </a>
      )}
    </div>
  );
}
