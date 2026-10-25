/**
 * The only class that touches document.cookie.
 * It owns the cookie names; every other class asks for one by id.
 *
 * Consent gate: NECESSARY cookies are written always. Anything else is written
 * only once the reader has accepted, and is cleared if they decline.
 */

export const COOKIE = {
  /** "accepted" | "declined". Necessary: it records the answer itself. */
  CONSENT: "fa_consent",
  /** The token that signs the reader back in on their next visit. Necessary: it is the sign-in. */
  REMEMBER: "fa_remember"
} as const;

export type CookieId = (typeof COOKIE)[keyof typeof COOKIE];

/** Cookies written regardless of consent, because the site cannot work without them. */
/* SAFEGUARD PRIV-001 — see SAFEGUARDS.md */
const NECESSARY: CookieId[] = [COOKIE.CONSENT, COOKIE.REMEMBER];

export type ConsentAnswer = "accepted" | "declined";

const ONE_YEAR_DAYS = 365;

export function get(id: CookieId): string | null {
  const prefix = `${id}=`;
  const hit = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
  return hit ? decodeURIComponent(hit.slice(prefix.length)) : null;
}

export function set(id: CookieId, value: string, days: number = ONE_YEAR_DAYS): void {
  /* SAFEGUARD PRIV-001 — see SAFEGUARDS.md */
  if (!NECESSARY.includes(id) && consent() !== "accepted") return;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${id}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function remove(id: CookieId): void {
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export function consent(): ConsentAnswer | null {
  const stored = get(COOKIE.CONSENT);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

/** Records the answer and, on a decline, drops everything that is not necessary. */
export function answerConsent(answer: ConsentAnswer): void {
  const expires = new Date(Date.now() + ONE_YEAR_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE.CONSENT}=${answer}; expires=${expires}; path=/; SameSite=Lax`;

  /* SAFEGUARD PRIV-001 — see SAFEGUARDS.md */
  if (answer === "declined") {
    Object.values(COOKIE)
      .filter((id) => !NECESSARY.includes(id))
      .forEach(remove);
  }
}
