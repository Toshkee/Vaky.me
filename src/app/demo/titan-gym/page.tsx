import type { Metadata } from "next";
import { Anton } from "next/font/google";
import Link from "next/link";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { plans, programs, schedule, stats, trainers } from "./data";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Titan Gym — Teretana u Podgorici | Otvoreno 06–23h",
  description:
    "Najopremljenija teretana u Podgorici: 1200 m², 80+ sprava, CrossFit, grupni i personalni treninzi. Prvi trening besplatan — Bulevar Josipa Broza 44.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-titan-gym.png"] },
};

const display = "font-[family-name:var(--font-anton)] uppercase";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-volt";

const btnVolt = `inline-flex items-center justify-center bg-titan-volt px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-titan-bg transition-colors duration-150 hover:bg-white ${focusRing}`;

const btnOutline = `inline-flex items-center justify-center border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-150 hover:border-titan-volt hover:text-titan-volt ${focusRing}`;

const navLinks = [
  { href: "#programi", label: "Programi" },
  { href: "#raspored", label: "Raspored" },
  { href: "#clanarine", label: "Cjenovnik" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function TitanGymPage() {
  return (
    <div
      className={`${anton.variable} min-h-screen bg-titan-bg font-sans text-white`}
    >
      <VibeLabBar />

      {/* ————— Nav ————— */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-titan-bg/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <span className={`${display} flex items-center gap-2.5 text-2xl tracking-wide`}>
            <span
              aria-hidden="true"
              className="inline-block h-5 w-2.5 bg-titan-volt"
            />
            Titan
          </span>
          <nav
            aria-label="Glavna navigacija"
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium text-white/70 transition-colors hover:text-titan-volt ${focusRing}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:+38267000000"
            className={`inline-flex items-center bg-titan-volt px-4 py-2 text-xs font-bold tracking-wider text-titan-bg uppercase transition-colors hover:bg-white ${focusRing}`}
          >
            Besplatan trening
          </a>
        </div>
      </header>

      {/* Section links scroll away instead of pinning — a two-row sticky header
          eats ~40% of a phone screen. */}
      <nav
        aria-label="Sekcije stranice"
        className="flex gap-6 overflow-x-auto border-b border-white/10 px-4 md:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`py-4 text-xs font-semibold tracking-wider whitespace-nowrap text-white/70 uppercase transition-colors hover:text-titan-volt ${focusRing}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <main>
        {/* ————— Hero ————— */}
        <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 md:pt-28 md:pb-20">
          <p className="text-xs font-bold tracking-[0.3em] text-titan-steel uppercase">
            Teretana · Bulevar Josipa Broza 44, Podgorica
          </p>
          <h1
            className={`${display} mt-6 text-[clamp(4rem,15vw,10rem)] leading-[0.87]`}
          >
            <span className="block">Kuj.</span>
            <span className="block">Svoju.</span>
            <span className="block text-titan-volt">Formu.</span>
          </h1>

          <p className="mt-12 flex flex-wrap gap-x-7 gap-y-1.5 border-y border-white/10 py-4 text-sm">
            {stats.map((stat) => (
              <span key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-titan-steel">{stat.label}</span>
              </span>
            ))}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="tel:+38267000000" className={btnVolt}>
              Prvi trening besplatan
            </a>
            <a
              href="#clanarine"
              className={`text-sm font-semibold text-white/80 underline decoration-titan-volt underline-offset-4 transition-colors hover:text-titan-volt ${focusRing}`}
            >
              Pogledaj cjenovnik
            </a>
          </div>
        </section>

        {/* ————— Programi ————— */}
        <section
          id="programi"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24"
        >
          <h2 className={`${display} text-4xl tracking-wide md:text-5xl`}>
            Programi
          </h2>
          <ul className="mt-10 border-t border-white/10">
            {programs.map((program) => (
              <li
                key={program.name}
                className="grid gap-x-10 gap-y-1 border-b border-white/10 py-5 md:grid-cols-[16rem_1fr] md:items-baseline"
              >
                <h3 className={`${display} text-2xl tracking-wide`}>
                  {program.name}
                </h3>
                <p className="text-sm leading-relaxed text-titan-steel md:text-base">
                  {program.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ————— Raspored — tabla ————— */}
        <section
          id="raspored"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24"
        >
          <div className="border border-white/15 bg-titan-card">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-white/15 px-5 py-4 sm:px-8">
              <h2 className={`${display} text-3xl tracking-wide md:text-4xl`}>
                Raspored
              </h2>
              <p className="text-[11px] font-bold tracking-[0.25em] text-titan-steel uppercase">
                Grupni treninzi · Pon–Sub
              </p>
            </div>

            <ul>
              {schedule.map((day) => (
                <li
                  key={day.day}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-b border-white/10 px-5 py-4 sm:grid-cols-[5rem_1fr] sm:px-8"
                >
                  <span className={`${display} text-2xl tracking-wide text-white/90`}>
                    <span aria-hidden="true">{day.short}</span>
                    <span className="sr-only">{day.day}</span>
                  </span>
                  <ul className="grid gap-y-1.5 sm:grid-cols-3 sm:gap-x-8">
                    {day.slots.map((slot) => (
                      <li
                        key={`${day.day}-${slot.time}`}
                        className="flex items-baseline gap-3"
                      >
                        <span
                          className={`${display} w-14 shrink-0 text-lg text-titan-volt`}
                        >
                          {slot.time}
                        </span>
                        <span className="text-sm text-white/85">
                          {slot.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 px-5 py-4 sm:grid-cols-[5rem_1fr] sm:px-8">
                <span className={`${display} text-2xl tracking-wide text-titan-steel`}>
                  <span aria-hidden="true">Ned</span>
                  <span className="sr-only">Nedjelja</span>
                </span>
                <p className="text-sm text-titan-steel">
                  Nema grupnih treninga — sala otvorena 09–15h.
                </p>
              </li>
            </ul>

            <div className="border-t border-white/15 px-5 py-3.5 sm:px-8">
              <p className="text-xs text-titan-steel">
                Broj mjesta po terminu je ograničen — rezerviši dolazak na
                recepciji ili telefonom.
              </p>
            </div>
          </div>
        </section>

        {/* ————— Cjenovnik — tabla ————— */}
        <section
          id="clanarine"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24"
        >
          <div className="border border-white/15 bg-titan-card">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-white/15 px-5 py-4 sm:px-8">
              <h2 className={`${display} text-3xl tracking-wide md:text-4xl`}>
                Cjenovnik
              </h2>
              <p className="text-[11px] font-bold tracking-[0.25em] text-titan-steel uppercase">
                Bez skrivenih troškova
              </p>
            </div>

            <ul>
              {plans.map((plan) => (
                <li
                  key={plan.name}
                  className={`relative grid grid-cols-[1fr_auto] items-start gap-x-6 border-b border-white/10 px-5 py-6 last:border-b-0 sm:px-8 ${
                    plan.highlighted ? "bg-titan-volt/5" : ""
                  }`}
                >
                  {plan.highlighted ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-full w-1 bg-titan-volt"
                    />
                  ) : null}
                  <div>
                    <h3 className={`${display} text-2xl tracking-wide`}>
                      {plan.name}
                    </h3>
                    {plan.highlighted ? (
                      <p className="mt-1 text-[11px] font-bold tracking-[0.25em] text-titan-volt uppercase">
                        Najtraženija
                      </p>
                    ) : null}
                  </div>
                  <p className="flex flex-col items-end text-right">
                    <span
                      className={`${display} text-5xl leading-none sm:text-6xl ${
                        plan.highlighted ? "text-titan-volt" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="mt-1.5 text-xs text-titan-steel">
                      {plan.period}
                    </span>
                  </p>
                  <p className="col-span-2 mt-3 max-w-2xl text-sm leading-relaxed text-titan-steel">
                    {plan.features.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
            <a href="tel:+38267000000" className={btnVolt}>
              Učlani se
            </a>
            <p className="inline-block -skew-x-6 bg-titan-volt px-5 py-3">
              <span className="inline-block skew-x-6 text-sm font-bold text-titan-bg">
                −15% za studente i parove — uz indeks ili zajednički upis.
              </span>
            </p>
          </div>
        </section>

        {/* ————— Treneri ————— */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className={`${display} text-4xl tracking-wide md:text-5xl`}>
            Treneri
          </h2>
          <ul className="mt-10 max-w-3xl border-t border-white/10">
            {trainers.map((trainer) => (
              <li
                key={trainer.name}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-0.5 border-b border-white/10 py-4"
              >
                <h3 className={`${display} text-xl tracking-wide`}>
                  {trainer.name}
                </h3>
                <p className="text-sm text-titan-steel">{trainer.specialty}</p>
              </li>
            ))}
          </ul>

          <figure className="mt-14 max-w-2xl border-l-2 border-titan-volt pl-5 md:pl-7">
            <blockquote className="text-lg leading-relaxed text-white/85 md:text-xl">
              „Za šest mjeseci u Titanu uradio sam više nego za tri godine
              treniranja na svoju ruku. Sala nikad nije pretrpana, a treneri te
              stvarno guraju naprijed.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-titan-steel">
              Marko V. — član od 2024.
            </figcaption>
          </figure>
        </section>

        {/* ————— Kontakt ————— */}
        <section
          id="kontakt"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-24"
        >
          <h2 className={`${display} text-4xl tracking-wide md:text-5xl`}>
            Kontakt
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold tracking-[0.25em] text-titan-steel uppercase">
                Adresa
              </h3>
              <p className="mt-2 text-lg font-medium">
                Bulevar Josipa Broza 44, Podgorica
              </p>

              <h3 className="mt-8 text-xs font-bold tracking-[0.25em] text-titan-steel uppercase">
                Radno vrijeme
              </h3>
              <ul className="mt-2 max-w-sm">
                {[
                  ["Ponedjeljak — Petak", "06:00 – 23:00"],
                  ["Subota", "08:00 – 22:00"],
                  ["Nedjelja", "09:00 – 15:00"],
                ].map(([days, hours]) => (
                  <li
                    key={days}
                    className="flex items-baseline justify-between gap-6 border-b border-white/10 py-2.5 last:border-b-0"
                  >
                    <span className="text-sm text-white/85">{days}</span>
                    <span className="font-semibold text-titan-volt tabular-nums">
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="tel:+38267000000" className={btnVolt}>
                  +382 67 000 000
                </a>
                <a
                  href="viber://chat?number=%2B38267000000"
                  className={btnOutline}
                >
                  Piši na Viber
                </a>
              </div>
            </div>

            <div className="border border-white/15">
              <iframe
                src="https://www.google.com/maps?q=Bulevar%20Josipa%20Broza%2044%2C%20Podgorica%2C%20Crna%20Gora&output=embed"
                title="Mapa — Titan Gym, Bulevar Josipa Broza 44, Podgorica"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full lg:h-full lg:min-h-96 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.4)]"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ————— Footer ————— */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <span className={`${display} flex items-center gap-2.5 text-xl tracking-wide`}>
            <span
              aria-hidden="true"
              className="inline-block h-4 w-2 bg-titan-volt"
            />
            Titan
          </span>
          <p className="text-sm text-titan-steel">
            Pon–Pet 06–23h · Sub 08–22h · Ned 09–15h
          </p>
          <p className="text-xs text-titan-steel">
            Sajt:{" "}
            <Link
              href="/"
              className={`font-semibold text-titan-volt underline-offset-4 hover:underline ${focusRing}`}
            >
              VibeLab.me
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
