import { HOME_SECTIONS } from "../../../../core/Constants";
import { ROUTES } from "../../../../Routing";
import InfoCardGrid from "../InfoCardGrid";
import type { InfoCard } from "../InfoCardGrid";
import Section from "../Section";

export default function DiscoverSection() {
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
    <Section id={HOME_SECTIONS.DISCOVER} eyebrow="07 — Next" title="Discover more">
      <InfoCardGrid items={discover} />
    </Section>
  );
}
