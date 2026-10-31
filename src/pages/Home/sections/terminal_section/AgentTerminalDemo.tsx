import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import Icon from "../../../../components/Icon/Icon";
import type { GlyphName } from "../../../../components/Icon/glyphs";
import { HOME_SECTIONS } from "../../../../core/Constants";
import { cx, prefersReducedMotion } from "../../../../core/Utility";
import InfoCardGrid from "../InfoCardGrid";
import type { InfoCard } from "../InfoCardGrid";
import Section from "../Section";
import claudeLogo from "../../../../assets/icons/claude.svg";
import codexLogo from "../../../../assets/icons/codex.svg";
import geminiLogo from "../../../../assets/icons/gemini.svg";
import "./agentterminaldemo.css";

const className = "agentterminaldemo";

type Line = { kind: "prompt" | "ask" | "command" | "output" | "answer"; text: string };

const CLAUDE_SESSION: Line[] = [
  { kind: "prompt", text: "PS C:\\Users\\you> claude" },
  { kind: "ask", text: "What is inside the file I have open, and is any of it signed?" },
  { kind: "command", text: "sigaflex fetch tree" },
  { kind: "output", text: "installer.exe [PE]" },
  { kind: "output", text: "├─ Structure" },
  { kind: "output", text: "├─ .rsrc" },
  { kind: "output", text: "└─ setup.zip [ZIP]" },
  { kind: "output", text: "   ├─ app.jar [JAR]" },
  { kind: "output", text: "   ├─ config.xml" },
  { kind: "output", text: "   └─ logo.png [PNG]" },
  { kind: "command", text: "sigaflex inspect file \"C:\\Users\\you\\Downloads\\installer.exe\\setup.zip\\app.jar\"" },
  { kind: "command", text: "sigaflex capture window" },
  { kind: "output", text: "…\\SigaFlex\\commands\\window.png" },
  { kind: "command", text: "sigaflex export inspected file data" },
  { kind: "output", text: "…\\SigaFlex\\commands\\exported" },
  {
    kind: "answer",
    text: "The installer carries a ZIP appended past its last section, with a Java application inside it. The PE itself has one Authenticode certificate. Nothing inside the ZIP is signed, and MANIFEST.MF names no signer either."
  }
];

const CODEX_SESSION: Line[] = [
  { kind: "prompt", text: "PS C:\\Users\\you> codex" },
  { kind: "ask", text: "Is there a way to change shortcut keys?" },
  { kind: "command", text: "sigaflex show views list" },
  {
    kind: "output",
    text: '["inspector-view","inspector-view-side-tab","inspector-view-display-box","inspector-view-display-box-readable-area","inspector-view-display-box-raw-area","inspector-view-display-box-disassembly-area","inspector-view-display-box-patterns-area","inspector-view-display-box-hexadecimal-area","inspector-view-display-box-code-area","tree-view","terminal-panel","top-bar","file-password-view","settings-panel"]'
  },
  { kind: "command", text: "sigaflex show component settings-panel details" },
  { kind: "output", text: "SettingsPanel#settings-panel.settings-overlay [-310,-210 620x420] hidden" },
  { kind: "output", text: "  BorderPane.settings-card [-310,-210 620x420]" },
  { kind: "output", text: "    HBox.settings-header [-310,-210 620x44]" },
  { kind: "output", text: "+109 lines" },
  {
    kind: "answer",
    text:
      "Yes—open Settings → Shortcuts.\n\n" +
      "1. Click the current shortcut beside an action.\n" +
      "2. Press the new key combination.\n" +
      "3. Click Apply or OK.\n\n" +
      "You can use Restore defaults to reset the shortcuts."
  }
];

const TERMINALS: Array<{ name: string; session: Line[] }> = [
  { name: "Terminal 1", session: CLAUDE_SESSION },
  { name: "Terminal 2", session: CODEX_SESSION }
];

const COMMAND_EXAMPLES: Array<{ command: string; does: string }> = [
  { command: "fetch absolute path \"\"", does: "The file or folder the user gave the program." },
  { command: "fetch tree [path]", does: "The tree as it is loaded, from the root or from any entry under it." },
  { command: "fetch absolute path <path>", does: "Where an entry lives on disk, or which container it is inside." },
  { command: "process file <path>", does: "Opens a file or folder in the program, replacing what is open." },
  { command: "inspect file <path>", does: "Opens the inspector on an entry of the tree, as choosing Inspect would." },
  { command: "fetch supported file extensions", does: "The file extensions the program can analyse." },
  { command: "fetch conversion formats <path>...", does: "The formats the given files can be converted to." },
  { command: "convert to <format> <folder> <path>...", does: "Converts files, including entries inside containers, into a folder." },
  { command: "show views list", does: "Every page and view the window has." },
  { command: "show component <view_id> details", does: "One view in full: children, position, size, style, what it does." },
  { command: "fetch visible components details", does: "What is in front of the user right now." },
  { command: "capture window", does: "A screenshot of the window, saved to a path." },
  { command: "export inspected file data", does: "The tree, details, readable text, disassembly and decompiled code of the inspected entry, as files." },
  { command: "show available commands", does: "Lists the commands available in the terminal." }
];

const SUPPORTED_AGENTS: Array<{ logo: string; name: string; upcoming?: boolean }> = [
  { logo: codexLogo, name: "Codex" },
  { logo: claudeLogo, name: "Claude Code" },
  { logo: geminiLogo, name: "Gemini CLI", upcoming: true }
];

