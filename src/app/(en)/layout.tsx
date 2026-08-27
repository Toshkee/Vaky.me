import type { Metadata } from "next";
import type { ReactNode } from "react";
import { dictionaries } from "@/i18n";
import { RootHtml, sharedMetadata } from "../root-html";
import "../globals.css";

export { viewport } from "../root-html";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: dictionaries.en.meta.title,
  description: dictionaries.en.meta.description,
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
