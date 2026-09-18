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

import { ROUTES } from "../../Routing";
import { HOME_SECTIONS, SITE_NAME } from "../../core/Constants";
import "./footer.css";

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
      { to: ROUTES.REGISTER, label: "Register" }
    ]
  },
  {
    title: "Legal",
    entries: [{ to: ROUTES.LICENSES, label: "Third-Party Licenses" }]
  }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <nav className="footer_nav" aria-label="Footer">
          <ul className="footer_columns">
            {COLUMNS.map((column) => (
              <li className="footer_column" key={column.title}>
                <h2 className="footer_column_title">{column.title}</h2>
                <ul className="footer_column_list">
                  {column.entries.map((entry) => (
                    <li key={entry.label}>
                      <Link className="footer_link" to={entry.to}>
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <p className="footer_note">{SITE_NAME} — Windows desktop. Read-only, offline.</p>
      </div>
    </footer>
  );
}
