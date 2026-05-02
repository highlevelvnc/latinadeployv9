import { NextRequest, NextResponse } from 'next/server';
import {
  generateReservationId,
  signReservationToken,
  type ReservationTokenPayload,
} from '@/lib/reservation-token';
import {
  sendCustomerPendingEmail,
  sendOwnerNewRequestEmail,
} from '@/lib/reservation-email';
import { saveNewPending } from '@/lib/reservation-store';
import { sendSMS, formatDateShort } from '@/lib/sms';

interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  observations?: string;
}

// ─── Anti-spam thresholds ────────────────────────────────────────────────────
// Forms submitted in under 2s of mounting are bots (humans take longer to type
// even a single field). 30 days catches stale tabs left open by humans without
// flagging them as bots — very generous upper bound.
const MIN_FORM_DURATION_MS = 2000;
const MAX_FORM_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

// ─── Rate limiting (in-memory, best-effort) ──────────────────────────────────
// Limit: 3 reservations per IP per 10 minutes.
// Caveat: per-instance only. On Vercel serverless, a determined attacker could
// hit cold instances to bypass it. Adequate for casual spam; for production-
// grade protection, upgrade to Upstash Ratelimit (Redis-backed).

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const fresh = (ipRequests.get(ip) ?? []).filter((t) => t > cutoff);

  if (fresh.length >= RATE_LIMIT_MAX) {
    ipRequests.set(ip, fresh);
    return true;
  }

  fresh.push(now);
  ipRequests.set(ip, fresh);

  if (ipRequests.size > 1000) {
    for (const [key, ts] of ipRequests.entries()) {
      const kept = ts.filter((t) => t > cutoff);
      if (kept.length === 0) ipRequests.delete(key);
      else ipRequests.set(key, kept);
    }
  }

  return false;
}

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = req.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

// ─── Validation ──────────────────────────────────────────────────────────────

// Escapes HTML special chars to neutralize XSS payloads in user-supplied
// strings before they get embedded into HTML emails. Defense-in-depth: even
// if the email template forgets to escape, this layer prevents stored XSS.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function trimToMax(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

// Phone: digits with optional + prefix and common separators.
// Strips anything weird (e.g. <script>) leaving just the dialable string.
const PHONE_RE = /^[+]?[\d\s\-().]{6,30}$/;

// Time slots accepted for online booking (matches client lunch/dinner lists)
const ALLOWED_TIME_SLOTS = new Set([
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]);

const MAX_DAYS_AHEAD = 90;

function validate(data: ReservationData): string | null {
  if (!data.name || data.name.length < 2) return 'invalid_name';

  if (!data.phone || !PHONE_RE.test(data.phone)) return 'invalid_phone';

  // Format check
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return 'invalid_date';
  // Real date check (rejects 2026-13-40, 2026-02-31, etc — all valid format)
  const [y, m, d] = data.date.split('-').map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== d
  ) {
    return 'invalid_date';
  }
  // Date window: today → +90d (matches MAX_DAYS_AHEAD on the client)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setUTCDate(max.getUTCDate() + MAX_DAYS_AHEAD);
  if (parsed < today || parsed > max) return 'invalid_date';

  if (!ALLOWED_TIME_SLOTS.has(data.time)) return 'invalid_time';

  if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 50) {
    return 'invalid_guests';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'invalid_email';
  }
  return null;
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      console.warn(`[Latina Grill] Rate limit hit for IP: ${ip}`);
      return NextResponse.json(
        { error: 'rate_limited', message: 'Demasiadas reservas. Tenta de novo em alguns minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // ─── Anti-spam: honeypot ─────────────────────────────────────────────
    // The form has a hidden 'website' field that humans never see. Bots
    // auto-fill it. We silently drop the submission with a 200 OK so the
    // bot thinks it succeeded and doesn't iterate / try alternative paths.
    if (typeof body._website === 'string' && body._website.trim() !== '') {
      console.warn(`[Latina Grill] Honeypot triggered for IP: ${ip}`);
      return NextResponse.json(
        { success: true, message: 'Reservation pending owner approval' },
        { status: 200 },
      );
    }

    // ─── Anti-spam: time-trap ────────────────────────────────────────────
    // Submissions in under 2s = bot. Submissions older than 30 days = stale
    // form (browser autofill from a saved tab) — accept anyway to avoid
    // false-positives on slow humans.
    const formMountedAt = Number(body._t);
    if (Number.isFinite(formMountedAt) && formMountedAt > 0) {
      const elapsed = Date.now() - formMountedAt;
      if (elapsed < MIN_FORM_DURATION_MS) {
        console.warn(
          `[Latina Grill] Time-trap triggered (${elapsed}ms) for IP: ${ip}`,
        );
        return NextResponse.json(
          { success: true, message: 'Reservation pending owner approval' },
          { status: 200 },
        );
      }
      if (elapsed > MAX_FORM_DURATION_MS) {
        // form is older than 30d — almost certainly stale tab, but log it
        console.warn(
          `[Latina Grill] Stale form (${elapsed}ms) for IP: ${ip}, accepting anyway`,
        );
      }
    }

    const data: ReservationData = {
      // HTML-escape free-text fields BEFORE they reach the email template.
      // Defense-in-depth: prevents stored XSS even if the template forgets
      // to escape.
      name: escapeHtml(trimToMax(body.name, 100)),
      phone: trimToMax(body.phone, 30),
      email: trimToMax(body.email, 254).toLowerCase() || undefined,
      date: trimToMax(body.date, 20),
      time: trimToMax(body.time, 10),
      guests: Number.parseInt(String(body.guests), 10),
      observations: escapeHtml(trimToMax(body.observations, 500)) || undefined,
    };

    const validationError = validate(data);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Sign a "pending" admin token. Carries the full reservation; the owner
    // will action it via /admin/reservation/[token].
    const reservationId = generateReservationId();
    const tokenPayload: Omit<ReservationTokenPayload, 'iat' | 'exp'> = {
      ...data,
      reservationId,
      status: 'pending',
    };
    const adminToken = signReservationToken(tokenPayload);

    // Persist the reservation so the daily cron can find it later.
    // Best-effort: a KV outage should not prevent the email flow from running.
    try {
      await saveNewPending({
        id: reservationId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
        observations: data.observations,
      });
    } catch (kvError) {
      console.error('[Latina Grill] KV save failed:', kvError);
    }

    // Fire all messages in parallel; any failure must not block the others.
    const results = await Promise.allSettled([
      sendOwnerNewRequestEmail({ ...tokenPayload, iat: 0, exp: 0 }, adminToken),
      data.email
        ? sendCustomerPendingEmail({ ...tokenPayload, iat: 0, exp: 0 })
        : Promise.resolve(),
      sendSMS({
        to: data.phone,
        body: `Latina Grill: pedido de reserva recebido para ${formatDateShort(data.date)} as ${data.time}. Confirmamos em ate 12h. Tel +351968707515`,
      }),
    ]);
    for (const r of results) {
      if (r.status === 'rejected') {
        console.error('[Latina Grill] Email delivery failed:', r.reason);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Reservation pending owner approval' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Latina Grill] Reservation handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
