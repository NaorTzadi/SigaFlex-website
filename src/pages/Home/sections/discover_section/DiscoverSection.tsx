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
      body: "Upcoming Windows desktop application. Downloads are not available yet.",
      to: ROUTES.DOWNLOAD
    },
    {
      glyph: "tag",
      title: "Pricing",
      body: "The plans planned for release. Nothing can be tried or bought yet.",
      to: ROUTES.PRICING
    },
    {
      glyph: "userPlus",
      title: "Register",
      body: "A free account, used for reviews on this site today and for trials and plans at release.",
      to: ROUTES.REGISTER
    },
    {
      glyph: "book",
      title: "Third-party licences",
      body: "Everything bundled, what it is for, and the terms it ships under.",
      to: ROUTES.LICENSES
    }
  ];

  return (
    <Section id={HOME_SECTIONS.DISCOVER} title="Discover more">
      <InfoCardGrid items={discover} />
    </Section>
  );
}
