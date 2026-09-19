/**
 * The consent box. It asks once; CookiesManager holds the answer and gates
 * every non-necessary cookie on it.
 *
 * Built on the native <dialog> rather than a positioned div, because a centred
 * box over the page is a modal dialog and the element already is one: it traps
 * focus, makes the rest of the page inert, renders above everything without a
 * z-index argument, and brings its own backdrop.
 *
 * Escape is deliberately refused. The two buttons are the only ways out,
 * because dismissing this without answering would leave the question open and
 * the box would simply come back.
 */

import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import * as CookiesManager from "../../core/CookiesManager";
import { ROUTES } from "../../Routing";
import { setGlobal } from "../../core/Globals";
import "./cookieconsent.css";

const className = "cookieconsent";

export default function CookieConsent() {
  const [answered, setAnswered] = useState(() => CookiesManager.consent() !== null);
  const ref = useRef<HTMLDialogElement>(null);
  const reading = useLocation().pathname === ROUTES.PRIVACY;

  /* A modal dialog has to be opened imperatively; the open attribute alone
     gives a non-modal one, with no focus trap and no backdrop.

     It steps aside on the privacy page, which is the one page the question
     itself sends people to, and asks again everywhere else until answered. */
  useEffect(() => {
    if (answered) return;
    if (reading) ref.current?.close();
    else ref.current?.showModal();
  }, [answered, reading]);

  if (answered) return null;

  function answer(choice: CookiesManager.ConsentAnswer) {
    CookiesManager.answerConsent(choice);
    setGlobal("cookieConsentAnswered", true);
    ref.current?.close();
    setAnswered(true);
  }

  return (
    <dialog
      className={className}
      ref={ref}
      aria-labelledby="cookieconsent-title"
      onCancel={(event: SyntheticEvent) => event.preventDefault()}
    >
      <h2 className={`${className}_title`} id="cookieconsent-title">
        Cookies
      </h2>

      <p className={`${className}_text`}>
        This site stores nothing beyond your answer to this question. Anything we add later — a
        preference, a measurement — is held to that answer.
      </p>

      <p className={`${className}_text`}>
        <Link className={`${className}_link`} to={ROUTES.PRIVACY}>
          What is stored, in full
        </Link>
      </p>

      <div className={`${className}_actions`}>
        <button
          className={`fa_button fa_button-primary ${className}_button`}
          type="button"
          /* The first thing focused when the box opens. */
          autoFocus
          onClick={() => answer("accepted")}
        >
          Accept
        </button>
        <button
          className={`fa_button ${className}_button`}
          type="button"
          onClick={() => answer("declined")}
        >
          Decline
        </button>
      </div>
    </dialog>
  );
}
