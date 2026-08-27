import type { ReactNode } from "react";

/**
 * The primary CTA: a solid red slab, beveled and sitting on its own shadow.
 * On a page made of rules it is the only filled shape, and now the only one
 * with thickness — pressing it moves it into its shadow rather than merely
 * changing its colour.
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
      className={`px px-btn px-btn--primary inline-flex items-center justify-center bg-red px-7 py-3.5 text-[1.25rem] text-white hover:bg-red-deep ${className}`}
    >
      {children}
    </a>
  );
}
