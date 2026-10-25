/**
 * Cookie / storage consent.
 *
 * This build sets **no cookies and no analytics**. The only thing stored is the
 * acknowledgement below, kept in `localStorage` and never transmitted. The
 * banner therefore offers a single, honest action ("Understood") instead of a
 * fake "Accept all / Reject" pair — there is nothing optional to accept.
 *
 * Should optional cookies be introduced later, bump `CONSENT_VERSION` so every
 * visitor is asked again, and add the new choices here.
 *
 * Parsing is kept pure so it can be unit-tested outside a browser.
 */

export const CONSENT_STORAGE_KEY = 'novus.consent.v1';
export const CONSENT_VERSION = 1;
export const CONSENT_OPEN_EVENT = 'novus:consent-open';

export type ConsentChoice = 'essential';

export interface StoredConsent {
  version: number;
  choice: ConsentChoice;
  /** ISO timestamp of when the acknowledgement was recorded. */
  at: string;
}

/**
 * Validate a raw `localStorage` value.
 *
 * Returns `null` for anything missing, malformed, from an older version, or
 * carrying a choice this build does not understand — in which case the visitor
 * is asked again rather than being silently treated as consenting.
 */
export function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!value || typeof value !== 'object') return null;

  const candidate = value as Record<string, unknown>;
  if (candidate.version !== CONSENT_VERSION) return null;
  if (candidate.choice !== 'essential') return null;
  if (typeof candidate.at !== 'string' || Number.isNaN(Date.parse(candidate.at))) return null;

  return { version: CONSENT_VERSION, choice: 'essential', at: candidate.at };
}

/** Build the value written when the visitor acknowledges the notice. */
export function createConsent(now: Date = new Date()): StoredConsent {
  return { version: CONSENT_VERSION, choice: 'essential', at: now.toISOString() };
}

/** True when the notice should be shown (nothing valid has been stored yet). */
export function shouldShowConsent(raw: string | null): boolean {
  return parseConsent(raw) === null;
}

/* ------------------------------------------------------------------ *
 * Browser helpers. Every access is guarded: storage can throw in       *
 * private mode or when the visitor blocks site data.                   *
 * ------------------------------------------------------------------ */

export function readStoredConsent(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeConsent(consent: StoredConsent): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* Storage unavailable: the notice will simply appear again next visit. */
  }
}

export function clearStoredConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* Nothing to do. */
  }
}

/** Re-open the notice from elsewhere in the UI (footer "Cookie settings"). */
export function requestConsentOpen(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
