import type { Dictionary } from "@/i18n";
import { PlusIcon, QuestionIcon } from "./icons";
import { SectionHead } from "./SectionHead";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHead icon={<QuestionIcon />} title={dict.faq.title} />

        <div className="mt-6 max-w-3xl border-t-2 border-ink">
          {dict.faq.items.map((item, i) => (
            <details key={item.q} className="faq-item border-b border-line">
              <summary className="flex items-center gap-4 py-4 font-semibold">
                <span aria-hidden="true" className="px text-[1.15rem] leading-none text-muted">
                  0{i + 1}
                </span>
                <span className="flex-1">{item.q}</span>
                <PlusIcon className="faq-toggle w-4 shrink-0 text-red" />
              </summary>
              <p className="max-w-2xl pb-5 pl-9 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
