import type { Dictionary } from "@/i18n";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Pricing } from "./Pricing";
import { Process } from "./Process";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { StructuredData } from "@/components/StructuredData";

export function LandingPage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <StructuredData dict={dict} />
      <Nav dict={dict} />
      <main>
        <Hero dict={dict} />
        <Work dict={dict} />
        <Pricing dict={dict} />
        <Process dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <WhatsAppFab dict={dict} />
    </>
  );
}
