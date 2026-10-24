"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { BrandWordmark } from "@/components/BrandWordmark";
import { VIDEOS_ID } from "./facts";
import { backToTop } from "./scroll";

/** The sections the masthead links to, in page order. */
const SECTIONS = ["radovi", VIDEOS_ID, "cijene", "kontakt"] as const;

/**
 * The masthead: the logo on the left, the sections in one pill in the middle
 * with a dark marker that slides to the one you are in, and on the right the
 * language and the one action the page exists for. It steps out of the way
 * while the page is scrolled down and comes back the moment it is scrolled
 * up. On a phone the sections and the action sit behind a "Meni" button, on
 * a full-screen dark card — four links and a button do not fit a phone's
 * width beside a logo.
 *
 * Anchors are written from the home path, so the same masthead works on the
 * trade and concepts pages, where the sections live on the landing page.
 */
export function Nav({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";
  const { nav } = dict;
  const labels = [nav.work, nav.videos, nav.pricing, nav.contact];
  const links = SECTIONS.map((id, i) => ({ id, label: labels[i] }));

  const header = useRef<HTMLElement>(null);
  const pill = useRef<HTMLUListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  /* Which section is under the reading line, and whether the masthead should
     be out of the way. Recomputed from geometry on every scroll frame: an
     observer only fires on change and cannot tell that the last section is
     on screen but too short to ever reach the line. */
  useEffect(() => {
    const ids = SECTIONS;
    let last = window.scrollY;

    const update = () => {
      const line = window.innerHeight * 0.35;
      const current = ids.find((id) => {
        const box = document.getElementById(id)?.getBoundingClientRect();
        return box && box.top <= line && box.bottom > line;
      });
      if (current) setActive(current);
      else {
        const end = document.getElementById(ids[ids.length - 1])?.getBoundingClientRect();
        setActive(end && end.top < window.innerHeight ? ids[ids.length - 1] : "");
      }

      /* Out of the way going down, back going up; never while a link in it
         has the keyboard's focus, and never near the top. */
      const y = window.scrollY;
      const focused = header.current?.contains(document.activeElement);
      if (y < 80 || focused) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* The marker slides under the current section's link. */
  useEffect(() => {
    const dot = marker.current;
    const target = pill.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!dot) return;
    if (!target) {
      dot.style.opacity = "0";
      return;
    }
    dot.style.opacity = "1";
    dot.style.left = `${target.offsetLeft}px`;
    dot.style.width = `${target.offsetWidth}px`;
  }, [active]);

  const openMenu = () => menu.current?.showModal();
  const closeMenu = () => menu.current?.close();

  return (
    <header
      ref={header}
      className={`sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      <div className="shell grid h-16 grid-cols-[1fr_auto] items-center gap-4 sm:h-[4.5rem] md:grid-cols-[1fr_auto_1fr]">
        <Link
          href={home}
          onClick={(event) => backToTop(event, home)}
          data-nav-logo
          className="tap w-fit shrink-0 text-[1.6rem]"
        >
          <BrandWordmark />
        </Link>

        <nav aria-label={nav.label} className="hidden md:block">
          <ul ref={pill} className="relative flex items-center rounded-full border border-line bg-paper-2 p-1">
            <span
              ref={marker}
              aria-hidden="true"
              className="absolute inset-y-1 rounded-full bg-ink opacity-0 transition-[left,width,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none"
            />
            {links.map((link) => (
              <li key={link.id} data-id={link.id} className="relative">
                <a
                  href={`${home}#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                  className="inline-flex min-h-9 items-center rounded-full px-4 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink aria-[current]:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <Link
            href={nav.langHref}
            aria-label={nav.langName}
            className="tap inline-flex h-9 items-center rounded-full border-[1.5px] border-ink px-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            {nav.langLabel}
          </Link>
          <a
            href={`${home}#kontakt`}
            data-umami-event="nav_cta"
            className="btn inline-flex min-h-10 items-center bg-ink px-5 text-sm text-paper hover:border-red hover:bg-red hover:text-white"
          >
            {nav.cta}
          </a>
        </div>

        <button
          type="button"
          onClick={openMenu}
          aria-haspopup="dialog"
          className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-ink px-4 text-sm font-semibold md:hidden"
        >
          {nav.menu}
        </button>
      </div>

      {/* The phone's menu: a native modal, so focus stays inside, Esc closes
          it and the page behind is inert, with no code for any of that. */}
      <dialog
        ref={menu}
        aria-label={nav.label}
        className="nav-menu on-ink m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-paper backdrop:bg-transparent"
      >
        <div className="shell flex h-16 items-center justify-between">
          <span className="text-[1.6rem]">
            <BrandWordmark tone="paper" />
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-paper px-4 text-sm font-semibold"
          >
            {nav.close}
          </button>
        </div>
        <nav aria-label={nav.label} className="shell mt-6">
          <ul className="border-t border-ink-2">
            {links.map((link) => (
              <li key={link.id} className="border-b border-ink-2">
                <a
                  href={`${home}#${link.id}`}
                  onClick={closeMenu}
                  aria-current={active === link.id ? "location" : undefined}
                  className="display block py-4 text-[clamp(2.5rem,12vw,3.75rem)] aria-[current]:text-red-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="shell mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`${home}#kontakt`}
            onClick={closeMenu}
            data-umami-event="nav_cta"
            className="btn inline-flex min-h-12 items-center border-red bg-red px-6 text-white"
          >
            {nav.cta}
          </a>
          <Link href={nav.langHref} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            {nav.langName}
          </Link>
        </div>
      </dialog>
    </header>
  );
}
