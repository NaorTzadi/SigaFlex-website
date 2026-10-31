/**
 * The only class that talks to the server. Everything else calls a method here
 * and gets back what the server gave, or an error.
 *
 * The base URL is an environment variable. No key or endpoint is written into
 * any other file.
 */

import { ENDPOINT } from "./Constants";
import * as CookiesManager from "./CookiesManager";
import { COOKIE } from "./CookiesManager";
import { getGlobals, setGlobal } from "./Globals";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";




/**
 * The session token, held in memory and mirrored to sessionStorage so a reload
 * does not sign the reader out. sessionStorage rather than a cookie: the token
 * is sent as a header, so it is never attached to a cross-site request, and it
 * dies with the tab rather than lingering for a year.
 *
 * Coming back after the tab is gone is the remember token's job. It lives in a
 * cookie for as long as the server honours it, is spent the first time it is
 * used, and is replaced by the one the server hands back.
 */
const SESSION_KEY = "fa_session";
const SESSION_HEADER = "sessionToken";
const REMEMBER_DAYS = 30;

let sessionToken: string | null = readStoredSession();

function readStoredSession(): string | null {
  try {
    return window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    /* Private mode, or storage blocked. The session then lasts one page view. */
    return null;
  }
}

/**
 * Signing in keeps the token the server sent, when it sent one; a plain
 * session check sends none and leaves the cookie as it was. Losing the session
 * leaves the cookie too: a dead session is exactly what the cookie is for.
 * Only a deliberate sign-out drops it, through forget().
 */
function rememberSession(token: string | null, email = "", rememberToken: string | null = null): void {
  sessionToken = token;
  setGlobal("signedIn", token !== null);
  setGlobal("accountEmail", token === null ? "" : email);
  if (rememberToken) CookiesManager.set(COOKIE.REMEMBER, rememberToken, REMEMBER_DAYS);
  try {
    if (token) window.sessionStorage.setItem(SESSION_KEY, token);
    else window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Nothing to do: the in-memory copy still works for this page view. */
  }
}

/** The reader chose to leave: the session and the way back are both dropped. */
function forget(): void {
  CookiesManager.remove(COOKIE.REMEMBER);
  rememberSession(null);
}

export function hasSession(): boolean {
  return sessionToken !== null;
}

export class ServerError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = "ServerError";
  }
}

let outstanding = 0;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  outstanding += 1;
  setGlobal("serverBusy", true);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(sessionToken ? { [SESSION_HEADER]: sessionToken } : {}),
        ...(init?.headers ?? {})
      },
      ...init
    });

    if (!response.ok) {
      /* The server has ended this session, so stop presenting it as live. */
      if (response.status === 401 && sessionToken) rememberSession(null);
      throw new ServerError(response.status, await messageFor(response));
    }

    /* 204 and 202 carry no body, and asking for one throws. */
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      return undefined as T;
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  } finally {
    outstanding -= 1;
    setGlobal("serverBusy", outstanding > 0);
  }
}

