import { HOME_SECTIONS } from "../../../../core/Constants";
import { ROUTES } from "../../../../Routing";
import InfoCardGrid from "../InfoCardGrid";
import type { InfoCard } from "../InfoCardGrid";
import Section from "../Section";
import SupportedFormatSearch from "../format_search_section/SupportedFormatSearch";
import FileSignatureExamples from "./FileSignatureExamples";

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

export default function WhatItOpensSection() {
  /* Built here, not at module scope: Routing imports this page, so ROUTES is
     still being initialised while this module is evaluated. */
  const beyond: InfoCard[] = BEYOND_TEMPLATE.map((card) =>
    card.glyph === "terminal" ? { ...card, to: `${ROUTES.HOME}#${HOME_SECTIONS.TERMINAL}` } : card
  );

  return (
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
        <SupportedFormatSearch />
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
  );
}
