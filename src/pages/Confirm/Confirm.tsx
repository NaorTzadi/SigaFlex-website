/**
 * Where a confirmation link lands.
 *
 * It spends the token once, on arrival, and says which of the three things
 * happened: confirmed, no token at all, or a link that has already been used or
 * has run out. A link followed twice is the ordinary case -- mail clients
 * prefetch, people click again -- so it gets a sentence of its own rather than
 * looking like a failure.
 */

import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import * as ServerBridge from "../../core/ServerBridge";
import { cx } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";
import "./confirm.css";

const className = "confirm";

type State = "working" | "confirmed" | "spent" | "missing" | "unreachable";

const MESSAGE: Record<Exclude<State, "working">, string> = {
  confirmed: "Your address is confirmed. You can sign in.",
  spent: "That link has already been used or expired. Sign in to get a new one.",
  missing: "That link is incomplete: it carries no confirmation token.",
  unreachable: "The server could not be reached. Try the link again in a moment."
};

export default function Confirm() {
  const [params] = useSearchParams();
  const [state, setState] = useState<State>("working");
  /** Bumped by the retry button, which is the only thing that spends the token twice. */
  const [attempt, setAttempt] = useState(0);
  const announceRef = useRef<HTMLDivElement>(null);

  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setState("missing");
      return;
    }

    let current = true;
    ServerBridge.confirmEmail(token)
      .then((accepted) => {
        if (current) setState(accepted ? "confirmed" : "spent");
      })
      .catch(() => {
        if (current) setState("unreachable");
      });

    /* The token is spent server-side; a second run of this effect would report
       "already used" for a link that just worked. */
    return () => {
      current = false;
    };
  }, [token, attempt]);

  useEffect(() => {
    if (state !== "working") announceRef.current?.focus();
  }, [state]);

  const good = state === "confirmed";

  function retry() {
    setState("working");
    setAttempt((made) => made + 1);
  }

  return (
    <article className="page account_page">
      <p className="account_eyebrow fa_eyebrow">Account</p>
      <h1 className="page_title">{state === "working" ? "Confirming…" : good ? "Confirmed" : "Not confirmed"}</h1>

      {state === "working" && (
        <p className="fa_loading account_loading">
          <span className="fa_spinner" aria-hidden="true" />
          Checking your link…
        </p>
      )}

      {state !== "working" && (
        <div
          className={cx("account_card", `${className}_outcome`)}
          ref={announceRef}
          tabIndex={-1}
          role="status"
        >
          <Icon
            className={cx(`${className}_mark`, good ? `${className}_mark-good` : `${className}_mark-bad`)}
            name={good ? "success" : "warning"}
            size="2.5em"
          />
          <p className={`${className}_message`}>{MESSAGE[state]}</p>

          {/* Every outcome leaves with something to press. An unreachable
              server in particular is not a dead end: the same link can be
              spent again once it answers. */}
          <div className={`${className}_actions`}>
            {state === "unreachable" ? (
              <button className="fa_button fa_button-primary" type="button" onClick={retry}>
                Try again
              </button>
            ) : (
              <Link className="fa_button fa_button-primary" to={ROUTES.LOGIN}>
                Sign in
              </Link>
            )}
            <Link className="fa_button" to={ROUTES.HOME}>
              Back to the home page
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
