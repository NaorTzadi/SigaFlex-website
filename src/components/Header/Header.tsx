/**
 * Site header: the brand, a flyout menu over the home page's grouped bands,
 * the routed links and the call to action.
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

import Icon from "../Icon/Icon";
import { ROUTES } from "../../Routing";
import { HOME_SECTIONS, SITE_NAME } from "../../core/Constants";
import { useGlobal } from "../../core/Globals";
import * as ServerBridge from "../../core/ServerBridge";
import { cx } from "../../core/Utility";
import "./header.css";

const className = "header";

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
  const productRef = useRef<HTMLLIElement>(null);
  const signedIn = useGlobal("signedIn");
  const accountEmail = useGlobal("accountEmail");

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

  return (
    <header className={className}>
      <div className={`${className}_bar`}>
        <Link className={`${className}_brand`} to={ROUTES.HOME} onClick={closeMenus}>
          <Icon className={`${className}_brand_mark`} name="package" size="1.25em" />
          {SITE_NAME}
        </Link>

        <button
          className={`${className}_toggle`}
          type="button"
          aria-expanded={open}
          aria-controls="header-nav"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <Icon name={open ? "close" : "menu"} size="1.125em" />
          {open ? "Close" : "Menu"}
        </button>

        <nav className={cx(`${className}_nav`, open && `${className}_nav-open`)} id="header-nav" aria-label="Main">
          <ul className={`${className}_nav_list`}>
            <li className={`${className}_nav_item`} ref={productRef}>
              <button
                className={`${className}_nav_button`}
                type="button"
                aria-expanded={flyout}
                aria-controls="header-flyout"
                onClick={() => setFlyout((wasOpen) => !wasOpen)}
              >
                Product
              </button>

              <ul className={cx(`${className}_flyout`, flyout && `${className}_flyout-open`)} id="header-flyout">
                {PRODUCT_MENU.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      className={`${className}_flyout_link`}
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
              <li className={`${className}_nav_item`} key={entry.id}>
                <Link
                  className={`${className}_nav_link`}
                  to={`${ROUTES.HOME}#${entry.id}`}
                  onClick={closeMenus}
                >
                  {entry.label}
                </Link>
              </li>
            ))}

            {signedIn && (
              <li className={`${className}_nav_item`}>
                <NavLink
                  className={({ isActive }) => cx(`${className}_nav_link`, isActive && `${className}_nav_link-active`)}
                  to={ROUTES.ACCOUNT}
                  title={accountEmail}
                  onClick={closeMenus}
                >
                  Account
                </NavLink>
              </li>
            )}

            <li className={`${className}_nav_item`}>
              {signedIn ? (
                <button
                  className={`${className}_nav_button`}
                  type="button"
                  title={accountEmail}
                  onClick={() => {
                    closeMenus();
                    void ServerBridge.logout();
                  }}
                >
                  Sign out
                </button>
              ) : (
                <NavLink
                  className={({ isActive }) => cx(`${className}_nav_link`, isActive && `${className}_nav_link-active`)}
                  to={ROUTES.LOGIN}
                  onClick={closeMenus}
                >
                  Sign in
                </NavLink>
              )}
            </li>
          </ul>

          <div className={`${className}_actions`}>
            <Link
              className="fa_button fa_button-primary fa_button-small"
              to={ROUTES.DOWNLOAD}
              onClick={closeMenus}
            >
              Download
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
