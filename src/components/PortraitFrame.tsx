import Image from "next/image";

/**
 * Every cutout portrait sits in the same light studio arch (see
 * `.portrait-frame`). `flush` drops the base radius and flag line for frames
 * that sit on the bottom edge of a coloured band.
 */
export default function PortraitFrame({
  image,
  alt,
  sizes,
  className = "",
  inset = "pt-[12%] px-[6%]",
  flush = false,
  preload = false,
}: {
  image: { src: string; width: number; height: number };
  alt: string;
  sizes: string;
  className?: string;
  /** Padding that places the figure inside the arch */
  inset?: string;
  flush?: boolean;
  preload?: boolean;
}) {
  return (
    <div className={`portrait-frame ${inset} ${className}`} data-flush={flush || undefined}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        preload={preload}
        quality={85}
        className="relative mx-auto block h-auto w-full"
      />
    </div>
  );
}
