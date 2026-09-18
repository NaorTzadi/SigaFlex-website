/**
 * The home page: one scroll, top to bottom. Everything else on the site is a
 * routed page reached from the header or the footer.
 *
 * The page is not a flat list of bands. It is a hero, a strip, two grouped
 * bands that each hold their own sub-bands, a standalone band, and a closing
 * band that hands the reader on to the routed pages. Grouping is what keeps a
 * long page readable and its heading order legal.
 *
 * Section ids come from Constants, so the header nav and the footer scroll to
 * the same places this file lays out.
 */

import Hero from "./sections/Hero";
import Section from "./sections/Section";
import { HOME_SECTIONS } from "../../core/Constants";

export default function Home() {
  return (
    <>
      <Hero />

      {/* A heading-less strip directly under the hero: format badges, logos,
          the one-line count of what it opens. */}
      <Section id={HOME_SECTIONS.STRIP} label="What File Analyzer opens" />

      <Section
        id={HOME_SECTIONS.WHAT_IT_DOES}
        title="What it does"
        lead="One file, one window, every question answered at once."
      >
        <Section
          id={HOME_SECTIONS.PROBLEM}
          level="h3"
          title="The problem"
          lead="One file, five tools, five partial answers."
        />
        <Section
          id={HOME_SECTIONS.HOW_IT_WORKS}
          level="h3"
          title="How it works"
          lead="Drop a file, browse the tree, inspect an entry, export what you found."
        />
        <Section
          id={HOME_SECTIONS.CAPABILITIES}
          level="h3"
          title="Capabilities"
          lead="Display, Readable, Raw, Patterns, Disassembly — all over the same bytes."
        />
      </Section>

      <Section
        id={HOME_SECTIONS.WHAT_IT_OPENS}
        title="What it opens"
        lead="Archives, documents, executables, images, fonts, audio, video, 3D models."
      >
        <Section
          id={HOME_SECTIONS.FORMATS}
          level="h3"
          title="Format coverage"
          lead="Identified by bytes, not by extension."
        />
        <Section
          id={HOME_SECTIONS.BEYOND}
          level="h3"
          title="Beyond analysis"
          lead="Viewing, conversion, and a terminal with an agent command channel."
        />
      </Section>

      <Section
        id={HOME_SECTIONS.ANALYSTS}
        title="Built for analysts"
        lead="Offline, read-only, and bounded by design."
      />

      {/* The closing band: where the reader goes next. */}
      <Section id={HOME_SECTIONS.DISCOVER} title="Discover more" />
    </>
  );
}
