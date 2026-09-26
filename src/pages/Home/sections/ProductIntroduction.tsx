/**
 * The top of the home page. It carries the page's only h1 and the two calls to
 * action, so it does not use the Section wrapper.
 */

import { Link } from "react-router-dom";

import BrandName from "../../../components/BrandName/BrandName";
import { ROUTES } from "../../../Routing";
import { ASSETS, HOME_SECTIONS, PRODUCT_NAME } from "../../../core/Constants";
import { useGlobal } from "../../../core/Globals";
import FileFormatDetector from "./FileFormatDetector";
import { FORMAT_TOTAL } from "./formatCatalog";
import ScreenshotCarousel from "./ScreenshotCarousel";
import type { ScreenshotSlide } from "./ScreenshotCarousel";
import "./productintroduction.css";

const className = "productintroduction";

/** The rotating set. Order is the order a reader meets the product in. */
const SLIDES: ScreenshotSlide[] = [
  {
    src: ASSETS.treeView,
    caption: "Tree",
    alt:
      "The tree view showing a ZIP expanded into 774 files across 127 folders, with columns for " +
      "name, date modified, type, and both uncompressed and compressed size."
  },
  {
    src: ASSETS.disassembly,
    caption: "Disassembly",
    alt:
      "The Disassembly tab listing decoded x86 instructions with their addresses and raw bytes, " +
      "beside a panel of the PE file's entry point, image base and section sizes."
  },
  {
    src: ASSETS.details,
    caption: "Details",
    alt:
      "The Details panel listing a PE file's linker version, entry point, image base and section " +
      "sizes, beside its decoded strings, with the whole structure tree — headers, data " +
      "directories, sections and imports — printed in the terminal below."
  },
  {
    src: ASSETS.colors,
    caption: "Colors",
    alt:
      "The Colors tab on a photograph, reporting 478,744 unique colours and listing the most " +
      "frequent ones with swatches, percentages and pixel counts."
  },
  {
    src: ASSETS.model,
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
  const signedIn = useGlobal("signedIn");

  return (
    <section className={className} id={HOME_SECTIONS.HERO} aria-labelledby="hero-heading">
      <div className={`${className}_backdrop`} aria-hidden="true" />

      <div className={`${className}_inner`}>
        <div className={`${className}_copy`}>
          <p className={`${className}_eyebrow fa_eyebrow`}>Windows desktop · offline · read-only</p>

          <h1 className={`${className}_title`} id="hero-heading" aria-label={PRODUCT_NAME}>
            <BrandName
              firstLetter={<img className={`${className}_logo`} src={ASSETS.animatedLogo} alt="" width={100} height={100} />}
            />
          </h1>

          <p className={`${className}_tagline`}>File analysis reimagined</p>

          <FileFormatDetector />

          {!signedIn && (
            <div className={`${className}_actions`}>
              <Link className="fa_command" to={ROUTES.DOWNLOAD}>
                download sigaflex <span className="fa_command_flag">--windows</span>
              </Link>
            </div>
          )}
        </div>

        <ul className={`${className}_facts`}>
          {FACTS.map((fact) => (
            <li className={`${className}_fact`} key={fact.label}>
              <span className={`${className}_fact_value`}>{fact.value}</span>
              <span className={`${className}_fact_label`}>{fact.label}</span>
            </li>
          ))}
        </ul>

        <ScreenshotCarousel slides={SLIDES} label={`${PRODUCT_NAME} screenshots`} />
      </div>
    </section>
  );
}
