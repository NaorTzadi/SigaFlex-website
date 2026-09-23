/**
 * Static values that more than one class needs. Nothing here changes at run time.
 * Values that do change live in Globals. Route paths live in Routing.
 */
export const SITE_NAME = "SigaFlex";
export const PRODUCT_NAME = "SigaFlex";

/** The one-line answer, per the product brief. */
export const TAGLINE =
  "Opens any file, tells you what it actually is, and shows you everything inside it.";

/** The one address the site publishes: support, privacy requests and security reports. */
export const CONTACT_EMAIL = "naorprojects1@gmail.com";

/**
 * Everything about the site that is not decided yet. Every value here is a
 * placeholder carrying the word "holder", so one grep finds all of them when
 * the real domain and operator are known.
 */
export const SITE_URL = "https://holder.com";
export const SITE_OPERATOR = "Holder";
export const SITE_JURISDICTION = "Holder";

/** Shown on the Terms and the Privacy pages as the date they last changed. */
export const POLICY_UPDATED = "19 September 2026";

/**
 * Every link that leaves this domain. Adding one here is not enough:
 * it must also be recorded in OUTSIDE_ROUTES.md.
 */
export const EXTERNAL_LINKS = {
  FFMPEG_SOURCE: "https://ffmpeg.org/download.html",
  YOUTUBE_CHANNEL: "https://www.youtube.com/@SigaFlex",
  DEMO_VIDEO: "https://www.youtube-nocookie.com/embed/hunAcThQbF4"
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
  DEMO: "demo",
  TERMINAL: "terminal",
  WHAT_IT_OPENS: "what-it-opens",
  FORMATS: "formats",
  BEYOND: "beyond",
  ANALYSTS: "analysts",
  REVIEWS: "reviews",
  FAQ: "faq",
  DISCOVER: "discover"
} as const;

/** The id the skip link jumps to, and the landmark it lands on. */
export const MAIN_CONTENT_ID = "main-content";

/**
 * Registration rules the client checks before it bothers the server.
 * The server enforces its own; these only spare the reader a round trip.
 */
export const PASSWORD_MIN_LENGTH = 10;

/** Review limits, matching what the server enforces. */
export const REVIEW_NAME_MAX_LENGTH = 60;
export const REVIEW_BODY_MAX_LENGTH = 2000;
export const REVIEW_RATINGS = [1, 2, 3, 4, 5] as const;
