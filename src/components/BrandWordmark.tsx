import { site } from "@/config/site";

/** The "v" of the mark, in the 40-unit box the mark is drawn in. Shared with
    scripts/brand-assets.mjs and the share card — change it in all three. */
export const MARK_V = "M8.5 10.5h7.2l4.3 13.4 4.3-13.4h7.2L23.4 30.5h-6.8Z";

/**
 * The Vaky mark: a red tile with a white "v" cut from the same heavy Archivo
 * the titles are set in. It holds at 16px, and it is the studio's red from
 * the first vaky.me.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <rect width="40" height="40" rx="9" fill="var(--color-red)" />
      <path d={MARK_V} fill="#ffffff" />
    </svg>
  );
}

/**
 * The lockup: the mark, then the name set live in Archivo, so it is
 * selectable, readable by a crawler, and the same face as every headline.
 * Size it with font-size on the caller; the mark follows.
 */
export function BrandWordmark({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] leading-none ${className}`}>
      <BrandMark className="size-[1.05em] shrink-0" />
      <span
        className={`font-black tracking-[-0.04em] whitespace-nowrap [font-stretch:110%] ${
          tone === "ink" ? "text-ink" : "text-paper"
        }`}
      >
        {site.name.toLowerCase()}
      </span>
    </span>
  );
}
