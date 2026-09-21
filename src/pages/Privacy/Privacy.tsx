import { Link } from "react-router-dom";

import TableOfContents from "../../components/TableOfContents/TableOfContents";
import Icon from "../../components/Icon/Icon";
import { CONTACT_EMAIL, POLICY_UPDATED, SITE_NAME, SITE_OPERATOR } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";

export default function Privacy() {
  /* One list, read twice: once as the contents down the side, once as the
     prose itself. A section cannot go missing from the contents, and the
     contents cannot point at a section that is not there. */
  const sections = [
    {
      id: "privacy-files",
      title: "Your files never reach us",
      body: (
        <p>
          {SITE_NAME} is a desktop application. It opens files on your own machine, read-only, and
          this site never receives one. The format check on the home page is the same promise: it
          reads the opening bytes of the file you drop in your own browser and nothing is uploaded.
        </p>
      )
    },
    {
      id: "privacy-cookies",
      title: "Cookies and browser storage",
      body: (
        <>
          <p>
            One cookie, <code>fa_consent</code>, records your answer to the cookie question and
            lasts a year. If you decline, nothing beyond what signing in needs is ever written; if
            you accept, anything added later is still held to that answer.
          </p>
          <p>
            While you are signed in, your session token is kept in the browser&apos;s sessionStorage
            rather than in a cookie, so it is never attached to a request made by another site and
            it is gone when the tab closes. A second cookie, <code>fa_remember</code>, holds a token
            that signs you back in on your next visit. It lasts thirty days, is replaced every time
            it is used, and is removed when you sign out.
          </p>
        </>
      )
    },
    {
      id: "privacy-account",
      title: "If you register an account",
      body: (
        <>
          <p>
            The server stores your e-mail address, a bcrypt hash of your password — never the
            password itself — and the times you registered, accepted the terms, confirmed the
            address and last signed in. It also counts failed sign-in attempts and, after five,
            locks the account for fifteen minutes.
          </p>
          <p>
            Confirmation and password-reset links are stored only as a SHA-256 hash of the token, so
            a copy of the database hands nobody a working link. A confirmation link lives 24 hours
            and a reset link 30 minutes.
          </p>
        </>
      )
    },
    {
      id: "privacy-reviews",
      title: "If you leave a review",
      body: (
        <p>
          The name you choose to show, your rating, your text and the dates are stored and are
          public to everyone who visits the site. Your e-mail address is not shown with a review.
          One account holds one review; you can change or remove yours at any time from the home
          page.
        </p>
      )
    },
    {
      id: "privacy-security",
      title: "Requests the server turns away",
      body: (
        <p>
          When a request is rejected — a bad address, a method that is not allowed, a header that
          should not be there — the server records the IP address it came from, the method and path
          asked for, the browser it claimed to be, the reason and the time. That is how an address
          that keeps hammering the server gets blocked, which it is for six hours.
        </p>
      )
    },
    {
      id: "privacy-third-parties",
      title: "One third party",
      body: (
        <>
          <p>
            There is no analytics, no advertising and no third-party script. The fonts are served
            from this site rather than from a font service, so opening a page tells nobody but us
            that you were here.
          </p>
          <p>
            The exception is the demonstration video on the home page. Its player comes from
            YouTube&apos;s <code>youtube-nocookie.com</code> rather than from youtube.com, and it is
            not part of the page when the page opens: it is added only once you scroll near the band
            that holds it. From that point your browser is talking to YouTube directly, and Google
            receives what any request carries — your IP address, what your browser says it is, and
            which page asked. None of that reaches us, and if you never scroll that far nothing is
            requested at all.
          </p>
        </>
      )
    },
    {
      id: "privacy-rights",
      title: "Your data, on request",
      body: (
        <>
          <p>
            Ask for a copy of what is held about you, a correction, or the deletion of your account
            and your review, and it will be done. Deleting an account removes the review with it.
            Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or use the{" "}
            <Link to={ROUTES.CONTACT}>contact page</Link>.
          </p>
          <p>
            {SITE_OPERATOR} runs this site and decides what is stored on it. The{" "}
            <Link to={ROUTES.TERMS}>terms</Link> cover the rest of the arrangement.
          </p>
        </>
      )
    }
  ];

  return (
    <article className="page">
      <p className="page_eyebrow fa_eyebrow">Policy</p>
      <h1 className="page_title">Privacy</h1>
      <p className="page_lead">
        What this site stores, why, and for how long. Written against what the code actually does.
      </p>
      <p className="page_meta">
        <Icon name="calendar" size="1em" />
        Last updated {POLICY_UPDATED}
      </p>

      <div className="page_layout">
        <TableOfContents
          label="Sections of the privacy page"
          entries={sections.map(({ id, title }) => ({ id, title }))}
        />

        <div className="page_prose">
          {sections.map((section) => (
            <section
              className="page_block"
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <h2 className="page_block_title" id={`${section.id}-heading`}>
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
