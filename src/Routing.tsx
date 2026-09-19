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
import type { ReactElement } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Download from "./pages/Download/Download";
import Account from "./pages/Account/Account";
import Profile from "./pages/Profile/Profile";
import Password from "./pages/Password/Password";
import Confirm from "./pages/Confirm/Confirm";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import Licenses from "./pages/Licenses/Licenses";
import NotFound from "./pages/NotFound/NotFound";
import { MAIN_CONTENT_ID, SITE_NAME } from "./core/Constants";
import { useGlobal } from "./core/Globals";
import { prefersReducedMotion, scrollToSection } from "./core/Utility";

export const ROUTES = {
  HOME: "/",
  DOWNLOAD: "/download",
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

/** The tab title for each route. A single-page app has to set this itself. */
const TITLE: Record<string, string> = {
  [ROUTES.HOME]: SITE_NAME,
  [ROUTES.DOWNLOAD]: `Download — ${SITE_NAME}`,
  [ROUTES.REGISTER]: `Register — ${SITE_NAME}`,
  [ROUTES.LOGIN]: `Sign in — ${SITE_NAME}`,
  [ROUTES.ACCOUNT]: `Your account — ${SITE_NAME}`,
  [ROUTES.PASSWORD]: `Reset your password — ${SITE_NAME}`,
  [ROUTES.CONFIRM]: `Confirm your address — ${SITE_NAME}`,
  [ROUTES.CONTACT]: `Contact — ${SITE_NAME}`,
  [ROUTES.PRIVACY]: `Privacy — ${SITE_NAME}`,
  [ROUTES.TERMS]: `Terms — ${SITE_NAME}`,
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

function SessionGate({ needed, children }: { needed: boolean; children: ReactElement }) {
  const signedIn = useGlobal("signedIn");
  const checked = useGlobal("sessionChecked");
  const { pathname } = useLocation();

  if (!checked) return null;
  if (signedIn === needed) return children;

  return needed ? (
    <Navigate to={ROUTES.LOGIN} replace state={{ from: pathname }} />
  ) : (
    <Navigate to={ROUTES.ACCOUNT} replace />
  );
}

export default function Routing() {
  return (
    <>
      <RouteChange />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DOWNLOAD} element={<Download />} />
        <Route
          path={ROUTES.REGISTER}
          element={
            <SessionGate needed={false}>
              <Account />
            </SessionGate>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <SessionGate needed={false}>
              <Account />
            </SessionGate>
          }
        />
        <Route
          path={ROUTES.ACCOUNT}
          element={
            <SessionGate needed>
              <Profile />
            </SessionGate>
          }
        />
        <Route path={ROUTES.PASSWORD} element={<Password />} />
        <Route path={ROUTES.CONFIRM} element={<Confirm />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.LICENSES} element={<Licenses />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}
