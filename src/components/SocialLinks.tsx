import { socials, type SocialId } from "@/lib/site";

function Icon({ id }: { id: SocialId }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;
  if (id === "facebook")
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.3-1.4 1.4-1.4h1.5V5.1c-.3 0-1.1-.1-2.1-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.3v2.9h2.4V21h2.8Z" />
      </svg>
    );
  if (id === "instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.9" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  if (id === "youtube")
    return (
      <svg {...common} fill="currentColor">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
      </svg>
    );
  return (
    <svg {...common} fill="currentColor">
      <path d="M17.6 3.5h2.9l-6.3 7.2 7.4 9.8h-5.8l-4.5-5.9-5.2 5.9H3.2l6.7-7.7L2.8 3.5h5.9l4.1 5.4 4.8-5.4Zm-1 15.3h1.6L7.5 5.1H5.8l10.8 13.7Z" />
    </svg>
  );
}

export default function SocialLinks({
  variant = "icons",
  className = "",
}: {
  variant?: "icons" | "list";
  className?: string;
}) {
  if (variant === "list") {
    return (
      <ul className={`divide-y divide-line border-y border-line ${className}`}>
        {socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="group flex min-h-14 items-center gap-4 py-3 transition-colors hover:text-red"
            >
              <span className="grid size-9 place-items-center rounded-full border border-line transition-colors group-hover:border-red">
                <Icon id={s.id} />
              </span>
              <span className="text-sm font-semibold">{s.label}</span>
              {s.handle && <span className="ml-auto min-w-0 truncate text-sm text-muted">{s.handle}</span>}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={s.label}
            title={s.label}
            className="grid size-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-red hover:text-red"
          >
            <Icon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
