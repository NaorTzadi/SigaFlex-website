/**
 * The band under the hero.
 *
 * Ninety-five acronyms laid out flat is a wall, and a wall answers nobody's
 * question. The question a visitor actually arrives with is "does it open my
 * file?", so the band asks for a name and answers it.
 *
 * Closed, it is ten group buttons with counts — the coverage claim, in one
 * line, with the detail folded away. Open a group and its formats appear.
 * Type anything and the matches surface across every group at once.
 *
 * The miss is the best part. There is no such thing as an unsupported file
 * here: the engine identifies by content, so a name it does not know is not a
 * dead end but the product's whole argument. So a search with no match says
 * that, rather than "no results".
 *
 * Format names come from the engine's own descriptors. See FORMAT_GROUPS.
 */

import { useId, useMemo, useState } from "react";

import { cx } from "../../../core/Utility";
import "./formatfinder.css";

/**
 * Every tag the engine declares in format_descriptor.cpp, grouped the way the
 * engine's own source directories group them. Not from the brief's prose — the
 * brief is older than the code and misses SQLite, EML and camera raw.
 *
 * Left out: UNKNOWN, ARCHIVE and RAW are internal buckets rather than formats,
 * and FBX_ASCII is folded into FBX.
 */
const FORMAT_GROUPS: Array<{ name: string; formats: string[] }> = [
  {
    name: "Archives",
    formats: [
      "ZIP", "RAR", "7Z", "TAR", "TAR.GZ", "TAR.BZ2", "TAR.XZ", "TAR.ZST", "GZIP", "BZIP2",
      "XZ", "ZSTD", "AR", "CPIO", "CAB", "ISO", "RPM", "DEB", "MSI"
    ]
  },
  { name: "Packages", formats: ["JAR", "WAR", "EAR", "APK", "EPUB", "3MF", "USDZ"] },
  { name: "Executables", formats: ["PE", "ELF", "MACH-O"] },
  {
    name: "Documents",
    formats: ["PDF", "OLE", "DOC", "XLS", "PPT", "DOCX", "XLSX", "PPTX", "ODT", "ODS", "ODP"]
  },
  { name: "Mail & data", formats: ["MSG", "EML", "SQLITE"] },
  {
    name: "Images",
    formats: ["PNG", "JPEG", "GIF", "BMP", "TIFF", "ICO", "HEIF", "AVIF", "WEBP", "DDS", "PSD"]
  },
  { name: "Camera raw", formats: ["CR2", "NEF", "ARW", "DNG"] },
  { name: "Fonts", formats: ["TTF", "OTF", "TTC"] },
  { name: "Audio", formats: ["MP3", "AAC", "WAV", "AIFF", "FLAC", "OGG", "M4A"] },
  {
    name: "Video",
    formats: ["MP4", "MOV", "AVI", "MKV", "WEBM", "ASF", "MPEG-TS", "MPEG-PS", "M2TS", "H.264", "H.265"]
  },
  {
    name: "3D & CAD",
    formats: [
      "GLB", "GLTF", "OBJ", "STL", "PLY", "DAE", "FBX", "3DS", "BLEND", "USDA", "USDC", "ABC",
      "STEP", "IGES", "DXF"
    ]
  }
];

const TOTAL = FORMAT_GROUPS.reduce((sum, group) => sum + group.formats.length, 0);

/** A typed ".dll" or "Zip " should still find the tag. */
function normalise(value: string): string {
  return value.trim().replace(/^[.*\s]+/, "").toUpperCase();
}

export default function FormatFinder() {
  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const inputId = useId();

  const needle = normalise(query);
  const searching = needle.length > 0;

  const matches = useMemo(() => {
    if (!searching) return [];
    return FORMAT_GROUPS.map((group) => ({
      name: group.name,
      formats: group.formats.filter((format) => format.includes(needle))
    })).filter((group) => group.formats.length > 0);
  }, [needle, searching]);

  const matchCount = matches.reduce((sum, group) => sum + group.formats.length, 0);

  return (
    <div className="formatfinder">
      <div className="formatfinder_search">
        <label className="formatfinder_label" htmlFor={inputId}>
          {TOTAL} formats, identified by content
        </label>
        <input
          className="formatfinder_input"
          id={inputId}
          type="search"
          value={query}
          placeholder="zip, dll, psd, blend…"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpenGroup(null);
          }}
        />
      </div>

      {/* Closed state: the groups, with the detail folded away behind each. */}
      {!searching && (
        <>
          <ul className="formatfinder_groups">
            {FORMAT_GROUPS.map((group) => {
              const open = openGroup === group.name;
              return (
                <li key={group.name}>
                  <button
                    className={cx("formatfinder_group", open && "formatfinder_group-open")}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${inputId}-${group.name.replace(/\W/g, "")}`}
                    onClick={() => setOpenGroup(open ? null : group.name)}
                  >
                    {group.name}
                    <span className="formatfinder_count">{group.formats.length}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {FORMAT_GROUPS.map((group) => (
            <ul
              className="formatfinder_badges"
              id={`${inputId}-${group.name.replace(/\W/g, "")}`}
              key={group.name}
              hidden={openGroup !== group.name}
            >
              {group.formats.map((format) => (
                <li className="formatfinder_badge" key={format}>
                  {format}
                </li>
              ))}
            </ul>
          ))}
        </>
      )}

      {/* Searching: matches across every group at once. */}
      {searching && (
        <div className="formatfinder_results">
          {matches.map((group) => (
            <div className="formatfinder_result" key={group.name}>
              <p className="formatfinder_result_group">{group.name}</p>
              <ul className="formatfinder_badges">
                {group.formats.map((format) => (
                  <li className="formatfinder_badge formatfinder_badge-match" key={format}>
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {matchCount === 0 && (
            <p className="formatfinder_miss">
              No format is called <strong>{needle}</strong> — and it would still open. The engine
              reads the bytes, not the extension.
            </p>
          )}
        </div>
      )}

      {/* Spoken, not shown: the count changes as you type. */}
      <p className="formatfinder_status" role="status" aria-live="polite">
        {searching ? `${matchCount} of ${TOTAL} formats match ${needle}` : ""}
      </p>
    </div>
  );
}
