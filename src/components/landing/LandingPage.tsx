import type { Dictionary } from "@/i18n";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { Statement } from "./Statement";
import { Work } from "./Work";
import { Services } from "./Services";
import { Process } from "./Process";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function LandingPage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Nav dict={dict} />
      <main>
        <Hero dict={dict} />
        <Ticker dict={dict} />
        <Statement dict={dict} />
        <Work dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <WhatsAppFab dict={dict} />
    </>
  );
}
