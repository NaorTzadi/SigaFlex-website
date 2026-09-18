/**
 * Static values that more than one class needs. Nothing here changes at run time.
 * Values that do change live in Globals. Route paths live in Routing.
 */

export const SITE_NAME = "File Analyzer";
export const PRODUCT_NAME = "FileAnalyzer";

/** The one-line answer, per the product brief. */
export const TAGLINE =
  "Opens any file, tells you what it actually is, and shows you everything inside it.";

/**
 * Every link that leaves this domain. Adding one here is not enough:
 * it must also be recorded in OUTSIDE_ROUTES.md.
 */
export const EXTERNAL_LINKS = {
  FFMPEG_SOURCE: "https://ffmpeg.org/download.html"
} as const;

/**
 * Section ids on the home page. The header nav, the footer and the sections
 * all share these, so a link and its target cannot drift apart.
 *
 * The indented ones are bands nested inside the band above them.
 */
export const HOME_SECTIONS = {
  HERO: "hero",
  STRIP: "strip",
  WHAT_IT_DOES: "what-it-does",
  PROBLEM: "problem",
  HOW_IT_WORKS: "how-it-works",
  CAPABILITIES: "capabilities",
  WHAT_IT_OPENS: "what-it-opens",
  FORMATS: "formats",
  BEYOND: "beyond",
  ANALYSTS: "analysts",
  DISCOVER: "discover"
} as const;

/** The id the skip link jumps to, and the landmark it lands on. */
export const MAIN_CONTENT_ID = "main-content";

/**
 * Registration rules the client checks before it bothers the server.
 * The server enforces its own; these only spare the reader a round trip.
 */
export const PASSWORD_MIN_LENGTH = 12;
