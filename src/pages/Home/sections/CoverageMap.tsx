/**
 * Every byte of a file, and what explained it.
 *
 * "It accounts for bytes it cannot explain" is the most distinctive thing the
 * engine does and the hardest to believe from a sentence. Drawn to scale it
 * argues for itself: seven headers and sections account for a quarter of this
 * installer, and the remaining three quarters belong to no section at all —
 * which is exactly the region another tool would never mention.
 *
 * The bar is to scale, so the tail is genuinely three quarters of the width.
 * Regions too small to see are drawn at a minimum width, and the panel says so
 * rather than letting the picture quietly lie.
 *
 * Each region is a button carrying its own accessible name, so the map is
 * walkable with Tab and readable aloud without seeing it. The detail panel is
 * a live region, so selecting a segment announces what it is.
 */

import { useState } from "react";

import { cx } from "../../../core/Utility";
import "./coveragemap.css";

const className = "coveragemap";

/** How strongly the engine can vouch for what a region is. */
type Strength = "container" | "structure" | "signature" | "unidentified";

type Region = {
  name: string;
  start: number;
  size: number;
  strength: Strength;
  note: string;
};

const STRENGTH_LABEL: Record<Strength, string> = {
  container: "Validated container",
  structure: "Structural table",
  signature: "Signature match",
  unidentified: "Unidentified region"
};

const TOTAL = 4_292_529;

/** Sample coverage, standing in for a real export. Sizes sum to TOTAL. */
const REGIONS: Region[] = [
  { name: "DOS header and stub", start: 0, size: 128, strength: "structure",
    note: "Read as a structure: e_magic, e_lfanew and the stub that follows them." },
  { name: "PE headers", start: 128, size: 384, strength: "structure",
    note: "COFF header, optional header and the section table it declares." },
  { name: ".text", start: 512, size: 737_280, strength: "structure",
    note: "Executable code. Decoded with Capstone on the Disassembly tab." },
  { name: ".rdata", start: 737_792, size: 81_920, strength: "structure",
    note: "Imports, exports and read-only data." },
  { name: ".data", start: 819_712, size: 16_384, strength: "structure",
    note: "Initialised writable data." },
  { name: ".rsrc", start: 836_096, size: 180_224, strength: "structure",
    note: "The resource tree: icons, manifest, version info." },
  { name: ".reloc", start: 1_016_320, size: 8_192, strength: "structure",
    note: "Base relocations." },
  { name: "Appended data", start: 1_024_512, size: 3_268_017, strength: "container",
    note: "Past the last section, claimed by nothing in the PE. Segmented by entropy, probed, and identified as a ZIP — so it opens as a container in the tree rather than being ignored." }
];

const MIN_VISIBLE_PERCENT = 1.2;

function hex(value: number): string {
  return "0x" + value.toString(16).padStart(8, "0");
}

function bytes(value: number): string {
  return value.toLocaleString("en-US") + " bytes";
}

/** A 128-byte header is 0.003% of this file, and "0.0%" tells nobody anything. */
function percentOfFile(size: number): string {
  const percent = (size / TOTAL) * 100;
  return percent < 0.1 ? "under 0.1%" : percent.toFixed(1) + "%";
}

export default function CoverageMap() {
  /* The appended region is the point, so the map opens on it. */
  const [selected, setSelected] = useState(REGIONS.length - 1);
  /* While a region has keyboard focus, the pointer does not get to change the
     selection: content moving under a resting cursor would otherwise yank the
     panel away from whoever is tabbing through. */
  const [keyboard, setKeyboard] = useState(false);
  const region = REGIONS[selected];

  const enlarged = REGIONS.filter((r) => (r.size / TOTAL) * 100 < MIN_VISIBLE_PERCENT).length;

  return (
    <div className={className}>
      <div className={`${className}_head`}>
        <span className={`${className}_file`}>installer.exe</span>
        <span className={`${className}_total`}>{bytes(TOTAL)} accounted for</span>
      </div>

      <div className={`${className}_bar`} role="group" aria-label="Byte coverage of installer.exe">
        {REGIONS.map((r, i) => {
          const percent = (r.size / TOTAL) * 100;
          return (
            <button
              className={cx(
                `${className}_region`,
                `${className}_region-${r.strength}`,
                i === selected && `${className}_region-current`
              )}
              key={r.name}
              type="button"
              style={{ flexGrow: Math.max(percent, MIN_VISIBLE_PERCENT) }}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
              onMouseEnter={() => {
                if (!keyboard) setSelected(i);
              }}
              onFocus={() => {
                setKeyboard(true);
                setSelected(i);
              }}
              onBlur={() => setKeyboard(false)}
            >
              <span className={`${className}_region_label`}>
                {`${r.name}, ${STRENGTH_LABEL[r.strength]}, ${bytes(r.size)}, ${percentOfFile(r.size)} of the file`}
              </span>
            </button>
          );
        })}
      </div>

      <dl className={`${className}_detail`} aria-live="polite">
        <div className={`${className}_detail_row`}>
          <dt>Region</dt>
          <dd className={`${className}_detail_name`}>{region.name}</dd>
        </div>
        <div className={`${className}_detail_row`}>
          <dt>Offsets</dt>
          <dd className={`${className}_mono`}>
            {hex(region.start)} – {hex(region.start + region.size - 1)}
          </dd>
        </div>
        <div className={`${className}_detail_row`}>
          <dt>Size</dt>
          <dd className={`${className}_mono`}>
            {bytes(region.size)} · {percentOfFile(region.size)}
          </dd>
        </div>
        <div className={`${className}_detail_row`}>
          <dt>Evidence</dt>
          <dd>
            <span className={cx(`${className}_chip`, `${className}_region-${region.strength}`)}>
              {STRENGTH_LABEL[region.strength]}
            </span>
          </dd>
        </div>
        <div className={`${className}_detail_row`}>
          <dt>What explained it</dt>
          <dd>{region.note}</dd>
        </div>
      </dl>

      {enlarged > 0 && (
        <p className={`${className}_footnote`}>
          Drawn to scale. {enlarged} regions are smaller than the bar can show and are widened to
          stay reachable — their real size is in the panel.
        </p>
      )}
    </div>
  );
}
