import type { Dictionary } from "@/i18n";

/** From the first message to a live site in seven days, as one ruled strip. */
export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
        <h2 className="headline text-2xl sm:text-3xl">{dict.process.title}</h2>

        <ol className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:mt-8 lg:grid-cols-4">
          {dict.process.steps.map((step) => (
            <li key={step.title} className="border-t border-line pt-3">
              <p className="eyebrow text-red">{step.day}</p>
              <h3 className="mt-1.5 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
