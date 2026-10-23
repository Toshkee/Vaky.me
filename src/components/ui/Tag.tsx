import type { ReactNode } from "react";

/**
 * A small label, never larger than a line, always carrying real information
 * (BESPLATAN KONCEPT, OPCIONO, a dashboard status). `red` is the filled one,
 * for the single thing on a screen that should be noticed; the two status
 * tones belong to the dashboard — amber for "the client has it", green for
 * "done" — and mean nothing anywhere else.
 */
const TONES = {
  ink: "border-ink text-ink",
  red: "border-red bg-red text-white",
  amber: "border-amber text-amber",
  ok: "border-ok text-ok",
} as const;

export function Tag({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-2.5 py-1 text-[0.6875rem] leading-none font-semibold tracking-[0.12em] uppercase ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
