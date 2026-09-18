/**
 * One of the application's glyphs, drawn inline.
 *
 * Inline rather than an <img>: the shape inherits `currentColor`, so it follows
 * the theme and the surrounding text without a second copy per mode, and it
 * costs no request.
 *
 * Accessibility turns on one question — does this glyph carry meaning the text
 * around it does not? Give it a `title` and it is announced as an image. Leave
 * `title` off and it is hidden from assistive technology, which is correct for
 * a glyph sitting beside a label that already says the same thing.
 *
 * `size` is in the same units as the text, so an icon set at 1em matches
 * whatever it sits next to at any zoom.
 */

import { cx } from "../../core/Utility";
import { GLYPHS } from "./glyphs";
import type { GlyphName } from "./glyphs";
import "./icon.css";

type IconProps = {
  name: GlyphName;
  /** Any CSS length. Defaults to the current font size. */
  size?: string;
  /** What the glyph means. Omit when the neighbouring text already says it. */
  title?: string;
  className?: string;
};

export default function Icon({ name, size = "1em", title, className }: IconProps) {
  return (
    <svg
      className={cx("icon", className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      /* Keeps the glyph out of the tab order in Internet Explorer's descendants
         and in some screen-reader virtual cursors. */
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* even-odd, matching the fill rule the app draws these with — several
          glyphs rely on it for their cut-outs. */}
      <path d={GLYPHS[name]} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
