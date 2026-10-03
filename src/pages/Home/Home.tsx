/**
 * The home page: one scroll, top to bottom. Everything else on the site is a
 * routed page reached from the header or the footer.
 *
 * The page is not a flat list of bands. It is a hero, two grouped
 * bands that each hold their own sub-bands, a standalone band, and a closing
 * band that hands the reader on to the routed pages. Grouping is what keeps a
 * long page readable and its heading order legal.
 *
 * Section ids come from Constants, so the header nav and the footer scroll to
 * the same places this file lays out.
 */

import { useEffect } from "react";

import ProductIntroduction from "./sections/intro_section/ProductIntroduction";
import WhatItDoesSection from "./sections/what_it_does_section/WhatItDoesSection";
import AgentTerminalDemo from "./sections/terminal_section/AgentTerminalDemo";
import WhatItOpensSection from "./sections/what_it_opens_section/WhatItOpensSection";
import FileByteCoverageMap from "./sections/analysts_section/FileByteCoverageMap";
import Reviews from "./sections/reviews_section/Reviews";
import Faq from "./sections/faq_section/Faq";
import DiscoverSection from "./sections/discover_section/DiscoverSection";
import { revealOnScroll } from "../../core/Utility";

export default function Home() {
  useEffect(revealOnScroll, []);

  return (
    <>
      <ProductIntroduction />
      <WhatItDoesSection />
      <AgentTerminalDemo />
      <WhatItOpensSection />
      <FileByteCoverageMap />
      <Reviews />
      <Faq />
      <DiscoverSection />
    </>
  );
}
