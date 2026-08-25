"use client";

import { useEffect } from "react";

/**
 * The root layout renders <html lang="sr-ME">; the /en page corrects the
 * document language after hydration (single root layout keeps the global 404
 * simple — hreflang alternates cover search engines).
 */
export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
