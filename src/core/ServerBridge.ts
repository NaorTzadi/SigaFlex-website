/**
 * The only class that talks to the server. Everything else calls a method here
 * and gets back what the server gave, or an error.
 *
 * The base URL is an environment variable. No key or endpoint is written into
 * any other file.
 */

import { getGlobals, setGlobal } from "./Globals";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

/** Every path the site asks the server for. Nothing outside this file names one. */
const ENDPOINT = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  SESSION: "/auth/session",
  CONFIRM: "/auth/confirm",
  RESEND_CONFIRMATION: "/auth/resend-confirmation",
  CHANGE_EMAIL: "/auth/change-email",
  CHANGE_PASSWORD: "/auth/change-password",
  LOGOUT_ALL: "/auth/logout-all",
  DELETE_ACCOUNT: "/auth/delete-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REVIEWS: "/reviews",
  MY_REVIEW: "/reviews/mine"
} as const;

/**
 * The session token, held in memory and mirrored to sessionStorage so a reload
 * does not sign the reader out. sessionStorage rather than a cookie: the token
 * is sent as a header, so it is never attached to a cross-site request, and it
 * dies with the tab rather than lingering for a year.
 */
const SESSION_KEY = "fa_session";
const SESSION_HEADER = "sessionToken";

let sessionToken: string | null = readStoredSession();

function readStoredSession(): string | null {
  try {
    return window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    /* Private mode, or storage blocked. The session then lasts one page view. */
    return null;
  }
}

function rememberSession(token: string | null, email = ""): void {
  sessionToken = token;
  setGlobal("signedIn", token !== null);
  setGlobal("accountEmail", token === null ? "" : email);
  try {
    if (token) window.sessionStorage.setItem(SESSION_KEY, token);
    else window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Nothing to do: the in-memory copy still works for this page view. */
  }
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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
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
    setGlobal("serverBusy", false);
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
  email: string;
  confirmed: boolean;
  pendingEmail: string | null;
  createdAt: string;
  lastLoginAt: string | null;
  termsAcceptedAt: string | null;
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
  rememberSession(account.sessionToken, account.email);
  return account;
}

/** Ends the session on the server, and locally even if that call fails. */
export async function logout(): Promise<void> {
  try {
    await post<void>(ENDPOINT.LOGOUT, {});
  } finally {
    rememberSession(null);
  }
}

/** Who the held token belongs to, or null when it is no longer good. */
export async function currentAccount(): Promise<Account | null> {
  try {
    if (!sessionToken) return null;

    const account = await get<Account>(ENDPOINT.SESSION);
    rememberSession(account.sessionToken, account.email);
    return account;
  } catch (error) {
    if (error instanceof ServerError && error.status === 401) return null;
    throw error;
  } finally {
    setGlobal("sessionChecked", true);
  }
}

export function changeEmail(password: string, email: string): Promise<void> {
  return post<void>(ENDPOINT.CHANGE_EMAIL, { password, email });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const result = await post<{ sessionToken: string }>(ENDPOINT.CHANGE_PASSWORD, {
    currentPassword,
    newPassword
  });
  rememberSession(result.sessionToken, getGlobals().accountEmail);
}

export async function resendConfirmation(): Promise<boolean> {
  try {
    await post<void>(ENDPOINT.RESEND_CONFIRMATION, {});
    return true;
  } catch (error) {
    if (error instanceof ServerError && error.status === 409) return false;
    throw error;
  }
}

export async function logoutEverywhere(): Promise<void> {
  try {
    await post<void>(ENDPOINT.LOGOUT_ALL, {});
  } finally {
    rememberSession(null);
  }
}

export async function deleteAccount(password: string): Promise<void> {
  await post<void>(ENDPOINT.DELETE_ACCOUNT, { password });
  rememberSession(null);
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
