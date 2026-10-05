"use client";

import { useEffect, useRef, useState } from "react";

const MIN = 180;
const MAX = 500;
const HEIGHT = 640;

/**
 * Facebook Page plugin sized to its container. The plugin only accepts a
 * width between 180 and 500px, so the width is measured and passed in, and
 * re-measured when the container changes (rotation, resize). That keeps post
 * text from clipping on a 375px phone.
 */
export default function FacebookEmbed({ pageUrl, title }: { pageUrl: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(MIN, Math.min(MAX, Math.floor(el.clientWidth))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = width
    ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=${HEIGHT}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`
    : undefined;

  return (
    <div ref={box} data-adapt-container-width="true" className="w-full" style={{ minHeight: HEIGHT }}>
      {src && (
        <iframe
          title={title}
          src={src}
          width={width ?? undefined}
          height={HEIGHT}
          loading="lazy"
          allow="encrypted-media"
          className="mx-auto block max-w-full overflow-hidden rounded-md border border-line bg-sand"
        />
      )}
    </div>
  );
}
