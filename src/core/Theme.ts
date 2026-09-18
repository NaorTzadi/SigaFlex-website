/**
 * The single place the look of the site is decided from.
 *
 * The values themselves live in theme.css as custom properties, one block per
 * mode. This class picks the mode, writes it onto <html data-theme>, and hands
 * out the breakpoints so layout code never hard-codes a pixel width.
 *
 * Changing the theme later means editing theme.css and, at most, MODES here.
 */

import { COOKIE, get, set } from "./CookiesManager";

export const MODES = ["light", "dark"] as const;
export type Mode = (typeof MODES)[number];

/**
 * Layout breakpoints, in px, for the rare component that has to ask matchMedia.
 * Layout itself is done in CSS; these mirror the media queries in theme.css.
 */
export const BREAKPOINT = {
  MOBILE: 0,
  TABLET: 640,
  DESKTOP: 1024,
  WIDE: 1440
} as const;

function isMode(value: string | null): value is Mode {
  return value !== null && (MODES as readonly string[]).includes(value);
}

function systemMode(): Mode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function current(): Mode {
  const attribute = document.documentElement.getAttribute("data-theme");
  return isMode(attribute) ? attribute : systemMode();
}

export function apply(mode: Mode): void {
  document.documentElement.setAttribute("data-theme", mode);
  set(COOKIE.THEME, mode);
}

/** Called once at start-up: stored choice wins, otherwise the OS setting. */
export function init(): void {
  const stored = get(COOKIE.THEME);
  document.documentElement.setAttribute("data-theme", isMode(stored) ? stored : systemMode());
}
