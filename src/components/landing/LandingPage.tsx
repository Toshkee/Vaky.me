import type { Dictionary } from "@/i18n";
import { StructuredData } from "@/components/StructuredData";
import { SkipLink } from "@/components/ui/SkipLink";
import { Contact } from "./Contact";
import { Expertise } from "./Expertise";
import { Faq } from "./Faq";
import { FilmCursor } from "./FilmCursor";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { INTRO_GATE, IntroCredits } from "./IntroCredits";
import { Nav } from "./Nav";
import { Pricing } from "./Pricing";
import { ScrollStage } from "./ScrollStage";
import { Showreel } from "./Showreel";
import { Statement } from "./Statement";
import { Timeline } from "./Timeline";
import { MotionVideos } from "./MotionVideos";
import { Work } from "./Work";

/**
 * The landing page, cut as a film: opening titles, a title card, the
 * showreel, the cast, then one scene per thing a visitor needs — who, what,
 * how, what has been made, what it costs — and the contact scene before the
 * credits. Every scene is server-rendered and readable without a line of
 * script; the motion is laid over it on the client.
 */
export function LandingPage({ dict }: { dict: Dictionary }) {
  return (
    <>
      {/* Before anything paints: does this visit get the opening titles? */}
      <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      <IntroCredits copy={dict.film.intro} />
      <StructuredData dict={dict} />
      <SkipLink>{dict.nav.skip}</SkipLink>
      <Nav dict={dict} />
      {/* `tabIndex={-1}` is what makes the skip link move focus, not just
          the viewport. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero dict={dict} />
        <Showreel dict={dict} />
        <Statement dict={dict} />
        <Expertise dict={dict} />
        <Timeline dict={dict} />
        <Work dict={dict} />
        <MotionVideos dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <ScrollStage />
      <FilmCursor />
    </>
  );
}
