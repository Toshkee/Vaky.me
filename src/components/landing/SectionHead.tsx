import type { ReactNode } from "react";

/**
 * The recurring section header: a pixel marker, the title, and a square-dash
 * rule running to the margin — the page's table of contents rendered one
 * entry at a time. The icon is decoration; the heading carries the meaning.
 */
export function SectionHead({
  icon,
  title,
  aside,
}: {
  icon: ReactNode;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span aria-hidden="true" className="w-6 shrink-0 text-ink">
        {icon}
      </span>
      <h2 className="headline text-2xl sm:text-3xl">{title}</h2>
      <span aria-hidden="true" className="px-dashrule mt-1.5 min-w-6 flex-1" />
      {aside}
    </div>
  );
}
