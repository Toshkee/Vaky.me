import { useId } from "react";
import { site } from "@/config/site";

/**
 * The Vaky mark: a sun going down into the Adriatic. One disc, one wave —
 * it holds at 16px as an orange circle with a dark foot, and it is the same
 * shape the films open and close on.
 *
 * On the ink band the sea turns to foam, or it would vanish into the ground.
 */
export function BrandMark({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const clip = useId();
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clip}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="40" height="40" fill="var(--color-sun)" />
        <path
          d="M0 25c6.7-3.6 13.3-3.6 20 0s13.3 3.6 20 0V40H0Z"
          fill={tone === "ink" ? "var(--color-ink)" : "var(--color-foam)"}
        />
      </g>
    </svg>
  );
}

/**
 * The lockup: the mark, then the name set live in Archivo at full width and
 * weight, so it is selectable, readable by a crawler, and the same face as
 * every headline. Size it with font-size on the caller; the mark follows.
 */
export function BrandWordmark({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] leading-none ${className}`}>
      <BrandMark tone={tone} className="size-[1.1em] shrink-0" />
      <span
        className={`font-black tracking-[-0.045em] whitespace-nowrap [font-stretch:125%] ${
          tone === "ink" ? "text-ink" : "text-paper"
        }`}
      >
        {site.name.toLowerCase()}
      </span>
    </span>
  );
}
