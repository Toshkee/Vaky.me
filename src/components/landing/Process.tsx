import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A true sequence, so the day markers carry real information:
 * from the first message to a live site in seven days.
 */
export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="headline text-4xl sm:text-6xl">{dict.process.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.process.sub}</p>
        </Reveal>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 110}>
                <p className="text-sm font-bold tracking-[0.16em] text-red-soft uppercase">
                  {step.day}
                </p>
                <h3 className="headline mt-3 text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
