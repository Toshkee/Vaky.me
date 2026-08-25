import type { ReactNode } from "react";

/**
 * The primary CTA: a red brush-painted rectangle, slightly tilted — like a
 * painted label on a wall. Rough SVG edges, sharp everywhere else.
 */
export function PaintedButton({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-block -rotate-1 px-8 py-4 font-bold text-white transition-transform hover:rotate-0 focus-visible:rotate-0 ${className}`}
    >
      <svg
        viewBox="0 0 240 64"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-red transition-colors group-hover:text-red-bright"
        fill="currentColor"
      >
        <path d="M4 8 C40 5 78 7 120 5 C160 3 200 6 236 4 L238 20 L235 41 L237 58 C198 61 158 58 118 60 C80 62 40 59 5 61 L2 44 L4 26 Z" />
        <path d="M8 62 C30 63 52 62 70 63 L69 64 C48 64 26 64 9 64 Z" opacity="0.5" />
      </svg>
      <span className="relative">{children}</span>
    </a>
  );
}
