/**
 * Download and system requirements. Reached from the hero and the footer.
 */

import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import type { GlyphName } from "../../components/Icon/glyphs";
import { cx } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./download.css";

const className = "download";

/**
 * The published Windows build. Null until there is one: the page shows what it
 * is waiting for rather than a button that goes nowhere.
 */
const BUILD: { version: string; released: string; size: string; sha256: string; url: string } | null =
  null;

/* A tick is a promise the application keeps. The last line is a condition on
   the reader's machine, not something we guarantee, so it is not ticked. */
const REQUIREMENTS: Array<{ glyph: GlyphName; text: string }> = [
  { glyph: "success", text: "Windows 10 or Windows 11, 64-bit" },
  { glyph: "success", text: "No account, and no internet connection — the application never calls out" },
  { glyph: "success", text: "Files are opened read-only; nothing is ever written back to them" },
  { glyph: "info", text: "Microsoft Word or Excel, only if you want Office documents converted" }
];

const PLANNED: Array<{ glyph: GlyphName; name: string; note: string }> = [
  { glyph: "terminal", name: "Linux", note: "Planned" },
  { glyph: "apple", name: "macOS", note: "Planned" }
];

export default function Download() {
  return (
    <article className={`page ${className}`}>
      <p className="page_eyebrow fa_eyebrow">Get it</p>
      <h1 className="page_title">Download</h1>
      <p className="page_lead">Windows desktop. No account, no cloud.</p>

      <div className={`${className}_build`}>
        <Icon className={`${className}_mark`} name="windows" size="3.5em" />

        <div className={`${className}_build_body`}>
          <h2 className={`${className}_build_title`}>
            Windows
            <span className={BUILD ? "fa_tag fa_tag-good" : "fa_tag fa_tag-accent"}>
              {BUILD ? "Available" : "In development"}
            </span>
          </h2>
          <p className={`${className}_build_detail`}>Windows 10 and 11, 64-bit</p>

          {BUILD ? (
            <>
              <a className={`fa_button fa_button-primary ${className}_action`} href={BUILD.url}>
                <Icon name="arrowDown" size="1em" />
                Download {BUILD.version}
              </a>

              <dl className={`${className}_facts`}>
                <dt>Released</dt>
                <dd>{BUILD.released}</dd>
                <dt>Size</dt>
                <dd>{BUILD.size}</dd>
                <dt>SHA-256</dt>
                <dd className={`${className}_hash`}>{BUILD.sha256}</dd>
              </dl>
            </>
          ) : (
            /* No button: a control that can never be pressed is worse than
               nothing where the eye lands looking for the download. */
            <p className="page_note">
              <Icon name="info" size="1em" />
              The installer is not published yet. The version, the size and its SHA-256 will be
              here when it is.
            </p>
          )}
        </div>
      </div>

      <section className="page_block" aria-labelledby="download-requirements">
        <h2 className="page_block_title" id="download-requirements">
          System requirements
        </h2>

        <ul className={`${className}_requirements`}>
          {REQUIREMENTS.map((requirement) => (
            <li
              className={cx(`${className}_requirement`, `${className}_requirement-${requirement.glyph}`)}
              key={requirement.text}
            >
              <Icon name={requirement.glyph} size="1em" />
              {requirement.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="page_block" aria-labelledby="download-platforms">
        <h2 className="page_block_title" id="download-platforms">
          Other platforms
        </h2>

        <p>
          Windows is what ships today. Linux and macOS are planned; there is no date yet, and this
          page will carry one as soon as there is.
        </p>

        <ul className={`${className}_planned`}>
          {PLANNED.map((platform) => (
            <li className={`${className}_planned_item`} key={platform.name}>
              <Icon className={`${className}_planned_glyph`} name={platform.glyph} size="1.25em" />
              <span className={`${className}_planned_name`}>{platform.name}</span>
              <span className="fa_tag">{platform.note}</span>
            </li>
          ))}
        </ul>

        <p className={`${className}_licences`}>
          Everything bundled with the application, and the terms it ships under, are listed under{" "}
          <Link to={ROUTES.LICENSES}>Third-Party Licenses</Link>. It is free to use while it is in
          development — what comes after that is on the <Link to={ROUTES.PRICING}>pricing</Link>{" "}
          page.
        </p>
      </section>
    </article>
  );
}
