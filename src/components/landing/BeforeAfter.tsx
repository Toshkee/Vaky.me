"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";

/**
 * The signature of the site: a 2015-era website next to its 2026 redesign.
 *
 * Two presentations, because one does not fit both devices:
 *  · phone  — the two pages stacked, each at full width, nothing cropped.
 *             A vertical wipe at ~350px slices words in half and reads as a
 *             rendering bug, which is the opposite of the point.
 *  · ≥640px — the draggable wipe, where there is width for it to work.
 */
export function BeforeAfter({ dict }: { dict: Dictionary }) {
  const [value, setValue] = useState(52);
  const [intro, setIntro] = useState(true);

  return (
    <figure className="w-full">
      {/* ── phone: stacked, both complete ── */}
      <div className="flex flex-col sm:hidden">
        <Frame label={dict.hero.panel.oldLabel} tone="old" url={dict.hero.panel.url}>
          <OldSite />
        </Frame>

        <div className="flex items-center gap-3 py-3" aria-hidden="true">
          <span className="h-px flex-1 bg-line" />
          <span className="text-2xl leading-none text-red">↓</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Frame label={dict.hero.panel.newLabel} tone="new" url={dict.hero.panel.url}>
          <NewSite />
        </Frame>
      </div>

      {/* ── desktop: the draggable wipe ── */}
      <div
        className={`ba-panel relative hidden w-full border border-line bg-ink-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:block sm:rotate-[0.8deg] ${intro ? "ba-intro" : ""}`}
        style={{ "--ba": `${value}%` } as React.CSSProperties}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="select-none text-xs tracking-wide text-muted">
            {dict.hero.panel.url}
          </span>
        </div>

        <div className="relative aspect-[4/3.2] overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0">
            <OldSite />
          </div>
          <div aria-hidden="true" className="ba-new absolute inset-0">
            <NewSite />
          </div>

          <span
            aria-hidden="true"
            className="absolute left-2 top-2 z-[5] bg-red px-2 py-0.5 text-[11px] font-bold tracking-wide text-white"
          >
            {dict.hero.panel.newLabel}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 z-[5] bg-black/75 px-2 py-0.5 text-[11px] font-bold tracking-wide text-white/80"
          >
            {dict.hero.panel.oldLabel}
          </span>

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
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.55)]">
              ↔
            </span>
          </div>

          <input
            type="range"
            min={6}
            max={94}
            value={value}
            aria-label={`${dict.hero.panel.oldLabel} / ${dict.hero.panel.newLabel} — ${dict.hero.panel.dragHint}`}
            className="ba-range z-20"
            onChange={(e) => setValue(Number(e.target.value))}
            onPointerDown={() => setIntro(false)}
            onKeyDown={() => setIntro(false)}
          />
        </div>
      </div>

      <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted">
        <span aria-hidden="true" className="hidden text-red-bright sm:inline">
          ↔
        </span>
        {dict.hero.panel.caption}
      </figcaption>
    </figure>
  );
}

