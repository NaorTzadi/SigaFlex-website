import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { HOME_SECTIONS, PASSWORD_MIN_LENGTH, PRODUCT_NAME } from "../../core/Constants";
import * as ServerBridge from "../../core/ServerBridge";
import { cx, isEmail } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";
import "./profile.css";

const className = "profile";

type Note = { good: boolean; message: string } | null;

function dateOf(stamp: string | null): string {
  if (!stamp) return "never";
  return new Date(stamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function initialOf(email: string): string {
  return (email.trim()[0] ?? "?").toUpperCase();
}

function messageFor(error: unknown, refused: string): string {
  if (error instanceof ServerBridge.ServerError) {
    if (error.status === 401) return refused;
    if (error.status === 409) return "That address already has an account.";
    if (error.status === 422) return error.message;
  }
  return "The server could not be reached. Try again in a moment.";
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  const id = `profile-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className={`${className}_block`} aria-labelledby={id}>
      <h2 className={`${className}_block_title`} id={id}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Notice({ note }: { note: Note }) {
  if (!note) return null;

  return (
    <p
      className={cx(`${className}_note`, note.good ? `${className}_note-good` : `${className}_note-bad`)}
      role={note.good ? "status" : "alert"}
    >
      <Icon name={note.good ? "success" : "warning"} size="1em" />
      {note.message}
    </p>
  );
}

export default function Profile() {
  const [account, setAccount] = useState<ServerBridge.Account | null>(null);
  const [review, setReview] = useState<ServerBridge.Review | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailNote, setEmailNote] = useState<Note>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [passwordNote, setPasswordNote] = useState<Note>(null);

  const [confirmNote, setConfirmNote] = useState<Note>(null);
  const [reviewNote, setReviewNote] = useState<Note>(null);
  const [sessionsNote, setSessionsNote] = useState<Note>(null);

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteAsked, setDeleteAsked] = useState(false);
  const [deleteNote, setDeleteNote] = useState<Note>(null);

  const [busy, setBusy] = useState("");
  const deleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let current = true;

    Promise.all([
      ServerBridge.currentAccount(),
      ServerBridge.myReview().catch(() => null)
    ])
      .then(([held, mine]) => {
        if (!current) return;
        setAccount(held);
        setReview(mine);
      })
      .catch(() => undefined)
      .finally(() => {
        if (current) setLoaded(true);
      });

    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (deleteAsked) deleteRef.current?.focus();
  }, [deleteAsked]);

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    setEmailNote(null);

    if (!isEmail(newEmail)) {
      setEmailNote({ good: false, message: "Enter the new address." });
      return;
    }
    if (!emailPassword) {
      setEmailNote({ good: false, message: "Enter your current password." });
      return;
    }

    setBusy("email");
    try {
      await ServerBridge.changeEmail(emailPassword, newEmail.trim());
      setAccount(await ServerBridge.currentAccount());
      setNewEmail("");
      setEmailPassword("");
      setEmailNote({
        good: true,
        message: "A confirmation link is on its way to the new address. The old one stays until it is followed."
      });
    } catch (error) {
      setEmailNote({ good: false, message: messageFor(error, "That password did not match.") });
    } finally {
      setBusy("");
    }
  }

  async function submitPassword(event: FormEvent) {
    event.preventDefault();
    setPasswordNote(null);

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      setPasswordNote({ good: false, message: `Use at least ${PASSWORD_MIN_LENGTH} characters.` });
      return;
    }

    setBusy("password");
    try {
      await ServerBridge.changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordNote({
        good: true,
        message: "Your password is changed. Every other signed-in device was signed out."
      });
    } catch (error) {
      setPasswordNote({ good: false, message: messageFor(error, "That password did not match.") });
    } finally {
      setBusy("");
    }
  }

  async function resend() {
    setConfirmNote(null);
    setBusy("confirm");
    try {
      const sent = await ServerBridge.resendConfirmation();
      setConfirmNote(
        sent
          ? { good: true, message: "Sent. The link is good for twenty-four hours." }
          : { good: true, message: "This address is already confirmed." }
      );
    } catch (error) {
      setConfirmNote({ good: false, message: messageFor(error, "Sign in again to do that.") });
    } finally {
      setBusy("");
    }
  }

  async function withdraw() {
    setReviewNote(null);
    setBusy("review");
    try {
      await ServerBridge.withdrawReview();
      setReview(null);
      setReviewNote({ good: true, message: "Your review is withdrawn." });
    } catch (error) {
      setReviewNote({ good: false, message: messageFor(error, "Sign in again to do that.") });
    } finally {
      setBusy("");
    }
  }

  async function signOutEverywhere() {
    setSessionsNote(null);
    setBusy("sessions");
    try {
      await ServerBridge.logoutEverywhere();
    } catch {
      setSessionsNote({ good: false, message: "The server could not be reached. Try again in a moment." });
    } finally {
      setBusy("");
    }
  }

  function download() {
    const { sessionToken: _token, ...held } = account ?? ({} as ServerBridge.Account);

    const copy = JSON.stringify({ account: held, review }, null, 2);
    const url = URL.createObjectURL(new Blob([copy], { type: "application/json" }));
    const link = document.createElement("a");

    link.href = url;
    link.download = "file-analyzer-account.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function erase(event: FormEvent) {
    event.preventDefault();
    setDeleteNote(null);

    if (!deletePassword) {
      setDeleteNote({ good: false, message: "Enter your password." });
      return;
    }

    setBusy("delete");
    try {
      await ServerBridge.deleteAccount(deletePassword);
    } catch (error) {
      setDeleteNote({ good: false, message: messageFor(error, "That password did not match.") });
    } finally {
      setBusy("");
    }
  }

  if (!loaded) {
    return (
      <article className={`page ${className}`}>
        <p className="account_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">Your account</h1>
        <p className="page_lead">Reading your details…</p>
      </article>
    );
  }

  if (!account) {
    return (
      <article className={`page ${className}`}>
        <p className="account_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">Your account</h1>
        <p className="page_lead">
          Your details could not be read. <Link to={ROUTES.LOGIN}>Sign in</Link> and try again.
        </p>
      </article>
    );
  }

  return (
    <article className={`page ${className}`}>
      <p className="account_eyebrow fa_eyebrow">Account</p>
      <h1 className="page_title">Your account</h1>
      <p className="page_lead">Everything the site holds about you, and everything you can change.</p>

      <div className={`${className}_identity`}>
        <span className={`${className}_avatar`} aria-hidden="true">
          {initialOf(account.email)}
        </span>
        <div className={`${className}_identity_text`}>
          <p className={`${className}_identity_email`}>{account.email}</p>
          <p className={`${className}_identity_facts`}>
            Member since {dateOf(account.createdAt)} · Last signed in {dateOf(account.lastLoginAt)}
          </p>
        </div>
        <span
          className={cx(`${className}_badge`, account.confirmed ? `${className}_badge-good` : `${className}_badge-warn`)}
        >
          <Icon name={account.confirmed ? "success" : "warning"} size="0.875em" />
          {account.confirmed ? "Confirmed" : "Unconfirmed"}
        </span>
      </div>

      {!account.confirmed && (
        <Block title="Confirm your address">
          <p className={`${className}_lead`}>
            Until the link in the confirmation mail is followed, this address is unproven.
          </p>
          <Notice note={confirmNote} />
          <button
            className="fa_button"
            type="button"
            disabled={busy === "confirm"}
            onClick={() => void resend()}
          >
            {busy === "confirm" ? "Sending…" : "Send the link again"}
          </button>
        </Block>
      )}

      <Block title="E-mail address">
        {account.pendingEmail && (
          <p className={`${className}_lead`}>
            Waiting on <strong>{account.pendingEmail}</strong> to follow its confirmation link. Until
            it does, {account.email} is still the address on this account.
          </p>
        )}

        <form className={`${className}_form`} onSubmit={submitEmail} noValidate>
          <Notice note={emailNote} />

          <div className="account_field">
            <label className="account_label" htmlFor="profile-email">
              New address
            </label>
            <input
              className="account_input"
              id="profile-email"
              type="email"
              value={newEmail}
              autoComplete="email"
              onChange={(event) => setNewEmail(event.target.value)}
            />
          </div>

          <div className="account_field">
            <label className="account_label" htmlFor="profile-email-password">
              Your current password
            </label>
            <input
              className="account_input"
              id="profile-email-password"
              type="password"
              value={emailPassword}
              autoComplete="current-password"
              onChange={(event) => setEmailPassword(event.target.value)}
            />
          </div>

          <button className="fa_button" type="submit" disabled={busy === "email"}>
            {busy === "email" ? "Sending…" : "Change the address"}
          </button>

          <p className="account_note">
            <Icon name="info" size="0.875em" />
            The new address has to answer a confirmation mail before it replaces the old one.
          </p>
        </form>
      </Block>

      <Block title="Password">
        <form className={`${className}_form`} onSubmit={submitPassword} noValidate>
          <Notice note={passwordNote} />

          <div className="account_field">
            <label className="account_label" htmlFor="profile-current-password">
              Current password
            </label>
            <input
              className="account_input"
              id="profile-current-password"
              type="password"
              value={currentPassword}
              autoComplete="current-password"
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>

          <div className="account_field">
            <div className="account_field_head">
              <label className="account_label" htmlFor="profile-new-password">
                New password
              </label>
              <button
                className="account_reveal"
                type="button"
                aria-pressed={revealed}
                aria-controls="profile-new-password"
                onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
              >
                {revealed ? "Hide" : "Show"}
              </button>
            </div>
            <p className="account_hint" id="profile-new-password-hint">
              At least {PASSWORD_MIN_LENGTH} characters.
            </p>
            <input
              className="account_input"
              id="profile-new-password"
              type={revealed ? "text" : "password"}
              value={newPassword}
              autoComplete="new-password"
              aria-describedby="profile-new-password-hint"
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>

          <button className="fa_button" type="submit" disabled={busy === "password"}>
            {busy === "password" ? "Changing…" : "Change the password"}
          </button>
        </form>
      </Block>

      <Block title="Your review">
        <Notice note={reviewNote} />

        {review ? (
          <>
            <p className={`${className}_review_head`}>
              <span aria-hidden="true">{"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</span>
              <span className={`${className}_review_name`}>
                {review.displayName} · {dateOf(review.updatedAt ?? review.createdAt)}
              </span>
            </p>
            <p className={`${className}_review_body`}>{review.body}</p>
            <div className={`${className}_actions`}>
              <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}`}>
                Rewrite it
              </Link>
              <button
                className="fa_button"
                type="button"
                disabled={busy === "review"}
                onClick={() => void withdraw()}
              >
                {busy === "review" ? "Withdrawing…" : "Withdraw it"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={`${className}_lead`}>You have not left one. One account holds one review.</p>
            <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}`}>
              Write a review
            </Link>
          </>
        )}
      </Block>

      <Block title="Signed-in devices">
        <p className={`${className}_lead`}>
          A session ends by itself after thirty minutes idle, and after twelve hours whatever happens.
          This ends all of them now, including this one.
        </p>
        <Notice note={sessionsNote} />
        <button
          className="fa_button"
          type="button"
          disabled={busy === "sessions"}
          onClick={() => void signOutEverywhere()}
        >
          {busy === "sessions" ? "Signing out…" : "Sign out everywhere"}
        </button>
      </Block>

      <Block title="Plan">
        <p className={`${className}_lead`}>
          {PRODUCT_NAME} is free while it is in development, and an account is not needed to use it.
          There is nothing to pay and nothing to cancel.
        </p>
      </Block>

      <Block title="Your data">
        <p className={`${className}_lead`}>
          A copy of everything held about you, as a JSON file. Deleting the account removes it and
          your review, and cannot be undone.
        </p>

        <div className={`${className}_actions`}>
          <button className="fa_button" type="button" onClick={download}>
            <Icon name="export" size="1em" />
            Download a copy
          </button>
          {!deleteAsked && (
            <button
              className={`fa_button ${className}_danger`}
              type="button"
              onClick={() => setDeleteAsked(true)}
            >
              Delete my account
            </button>
          )}
        </div>

        {deleteAsked && (
          <form className={`${className}_form ${className}_form-danger`} onSubmit={erase} noValidate>
            <Notice note={deleteNote} />

            <div className="account_field">
              <label className="account_label" htmlFor="profile-delete-password">
                Your password, to be sure
              </label>
              <input
                className="account_input"
                id="profile-delete-password"
                type="password"
                value={deletePassword}
                autoComplete="current-password"
                ref={deleteRef}
                onChange={(event) => setDeletePassword(event.target.value)}
              />
            </div>

            <div className={`${className}_actions`}>
              <button className={`fa_button ${className}_danger`} type="submit" disabled={busy === "delete"}>
                {busy === "delete" ? "Deleting…" : "Delete everything"}
              </button>
              <button
                className="fa_button"
                type="button"
                onClick={() => {
                  setDeleteAsked(false);
                  setDeletePassword("");
                  setDeleteNote(null);
                }}
              >
                Keep my account
              </button>
            </div>
          </form>
        )}
      </Block>
    </article>
  );
}
