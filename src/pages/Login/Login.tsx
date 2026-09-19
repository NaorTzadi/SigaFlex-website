/**
 * Signing in.
 *
 * The server tells a wrong password, an unknown address and a locked account
 * apart internally and returns the same 401 for all three, so this page says one
 * thing for all three too. Guessing which it was would hand an attacker the list
 * of who has an account here.
 *
 * On success the reader goes wherever they were headed before they were sent
 * here, or home.
 */

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import * as ServerBridge from "../../core/ServerBridge";
import { cx, isEmail } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  /* The password was right but the address was never confirmed: the only page
     that can offer another link, since this reader cannot get a session. */
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resent, setResent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const problemRef = useRef<HTMLParagraphElement>(null);

  /* A refusal is announced and focused, or a reader who tabbed away never
     learns why nothing happened. */
  useEffect(() => {
    if (problem) problemRef.current?.focus();
  }, [problem]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setProblem("");
    setUnconfirmed(false);
    setResent(false);

    if (!isEmail(email)) {
      setProblem("Enter your e-mail address.");
      return;
    }
    if (!password) {
      setProblem("Enter your password.");
      return;
    }

    if (!ServerBridge.isConfigured()) {
      setProblem("No server is configured for this site yet.");
      return;
    }

    setBusy(true);
    try {
      await ServerBridge.login({ email: email.trim(), password });
      const wanted = (location.state as { from?: string } | null)?.from;
      navigate(wanted ?? ROUTES.HOME, { replace: true });
    } catch (error) {
      if (error instanceof ServerBridge.ServerError && error.status === 401) {
        /* One sentence for every refusal the server can give. */
        setProblem("That e-mail address and password do not match an account.");
      } else if (error instanceof ServerBridge.ServerError && error.status === 403) {
        /* The server owns the wording; the page only adds the way out. */
        setProblem(error.message);
        setUnconfirmed(true);
      } else if (error instanceof ServerBridge.ServerError && error.status === 423) {
        /* The server owns the wait, so it words the sentence. */
        setProblem(error.message);
      } else {
        setProblem("The server could not be reached. Try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    try {
      await ServerBridge.resendConfirmation(email);
      setResent(true);
    } catch {
      setProblem("The server could not be reached. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="page_title">Sign in</h1>
      <p className="page_lead">This account is for the site. The application never asks you to sign in.</p>

      <form className="account_card" onSubmit={submit} noValidate>
        <p className="account_error" ref={problemRef} tabIndex={-1} role="alert">
          {problem && (
            <>
              <Icon name="warning" size="1em" />
              {problem}
            </>
          )}
        </p>

        {unconfirmed && (
          <p className="account_note">
            <Icon name="mail" size="1em" />
            {resent ? (
              "Sent. The link expires in 24 hours."
            ) : (
              <button
                className="fa_button fa_button-small"
                type="button"
                disabled={busy}
                onClick={() => void resend()}
              >
                Resend confirmation email
              </button>
            )}
          </p>
        )}

        <div className="account_field">
          <label className="account_label" htmlFor="login-email">
            E-mail address
          </label>
          <input
            className={cx("account_input", problem && "account_input-invalid")}
            id="login-email"
            type="email"
            value={email}
            autoComplete="email"
            aria-invalid={Boolean(problem)}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="account_field">
          <div className="account_field_head">
            <label className="account_label" htmlFor="login-password">
              Password
            </label>
            <button
              className="account_reveal"
              type="button"
              aria-label={revealed ? "Hide password" : "Show password"}
              aria-pressed={revealed}
              aria-controls="login-password"
              onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
            >
              <Icon name={revealed ? "eyeOff" : "eye"} size="1.25em" />
            </button>
          </div>
          <input
            className={cx("account_input", problem && "account_input-invalid")}
            id="login-password"
            type={revealed ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            aria-invalid={Boolean(problem)}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          className="fa_button fa_button-primary account_submit"
          type="submit"
          disabled={busy}
        >
          {busy && <span className="fa_spinner" aria-hidden="true" />}
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <p className="account_links">
          <Link to={ROUTES.PASSWORD}>Forgot your password?</Link>
        </p>
      </form>
    </>
  );
}
