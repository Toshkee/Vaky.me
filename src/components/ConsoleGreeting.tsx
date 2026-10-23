"use client";

import { useEffect } from "react";

/**
 * A greeting in the developer console, for the one visitor in a thousand who
 * opens it: the name, the line, and the address to write to. It is the sort
 * of thing a client's developer friend finds when asked "is this site any
 * good?" — so it is here, and it costs one log call after hydration.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%c vaky %c sajtovi koji donose klijente.\nRadiš na sajtu? Javi se: vakymne@gmail.com",
      "background: #ff6a2b; color: #0a2e2b; font: 900 20px/1.6 system-ui, sans-serif; padding: 2px 10px; border-radius: 999px",
      "color: #0a2e2b; font: 600 13px/1.6 system-ui, sans-serif",
    );
  }, []);
  return null;
}