/** The server's own explanation when it sent one, otherwise the status line. */
async function messageFor(response: Response): Promise<string> {
  try {
    const body = await response.clone().json();
    const first = body && typeof body === "object" ? Object.values(body)[0] : null;
    return typeof first === "string" ? first : response.statusText;
  } catch {
    return response.statusText;
  }
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export function remove<T>(path: string): Promise<T> {
  return request<T>(path, { method: "DELETE" });
}

/** True when a server has been configured at all. The skeleton ships without one. */
export function isConfigured(): boolean {
  return BASE_URL.length > 0;
}

/* --- registration ---------------------------------------------------- */

export type RegistrationRequest = {
  email: string;
  password: string;
  /** Recorded server-side. Enforcing it only in the browser records nothing. */
  termsAccepted: boolean;
};

export type RegistrationResult = {
  /** Whether the server has sent a confirmation mail and is waiting on it. */
  confirmationRequired: boolean;
  /** True when the address was already waiting on a link from an earlier try. */
  alreadyPending: boolean;
};

/**
 * Forwards a registration to the server and returns what it gave back.
 *
 * The password leaves this method as it arrived: hashing, rate limiting and
 * duplicate checking are the server's, and nothing on the client pretends
 * otherwise. A 409 means the address is already registered; the caller turns
 * that into a field error.
 */
export function register(request: RegistrationRequest): Promise<RegistrationResult> {
  return post<RegistrationResult>(ENDPOINT.REGISTER, request);
}

/* --- session ----------------------------------------------------------- */

export type Account = {
  sessionToken: string;
  /** Null when the server only checked a session rather than opening one. */
  rememberToken: string | null;
  email: string;
  confirmed: boolean;
  pendingEmail: string | null;
  createdAt: string;
  lastLoginAt: string | null;
  termsAcceptedAt: string | null;
  hasPassword: boolean;
};

export type Credentials = {
  email: string;
  password: string;
};

/**
 * Signs in and keeps the session for every later call.
 *
 * A wrong password, an unknown address and a locked account all come back as
 * 401 with nothing to tell them apart -- deliberately, on the server's side.
 * The caller says "those details did not work" and nothing more.
 */
export async function login(credentials: Credentials): Promise<Account> {
  const account = await post<Account>(ENDPOINT.LOGIN, credentials);
  rememberSession(account.sessionToken, account.email, account.rememberToken);
  return account;
}

/** Ends the session on the server, and locally even if that call fails. */
export async function logout(): Promise<void> {
  try {
    await post<void>(ENDPOINT.LOGOUT, {});
  } finally {
    forget();
  }
}

/**
 * Who the held token belongs to. Without a live session it falls back to the
 * remember cookie, and answers null only when neither is any good.
 *
 * One check at a time. The remember token is spent by the first resume, so a
 * second caller arriving while it is in flight shares its answer rather than
 * posting the same token again and being refused.
 */
let checking: Promise<Account | null> | null = null;

export function currentAccount(): Promise<Account | null> {
  checking ??= checkAccount().finally(() => {
    checking = null;
  });
  return checking;
}

async function checkAccount(): Promise<Account | null> {
  try {
    if (sessionToken) {
      try {
        const account = await get<Account>(ENDPOINT.SESSION);
        rememberSession(account.sessionToken, account.email);
        return account;
      } catch (error) {
        if (!(error instanceof ServerError && error.status === 401)) throw error;
      }
    }
    return await resume();
  } finally {
    setGlobal("sessionChecked", true);
  }
}

/** Opens a session from the remember cookie. A refused cookie is dropped. */
async function resume(): Promise<Account | null> {
  const rememberToken = CookiesManager.get(COOKIE.REMEMBER);
  if (!rememberToken) return null;

  try {
    const account = await post<Account>(ENDPOINT.RESUME, { rememberToken });
    rememberSession(account.sessionToken, account.email, account.rememberToken);
    return account;
  } catch (error) {
    if (error instanceof ServerError && error.status === 401) {
      CookiesManager.remove(COOKIE.REMEMBER);
      return null;
    }
    throw error;
  }
}

const GOOGLE_STATE_KEY = "fa_google_state";

export type GoogleOutcome = "signedIn" | "termsRequired" | "failed";

export function startGoogleSignIn(termsAccepted: boolean): boolean {
  const bytes = window.crypto.getRandomValues(new Uint8Array(24));
  const state = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  try {
    window.sessionStorage.setItem(GOOGLE_STATE_KEY, state);
  } catch {
    return false;
  }
  const query = new URLSearchParams({ state, terms: String(termsAccepted) });
  window.location.assign(`${BASE_URL}${ENDPOINT.GOOGLE_START}?${query}`);
  return true;
}

export async function finishGoogleSignIn(fragment: string): Promise<GoogleOutcome | null> {
  const answer = new URLSearchParams(fragment.replace(/^#/, ""));
  const code = answer.get("google");
  const error = answer.get("google_error");
  if (!code && !error) return null;

  let expected: string | null = null;
  try {
    expected = window.sessionStorage.getItem(GOOGLE_STATE_KEY);
    window.sessionStorage.removeItem(GOOGLE_STATE_KEY);
  } catch {
    return "failed";
  }
  if (!expected) return null;
  if (answer.get("state") !== expected) return "failed";
  if (error) return error === "terms" ? "termsRequired" : "failed";

  try {
    const account = await post<Account>(ENDPOINT.GOOGLE_FINISH, { code });
    rememberSession(account.sessionToken, account.email, account.rememberToken);
    return "signedIn";
  } catch {
    return "failed";
  }
}

export function changeEmail(password: string, email: string): Promise<void> {
  return post<void>(ENDPOINT.CHANGE_EMAIL, { password, email });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const result = await post<{ sessionToken: string; rememberToken: string }>(ENDPOINT.CHANGE_PASSWORD, {
    currentPassword,
    newPassword
  });
  rememberSession(result.sessionToken, getGlobals().accountEmail, result.rememberToken);
}

/**
 * Sends the confirmation link again. Takes the address rather than a session,
 * because an account that was never confirmed cannot sign in to ask. The server
 * answers the same way whatever the address is, so there is nothing to report
 * back beyond the request having been accepted.
 */
export function resendConfirmation(email: string): Promise<void> {
  return post<void>(ENDPOINT.RESEND_CONFIRMATION, { email: email.trim() });
}

export async function logoutEverywhere(): Promise<void> {
  try {
    await post<void>(ENDPOINT.LOGOUT_ALL, {});
  } finally {
    forget();
  }
}

export async function deleteAccount(password: string): Promise<void> {
  await post<void>(ENDPOINT.DELETE_ACCOUNT, { password });
  forget();
}

/* --- address confirmation and password reset --------------------------- */

/** True when the link was still good. A spent or expired one answers 410. */
export async function confirmEmail(token: string): Promise<boolean> {
  try {
    await post<void>(ENDPOINT.CONFIRM, { token });
    return true;
  } catch (error) {
    if (error instanceof ServerError && error.status === 410) return false;
    throw error;
  }
}

/**
 * Asks for a reset link. Always succeeds, whether or not that address is
 * registered -- the answer to this must not be a way to ask who has an account.
 */
export function requestPasswordReset(email: string): Promise<void> {
  return post<void>(ENDPOINT.FORGOT_PASSWORD, { email });
}

/** True when the link was still good; 410 means it was spent or expired. */
export async function resetPassword(token: string, password: string): Promise<boolean> {
  try {
    await post<void>(ENDPOINT.RESET_PASSWORD, { token, password });
    return true;
  } catch (error) {
    if (error instanceof ServerError && error.status === 410) return false;
    throw error;
  }
}

/* --- reviews ----------------------------------------------------------- */

export type Review = {
  id: number;
  displayName: string;
  rating: number;
  body: string;
  createdAt: string;
  updatedAt: string | null;
  /** True for the review written by whoever is signed in right now. */
  mine: boolean;
};

export type ReviewSubmission = {
  displayName: string;
  rating: number;
  body: string;
};

/** Everyone's reviews, newest first. Readable signed out. */
export function reviews(): Promise<Review[]> {
  return get<Review[]>(ENDPOINT.REVIEWS);
}

/**
 * Leaves a review, or replaces the one this account already left. One account
 * holds one review, so there is no way to stack up praise under one name.
 */
export function submitReview(submission: ReviewSubmission): Promise<Review> {
  return post<Review>(ENDPOINT.REVIEWS, submission);
}

export async function myReview(): Promise<Review | null> {
  return (await get<Review | undefined>(ENDPOINT.MY_REVIEW)) ?? null;
}

export function withdrawReview(): Promise<void> {
  return remove<void>(ENDPOINT.MY_REVIEW);
}
