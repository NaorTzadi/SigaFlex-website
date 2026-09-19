/**
 * The contents of a long page, and where in it the reader currently is.
 *
 * Privacy, Terms and anything else that grows past a screenful of prose: the
 * reader should be able to see the whole shape of the page at once and jump
 * into the part they came for, rather than scrolling to find out what is there.
 *
 * The links are plain anchors, so they work with JavaScript idle and each one
 * is a URL that can be copied. The highlight is the only scripted part, and
 * losing it costs nothing.
 */

import { useEffect, useState } from "react";

import "./contents.css";

const className = "contents";

export type ContentsEntry = { id: string; title: string };

type ContentsProps = {
  /** Names the landmark, since the list itself is not headed. */
  label: string;
  entries: ContentsEntry[];
};

export default function Contents({ label, entries }: ContentsProps) {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((target): target is HTMLElement => target !== null);

    if (targets.length === 0 || !("IntersectionObserver" in window)) return;

    /* The band that counts as "here" is the top third of the viewport, under
       the header. A section entering it becomes the current one; the topmost
       wins when two are in it at once. */
    const observer = new IntersectionObserver(
      (records) => {
        const inside = records
          .filter((record) => record.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        if (inside.length > 0) setCurrent(inside[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    /* Entries are declared at module scope by the pages, so this runs once. */
  }, [entries]);

  return (
    <nav className={className} aria-label={label}>
      <p className={`${className}_title`}>On this page</p>
      <ol className={`${className}_list`}>
        {entries.map((entry, index) => (
          <li className={`${className}_item`} key={entry.id}>
            <a
              className={
                entry.id === current ? `${className}_link ${className}_link-current` : `${className}_link`
              }
              href={`#${entry.id}`}
              aria-current={entry.id === current ? "true" : undefined}
            >
              <span className={`${className}_number`} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {entry.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
