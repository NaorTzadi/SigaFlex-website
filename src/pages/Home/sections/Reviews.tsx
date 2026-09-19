import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/Icon/Icon";
import {
  HOME_SECTIONS,
  REVIEW_BODY_MAX_LENGTH,
  REVIEW_NAME_MAX_LENGTH,
  REVIEW_RATINGS
} from "../../../core/Constants";
import { useGlobal } from "../../../core/Globals";
import * as ServerBridge from "../../../core/ServerBridge";
import type { Review } from "../../../core/ServerBridge";
import { cx } from "../../../core/Utility";
import { ROUTES } from "../../../Routing";
import "./reviews.css";

const className = "reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className={`${className}_stars`}>
      <span aria-hidden="true">{"★".repeat(rating) + "☆".repeat(5 - rating)}</span>
      <span className={`${className}_hidden`}>{`${rating} out of 5`}</span>
    </span>
  );
}

function dateOf(stamp: string): string {
  return new Date(stamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function nameFrom(email: string): string {
  return email.split("@")[0].slice(0, REVIEW_NAME_MAX_LENGTH);
}

type Draft = { displayName: string; rating: number; body: string };

/*
 * Signing in leaves the page, and coming back mounts this section again, so a
 * review written before the prompt would be gone by the time it is posted. The
 * draft rides out that round trip in the tab's own storage and is dropped the
 * moment it becomes a review.
 */
const DRAFT_KEY = "file-analyzer.review-draft";

function readDraft(): Draft | null {
  try {
    const stored = sessionStorage.getItem(DRAFT_KEY);
    if (!stored) return null;

    const draft = JSON.parse(stored) as Draft;
    return typeof draft?.displayName === "string" &&
      typeof draft?.rating === "number" &&
      typeof draft?.body === "string"
      ? draft
      : null;
  } catch {
    return null;
  }
}

function keepDraft(draft: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* Private windows and blocked storage: the draft is a convenience, not the review. */
  }
}

function dropDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* Nothing to drop if it could never be stored. */
  }
}

