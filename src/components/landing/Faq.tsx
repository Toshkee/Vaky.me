import type { Dictionary } from "@/i18n";
import { PlusIcon } from "./icons";

/**
 * Native <details> rows: keyboard, screen readers and find-in-page work
 * without a line of script. The title stays put beside the list from lg up,
 * so a long open answer never leaves the reader without a heading.
 */
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="shell grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2 className="headline display text-[clamp(2.25rem,5.2vw,4.25rem)] lg:sticky lg:top-28">
            {dict.faq.title}
          </h2>
        </div>

        <div className="border-t border-line-strong">
          {dict.faq.items.map((item) => (
            <details key={item.q} className="faq-item border-b border-line">
              <summary className="flex items-center gap-5 py-6 text-lg font-semibold sm:text-xl">
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="faq-toggle flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink"
                >
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pr-14 pb-7 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
