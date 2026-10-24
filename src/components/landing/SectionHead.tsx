import type { ReactNode } from "react";

/**
 * A headline with part of it under the red marker. `mark` must be a piece of
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

/** The slate every scene opens on: its name, behind a short red rule. */
export function SceneLabel({
  name,
  tone = "paper",
  as: Tag = "p",
  id,
  className = "",
}: {
  name: string;
  /** The ground it sits on, which decides the colour of the rule. */
  tone?: "paper" | "ink" | "red";
  /** h2 where the slate is the only heading a scene has. */
  as?: "p" | "h2";
  id?: string;
  className?: string;
}) {
  const rule = tone === "ink" ? "[--slate:var(--color-red-bright)]" : tone === "red" ? "[--slate:#fff]" : "";
  return (
    <Tag id={id} className={`eyebrow slate ${rule} ${className}`}>
      {name}
    </Tag>
  );
}

/**
 * The recurring scene header: the slate, the title as a poster line, and a
 * line under it. Scenes are told apart by the slate and the ground they sit
 * on — no icons.
 */
export function SectionHead({
  title,
  mark,
  slate,
  sub,
  aside,
  tone = "paper",
  className = "",
}: {
  title: string;
  mark?: string;
  slate?: ReactNode;
  sub?: string;
  aside?: ReactNode;
  /** The ground it sits on, which decides the colour of the line under it. */
  tone?: "paper" | "ink";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-6 ${className}`}>
      <div className="max-w-4xl">
        {slate}
        <h2 className="display mt-4 text-poster-lg">
          <Marked text={title} mark={mark} />
        </h2>
        {sub && (
          <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${tone === "ink" ? "text-muted-dark" : "text-muted"}`}>
            {sub}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}
