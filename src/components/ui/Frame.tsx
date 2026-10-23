import type { ReactNode } from "react";

/**
 * A framed surface: soft corners, a hairline, the pane colour of the caller's
 * choosing. For things that read as one object — a form, a portrait, a
 * dialog — and never nested inside another one.
 *
 * `title` is an optional quiet label across the top. It is decoration, so it
 * is hidden from screen readers: every screen that uses this component
 * renders its own real heading inside the pane, and this prop must never
 * stand in for that heading.
 */
export function Frame({
  children,
  className = "",
  pane = "bg-paper",
  title,
}: {
  children: ReactNode;
  className?: string;
  /** Ground colour of the pane. */
  pane?: string;
  title?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.25rem] border border-line ${pane} ${className}`}>
      {title && (
        <div aria-hidden="true" className="eyebrow eyebrow--dot border-b border-line px-5 py-3 text-muted">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
