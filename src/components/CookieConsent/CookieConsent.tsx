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

import * as CookiesManager from "../../core/CookiesManager";
import { setGlobal } from "../../core/Globals";
import "./cookieconsent.css";

export default function CookieConsent() {
  const [answered, setAnswered] = useState(() => CookiesManager.consent() !== null);
  const ref = useRef<HTMLDialogElement>(null);

  /* A modal dialog has to be opened imperatively; the open attribute alone
     gives a non-modal one, with no focus trap and no backdrop. */
  useEffect(() => {
    if (!answered) ref.current?.showModal();
  }, [answered]);

  if (answered) return null;

  function answer(choice: CookiesManager.ConsentAnswer) {
    CookiesManager.answerConsent(choice);
    setGlobal("cookieConsentAnswered", true);
    ref.current?.close();
    setAnswered(true);
  }

  return (
    <dialog
      className="cookieconsent"
      ref={ref}
      aria-labelledby="cookieconsent-title"
      onCancel={(event: SyntheticEvent) => event.preventDefault()}
    >
      <h2 className="cookieconsent_title" id="cookieconsent-title">
        Cookies
      </h2>

      <p className="cookieconsent_text">
        This site stores a cookie to remember your theme. Nothing else is kept, and nothing is
        shared.
      </p>

      <div className="cookieconsent_actions">
        <button
          className="cookieconsent_button cookieconsent_button-accept"
          type="button"
          /* The first thing focused when the box opens. */
          autoFocus
          onClick={() => answer("accepted")}
        >
          Accept
        </button>
        <button className="cookieconsent_button" type="button" onClick={() => answer("declined")}>
          Decline
        </button>
      </div>
    </dialog>
  );
}
