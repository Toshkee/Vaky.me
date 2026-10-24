/**
 * The robot's head — Vaky's character from the first vaky.me, redrawn as an
 * SVG on its own pixel grid so it stays sharp at any size. The head is drawn
 * from the map below, one character per pixel; the face is drawn over it,
 * and the eyes blink now and then where motion is welcome (globals.css).
 */
const MAP = [
  "........kkk............",
  ".......krrgk...........",
  ".......krrgk...........",
  ".......krggk...........",
  "........kkk............",
  ".........k.............",
  ".........k.............",
  "..kkkkkkkkkkkkkkk......",
  ".kwwwwwwwwwwwwwwgk.....",
  "kwwwwwwwwwwwwwwwggk....",
  "kwwwwwwwwwwwwwwwggk....",
  "kwwwwwwwwwwwwwwwggkkkkk",
  "kwwwwwwwwwwwwwwwggkrrgk",
  "kwwwwwwwwwwwwwwwggkrrgk",
  "kwwwwwwwwwwwwwwwggkrrgk",
  "kwwwwwwwwwwwwwwwggkrrgk",
  "kwwwwwwwwwwwwwwwggkrggk",
  "kwwwwwwwwwwwwwwwggkkkkk",
  "kwwwwwwwwwwwwwwwggk....",
  "kwwwwwwwwwwwwwwwggk....",
  ".kgggggggggggggggk.....",
  "..kkkkkkkkkkkkkkk......",
];

const FILL = { k: "#101010", w: "#ffffff", g: "#cfcbc3", r: "#c1121f" } as const;

/** The black face screen inside the head, with its four corners cut. */
const SCREEN = { x: 2, y: 10, w: 13, h: 9 };
/** The eyes: one pixel wide, three tall, set wider apart than the smile. */
const EYES = [
  { x: 4, y: 12 },
  { x: 12, y: 12 },
];
const SMILE = [
  { x: 6, y: 15 },
  { x: 7, y: 16 },
  { x: 8, y: 16 },
  { x: 9, y: 16 },
  { x: 10, y: 15 },
];

/** Runs of the same colour on a row, one rect each — 70-odd rects in all. */
function runs() {
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  MAP.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let end = x;
      while (end < row.length && row[end] === c) end++;
      if (c in FILL) rects.push({ x, y, w: end - x, fill: FILL[c as keyof typeof FILL] });
      x = end;
    }
  });
  return rects;
}
const RECTS = runs();

export function VakyHead({ className = "" }: { className?: string }) {
  const { x, y, w, h } = SCREEN;
  return (
    <svg
      viewBox={`0 0 ${MAP[0].length} ${MAP.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`vaky-head ${className}`}
    >
      {RECTS.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
      <rect x={x + 1} y={y} width={w - 2} height={h} fill={FILL.k} />
      <rect x={x} y={y + 1} width={w} height={h - 2} fill={FILL.k} />
      <g fill="#ffffff">
        {EYES.map((e) => (
          <rect key={e.x} data-eye x={e.x} y={e.y} width={1} height={3} />
        ))}
        {SMILE.map((p) => (
          <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={1} height={1} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Vaky's head and the name beside it, as the hero starts. Sized by
 * font-size; the head follows.
 */
export function VakyLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-[0.22em] leading-none ${className}`}>
      <VakyHead className="h-[1.18em] w-auto shrink-0 translate-y-[0.06em]" />
      <span className="display whitespace-nowrap">
        Vaky<span className="text-red">.me</span>
      </span>
    </span>
  );
}
