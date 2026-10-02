"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "./icons";

/**
 * Something that is all on the page from sm up, and on a phone shows its head
 * with the rest one tap away. The page stacks into a single column there, and
 * a visitor was scrolling a dozen screens to reach the form; nothing is taken
 * off the page, the long parts just wait until asked for.
 *
 * The body stays in the document while closed, so a search engine reads all
 * of it. From sm up the button is not rendered at all and the body is always
 * open — there is no control left behind that does nothing.
 *
 * `label` names the button for a screen reader, since what it shows is only a
 * plus. Its hit area is stretched over the whole head, so the row is the
 * target rather than a 16px icon at its edge.
 */
export function MobileFold({
  label,
  head,
  children,
}: {
  label: string;
  head: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <>
      <div className="relative flex items-center gap-3">
        <div className="min-w-0 flex-1">{head}</div>
        <button
          type="button"
          aria-label={label}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen(!open)}
          className="-mr-3.5 flex h-11 w-11 shrink-0 items-center justify-center after:absolute after:inset-0 sm:hidden"
        >
          <PlusIcon
            className={`w-4 text-red transition-transform duration-200 motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <div id={bodyId} className={open ? undefined : "hidden sm:block"}>
        {children}
      </div>
    </>
  );
}
