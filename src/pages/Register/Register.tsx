/**
 * Registration.
 *
 * Layout: one column, one field per row, on every screen. A registration form
 * has nothing to gain from columns and a lot to lose — a reader tabbing through
 * two columns loses the order.
 *
 * Functionality: validate on submit, then re-validate a field as it is corrected
 * (never while it is first being typed, which scolds the reader mid-word).
 * Errors are shown in a summary at the top and again beside the field.
 *
 * Server: the form calls ServerBridge.register and nothing else. It does not
 * know the endpoint, the base URL or the shape of the request.
 */

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import type { GlyphName } from "../../components/Icon/glyphs";
import { PASSWORD_MIN_LENGTH } from "../../core/Constants";
import * as ServerBridge from "../../core/ServerBridge";
import { cx, isEmail } from "../../core/Utility";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./register.css";

type Values = {
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { email: "", password: "", confirm: "", terms: false };

/** What a reader should know before handing over an address. */
const NOTES: Array<{ glyph: GlyphName; title: string; body: string }> = [
  {
    glyph: "seal",
    title: "For the site, not the app",
    body: "File Analyzer runs offline and opens files read-only. Nothing here is needed to use it."
  },
  {
    glyph: "info",
    title: "What is stored",
    body: "Your address, and a password the server hashes. No file you open ever leaves your machine."
  },
  {
    glyph: "success",
    title: "No tracking",
    body: "This site sets one cookie, and only the one you agreed to. There is nothing else to opt out of."
  }
];

const FIELD_LABEL: Record<keyof Values, string> = {
  email: "E-mail address",
  password: "Password",
  confirm: "Confirm password",
  terms: "Terms"
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.email.trim()) errors.email = "Enter your e-mail address.";
  else if (!isEmail(values.email)) errors.email = "That does not look like an e-mail address.";

  if (!values.password) errors.password = "Enter a password.";
  else if (values.password.length < PASSWORD_MIN_LENGTH)
    errors.password = "Use at least " + PASSWORD_MIN_LENGTH + " characters.";

  if (values.confirm !== values.password) errors.confirm = "The two passwords do not match.";

  if (!values.terms) errors.terms = "You have to accept the terms to register.";

  return errors;
}

