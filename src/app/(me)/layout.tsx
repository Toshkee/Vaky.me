import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootHtml, sharedMetadata } from "../root-html";
import "../globals.css";

export { viewport } from "../root-html";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "VibeLab — Sajtovi koji donose klijente | Web studio Podgorica",
  description:
    "Dizajn i izrada sajtova po mjeri — rok do 10 dana, cijena od €100. Web studio iz Podgorice. Besplatan koncept prije nego što išta platiš.",
};

export default function MontenegrinLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="sr-ME">{children}</RootHtml>;
}
