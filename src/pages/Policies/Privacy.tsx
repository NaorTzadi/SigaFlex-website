import { Link } from "react-router-dom";
import PolicyDraftNotice from "./PolicyDraftNotice";

import TableOfContents from "../../components/TableOfContents/TableOfContents";
import Icon from "../../components/Icon/Icon";
import { CONTACT_EMAIL, EXTERNAL_LINKS, POLICY_UPDATED, SITE_NAME, SITE_OPERATOR } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./privacy.css";

const className = "privacy";

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
    /* SAFEGUARD PRIV-005 — see SAFEGUARDS.md */
    {
      id: "privacy-cookies",
      title: "Cookies and browser storage",
      body: (
        <>
          <p>
            This website uses two first-party cookies and two tab-storage entries for your cookie
            choice, sign-in and review-draft recovery. They may be used whether you accept or
            decline the cookie question; sign-in and draft storage are used when those features
            are needed.
          </p>
          <table className={`${className}_storage_table`}>
            <caption>Cookies and browser storage set by this website</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Purpose</th>
                <th scope="col">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <code>fa_consent</code>
                  <span className={`${className}_storage_type`}>Cookie</span>
                </th>
                <td>Records your Accept or Decline choice.</td>
                <td>365 days after your answer.</td>
              </tr>
              <tr>
                <th scope="row">
                  <code>fa_remember</code>
                  <span className={`${className}_storage_type`}>Cookie</span>
                </th>
                <td>
                  A token that restores sign-in on a later visit. It is set after authentication
                  when the server issues a remember token.
                </td>
                <td>Up to 30 days; replaced when used and removed when you sign out.</td>
              </tr>
              <tr>
                <th scope="row">
                  <code>fa_session</code>
                  <span className={`${className}_storage_type`}>Session storage</span>
                </th>
                <td>A session token used for authenticated requests in this tab.</td>
                <td>The tab session; removed earlier on sign-out or session rejection.</td>
              </tr>
              <tr>
                <th scope="row">
                  <code>fa_google_state</code>
                  <span className={`${className}_storage_type`}>Session storage</span>
                </th>
                <td>
                  A random value that confirms the answer coming back from Google belongs to the
                  sign-in you started in this tab.
                </td>
                <td>Removed when you return from Google, or at the end of the tab session.</td>
              </tr>
              <tr>
                <th scope="row">
                  <code>file-analyzer.review-draft</code>
                  <span className={`${className}_storage_type`}>Session storage</span>
                </th>
                <td>
                  Your display name, rating and review text, saved when posting requires sign-in
                  so you can resume afterward.
                </td>
                <td>Until successful posting or the end of the tab session.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Session storage belongs to the tab. Your browser may restore it when restoring a
            browsing session. Browser settings can remove or block cookies and storage.
          </p>
          <p>
            We do not set first-party analytics or advertising cookies. A new optional purpose
            that needs consent will require a separate choice before it is enabled; today&apos;s
            answer does not authorize new purposes. YouTube&apos;s player has its own browser-storage
            behavior, described below.
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
            If you sign in with Google, Google tells the server your e-mail address, that Google
            has verified it, and an identifier for your Google account. The server stores the
            address and that identifier to recognise you, and nothing else from Google. Your Google
            password never reaches us. An account made this way has no password here until you set
            one. Google&apos;s handling of the sign-in is covered by the{" "}
            <a href={EXTERNAL_LINKS.GOOGLE_PRIVACY_POLICY} target="_blank" rel="noreferrer noopener">
              Google Privacy Policy (opens in a new tab)
            </a>
            .
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
    /* SAFEGUARD PRIV-005 — see SAFEGUARDS.md */
    {
      id: "privacy-third-parties",
      title: "YouTube demonstration video",
      body: (
        <>
          <p>
            Fonts are served from this website. We do not add first-party analytics or advertising
            scripts. The home-page demonstration video is hosted by YouTube (Google) and uses
            its <code>youtube-nocookie.com</code> player.
          </p>
          <p>
            The player is not loaded until you press Play. Accepting the cookie question does not
            load it. Playing shares your IP address, browser and viewing information with Google,
            and the player may use cookies or other browser storage.
          </p>
          <p>
            The Stop and unload video control removes the player and returns to the Play button.
            It does not erase data Google already received or clear its browser storage. You can
            manage stored data through your browser and Google&apos;s controls.
          </p>
          <p>
            Read the{" "}
            <a href={EXTERNAL_LINKS.GOOGLE_PRIVACY_POLICY} target="_blank" rel="noreferrer noopener">
              Google Privacy Policy (opens in a new tab)
            </a>{" "}
            and{" "}
            <a href={EXTERNAL_LINKS.GOOGLE_COOKIES} target="_blank" rel="noreferrer noopener">
              Google cookie information (opens in a new tab)
            </a>
            . Following either link opens Google&apos;s website at your request.
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
    <article className={className}>
      <div className="page">
        <p className="page_eyebrow fa_eyebrow">Policy</p>
        <h1 className="page_title">Privacy</h1>
        <PolicyDraftNotice />
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
      </div>
    </article>
  );
}
