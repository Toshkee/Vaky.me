import Image from "next/image";
import { site } from "@/config/site";

/**
 * The Vaky.me lockup: the window mark, then the name set live in the pixel
 * face. The mark is pixel art and ships as a raster cut from the original
 * lockup (`scripts/wordmark-asset.mjs`); the name used to be part of that
 * raster and is text now, so it is selectable, readable by a crawler, and in
 * the same face as every headline on the page.
 *
 * `className` sets the height of the mark; the name is sized to match. The
 * mark is ink and brand red on transparency, so it needs a light ground.
 */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src="/vaky-mark.png"
        alt=""
        width={87}
        height={96}
        priority
        className={`w-auto ${className}`}
      />
      {/* The face has one weight. A 1px shadow in the same colour doubles
          every stroke on the pixel grid, which is how bitmap fonts were
          always emboldened; it stays crisp where a stroke would blur. */}
      <span className="px text-[1.5rem] leading-none whitespace-nowrap text-ink [text-shadow:1px_0_currentColor]">
        {site.name}
        <span className="text-[0.95rem] text-red">.me</span>
      </span>
    </span>
  );
}
