import { SHOW_CONTENT_SLOTS } from "@/lib/site";

/** A clearly marked placeholder for material the client still has to supply. */
export default function ContentSlot({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!SHOW_CONTENT_SLOTS) return null;
  return (
    <aside
      data-content-slot
      className={`flex items-start gap-3 rounded-md border border-dashed border-sand-deep bg-paper/70 px-4 py-3 text-sm text-muted ${className}`}
    >
      <span className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-red/70" aria-hidden />
      <span>
        <span className="font-semibold text-ink-soft">{label}: </span>
        {children}
      </span>
    </aside>
  );
}
