/**
 * Helpers for QR-code table identification.
 * A table number is any non-empty string up to 10 chars; numerics are normalised
 * to remove leading zeros (e.g. "04" → "4").
 */

const MAX_LENGTH = 10;
const ALLOWED = /^[a-zA-Z0-9\-_]+$/;

/**
 * Validates and normalises a raw table value coming from a URL query param.
 * Returns the normalised string, or null if the value is invalid/empty.
 */
export function normalizeTable(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().slice(0, MAX_LENGTH);
  if (!ALLOWED.test(trimmed)) return null;
  // Strip leading zeros from purely numeric values
  if (/^\d+$/.test(trimmed)) {
    return String(parseInt(trimmed, 10));
  }
  return trimmed;
}

/** Returns true if the string is a valid (non-null) table value. */
export function isValidTable(value: string | null | undefined): value is string {
  return normalizeTable(value) !== null;
}
