/**
 * Tabler outline icons (MIT licence, https://tabler.io/icons), inlined so the
 * site needs no icon package. Each entry lists the path data of the icon.
 */
const paths: Record<string, string[]> = {
  road: ["M4 19l4 -14", "M16 5l4 14", "M12 8v-2", "M12 13v-2", "M12 18v-2"],
  briefcase: [
    "M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2",
    "M12 12l0 .01",
    "M3 13a20 20 0 0 0 18 0",
  ],
  scale: ["M7 20l10 0", "M6 6l6 -1l6 1", "M12 3l0 17", "M9 12l-3 -6l-3 6a3 3 0 0 0 6 0", "M21 12l-3 -6l-3 6a3 3 0 0 0 6 0"],
  "plant-2": [
    "M2 9a10 10 0 1 0 20 0",
    "M12 19a10 10 0 0 1 10 -10",
    "M2 9a10 10 0 0 1 10 10",
    "M12 4a9.7 9.7 0 0 1 2.99 7.5",
    "M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5",
  ],
  "building-hospital": [
    "M3 21l18 0",
    "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16",
    "M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4",
    "M10 9l4 0",
    "M12 7l0 4",
  ],
  school: ["M22 9l-10 -4l-10 4l10 4l10 -4v6", "M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"],
  "map-pin": [
    "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
    "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z",
  ],
  share: [
    "M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M8.7 10.7l6.6 -3.4",
    "M8.7 13.3l6.6 3.4",
  ],
  x: ["M18 6l-12 12", "M6 6l12 12"],
};

export default function TablerIcon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      className={className}
    >
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}
