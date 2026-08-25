import type { Dictionary } from "@/i18n";

/** Slow marquee of who this is for. Pure CSS; static row under reduced motion. */
export function Ticker({ dict }: { dict: Dictionary }) {
  const items = dict.ticker;

  const row = (hidden: boolean) => (
    <span
      aria-hidden={hidden || undefined}
      className="headline inline-flex shrink-0 items-center text-2xl text-white/90 sm:text-3xl"
    >
      {items.map((item) => (
        <span key={item} className="inline-flex items-center">
          <span className="px-5">{item}</span>
          <span aria-hidden="true" className="text-red">
            —
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="ticker border-y border-line py-4">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
