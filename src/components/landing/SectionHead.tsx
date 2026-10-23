import type { ReactNode } from "react";

/**
 * A headline with part of it under the sun marker. `mark` must be a piece of
 * `text` exactly as written; if it is not there, the headline is printed
 * plain rather than wrong. `now` draws the marker on load instead of on
 * scroll, for a headline already on screen when the page opens.
 */
export function Marked({ text, mark, now = false }: { text: string; mark?: string; now?: boolean }) {
  const at = mark ? text.indexOf(mark) : -1;
  if (!mark || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className={`mark ${now ? "mark--now" : ""}`}>{mark}</span>
      {text.slice(at + mark.length)}
    </>
  );
}

/**
 * The recurring section header: an optional eyebrow, the title at display
 * size, and a line under it. Sections are told apart by the headline and the
 * ground they sit on — no icons, no numbering.
 */
export function SectionHead({
  title,
  mark,
  eyebrow,
  sub,
  aside,
  tone = "paper",
  className = "",
}: {
  title: string;
  mark?: string;
  eyebrow?: string;
  sub?: string;
  aside?: ReactNode;
  /** The ground it sits on, which decides the colour of the line under it. */
  tone?: "paper" | "ink";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-6 ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow eyebrow--dot mb-5">{eyebrow}</p>}
        <h2 className="headline display text-[clamp(2.25rem,5.2vw,4.25rem)]">
          <Marked text={title} mark={mark} />
        </h2>
        {sub && <p className={`mt-5 max-w-xl text-lg leading-relaxed ${tone === "ink" ? "text-muted-dark" : "text-muted"}`}>{sub}</p>}
      </div>
      {aside}
    </div>
  );
}
