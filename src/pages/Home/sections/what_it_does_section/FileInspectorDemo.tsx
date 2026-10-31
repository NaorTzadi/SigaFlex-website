/**
 * The inspector, on the page.
 *
 * The product's central claim is that Readable, Raw, Patterns, Disassembly,
 * Hexadecimal and C code are six views of the *same* entry rather than six tools. A
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
 * so Tab steps over the row into the output rather than through six buttons.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cx } from "../../../../core/Utility";
import {
  C_CODE,
  DISASSEMBLY,
  HEXADECIMAL,
  PATTERNS,
  RAW,
  READABLE,
  SAMPLE_FILE,
  SAMPLE_SUMMARY
} from "./capabilitiesSample";
import "./fileinspectordemo.css";

const className = "fileinspectordemo";

const TABS = ["Readable", "Raw", "Patterns", "Disassembly", "Hexadecimal", "Code"] as const;
type Tab = (typeof TABS)[number];

/** Tab names hold spaces; element ids cannot. */
function tabSlug(tab: Tab): string {
  return tab.replace(/ /g, "-");
}

/** Which instructions get the application's control-flow colours. */
function flowClass(text: string): string | false {
  const mnemonic = text.split(/\s+/)[0];
  if (mnemonic === "call") return `${className}_flow-call`;
  if (mnemonic === "ret") return `${className}_flow-return`;
  if (mnemonic.startsWith("j")) return `${className}_flow-jump`;
  return false;
}

export default function FileInspectorDemo() {
  const [tab, setTab] = useState<Tab>("Raw");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    function measure() {
      const button = tabRefs.current[TABS.indexOf(tab)];
      if (button) setIndicator({ left: button.offsetLeft, width: button.offsetWidth });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tab]);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [tab]);

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
      {/* The header never changes. That is the point: one entry, six views. */}
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
            id={`capabilities-tab-${tabSlug(name)}`}
            aria-selected={name === tab}
            aria-controls={`capabilities-panel-${tabSlug(name)}`}
            tabIndex={name === tab ? 0 : -1}
            onClick={() => setTab(name)}
            onKeyDown={onKeyDown}
          >
            {name}
          </button>
        ))}
        <span
          className={`${className}_indicator`}
          style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
          aria-hidden="true"
        />
      </div>

      <div
        className={`${className}_panel`}
        id={`capabilities-panel-${tabSlug(tab)}`}
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`capabilities-tab-${tabSlug(tab)}`}
        /* A scrollable region has to be reachable by keyboard. */
        tabIndex={0}
      >
        <div className={`${className}_view`} key={tab}>
          {tab === "Readable" && (
            <ol className={`${className}_lines`}>
              {READABLE.map((line) => (
                <li className={`${className}_line`} key={line}>
                  {line}
                </li>
              ))}
            </ol>
          )}

          {tab === "Raw" && <pre className={`${className}_pre`}>{RAW.join("\n")}</pre>}

          {tab === "Hexadecimal" && (
            <pre className={`${className}_pre`}>
              {HEXADECIMAL.map((line) => {
                const offset = line.slice(0, 16);
                const hex = line.slice(16, 68);
                const ascii = line.slice(68);
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

          {tab === "Code" && (
            <pre className={`${className}_pre`}>
              {C_CODE.map((line, row) => (
                <span className={`${className}_row`} key={row}>
                  {line.map(([text, kind], index) => (
                    <span className={cx(kind && `${className}_code-${kind}`)} key={index}>
                      {text}
                    </span>
                  ))}
                  {"\n"}
                </span>
              ))}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
