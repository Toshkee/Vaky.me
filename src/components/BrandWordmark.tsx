import { site } from "@/config/site";

/**
 * Text-only bridge for the Vaky rebrand. The final logo can replace this
 * component later without touching every header that carries the brand.
 */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-[-0.055em] text-ink ${className}`}
    >
      {site.name}
      <span aria-hidden="true" className="text-red">
        .
      </span>
    </span>
  );
}
