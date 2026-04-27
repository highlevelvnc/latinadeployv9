import crypto from 'node:crypto';

// ─── Reservation token (HMAC-SHA256, stateless) ──────────────────────────────
//
// Tokens are signed with a server-side secret and embed the full reservation
// payload + status. We do not persist anything: each link carries its own state.
//
// Trade-offs:
//   - No DB needed (zero extra infra cost on Vercel free tier).
//   - Tokens are one-shot in spirit — if the owner clicks the same admin link
//     twice they will see the action confirmation page each time, but the
//     status flag inside the token never advances. To advance the flow we
//     mint a brand-new token at each transition.
//   - Replay protection is good-enough for this use case (token expires after
//     72h, links live in private inboxes, secret is rotated only manually).
//
// Token format:  base64url(payload) + "." + base64url(hmac_sha256(payload))

const SECRET_ENV = 'RESERVATION_TOKEN_SECRET';

export type ReservationStatus =
  | 'pending'              // owner has not actioned yet
  | 'alternative-offered'; // owner suggested 1–3 other slots, waiting on customer

export interface ReservationTokenPayload {
  // Reservation data (escaped/sanitized at the API boundary)
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  observations?: string;

  // Audit
  reservationId: string; // random id (we keep one per reservation across mints)
  status: ReservationStatus;

  // For 'alternative-offered' tokens
  alternatives?: string[];        // proposed slot strings ('19:00' etc)
  proposalMessage?: string;       // free-text from the owner

  // Lifecycle
  iat: number; // issued at (ms)
  exp: number; // expiry (ms)
}

function getSecret(): string {
  const secret = process.env[SECRET_ENV];
  if (!secret || secret.length < 32) {
    throw new Error(
      `${SECRET_ENV} not set or too short — generate one with: openssl rand -hex 64`
    );
  }
  return secret;
}

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function b64urlDecode(str: string): Buffer {
  // Restore standard base64 padding before decoding
  const pad = str.length % 4;
  const padded = pad ? str + '='.repeat(4 - pad) : str;
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

export function signReservationToken(
  payload: Omit<ReservationTokenPayload, 'iat' | 'exp'>,
  ttlMs: number = 72 * 60 * 60 * 1000, // 72h default
): string {
  const now = Date.now();
  const full: ReservationTokenPayload = {
    ...payload,
    iat: now,
    exp: now + ttlMs,
  };
  const json = JSON.stringify(full);
  const payloadB64 = b64urlEncode(Buffer.from(json, 'utf8'));
  const sig = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest();
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

export function verifyReservationToken(
  token: string,
): ReservationTokenPayload | null {
  const dot = token.indexOf('.');
  if (dot < 1) return null;

  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  if (!payloadB64 || !sigB64) return null;

  const expected = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest();

  let provided: Buffer;
  try {
    provided = b64urlDecode(sigB64);
  } catch {
    return null;
  }

  if (provided.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(provided, expected)) return null;

  let parsed: ReservationTokenPayload;
  try {
    parsed = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
  } catch {
    return null;
  }

  if (typeof parsed.exp !== 'number' || Date.now() > parsed.exp) return null;
  return parsed;
}

// Generate a short, URL-safe reservation id (no DB; useful for logs/dedupe)
export function generateReservationId(): string {
  return b64urlEncode(crypto.randomBytes(9)); // ~12 chars
}
