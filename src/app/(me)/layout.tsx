import type { Metadata } from "next";
import type { ReactNode } from "react";
import { dictionaries } from "@/i18n";
import { RootHtml, sharedMetadata } from "../root-html";
import "../globals.css";

export { viewport } from "../root-html";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: dictionaries.me.meta.title,
  description: dictionaries.me.meta.description,
};

export default function MontenegrinLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="sr-ME">{children}</RootHtml>;
}
