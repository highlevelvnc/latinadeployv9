import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  observations?: string;
}

const RESERVATION_TO = 'latinagrill@icloud.com';
const RESERVATION_FROM = 'Latina Grill <onboarding@resend.dev>';

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

  // Periodic cleanup to prevent unbounded map growth
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

// ─── HTML escape ─────────────────────────────────────────────────────────────
// Required because user-supplied strings are interpolated into the email HTML.

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Stricter escape for href="tel:..." — keep digits, +, spaces, parens, dashes
function sanitizePhoneForHref(value: string): string {
  return value.replace(/[^\d+\s()\-]/g, '').slice(0, 30);
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
  return null;
}

// ─── Email ───────────────────────────────────────────────────────────────────

async function sendReservationEmail(data: ReservationData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[Latina Grill] Reservation received (RESEND_API_KEY not configured):', data);
    return;
  }

  const resend = new Resend(apiKey);
  const receivedAt = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

  // Plain text — no escaping needed
  const text = `
Nova Reserva — Latina Grill Cascais
=====================================
Nome:          ${data.name}
Telefone:      ${data.phone}
Data:          ${data.date}
Hora:          ${data.time}
Nº de pessoas: ${data.guests}
${data.observations ? `Observações:   ${data.observations}` : ''}
=====================================
Recebido em: ${receivedAt}
  `.trim();

  // HTML — every user-supplied value MUST be escaped before interpolation
  const e = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    phoneHref: sanitizePhoneForHref(data.phone),
    date: escapeHtml(data.date),
    time: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
    observations: data.observations ? escapeHtml(data.observations) : '',
    receivedAt: escapeHtml(receivedAt),
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1a1a1a; color: #f5f0e6; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">LATINA GRILL CASCAIS</h1>
        <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.8;">Nova Reserva Recebida</p>
      </div>
      <div style="padding: 24px; background: #fafafa; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #666; width: 130px;">Nome</td><td style="padding: 8px 0; font-weight: 600;">${e.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Telefone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${e.phoneHref}" style="color: #1a1a1a; text-decoration: none;">${e.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Data</td><td style="padding: 8px 0; font-weight: 600;">${e.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Hora</td><td style="padding: 8px 0; font-weight: 600;">${e.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Nº de pessoas</td><td style="padding: 8px 0; font-weight: 600;">${e.guests}</td></tr>
          ${e.observations ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Observações</td><td style="padding: 8px 0;">${e.observations}</td></tr>` : ''}
        </table>
        <p style="margin: 24px 0 0; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #999;">Recebido em ${e.receivedAt}</p>
      </div>
    </div>
  `.trim();

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: RESERVATION_TO,
    subject: `Nova Reserva — ${data.name} — ${data.date} às ${data.time} (${data.guests} pax)`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Cheap rate-limit check first — before parsing body
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
      date: trimToMax(body.date, 20),
      time: trimToMax(body.time, 10),
      guests: Number.parseInt(String(body.guests), 10),
      observations: trimToMax(body.observations, 500) || undefined,
    };

    const validationError = validate(data);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    try {
      await sendReservationEmail(data);
    } catch (emailError) {
      // Email failed — log on server, but don't fail the user (we received the data)
      console.error('[Latina Grill] Email delivery failed:', emailError);
    }

    return NextResponse.json(
      { success: true, message: 'Reservation received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Latina Grill] Reservation handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
