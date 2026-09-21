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

import { useEffect } from "react";

import FileInspectorDemo from "./sections/FileInspectorDemo";
import InfoCardGrid from "./sections/InfoCardGrid";
import type { InfoCard } from "./sections/InfoCardGrid";
import ContainmentTree from "./sections/ContainmentTree";
import ProductDemoVideo from "./sections/ProductDemoVideo";
import Faq from "./sections/Faq";
import FileByteCoverageMap from "./sections/FileByteCoverageMap";
import SupportedFormatSearch from "./sections/SupportedFormatSearch";
import ProductIntroduction from "./sections/ProductIntroduction";
import AnalysisToolsComparison from "./sections/AnalysisToolsComparison";
import Reviews from "./sections/Reviews";
import Section from "./sections/Section";
import FileSignatureExamples from "./sections/FileSignatureExamples";
import AgentTerminalDemo from "./sections/AgentTerminalDemo";
import { ROUTES } from "../../Routing";
import { HOME_SECTIONS } from "../../core/Constants";
import { revealOnScroll } from "../../core/Utility";

const BEYOND_TEMPLATE: InfoCard[] = [
  {
    glyph: "eye",
    title: "Viewing",
    body: "Images, documents, fonts, 3D models, audio and video play and render in the same window that analysed them."
  },
  {
    glyph: "convert",
    title: "Conversion",
    body: "Media is converted by a bundled FFmpeg. Office documents go through Word and Excel when they are installed."
  },
  {
    glyph: "terminal",
    title: "Terminal",
    body: "A real terminal inside the window, with a command channel an agent can drive."
  },
  {
    glyph: "export",
    title: "Export",
    body: "Take the structure out as text, or extract any member of any container at any depth."
  }
];

export default function Home() {
  useEffect(revealOnScroll, []);

  /* Built here, not at module scope: Routing imports this page, so ROUTES is
     still being initialised while this module is evaluated. */
  const beyond: InfoCard[] = BEYOND_TEMPLATE.map((card) =>
    card.glyph === "terminal" ? { ...card, to: `${ROUTES.HOME}#${HOME_SECTIONS.TERMINAL}` } : card
  );

  const discover: InfoCard[] = [
    {
      glyph: "arrowDown",
      title: "Download",
      body: "Windows desktop. Runs offline, opens files read-only, writes nothing back.",
      to: ROUTES.DOWNLOAD
    },
    {
      glyph: "tag",
      title: "Pricing",
      body: "Free while it is in development, and the shape of the plans that come after.",
      to: ROUTES.PRICING
    },
    {
      glyph: "user",
      title: "Register",
      body: "An account for licences and updates. Nothing you open is ever uploaded.",
      to: ROUTES.REGISTER
    },
    {
      glyph: "clipboard",
      title: "Third-party licences",
      body: "Everything bundled, what it is for, and the terms it ships under.",
      to: ROUTES.LICENSES
    }
  ];

  return (
    <>
      <ProductIntroduction />

      {/* A heading-less strip directly under the hero. */}
      <Section id={HOME_SECTIONS.STRIP} label="Find a format">
        <SupportedFormatSearch />
      </Section>

      <Section
        id={HOME_SECTIONS.WHAT_IT_DOES}
        eyebrow="01 — The window"
        title="What it does"
        lead="One file, one window, every question answered at once."
        tone="sunken"
        hue="blue"
      >
        <Section
          id={HOME_SECTIONS.PROBLEM}
          level="h3"
          title="The problem"
          lead="One file, five tools, five partial answers."
        >
          <AnalysisToolsComparison />
        </Section>
        <Section
          id={HOME_SECTIONS.HOW_IT_WORKS}
          level="h3"
          title="How it works"
          lead="Drop a file and it becomes a tree. Anything inside it that is itself a file opens the same way, as deep as it goes."
        >
          <ContainmentTree />
        </Section>
        <Section
          id={HOME_SECTIONS.CAPABILITIES}
          level="h3"
          title="Capabilities"
          lead="Display, Readable, Raw, Patterns, Disassembly — all over the same bytes."
        >
          <FileInspectorDemo />
        </Section>
        <Section
          id={HOME_SECTIONS.DEMO}
          level="h3"
          title="See it in action"
          lead="A recording of the window doing all of this to real files, rather than a description of it."
        >
          <ProductDemoVideo />
        </Section>
      </Section>

      <Section
        id={HOME_SECTIONS.TERMINAL}
        eyebrow="02 — The agent"
        title="A terminal, and an agent that can see"
        lead="A real shell inside the window, with a command channel. Start Claude Code or Codex in it and it sees what you see, reads what you read, and drives the window for you."
        tone="raised"
      >
        <AgentTerminalDemo />
      </Section>

      <Section
        id={HOME_SECTIONS.WHAT_IT_OPENS}
        eyebrow="03 — The coverage"
        title="What it opens"
        lead="Archives, documents, executables, images, fonts, audio, video, 3D models."
      >
        <Section
          id={HOME_SECTIONS.FORMATS}
          level="h3"
          title="Format coverage"
          lead="Identified by bytes, not by extension."
        >
          <FileSignatureExamples />
        </Section>
        <Section
          id={HOME_SECTIONS.BEYOND}
          level="h3"
          title="Beyond analysis"
          lead="Viewing, conversion, and a terminal with an agent command channel."
        >
          <InfoCardGrid items={beyond} />
        </Section>
      </Section>

      <Section
        id={HOME_SECTIONS.ANALYSTS}
        eyebrow="04 — The evidence"
        title="Built for analysts"
        lead="Every byte accounted for — including the ones nothing claims."
        tone="raised"
        hue="crimson"
      >
        <FileByteCoverageMap />
      </Section>

      <Section
        id={HOME_SECTIONS.REVIEWS}
        eyebrow="05 — The verdict"
        title="What people say"
        lead="Reviews left by people with an account. One each, and they can change or remove their own."
        tone="sunken"
        hue="blue"
      >
        <Reviews />
      </Section>

      <Section
        id={HOME_SECTIONS.FAQ}
        eyebrow="06 — Questions"
        title="Questions, answered"
        lead="The things people ask before they open a file they care about."
      >
        <Faq />
      </Section>

      {/* The closing band: where the reader goes next. */}
      <Section id={HOME_SECTIONS.DISCOVER} eyebrow="07 — Next" title="Discover more">
        <InfoCardGrid items={discover} />
      </Section>
    </>
  );
}