export default function Register() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  /** Errors are only shown once the reader has tried to submit at least once. */
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  /* The honeypot. A person never sees this field and never fills it. */
  const [trap, setTrap] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [done, setDone] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const shown: Errors = submitted ? errors : {};
  const shownList = (Object.keys(shown) as Array<keyof Values>).filter((key) => shown[key]);
  const errorCount = shownList.length;

  /* Send focus wherever the answer landed: the error summary, or the confirmation. */
  useEffect(() => {
    if (done) doneRef.current?.focus();
    else if (submitted && errorCount > 0) summaryRef.current?.focus();
  }, [done, submitted, errorCount]);

  function change<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    /* Only correct a field that is already showing an error. */
    if (submitted) setErrors(validate(next));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    setServerMessage("");

    /* Something filled the hidden field, so nothing human is submitting this.
       It gets the answer a success would give and the server is never called:
       being told it was caught is exactly what a bot would use to adapt. */
    if (trap) {
      setServerMessage("Check your e-mail to confirm the address.");
      setDone(true);
      return;
    }

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!ServerBridge.isConfigured()) {
      setServerMessage("No server is configured for this site yet, so registration cannot be completed.");
      return;
    }

    setBusy(true);
    try {
      const result = await ServerBridge.register({
        email: values.email.trim(),
        password: values.password
      });
      setServerMessage(
        result.confirmationRequired
          ? "Check your e-mail to confirm the address."
          : "Your account is ready."
      );
      setDone(true);
    } catch (error) {
      if (error instanceof ServerBridge.ServerError && error.status === 409) {
        setErrors({ email: "That address is already registered." });
      } else {
        setServerMessage("The server could not be reached. Try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <article className="page">
        <div className="register_done" ref={doneRef} tabIndex={-1}>
          <Icon className="register_done_glyph" name="success" size="2.5em" />
          <h1 className="page_title">Registered</h1>
          <p className="page_lead">{serverMessage}</p>
          <Link className="fa_button" to={ROUTES.HOME}>
            Back to the home page
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="page register">
      <div className="register_main">
        <p className="register_eyebrow fa_eyebrow">Account</p>
        <h1 className="page_title">Register</h1>
        <p className="page_lead">
          An account is for the site — the application itself never asks for one.
        </p>

        {/* Announced when it appears, and focused, so a correction is never missed. */}
        <div
          className="register_summary"
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          hidden={errorCount === 0}
        >
          <h2 className="register_summary_title">
            <Icon name="warning" size="1.125em" />
            There is a problem
          </h2>
          <ul className="register_summary_list">
            {shownList.map((key) => (
              <li key={key}>
                <a href={"#register-" + key}>{shown[key]}</a>
              </li>
            ))}
          </ul>
        </div>

        <form className="register_form" onSubmit={submit} noValidate>
        <Field
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={shown.email}
          onChange={(value) => change("email", value)}
        />

        <Field
          name="password"
          type="password"
          autoComplete="new-password"
          meter
          hint={"At least " + PASSWORD_MIN_LENGTH + " characters."}
          value={values.password}
          error={shown.password}
          onChange={(value) => change("password", value)}
        />

        <Field
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={values.confirm}
          error={shown.confirm}
          onChange={(value) => change("confirm", value)}
        />

        <div className="register_trap" aria-hidden="true">
          <label htmlFor="register-website">Leave this field empty</label>
          <input
            id="register-website"
            name="website"
            type="text"
            value={trap}
            tabIndex={-1}
            autoComplete="off"
            onChange={(event) => setTrap(event.target.value)}
          />
        </div>

        <div className="register_field">
          <div className="register_check">
            <input
              className="register_check_input"
              id="register-terms"
              type="checkbox"
              checked={values.terms}
              aria-invalid={Boolean(shown.terms)}
              aria-describedby={shown.terms ? "register-terms-error" : undefined}
              onChange={(event) => change("terms", event.target.checked)}
            />
            <label className="register_check_label" htmlFor="register-terms">
              I accept the terms.
            </label>
          </div>

          {shown.terms && (
            <p className="register_error" id="register-terms-error">
              <Icon name="warning" size="1em" />
              {shown.terms}
            </p>
          )}
        </div>

        <button
          className="fa_button fa_button-primary register_submit"
          type="submit"
          disabled={busy}
        >
          {busy ? "Registering…" : "Register"}
        </button>

        {/* The server's answer, spoken without stealing focus. */}
        <p className="register_status" role="status" aria-live="polite">
          {serverMessage}
        </p>
        </form>
      </div>

      <aside className="register_aside" aria-labelledby="register-aside-heading">
        <h2 className="register_aside_title" id="register-aside-heading">
          Before you do
        </h2>

        <ul className="register_notes">
          {NOTES.map((note) => (
            <li className="register_note" key={note.title}>
              <Icon className="register_note_glyph" name={note.glyph} size="1.25em" />
              <span className="register_note_title">{note.title}</span>
              <span className="register_note_body">{note.body}</span>
            </li>
          ))}
        </ul>

        <p className="register_aside_link">
          <Link to={ROUTES.LICENSES}>Third-Party Licenses</Link>
        </p>
      </aside>
    </article>
  );
}

/**
 * One labelled text input with its hint and its error, wired together.
 * It lives here because only this form uses it; move it out when a second does.
 */
type FieldProps = {
  name: keyof Values;
  type: "email" | "password";
  autoComplete: string;
  value: string;
  error?: string;
  hint?: string;
  /** Draws how far the value is from the minimum length. Password only. */
  meter?: boolean;
  onChange: (value: string) => void;
};

function Field({ name, type, autoComplete, value, error, hint, meter, onChange }: FieldProps) {
  const [revealed, setRevealed] = useState(false);
  const id = "register-" + name;
  const hintId = id + "-hint";
  const errorId = id + "-error";
  const described = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  const reached = Math.min(value.length / PASSWORD_MIN_LENGTH, 1);

  return (
    <div className="register_field">
      <div className="register_field_head">
        <label className="register_label" htmlFor={id}>
          {FIELD_LABEL[name]}
        </label>

        {type === "password" && (
          <button
            className="register_reveal"
            type="button"
            aria-pressed={revealed}
            aria-controls={id}
            onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
          >
            {revealed ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {hint && (
        <p className="register_hint" id={hintId}>
          {hint}
        </p>
      )}

      <input
        className={cx("register_input", error && "register_input-invalid")}
        id={id}
        name={name}
        type={revealed ? "text" : type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={described || undefined}
        onChange={(event) => onChange(event.target.value)}
      />

      {/* The length rule is already stated in the hint and enforced in the
          error; the bar is the same fact, drawn. */}
      {meter && (
        <div className={cx("register_meter", reached === 1 && "register_meter-met")} aria-hidden="true">
          <span className="register_meter_fill" style={{ transform: `scaleX(${reached})` }} />
        </div>
      )}

      {error && (
        <p className="register_error" id={errorId}>
          <Icon name="warning" size="1em" />
          {error}
        </p>
      )}
    </div>
  );
}
