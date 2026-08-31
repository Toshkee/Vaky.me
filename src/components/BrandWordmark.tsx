import Image from "next/image";
import { site } from "@/config/site";

/**
 * The Vaky.me lockup. It is pixel art, so it is shipped as a raster rather
 * than redrawn as a vector: at nav size the grid is the point, and a traced
 * SVG of the same thing would only be a heavier way to say it.
 *
 * `className` sets the height — the width follows the intrinsic ratio.
 * The mark is ink and brand red on transparency, so it needs a light ground;
 * anything placing it on ink needs its own asset, not a filter.
 */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-vaky.png"
      alt={`${site.name}.me`}
      width={402}
      height={96}
      priority
      className={`w-auto ${className}`}
    />
  );
}
