import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SearchIcon, SparkleIcon } from "@/components/landing/icons";
import { DESKTOP, MiniSite, PAGE, PHONE, mixLayout, shiftLayout, type BlockState, type Part } from "./MiniSite";
import { blink, chunks, color, drop, pixelFont, place, sansFont, typed } from "./pixel";

/**
 * The hero's screen: a site being built on the Vaky OS monitor.
 *
 * DESIGN drops the blocks of a page into place, MOBILE folds it into a
 * phone, SEO steps the phone aside for the search result it will earn. That
 * is where it waits — frame `ready` — until the visitor presses DEPLOY: the
 * address changes from localhost to a real domain, the page opens back out
 * and goes LIVE.
 *
 * Frames at 30 fps. The three stages line up with the desk's status lights,
 * which Workstation.tsx turns on every 620 ms and hands to DEPLOY at 2360 ms
 * (frame 71); its deploy takes 900 ms, so LIVE lands on frame 98.
 */
export const SITE_BUILD = { width: 612, height: 384, fps: 30, ready: 71, end: 126 };

export type SiteBuildCopy = {
  /** What a customer types into the search field. Fifteen characters or
      so: the field is 340 composition pixels wide. */
  query: string;
  /** The result's title. */
  result: string;
  domain: string;
};

const CHROME = 56;
const LIVE = 98;

/* The order the page is designed in, and the frame each block lands on. */
const DESIGN: [Part, number][] = [
  ["logo", 1],
  ["nav", 3],
  ["h1a", 5],
  ["h1b", 7],
  ["line1", 9],
  ["line2", 9],
  ["button", 11],
  ["image", 13],
  ["card1", 15],
  ["card2", 16],
  ["card3", 17],
];

export function SiteBuild({ query, result, domain }: SiteBuildCopy) {
  const frame = useCurrentFrame();

  // MOBILE folds the page into a phone; the launch opens it back out.
  const folded = chunks(frame, 20, 30, 5) - chunks(frame, 84, 94, 5);
  // SEO moves the phone aside for the search result; the launch brings it back.
  const aside = chunks(frame, 38, 44, 3) - chunks(frame, 78, 82, 2);
  const layout = shiftLayout(mixLayout(DESKTOP, PHONE, folded), -180 * aside);

  const blocks: Partial<Record<Part, BlockState>> = {};
  for (const [part, at] of DESIGN) {
    const dy = drop(frame, at);
    if (dy !== null) blocks[part] = { dy };
  }

  return (
    <AbsoluteFill style={{ background: color.paper, overflow: "hidden" }}>
      <AddressBar frame={frame} domain={domain} />
      <div style={{ ...place({ x: 0, y: CHROME, w: PAGE.width, h: PAGE.height }), overflow: "hidden" }}>
        <MiniSite layout={layout} blocks={blocks} bezel={folded > 0 ? 8 : 0} />
        <SearchResult frame={frame} query={query} result={result} domain={domain} />
        <Sparkles frame={frame} />
      </div>
    </AbsoluteFill>
  );
}

const LOCALHOST = "localhost:3000";

/** The browser's address: localhost while it is being built, the domain once it ships. */
function AddressBar({ frame, domain }: { frame: number; domain: string }) {
  const local = frame <= 77;
  const text = local
    ? LOCALHOST.slice(0, Math.max(0, LOCALHOST.length - Math.max(0, frame - 72) * 3))
    : typed(domain, frame, 78);
  const caret = frame > 72 && frame < LIVE && blink(frame, 72, 4, 4);

  return (
    <div
      style={{
        ...place({ x: 0, y: 0, w: SITE_BUILD.width, h: CHROME }),
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 16px",
        background: color.paper2,
        borderBottom: `4px solid ${color.ink}`,
      }}
    >
      {[color.red, color.gold, color.ok].map((dot) => (
        <div key={dot} style={{ width: 12, height: 12, background: dot }} />
      ))}
      <div
        style={{
          flex: 1,
          height: 36,
          marginLeft: 12,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          border: `4px solid ${color.ink}`,
          background: color.paper,
          fontFamily: pixelFont,
          fontSize: 28,
          lineHeight: 1,
          color: local ? color.muted : color.ink,
        }}
      >
        <span>{text}</span>
        <span style={{ visibility: caret ? "visible" : "hidden" }}>_</span>
        {frame >= LIVE && (
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: color.ok }}>
            <span style={{ width: 12, height: 12, background: color.ok }} />
            LIVE
          </span>
        )}
      </div>
    </div>
  );
}

/** The listing the page will have in search, beside the phone. */
function SearchResult({
  frame,
  query,
  result,
  domain,
}: SiteBuildCopy & { frame: number }) {
  const shown = chunks(frame, 40, 46, 3) - chunks(frame, 77, 81, 2);
  if (shown <= 0) return null;
  const x = 248 + (1 - shown) * 380;
  const listing = drop(frame, 54);

  return (
    <div style={place({ x, y: 40, w: 340, h: 240 })}>
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: 56,
          padding: "0 14px",
          border: `4px solid ${color.ink}`,
          background: color.paper,
          fontFamily: pixelFont,
          fontSize: 28,
          lineHeight: 1,
          color: color.ink,
        }}
      >
        <div style={{ width: 28, flexShrink: 0 }}>
          <SearchIcon className="w-full" />
        </div>
        {typed(query, frame, 45, 2)}
      </div>

      {listing !== null && (
        <div style={{ marginTop: 24 + listing, paddingLeft: 4 }}>
          <div style={{ fontFamily: pixelFont, fontSize: 26, lineHeight: 1, color: color.ok }}>{domain}</div>
          <div
            style={{
              marginTop: 10,
              fontFamily: sansFont,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 1.1,
              color: color.ink,
            }}
          >
            {result}
          </div>
          <div style={{ width: 300, height: 8, marginTop: 14, background: color.muted }} />
          <div style={{ width: 232, height: 8, marginTop: 8, background: color.muted }} />
        </div>
      )}
    </div>
  );
}

/* Four sparks around the page when it goes live, each one small, big,
   small, gone — the same three-beat the mascot's jump uses. */
const SPARKS = [
  { x: 300, y: 28, tone: color.red, at: LIVE + 2 },
  { x: 572, y: 278, tone: color.gold, at: LIVE + 5 },
  { x: 24, y: 232, tone: color.red, at: LIVE + 8 },
  { x: 592, y: 20, tone: color.ink, at: LIVE + 11 },
];

function Sparkles({ frame }: { frame: number }) {
  return SPARKS.map(({ x, y, tone, at }) => {
    const age = frame - at;
    if (age < 0 || age > 8) return null;
    const size = age >= 3 && age <= 5 ? 36 : 24;
    return (
      <div key={at} style={{ ...place({ x: x - size / 2, y: y - size / 2, w: size, h: size }), color: tone }}>
        <SparkleIcon className="w-full" />
      </div>
    );
  });
}
