import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="headline text-5xl sm:text-6xl">{dict.faq.title}</h2>
        </Reveal>

        <div className="mt-10">
          {dict.faq.items.map((item) => (
            <details key={item.q} className="faq-item border-t border-line last:border-b">
              <summary className="flex items-center justify-between gap-6 py-5 text-lg font-semibold">
                {item.q}
                <span
                  aria-hidden="true"
                  className="faq-toggle shrink-0 text-2xl leading-none font-normal text-red"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
