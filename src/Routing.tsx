/**
 * Every route in the site, in one file.
 *
 * Nothing else declares a path, and nothing else decides which page renders.
 * If you are hunting for where a URL goes, it is here and only here.
 *
 * Shape of the site: one scrolling home page, plus a small number of pages you
 * are routed to. Movement inside the home page is scrolling to a section id
 * (Constants.HOME_SECTIONS), not a route.
 */

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Download from "./pages/Download/Download";
import Register from "./pages/Register/Register";
import Licenses from "./pages/Licenses/Licenses";
import NotFound from "./pages/NotFound/NotFound";
import { MAIN_CONTENT_ID, SITE_NAME } from "./core/Constants";
import { prefersReducedMotion, scrollToSection } from "./core/Utility";

export const ROUTES = {
  HOME: "/",
  DOWNLOAD: "/download",
  REGISTER: "/register",
  /** Mandatory: the FFmpeg distribution obliges us to publish this. Never drop it. */
  LICENSES: "/licenses",
  NOT_FOUND: "*"
} as const;

/** The tab title for each route. A single-page app has to set this itself. */
const TITLE: Record<string, string> = {
  [ROUTES.HOME]: SITE_NAME,
  [ROUTES.DOWNLOAD]: `Download — ${SITE_NAME}`,
  [ROUTES.REGISTER]: `Register — ${SITE_NAME}`,
  [ROUTES.LICENSES]: `Third-Party Licenses — ${SITE_NAME}`
};

/**
 * A routed page names itself, starts at the top, and puts focus on the content,
 * because a single-page app never reloads and none of that happens on its own.
 *
 * A hash means "the home page, at this section". Jumping to a section from
 * another page is a navigation, so it is handled here rather than by the caller
 * guessing when the new page has rendered.
 */
function RouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = TITLE[pathname] ?? `Page not found — ${SITE_NAME}`;

    if (hash) {
      scrollToSection(hash.slice(1));
      return;
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

export default function Routing() {
  return (
    <>
      <RouteChange />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DOWNLOAD} element={<Download />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LICENSES} element={<Licenses />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}
