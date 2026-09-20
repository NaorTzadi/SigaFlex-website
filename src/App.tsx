/**
 * The shell: the parts that stay put while the routed page changes underneath.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Routing from "./Routing";
import * as ServerBridge from "./core/ServerBridge";
import { MAIN_CONTENT_ID } from "./core/Constants";
import { useGlobal } from "./core/Globals";
import "./app.css";

const className = "app";

export default function App() {
  const busy = useGlobal("serverBusy");
  const { pathname } = useLocation();

  /* A reload keeps the token but not the knowledge that it still works, so the
     shell asks once. A dead token is cleared by the ask itself. */
  useEffect(() => {
    void ServerBridge.currentAccount().catch(() => undefined);
  }, []);

  return (
    <div className={className}>
      <div className={`${className}_progress`} data-busy={busy || undefined} aria-hidden="true" />

      <a className={`${className}_skip_link`} href={`#${MAIN_CONTENT_ID}`}>
        Skip to main content
      </a>

      <Header />

      <main className={`${className}_main`} id={MAIN_CONTENT_ID} tabIndex={-1} key={pathname}>
        <Routing />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
