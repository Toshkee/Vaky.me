import type { Metadata } from "next";
import { dictionaries, type Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { tradePath, type TradeKey } from "@/components/landing/TradePage";

export const tradeKeys = Object.keys(dictionaries.me.trades.items) as TradeKey[];

/** The trade whose page lives at this slug in this language, if any. */
export function tradeBySlug(dict: Dictionary, slug: string): TradeKey | undefined {
  return tradeKeys.find((key) => dict.trades.items[key].slug === slug);
}

/** The static params for one language's trade route: every slug it has. */
export function tradeParams(dict: Dictionary) {
  return tradeKeys.map((key) => ({ trade: dict.trades.items[key].slug }));
}

/**
 * Metadata for a trade page: its own title and description, a canonical on
 * this language's path and the other language's path as the alternate.
 * openGraph is repeated in full because Next merges it shallowly.
 */
export function tradeMetadata(dict: Dictionary, key: TradeKey): Metadata {
  const trade = dict.trades.items[key];
  const path = tradePath(dict, key);
  return {
    title: trade.metaTitle,
    description: trade.description,
    alternates: {
      canonical: path,
      languages: {
        "sr-ME": tradePath(dictionaries.me, key),
        en: tradePath(dictionaries.en, key),
      },
    },
    openGraph: {
      siteName: site.name,
      type: "website",
      title: trade.metaTitle,
      description: trade.description,
      url: path,
      images: ["/og.png"],
    },
  };
}
