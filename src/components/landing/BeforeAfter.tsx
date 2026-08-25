"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";

/**
 * The signature of the site: a 2015-era website wiping into its 2026
 * redesign. The divider handle is a red brush stroke; drag it. This IS the
 * pitch — everything else on the page just supports it.
 */
export function BeforeAfter({ dict }: { dict: Dictionary }) {
  const [value, setValue] = useState(55);
  const [intro, setIntro] = useState(true);

  return (
    <figure className="w-full">
      <div
        className={`ba-panel relative w-full rotate-[0.8deg] border border-line bg-ink-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${intro ? "ba-intro" : ""}`}
        style={{ "--ba": `${value}%` } as React.CSSProperties}
      >
        {/* minimal address bar — frames it as "a website", nothing more */}
        <div className="flex items-center border-b border-line px-4 py-2.5">
          <span className="select-none text-xs tracking-wide text-muted">
            {dict.hero.panel.url}
          </span>
        </div>

        <div className="relative aspect-[4/4.6] overflow-hidden sm:aspect-[4/3.2]">
          {/* ── the 2015 site ── */}
          <div aria-hidden="true" className="absolute inset-0">
            <OldSite />
            <span className="absolute right-2.5 top-2.5 bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
              {dict.hero.panel.oldLabel}
            </span>
          </div>

          {/* ── the 2026 site, clipped by the slider ── */}
          <div aria-hidden="true" className="ba-new absolute inset-0">
            <NewSite />
            <span className="absolute left-2.5 top-2.5 bg-red px-2 py-0.5 text-[11px] font-bold text-white">
              {dict.hero.panel.newLabel}
            </span>
          </div>

          {/* ── brush-stroke divider handle ── */}
          <div
            aria-hidden="true"
            className="ba-handle pointer-events-none absolute inset-y-0 z-10 w-5 -translate-x-1/2"
          >
            <svg
              viewBox="0 0 20 400"
              preserveAspectRatio="none"
              className="h-full w-full text-red"
              fill="currentColor"
            >
              <path d="M8 0 L14 0 C12 34 15 70 12 104 C10 140 14 176 11 212 C9 248 13 284 10 320 C9 348 12 376 10 400 L4 400 C6 364 3 328 6 292 C8 256 4 220 7 184 C9 148 5 112 8 76 C9 50 7 24 8 0 Z" />
            </svg>
            <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              ↔
            </span>
          </div>

          <input
            type="range"
            min={4}
            max={96}
            value={value}
            aria-label={`${dict.hero.panel.oldLabel} / ${dict.hero.panel.newLabel} — ${dict.hero.panel.dragHint}`}
            className="ba-range z-20"
            onChange={(e) => setValue(Number(e.target.value))}
            onPointerDown={() => setIntro(false)}
            onKeyDown={() => setIntro(false)}
          />
        </div>
      </div>

      <figcaption className="mt-4 pl-1 text-sm text-muted">
        {dict.hero.panel.caption}
      </figcaption>
    </figure>
  );
}

/* ── The 2015 pastiche: fictional "Konoba Primjer". Times, table layout,
     visitor counter. Every detail earned its place in a real 2015 site. ── */
function OldSite() {
  return (
    <div
      className="h-full w-full overflow-hidden bg-[#d6d2c8] p-2 text-black sm:p-3"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="h-full border border-[#888] bg-white">
        <div className="bg-[#000080] px-2 py-1.5 text-center">
          <span className="text-[13px] font-bold text-[#ffff00] sm:text-[15px]">
            *** KONOBA PRIMJER ***
          </span>
        </div>
        <div className="border-b border-[#aaa] bg-[#e8e8e8] px-2 py-1 text-center text-[10px] text-[#0000ee] underline sm:text-[11px]">
          Pocetna | O nama | Galerija | Kontakt
        </div>
        <div className="px-2.5 py-2 text-[10px] leading-snug sm:px-3 sm:text-[11.5px]">
          <p className="text-center text-[12px] font-bold text-[#cc0000] sm:text-[14px]">
            Dobro dosli na nas sajt!!!
          </p>
          <p className="mt-1.5">
            Konoba Primjer je najbolja konoba u gradu. Nudimo domaca jela po
            povoljnim cijenama. Posjetite nas!
          </p>
          <table className="mt-2 w-full border-collapse border border-[#999] text-[9px] sm:text-[10.5px]">
            <tbody>
              <tr className="bg-[#ffffcc]">
                <td className="border border-[#999] px-1 py-0.5 font-bold">Corba</td>
                <td className="border border-[#999] px-1 py-0.5">3 eura</td>
              </tr>
              <tr>
                <td className="border border-[#999] px-1 py-0.5 font-bold">Riba</td>
                <td className="border border-[#999] px-1 py-0.5">10 eura</td>
              </tr>
              <tr className="bg-[#ffffcc]">
                <td className="border border-[#999] px-1 py-0.5 font-bold">Meso</td>
                <td className="border border-[#999] px-1 py-0.5">11 eura</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-center text-[9px] italic text-[#555] sm:text-[10px]">
            Galerija je u izradi... Provjerite uskoro!
          </p>
          <div className="mx-auto mt-2 w-fit border border-[#999] bg-black px-2 py-0.5 text-[9px] text-[#00ff00] sm:text-[10px]">
            Posjeta: 004821
          </div>
          <p className="mt-2 text-center text-[8px] text-[#777] sm:text-[9px]">
            © 2015 · Sajt optimizovan za Internet Explorer, 1024x768
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── The 2026 redesign of the same fictional konoba ── */
function NewSite() {
  return (
    <div className="flex h-full w-full flex-col bg-konoba-bg text-konoba-cream">
      <div className="flex items-center justify-between px-3.5 pt-3 sm:px-5 sm:pt-4">
        <span className="font-serif text-[13px] italic sm:text-[15px]">Konoba Primjer</span>
        <span className="hidden text-[10px] tracking-[0.18em] text-konoba-cream/60 uppercase sm:block">
          Meni · Galerija · Kontakt
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-3.5 sm:px-5">
        <p className="text-[9px] tracking-[0.22em] text-konoba-terra uppercase sm:text-[10px]">
          Domaća kuhinja
        </p>
        <p className="font-serif mt-1.5 text-[22px] leading-[1.05] italic sm:text-[30px]">
          Sto uz vodu.
          <br />
          Riba s gradela.
        </p>
        <p className="mt-2 max-w-[24ch] text-[10px] leading-relaxed text-konoba-cream/70 sm:text-[11.5px]">
          Porodična konoba na obali — dnevni ulov, domaće vino i pedeset godina
          istog recepta.
        </p>
        <span className="mt-3 w-fit bg-konoba-terra px-3 py-1.5 text-[10px] font-semibold text-konoba-bg sm:text-[11px]">
          Rezerviši sto
        </span>
      </div>
      <div className="flex gap-1.5 px-3.5 pb-3.5 sm:px-5 sm:pb-5" aria-hidden="true">
        <div className="h-8 flex-1 bg-gradient-to-br from-konoba-terra/70 to-konoba-card sm:h-11" />
        <div className="h-8 flex-1 bg-gradient-to-br from-konoba-olive/60 to-konoba-card sm:h-11" />
        <div className="h-8 flex-1 bg-gradient-to-br from-konoba-cream/25 to-konoba-card sm:h-11" />
      </div>
    </div>
  );
}
