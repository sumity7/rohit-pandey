"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A link that also works when it points at a section of the page you are
 * already on. Next.js only scrolls when the address changes, so a second
 * click on "/en#social-service" would otherwise do nothing; here the page is
 * scrolled to the section every time. Links to other pages behave as usual.
 */
export default function SectionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || typeof href !== "string") return;
    const [path, hash] = href.split("#");
    if (!hash || path !== pathname) return;
    const target = document.getElementById(hash);
    if (!target) return;
    e.preventDefault();
    window.history.pushState(null, "", `${path}#${hash}`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return <Link href={href} onClick={handle} {...props} />;
}
