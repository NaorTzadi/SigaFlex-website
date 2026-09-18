/**
 * The only class that talks to the server. Everything else calls a method here
 * and gets back what the server gave, or an error.
 *
 * The base URL is an environment variable. No key or endpoint is written into
 * any other file.
 */

import { setGlobal } from "./Globals";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

/** Every path the site asks the server for. Nothing outside this file names one. */
const ENDPOINT = {
  REGISTER: "/auth/register"
} as const;

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
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      ...init
    });

    if (!response.ok) throw new ServerError(response.status, response.statusText);
    return (await response.json()) as T;
  } finally {
    setGlobal("serverBusy", false);
  }
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

/** True when a server has been configured at all. The skeleton ships without one. */
export function isConfigured(): boolean {
  return BASE_URL.length > 0;
}

/* --- registration ---------------------------------------------------- */

export type RegistrationRequest = {
  email: string;
  password: string;
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
