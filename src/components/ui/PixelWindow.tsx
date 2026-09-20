import type { ReactNode } from "react";

/**
 * A framed slab with stepped corners and a hard offset shadow — the page's
 * recurring "screen". Three elements, and each one is load-bearing:
 *   .px-frame  casts the shadow. It has to be a separate wrapper, because
 *              clip-path clips an element's own filter output — a drop-shadow
 *              declared next to the notch would be cut away with the corners.
 *   .px-notch  on an ink ground IS the border. A real `border` would be sliced
 *              open at each cut corner and show the page through the gap, so
 *              the frame is a filled shape and `p-[2px]` is its thickness.
 *   the pane   carries the content and repeats the notch so the ink shows only
 *              as a 2px rule around it.
 */
export function PixelWindow({
  children,
  className = "",
  pane = "bg-paper",
  chrome = false,
  title,
}: {
  children: ReactNode;
  className?: string;
  /** Ground colour of the pane. Demo posters bring their own. */
  pane?: string;
  /** The title bar with its three traffic dots. Decorative — never labelled. */
  chrome?: boolean;
  /**
   * Optional window name, set in the pixel face beside the dots.
   *
   * It is painted inside the `aria-hidden` title bar, so it is scenery: a
   * screen reader never reads it. That is right for "VAKY OS", and it is why
   * every screen using this component renders its own real heading inside the
   * pane. Do not let this prop stand in for that heading — a window titled
   * only here ships with no accessible name at all, and looks perfectly
   * labelled in the DOM while it does.
   */
  title?: string;
}) {
  return (
    <div className={`px-frame ${className}`}>
      <div className="px-notch bg-ink p-[2px]">
        <div className={`px-notch h-full ${pane}`}>
          {(chrome || title) && (
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 border-b-2 border-ink bg-paper-2 px-2.5 py-1.5"
            >
              <span className="block h-1.5 w-1.5 bg-red" />
              <span className="block h-1.5 w-1.5 bg-gold" />
              <span className="block h-1.5 w-1.5 bg-ok" />
              {title && (
                <span className="px ml-2 text-[0.9375rem] leading-none tracking-wide text-muted uppercase">
                  {title}
                </span>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
