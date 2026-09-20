import { useEffect, useRef, useState } from "react";

import Icon from "../../../components/Icon/Icon";
import type { GlyphName } from "../../../components/Icon/glyphs";
import { cx, prefersReducedMotion } from "../../../core/Utility";
import Cards from "./Cards";
import type { Card } from "./Cards";
import "./terminal.css";

const className = "terminal";

type Line = { kind: "prompt" | "ask" | "command" | "output" | "answer"; text: string };

const SESSION: Line[] = [
  { kind: "prompt", text: "PS C:\\Users\\you> claude" },
  { kind: "ask", text: "What is inside the file I have open, and is any of it signed?" },
  { kind: "command", text: "fileanalyzer fetch tree" },
  { kind: "output", text: "installer.exe [PE]" },
  { kind: "output", text: "├─ Structure" },
  { kind: "output", text: "├─ .rsrc" },
  { kind: "output", text: "└─ setup.zip [ZIP]" },
  { kind: "output", text: "   ├─ app.jar [JAR]" },
  { kind: "output", text: "   ├─ config.xml" },
  { kind: "output", text: "   └─ logo.png [PNG]" },
  { kind: "command", text: "fileanalyzer inspect setup.zip/app.jar" },
  { kind: "command", text: "fileanalyzer capture window" },
  { kind: "output", text: "…\\FileAnalyzer\\commands\\window.png" },
  { kind: "command", text: "fileanalyzer export inspected file data" },
  { kind: "output", text: "…\\FileAnalyzer\\commands\\exported" },
  {
    kind: "answer",
    text: "The installer carries a ZIP appended past its last section, with a Java application inside it. The PE itself has one Authenticode certificate. Nothing inside the ZIP is signed, and MANIFEST.MF names no signer either."
  }
];

const COMMANDS: Array<{ command: string; does: string }> = [
  { command: "fetch root path", does: "The file or folder the user gave the program." },
  { command: "fetch tree [path]", does: "The tree as it is loaded, from the root or from any entry under it." },
  { command: "fetch absolute path <path>", does: "Where an entry lives on disk, or which container it is inside." },
  { command: "open <path>", does: "Expands an entry in the tree, as a double-click would." },
  { command: "inspect <path>", does: "Opens the inspector on an entry: Display, Readable, Raw, Patterns, Disassembly." },
  { command: "show views list", does: "Every page and view the window has." },
  { command: "show component <view_id> details", does: "One view in full: children, position, size, style, what it does." },
  { command: "fetch visible components details", does: "What is in front of the user right now." },
  { command: "capture window", does: "A screenshot of the window, saved to a path." },
  { command: "export inspected file data", does: "Details, readable text and disassembly of the inspected entry, as files." },
  { command: "show available commands", does: "This list." }
];

const GIVES: Array<{ glyph: GlyphName; title: string; body: string }> = [
  {
    glyph: "clipboard",
    title: "Briefed on arrival",
    body: "The terminal's working directory carries CLAUDE.md and AGENTS.md. Claude Code or Codex started there already knows the commands and the rules."
  },
  {
    glyph: "eye",
    title: "Sees what you see",
    body: "A screenshot of the window, the list of views, and the details of every visible component, on request."
  },
  {
    glyph: "layers",
    title: "Reads what you read",
    body: "The tree, any entry's place on disk, and the inspector's details, strings and disassembly as plain files."
  },
  {
    glyph: "arrowRight",
    title: "Drives the window",
    body: "Opens entries, switches views, runs the commands you would have typed, and reports back in the same tab."
  },
  {
    glyph: "padlock",
    title: "Stays on the machine",
    body: "The command channel is a loopback socket. Whether the agent you run talks to a model is the agent's business, not the program's."
  }
];

const AUDIENCES: Card[] = [
  {
    glyph: "code",
    title: "Developers",
    body: "Hand the agent a build artifact and ask what is in it, what changed, or why the manifest disagrees with the class files."
  },
  {
    glyph: "seal",
    title: "Security work",
    body: "Disassembly, strings and the coverage map exported to files an agent can read, with the file never leaving the box."
  },
  {
    glyph: "user",
    title: "Curious use",
    body: "Ask in plain words what a file is and what it is hiding. The agent runs the commands; you read the answer."
  }
];

export default function Terminal() {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [reduced] = useState(() => prefersReducedMotion());
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setShown(SESSION.length);
      return;
    }
    const frame = frameRef.current;
    if (!frame || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started || shown >= SESSION.length) return;
    const next = SESSION[shown];
    const delay = next.kind === "command" ? 700 : next.kind === "answer" ? 900 : next.kind === "ask" ? 500 : 140;
    const timer = window.setTimeout(() => setShown(shown + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, shown]);

  const finished = shown >= SESSION.length;

  return (
    <div className={className}>
      <div className={`${className}_top`}>
        <div className={`${className}_frame`} ref={frameRef}>
          <div className={`${className}_chrome`} aria-hidden="true">
            <Icon name="terminal" />
            <span className={`${className}_tab ${className}_tab-current`}>Terminal 1</span>
            <span className={`${className}_tab`}>Terminal 2</span>
            <Icon className={`${className}_tab_add`} name="plus" size="0.875em" />
          </div>

          <pre className={`${className}_session`}>
            {SESSION.map((line, i) => (
              <span
                className={cx(
                  `${className}_line`,
                  `${className}_line-${line.kind}`,
                  i < shown && `${className}_line-shown`
                )}
                key={i}
              >
                {line.kind === "command" && <span className={`${className}_bullet`}>●</span>}
                {line.kind === "ask" && <span className={`${className}_bullet`}>›</span>}
                {line.text}
                {"\n"}
              </span>
            ))}
            {!reduced && started && !finished && <span className={`${className}_cursor`} aria-hidden="true" />}
          </pre>

          {!reduced && (
            <button
              className={`${className}_replay`}
              type="button"
              disabled={!finished}
              onClick={() => setShown(0)}
            >
              <Icon name="refresh" size="0.875em" />
              Replay
            </button>
          )}
        </div>

        <ul className={`${className}_gives`}>
          {GIVES.map((give) => (
            <li className={`${className}_give`} key={give.title}>
              <Icon className={`${className}_give_glyph`} name={give.glyph} size="1.125em" />
              <span className={`${className}_give_title`}>{give.title}</span>
              <span className={`${className}_give_body`}>{give.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <details className={`${className}_reference`}>
        <summary className={`${className}_reference_summary`}>
          <Icon className={`${className}_reference_marker`} name="chevronRight" size="0.875em" />
          Every command, and what it answers
          <span className={`${className}_reference_count`}>{COMMANDS.length}</span>
        </summary>
        <table className={`${className}_table`}>
          <thead>
            <tr>
              <th scope="col">Command</th>
              <th scope="col">What it does</th>
            </tr>
          </thead>
          <tbody>
            {COMMANDS.map((entry) => (
              <tr key={entry.command}>
                <td className={`${className}_command`}>
                  <span className={`${className}_command_prefix`}>fileanalyzer </span>
                  {entry.command}
                </td>
                <td className={`${className}_does`}>{entry.does}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <Cards items={AUDIENCES} />
    </div>
  );
}
