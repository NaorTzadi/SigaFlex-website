/**
 * Site footer.
 *
 * Grouped columns rather than a row of links: a footer is where a reader goes
 * when the page did not answer their question, and a labelled group is what
 * makes that scannable. Each column is its own list under its own heading, so
 * the grouping is real structure and not just a visual arrangement.
 *
 * Every entry here points somewhere that exists — a route, or a band of the
 * home page. Columns fill out as the site grows; they do not get padded with
 * links that go nowhere.
 *
 * The Third-Party Licenses route is reachable from here by obligation, not by
 * preference. See OUTSIDE_ROUTES.md and the brief.
 */

import { Link } from "react-router-dom";

import Icon from "../Icon/Icon";
import { ROUTES } from "../../Routing";
import { HOME_SECTIONS, SITE_NAME, TAGLINE } from "../../core/Constants";
import "./footer.css";

const className = "footer";

type Entry = { to: string; label: string };

const COLUMNS: Array<{ title: string; entries: Entry[] }> = [
  {
    title: "Product",
    entries: [
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.WHAT_IT_DOES}`, label: "What it does" },
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.HOW_IT_WORKS}`, label: "How it works" },
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.CAPABILITIES}`, label: "Capabilities" }
    ]
  },
  {
    title: "Coverage",
    entries: [
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.FORMATS}`, label: "Format coverage" },
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.BEYOND}`, label: "Beyond analysis" },
      { to: `${ROUTES.HOME}#${HOME_SECTIONS.ANALYSTS}`, label: "For analysts" }
    ]
  },
  {
    title: "Get it",
    entries: [
      { to: ROUTES.DOWNLOAD, label: "Download" },
      { to: ROUTES.REGISTER, label: "Register" },
      { to: ROUTES.CONTACT, label: "Contact" }
    ]
  },
  {
    title: "Legal",
    entries: [
      { to: ROUTES.PRIVACY, label: "Privacy" },
      { to: ROUTES.TERMS, label: "Terms" },
      { to: ROUTES.LICENSES, label: "Third-Party Licenses" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className={className}>
      <div className={`${className}_inner`}>
        <div className={`${className}_brand`}>
          <p className={`${className}_brand_name`}>
            <Icon className={`${className}_brand_mark`} name="package" size="1.25em" />
            {SITE_NAME}
          </p>
          <p className={`${className}_brand_line`}>{TAGLINE}</p>
        </div>

        <nav className={`${className}_nav`} aria-label="Footer">
          <ul className={`${className}_columns`}>
            {COLUMNS.map((column) => (
              <li className={`${className}_column`} key={column.title}>
                <h2 className={`${className}_column_title`}>{column.title}</h2>
                <ul className={`${className}_column_list`}>
                  {column.entries.map((entry) => (
                    <li key={entry.label}>
                      <Link className={`${className}_link`} to={entry.to}>
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <p className={`${className}_note`}>{SITE_NAME} — Windows desktop. Read-only, offline.</p>
      </div>
    </footer>
  );
}
