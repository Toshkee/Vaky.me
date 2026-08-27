import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootHtml, sharedMetadata } from "../root-html";
import "../globals.css";

export { viewport } from "../root-html";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "VibeLab — Sajtovi koji donose klijente | Web studio Podgorica",
  description:
    "Moderan sajt za tvoj biznis — gotov za 7 dana, od €100. Restorani, teretane, saloni i mali biznisi u Crnoj Gori. Besplatan koncept prije plaćanja.",
};

export default function MontenegrinLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="sr-ME">{children}</RootHtml>;
}
