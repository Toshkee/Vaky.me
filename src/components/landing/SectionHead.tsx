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

/** "Scena 04 — Ekspertiza": the slate every scene opens on. */
export function SceneLabel({
  word,
  n,
  name,
  tone = "paper",
  className = "",
}: {
  word: string;
  n: number;
  name: string;
  tone?: "paper" | "ink" | "red";
  className?: string;
}) {
  const accent = tone === "ink" ? "text-red-bright" : tone === "red" ? "text-white" : "text-red";
  return (
    <p className={`eyebrow ${className}`}>
      <span className={accent}>
        {word} {String(n).padStart(2, "0")}
      </span>
      <span aria-hidden="true"> — </span>
      {name}
    </p>
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
        <h2 className="display mt-6 text-[clamp(3rem,8vw,7.5rem)]">
          <Marked text={title} mark={mark} />
        </h2>
        {sub && (
          <p className={`mt-6 max-w-xl text-lg leading-relaxed ${tone === "ink" ? "text-muted-dark" : "text-muted"}`}>
            {sub}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}
