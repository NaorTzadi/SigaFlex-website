import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { CONTACT_EMAIL, PRODUCT_NAME } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";

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
  return (
    <article className="page">
      <h1 className="page_title">Contact</h1>
      <p className="page_lead">
        One address, read by a person. There is no ticket system and no chatbot.
      </p>

      <p className="page_block">
        <a className="fa_button fa_button-primary" href={`mailto:${CONTACT_EMAIL}`}>
          <Icon name="export" size="1em" />
          {CONTACT_EMAIL}
        </a>
      </p>

      <section className="page_block" aria-labelledby="contact-reasons">
        <h2 className="page_block_title" id="contact-reasons">
          What to write about
        </h2>
        <dl className="page_definitions">
          {REASONS.map((reason) => (
            <div className="page_definition" key={reason.title}>
              <dt>{reason.title}</dt>
              <dd>{reason.body}</dd>
            </div>
          ))}
        </dl>
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