const GIVES: Array<{ glyph: GlyphName; title: string; body: string }> = [
  {
    glyph: "clipboard",
    title: "Briefed on arrival",
    body: "The terminal's working directory carries CLAUDE.md and AGENTS.md. Claude Code or Codex started there already knows the commands and the rules."
  },
  {
    glyph: "camera",
    title: "Sees what you see",
    body: "A screenshot of the window, the list of views, and the details of every visible component, on request."
  },
  {
    glyph: "layers",
    title: "Reads what you read",
    body: "The tree, any entry's place on disk, and the inspector's details, strings and disassembly as plain files."
  },
  {
    glyph: "cursor",
    title: "Drives the window",
    body: "Opens files, inspects entries, converts files, runs the commands you would have typed, and reports back in the same tab."
  },
  {
    glyph: "padlock",
    title: "Command channel stays local",
    body: "The command channel is a loopback socket. The agent you run may send what it reads to its model provider, under that agent's own settings and terms."
  }
];

const AUDIENCES: InfoCard[] = [
  {
    glyph: "code",
    title: "Developers",
    body: "Hand the agent a build artifact and ask what is in it, what changed, or why the manifest disagrees with the class files."
  },
  {
    glyph: "shield",
    title: "Security work",
    body: "The tree, details, strings, disassembly and decompiled code exported to files an agent can read. What leaves the machine depends on the agent you choose."
  },
  {
    glyph: "lightbulb",
    title: "Curious use",
    body: "Ask in plain words what a file is and what it is hiding. The agent runs the commands; you read the answer."
  }
];

export default function AgentTerminalDemo() {
  const [terminal, setTerminal] = useState(0);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [reduced] = useState(() => prefersReducedMotion());
  const frameRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const session = TERMINALS[terminal].session;

  function openTerminal(index: number) {
    if (index === terminal) return;
    setTerminal(index);
    setShown(reduced ? TERMINALS[index].session.length : 0);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number;
    if (event.key === "ArrowRight") next = (terminal + 1) % TERMINALS.length;
    else if (event.key === "ArrowLeft") next = (terminal - 1 + TERMINALS.length) % TERMINALS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TERMINALS.length - 1;
    else return;

    event.preventDefault();
    openTerminal(next);
    tabRefs.current[next]?.focus();
  }

  useEffect(() => {
    if (reduced) {
      setShown(TERMINALS[0].session.length);
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
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started || shown >= session.length) return;
    const next = session[shown];
    const delay = next.kind === "command" ? 700 : next.kind === "answer" ? 900 : next.kind === "ask" ? 500 : 140;
    const timer = window.setTimeout(() => setShown(shown + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, shown, session]);

  const finished = shown >= session.length;

  return (
    <Section
      id={HOME_SECTIONS.TERMINAL}
      title="AI agents terminal support"
      lead="A real shell inside the window, with a command channel, so your AI agents can help you with your tasks."
      tone="raised"
    >
      <div className={className}>
        <div className={`${className}_agents`}>
          <span className={`${className}_agents_label`} id="agentterminal-agents-label">
            Supported AI agents
          </span>
          <ul className={`${className}_agents_list`} aria-labelledby="agentterminal-agents-label">
            {SUPPORTED_AGENTS.map((agent) => (
              <li className={cx(`${className}_agent`, agent.upcoming && `${className}_agent-upcoming`)} key={agent.name}>
                <img className={`${className}_agent_logo`} src={agent.logo} alt="" />
                {agent.name}
                {agent.upcoming && <span className={`${className}_agent_badge`}>Upcoming</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${className}_top`}>
          <div className={`${className}_frame`} ref={frameRef}>
            <div className={`${className}_chrome`}>
              <Icon name="terminal" />
              <div className={`${className}_tabs`} role="tablist" aria-label="Terminals">
                {TERMINALS.map((entry, i) => (
                  <button
                    className={cx(`${className}_tab`, i === terminal && `${className}_tab-current`)}
                    key={entry.name}
                    ref={(element) => {
                      tabRefs.current[i] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`agentterminal-tab-${i}`}
                    aria-selected={i === terminal}
                    aria-controls="agentterminal-panel"
                    tabIndex={i === terminal ? 0 : -1}
                    onClick={() => openTerminal(i)}
                    onKeyDown={onTabKeyDown}
                  >
                    {entry.name}
                  </button>
                ))}
              </div>
              <Icon className={`${className}_tab_add`} name="plus" size="0.875em" />
            </div>

            <pre
              className={`${className}_session`}
              key={terminal}
              id="agentterminal-panel"
              role="tabpanel"
              aria-labelledby={`agentterminal-tab-${terminal}`}
            >
              {session.map((line, i) => (
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
            Command examples
            <span className={`${className}_reference_count`}>{COMMAND_EXAMPLES.length}</span>
          </summary>
          <table className={`${className}_table`}>
            <thead>
              <tr>
                <th scope="col">command</th>
                <th scope="col">What it does</th>
              </tr>
            </thead>
            <tbody>
              {COMMAND_EXAMPLES.map((entry) => (
                <tr key={entry.command}>
                  <td className={`${className}_command`}>
                    <span className={`${className}_command_prefix`}>sigaflex </span>
                    {entry.command}
                  </td>
                  <td className={`${className}_does`}>{entry.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <InfoCardGrid items={AUDIENCES} />
      </div>
    </Section>
  );
}
