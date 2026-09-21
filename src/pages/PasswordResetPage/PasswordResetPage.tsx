/**
 * Both halves of recovering a password, on one route.
 *
 * Without a token in the query it asks for an address and sends a link. With
 * one, it takes the new password. They are two steps of one job separated by a
 * mail, and splitting them into two pages would duplicate the whole form to
 * change which field it holds.
 *
 * Asking for a link always reports the same thing, whether or not that address
 * has an account. "We have sent you a link" and "no such account" are the same
 * question asked twice, and the second answer is a list of who to attack.
 */

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { PASSWORD_MIN_LENGTH } from "../../core/Constants";
import * as ServerBridge from "../../core/ServerBridge";
import { cx, isEmail } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";

type Outcome = { good: boolean; message: string };

export default function PasswordResetPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [problem, setProblem] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [busy, setBusy] = useState(false);

  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outcome) announceRef.current?.focus();
  }, [outcome]);

  async function askForLink(event: FormEvent) {
    event.preventDefault();
    setProblem("");

    if (!isEmail(email)) {
      setProblem("Enter your e-mail address.");
      return;
    }
    if (!ServerBridge.isConfigured()) {
      setProblem("No server is configured for this site yet.");
      return;
    }

    setBusy(true);
    try {
      await ServerBridge.requestPasswordReset(email.trim());
      setOutcome({
        good: true,
        message:
          "If that address has an account, a link is on its way. It expires in 30 minutes."
      });
    } catch {
      setProblem("The server could not be reached. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  async function setNewPassword(event: FormEvent) {
    event.preventDefault();
    setProblem("");

    if (password.length < PASSWORD_MIN_LENGTH) {
      setProblem(`Use at least ${PASSWORD_MIN_LENGTH} characters.`);
      return;
    }

    setBusy(true);
    try {
      const accepted = await ServerBridge.resetPassword(token!, password);
      setOutcome(
        accepted
          ? { good: true, message: "Your password is changed, and every signed-in device was signed out." }
          : { good: false, message: "That link has expired or has already been used. Ask for another." }
      );
    } catch (error) {
      if (error instanceof ServerBridge.ServerError && error.status === 422) {
        setProblem(error.message);
      } else {
        setProblem("The server could not be reached. Try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (outcome) {
    return (
      <article className="page account_page">
        <p className="account_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">{outcome.good ? "Done" : "That link is no good"}</h1>
        <div
          className={cx("account_card", "account_outcome", outcome.good ? "account_outcome-good" : "account_outcome-bad")}
          ref={announceRef}
          tabIndex={-1}
          role="status"
        >
          <Icon name={outcome.good ? "success" : "warning"} size="1.5em" />
          <span>{outcome.message}</span>
        </div>
        <p className="account_links">
          <Link to={ROUTES.LOGIN}>Sign in</Link>
          {!outcome.good && <Link to={ROUTES.PASSWORD}>Ask for a new link</Link>}
        </p>
      </article>
    );
  }

  return (
    <article className="page account_page">
      <p className="account_eyebrow fa_eyebrow">Account</p>
      <h1 className="page_title">{token ? "Choose a new password" : "Reset your password"}</h1>
      <p className="page_lead">
        {token
          ? "Every device signed in with the old password will be signed out."
          : "We will e-mail you a link."}
      </p>

      <form className="account_card" onSubmit={token ? setNewPassword : askForLink} noValidate>
        <p className="account_error" role="alert">
          {problem && (
            <>
              <Icon name="warning" size="1em" />
              {problem}
            </>
          )}
        </p>

        {token ? (
          <div className="account_field">
            <div className="account_field_head">
              <label className="account_label" htmlFor="password-new">
                New password
              </label>
              <button
                className="account_reveal"
                type="button"
                aria-label={revealed ? "Hide password" : "Show password"}
                aria-pressed={revealed}
                aria-controls="password-new"
                onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
              >
                <Icon name={revealed ? "eyeOff" : "eye"} size="1.25em" />
              </button>
            </div>
            <p className="account_hint" id="password-new-hint">
              At least {PASSWORD_MIN_LENGTH} characters.
            </p>
            <input
              className={cx("account_input", problem && "account_input-invalid")}
              id="password-new"
              type={revealed ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              aria-describedby="password-new-hint"
              aria-invalid={Boolean(problem)}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        ) : (
          <div className="account_field">
            <label className="account_label" htmlFor="password-email">
              E-mail address
            </label>
            <input
              className={cx("account_input", problem && "account_input-invalid")}
              id="password-email"
              type="email"
              value={email}
              autoComplete="email"
              aria-invalid={Boolean(problem)}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        )}

        <button
          className="fa_button fa_button-primary account_submit"
          type="submit"
          disabled={busy}
        >
          {busy && <span className="fa_spinner" aria-hidden="true" />}
          {busy ? "Working…" : token ? "Set password" : "Send"}
        </button>

        {token ? (
          <p className="account_note">
            <Icon name="info" size="0.875em" />
            This link works once.
          </p>
        ) : (
          <p className="account_links">
            <Link to={ROUTES.LOGIN}>Back to sign in</Link>
          </p>
        )}
      </form>
    </article>
  );
}
