/**
 * A hand-drawn red circle — the way a good price gets marked on a board.
 * Wraps the featured price in the pricing table. Two overlapping passes,
 * ends crossing, like a real pen stroke.
 */
export function BrushCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path
        d="M164 12 C122 2 46 6 22 32 C2 54 22 82 78 90 C140 98 204 86 212 56 C218 32 186 12 138 10"
        strokeWidth="5"
        opacity="0.9"
        pathLength={1}
      />
      <path
        d="M150 8 C110 2 40 10 24 36 C10 60 40 84 96 88"
        strokeWidth="3.5"
        opacity="0.45"
        pathLength={1}
      />
    </svg>
  );
}
