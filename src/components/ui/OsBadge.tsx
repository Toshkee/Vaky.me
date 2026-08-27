import type { ReactNode } from "react";

/**
 * A small system label in the pixel face — the VibeLab OS voice. Bordered
 * like a key cap, never larger than a line, and always carrying either real
 * information (BESPLATAN KONCEPT, NAJTRAŽENIJI) or the OS branding itself.
 */
export function OsBadge({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "red";
  className?: string;
}) {
  const look =
    tone === "red" ? "border-red text-red" : "border-ink text-ink";
  return (
    <span
      className={`px inline-flex items-center gap-2 border-2 bg-paper px-2.5 py-1 text-[1.15rem] leading-none uppercase ${look} ${className}`}
    >
      {children}
    </span>
  );
}
