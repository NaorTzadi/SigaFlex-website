/**
 * Static values that more than one class needs. Nothing here changes at run time.
 * All asset paths, routes, and endpoint paths are defined here. Runtime state lives in Globals.
 */
/** Asset URLs are resolved by Vite for the browser and by URL for build configuration. */
export const ASSETS = {
  brandIcon: new URL("../assets/images/logos/sigaflex_icon_simplified_256x256.png", import.meta.url).href,
  animatedLogo: new URL("../assets/images/logos/sigaflex_icon_animation.svg", import.meta.url).href,
  favicon: new URL("../assets/images/logos/sigaflex_icon_simplified_1.svg", import.meta.url).href,
  treeView: new URL("../assets/images/screenshots/tree-zip-nested.png", import.meta.url).href,
  disassembly: new URL("../assets/images/screenshots/inspector-disassembly.png", import.meta.url).href,
  details: new URL("../assets/images/screenshots/details-pe-structure.png", import.meta.url).href,
  colors: new URL("../assets/images/screenshots/colors-photo.png", import.meta.url).href,
  model: new URL("../assets/images/screenshots/display-3d-model.png", import.meta.url).href
} as const;

/** Font locations for CSS aliases, relative to the website root unless absolute. */
export const FONT_PATHS = {
  "@preview-brand-font": "./src/assets/fonts/Audiowide-Regular.ttf",
  "@font-sans": "./src/assets/fonts/ibm-plex-sans-var.woff2",
  "@font-mono": "./src/assets/fonts/ibm-plex-mono-var.woff2"
} as const;

export const PRODUCT_NAME = "SigaFlex";
export const SITE_NAME = PRODUCT_NAME;
export const BRAND_NAME_PARTS = { silver: "Siga", gold: "Flex" } as const;

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
  INSTAGRAM_PROFILE: "https://www.instagram.com/sigaflex/",
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

export const ROUTES = {
  HOME: "/",
  DOWNLOAD: "/download",
  PRICING: "/pricing",
  /** Register and sign in are two tabs of one page; the route picks the tab. */
  REGISTER: "/register",
  LOGIN: "/login",
  ACCOUNT: "/account",
  /** Both halves of a password reset: with a token it sets one, without it asks. */
  PASSWORD: "/reset-password",
  /** Where a confirmation mail lands. Carries the token in the query. */
  CONFIRM: "/confirm",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  /** Mandatory: the FFmpeg distribution obliges us to publish this. Never drop it. */
  LICENSES: "/licenses",
  NOT_FOUND: "*"
} as const;

export const ENDPOINT = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  RESUME: "/auth/resume",
  SESSION: "/auth/session",
  CONFIRM: "/auth/confirm",
  RESEND_CONFIRMATION: "/auth/resend-confirmation",
  CHANGE_EMAIL: "/auth/change-email",
  CHANGE_PASSWORD: "/auth/change-password",
  LOGOUT_ALL: "/auth/logout-all",
  DELETE_ACCOUNT: "/auth/delete-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REVIEWS: "/reviews",
  MY_REVIEW: "/reviews/mine"
} as const;
