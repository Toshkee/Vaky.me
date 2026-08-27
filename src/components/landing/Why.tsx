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
          {/* The four reasons are parallel, not sequential — a numeral above each
              one implied an order that does not exist. The red rule carries the
              accent the numerals used to, and says nothing untrue. */}
          {dict.why.items.map((item) => (
            <li key={item.title} className="border-t-2 border-red pt-3">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
