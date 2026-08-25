import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/** Plain definition list — no boxes, no icons. The words do the work. */
export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="usluge" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="headline text-4xl sm:text-6xl">{dict.services.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.services.sub}</p>
        </Reveal>

        <dl className="mt-10 grid gap-x-16 gap-y-8 sm:mt-14 sm:grid-cols-2 sm:gap-y-10">
          {dict.services.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 90}>
              <dt className="text-lg font-bold">
                <span aria-hidden="true" className="mr-2.5 text-red-bright">
                  —
                </span>
                {item.title}
              </dt>
              <dd className="mt-2 leading-relaxed text-muted">{item.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
