import type { Dictionary } from "@/i18n";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Pricing } from "./Pricing";
import { Process } from "./Process";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { StructuredData } from "@/components/StructuredData";
import { SkipLink } from "@/components/ui/SkipLink";

export function LandingPage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <StructuredData dict={dict} />
      <SkipLink>{dict.nav.skip}</SkipLink>
      <Nav dict={dict} />
      {/* `tabIndex={-1}` is what makes the skip link work rather than merely
          scroll: without it the browser moves the viewport and leaves focus on
          <body>, so the next Tab goes straight back into the masthead the
          visitor just asked to skip. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero dict={dict} />
        <Work dict={dict} />
        <Process dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
