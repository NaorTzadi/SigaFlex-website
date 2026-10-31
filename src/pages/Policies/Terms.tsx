import { Link } from "react-router-dom";
import PolicyDraftNotice from "./PolicyDraftNotice";

import TableOfContents from "../../components/TableOfContents/TableOfContents";
import Icon from "../../components/Icon/Icon";
import {
  CONTACT_EMAIL,
  POLICY_UPDATED,
  PRODUCT_NAME,
  SITE_JURISDICTION,
  SITE_NAME,
  SITE_OPERATOR
} from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";

export default function Terms() {
  /* The contents and the prose are the same list; see Privacy. */
  const sections = [
    {
      id: "terms-scope",
      title: "What these cover",
      body: (
        <p>
          Using this site means accepting what is written here. Your account can be used on this
          site and connected to the application. The application can be used offline; connecting
          an account uses the internet. What is stored about you is set out in the{" "}
          <Link to={ROUTES.PRIVACY}>privacy</Link> page.
        </p>
      )
    },
    {
      id: "terms-account",
      title: "Your account",
      body: (
        <p>
          Register with an address you control, keep the password to yourself, and tell us if you
          believe someone else is using the account. One person, one account. An account whose
          address is never confirmed, or which is used to attack the site, can be closed.
        </p>
      )
    },
    {
      id: "terms-reviews",
      title: "Reviews",
      body: (
        <>
          <p>
            A review is public the moment you post it. It stays yours — you keep whatever rights you
            have in what you wrote — and posting it gives {SITE_OPERATOR} permission to show it on
            this site. One account holds one review, and you can change or withdraw yours whenever
            you like.
          </p>
          <p>
            Do not post someone else&apos;s personal details, anything unlawful, anything you do not
            have the right to publish, or anything aimed at a person rather than the software. A
            review that does can be removed without warning.
          </p>
          {/* SAFEGUARD REV-001 — see SAFEGUARDS.md */}
          <p>
            To report a review — because it is about you, uses your work, impersonates someone or
            breaks these rules — write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,
            naming the review and the reason.
          </p>
        </>
      )
    },
    {
      id: "terms-use",
      title: "Using the site",
      body: (
        <p>
          Read it, download from it, link to it. Do not try to break into it, flood it with
          requests, or work around the measures that stop either. The server counts what arrives,
          turns away what it does not like and blocks an address that keeps at it.
        </p>
      )
    },
    {
      id: "terms-software",
      title: "The software",
      body: (
        <p>
          {PRODUCT_NAME} is licensed to you for your own use, not sold. Components distributed with
          it carry their own licences, which travel with the application. Notices for this
          website&apos;s components are published on the{" "}
          <Link to={ROUTES.LICENSES}>third-party licences</Link> page; where a component&apos;s licence
          gives you more than these terms do, it wins for that component.
        </p>
      )
    },
    {
      id: "terms-warranty",
      title: "No warranty",
      body: (
        <>
          <p>
            {SITE_NAME} is provided as it is. It tells you what a file appears to be, and it can be
            wrong: a file crafted to mislead a parser will mislead this one too. It is not a virus
            scanner and identifying a file is not a verdict on whether it is safe. You decide what
            to open and what to do about what you find.
          </p>
          <p>
            To the extent the law allows, {SITE_OPERATOR} is not liable for loss or damage arising
            from using the site or the application, including anything you concluded from what
            either of them showed you.
          </p>
        </>
      )
    },
    {
      id: "terms-changes",
      title: "Changes, and where this is settled",
      body: (
        <>
          <p>
            These terms can change; the date above says when they last did, and continuing to use
            the site means accepting the version published here. They are governed by the law of{" "}
            {SITE_JURISDICTION}.
          </p>
          <p>
            Questions go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through the{" "}
            <Link to={ROUTES.CONTACT}>contact page</Link>.
          </p>
        </>
      )
    }
  ];

  return (
    <article className="page">
      <p className="page_eyebrow fa_eyebrow">Policy</p>
      <h1 className="page_title">Terms</h1>
      <PolicyDraftNotice />
      <p className="page_lead">
        The arrangement between you and {SITE_OPERATOR} for this site and for {PRODUCT_NAME}.
      </p>
      <p className="page_meta">
        <Icon name="calendar" size="1em" />
        Last updated {POLICY_UPDATED}
      </p>

      <div className="page_layout">
        <TableOfContents
          label="Sections of the terms page"
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