export default function Reviews() {
  const signedIn = useGlobal("signedIn");
  const accountEmail = useGlobal("accountEmail");

  const [written, setWritten] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [problem, setProblem] = useState<{ text: string; signIn?: boolean } | null>(null);
  const [outcome, setOutcome] = useState("");
  const [removing, setRemoving] = useState(false);
  const [busy, setBusy] = useState(false);

  const fieldId = useId();
  const problemRef = useRef<HTMLParagraphElement>(null);
  /* Read at render, not at module level: Routing imports this section, so ROUTES
     is still being initialised while this file is evaluated. */
  const backHere = `${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}`;
  const mine = written.some((review) => review.mine);
  const average =
    written.length === 0
      ? 0
      : written.reduce((total, review) => total + review.rating, 0) / written.length;

  useEffect(() => {
    /* Before the server is asked anything: a draft waiting from before a sign-in
       is restored whether or not the request that follows succeeds. */
    const draft = readDraft();
    if (draft) {
      setDisplayName(draft.displayName);
      setRating(draft.rating);
      setBody(draft.body);
    }

    if (!ServerBridge.isConfigured()) {
      setLoaded(true);
      return;
    }

    let current = true;

    ServerBridge.reviews()
      .then((all) => {
        if (!current) return;
        setWritten(all);

        /* A draft is what they were writing a moment ago and the stored review is
           older, so the draft wins: posting replaces the review anyway. */
        const own = all.find((review) => review.mine);
        if (!own || draft) return;

        setDisplayName(own.displayName);
        setRating(own.rating);
        setBody(own.body);
      })
      .catch(() => undefined)
      .finally(() => {
        if (current) setLoaded(true);
      });

    return () => {
      current = false;
    };
  }, [signedIn]);

  useEffect(() => {
    if (signedIn && !displayName && accountEmail) setDisplayName(nameFrom(accountEmail));
  }, [signedIn, accountEmail, displayName]);

  /* The button is at the foot of the form and the answer is at its head, so the
     answer takes focus rather than waiting to be noticed. */
  useEffect(() => {
    if (problem) problemRef.current?.focus();
  }, [problem]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setProblem(null);
    setOutcome("");
    setRemoving(false);

    if (!displayName.trim()) {
      setProblem({ text: "Enter the name to show with your review." });
      return;
    }
    if (rating === 0) {
      setProblem({ text: "Choose a rating." });
      return;
    }
    if (!body.trim()) {
      setProblem({ text: "Write a few words." });
      return;
    }

    /* Anyone may write one. The account is asked for at the end, once there is
       something to post, and what they wrote waits for them. */
    if (!signedIn) {
      keepDraft({ displayName: displayName.trim(), rating, body: body.trim() });
      setProblem({ text: "Posting needs an account. What you wrote is kept.", signIn: true });
      return;
    }

    setBusy(true);
    try {
      const stored = await ServerBridge.submitReview({
        displayName: displayName.trim(),
        rating,
        body: body.trim()
      });
      setWritten((all) => [stored, ...all.filter((review) => review.id !== stored.id)]);
      setOutcome(mine ? "Your review is updated." : "Your review is posted.");
      dropDraft();
    } catch (error) {
      if (error instanceof ServerBridge.ServerError && error.status === 401) {
        keepDraft({ displayName: displayName.trim(), rating, body: body.trim() });
        setProblem({ text: "Your session has ended. What you wrote is kept.", signIn: true });
      } else {
        setProblem({ text: "The review could not be saved. Try again in a moment." });
      }
    } finally {
      setBusy(false);
    }
  }

  async function withdraw() {
    setProblem(null);
    setOutcome("");
    setBusy(true);
    try {
      await ServerBridge.withdrawReview();
      setWritten((all) => all.filter((review) => !review.mine));
      setRating(0);
      setBody("");
      setRemoving(false);
      setOutcome("Your review is removed.");
    } catch {
      setProblem({ text: "The review could not be removed. Try again in a moment." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      {written.length > 0 && (
        <p className={`${className}_summary`}>
          <Stars rating={Math.round(average)} />
          <strong className={`${className}_average`}>{average.toFixed(1)}</strong>
          <span className={`${className}_count`}>
            {written.length === 1 ? "1 review" : `${written.length} reviews`}
          </span>
        </p>
      )}

      {!ServerBridge.isConfigured() ? (
        <p className={`${className}_note`}>
          <Icon name="info" size="1em" />
          Reviews are not available until this site is connected to its server.
        </p>
      ) : (
        <form className={`${className}_form`} onSubmit={submit} noValidate>
          <p
            className={cx(`${className}_error`, problem?.signIn && `${className}_error-ask`)}
            ref={problemRef}
            tabIndex={-1}
            role="alert"
          >
            {problem && (
              <>
                <Icon name={problem.signIn ? "info" : "warning"} size="1em" />
                <span>
                  {problem.text}{" "}
                  {problem.signIn && (
                    <>
                      <Link to={ROUTES.LOGIN} state={{ from: backHere }}>
                        Sign in
                      </Link>
                      {" or "}
                      <Link to={ROUTES.REGISTER} state={{ from: backHere }}>
                        create an account
                      </Link>
                      .
                    </>
                  )}
                </span>
              </>
            )}
          </p>

          <div className={`${className}_field`}>
            <label className={`${className}_label`} htmlFor={`${fieldId}-name`}>
              Shown as
            </label>
            <input
              className={`${className}_input`}
              id={`${fieldId}-name`}
              type="text"
              value={displayName}
              maxLength={REVIEW_NAME_MAX_LENGTH}
              autoComplete="nickname"
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </div>

          <fieldset className={`${className}_field ${className}_rating`}>
            <legend className={`${className}_label`}>Rating</legend>
            <div className={`${className}_rating_row`}>
              {REVIEW_RATINGS.map((value) => (
                <label className={cx(`${className}_star`, value <= rating && `${className}_star-on`)} key={value}>
                  <input
                    className={`${className}_hidden`}
                    type="radio"
                    name={`${fieldId}-rating`}
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <span aria-hidden="true">★</span>
                  <span className={`${className}_hidden`}>{value === 1 ? "1 star" : `${value} stars`}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`${className}_field`}>
            <label className={`${className}_label`} htmlFor={`${fieldId}-body`}>
              Your review
            </label>
            <textarea
              className={`${className}_input ${className}_body`}
              id={`${fieldId}-body`}
              value={body}
              rows={5}
              maxLength={REVIEW_BODY_MAX_LENGTH}
              onChange={(event) => setBody(event.target.value)}
            />
            <p
              className={cx(
                `${className}_hint`,
                body.length > REVIEW_BODY_MAX_LENGTH - 100 && `${className}_hint-near`
              )}
            >
              {`${body.length} of ${REVIEW_BODY_MAX_LENGTH} characters. One review per account: posting again replaces the one you left.`}
            </p>
          </div>

          <div className={`${className}_actions`}>
            <button className="fa_button fa_button-primary" type="submit" disabled={busy}>
              {busy && <span className="fa_spinner" aria-hidden="true" />}
              {busy ? (mine ? "Updating…" : "Posting…") : mine ? "Update review" : "Post review"}
            </button>
            {mine && !removing && (
              <button
                className="fa_button"
                type="button"
                disabled={busy}
                onClick={() => setRemoving(true)}
              >
                Remove
              </button>
            )}
          </div>

          {/* Withdrawing cannot be undone, so it is asked rather than done. */}
          {mine && removing && (
            <div className={`${className}_confirm`} role="group" aria-label="Remove your review">
              <p className={`${className}_confirm_text`}>
                <Icon name="warning" size="1em" />
                Remove your review? This cannot be undone.
              </p>
              <div className={`${className}_actions`}>
                <button
                  className={`fa_button fa_button-small ${className}_confirm_yes`}
                  type="button"
                  disabled={busy}
                  onClick={() => void withdraw()}
                >
                  {busy && <span className="fa_spinner" aria-hidden="true" />}
                  {busy ? "Removing…" : "Remove it"}
                </button>
                <button
                  className="fa_button fa_button-small"
                  type="button"
                  disabled={busy}
                  onClick={() => setRemoving(false)}
                >
                  Keep it
                </button>
              </div>
            </div>
          )}

          {/* What happened, once it has: spoken, and left in place to be read. */}
          <p className={`${className}_outcome`} role="status" aria-live="polite">
            {outcome && (
              <>
                <Icon name="success" size="1em" />
                {outcome}
              </>
            )}
          </p>
        </form>
      )}

      {!loaded && (
        <p className={`fa_loading ${className}_loading`}>
          <span className="fa_spinner" aria-hidden="true" />
          Loading reviews…
        </p>
      )}

      {loaded && written.length === 0 && ServerBridge.isConfigured() && (
        <div className={`${className}_empty`}>
          <Icon className={`${className}_empty_glyph`} name="clipboard" size="1.75em" />
          <p className={`${className}_empty_title`}>No reviews yet</p>
          <p className={`${className}_empty_body`}>
            Yours would be the first. Say what it got right, and what it did not.
          </p>
        </div>
      )}

      {loaded && written.length > 0 && (
        <ul className={`${className}_list`}>
          {written.map((review) => (
            <li className={cx(`${className}_item`, review.mine && `${className}_item-mine`)} key={review.id}>
              <p className={`${className}_head`}>
                <Stars rating={review.rating} />
                <span className={`${className}_name`}>{review.displayName}</span>
                <span className={`${className}_date`}>{dateOf(review.createdAt)}</span>
                {review.mine && <span className={`${className}_badge`}>Yours</span>}
              </p>
              <p className={`${className}_text`}>{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
