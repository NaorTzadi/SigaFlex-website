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
import BrandName from "../BrandName/BrandName";
import type { GlyphName } from "../Icon/glyphs";
import { ROUTES } from "../../Routing";
import { ASSETS, HOME_SECTIONS } from "../../core/Constants";
import { useGlobal } from "../../core/Globals";
import * as ServerBridge from "../../core/ServerBridge";
import { cx, initialOf, nameOf } from "../../core/Utility";
import "./header.css";

const className = "header";

/** The bands behind the flyout. */
const PRODUCT_MENU: Array<{ id: string; label: string; glyph: GlyphName; hint: string }> = [
  { id: HOME_SECTIONS.PROBLEM, label: "Explore the whole file", glyph: "grid", hint: "Structure, details and content together" },
  { id: HOME_SECTIONS.TERMINAL, label: "Terminal", glyph: "terminal", hint: "A terminal with an agent command channel" },
  { id: HOME_SECTIONS.FORMATS, label: "Formats", glyph: "file", hint: "Format coverage, identified by bytes" },
  { id: HOME_SECTIONS.BEYOND, label: "Beyond analysis", glyph: "convert", hint: "Viewing, conversion, terminal, export" },
  { id: HOME_SECTIONS.ANALYSTS, label: "For analysts", glyph: "inspect", hint: "Every byte accounted for" },
  { id: HOME_SECTIONS.FAQ, label: "Questions", glyph: "question", hint: "Safety, cost, platforms, accounts" }
];

const NAV_SECTIONS = PRODUCT_MENU.map((entry) => entry.id);

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

/* An open panel closes on Escape and on anything that happens outside it. */
function useDismiss(
  open: boolean,
  holder: { current: HTMLElement | null },
  setOpen: (open: boolean) => void
) {
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function outside(event: Event) {
      if (!holder.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [open, holder, setOpen]);
}

/**
 * Who is signed in, and the two things they can do about it.
 *
 * The convention every site with accounts has settled on: an avatar at the top
 * right, the name beside it, and the account's own pages behind it rather than
 * as another link competing with the nav. The account holds an address and no
 * picture, so the avatar is the first letter of it and the name is the part in
 * front of the @ — the whole address is in the menu, where there is room for it.
 */
function AccountMenu({ email, onLeave }: { email: string; onLeave: () => void }) {
  const [open, setOpen] = useState(false);
  const holder = useRef<HTMLDivElement>(null);

  useDismiss(open, holder, setOpen);

  function leave() {
    setOpen(false);
    onLeave();
  }

  return (
    <div className={`${className}_account`} ref={holder}>
      <button
        className={`${className}_account_button`}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="header-account"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <span className={`${className}_avatar`} aria-hidden="true">
          {initialOf(email)}
        </span>
        <span className={`${className}_account_name`}>{nameOf(email)}</span>
        <span className="fa_hidden">account menu</span>
        <Icon
          className={cx(`${className}_chevron`, open && `${className}_chevron-open`)}
          name="chevronDown"
          size="0.75em"
        />
      </button>

      <div
        className={cx(`${className}_account_menu`, open && `${className}_account_menu-open`)}
        id="header-account"
        role="menu"
      >
        <p className={`${className}_account_head`}>
          <span className={`${className}_account_head_label`}>Signed in as</span>
          <span className={`${className}_account_head_email`}>{email}</span>
        </p>

        <Link className={`${className}_account_item`} role="menuitem" to={ROUTES.ACCOUNT} onClick={leave}>
          <Icon className={`${className}_account_glyph`} name="user" size="1em" />
          Your account
        </Link>

        {/* Last, and on its own: signing out by accident is the expensive slip
            in a menu like this one. */}
        <button
          className={cx(`${className}_account_item`, `${className}_account_item-out`)}
          type="button"
          role="menuitem"
          onClick={() => {
            leave();
            void ServerBridge.logout();
          }}
        >
          <Icon className={`${className}_account_glyph`} name="signOut" size="1em" />
          Sign out
        </button>
      </div>
    </div>
  );
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

  useDismiss(flyout, productRef, setFlyout);

  /** Following any link puts the header back the way it was. */
  function closeMenus() {
    setOpen(false);
    setFlyout(false);
  }

  return (
    <header className={cx(className, scrolled && `${className}-scrolled`)}>
      <div className={`${className}_bar`}>
        <Link className={`${className}_brand`} to={ROUTES.HOME} onClick={closeMenus}>
          <img className={`${className}_brand_mark`} src={ASSETS.brandIcon} alt="" width={32} height={32} />
          <BrandName />
        </Link>

        <div className={`${className}_actions`}>
          {!signedIn && (
            <NavLink
              className={({ isActive }) =>
                cx(`${className}_signin`, `${className}_spare`, isActive && `${className}_signin-active`)
              }
              to={ROUTES.LOGIN}
              onClick={closeMenus}
            >
              Sign in
            </NavLink>
          )}

          <Link
            className={cx("fa_command fa_command-small", signedIn && `fa_command-ghost ${className}_spare`)}
            to={ROUTES.DOWNLOAD}
            onClick={closeMenus}
          >
            download
          </Link>

          {signedIn && <AccountMenu email={accountEmail} onLeave={closeMenus} />}
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

            <li className={`${className}_nav_item`}>
              <NavLink
                className={({ isActive }) => cx(`${className}_nav_link`, isActive && `${className}_nav_link-active`)}
                to={ROUTES.PRICING}
                onClick={closeMenus}
              >
                Pricing
              </NavLink>
            </li>

            <li className={cx(`${className}_nav_item`, `${className}_nav_item-spare`)}>
              <NavLink
                className={({ isActive }) => cx(`${className}_nav_link`, isActive && `${className}_nav_link-active`)}
                to={signedIn ? ROUTES.DOWNLOAD : ROUTES.LOGIN}
                onClick={closeMenus}
              >
                {signedIn ? "Download" : "Sign in"}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
