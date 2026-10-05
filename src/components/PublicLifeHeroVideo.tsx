"use client";

import { useEffect, useRef, useState } from "react";

const FILES = {
  wide: "/videos/rohit-pandey-public-life-hero.mp4",
  tall: "/videos/rohit-pandey-public-life-hero-9x16.mp4",
};
const SPEED = 0.5;

/**
 * Public Life hero video, filling its parent. A 16:9 film plays from tablet
 * width up, a separate 9:16 film on phones; only one of them is ever requested. It starts on its
 * own, muted, loops, plays inline and is held at exactly 0.5x. With reduced
 * motion the still photograph is shown instead. The captions are part of
 * the film, so on phones it is shown whole at 9:16; on larger screens it
 * covers the header and is framed to keep the faces and the captions.
 */
export default function PublicLifeHeroVideo({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  // Chosen after mount, so the server never asks for a file the screen will not use
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const pick = () => setSource(reduce.matches ? null : wide.matches ? FILES.wide : FILES.tall);
    pick();
    reduce.addEventListener("change", pick);
    wide.addEventListener("change", pick);
    return () => {
      reduce.removeEventListener("change", pick);
      wide.removeEventListener("change", pick);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !source) return;
    video.muted = true;
    video.defaultMuted = true;
    video.defaultPlaybackRate = SPEED;

    // Browsers can reset the rate on load, play, seek and loop; put it back every time
    const lock = () => {
      if (video.playbackRate !== SPEED) video.playbackRate = SPEED;
    };
    const events = ["loadedmetadata", "loadeddata", "play", "playing", "seeked", "ended", "ratechange"] as const;
    events.forEach((e) => video.addEventListener(e, lock));
    lock();

    // Plays while on screen, pauses when scrolled away
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);

    return () => {
      events.forEach((e) => video.removeEventListener(e, lock));
      io.disconnect();
    };
  }, [source]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-red-deep">
      {/* The still shows while the film loads and replaces it under reduced motion */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/videos/rohit-pandey-public-life-hero-poster.webp" />
        <img
          src="/videos/rohit-pandey-public-life-hero-9x16-poster.webp"
          alt={source ? "" : label}
          width={720}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover md:object-[50%_75%]"
        />
      </picture>

      {source && (
        <video
          ref={ref}
          key={source}
          src={source}
          aria-label={label}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 md:object-[50%_75%] ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
