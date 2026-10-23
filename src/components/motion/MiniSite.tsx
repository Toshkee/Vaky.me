import type { CSSProperties } from "react";
import { GRID, color, mixRect, place, type Rect } from "./pixel";

/**
 * The small website both animations draw: a nav, a two-line headline, a
 * button, a photo and three cards, set as blocks. It is the same site at
 * every stage of its life — a pencil sketch, a desktop page, a phone — so
 * the stages read as one thing being made rather than a slideshow.
 *
 * Coordinates are composition pixels in a 612x328 page. Each layout places
 * every block, so moving between two of them is one mix per block, and the
 * page reflows from desktop to phone in front of the visitor.
 */
const PARTS = [
  "logo",
  "nav",
  "h1a",
  "h1b",
  "line1",
  "line2",
  "button",
  "image",
  "card1",
  "card2",
  "card3",
] as const;

export type Part = (typeof PARTS)[number];
export type SiteLayout = { screen: Rect } & Record<Part, Rect>;

export const PAGE = { width: 612, height: 328 };

export const DESKTOP: SiteLayout = {
  screen: { x: 0, y: 0, w: 612, h: 328 },
  logo: { x: 28, y: 20, w: 24, h: 24 },
  nav: { x: 448, y: 26, w: 136, h: 12 },
  h1a: { x: 28, y: 72, w: 280, h: 28 },
  h1b: { x: 28, y: 108, w: 212, h: 28 },
  line1: { x: 28, y: 152, w: 244, h: 8 },
  line2: { x: 28, y: 168, w: 200, h: 8 },
  button: { x: 28, y: 196, w: 132, h: 40 },
  image: { x: 340, y: 64, w: 244, h: 172 },
  card1: { x: 28, y: 256, w: 176, h: 52 },
  card2: { x: 218, y: 256, w: 176, h: 52 },
  card3: { x: 408, y: 256, w: 176, h: 52 },
};

/* The same page on a phone, centred. The cards fall below the fold, which
   the screen clips — they are still there, a scroll away. */
export const PHONE: SiteLayout = {
  screen: { x: 224, y: 12, w: 164, h: 304 },
  logo: { x: 236, y: 24, w: 16, h: 16 },
  nav: { x: 360, y: 24, w: 16, h: 16 },
  h1a: { x: 236, y: 56, w: 128, h: 16 },
  h1b: { x: 236, y: 76, w: 96, h: 16 },
  line1: { x: 236, y: 100, w: 136, h: 4 },
  line2: { x: 236, y: 112, w: 108, h: 4 },
  image: { x: 236, y: 128, w: 140, h: 96 },
  button: { x: 236, y: 236, w: 92, h: 28 },
  card1: { x: 236, y: 280, w: 140, h: 44 },
  card2: { x: 236, y: 336, w: 140, h: 44 },
  card3: { x: 236, y: 392, w: 140, h: 44 },
};

export function mixLayout(a: SiteLayout, b: SiteLayout, t: number): SiteLayout {
  const layout = { screen: mixRect(a.screen, b.screen, t) } as SiteLayout;
  for (const part of PARTS) layout[part] = mixRect(a[part], b[part], t);
  return layout;
}

export function shiftLayout(layout: SiteLayout, dx: number): SiteLayout {
  const shifted = { screen: { ...layout.screen, x: layout.screen.x + dx } } as SiteLayout;
  for (const part of PARTS) shifted[part] = { ...layout[part], x: layout[part].x + dx };
  return shifted;
}

/** How a block is drawn right now. A part left out of `blocks` is not drawn yet. */
export type BlockState = {
  /** Offset above its place, from `drop()`. */
  dy?: number;
  /** Still a pencil outline rather than the finished block. */
  sketch?: boolean;
};

export function MiniSite({
  layout,
  blocks,
  bezel = 0,
}: {
  layout: SiteLayout;
  blocks: Partial<Record<Part, BlockState>>;
  /** Thickness of a phone body around the screen; 0 is a bare page. */
  bezel?: number;
}) {
  const { screen } = layout;

  return (
    <>
      {bezel > 0 && (
        <div
          style={{
            ...place({
              x: screen.x - bezel,
              y: screen.y - bezel,
              w: screen.w + bezel * 2,
              h: screen.h + bezel * 2,
            }),
            background: color.ink,
          }}
        />
      )}
      <div className="px-grid" style={{ ...place(screen), overflow: "hidden", backgroundColor: color.paper }}>
        {PARTS.map((part) => {
          const state = blocks[part];
          if (!state) return null;
          const rect = layout[part];
          return (
            <Block
              key={part}
              part={part}
              sketch={state.sketch ?? false}
              rect={{ ...rect, x: rect.x - screen.x, y: rect.y - screen.y + (state.dy ?? 0) }}
            />
          );
        })}
      </div>
    </>
  );
}

const SKETCH: CSSProperties = {
  boxSizing: "border-box",
  border: `${GRID}px dashed ${color.ink}`,
};

function Block({ part, rect, sketch }: { part: Part; rect: Rect; sketch: boolean }) {
  if (sketch) return <div style={{ ...place(rect), ...SKETCH }} />;

  switch (part) {
    case "logo":
    case "h1a":
      return <div style={{ ...place(rect), background: color.ink }} />;
    case "h1b":
      return <div style={{ ...place(rect), background: color.red }} />;
    case "line1":
    case "line2":
      return <div style={{ ...place(rect), background: color.muted }} />;
    case "nav":
      return <Nav rect={rect} />;
    case "button":
      return (
        <div
          style={{
            ...place(rect),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: color.red,
            boxShadow: `${GRID}px ${GRID}px 0 ${color.ink}`,
          }}
        >
          <div style={{ width: "44%", height: GRID, background: color.paper }} />
        </div>
      );
    case "image":
      return <Photo rect={rect} />;
    default:
      return (
        <div
          style={{
            ...place(rect),
            boxSizing: "border-box",
            border: `${GRID}px solid ${color.ink}`,
            background: color.paper,
            padding: GRID * 2,
          }}
        >
          <div style={{ width: "50%", height: GRID * 2, background: color.ink }} />
          <div style={{ width: "76%", height: GRID, marginTop: GRID * 2, background: color.muted }} />
        </div>
      );
  }
}

/** Three links on a wide page, a hamburger on a narrow one. */
function Nav({ rect }: { rect: Rect }) {
  const wide = rect.w >= 48;
  return (
    <div
      style={{
        ...place(rect),
        display: "flex",
        flexDirection: wide ? "row" : "column",
        justifyContent: "space-between",
        gap: wide ? GRID * 2 : 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ flex: wide ? 1 : undefined, height: wide ? "100%" : GRID, background: color.muted }} />
      ))}
    </div>
  );
}

/** A landscape in blocks: a gold sun over stepped green hills. */
function Photo({ rect }: { rect: Rect }) {
  return (
    <div
      style={{
        ...place(rect),
        boxSizing: "border-box",
        overflow: "hidden",
        border: `${GRID}px solid ${color.ink}`,
        background: color.paper2,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "16%",
          right: "16%",
          width: "14%",
          aspectRatio: "1",
          background: color.gold,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "55% 0 0 0",
          background: color.ok,
          clipPath:
            "polygon(0 100%, 0 40%, 16% 40%, 16% 16%, 32% 16%, 32% 0, 48% 0, 48% 32%, 62% 32%, 62% 12%, 78% 12%, 78% 36%, 100% 36%, 100% 100%)",
        }}
      />
    </div>
  );
}
