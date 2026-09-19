import { Link } from "react-router-dom";

import { CONTACT_EMAIL, POLICY_UPDATED, SITE_NAME, SITE_OPERATOR } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";

export default function Privacy() {
  return (
    <article className="page">
      <h1 className="page_title">Privacy</h1>
      <p className="page_lead">
        What this site stores, why, and for how long. Written against what the code actually does.
      </p>
      <p className="page_external_note">Last updated {POLICY_UPDATED}.</p>

      <section className="page_block" aria-labelledby="privacy-files">
        <h2 className="page_block_title" id="privacy-files">
          Your files never reach us
        </h2>
        <p>
          {SITE_NAME} is a desktop application. It opens files on your own machine, read-only, and
          this site never receives one. The format check on the home page is the same promise: it
          reads the opening bytes of the file you drop in your own browser and nothing is uploaded.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-cookies">
        <h2 className="page_block_title" id="privacy-cookies">
          Cookies and browser storage
        </h2>
        <p>
          One cookie, <code>fa_consent</code>, records your answer to the cookie question and lasts
          a year. It is the only cookie this site sets. If you decline, nothing else is ever
          written; if you accept, anything added later is still held to that answer.
        </p>
        <p>
          While you are signed in, your session token is kept in the browser&apos;s sessionStorage
          rather than in a cookie, so it is never attached to a request made by another site and it
          is gone when the tab closes.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-account">
        <h2 className="page_block_title" id="privacy-account">
          If you register an account
        </h2>
        <p>
          The server stores your e-mail address, a bcrypt hash of your password — never the
          password itself — and the times you registered, accepted the terms, confirmed the address
          and last signed in. It also counts failed sign-in attempts and, after five, locks the
          account for fifteen minutes.
        </p>
        <p>
          Confirmation and password-reset links are stored only as a SHA-256 hash of the token, so a
          copy of the database hands nobody a working link. A confirmation link lives 24 hours and a
          reset link 30 minutes.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-reviews">
        <h2 className="page_block_title" id="privacy-reviews">
          If you leave a review
        </h2>
        <p>
          The name you choose to show, your rating, your text and the dates are stored and are
          public to everyone who visits the site. Your e-mail address is not shown with a review.
          One account holds one review; you can change or remove yours at any time from the home
          page.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-security">
        <h2 className="page_block_title" id="privacy-security">
          Requests the server turns away
        </h2>
        <p>
          When a request is rejected — a bad address, a method that is not allowed, a header that
          should not be there — the server records the IP address it came from, the method and path
          asked for, the browser it claimed to be, the reason and the time. That is how an address
          that keeps hammering the server gets blocked, which it is for six hours.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-third-parties">
        <h2 className="page_block_title" id="privacy-third-parties">
          No third parties
        </h2>
        <p>
          There is no analytics, no advertising, no embedded widget and no third-party script. The
          fonts are served from this site rather than from a font service, so loading a page tells
          nobody but us that you were here.
        </p>
      </section>

      <section className="page_block" aria-labelledby="privacy-rights">
        <h2 className="page_block_title" id="privacy-rights">
          Your data, on request
        </h2>
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
      </section>
    </article>
  );
}
