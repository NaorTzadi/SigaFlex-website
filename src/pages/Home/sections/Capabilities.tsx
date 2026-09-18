/**
 * The inspector, on the page.
 *
 * The product's central claim is that Display, Readable, Raw, Patterns and
 * Disassembly are five views of the *same* entry rather than five tools. A
 * screenshot cannot make that argument — it shows one view, frozen. Tabs over
 * one unchanging header can: the file name and the byte count never move while
 * everything beneath them does.
 *
 * The output is live text, not a picture of text. It can be selected, copied,
 * searched by the browser, read aloud, and indexed. For a page whose audience
 * is people who read hex for a living, a screenshot of hex is an insult.
 *
 * Control-flow colouring is the application's own: amber for jumps, violet for
 * calls, red for returns, straight from its Dark theme.
 *
 * Keyboard: the tab row follows the usual pattern — arrows move between tabs,
 * Home and End jump to the ends, and only the selected tab is in the tab order,
 * so Tab steps over the row into the output rather than through five buttons.
 */

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cx } from "../../../core/Utility";
import {
  DISASSEMBLY,
  DISPLAY,
  PATTERNS,
  RAW,
  READABLE,
  SAMPLE_FILE,
  SAMPLE_SUMMARY
} from "./capabilitiesSample";
import "./capabilities.css";

const TABS = ["Display", "Readable", "Raw", "Patterns", "Disassembly"] as const;
type Tab = (typeof TABS)[number];

/** Which instructions get the application's control-flow colours. */
function flowClass(text: string): string | false {
  const mnemonic = text.split(/\s+/)[0];
  if (mnemonic === "call") return "capabilities_flow-call";
  if (mnemonic === "ret") return "capabilities_flow-return";
  if (mnemonic.startsWith("j")) return "capabilities_flow-jump";
  return false;
}

export default function Capabilities() {
  const [tab, setTab] = useState<Tab>("Raw");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = TABS.indexOf(tab);
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;

    event.preventDefault();
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="capabilities">
      {/* The header never changes. That is the point: one entry, five views. */}
      <div className="capabilities_head">
        <span className="capabilities_file">{SAMPLE_FILE}</span>
        <span className="capabilities_badge">PE</span>
        <span className="capabilities_summary">{SAMPLE_SUMMARY}</span>
      </div>

      <div className="capabilities_tabs" role="tablist" aria-label="Views of the same entry">
        {TABS.map((name, i) => (
          <button
            className={cx("capabilities_tab", name === tab && "capabilities_tab-current")}
            key={name}
            ref={(element) => {
              tabRefs.current[i] = element;
            }}
            type="button"
            role="tab"
            id={`capabilities-tab-${name}`}
            aria-selected={name === tab}
            aria-controls={`capabilities-panel-${name}`}
            tabIndex={name === tab ? 0 : -1}
            onClick={() => setTab(name)}
            onKeyDown={onKeyDown}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        className="capabilities_panel"
        id={`capabilities-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`capabilities-tab-${tab}`}
        /* A scrollable region has to be reachable by keyboard. */
        tabIndex={0}
      >
        {tab === "Display" && (
          <dl className="capabilities_facts">
            {DISPLAY.map((line) => (
              <div className="capabilities_fact" key={line}>
                {line}
              </div>
            ))}
          </dl>
        )}

        {tab === "Readable" && (
          <ol className="capabilities_lines">
            {READABLE.map((line) => (
              <li className="capabilities_line" key={line}>
                {line}
              </li>
            ))}
          </ol>
        )}

        {tab === "Raw" && (
          <pre className="capabilities_pre">
            {RAW.map((line) => {
              const offset = line.slice(0, 8);
              const hex = line.slice(8, 60);
              const ascii = line.slice(60);
              return (
                <span className="capabilities_row" key={offset}>
                  <span className="capabilities_offset">{offset}</span>
                  {hex}
                  <span className="capabilities_ascii">{ascii}</span>
                  {"\n"}
                </span>
              );
            })}
          </pre>
        )}

        {tab === "Patterns" && (
          <table className="capabilities_table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Value</th>
                <th scope="col">Offset</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((row) => (
                <tr key={row.offset}>
                  <td className="capabilities_type">{row.type}</td>
                  <td className="capabilities_value">{row.value}</td>
                  <td className="capabilities_offset">{row.offset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Disassembly" && (
          <pre className="capabilities_pre">
            {DISASSEMBLY.map((row) => (
              <span className="capabilities_row" key={row.address}>
                <span className="capabilities_offset">{row.address}</span>
                <span className="capabilities_bytes">{row.bytes.padEnd(18)}</span>
                <span className={cx(flowClass(row.text))}>{row.text}</span>
                {"\n"}
              </span>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
}
