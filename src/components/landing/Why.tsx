import type { Dictionary } from "@/i18n";

export function Why({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr] sm:items-end">
          <h2 className="headline text-2xl sm:text-3xl">{dict.why.title}</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted sm:justify-self-end sm:text-right">
            {dict.why.sub}
          </p>
        </div>

        <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.why.items.map((item, index) => (
            <li key={item.title} className="border-t border-line pt-3">
              <p className="px text-2xl leading-none font-bold text-red">0{index + 1}</p>
              <h3 className="mt-2.5 font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
