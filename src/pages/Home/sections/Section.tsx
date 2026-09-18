/**
 * One band of the home page.
 *
 * Every band is the same shape — a landmark, the heading that names it, an
 * optional lead line, then its own content. Keeping that in one component is
 * what makes the page navigable: the header nav scrolls to `id`, and a screen
 * reader gets a labelled region every time.
 *
 * A band can hold other bands. An outer one is an h2, the ones nested inside it
 * are h3, and the heading order stays legal however deep the page grows. That
 * is how a page carries a lot of ground without becoming a flat list of twenty
 * equal-weight sections.
 *
 * A band with no title is a strip — a logo row, a badge row, a figure — and it
 * takes `label` instead, so it is still announced.
 *
 * When a band grows real content, give it its own component and render it as
 * this one's children rather than duplicating the wrapper.
 */

import type { ReactNode } from "react";

import { cx } from "../../../core/Utility";
import "./section.css";

type SectionProps = {
  id: string;
  title?: string;
  /** h2 for a band of the page, h3 for a band nested inside one. */
  level?: "h2" | "h3";
  /** Names the band when it has no visible title. */
  label?: string;
  lead?: string;
  children?: ReactNode;
};

export default function Section({ id, title, level = "h2", label, lead, children }: SectionProps) {
  const headingId = `${id}-heading`;
  const Heading = level;
  const nested = level === "h3";

  return (
    <section
      className={cx("section", nested && "section-nested")}
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : label}
    >
      <div className="section_inner">
        {title && (
          <Heading className="section_title" id={headingId}>
            {title}
          </Heading>
        )}

        {lead && <p className="section_lead">{lead}</p>}

        <div className="section_body">
          {children ?? <p className="section_placeholder">Content goes here.</p>}
        </div>
      </div>
    </section>
  );
}
