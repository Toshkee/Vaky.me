"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps a textarea as tall as what has been typed into it.
 *
 * A fixed `rows` on a field people write a paragraph into hides the beginning
 * of their own answer behind an inner scrollbar — on a phone, where the
 * keyboard already owns half the screen, that is most of it.
 *
 * `field-sizing: content` is the CSS for this and needs no JavaScript, but it
 * is still not in Firefox, so the height is measured here instead. The `rows`
 * attribute stays on the element and keeps working as the minimum: an empty
 * textarea's scrollHeight is exactly its rows box.
 */
export function useAutoGrow(value: string) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Collapse before measuring — scrollHeight can only ever report the
       content as taller than the box, never shorter, so without this the
       field would grow with the text and then refuse to shrink back. */
    node.style.height = "auto";

    /* scrollHeight counts the padding but not the border, while these fields
       are border-box and their height has to cover both. Assigning the bare
       scrollHeight leaves the box exactly two borders too short, which is an
       inner scrollbar on a field that has just been resized to avoid one. */
    const style = getComputedStyle(node);
    const border =
      parseFloat(style.borderTopWidth || "0") + parseFloat(style.borderBottomWidth || "0");

    node.style.height = `${node.scrollHeight + border}px`;
  }, [value]);

  return ref;
}
