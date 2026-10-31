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

import { useEffect, useRef, useState } from "react";

import "./tableofcontents.css";

const className = "tableofcontents";

export type TableOfContentsEntry = { id: string; title: string };

type TableOfContentsProps = {
  /** Names the landmark, since the list itself is not headed. */
  label: string;
  entries: TableOfContentsEntry[];
};

export default function TableOfContents({ label, entries }: TableOfContentsProps) {
  const [current, setCurrent] = useState("");
  /* A section the reader picked stays current until they scroll themselves:
     the last sections are too short to reach the top of the viewport, so
     position alone would leave an earlier one marked. */
  const pinned = useRef("");

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((target): target is HTMLElement => target !== null);

    if (targets.length === 0) return;

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (targets.some((target) => target.id === hash)) {
      pinned.current = hash;
      setCurrent(hash);
    }

    /* "Here" is the last section whose top has passed the upper third of the
       viewport. At the bottom of the page it is the last section in view. */
    function locate() {
      if (pinned.current) return;
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let found = "";
      for (const target of targets) {
        const top = target.getBoundingClientRect().top;
        if (top <= line || (atBottom && top < window.innerHeight)) found = target.id;
      }
      setCurrent(found);
    }

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(locate);
    }

    function release() {
      pinned.current = "";
    }

    locate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
    /* Entries are declared at module scope by the pages, so this runs once. */
  }, [entries]);

  function pick(id: string) {
    pinned.current = id;
    setCurrent(id);
  }

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
              onClick={() => pick(entry.id)}
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
