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
  return new Date(stamp).toLocaleDateString("en-GB", {
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

/**
 * One setting: what it is, what it is set to, and whatever changes it. A card
 * rather than a rule across the page, so a long account page reads as a list of
 * separate things to do instead of one unbroken column.
 */
function Block({
  title,
  tone,
  children
}: {
  title: string;
  /** A card that deletes things looks like one. */
  tone?: "danger";
  children: ReactNode;
}) {
  const id = `profile-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      className={cx(`${className}_block`, tone && `${className}_block-${tone}`)}
      aria-labelledby={id}
    >
      <h2 className={`${className}_block_title`} id={id}>{title}</h2>
      {children}
    </section>
  );
}

/** What just happened to this setting. It stays put when its form is put away. */
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

/** The current value of a setting, with the control that changes it beside it. */
function Row({ label, value, children }: { label: string; value: ReactNode; children?: ReactNode }) {
  return (
    <div className={`${className}_row`}>
      <div className={`${className}_row_text`}>
        <p className={`${className}_row_label`}>{label}</p>
        <p className={`${className}_row_value`}>{value}</p>
      </div>
      {children}
    </div>
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
  const [sessionsAsked, setSessionsAsked] = useState(false);

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteAsked, setDeleteAsked] = useState(false);
  const [deleteNote, setDeleteNote] = useState<Note>(null);

  /**
   * Which form is open, if any. Everything on this page is a thing you rarely
   * change, so nothing is open until it is asked for: the page is read far more
   * often than it is edited, and eight fields on arrival is not a page, it is a
   * form nobody asked to fill in.
   */
  const [editing, setEditing] = useState("");

  const [busy, setBusy] = useState("");
  const deleteRef = useRef<HTMLInputElement>(null);
  const keepSessionsRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (sessionsAsked) keepSessionsRef.current?.focus();
  }, [sessionsAsked]);

  /* A form that opens takes the caret with it; otherwise the reader has pressed
     a button and nothing appears to have happened where they are looking. */
  useEffect(() => {
    if (!editing) return;
    const first = editing === "email" ? "profile-email" : "profile-current-password";
    document.getElementById(first)?.focus();
  }, [editing]);

  function close() {
    setEditing("");
  }

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
        message: "A confirmation link is on its way to the new address. The old one stays until you follow it."
      });
      close();
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
      close();
    } catch (error) {
      setPasswordNote({ good: false, message: messageFor(error, "That password did not match.") });
    } finally {
      setBusy("");
    }
  }

  async function resend() {
    if (!account) return;
    setConfirmNote(null);
    setBusy("confirm");
    try {
      await ServerBridge.resendConfirmation(account.email);
      setConfirmNote({ good: true, message: "Sent. The link expires in 24 hours." });
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
      setSessionsAsked(false);
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
    /* The shape of the page is drawn while it is being read, so the header does
       not sit alone over an empty screen and then jump. */
    return (
      <article className={`page ${className}`}>
        <p className="account_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">Your account</h1>
        <p className="page_lead">Everything the site holds about you, and everything you can change.</p>
        <p className="fa_loading account_loading">
          <span className="fa_spinner" aria-hidden="true" />
          Reading your details…
        </p>

        <div className={`${className}_skeleton`} aria-hidden="true">
          <span className={`${className}_skeleton_identity`} />
          <span className={`${className}_skeleton_block`} />
          <span className={`${className}_skeleton_block`} />
        </div>
      </article>
    );
  }

  if (!account) {
    return (
      <article className={`page ${className}`}>
        <p className="account_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">Your account</h1>
        <div className={cx("account_card", `${className}_empty`)}>
          <Icon className={`${className}_empty_glyph`} name="warning" size="2.5em" />
          <p className={`${className}_empty_message`}>
            Your details could not be read. The server may be unreachable, or this session may have
            ended while the page was open.
          </p>
          <div className={`${className}_actions`}>
            <Link className="fa_button fa_button-primary" to={ROUTES.LOGIN}>
              Sign in
            </Link>
            <Link className="fa_button" to={ROUTES.HOME}>
              Back to the home page
            </Link>
          </div>
        </div>
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
            <span className={`${className}_fact`}>Member since {dateOf(account.createdAt)}</span>
            <span className={`${className}_fact`}>
              Last signed in {dateOf(account.lastLoginAt)}
            </span>
          </p>
        </div>
        <span
          className={cx(`${className}_badge`, account.confirmed ? `${className}_badge-good` : `${className}_badge-warn`)}
        >
          <Icon name={account.confirmed ? "success" : "warning"} size="0.875em" />
          {account.confirmed ? "Confirmed" : "Unconfirmed"}
        </span>
      </div>

      {/* An unconfirmed address is the one thing on this page that wants doing
          now, so it is a banner above the settings rather than one of them. */}
      {!account.confirmed && (
        <div className={`${className}_alert`}>
          <Icon className={`${className}_alert_glyph`} name="warning" size="1.5em" />
          <div className={`${className}_alert_body`}>
            <p className={`${className}_alert_title`}>Confirm your address</p>
            <p className={`${className}_alert_text`}>
              This address stays unconfirmed until you follow the link we sent it.
            </p>
            <Notice note={confirmNote} />
          </div>
          <button
            className="fa_button"
            type="button"
            disabled={busy === "confirm"}
            onClick={() => void resend()}
          >
            {busy === "confirm" && <span className="fa_spinner" aria-hidden="true" />}
            {busy === "confirm" ? "Sending…" : "Send again"}
          </button>
        </div>
      )}

      <Block title="E-mail address">
        <Notice note={emailNote} />

        {account.pendingEmail && (
          <p className={`${className}_pending`}>
            <span className="fa_tag fa_tag-accent">Pending</span>
            Waiting on <strong>{account.pendingEmail}</strong> to follow its confirmation link.
            Until it does, {account.email} is still the address on this account.
          </p>
        )}

        <Row label="Current address" value={account.email}>
          {editing !== "email" && (
            <button
              className="fa_button fa_button-small"
              type="button"
              onClick={() => setEditing("email")}
            >
              Change
            </button>
          )}
        </Row>

        {editing === "email" && (
          <form className={`${className}_form`} onSubmit={submitEmail} noValidate>
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

            <p className="account_note">
              <Icon name="info" size="0.875em" />
              The new address replaces the old one once it follows its confirmation link.
            </p>

            <div className={`${className}_actions`}>
              <button className="fa_button fa_button-primary" type="submit" disabled={busy === "email"}>
                {busy === "email" && <span className="fa_spinner" aria-hidden="true" />}
                {busy === "email" ? "Sending…" : "Change address"}
              </button>
              <button className="fa_button" type="button" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Block>

      <Block title="Password">
        <Notice note={passwordNote} />

        <Row
          label="Password"
          value={
            <>
              <span aria-hidden="true">••••••••••</span>
              <span className="fa_hidden">Set, and not shown</span>
            </>
          }
        >
          {editing !== "password" && (
            <button
              className="fa_button fa_button-small"
              type="button"
              onClick={() => setEditing("password")}
            >
              Change
            </button>
          )}
        </Row>

        {editing === "password" && (
          <form className={`${className}_form`} onSubmit={submitPassword} noValidate>
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
                  aria-label={revealed ? "Hide password" : "Show password"}
                  aria-pressed={revealed}
                  aria-controls="profile-new-password"
                  onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
                >
                  <Icon name={revealed ? "eyeOff" : "eye"} size="1.25em" />
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

            <p className="account_note">
              <Icon name="info" size="0.875em" />
              Changing it signs out every other device.
            </p>

            <div className={`${className}_actions`}>
              <button className="fa_button fa_button-primary" type="submit" disabled={busy === "password"}>
                {busy === "password" && <span className="fa_spinner" aria-hidden="true" />}
                {busy === "password" ? "Changing…" : "Change password"}
              </button>
              <button className="fa_button" type="button" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Block>

      <Block title="Your review">
        <Notice note={reviewNote} />

        {review ? (
          <>
            <div className={`${className}_review`}>
              <p className={`${className}_review_head`}>
                <span aria-hidden="true">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </span>
                <span className="fa_hidden">{review.rating} out of 5</span>
                <span className={`${className}_review_name`}>
                  {review.displayName} · {dateOf(review.updatedAt ?? review.createdAt)}
                </span>
              </p>
              <p className={`${className}_review_body`}>{review.body}</p>
            </div>

            <div className={`${className}_actions`}>
              <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}`}>
                Rewrite
              </Link>
              <button
                className="fa_button"
                type="button"
                disabled={busy === "review"}
                onClick={() => void withdraw()}
              >
                {busy === "review" && <span className="fa_spinner" aria-hidden="true" />}
                {busy === "review" ? "Withdrawing…" : "Withdraw"}
              </button>
            </div>
          </>
        ) : (
          /* Nothing to show is still something to do: the empty state carries
             the action rather than only reporting the emptiness. */
          <div className={`${className}_none`}>
            <p className={`${className}_lead`}>You have not left one. One account holds one review.</p>
            <Link className="fa_button" to={`${ROUTES.HOME}#${HOME_SECTIONS.REVIEWS}`}>
              Write a review
            </Link>
          </div>
        )}
      </Block>

      <Block title="Signed-in devices">
        <p className={`${className}_lead`}>
          A session ends after 30 minutes idle, or 12 hours whatever happens. This ends all of
          them now, including this one.
        </p>
        <Notice note={sessionsNote} />

        {sessionsAsked ? (
          <div className={`${className}_confirm`} role="group" aria-label="Sign out everywhere">
            <p className={`${className}_confirm_text`}>
              <Icon name="warning" size="1em" />
              This signs out this device too. You will have to sign in again.
            </p>
            <div className={`${className}_actions`}>
              <button
                className={`fa_button ${className}_danger`}
                type="button"
                disabled={busy === "sessions"}
                onClick={() => void signOutEverywhere()}
              >
                {busy === "sessions" && <span className="fa_spinner" aria-hidden="true" />}
                {busy === "sessions" ? "Signing out…" : "End every session"}
              </button>
              <button
                className="fa_button"
                type="button"
                ref={keepSessionsRef}
                disabled={busy === "sessions"}
                onClick={() => setSessionsAsked(false)}
              >
                Stay signed in
              </button>
            </div>
          </div>
        ) : (
          <button className="fa_button" type="button" onClick={() => setSessionsAsked(true)}>
            Sign out everywhere
          </button>
        )}
      </Block>

      <Block title="Plan">
        <p className={`${className}_lead`}>
          {PRODUCT_NAME} is free while it is in development, and an account is not needed to use it.
          There is nothing to pay and nothing to cancel.
        </p>
        <Row label="Current plan" value="Free while in development">
          <Link className="fa_button fa_button-small" to={ROUTES.PRICING}>
            See plans
          </Link>
        </Row>
      </Block>

      <Block title="Your data">
        <p className={`${className}_lead`}>
          A copy of everything held about you, as a JSON file: your account, and your review if you
          left one.
        </p>

        <button className="fa_button" type="button" onClick={download}>
          <Icon name="export" size="1em" />
          Download a copy
        </button>
      </Block>

      <Block title="Delete your account" tone="danger">
        <p className={`${className}_lead`}>
          This removes the account and the review with it, on the spot and for good. There is no
          undoing it and no copy kept — take one above first if you want one.
        </p>

        <Notice note={deleteNote} />

        {deleteAsked ? (
          <form className={`${className}_form`} onSubmit={erase} noValidate>
            <div className="account_field">
              <label className="account_label" htmlFor="profile-delete-password">
                Your password
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
                {busy === "delete" && <span className="fa_spinner" aria-hidden="true" />}
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
        ) : (
          <button
            className={`fa_button ${className}_danger`}
            type="button"
            onClick={() => setDeleteAsked(true)}
          >
            Delete my account
          </button>
        )}
      </Block>
    </article>
  );
}
