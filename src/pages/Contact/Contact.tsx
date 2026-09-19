import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { CONTACT_EMAIL, PRODUCT_NAME } from "../../core/Constants";
import { cx } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./contact.css";

const className = "contact";

const REASONS: Array<{ title: string; body: string }> = [
  {
    title: "A file it got wrong",
    body: "It named a format that the file is not, or failed to name one it should know. Say what the file was and what it said."
  },
  {
    title: "A crash or a hang",
    body: "What you opened, what you did, and what the window did. The version is on the download page."
  },
  {
    title: "A format it should open",
    body: "Name it, and say what you needed to see inside it."
  },
  {
    title: "Your account or your data",
    body: "A copy of what is held about you, a correction, or deleting the account and the review with it."
  }
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function copy() {
    setCopied(true);
    void navigator.clipboard?.writeText(CONTACT_EMAIL).catch(() => setCopied(false));
  }

  return (
    <article className={`page ${className}`}>
      <p className="page_eyebrow fa_eyebrow">Support</p>
      <h1 className="page_title">Contact</h1>
      <p className="page_lead">
        One address, read by a person. There is no ticket system and no chatbot.
      </p>

      <div className={`${className}_actions`}>
        <a className="fa_button fa_button-primary" href={`mailto:${CONTACT_EMAIL}`}>
          <Icon name="mail" size="1em" />
          Email us
        </a>

        {/* The address is drawn, not only linked: not everyone reads this in a
            browser that has a mail client behind it. */}
        <span className={cx(`${className}_address`, copied && `${className}_address-done`)}>
          <code className={`${className}_address_value`}>{CONTACT_EMAIL}</code>
          <button
            className={cx(`${className}_copy`, copied && `${className}_copy-done`)}
            type="button"
            onClick={copy}
            title={copied ? "Copied" : "Copy email address"}
            aria-label={copied ? "Copied" : "Copy email address"}
          >
            <Icon name={copied ? "success" : "clipboard"} size="1.15em" />
          </button>
        </span>

        <span className="fa_hidden" role="status">
          {copied ? "Address copied to the clipboard" : ""}
        </span>
      </div>

      <section className="page_block" aria-labelledby="contact-reasons">
        <h2 className="page_block_title" id="contact-reasons">
          What to write about
        </h2>
        <ul className="page_cards">
          {REASONS.map((reason) => (
            <li className={`page_card ${className}_reason`} key={reason.title}>
              <p className="page_card_title">{reason.title}</p>
              <p className="page_card_body">{reason.body}</p>
              <a
                className={`${className}_reason_link`}
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(reason.title)}`}
              >
                <Icon name="mail" size="0.875em" />
                Write about this
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="page_block" aria-labelledby="contact-files">
        <h2 className="page_block_title" id="contact-files">
          Do not send us the file
        </h2>
        <p>
          {PRODUCT_NAME} runs on your machine and nothing you open reaches us, and that does not
          change because something went wrong. Describe the file — its size, its extension, the
          first bytes the Raw tab shows — rather than attaching it. If a file really is needed to
          understand a fault, we will ask, and only then.
        </p>
      </section>

      <section className="page_block" aria-labelledby="contact-security">
        <h2 className="page_block_title" id="contact-security">
          Security reports
        </h2>
        <p>
          A flaw in the site or the application goes to the same address, with{" "}
          <strong>security</strong> in the subject. Please give us a reasonable chance to fix it
          before publishing it. What we store, and what the server logs, is set out on the{" "}
          <Link to={ROUTES.PRIVACY}>privacy</Link> page.
        </p>
      </section>
    </article>
  );
}
