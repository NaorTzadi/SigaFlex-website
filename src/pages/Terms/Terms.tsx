import { Link } from "react-router-dom";

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
  return (
    <article className="page">
      <h1 className="page_title">Terms</h1>
      <p className="page_lead">
        The arrangement between you and {SITE_OPERATOR} for this site and for {PRODUCT_NAME}.
      </p>
      <p className="page_external_note">Last updated {POLICY_UPDATED}.</p>

      <section className="page_block" aria-labelledby="terms-scope">
        <h2 className="page_block_title" id="terms-scope">
          What these cover
        </h2>
        <p>
          Using this site means accepting what is written here. An account is for the site only —
          the application never asks you to sign in, and everything it does works without one. What
          is stored about you is set out in the <Link to={ROUTES.PRIVACY}>privacy</Link> page.
        </p>
      </section>

      <section className="page_block" aria-labelledby="terms-account">
        <h2 className="page_block_title" id="terms-account">
          Your account
        </h2>
        <p>
          Register with an address you control, keep the password to yourself, and tell us if you
          believe someone else is using the account. One person, one account. An account whose
          address is never confirmed, or which is used to attack the site, can be closed.
        </p>
      </section>

      <section className="page_block" aria-labelledby="terms-reviews">
        <h2 className="page_block_title" id="terms-reviews">
          Reviews
        </h2>
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
      </section>

      <section className="page_block" aria-labelledby="terms-use">
        <h2 className="page_block_title" id="terms-use">
          Using the site
        </h2>
        <p>
          Read it, download from it, link to it. Do not try to break into it, flood it with
          requests, or work around the measures that stop either. The server counts what arrives,
          turns away what it does not like and blocks an address that keeps at it.
        </p>
      </section>

      <section className="page_block" aria-labelledby="terms-software">
        <h2 className="page_block_title" id="terms-software">
          The software
        </h2>
        <p>
          {PRODUCT_NAME} is licensed to you for your own use, not sold. Components distributed with
          it carry their own licences, which travel with the application and are published on the{" "}
          <Link to={ROUTES.LICENSES}>third-party licences</Link> page; where one of those licences
          gives you more than these terms do, it wins for that component.
        </p>
      </section>

      <section className="page_block" aria-labelledby="terms-warranty">
        <h2 className="page_block_title" id="terms-warranty">
          No warranty
        </h2>
        <p>
          {SITE_NAME} is provided as it is. It tells you what a file appears to be, and it can be
          wrong: a file crafted to mislead a parser will mislead this one too. It is not a virus
          scanner and identifying a file is not a verdict on whether it is safe. You decide what to
          open and what to do about what you find.
        </p>
        <p>
          To the extent the law allows, {SITE_OPERATOR} is not liable for loss or damage arising
          from using the site or the application, including anything you concluded from what either
          of them showed you.
        </p>
      </section>

      <section className="page_block" aria-labelledby="terms-changes">
        <h2 className="page_block_title" id="terms-changes">
          Changes, and where this is settled
        </h2>
        <p>
          These terms can change; the date above says when they last did, and continuing to use the
          site means accepting the version published here. They are governed by the law of{" "}
          {SITE_JURISDICTION}.
        </p>
        <p>
          Questions go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through the{" "}
          <Link to={ROUTES.CONTACT}>contact page</Link>.
        </p>
      </section>
    </article>
  );
}