/** One labelled browser frame — used for the stacked phone layout. */
function Frame({
  label,
  tone,
  url,
  children,
}: {
  label: string;
  tone: "old" | "new";
  url: string;
  children: ReactNode;
}) {
  const isNew = tone === "new";
  return (
    <div
      className={`overflow-hidden border ${
        isNew ? "border-red/45 shadow-[0_16px_44px_rgba(0,0,0,0.5)]" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line bg-ink-2 px-3 py-2">
        <span className="flex items-center gap-2 truncate">
          <span className="h-2 w-2 shrink-0 rounded-full bg-white/20" aria-hidden="true" />
          <span className="truncate text-[11px] tracking-wide text-muted">{url}</span>
        </span>
        <span
          className={`shrink-0 px-2 py-0.5 text-[11px] font-bold tracking-wide ${
            isNew ? "bg-red text-white" : "bg-white/10 text-white/70"
          }`}
        >
          {label}
        </span>
      </div>
      <div className={`aspect-[4/3.1] ${isNew ? "" : "opacity-90 saturate-[0.85]"}`}>
        {children}
      </div>
    </div>
  );
}

/* ── The 2015 pastiche: fictional "Konoba Primjer". ── */
function OldSite() {
  return (
    <div
      className="h-full w-full overflow-hidden bg-[#c9c5bb] p-2 text-black"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="flex h-full flex-col border border-[#8a8a8a] bg-white">
        <div className="bg-[#000080] py-1.5 text-center">
          <span className="text-[13px] font-bold text-[#ffff00]">
            *** KONOBA PRIMJER ***
          </span>
        </div>
        <div className="border-b border-[#aaa] bg-[#e3e3e3] py-1 text-center text-[10px] text-[#0000ee] underline">
          Pocetna | Meni | Galerija | Kontakt
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-2.5 py-2 text-center">
          <p className="text-[13px] font-bold text-[#cc0000]">Dobro dosli na nas sajt!!!</p>
          <p className="text-[10px] leading-tight">
            Najbolja konoba u gradu. Domaca jela po povoljnim cijenama.
          </p>

          <table className="w-full border-collapse border border-[#999] text-[10px]">
            <tbody>
              <tr className="bg-[#ffffcc]">
                <td className="border border-[#999] px-1.5 py-0.5 text-left">Corba</td>
                <td className="border border-[#999] px-1.5 py-0.5 text-right">3 eura</td>
              </tr>
              <tr>
                <td className="border border-[#999] px-1.5 py-0.5 text-left">Riba</td>
                <td className="border border-[#999] px-1.5 py-0.5 text-right">10 eura</td>
              </tr>
              <tr className="bg-[#ffffcc]">
                <td className="border border-[#999] px-1.5 py-0.5 text-left">Meso</td>
                <td className="border border-[#999] px-1.5 py-0.5 text-right">11 eura</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[9px] italic text-[#555]">Galerija je u izradi...</p>
          <div className="border border-[#999] bg-black px-2 py-0.5 text-[9px] text-[#00ff00]">
            Posjeta: 004821
          </div>
        </div>

        <p className="bg-[#e3e3e3] py-1 text-center text-[8px] text-[#666]">
          © 2015 · Best viewed in Internet Explorer 1024x768
        </p>
      </div>
    </div>
  );
}

/* ── The 2026 redesign of the same fictional konoba. ── */
function NewSite() {
  return (
    <div className="flex h-full w-full flex-col bg-konoba-bg text-konoba-cream">
      <div className="flex items-center justify-between border-b border-konoba-cream/10 px-4 py-2.5">
        <span className="font-serif text-[13px] italic">Konoba Primjer</span>
        <span className="text-[9px] tracking-[0.18em] text-konoba-cream/55 uppercase">
          Meni · Kontakt
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4">
        <p className="text-[9px] tracking-[0.24em] text-konoba-terra uppercase">
          Domaća kuhinja
        </p>
        <p className="font-serif mt-2 text-[23px] leading-[1.1] italic">
          Sto uz vodu.
          <br />
          Riba s gradela.
        </p>
        <p className="mt-2.5 max-w-[30ch] text-[10.5px] leading-relaxed text-konoba-cream/70">
          Porodična konoba na obali — dnevni ulov, domaće vino i pedeset godina istog
          recepta.
        </p>
        <span className="mt-3.5 w-fit bg-konoba-terra px-4 py-1.5 text-[10.5px] font-semibold text-konoba-bg">
          Rezerviši sto
        </span>
      </div>

      <div className="flex gap-1.5 px-4 pb-4" aria-hidden="true">
        <div className="h-9 flex-1 bg-gradient-to-br from-konoba-terra/70 to-konoba-card" />
        <div className="h-9 flex-1 bg-gradient-to-br from-konoba-olive/60 to-konoba-card" />
        <div className="h-9 flex-1 bg-gradient-to-br from-konoba-cream/25 to-konoba-card" />
      </div>
    </div>
  );
}
