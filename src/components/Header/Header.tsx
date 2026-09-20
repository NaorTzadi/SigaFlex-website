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
 * It is sticky, so on a page that is one long scroll the way out of a band is
 * always reachable — and, being always on screen, it also says which band the
 * reader is currently in. See useCurrentSection.
 */

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import Icon from "../Icon/Icon";
import type { GlyphName } from "../Icon/glyphs";
import { ROUTES } from "../../Routing";
import { HOME_SECTIONS, SITE_NAME } from "../../core/Constants";
import { useGlobal } from "../../core/Globals";
import * as ServerBridge from "../../core/ServerBridge";
import { cx } from "../../core/Utility";
import "./header.css";

const className = "header";

/** The bands behind the flyout. */
const PRODUCT_MENU: Array<{ id: string; label: string; glyph: GlyphName; hint: string }> = [
  { id: HOME_SECTIONS.PROBLEM, label: "The problem", glyph: "grid", hint: "Five tools, five partial answers" },
  { id: HOME_SECTIONS.HOW_IT_WORKS, label: "How it works", glyph: "package", hint: "A file becomes a tree, as deep as it goes" },
  { id: HOME_SECTIONS.CAPABILITIES, label: "Capabilities", glyph: "inspect", hint: "Five views of the same bytes" },
  { id: HOME_SECTIONS.DEMO, label: "See it in action", glyph: "eye", hint: "The window on real files" },
  { id: HOME_SECTIONS.BEYOND, label: "Beyond analysis", glyph: "convert", hint: "Viewing, conversion, terminal, export" },
  { id: HOME_SECTIONS.FAQ, label: "Questions", glyph: "question", hint: "Safety, cost, platforms, accounts" }
];

/** Bands promoted to the top level, beside the flyout. */
const TOP_LEVEL: Array<{ id: string; label: string }> = [
  { id: HOME_SECTIONS.TERMINAL, label: "Terminal" },
  { id: HOME_SECTIONS.FORMATS, label: "Formats" },
  { id: HOME_SECTIONS.ANALYSTS, label: "For analysts" }
];

const NAV_SECTIONS = [...PRODUCT_MENU, ...TOP_LEVEL].map((entry) => entry.id);

function useCurrentSection(onHome: boolean): string {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (!onHome) {
      setCurrent("");
      return;
    }

    let frame = 0;

    function measure() {
      frame = 0;
      const line = window.innerHeight / 3;
      let found = "";
      let deepest = -Infinity;

      for (const id of NAV_SECTIONS) {
        const box = document.getElementById(id)?.getBoundingClientRect();
        if (!box || box.top > line || box.bottom <= 0 || box.top < deepest) continue;
        deepest = box.top;
        found = id;
      }

      setCurrent(found);
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  return current;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState(false);
  const productRef = useRef<HTMLLIElement>(null);
  const signedIn = useGlobal("signedIn");
  const accountEmail = useGlobal("accountEmail");
  const current = useCurrentSection(useLocation().pathname === ROUTES.HOME);
  const inProduct = PRODUCT_MENU.some((entry) => entry.id === current);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* An open flyout closes on Escape and on a click anywhere outside it. */
  useEffect(() => {
    if (!flyout) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setFlyout(false);
    }
    function onPointer(event: MouseEvent) {
      if (!productRef.current?.contains(event.target as Node)) setFlyout(false);
    }
    function onFocus(event: FocusEvent) {
      if (!productRef.current?.contains(event.target as Node)) setFlyout(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [flyout]);

  /** Following any link puts the header back the way it was. */
  function closeMenus() {
    setOpen(false);
    setFlyout(false);
  }

  return (
    <header className={cx(className, scrolled && `${className}-scrolled`)}>
      <div className={`${className}_bar`}>
        <Link className={`${className}_brand`} to={ROUTES.HOME} onClick={closeMenus}>
          <Icon className={`${className}_brand_mark`} name="package" size="1.25em" />
          {SITE_NAME}
        </Link>

        <div className={`${className}_actions`}>
          <Link
            className="fa_button fa_button-primary fa_button-small"
            to={ROUTES.DOWNLOAD}
            onClick={closeMenus}
          >
            Download
          </Link>
        </div>

        <button
          className={`${className}_toggle`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="header-nav"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <Icon name={open ? "close" : "menu"} size="1.125em" />
          <span className={`${className}_toggle_label`}>{open ? "Close" : "Menu"}</span>
        </button>

        <nav className={cx(`${className}_nav`, open && `${className}_nav-open`)} id="header-nav" aria-label="Main">
          <ul className={`${className}_nav_list`}>
            <li className={`${className}_nav_item`} ref={productRef}>
              <button
                className={cx(`${className}_nav_button`, inProduct && `${className}_nav_button-active`)}
                type="button"
                aria-expanded={flyout}
                aria-controls="header-flyout"
                onClick={() => setFlyout((wasOpen) => !wasOpen)}
              >
                Product
                <Icon
                  className={cx(`${className}_chevron`, flyout && `${className}_chevron-open`)}
                  name="chevronDown"
                  size="0.75em"
                />
              </button>

              <ul className={cx(`${className}_flyout`, flyout && `${className}_flyout-open`)} id="header-flyout">
                {PRODUCT_MENU.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      className={cx(
                        `${className}_flyout_link`,
                        entry.id === current && `${className}_flyout_link-current`
                      )}
                      to={`${ROUTES.HOME}#${entry.id}`}
                      aria-current={entry.id === current ? "location" : undefined}
                      onClick={closeMenus}
                    >
                      <Icon className={`${className}_flyout_glyph`} name={entry.glyph} size="1.125em" />
                      <span>{entry.label}</span>
                      <span className={`${className}_flyout_hint`}>{entry.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {TOP_LEVEL.map((entry) => (
              <li className={`${className}_nav_item`} key={entry.id}>
                <Link
                  className={cx(
                    `${className}_nav_link`,
                    entry.id === current && `${className}_nav_link-current`
                  )}
                  to={`${ROUTES.HOME}#${entry.id}`}
                  aria-current={entry.id === current ? "location" : undefined}
                  onClick={closeMenus}
                >
                  {entry.label}
                </Link>
              </li>
            ))}

            <li className={`${className}_nav_item`}>
              <NavLink
                className={({ isActive }) => cx(`${className}_nav_link`, isActive && `${className}_nav_link-active`)}
                to={ROUTES.PRICING}
                onClick={closeMenus}
              >
                Pricing
              </NavLink>
            </li>

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
        </nav>
      </div>
    </header>
  );
}
