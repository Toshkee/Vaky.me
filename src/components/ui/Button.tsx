import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/landing/icons";

/**
 * The site's link-buttons, as pills.
 *
 *   primary    the red, with white on it (6.22:1). One per screen: it is the
 *              action the page is asking for.
 *   secondary  an ink outline that fills on hover.
 *   inverse    paper in a dark or red scene, where an outline would vanish.
 */
const LOOKS = {
  primary: "btn-primary bg-red text-white hover:bg-red-deep",
  secondary: "bg-transparent text-ink hover:bg-ink hover:text-paper",
  inverse: "border-paper bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper",
} as const;

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
  variant?: keyof typeof LOOKS;
  /** Trailing arrow, for the actions that go somewhere. */
  arrow?: boolean;
  className?: string;
  /** Analytics event name. Umami reads it off the element; no handler needed. */
  event?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(event ? { "data-umami-event": event } : {})}
      className={`btn group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 text-base ${LOOKS[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
      )}
    </a>
  );
}
