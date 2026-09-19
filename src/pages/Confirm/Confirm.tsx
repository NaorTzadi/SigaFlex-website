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

type State = "working" | "confirmed" | "spent" | "missing" | "unreachable";

const MESSAGE: Record<Exclude<State, "working">, string> = {
  confirmed: "Your address is confirmed. You can sign in.",
  spent: "That link has already been used, or it has run out. Signing in will offer a new one.",
  missing: "That address is incomplete: there is no confirmation token in it.",
  unreachable: "The server could not be reached. Try the link again in a moment."
};

export default function Confirm() {
  const [params] = useSearchParams();
  const [state, setState] = useState<State>("working");
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
  }, [token]);

  useEffect(() => {
    if (state !== "working") announceRef.current?.focus();
  }, [state]);

  const good = state === "confirmed";

  return (
    <article className="page account">
      <p className="account_eyebrow fa_eyebrow">Account</p>
      <h1 className="page_title">{state === "working" ? "Confirming…" : good ? "Confirmed" : "Not confirmed"}</h1>

      {state !== "working" && (
        <>
          <div
            className={cx("account_card", "account_outcome", good ? "account_outcome-good" : "account_outcome-bad")}
            ref={announceRef}
            tabIndex={-1}
            role="status"
          >
            <Icon name={good ? "success" : "warning"} size="1.5em" />
            <span>{MESSAGE[state]}</span>
          </div>

          <p className="account_links">
            <Link to={ROUTES.LOGIN}>Sign in</Link>
            <Link to={ROUTES.HOME}>Back to the home page</Link>
          </p>
        </>
      )}
    </article>
  );
}
