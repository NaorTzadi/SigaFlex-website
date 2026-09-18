/**
 * The one place on the page where screenshots rotate.
 *
 * Every slide is stacked in the same frame and crossfaded, so the frame never
 * changes size and the page never jumps.
 *
 * Anything that moves on its own has to be stoppable — a reader who needs more
 * than five seconds with a screenshot, or who finds movement painful, must be
 * able to stop it (WCAG 2.2.2). So:
 *
 *   - a pause control, always present, never hidden behind a hover;
 *   - rotation stops while the pointer is over the frame or focus is inside it,
 *     so it cannot move out from under someone reading or tabbing;
 *   - dots to go straight to a slide, which also stop the rotation, because
 *     choosing a slide and then having it taken away is worse than useless;
 *   - no rotation at all, and no fade, when the reader's system asks for
 *     reduced motion.
 *
 * Only the visible slide is exposed to assistive technology; the rest are
 * hidden, so a screen reader reads one screenshot rather than four.
 */

import { useEffect, useState } from "react";

import { cx, prefersReducedMotion } from "../../../core/Utility";
import "./showcase.css";

export type Slide = { src: string; alt: string };

type ShowcaseProps = {
  slides: Slide[];
  /** What the whole rotating set is, for assistive technology. */
  label: string;
  /** Milliseconds a slide is held. Long enough to actually look at one. */
  interval?: number;
};

export default function Showcase({ slides, label, interval = 6000 }: ShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced] = useState(() => prefersReducedMotion());

  const rotating = playing && !held && !reduced && slides.length > 1;

  useEffect(() => {
    if (!rotating) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [rotating, interval, slides.length]);

  /** Picking a slide is a decision to stay on it. */
  function show(next: number) {
    setIndex(next);
    setPlaying(false);
  }

  return (
    <div
      className="showcase"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="showcase_frame">
        {slides.map((slide, i) => (
          <img
            className={cx("showcase_slide", i === index && "showcase_slide-current")}
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={3840}
            height={2160}
            aria-hidden={i !== index}
            /* The first slide is above the fold; the rest can wait. */
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      <div className="showcase_controls">
        {!reduced && (
          <button
            className="showcase_play"
            type="button"
            onClick={() => setPlaying((wasPlaying) => !wasPlaying)}
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}

        <ul className="showcase_dots">
          {slides.map((slide, i) => (
            <li key={slide.src}>
              <button
                className={cx("showcase_dot", i === index && "showcase_dot-current")}
                type="button"
                aria-current={i === index}
                onClick={() => show(i)}
              >
                {/* The dot is a shape; its name is what it goes to. */}
                <span className="showcase_dot_label">{`Screenshot ${i + 1} of ${slides.length}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
