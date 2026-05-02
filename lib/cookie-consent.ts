/**
 * Cookie consent — RGPD/Cookie-Law compliant storage helpers.
 *
 * Stored in localStorage as JSON:
 *   { essential: true, analytics: bool, timestamp: ISO }
 *
 * Why localStorage instead of an actual cookie:
 *   - We don't read it server-side, so a cookie offers no benefit
 *   - localStorage is readable from client-side without parse/serialize gymnastics
 *   - Survives across visits the same way
 *
 * Compliance notes:
 *   - Default state when nothing is stored = treat as "no consent yet"
 *     (analytics off). RGPD requires explicit consent — silence ≠ acceptance.
 *   - We store a timestamp so we can re-prompt after 6 months (CNPD/PT
 *     guidance: consent should be renewed periodically).
 *   - "Reject all" must be as easy as "Accept all" — RGPD dark-pattern rule.
 */

export const CONSENT_STORAGE_KEY = 'latina-cookie-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_RENEW_AFTER_DAYS = 180; // re-prompt every 6 months

export type ConsentChoice = {
  version: number;
  essential: true; // always true; included for shape clarity
  analytics: boolean;
  timestamp: string; // ISO date
};

export const ALL_ACCEPTED: Omit<ConsentChoice, 'timestamp'> = {
  version: CONSENT_VERSION,
  essential: true,
  analytics: true,
};

export const ESSENTIAL_ONLY: Omit<ConsentChoice, 'timestamp'> = {
  version: CONSENT_VERSION,
  essential: true,
  analytics: false,
};

/**
 * Reads stored consent. Returns null when no decision has been made yet
 * (or when stored value is older than CONSENT_RENEW_AFTER_DAYS).
 */
export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (parsed.version !== CONSENT_VERSION) return null;

    const stored = new Date(parsed.timestamp).getTime();
    const ageDays = (Date.now() - stored) / (1000 * 60 * 60 * 24);
    if (ageDays > CONSENT_RENEW_AFTER_DAYS) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Omit<ConsentChoice, 'timestamp'>): ConsentChoice {
  const full: ConsentChoice = { ...choice, timestamp: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full));
  } catch {
    // storage may be disabled (private mode, blocked) — silently fail
  }
  // Notify listeners (GTM loader, settings link, etc.)
  window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: full }));
  return full;
}

/**
 * Convenience for components that need to check analytics opt-in
 * synchronously on mount. Returns false when no decision has been made.
 */
export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}
