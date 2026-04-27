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

function trimToMax(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

function validate(data: ReservationData): string | null {
  if (!data.name || data.name.length < 2) return 'invalid_name';
  if (!data.phone || data.phone.length < 6) return 'invalid_phone';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return 'invalid_date';
  if (!/^\d{1,2}:\d{2}/.test(data.time)) return 'invalid_time';
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

    const data: ReservationData = {
      name: trimToMax(body.name, 100),
      phone: trimToMax(body.phone, 30),
      email: trimToMax(body.email, 254).toLowerCase() || undefined,
      date: trimToMax(body.date, 20),
      time: trimToMax(body.time, 10),
      guests: Number.parseInt(String(body.guests), 10),
      observations: trimToMax(body.observations, 500) || undefined,
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
