import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/Icon/Icon";
import { HOME_SECTIONS, PRODUCT_NAME } from "../../../core/Constants";
import { ROUTES } from "../../../Routing";
import "./faq.css";

const className = "faq";

type Entry = { question: string; answer: ReactNode };

export default function Faq() {
  const entries: Entry[] = [
    {
      question: "Does anything leave my machine?",
      answer: (
        <>
          No. {PRODUCT_NAME} runs offline and makes no network calls. It never asks you to sign in,
          and nothing you open is uploaded anywhere. The probe on this page keeps the same promise:
          it reads the opening bytes in your browser tab and sends nothing.
        </>
      )
    },
    {
      question: "Can it change or damage a file?",
      answer: (
        <>
          No. Files are opened read-only and nothing is ever written back to them. Members of a
          container are decompressed in memory when you expand them and dropped when you collapse
          them, so no temporary copies are left on disk either.
        </>
      )
    },
    {
      question: "Is it safe to open something I do not trust?",
      answer: (
        <>
          Analysis reads bytes; it never runs them. The disassembly is decoded, not executed. The
          only things that run are the ones you start yourself: converting an Office document hands
          it to Word or Excel, and the terminal runs what you type into it.
        </>
      )
    },
    {
      question: "What if the extension is wrong, or missing?",
      answer: (
        <>
          The name is never consulted. The first bytes are read, the structure they promise is
          checked, and the file opens as what it turned out to be. A ZIP called report.pdf opens as
          a ZIP.
        </>
      )
    },
    {
      question: "What happens with a format it does not know?",
      answer: (
        <>
          It still opens. Raw bytes, readable strings and patterns work on anything, and the
          coverage map segments the file by entropy and probes each region, so an archive buried
          inside an unknown blob is still found and opened.
        </>
      )
    },
    {
      question: "Can an AI agent use it?",
      answer: (
        <>
          Yes. The window has a real terminal with a command channel. Start Claude Code or Codex in
          it and the agent is briefed automatically: it can read the tree, screenshot the window,
          open entries, switch views and export what the inspector shows. See{" "}
          <a href={`#${HOME_SECTIONS.TERMINAL}`}>the terminal</a>.
        </>
      )
    },
    {
      question: "Which platforms does it run on?",
      answer: (
        <>
          Windows 10 and 11, 64-bit. Linux and macOS are planned with no date yet; the{" "}
          <Link to={ROUTES.DOWNLOAD}>download</Link> page will carry one as soon as there is one.
        </>
      )
    },
    {
      question: "What does it cost, and do I need an account?",
      answer: (
        <>
          It is free while it is in development, and the application itself never needs an
          account. An account is for this site: reviews, and the plan you are on once there is one.
          The shape of the plans is on the <Link to={ROUTES.PRICING}>pricing</Link> page.
        </>
      )
    }
  ];

  return (
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
  );
}
