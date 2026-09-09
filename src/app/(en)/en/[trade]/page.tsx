import { notFound } from "next/navigation";
import { dictionaries } from "@/i18n";
import { TradePage } from "@/components/landing/TradePage";
import { tradeBySlug, tradeMetadata, tradeParams } from "@/lib/trades";

const dict = dictionaries.en;

type Params = { params: Promise<{ trade: string }> };

/* Only the slugs in the dictionary exist; anything else is the global 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return tradeParams(dict);
}

export async function generateMetadata({ params }: Params) {
  const key = tradeBySlug(dict, (await params).trade);
  return key ? tradeMetadata(dict, key) : {};
}

export default async function Trade({ params }: Params) {
  const key = tradeBySlug(dict, (await params).trade);
  if (!key) notFound();
  return <TradePage dict={dict} tradeKey={key} />;
}
