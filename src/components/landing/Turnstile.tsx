"use client";

import { useEffect, useRef } from "react";
import { services } from "@/config/services";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile, loaded only once the visitor has actually started
 * filling the form in. Mounting it with the page would mean every reader of
 * the landing page fetches a challenge nobody asked for; mounting it on first
 * engagement costs the one person who is about to submit a few hundred
 * milliseconds they spend typing anyway.
 *
 * This widget only produces a token. The half that can verify it is the
 * `TURNSTILE_SECRET_KEY` Cloudflare secret, read by the Functions behind
 * `/api/` — until that secret is set, the token is produced and ignored.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const callback = useRef(onToken);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled || !box.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: services.turnstileSiteKey,
        callback: (token) => callback.current(token),
        "error-callback": () => callback.current(""),
        "expired-callback": () => callback.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
      const script = existing ?? Object.assign(document.createElement("script"), {
        src: SCRIPT,
        async: true,
        defer: true,
      });
      script.addEventListener("load", render);
      if (!existing) document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  return <div ref={box} className="mt-4 min-h-[65px]" />;
}
