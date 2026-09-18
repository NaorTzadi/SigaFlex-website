/**
 * The top of the home page. It carries the page's only h1 and the two calls to
 * action, so it does not use the Section wrapper.
 */

import { Link } from "react-router-dom";

import { ROUTES } from "../../../Routing";
import { HOME_SECTIONS, PRODUCT_NAME, TAGLINE } from "../../../core/Constants";
import Showcase from "./Showcase";
import type { Slide } from "./Showcase";
import treeView from "../../../assets/images/screenshots/tree-zip-nested.png";
import disassembly from "../../../assets/images/screenshots/inspector-disassembly.png";
import colors from "../../../assets/images/screenshots/colors-photo.png";
import model from "../../../assets/images/screenshots/display-3d-model.png";
import "./hero.css";

/** The rotating set. Order is the order a reader meets the product in. */
const SLIDES: Slide[] = [
  {
    src: treeView,
    alt:
      "The tree view showing a ZIP expanded into 774 files across 127 folders, with columns for " +
      "name, date modified, type, and both uncompressed and compressed size."
  },
  {
    src: disassembly,
    alt:
      "The Disassembly tab listing decoded x86 instructions with their addresses and raw bytes, " +
      "beside a panel of the PE file's entry point, image base and section sizes."
  },
  {
    src: colors,
    alt:
      "The Colors tab on a photograph, reporting 478,744 unique colours and listing the most " +
      "frequent ones with swatches, percentages and pixel counts."
  },
  {
    src: model,
    alt:
      "A 3D model rendered inside the Display tab, with its glTF node, mesh and vertex counts " +
      "listed in the details panel and a terminal open below."
  }
];

/** The claims worth making before a reader scrolls at all. */
const FACTS: Array<{ value: string; label: string }> = [
  { value: "94", label: "formats by content" },
  { value: "Any", label: "levels of containment" },
  { value: "0", label: "bytes written to disk" },
  { value: "0", label: "network calls" }
];

export default function Hero() {
  return (
    <section className="hero" id={HOME_SECTIONS.HERO} aria-labelledby="hero-heading">
      <div className="hero_backdrop" aria-hidden="true" />

      <div className="hero_inner">
        <div className="hero_copy">
          <p className="hero_eyebrow fa_eyebrow">Windows desktop · offline · read-only</p>

          <h1 className="hero_title" id="hero-heading">
            {PRODUCT_NAME}
          </h1>

          <p className="hero_tagline">{TAGLINE}</p>

          <p className="hero_identity" aria-hidden="true">
            <span className="hero_identity_bytes">4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF</span>
            <span className="hero_identity_arrow">→</span>
            <span className="hero_identity_verdict">PE32 executable</span>
          </p>

          <div className="hero_actions">
            <Link className="fa_button fa_button-primary" to={ROUTES.DOWNLOAD}>
              Download
            </Link>
            <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.HOW_IT_WORKS}`}>
              How it works
            </Link>
          </div>

          <ul className="hero_facts">
            {FACTS.map((fact) => (
              <li className="hero_fact" key={fact.label}>
                <span className="hero_fact_value">{fact.value}</span>
                <span className="hero_fact_label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Showcase slides={SLIDES} label="File Analyzer screenshots" />
      </div>
    </section>
  );
}
