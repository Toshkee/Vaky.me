import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/landing/icons";

/**
 * The two CTAs of the pixel layer. `primary` is the solid red slab, beveled
 * and sitting on its own shadow; `secondary` is the same slab in paper and
 * ink. Both physically depress into their shadow when pressed.
 */
export function Button({
  href,
  children,
  external = false,
  variant = "primary",
  arrow = false,
  className = "",
  event,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
  /** Trailing pixel arrow, for the actions that go somewhere. */
  arrow?: boolean;
  className?: string;
  /** Analytics event name. Umami reads it off the element; no handler needed. */
  event?: string;
}) {
  const look =
    variant === "primary"
      ? "px-btn--primary bg-red text-white hover:bg-red-deep"
      : "bg-paper text-ink transition-colors hover:text-red";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(event ? { "data-umami-event": event } : {})}
      className={`px px-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[1.25rem] ${look} ${className}`}
    >
      {children}
      {arrow && <ArrowIcon className="w-4 shrink-0" />}
    </a>
  );
}
