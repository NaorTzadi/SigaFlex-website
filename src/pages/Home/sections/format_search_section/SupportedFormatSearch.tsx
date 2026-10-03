/**
 * The searchable catalog within Format coverage.
 *
 * A hundred acronyms laid out flat is a wall, and a wall answers nobody's
 * question. The question a visitor actually arrives with is "does it open my
 * file?", so the band asks for a name and answers it.
 *
 * Closed, it is twelve group buttons with counts — the coverage claim, in one
 * line, with the detail folded away. Open a group and its formats appear.
 * Type anything and the matches surface across every group at once, matched on
 * the tag, on the engine's name for it, and on the extensions it usually
 * carries, so ".dll" finds PE.
 *
 * Pick one and it says what the format actually is. That is the part worth
 * having: a reader who came to check a name leaves knowing what the thing is.
 *
 * The miss is the best part. There is no such thing as an unsupported file
 * here: the engine identifies by content, so a name it does not know is not a
 * dead end but the product's whole argument. So a search with no match says
 * that, rather than "no results".
 *
 * Every format, its name and its extensions come from formatCatalog.
 */

import { useId, useMemo, useState } from "react";

import Icon from "../../../../components/Icon/Icon";
import { HOME_SECTIONS } from "../../../../core/Constants";
import { cx } from "../../../../core/Utility";
import { FORMAT_GROUPS, FORMAT_TOTAL } from "../formatCatalog";
import type { FormatEntry } from "../formatCatalog";
import "./supportedformatsearch.css";

const className = "supportedformatsearch";

/** A typed ".dll" or "Zip " should still find the tag. */
function normalise(value: string): string {
  return value.trim().replace(/^[.*\s]+/, "").toUpperCase();
}

/** Tag, engine name or extension — whichever the reader happened to type. */
function matches(format: FormatEntry, needle: string): boolean {
  if (format.tag.includes(needle)) return true;
  if (format.name.toUpperCase().includes(needle)) return true;
  return format.extensions.some((extension) => extension.toUpperCase().includes(needle));
}

export default function SupportedFormatSearch() {
  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [selected, setSelected] = useState<FormatEntry | null>(null);
  const inputId = useId();
  const detailId = `${inputId}-detail`;

  const needle = normalise(query);
  const searching = needle.length > 0;

  const found = useMemo(() => {
    if (!searching) return [];
    return FORMAT_GROUPS.map((group) => ({
      name: group.name,
      formats: group.formats.filter((format) => matches(format, needle))
    })).filter((group) => group.formats.length > 0);
  }, [needle, searching]);

  const matchCount = found.reduce((sum, group) => sum + group.formats.length, 0);

  /** Picking the open one again closes it, the way a disclosure should. */
  function pick(format: FormatEntry) {
    setSelected((current) => (current?.tag === format.tag ? null : format));
  }

  function badge(format: FormatEntry, matched: boolean) {
    const current = selected?.tag === format.tag;
    return (
      <li key={format.tag}>
        <button
          className={cx(
            `${className}_badge`,
            matched && `${className}_badge-match`,
            current && `${className}_badge-current`
          )}
          type="button"
          title={format.name}
          aria-expanded={current}
          aria-controls={detailId}
          onClick={() => pick(format)}
        >
          {format.tag}
        </button>
      </li>
    );
  }

  return (
    <section id={HOME_SECTIONS.STRIP} aria-label="Find a format">
      <div className={className}>
        <div className={`${className}_search`}>
          <label className={`${className}_label`} htmlFor={inputId}>
            {searching
              ? `${matchCount} of ${FORMAT_TOTAL} formats match`
              : `${FORMAT_TOTAL} formats, identified by content`}
          </label>
          <div className={`${className}_field`}>
            <Icon className={`${className}_field_glyph`} name="search" size="1em" />
            <input
              className={`${className}_input`}
              id={inputId}
              type="search"
              value={query}
              placeholder="zip, dll, psd, blend…"
              autoComplete="off"
              spellCheck={false}
              onKeyDown={(event) => {
                if (event.key !== "Escape" || !query) return;
                event.preventDefault();
                setQuery("");
                setSelected(null);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenGroup(null);
                setSelected(null);
              }}
            />
          </div>
        </div>

        {/* Closed state: the groups, with the detail folded away behind each. */}
        {!searching && (
          <>
            <ul className={`${className}_groups`}>
              {FORMAT_GROUPS.map((group) => {
                const open = openGroup === group.name;
                return (
                  <li key={group.name}>
                    <button
                      className={cx(`${className}_group`, open && `${className}_group-open`)}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`${inputId}-${group.name.replace(/\W/g, "")}`}
                      onClick={() => {
                        setOpenGroup(open ? null : group.name);
                        setSelected(null);
                      }}
                    >
                      {group.name}
                      <span className={`${className}_count`}>{group.formats.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {FORMAT_GROUPS.map((group) => (
              <ul
                className={`${className}_badges`}
                id={`${inputId}-${group.name.replace(/\W/g, "")}`}
                key={group.name}
                hidden={openGroup !== group.name}
              >
                {group.formats.map((format) => badge(format, false))}
              </ul>
            ))}
          </>
        )}

        {/* Searching: matches across every group at once. */}
        {searching && (
          <div className={`${className}_results`}>
            {found.map((group) => (
              <div className={`${className}_result`} key={group.name}>
                <p className={`${className}_result_group`}>{group.name}</p>
                <ul className={`${className}_badges`}>
                  {group.formats.map((format) => badge(format, true))}
                </ul>
              </div>
            ))}

            {matchCount === 0 && (
              <p className={`${className}_miss`}>
                No format is called <strong>{needle}</strong> — and it would still open. The engine
                reads the bytes, not the extension.
              </p>
            )}
          </div>
        )}

        {/* One panel, always in the same place, whichever badge was pressed. */}
        <div className={`${className}_detail`} id={detailId} aria-live="polite">
          {selected && (
            <div className={`${className}_card`}>
              <p className={`${className}_card_head`}>
                <span className={`${className}_card_tag`}>{selected.tag}</span>
                <span className={`${className}_card_name`}>{selected.name}</span>
                <button
                  className={`${className}_card_close`}
                  type="button"
                  onClick={() => setSelected(null)}
                >
                  <Icon name="close" size="0.875em" title={`Close ${selected.tag}`} />
                </button>
              </p>

              <p className={`${className}_card_body`}>{selected.description}</p>

              <p className={`${className}_card_extensions`}>
                {selected.extensions.map((extension) => (
                  <span className={`${className}_ext`} key={extension}>
                    {extension}
                  </span>
                ))}
                <span className={`${className}_card_note`}>
                  <Icon name="info" size="0.875em" /> Usually named this. Never identified by it.
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Spoken, not shown: the count changes as you type. */}
        <p className={`${className}_status`} role="status" aria-live="polite">
          {searching ? `${matchCount} of ${FORMAT_TOTAL} formats match ${needle}` : ""}
        </p>
      </div>
    </section>
  );
}
