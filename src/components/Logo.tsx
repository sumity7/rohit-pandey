import Image from "next/image";

const LOGO = { src: "/images/rohit-pandey-logo.webp", width: 900, height: 254 };

/**
 * The client's logo (flag, cycle and the red/green Devanagari name) on its own
 * transparent ground. Its red lettering sits on red header/footer surfaces, so
 * a hairline white edge (drop-shadow, not a box) keeps the letters legible.
 */
export default function Logo({ size = "md", alt = "" }: { size?: "md" | "lg"; alt?: string }) {
  const big = size === "lg";
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt={alt}
      preload={!big}
      quality={85}
      sizes={big ? "260px" : "180px"}
      className={`block w-auto [filter:drop-shadow(0_0_0.75px_#fff)_drop-shadow(0_0_0.75px_#fff)_drop-shadow(0_1px_6px_rgb(0_0_0/0.25))] ${
        big ? "h-16 md:h-[4.5rem]" : "h-11 md:h-12"
      }`}
    />
  );
}
