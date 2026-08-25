import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Lora } from "next/font/google";
import { VibeCodeBar } from "@/components/demo/VibeCodeBar";
import { menuCategories, reviews } from "./data";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Konoba Skadar — Virpazar | Domaća kuhinja na Skadarskom jezeru",
  description:
    "Porodična konoba na obali Skadarskog jezera u Virpazaru. Dnevni ulov, domaće crmničko vino i tri generacije tradicije — od 1987. Rezervacije: +382 67 000 000.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-konoba-skadar.png"] },
};

const display = "[font-family:var(--font-playfair)]";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konoba-terra";

/* Two set quotes — the local regular and the visitor. No cards, no stars. */
const quotes = [reviews[0], reviews[2]];

function SpecialMark() {
  return (
    <>
      <span aria-hidden="true" className="mr-1.5 text-konoba-terra">
        ✻
      </span>
      <span className="sr-only">Specijalitet kuće: </span>
    </>
  );
}

export default function KonobaSkadarPage() {
  return (
    <div
      className={`${playfair.variable} ${lora.variable} min-h-screen bg-konoba-bg text-konoba-cream antialiased [font-family:var(--font-lora)]`}
    >
      <VibeCodeBar />

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-konoba-cream/10 bg-konoba-bg">
        <nav
          aria-label="Glavna navigacija"
          className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5"
        >
          <a
            href="#vrh"
            className={`${display} ${focusRing} text-lg tracking-wide`}
          >
            Konoba Skadar
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#meni"
              className={`${focusRing} hidden text-sm text-konoba-cream/70 transition-colors hover:text-konoba-terra sm:inline`}
            >
              Jelovnik
            </a>
            <a
              href="#kontakt"
              className={`${focusRing} hidden text-sm text-konoba-cream/70 transition-colors hover:text-konoba-terra sm:inline`}
            >
              Kontakt
            </a>
            <a
              href="tel:+38267000000"
              className={`${focusRing} whitespace-nowrap text-sm font-semibold text-konoba-terra transition-colors hover:text-konoba-cream`}
            >
              067 000 000
            </a>
          </div>
        </nav>
      </header>

      <main id="vrh">
        {/* Hero — the name, one line, and the number guests actually call. */}
        <section className="relative overflow-hidden px-5 pb-24 pt-24 text-center sm:pb-32 sm:pt-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_105%,rgba(196,104,47,0.14)_0%,transparent_65%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-konoba-cream/60">
              Virpazar · Skadarsko jezero
            </p>
            <h1
              className={`${display} mt-6 text-5xl leading-[1.05] sm:text-7xl`}
            >
              Konoba Skadar
            </h1>
            <p
              className={`${display} mt-5 text-lg italic text-konoba-cream/75 sm:text-xl`}
            >
              Domaća kuhinja na obali Skadarskog jezera — od 1987.
            </p>

            <span
              aria-hidden="true"
              className="mx-auto mt-12 block h-px w-16 bg-konoba-terra/70"
            />

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.35em] text-konoba-terra">
              Rezervacije
            </p>
            <a
              href="tel:+38267000000"
              className={`${display} ${focusRing} mt-3 inline-block whitespace-nowrap text-4xl tracking-wide transition-colors hover:text-konoba-terra sm:text-6xl`}
            >
              +382 67 000 000
            </a>
            <p className="mt-5 text-sm text-konoba-cream/60">
              ili pišite na{" "}
              <a
                href="viber://chat?number=%2B38267000000"
                className={`${focusRing} underline decoration-konoba-terra/60 underline-offset-4 transition-colors hover:text-konoba-terra`}
              >
                Viber
              </a>{" "}
              · svakog dana, 10–23 h
            </p>
          </div>
        </section>

        {/* Kuća — the whole story, two sentences. */}
        <section
          id="o-nama"
          className="scroll-mt-20 border-t border-konoba-cream/10 px-5 py-20"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className={`${display} text-2xl sm:text-3xl`}>
              Tri generacije uz jezero
            </h2>
            <p className="mt-6 leading-relaxed text-konoba-cream/75">
              Đed Blažo je 1987. na obali u Virpazaru otvorio konobu sa četiri
              stola i jednim ognjištem — ribari su donosili jutarnji ulov, a
              vino se točilo iz bureta. Tri generacije kasnije radimo isto:
              krap i jegulja stižu iz naše barke, vino iz crmničkih vinograda,
              a hljeb se peče ispod sača, dva puta dnevno.
            </p>
            <p className="mt-5 italic leading-relaxed text-konoba-cream/60">
              „Gost koji dođe jednom, vraća se kao prijatelj.“ — porodica
              Pejović
            </p>
          </div>
        </section>

        {/* Jelovnik — set like the house menu: paper, double rule, dotted leaders. */}
        <section
          id="meni"
          className="scroll-mt-20 border-t border-konoba-cream/10 px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="mx-auto max-w-3xl bg-konoba-cream p-2 text-konoba-bg sm:p-3">
            <div className="border border-konoba-bg/70 p-1">
              <div className="border border-konoba-bg/30 px-5 py-10 sm:px-12 sm:py-14">
                <header className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-konoba-bg/70">
                    Konoba Skadar · Virpazar
                  </p>
                  <h2 className={`${display} mt-4 text-4xl sm:text-5xl`}>
                    Jelovnik
                  </h2>
                  <p className="mt-3 text-sm italic text-konoba-bg/70">
                    domaća kuhinja · od 1987.
                  </p>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-7 flex items-center justify-center gap-2.5"
                  >
                    <span className="h-px w-16 bg-konoba-bg/40" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-konoba-terra" />
                    <span className="h-px w-16 bg-konoba-bg/40" />
                  </div>
                </header>

                <div className="mt-12 md:columns-2 md:gap-14">
                  {menuCategories.map((category) => (
                    <section
                      key={category.id}
                      className="mb-12 break-inside-avoid"
                    >
                      <h3
                        className={`${display} text-center text-xl tracking-wide`}
                      >
                        {category.title}
                      </h3>
                      {category.id === "riblja-jela" ? (
                        <p className="mt-1.5 text-center text-xs italic text-konoba-bg/70">
                          prema jutarnjem ulovu — pitajte šta je stiglo iz
                          barke
                        </p>
                      ) : null}
                      <span
                        aria-hidden="true"
                        className="mx-auto mt-3 block h-px w-10 bg-konoba-terra"
                      />
                      <ul className="mt-6 space-y-5">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-[15px] font-medium">
                                {item.special ? <SpecialMark /> : null}
                                {item.name}
                              </span>
                              <span
                                aria-hidden="true"
                                className="min-w-4 flex-1 -translate-y-0.5 border-b border-dotted border-konoba-bg/40"
                              />
                              <span className="whitespace-nowrap text-[15px] font-medium tabular-nums">
                                {item.price}
                              </span>
                            </div>
                            <p className="mt-1 text-[13px] italic leading-snug text-konoba-bg/70">
                              {item.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                <footer className="border-t border-konoba-bg/25 pt-5 text-center">
                  <p className="text-xs text-konoba-bg/80">
                    <span aria-hidden="true" className="text-konoba-terra">
                      ✻
                    </span>{" "}
                    specijalitet kuće
                  </p>
                  <p className="mt-1.5 text-[11px] text-konoba-bg/70">
                    Cijene su u eurima i uključuju PDV.
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </section>

        {/* Dvije riječi gostiju — set, not carded. */}
        <section
          aria-label="Riječi gostiju"
          className="border-t border-konoba-cream/10 px-5 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-3xl space-y-14">
            <figure className="max-w-xl">
              <blockquote
                className={`${display} text-2xl italic leading-snug text-konoba-cream/90`}
              >
                „{quotes[0].quote}“
              </blockquote>
              <figcaption className="mt-4 text-sm text-konoba-cream/60">
                — {quotes[0].name}, {quotes[0].note}
              </figcaption>
            </figure>
            <figure className="ml-auto max-w-xl">
              <blockquote
                lang="en"
                className={`${display} text-2xl italic leading-snug text-konoba-cream/90`}
              >
                “{quotes[1].quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-konoba-cream/60">
                — {quotes[1].name}, {quotes[1].note}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Rezervacije i lokacija */}
        <section
          id="kontakt"
          className="scroll-mt-20 border-t border-konoba-cream/10 px-5 py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[5fr_6fr] md:gap-16">
            <div>
              <h2 className={`${display} text-2xl sm:text-3xl`}>
                Rezervacije
              </h2>
              <a
                href="tel:+38267000000"
                className={`${display} ${focusRing} mt-5 inline-block whitespace-nowrap text-3xl tracking-wide transition-colors hover:text-konoba-terra sm:text-4xl`}
              >
                +382 67 000 000
              </a>
              <p className="mt-3 text-sm text-konoba-cream/70">
                ili pišite na{" "}
                <a
                  href="viber://chat?number=%2B38267000000"
                  className={`${focusRing} underline decoration-konoba-terra/60 underline-offset-4 transition-colors hover:text-konoba-terra`}
                >
                  Viber
                </a>
              </p>
              <p className="mt-5 text-sm leading-relaxed text-konoba-cream/60">
                Za grupe veće od osam osoba i jagnjetinu ispod sača — javite
                nam se dan ranije.
              </p>

              <div className="mt-10 border-t border-konoba-cream/15 pt-6">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-konoba-cream/80">
                    Ponedjeljak – Nedjelja
                  </span>
                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 -translate-y-0.5 border-b border-dotted border-konoba-cream/25"
                  />
                  <span className="whitespace-nowrap font-semibold tabular-nums">
                    10:00 – 23:00
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-konoba-cream/60">
                  Kuhinja prima posljednje porudžbine u 22:00. Terasa je
                  otvorena dok traje lijepo vrijeme.
                </p>
              </div>
            </div>

            <div>
              <h2 className={`${display} text-2xl sm:text-3xl`}>
                Obala 13, Virpazar
              </h2>
              <p className="mt-4 leading-relaxed text-konoba-cream/70">
                Na samoj obali, 30 metara od starog mosta. Parking uz obalu,
                vez za barke ispred konobe.
              </p>
              <address className="mt-3 text-sm not-italic text-konoba-cream/60">
                Obala 13, 81305 Virpazar, Crna Gora
              </address>
              <div className="mt-7 border border-konoba-cream/15">
                <iframe
                  title="Mapa — Virpazar, Skadarsko jezero"
                  src="https://www.google.com/maps?q=Virpazar%2C%20Crna%20Gora&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-72 w-full border-0 grayscale-[30%] sm:h-80"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-konoba-cream/10 px-5 py-10 text-center">
        <p className={`${display} text-lg tracking-wide`}>Konoba Skadar</p>
        <p className="mt-2 text-sm text-konoba-cream/60">
          Obala 13, 81305 Virpazar · Pon–Ned 10–23 h ·{" "}
          <a
            href="tel:+38267000000"
            className={`${focusRing} whitespace-nowrap transition-colors hover:text-konoba-terra`}
          >
            +382 67 000 000
          </a>
        </p>
        <p className="mt-4 text-xs text-konoba-cream/60">
          Sajt:{" "}
          <Link
            href="/"
            className={`${focusRing} underline decoration-konoba-terra/60 underline-offset-4 transition-colors hover:text-konoba-terra`}
          >
            VibeCode.me
          </Link>
        </p>
      </footer>
    </div>
  );
}
