import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import Icon from "../../../../components/Icon/Icon";
import { HOME_SECTIONS, PRODUCT_NAME } from "../../../../core/Constants";
import { ROUTES } from "../../../../Routing";
import Section from "../Section";
import "./faq.css";

const className = "faq";

type Entry = { question: string; answer: ReactNode };

export default function Faq() {
  const entries: Entry[] = [
    {
      question: "Does it need an internet connection?",
      answer: (
        <>
          No. {PRODUCT_NAME} can be used offline. Connecting an account uses the internet. The
          format check on this page reads the opening bytes locally in your browser without
          uploading the file.
        </>
      )
    },
    /* SAFEGUARD CLAIM-001 — see SAFEGUARDS.md */
    {
      question: "Can it change or damage a file?",
      answer: (
        <>
          Files are opened read-only and nothing is written back to them. To inspect, preview,
          copy, drag out or convert a member of a container, {PRODUCT_NAME} writes that member to its own
          temporary folder, and the inspector keeps its working output there too. Files you drop
          into the window are copied there before they are analysed. Exports, conversions and
          screenshots are written where you choose, and the application keeps its own settings.
        </>
      )
    },
    /* SAFEGUARD CLAIM-001 — see SAFEGUARDS.md */
    {
      question: "Is it safe to open something I do not trust?",
      answer: (
        <>
          Analysis reads bytes; it does not run them. The disassembly is decoded, not executed.
          Some actions do start programs, and only when you choose them: Run on the Track tab
          launches the executable you are inspecting, converting a document hands it to Word,
          Excel or PowerPoint, other conversions may use LibreOffice, ImageMagick, Blender or
          Graphviz when they are installed, and the terminal runs what you type into it. Do not
          press Run on a file you do not trust outside an isolated machine. Members written to the
          temporary folder may be flagged by your antivirus. Reading a file without running it
          lowers the risk but does not remove it, and {PRODUCT_NAME} is not a virus scanner.
        </>
      )
    },
    {
      question: "What if the extension is wrong, or missing?",
      answer: (
        <>
          The name is not used to identify a file. The first bytes are read, the structure they
          promise is checked, and the file opens as what it turned out to be. A ZIP called
          report.pdf opens as a ZIP. The formats offered for conversion are still chosen by the
          file&apos;s extension.
        </>
      )
    },
    {
      question: "What happens with a format it does not know?",
      answer: (
        <>
          It still opens. Raw bytes, readable strings and patterns work on anything, and the
          engine segments the file by entropy and probes each region, so an archive buried inside
          an unknown blob is still found and opened. Bytes nothing explains appear in the tree as
          their own regions.
        </>
      )
    },
    {
      question: "Can an AI agent use it?",
      answer: (
        <>
          Yes. The window has a real terminal with a command channel. Start Claude Code or Codex in
          it and the agent is briefed automatically: it can read the tree, screenshot the window,
          open files, inspect entries, convert files and export what the inspector shows. The agent may send what
          it reads to its model provider, under that agent&apos;s own settings and terms. See{" "}
          <a href={`#${HOME_SECTIONS.TERMINAL}`}>the terminal</a>.
        </>
      )
    },
    {
      question: "Which platforms will it run on?",
      answer: (
        <>
          Windows 10 and 11, 64-bit, first. Linux and macOS are planned with no date yet; the{" "}
          <Link to={ROUTES.DOWNLOAD}>download</Link> page will carry one as soon as there is one.
        </>
      )
    },
    {
      question: "What will it cost, and how are accounts used?",
      answer: (
        <>
          {PRODUCT_NAME} is not released yet, and downloads, trials and paid plans are not
          available. At release, a limited free version is planned without an account; trial and
          paid access will require one. Today an account on this site is used for reviews. The
          planned plans are on the <Link to={ROUTES.PRICING}>pricing</Link> page.
        </>
      )
    }
  ];

  return (
    <Section
      id={HOME_SECTIONS.FAQ}
      title="Questions, answered"
      lead="The things people ask before they open a file they care about."
    >
      <div className={className}>
        {entries.map((entry) => (
          <details className={`${className}_item`} key={entry.question} name={className}>
            <summary className={`${className}_question`}>
              <span className={`${className}_question_text`}>{entry.question}</span>
              <Icon className={`${className}_marker`} name="plus" size="1em" />
            </summary>
            <div className={`${className}_answer`}>
              <p className={`${className}_answer_text`}>{entry.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
