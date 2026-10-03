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

import { useState } from "react";

import Icon from "../../../../components/Icon/Icon";
import { cx, prefersReducedMotion } from "../../../../core/Utility";
import "./screenshotcarousel.css";

const className = "screenshotcarousel";

export type ScreenshotSlide = { src: string; alt: string; caption: string };

type ScreenshotCarouselProps = {
  slides: ScreenshotSlide[];
  /** What the whole rotating set is, for assistive technology. */
  label: string;
  /** Milliseconds a slide is held. Long enough to actually look at one. */
  interval?: number;
};

export default function ScreenshotCarousel({ slides, label, interval = 6000 }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced] = useState(() => prefersReducedMotion());

  const rotating = playing && !reduced && slides.length > 1;

  function advance() {
    setIndex((current) => (current + 1) % slides.length);
  }

  /** Picking a slide is a decision to stay on it. */
  function show(next: number) {
    setIndex(next);
    setPlaying(false);
  }

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className={`${className}_window`}>
        <div className={`${className}_chrome`} aria-hidden="true">
          <Icon className={`${className}_chrome_menu`} name="menu" />
          <span className={`${className}_chrome_controls`}>
            <Icon name="windowMinimize" />
            <Icon name="windowMaximize" />
            <Icon name="close" />
          </span>
        </div>

        <div className={`${className}_frame`}>
          {slides.map((slide, i) => (
            <img
              className={cx(`${className}_slide`, i === index && `${className}_slide-current`)}
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
      </div>

      <div className={`${className}_controls`}>
        {!reduced && (
          <button
            className={`${className}_play`}
            type="button"
            onClick={() => setPlaying((wasPlaying) => !wasPlaying)}
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}

        <ul className={`${className}_dots`}>
          {slides.map((slide, i) => (
            <li className={`${className}_dots_item`} key={slide.src}>
              <button
                className={cx(`${className}_dot`, i === index && `${className}_dot-current`)}
                type="button"
                aria-current={i === index}
                onClick={() => show(i)}
              >
                <span className={`${className}_dot_track`} aria-hidden="true">
                  {i === index && (
                    <span
                      className={cx(`${className}_dot_fill`, rotating && `${className}_dot_fill-running`)}
                      key={index}
                      style={{ animationDuration: `${interval}ms`, animationPlayState: held ? "paused" : "running" }}
                      onAnimationEnd={advance}
                    />
                  )}
                </span>
                <span className={`${className}_dot_caption`}>{slide.caption}</span>
                <span className={`${className}_dot_label`}>{`, screenshot ${i + 1} of ${slides.length}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
