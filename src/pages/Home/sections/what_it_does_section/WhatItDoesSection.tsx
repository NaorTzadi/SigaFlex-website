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
      label="What it does"
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
      >
        <FileInspectorDemo />
      </Section>
      <Section
        id={HOME_SECTIONS.DEMO}
        level="h3"
        title="See it in action"
      >
        <ProductDemoVideo />
      </Section>
    </Section>
  );
}
