import type { Dictionary } from "@/i18n";

/**
 * One specific claim, set huge. The text fills from dark to white as it
 * crosses the viewport (pure CSS scroll-driven; plain white where
 * unsupported). The number stays red throughout.
 */
export function Statement({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-28">
        <p className="fill-text headline max-w-4xl text-[clamp(2rem,5.4vw,3.8rem)]">
          <span className="fill-accent text-red">{dict.statement.figure}</span>{" "}
          {dict.statement.rest}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {dict.statement.small}
        </p>
      </div>
    </section>
  );
}
