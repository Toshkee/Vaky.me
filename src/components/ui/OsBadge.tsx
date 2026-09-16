import type { ReactNode } from "react";

/**
 * A small system label in the pixel face — the Vaky OS voice. Bordered
 * like a key cap, never larger than a line, and always carrying either real
 * information (BESPLATAN KONCEPT, NAJTRAŽENIJI) or the OS branding itself.
 *
 * The site uses ink and red. The two extra tones are the dashboard's status
 * colours — amber for "the client has it", green for "done" — and mean
 * nothing anywhere else.
 */
const TONES = {
  ink: "border-ink text-ink",
  red: "border-red text-red",
  amber: "border-amber text-amber",
  ok: "border-ok text-ok",
} as const;

export function OsBadge({
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
      className={`px inline-flex items-center gap-2 border-2 bg-paper px-2.5 py-1 text-[0.95rem] leading-none uppercase ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
