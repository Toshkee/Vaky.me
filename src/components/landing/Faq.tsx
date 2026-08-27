import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { PlusIcon } from "./icons";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">{dict.faq.title}</h2>
        </Reveal>

        <div className="mt-6 max-w-3xl border-t-2 border-ink">
          {dict.faq.items.map((item) => (
            <details key={item.q} className="faq-item border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-4 font-semibold">
                {item.q}
                <PlusIcon className="faq-toggle w-4 shrink-0 text-red" />
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
