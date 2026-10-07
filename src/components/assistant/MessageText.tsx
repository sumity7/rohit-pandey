import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders an assistant reply as React elements (never as HTML): paragraphs,
 * "- " lists, **bold**, site paths such as /en/about as links, and external
 * https links. Anything else is shown as plain text.
 */

const INLINE = /(\*\*[^*\n]+\*\*|https?:\/\/[^\s<>()]+|\/(?:en|hi)(?:\/[A-Za-z0-9_\-#/]*)?)/g;
const linkClass = "font-semibold underline underline-offset-2 hover:text-red-dk";

function inline(text: string, onNavigate: () => void): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("http")) {
      const url = part.replace(/[.,;:!?]+$/, "");
      const rest = part.slice(url.length);
      return (
        <span key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {url}
          </a>
          {rest}
        </span>
      );
    }
    if (part.startsWith("/")) {
      return (
        <Link key={i} href={part} onClick={onNavigate} className={linkClass}>
          {part}
        </Link>
      );
    }
    return part;
  });
}

export default function MessageText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="ml-4 list-disc space-y-1">
        {items.map((item, i) => (
          <li key={i}>{inline(item, onNavigate)}</li>
        ))}
      </ul>,
    );
  };

  for (const line of text.split("\n")) {
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flushList();
    if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{inline(line.trim(), onNavigate)}</p>);
  }
  flushList();

  return <div className="space-y-2">{blocks}</div>;
}
