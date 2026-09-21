/**
 * The top of the home page. It carries the page's only h1 and the two calls to
 * action, so it does not use the Section wrapper.
 */

import { Link } from "react-router-dom";

import Icon from "../../../components/Icon/Icon";
import { ROUTES } from "../../../Routing";
import { HOME_SECTIONS, PRODUCT_NAME, TAGLINE } from "../../../core/Constants";
import FileFormatDetector from "./FileFormatDetector";
import { FORMAT_TOTAL } from "./formatCatalog";
import ScreenshotCarousel from "./ScreenshotCarousel";
import type { ScreenshotSlide } from "./ScreenshotCarousel";
import treeView from "../../../assets/images/screenshots/tree-zip-nested.png";
import disassembly from "../../../assets/images/screenshots/inspector-disassembly.png";
import details from "../../../assets/images/screenshots/details-pe-structure.png";
import colors from "../../../assets/images/screenshots/colors-photo.png";
import model from "../../../assets/images/screenshots/display-3d-model.png";
import "./productintroduction.css";

const className = "productintroduction";

/** The rotating set. Order is the order a reader meets the product in. */
const SLIDES: ScreenshotSlide[] = [
  {
    src: treeView,
    caption: "Tree",
    alt:
      "The tree view showing a ZIP expanded into 774 files across 127 folders, with columns for " +
      "name, date modified, type, and both uncompressed and compressed size."
  },
  {
    src: disassembly,
    caption: "Disassembly",
    alt:
      "The Disassembly tab listing decoded x86 instructions with their addresses and raw bytes, " +
      "beside a panel of the PE file's entry point, image base and section sizes."
  },
  {
    src: details,
    caption: "Details",
    alt:
      "The Details panel listing a PE file's linker version, entry point, image base and section " +
      "sizes, beside its decoded strings, with the whole structure tree — headers, data " +
      "directories, sections and imports — printed in the terminal below."
  },
  {
    src: colors,
    caption: "Colors",
    alt:
      "The Colors tab on a photograph, reporting 478,744 unique colours and listing the most " +
      "frequent ones with swatches, percentages and pixel counts."
  },
  {
    src: model,
    caption: "3D model",
    alt:
      "A 3D model rendered inside the Display tab, with its glTF node, mesh and vertex counts " +
      "listed in the details panel and a terminal open below."
  }
];

/** The claims worth making before a reader scrolls at all. */
const FACTS: Array<{ value: string; label: string }> = [
  { value: String(FORMAT_TOTAL), label: "formats by content" },
  { value: "Any", label: "levels of containment" },
  { value: "0", label: "bytes written to disk" },
  { value: "0", label: "network calls" }
];

export default function ProductIntroduction() {
  return (
    <section className={className} id={HOME_SECTIONS.HERO} aria-labelledby="hero-heading">
      <div className={`${className}_backdrop`} aria-hidden="true" />

      <div className={`${className}_inner`}>
        <div className={`${className}_copy`}>
          <p className={`${className}_eyebrow fa_eyebrow`}>Windows desktop · offline · read-only</p>

          <h1 className={`${className}_title`} id="hero-heading">
            {PRODUCT_NAME}
          </h1>

          <p className={`${className}_tagline`}>{TAGLINE}</p>

          <FileFormatDetector />

          <div className={`${className}_actions`}>
            <Link className="fa_button fa_button-primary fa_button-live" to={ROUTES.DOWNLOAD}>
              <Icon name="arrowDown" size="1em" />
              Download
            </Link>
            <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.HOW_IT_WORKS}`}>
              How it works
            </Link>
          </div>
        </div>

        <ul className={`${className}_facts`}>
          {FACTS.map((fact) => (
            <li className={`${className}_fact`} key={fact.label}>
              <span className={`${className}_fact_value`}>{fact.value}</span>
              <span className={`${className}_fact_label`}>{fact.label}</span>
            </li>
          ))}
        </ul>

        <ScreenshotCarousel slides={SLIDES} label="File Analyzer screenshots" />
      </div>
    </section>
  );
}
