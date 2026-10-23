import type { ReactNode } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { HammerIcon, PersonIcon, RocketIcon, SparkleIcon } from "@/components/landing/icons";
import { DESKTOP, MiniSite, PHONE, type BlockState, type Part } from "./MiniSite";
import { GRID, blink, color, drop, pixelFont, place, sansFont, typed } from "./pixel";

/**
 * "Kako radim" as four short scenes, one per step of the list beside it, on
 * a loop: the first message and the reply, the free concept sketched and
 * stamped, the materials ticked off while the site fills in, and the domain
 * going online.
 *
 * Every scene is SCENE frames long, so the step on screen is
 * `floor(frame / SCENE)` — which is how ProcessStage lights the matching
 * step in the list.
 */
export const SCENE = 90;
export const PROCESS_STORY = { width: 640, height: 480, fps: 30, durationInFrames: SCENE * 4 };

export type ProcessStoryCopy = {
  message: string;
  reply: string;
  stamp: string;
  checklist: readonly string[];
  live: string;
  domain: string;
};

/* The blocks in the order they are drawn. */
const ORDER: Part[] = ["logo", "nav", "h1a", "h1b", "line1", "line2", "button", "image", "card1", "card2", "card3"];
const FINISHED: Partial<Record<Part, BlockState>> = Object.fromEntries(ORDER.map((part) => [part, {}]));

export function ProcessStory(copy: ProcessStoryCopy) {
  const frame = useCurrentFrame();
  const scene = Math.floor(frame / SCENE);
  const local = frame % SCENE;

  return (
    <AbsoluteFill style={{ background: color.paper, overflow: "hidden" }}>
      {scene === 0 && <Message frame={local} copy={copy} />}
      {scene === 1 && <Concept frame={local} stamp={copy.stamp} />}
      {scene === 2 && <Build frame={local} checklist={copy.checklist} />}
      {scene === 3 && <Online frame={local} domain={copy.domain} live={copy.live} />}
    </AbsoluteFill>
  );
}

/* ── 1. Javiš se ── */

function Message({ frame, copy }: { frame: number; copy: ProcessStoryCopy }) {
  const incoming = drop(frame, 2);
  const shown = typed(copy.message, frame, 6);
  const waiting = frame >= 42 && frame < 58;
  const reply = drop(frame, 58);

  return (
    <>
      {incoming !== null && (
        <div style={{ position: "absolute", left: 40, top: 96 + incoming, display: "flex", gap: 24 }}>
          <Avatar>
            <div style={{ width: 36 }}>
              <PersonIcon className="w-full" />
            </div>
          </Avatar>
          <Bubble tone="in">
            {shown}
            {/* The rest of the message holds the bubble at its final size, so
                it does not reflow around each typed letter. */}
            <span style={{ visibility: "hidden" }}>{copy.message.slice(shown.length)}</span>
          </Bubble>
        </div>
      )}

      {(waiting || reply !== null) && (
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 260 + (reply ?? 0),
            display: "flex",
            flexDirection: "row-reverse",
            gap: 24,
          }}
        >
          <Avatar>
            <Img src={staticFile("vaky-head.png")} style={{ width: 44, imageRendering: "pixelated" }} />
          </Avatar>
          {reply === null ? <Typing frame={frame - 42} /> : <Bubble tone="out">{copy.reply}</Bubble>}
        </div>
      )}
    </>
  );
}

function Avatar({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        flexShrink: 0,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `${GRID}px solid ${color.ink}`,
        background: color.paper2,
        color: color.ink,
      }}
    >
      {children}
    </div>
  );
}

function Bubble({ tone, children }: { tone: "in" | "out"; children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 400,
        boxSizing: "border-box",
        padding: "16px 22px",
        border: `${GRID}px solid ${color.ink}`,
        background: tone === "in" ? color.paper2 : color.red,
        color: tone === "in" ? color.ink : color.paper,
        fontFamily: sansFont,
        fontSize: 30,
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  );
}

/** Three dots lighting in turn while the reply is written. */
function Typing({ frame }: { frame: number }) {
  const lit = Math.floor(frame / 4) % 3;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 72,
        boxSizing: "border-box",
        padding: "0 22px",
        border: `${GRID}px solid ${color.red}`,
        background: color.paper,
      }}
    >
      {[0, 1, 2].map((dot) => (
        <div key={dot} style={{ width: 12, height: 12, background: dot === lit ? color.red : color.muted }} />
      ))}
    </div>
  );
}

/* ── 2. Besplatan koncept ── */

/* MiniSite's desktop page, scaled to sit inside a 560-wide frame. */
const PAGE_SCALE = 560 / 612;

