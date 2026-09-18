/**
 * Site header: the brand, a flyout menu over the home page's grouped bands,
 * the routed links, the theme switch and the call to action.
 *
 * The flyout is the one structural idea worth taking from a site with more
 * ground to cover than fits in a row of links: the top level stays short, and
 * the depth lives one keystroke away. Below the tablet breakpoint the whole
 * nav collapses to a toggle and the flyout becomes a plain nested list.
 *
 * Every band is linked as `/#id`, not wired to a click handler. Going to a
 * place is what a link is for — it can be opened in a new tab, copied, and
 * read out as a destination — and Routing does the scrolling when it arrives.
 *
 * It is not sticky. The first screen belongs to the hero.
 */

import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ROUTES } from "../../Routing";
import { HOME_SECTIONS, SITE_NAME } from "../../core/Constants";
import * as Theme from "../../core/Theme";
import { cx } from "../../core/Utility";
import "./header.css";

/** The bands behind the flyout. */
const PRODUCT_MENU: Array<{ id: string; label: string }> = [
  { id: HOME_SECTIONS.PROBLEM, label: "The problem" },
  { id: HOME_SECTIONS.HOW_IT_WORKS, label: "How it works" },
  { id: HOME_SECTIONS.CAPABILITIES, label: "Capabilities" },
  { id: HOME_SECTIONS.BEYOND, label: "Beyond analysis" }
];

/** Bands promoted to the top level, beside the flyout. */
const TOP_LEVEL: Array<{ id: string; label: string }> = [
  { id: HOME_SECTIONS.FORMATS, label: "Formats" },
  { id: HOME_SECTIONS.ANALYSTS, label: "For analysts" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState(false);
  const [mode, setMode] = useState<Theme.Mode>(() => Theme.current());
  const productRef = useRef<HTMLLIElement>(null);

  /* An open flyout closes on Escape and on a click anywhere outside it. */
  useEffect(() => {
    if (!flyout) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setFlyout(false);
    }
    function onPointer(event: MouseEvent) {
      if (!productRef.current?.contains(event.target as Node)) setFlyout(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [flyout]);

  /** Following any link puts the header back the way it was. */
  function closeMenus() {
    setOpen(false);
    setFlyout(false);
  }

  function toggleTheme() {
    const next: Theme.Mode = mode === "dark" ? "light" : "dark";
    Theme.apply(next);
    setMode(next);
  }

  return (
    <header className="header">
      <div className="header_bar">
        <Link className="header_brand" to={ROUTES.HOME} onClick={closeMenus}>
          {SITE_NAME}
        </Link>

        <button
          className="header_toggle"
          type="button"
          aria-expanded={open}
          aria-controls="header-nav"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          {open ? "Close menu" : "Menu"}
        </button>

        <nav className={cx("header_nav", open && "header_nav-open")} id="header-nav" aria-label="Main">
          <ul className="header_nav_list">
            <li className="header_nav_item" ref={productRef}>
              <button
                className="header_nav_button"
                type="button"
                aria-expanded={flyout}
                aria-controls="header-flyout"
                onClick={() => setFlyout((wasOpen) => !wasOpen)}
              >
                Product
              </button>

              <ul className={cx("header_flyout", flyout && "header_flyout-open")} id="header-flyout">
                {PRODUCT_MENU.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      className="header_flyout_link"
                      to={`${ROUTES.HOME}#${entry.id}`}
                      onClick={closeMenus}
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {TOP_LEVEL.map((entry) => (
              <li className="header_nav_item" key={entry.id}>
                <Link
                  className="header_nav_link"
                  to={`${ROUTES.HOME}#${entry.id}`}
                  onClick={closeMenus}
                >
                  {entry.label}
                </Link>
              </li>
            ))}

            <li className="header_nav_item">
              <NavLink
                className={({ isActive }) => cx("header_nav_link", isActive && "header_nav_link-active")}
                to={ROUTES.REGISTER}
                onClick={closeMenus}
              >
                Register
              </NavLink>
            </li>
          </ul>

          <div className="header_actions">
            <button className="header_theme_button" type="button" onClick={toggleTheme}>
              {mode === "dark" ? "Light theme" : "Dark theme"}
            </button>

            <Link className="header_cta" to={ROUTES.DOWNLOAD} onClick={closeMenus}>
              Download
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
