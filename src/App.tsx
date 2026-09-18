/**
 * The shell: the parts that stay put while the routed page changes underneath.
 */

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Routing from "./Routing";
import { MAIN_CONTENT_ID } from "./core/Constants";
import "./app.css";

export default function App() {
  return (
    <div className="app">
      <a className="app_skip_link" href={`#${MAIN_CONTENT_ID}`}>
        Skip to main content
      </a>

      <Header />

      <main className="app_main" id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Routing />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
