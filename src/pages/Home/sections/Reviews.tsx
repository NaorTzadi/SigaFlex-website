import { useEffect, useId, useState } from "react";
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
  return new Date(stamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function nameFrom(email: string): string {
  return email.split("@")[0].slice(0, REVIEW_NAME_MAX_LENGTH);
}

export default function Reviews() {
  const signedIn = useGlobal("signedIn");
  const accountEmail = useGlobal("accountEmail");

  const [written, setWritten] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);

  const fieldId = useId();
  const mine = written.some((review) => review.mine);
  const average =
    written.length === 0
      ? 0
      : written.reduce((total, review) => total + review.rating, 0) / written.length;

  useEffect(() => {
    if (!ServerBridge.isConfigured()) {
      setLoaded(true);
      return;
    }

    let current = true;

    ServerBridge.reviews()
      .then((all) => {
        if (!current) return;
        setWritten(all);

        const own = all.find((review) => review.mine);
        if (!own) return;
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

  async function submit(event: FormEvent) {
    event.preventDefault();
    setProblem("");

    if (!displayName.trim()) {
      setProblem("Enter the name to show with your review.");
      return;
    }
    if (rating === 0) {
      setProblem("Choose a rating.");
      return;
    }
    if (!body.trim()) {
      setProblem("Write a few words.");
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
    } catch (error) {
      setProblem(
        error instanceof ServerBridge.ServerError && error.status === 401
          ? "Your session has ended. Sign in again to leave a review."
          : "The review could not be saved. Try again in a moment."
      );
    } finally {
      setBusy(false);
    }
  }

  async function withdraw() {
    setProblem("");
    setBusy(true);
    try {
      await ServerBridge.withdrawReview();
      setWritten((all) => all.filter((review) => !review.mine));
      setRating(0);
      setBody("");
    } catch {
      setProblem("The review could not be removed. Try again in a moment.");
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
      ) : signedIn ? (
        <form className={`${className}_form`} onSubmit={submit} noValidate>
          <p className={`${className}_error`} role="alert">
            {problem && (
              <>
                <Icon name="warning" size="1em" />
                {problem}
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
            <p className={`${className}_hint`}>
              {`${body.length} of ${REVIEW_BODY_MAX_LENGTH} characters. One review per account: posting again replaces the one you left.`}
            </p>
          </div>

          <div className={`${className}_actions`}>
            <button className="fa_button fa_button-primary" type="submit" disabled={busy}>
              {mine ? "Update review" : "Post review"}
            </button>
            {mine && (
              <button className="fa_button" type="button" disabled={busy} onClick={withdraw}>
                Remove
              </button>
            )}
          </div>
        </form>
      ) : (
        <p className={`${className}_note`}>
          <Icon name="info" size="1em" />
          <span>
            <Link to={ROUTES.LOGIN} state={{ from: `${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}` }}>
              Sign in
            </Link>
            {" to leave a review, or "}
            <Link to={ROUTES.REGISTER}>create an account</Link>.
          </span>
        </p>
      )}

      {loaded && written.length === 0 ? (
        <p className={`${className}_empty`}>No reviews yet.</p>
      ) : (
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