function Concept({ frame, stamp }: { frame: number; stamp: string }) {
  const outline = drop(frame, 2);
  const blocks: Partial<Record<Part, BlockState>> = {};
  ORDER.forEach((part, i) => {
    const dy = drop(frame, 8 + i * 3);
    if (dy !== null) blocks[part] = { dy, sketch: true };
  });
  const stamped = frame >= 52;
  const big = frame < 54;

  return (
    <>
      {outline !== null && (
        <div
          style={{
            ...place({ x: 36, y: 64 + outline, w: 568, h: 312 }),
            boxSizing: "border-box",
            border: `${GRID}px dashed ${color.ink}`,
          }}
        />
      )}
      <div style={{ position: "absolute", left: 40, top: 68, transform: `scale(${PAGE_SCALE})`, transformOrigin: "0 0" }}>
        <MiniSite layout={DESKTOP} blocks={blocks} />
      </div>

      {stamped && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 360,
            transform: `translateX(-50%) scale(${big ? 1.25 : 1})`,
            padding: "14px 24px",
            border: `${GRID * 1.5}px solid ${color.red}`,
            background: color.paper,
            color: color.red,
            fontFamily: pixelFont,
            fontSize: 40,
            lineHeight: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {stamp}
          {frame >= 56 && frame < 70 && (
            <div style={{ position: "absolute", right: -22, top: -26, width: 36, color: color.red }}>
              <SparkleIcon className="w-full" />
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ── 3. Izrada ── */

function Build({ frame, checklist }: { frame: number; checklist: readonly string[] }) {
  const blocks: Partial<Record<Part, BlockState>> = {};
  ORDER.forEach((part, i) => {
    blocks[part] = { sketch: frame < 40 + i * 3 };
  });
  /* The hammer strikes on every block it finishes. */
  const striking = frame >= 40 && frame < 40 + ORDER.length * 3 && frame % 3 === 0;

  return (
    <>
      <ul style={{ position: "absolute", left: 40, top: 112, margin: 0, padding: 0, listStyle: "none" }}>
        {checklist.map((item, i) => {
          const done = frame >= 10 + i * 12;
          return (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                height: 64,
                fontFamily: pixelFont,
                fontSize: 30,
                lineHeight: 1,
                textTransform: "uppercase",
                color: color.ink,
              }}
            >
              <span style={{ width: 16, height: 16, background: done ? color.ok : color.muted }} />
              {item}
              <span style={{ color: color.ok, visibility: done ? "visible" : "hidden" }}>OK</span>
            </li>
          );
        })}
      </ul>

      {/* The phone: PHONE places its screen at x 224 of the page, so the page
          is shifted to put the screen where this scene wants it. */}
      <div style={{ position: "absolute", left: 408 - PHONE.screen.x, top: 92 - PHONE.screen.y }}>
        <MiniSite layout={PHONE} blocks={blocks} bezel={8} />
      </div>

      <div style={{ ...place({ x: 328, y: striking ? 80 : 72, w: 60, h: 60 }), color: color.ink }}>
        <HammerIcon className="w-full" />
      </div>
    </>
  );
}

/* ── 4. Online ── */

/* The rocket's flight: 20px a frame from below the page to above it. It
   flies inside the page, under the address bar, so it never crosses the
   word ONLINE. */
const FLIGHT = { from: 40, step: 20, height: 364 };

function Online({ frame, domain, live }: { frame: number; domain: string; live: string }) {
  const online = frame >= 34;
  const climbed = (frame - FLIGHT.from) * FLIGHT.step;

  return (
    <>
      <div
        style={{
          ...place({ x: 40, y: 48, w: 560, h: 60 }),
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 18px",
          border: `${GRID}px solid ${color.ink}`,
          background: color.paper,
          fontFamily: pixelFont,
          fontSize: 30,
          lineHeight: 1,
          color: color.ink,
        }}
      >
        <span style={{ width: 16, height: 16, flexShrink: 0, background: online ? color.ok : color.muted }} />
        <span>{typed(domain, frame, 4)}</span>
        <span style={{ visibility: !online && blink(frame, 0, 6, 6) ? "visible" : "hidden" }}>_</span>
        {online && <span style={{ marginLeft: "auto", color: color.ok, textTransform: "uppercase" }}>{live}</span>}
      </div>

      <div style={{ position: "absolute", left: 40, top: 128, transform: `scale(${PAGE_SCALE})`, transformOrigin: "0 0" }}>
        <MiniSite layout={DESKTOP} blocks={FINISHED} />
      </div>

      {climbed >= 0 && (
        <div style={{ ...place({ x: 0, y: 116, w: 640, h: FLIGHT.height }), overflow: "hidden" }}>
          <div style={{ ...place({ x: 512, y: FLIGHT.height - climbed, w: 72, h: 96 }), color: color.ink }}>
            <RocketIcon className="w-full" />
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
              <div style={{ width: 12, height: 12, background: frame % 4 < 2 ? color.red : color.gold }} />
              <div style={{ width: 12, height: 12, background: frame % 4 < 2 ? color.gold : color.red }} />
            </div>
          </div>
        </div>
      )}

      {[
        { x: 300, y: 16, at: 36 },
        { x: 596, y: 120, at: 40 },
      ].map(({ x, y, at }) =>
        frame >= at && frame < at + 8 ? (
          <div key={at} style={{ ...place({ x, y, w: 36, h: 36 }), color: color.red }}>
            <SparkleIcon className="w-full" />
          </div>
        ) : null,
      )}
    </>
  );
}
