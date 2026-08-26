import type { ReactNode } from "react";

/**
 * The primary CTA: a solid red slab. One weight, one colour, no ornament —
 * the editorial layout does the talking, the button just has to be obvious.
 */
export function Button({
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
      className={`inline-flex items-center justify-center bg-red px-7 py-4 font-semibold text-white transition-colors duration-150 hover:bg-red-deep ${className}`}
    >
      {children}
    </a>
  );
}
