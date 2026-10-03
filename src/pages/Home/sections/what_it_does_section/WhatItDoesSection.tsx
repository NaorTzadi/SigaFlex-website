import { HOME_SECTIONS } from "../../../../core/Constants";
import Section from "../Section";
import AnalysisToolsComparison from "./AnalysisToolsComparison";
import ContainmentTree from "./ContainmentTree";
import FileInspectorDemo from "./FileInspectorDemo";
import ProductDemoVideo from "./ProductDemoVideo";

export default function WhatItDoesSection() {
  return (
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
        title="Explore the whole file"
        lead="Structure, format-specific details and content, together in one window."
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
        lead="Readable, Raw, Patterns, Disassembly, Hexadecimal, C code — all over the same bytes."
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
  );
}
