// ─── SMS via Twilio ──────────────────────────────────────────────────────────
//
// Best-effort SMS dispatch. A SMS failure must NEVER block the email flow,
// because email is the source of truth (template + tracking via Resend).
//
// Costs (April 2026, approximate):
//   PT outbound SMS  ~$0.04 / message
//   BR outbound SMS  ~$0.05 / message
//
// Sender:
//   Uses an Alphanumeric Sender ID (e.g. "LatinaGrill") which is free —
//   no Twilio number purchase required. Works in PT/BR/EU. In countries
//   that don't allow alpha senders (US/CA) Twilio falls back to a generic
//   short code automatically.
//
// SMS body: keep ≤ 160 chars (1 SMS unit) when possible. Twilio segments
// longer bodies but each segment is billed separately.

let cachedClient: import('twilio').Twilio | null | undefined;

function getClient(): import('twilio').Twilio | null {
  if (cachedClient !== undefined) return cachedClient;

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    cachedClient = null;
    return null;
  }

  // Lazy import — Twilio SDK is heavy; only load when actually used.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const twilio = require('twilio') as typeof import('twilio');
  cachedClient = twilio(sid, token);
  return cachedClient;
}

// ─── E.164 phone normalization ──────────────────────────────────────────────
// Twilio requires E.164 format: + followed by digits, no spaces or symbols.
// Input may be like "+351 968 707 515" or "351968707515" or "968707515" (PT).

export function toE164(phone: string, defaultCountryCode = '351'): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned) return null;

  // Already E.164 (starts with +)
  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1);
    if (digits.length < 8 || digits.length > 15) return null;
    return cleaned;
  }

  // Heuristic: numbers 9 digits long with no country prefix → assume default
  if (cleaned.length === 9) return `+${defaultCountryCode}${cleaned}`;

  // Numbers 10–15 digits → assume already includes country code
  if (cleaned.length >= 10 && cleaned.length <= 15) return `+${cleaned}`;

  return null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Short date for SMS bodies: "15 mai." (15 maio) — saves chars vs full date.
export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Lisbon',
  });
}

// ─── Send ────────────────────────────────────────────────────────────────────

interface SendSmsOptions {
  to: string;        // any phone format; will be normalized to E.164
  body: string;      // SMS body, ≤ 160 chars recommended
}

export async function sendSMS({ to, body }: SendSmsOptions): Promise<void> {
  const client = getClient();
  if (!client) {
    console.log('[Latina Grill] SMS skipped (TWILIO_* not configured):', { to: to.slice(0, 6) + '…', body: body.slice(0, 50) });
    return;
  }

  const from = process.env.TWILIO_FROM || 'LatinaGrill';
  const e164 = toE164(to);
  if (!e164) {
    console.warn('[Latina Grill] SMS skipped: invalid phone format', { to: to.slice(0, 6) + '…' });
    return;
  }

  try {
    await client.messages.create({
      to: e164,
      from,
      body,
    });
  } catch (err) {
    // Common reasons: invalid number, country not enabled, low balance.
    // Log but don't throw — email is the source of truth.
    console.error('[Latina Grill] SMS send failed:', (err as Error).message);
  }
}
