import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/**
 * One slim strip: from the first message to a live site in seven days.
 * Four steps in a row on desktop, a tight 2-col grid on mobile.
 */
export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 className="headline text-2xl sm:text-3xl">{dict.process.title}</h2>
            <p className="text-sm text-muted">{dict.process.sub}</p>
          </div>
        </Reveal>

        <ol className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 80}>
                <p className="eyebrow text-red">{step.day}</p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
