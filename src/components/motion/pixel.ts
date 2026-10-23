/**
 * Motion for the pixel screens.
 *
 * Everything on them moves in chunks on a 4px grid, the way the OS progress
 * bar advances (`.os-bar-fill` steps in six blocks): a screen that glides
 * stops looking like the machine it is drawn as. The compositions are drawn
 * at twice their size on the page, so one 4px step lands on 2 CSS pixels —
 * the same weight as every ink rule on the site.
 */

export const GRID = 4;

/* The site's own tokens, read from the page: the compositions render inside
   it, so they inherit globals.css rather than keeping a second palette. */
export const color = {
  ink: "var(--color-ink)",
  paper: "var(--color-paper)",
  paper2: "var(--color-paper-2)",
  muted: "var(--color-muted)",
  red: "var(--color-red)",
  ok: "var(--color-ok)",
  gold: "var(--color-gold)",
};

export const pixelFont = "var(--font-pixel), ui-monospace, monospace";
export const sansFont = "var(--font-franklin), system-ui, sans-serif";

export const snap = (value: number) => Math.round(value / GRID) * GRID;

/** 0 → 1 between two frames, advanced in `count` equal jumps. */
export function chunks(frame: number, from: number, to: number, count: number) {
  const t = Math.min(1, Math.max(0, (frame - from) / (to - from)));
  return Math.floor(t * count) / count;
}

/** How much of `text` has been typed by `frame`, starting at `from`. */
export function typed(text: string, frame: number, from: number, perFrame = 1) {
  return text.slice(0, Math.max(0, Math.floor((frame - from) * perFrame)));
}

/**
 * A block landing on its place at `at`: two 4px steps down, then still.
 * `null` before it has appeared.
 */
export function drop(frame: number, at: number) {
  if (frame < at) return null;
  return -Math.max(0, at + 2 - frame) * GRID;
}

/** On for `on` frames, off for `off`, from `from` onwards: carets and LEDs. */
export function blink(frame: number, from: number, on = 8, off = 8) {
  return frame >= from && (frame - from) % (on + off) < on;
}

export type Rect = { x: number; y: number; w: number; h: number };

export function mixRect(a: Rect, b: Rect, t: number): Rect {
  return {
    x: snap(a.x + (b.x - a.x) * t),
    y: snap(a.y + (b.y - a.y) * t),
    w: snap(a.w + (b.w - a.w) * t),
    h: snap(a.h + (b.h - a.h) * t),
  };
}

export function place({ x, y, w, h }: Rect) {
  return { position: "absolute", left: x, top: y, width: w, height: h } as const;
}
