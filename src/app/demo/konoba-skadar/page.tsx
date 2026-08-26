import type { Metadata } from "next";
import Link from "next/link";
import { Lora, Playfair_Display } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { menuCategories } from "./data";

const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], display: "swap", variable: "--font-playfair" });
const lora = Lora({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], display: "swap", variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Konoba Skadar — Virpazar | Dizajn koncept",
  description: "Dizajn koncept za konobu u Virpazaru sa jelovnikom, rezervacijama i lokacijom.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-konoba-skadar.png"] },
};

const display = "[font-family:var(--font-playfair),Georgia,serif]";
const label = "text-[11px] font-semibold tracking-[0.2em] uppercase";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a84f28]";
const primary = `inline-flex min-h-12 items-center justify-center bg-[#2c2119] px-7 text-sm font-semibold text-[#f7f0e4] transition-colors hover:bg-[#a84f28] ${focus}`;

export default function KonobaSkadarPage() {
  return (
    <div className={`${playfair.variable} ${lora.variable} min-h-screen bg-[#f6efe2] pb-20 text-[#2c2119] [font-family:var(--font-lora)] md:pb-0`}>
      <VibeLabBar />
      <header className="border-b border-[#2c2119]/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-1 sm:flex-row sm:justify-between sm:px-8 sm:py-2">
          <a href="#vrh" className={`${display} flex min-h-11 items-center text-xl font-semibold ${focus}`}>Konoba Skadar</a>
          <nav aria-label="Glavna navigacija" className="flex flex-wrap items-center justify-center gap-x-6">
            <a href="#jelovnik" className={`${label} py-3.5 hover:text-[#a84f28] ${focus}`}>Jelovnik</a>
            <a href="#rezervacije" className={`${label} py-3.5 hover:text-[#a84f28] ${focus}`}>Rezervacije</a>
            <a href="#lokacija" className={`${label} py-3.5 hover:text-[#a84f28] ${focus}`}>Lokacija</a>
          </nav>
        </div>
      </header>

      <main id="vrh">
        <section>
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-20">
            <div className="max-w-2xl">
              <p className={`${label} text-[#a84f28]`}>Virpazar · Skadarsko jezero</p>
              <h1 className={`${display} mt-4 text-5xl leading-tight sm:text-7xl`}>Domaća kuhinja uz jezero.</h1>
              <p className={`${display} mt-7 text-2xl italic sm:text-3xl`}>Riba, vino i miran sto.</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#2c2119]/65 sm:text-base">
                Jednostavan jelovnik sa jezerskom ribom i domaćim jelima. Za sto na terasi rezervišite unaprijed.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <a href="tel:+38267000000" className={primary}>Rezerviši sto</a>
                <p className="text-sm text-[#2c2119]/55">Svakog dana · 10:00–23:00</p>
              </div>
            </div>
          </div>
        </section>

        <section id="jelovnik" className="scroll-mt-6 border-t border-[#2c2119]/15 bg-[#fffaf1]">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-[#a84f28]`}>Jelovnik</p>
            <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <h2 className={`${display} text-3xl sm:text-4xl`}>Šta se služi</h2>
              <p className="max-w-sm text-sm text-[#2c2119]/55 sm:text-right">Otvorite kategoriju da pogledate jela i cijene.</p>
            </div>
            <div className="mt-9 grid gap-x-10 lg:grid-cols-2">
              {menuCategories.map((category, index) => (
                <details key={category.id} open={index === 0} className="group border-t border-[#2c2119]/20">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span className={`${display} text-2xl font-semibold`}>{category.title}</span>
                    <span aria-hidden="true" className="text-xl text-[#a84f28] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ul className="space-y-5 pb-7">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="font-semibold tabular-nums">{item.price}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-[#2c2119]/55">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#2c2119]/50">Ilustrativni jelovnik i cijene za potrebe koncepta — potvrditi prije objave.</p>
          </div>
        </section>

        <section id="rezervacije" className="scroll-mt-6 border-t border-[#2c2119]/15">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-[#a84f28]`}>Rezervacije</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Sto bez čekanja</h2>
            <div className="mt-9 grid gap-7 sm:grid-cols-3">
              {[
                ["01", "Pozovite", "Javite datum, vrijeme i broj gostiju."],
                ["02", "Potvrdite sto", "Za veće grupe javite se dan ranije."],
                ["03", "Dođite na obalu", "Sto vas čeka u dogovoreno vrijeme."],
              ].map(([number, title, body]) => (
                <div key={number} className="border-t border-[#2c2119]/20 pt-4"><p className={`${label} text-[#a84f28]`}>{number}</p><h3 className={`${display} mt-2 text-xl font-semibold`}>{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#2c2119]/60">{body}</p></div>
              ))}
            </div>
            <a href="tel:+38267000000" className={`${primary} mt-9`}>+382 67 000 000</a>
          </div>
        </section>

        <section id="lokacija" className="scroll-mt-6 bg-[#2c2119] text-[#f7f0e4]">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${label} text-[#e39a70]`}>Lokacija</p>
              <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Obala 13, Virpazar</h2>
              <address className="mt-7 not-italic"><p className="font-semibold">Obala 13, 81305 Virpazar, Crna Gora</p><p className="mt-3 text-sm text-[#f7f0e4]/60">Ponedjeljak–Nedjelja · 10:00–23:00</p></address>
              <a href="viber://chat?number=%2B38267000000" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#f7f0e4] px-7 font-semibold text-[#2c2119] hover:bg-white">Pošalji poruku</a>
            </div>
            <div className="border border-[#f7f0e4]/20 p-1.5"><iframe src="https://www.google.com/maps?q=Obala%2013%2C%2081305%20Virpazar%2C%20Crna%20Gora&output=embed" title="Mapa — Obala 13, 81305 Virpazar, Crna Gora" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0 grayscale-[30%] sm:h-80" /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#211812] text-[#f7f0e4]"><div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-center"><p className={`${display} text-lg`}>Konoba Skadar</p><p className="text-sm text-[#f7f0e4]/50">Obala 13, Virpazar · 10–23h</p><p className="mt-3 text-xs text-[#f7f0e4]/45">Koncept: <Link href="/" className="font-semibold text-[#e39a70] hover:underline">VibeLab.me</Link></p></div></footer>
      <a href="tel:+38267000000" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#2c2119] px-5 text-sm font-semibold text-[#f7f0e4] shadow-xl md:hidden ${focus}`}>Rezerviši sto</a>
    </div>
  );
}
