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

const className = "capabilities";

const TABS = ["Display", "Readable", "Raw", "Patterns", "Disassembly"] as const;
type Tab = (typeof TABS)[number];

/** Which instructions get the application's control-flow colours. */
function flowClass(text: string): string | false {
  const mnemonic = text.split(/\s+/)[0];
  if (mnemonic === "call") return `${className}_flow-call`;
  if (mnemonic === "ret") return `${className}_flow-return`;
  if (mnemonic.startsWith("j")) return `${className}_flow-jump`;
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
    <div className={className}>
      {/* The header never changes. That is the point: one entry, five views. */}
      <div className={`${className}_head`}>
        <span className={`${className}_file`}>{SAMPLE_FILE}</span>
        <span className={`${className}_badge`}>PE</span>
        <span className={`${className}_summary`}>{SAMPLE_SUMMARY}</span>
      </div>

      <div className={`${className}_tabs`} role="tablist" aria-label="Views of the same entry">
        {TABS.map((name, i) => (
          <button
            className={cx(`${className}_tab`, name === tab && `${className}_tab-current`)}
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
        className={`${className}_panel`}
        id={`capabilities-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`capabilities-tab-${tab}`}
        /* A scrollable region has to be reachable by keyboard. */
        tabIndex={0}
      >
        {tab === "Display" && (
          <dl className={`${className}_facts`}>
            {DISPLAY.map((line) => (
              <div className={`${className}_fact`} key={line}>
                {line}
              </div>
            ))}
          </dl>
        )}

        {tab === "Readable" && (
          <ol className={`${className}_lines`}>
            {READABLE.map((line) => (
              <li className={`${className}_line`} key={line}>
                {line}
              </li>
            ))}
          </ol>
        )}

        {tab === "Raw" && (
          <pre className={`${className}_pre`}>
            {RAW.map((line) => {
              const offset = line.slice(0, 8);
              const hex = line.slice(8, 60);
              const ascii = line.slice(60);
              return (
                <span className={`${className}_row`} key={offset}>
                  <span className={`${className}_offset`}>{offset}</span>
                  {hex}
                  <span className={`${className}_ascii`}>{ascii}</span>
                  {"\n"}
                </span>
              );
            })}
          </pre>
        )}

        {tab === "Patterns" && (
          <table className={`${className}_table`}>
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
                  <td className={`${className}_type`}>{row.type}</td>
                  <td className={`${className}_value`}>{row.value}</td>
                  <td className={`${className}_offset`}>{row.offset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Disassembly" && (
          <pre className={`${className}_pre`}>
            {DISASSEMBLY.map((row) => (
              <span className={`${className}_row`} key={row.address}>
                <span className={`${className}_offset`}>{row.address}</span>
                <span className={`${className}_bytes`}>{row.bytes.padEnd(18)}</span>
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
