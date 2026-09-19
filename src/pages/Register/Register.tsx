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

const className = "register";

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
        password: values.password,
        termsAccepted: values.terms
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
      } else if (error instanceof ServerBridge.ServerError && error.status === 422) {
        /* The server keeps its own password rules and explains which one failed. */
        setErrors({ password: error.message });
      } else if (error instanceof ServerBridge.ServerError && error.status === 400) {
        /* The server enforces its own rules and does not have to agree with the
           client's. When it refuses, say that rather than blaming the network. */
        setServerMessage("The server would not accept those details. Check the address and the password.");
      } else {
        setServerMessage("The server could not be reached. Try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`${className}_done`} ref={doneRef} tabIndex={-1}>
        <Icon className={`${className}_done_glyph`} name="success" size="2.5em" />
        <h1 className="page_title">Registered</h1>
        <p className="page_lead">{serverMessage}</p>
        <Link className="fa_button" to={ROUTES.HOME}>
          Back to the home page
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`${className}_main`}>
        <h1 className="page_title">Register</h1>
        <p className="page_lead">
          An account is for the site — the application itself never asks for one.
        </p>

        {/* Announced when it appears, and focused, so a correction is never missed. */}
        <div
          className={`${className}_summary`}
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          hidden={errorCount === 0}
        >
          <h2 className={`${className}_summary_title`}>
            <Icon name="warning" size="1.125em" />
            There is a problem
          </h2>
          <ul className={`${className}_summary_list`}>
            {shownList.map((key) => (
              <li key={key}>
                <a
                  href={"#register-" + key}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("register-" + key)?.focus();
                  }}
                >
                  {shown[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className={`${className}_form`} onSubmit={submit} noValidate>
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

        <div className={`${className}_trap`} aria-hidden="true">
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

        <div className={`${className}_field`}>
          <div className={`${className}_check`}>
            <input
              className={`${className}_check_input`}
              id="register-terms"
              type="checkbox"
              checked={values.terms}
              aria-invalid={Boolean(shown.terms)}
              aria-describedby={shown.terms ? "register-terms-error" : undefined}
              onChange={(event) => change("terms", event.target.checked)}
            />
            <label className={`${className}_check_label`} htmlFor="register-terms">
              I accept the <Link to={ROUTES.TERMS}>terms</Link> and the{" "}
              <Link to={ROUTES.PRIVACY}>privacy</Link> page.
            </label>
          </div>

          {shown.terms && (
            <p className={`${className}_error`} id="register-terms-error">
              <Icon name="warning" size="1em" />
              {shown.terms}
            </p>
          )}
        </div>

        <button
          className={`fa_button fa_button-primary ${className}_submit`}
          type="submit"
          disabled={busy}
        >
          {busy ? "Registering…" : "Register"}
        </button>

        {/* The server's answer, spoken without stealing focus. */}
        <p className={`${className}_status`} role="status" aria-live="polite">
          {serverMessage}
        </p>
        </form>
      </div>

      <aside className={`${className}_aside`} aria-labelledby="register-aside-heading">
        <h2 className={`${className}_aside_title`} id="register-aside-heading">
          Before you register
        </h2>

        <ul className={`${className}_notes`}>
          {NOTES.map((note) => (
            <li className={`${className}_note`} key={note.title}>
              <Icon className={`${className}_note_glyph`} name={note.glyph} size="1.25em" />
              <span className={`${className}_note_title`}>{note.title}</span>
              <span className={`${className}_note_body`}>{note.body}</span>
            </li>
          ))}
        </ul>

        <p className={`${className}_aside_link`}>
          <Link to={ROUTES.LICENSES}>Third-Party Licenses</Link>
        </p>
      </aside>
    </div>
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
  /** Draws how strong the value looks. Password only. */
  meter?: boolean;
  onChange: (value: string) => void;
};

/*
 * How strong the password looks, from nothing to one. Below the minimum length
 * the bar only tracks progress towards that minimum and stays in its first
 * third, so it can never read as decent while the form is about to reject it.
 * Past the minimum, length alone called "111111111111" strong, so how many
 * different characters it uses and how many kinds of character it mixes carry
 * the weight; the breach list stays the server's to answer with.
 */
function strengthOf(password: string): number {
  if (!password) return 0;
  if (password.length < PASSWORD_MIN_LENGTH) return password.length / PASSWORD_MIN_LENGTH / 3;

  const distinct = Math.min(new Set(password).size / 8, 1);
  const kinds =
    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((kind) => kind.test(password)).length / 4;

  return 0.2 + 0.5 * distinct + 0.3 * kinds;
}

function Field({ name, type, autoComplete, value, error, hint, meter, onChange }: FieldProps) {
  const [revealed, setRevealed] = useState(false);
  const id = "register-" + name;
  const hintId = id + "-hint";
  const errorId = id + "-error";
  const described = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  const strength = strengthOf(value);

  return (
    <div className={`${className}_field`}>
      <div className={`${className}_field_head`}>
        <label className={`${className}_label`} htmlFor={id}>
          {FIELD_LABEL[name]}
        </label>

        {type === "password" && (
          <button
            className={`${className}_reveal`}
            type="button"
            aria-label="Show password"
            aria-pressed={revealed}
            aria-controls={id}
            onClick={() => setRevealed((wasRevealed) => !wasRevealed)}
          >
            <Icon name={revealed ? "eyeOff" : "eye"} size="1.25em" />
          </button>
        )}
      </div>

      {hint && (
        <p className={`${className}_hint`} id={hintId}>
          {hint}
        </p>
      )}

      <input
        className={cx(`${className}_input`, error && `${className}_input-invalid`)}
        id={id}
        name={name}
        type={revealed ? "text" : type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={described || undefined}
        onChange={(event) => onChange(event.target.value)}
      />

      {/* The length rule is stated in the hint and enforced in the error; the bar
          answers the other question, which is whether the password is any good. */}
      {meter && (
        <div className={cx(`${className}_meter`, strength >= 0.75 && `${className}_meter-met`)} aria-hidden="true">
          <span className={`${className}_meter_fill`} style={{ transform: `scaleX(${strength})` }} />
        </div>
      )}

      {error && (
        <p className={`${className}_error`} id={errorId}>
          <Icon name="warning" size="1em" />
          {error}
        </p>
      )}
    </div>
  );
}
