import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  observations?: string;
}

const RESERVATION_TO = 'latinagrill@icloud.com';
// Custom domain authenticated in Resend (SPF + DKIM + DMARC + MX configured
// via dominios.pt). Authenticated sender → no spam folder on iCloud.
const RESERVATION_FROM = 'Latina Grill <reservas@latinagrill.pt>';
// Replies from clients route to the real iCloud inbox, since reservas@ is
// a send-only address (no mailbox).
const RESERVATION_REPLY_TO = 'latinagrill@icloud.com';

const RESTAURANT_PHONE = '+351 968 707 515';
const RESTAURANT_ADDRESS = 'Rua Frederico Arouca 25, 2750-353 Cascais';
const RESTAURANT_MAPS_URL = 'https://maps.google.com/?q=Latina+Grill+Cascais+Rua+Frederico+Arouca+25';
const SITE_URL = 'https://latinagrill.pt';

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
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'invalid_email';
  }
  return null;
}

// Format ISO date (YYYY-MM-DD) to a human-friendly Portuguese form.
function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  // Use noon UTC to avoid timezone shifting the date
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return date.toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Lisbon',
  });
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
Telefone:      ${data.phone}${data.email ? `\nEmail:         ${data.email}` : ''}
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
    email: data.email ? escapeHtml(data.email) : '',
    date: escapeHtml(data.date),
    time: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
    observations: data.observations ? escapeHtml(data.observations) : '',
    receivedAt: escapeHtml(receivedAt),
  };

  const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Reserva — ${e.name}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e5e5e5;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0a;padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:4px;color:#DC2626;text-transform:uppercase;">Nova Reserva</p>
                    <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#f5f0e6;letter-spacing:3px;">LATINA GRILL CASCAIS</p>
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#888;">${e.receivedAt}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Big summary line -->
          <tr>
            <td style="padding:32px 32px 24px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1a1a1a;line-height:1.4;">
                <strong style="color:#DC2626;">${e.name}</strong> — ${e.date} às ${e.time}
                <br><span style="font-size:16px;color:#666;">${e.guests} ${data.guests === 1 ? 'pessoa' : 'pessoas'}</span>
              </p>
            </td>
          </tr>

          <!-- Contact actions — quick tap on mobile -->
          <tr>
            <td style="padding:24px 32px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:50%;padding-right:6px;">
                    <a href="tel:${e.phoneHref}" style="display:block;padding:14px;background-color:#0a0a0a;color:#f5f0e6;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;text-align:center;font-weight:600;">📞 ${e.phone}</a>
                  </td>
                  <td style="width:50%;padding-left:6px;">
                    ${e.email
                      ? `<a href="mailto:${e.email}" style="display:block;padding:14px;background-color:#1a1a1a;color:#f5f0e6;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;text-align:center;font-weight:600;">✉️ Responder</a>`
                      : `<div style="display:block;padding:14px;background-color:#e5e5e5;color:#999;font-family:Arial,sans-serif;font-size:13px;text-align:center;">Sem email</div>`
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full details table -->
          <tr>
            <td style="padding:8px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;">
                <tr>
                  <td style="padding:10px 0;color:#888;width:120px;border-bottom:1px solid #f0f0f0;">Nome</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Telefone</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;"><a href="tel:${e.phoneHref}" style="color:#1a1a1a;text-decoration:none;">${e.phone}</a></td>
                </tr>
                ${e.email ? `
                <tr>
                  <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Email</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;"><a href="mailto:${e.email}" style="color:#1a1a1a;text-decoration:none;">${e.email}</a></td>
                </tr>` : ''}
                <tr>
                  <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Data</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.date}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Hora</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.time}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;${e.observations ? 'border-bottom:1px solid #f0f0f0;' : ''}">Pessoas</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-weight:600;${e.observations ? 'border-bottom:1px solid #f0f0f0;' : ''}">${e.guests}</td>
                </tr>
                ${e.observations ? `
                <tr>
                  <td style="padding:10px 0;color:#888;vertical-align:top;">Observações</td>
                  <td style="padding:10px 0;color:#1a1a1a;background-color:#fffce5;padding-left:8px;border-left:3px solid #DC2626;">${e.observations}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:16px 32px 24px;background-color:#fafafa;border-top:1px solid #e5e5e5;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#999;line-height:1.6;">
                ${e.email
                  ? 'Cliente também recebeu confirmação automática por email.'
                  : 'Cliente não forneceu email — confirma a reserva por telefone.'}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: RESERVATION_TO,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Nova Reserva — ${data.name} — ${data.date} às ${data.time} (${data.guests} pax)`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// ─── Customer confirmation email ─────────────────────────────────────────────
// Premium dark template — only sent when the guest provided an email.

async function sendCustomerConfirmationEmail(data: ReservationData): Promise<void> {
  if (!data.email) return;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);

  const e = {
    name: escapeHtml(data.name),
    firstName: escapeHtml(data.name.split(' ')[0] || data.name),
    dateLong: escapeHtml(formatDateLong(data.date)),
    time: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
    guestsLabel: data.guests === 1 ? 'pessoa' : 'pessoas',
    observations: data.observations ? escapeHtml(data.observations) : '',
    address: escapeHtml(RESTAURANT_ADDRESS),
    phone: escapeHtml(RESTAURANT_PHONE),
    phoneHref: sanitizePhoneForHref(RESTAURANT_PHONE),
  };

  const text = `
Olá ${data.name},

A sua reserva no Latina Grill Cascais foi recebida.

Data:    ${formatDateLong(data.date)}
Hora:    ${data.time}
Pessoas: ${data.guests}
${data.observations ? `Observações: ${data.observations}\n` : ''}
Morada: ${RESTAURANT_ADDRESS}
Telefone: ${RESTAURANT_PHONE}

Para alterar ou cancelar a sua reserva, contacte-nos diretamente respondendo a este email ou por telefone.

Aguardamos a sua visita.

— Latina Grill Cascais
${SITE_URL}
  `.trim();

  const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reserva Confirmada — Latina Grill Cascais</title>
  <!--[if mso]>
  <style>body,table,td{font-family:Georgia,'Times New Roman',serif !important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;color:#f5f0e6;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">A sua reserva para ${e.dateLong} às ${e.time} foi recebida.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#0f0f0f;">

          <!-- Gold accent top -->
          <tr>
            <td style="background:linear-gradient(90deg,#0f0f0f 0%,#d4af6e 50%,#0f0f0f 100%);height:2px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Brand -->
          <tr>
            <td align="center" style="padding:40px 32px 8px;">
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:6px;text-transform:uppercase;">Reserva Confirmada</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#f5f0e6;letter-spacing:6px;">LATINA&nbsp;GRILL</p>
              <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#666;letter-spacing:5px;">CASCAIS&nbsp;·&nbsp;EST.&nbsp;2014</p>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td style="padding:32px 0 0;">
              <img src="${SITE_URL}/chapacarne.webp" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding:48px 32px 8px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:normal;color:#f5f0e6;line-height:1.15;letter-spacing:1px;">À mesa,<br><em style="color:#d4af6e;font-style:italic;">em breve.</em></h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td align="center" style="padding:24px 56px 0;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#bbb;line-height:1.8;">
                Olá ${e.firstName}, recebemos a sua reserva. Será um prazer recebê-lo na nossa casa.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:40px 32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height:1px;width:60px;background-color:#d4af6e;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Reservation details -->
          <tr>
            <td style="padding:0 48px 32px;">
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;text-align:center;">A Sua Reserva</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:14px 0;color:#888;width:110px;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Data</td>
                  <td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;text-transform:capitalize;">${e.dateLong}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;color:#888;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hora</td>
                  <td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;">${e.time}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;color:#888;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Pessoas</td>
                  <td style="padding:14px 0;color:#f5f0e6;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Georgia,serif;font-size:16px;">${e.guests} ${e.guestsLabel}</td>
                </tr>
                ${e.observations ? `
                <tr>
                  <td style="padding:14px 0;color:#888;vertical-align:top;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Notas</td>
                  <td style="padding:14px 0;color:#f5f0e6;font-family:Georgia,serif;font-size:15px;line-height:1.7;font-style:italic;">"${e.observations}"</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Location -->
          <tr>
            <td align="center" style="padding:32px 32px 0;background-color:#080808;border-top:1px solid #1f1c18;">
              <p style="margin:32px 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;">Encontre-nos</p>
              <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#f5f0e6;line-height:1.5;">${e.address}</p>
              <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#888;letter-spacing:1px;">
                <a href="tel:${e.phoneHref}" style="color:#888;text-decoration:none;">${e.phone}</a>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border:1px solid #d4af6e;">
                    <a href="${RESTAURANT_MAPS_URL}" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d4af6e;letter-spacing:3px;text-decoration:none;text-transform:uppercase;font-weight:600;">Ver no Mapa</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cancel/modify note -->
          <tr>
            <td align="center" style="padding:32px 48px;background-color:#0a0a0a;">
              <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#888;line-height:1.8;font-style:italic;">
                Precisa alterar ou cancelar? Responda a este email ou ligue-nos diretamente.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:32px;border-top:1px solid #1f1c18;background-color:#050505;">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#f5f0e6;letter-spacing:4px;">LATINA GRILL CASCAIS</p>
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#666;letter-spacing:1px;">A casa do churrasco</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;">
                <a href="${SITE_URL}" style="color:#d4af6e;text-decoration:none;letter-spacing:2px;">latinagrill.pt</a>
              </p>
            </td>
          </tr>

          <!-- Gold accent bottom -->
          <tr>
            <td style="background:linear-gradient(90deg,#0a0a0a 0%,#d4af6e 50%,#0a0a0a 100%);height:2px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: data.email,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Reserva confirmada — ${formatDateLong(data.date)} às ${data.time}`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend customer error: ${error.message}`);
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

    // Send both emails in parallel — restaurant notification + customer confirmation.
    // Settled (not all): one failure should not block the other from being sent.
    const results = await Promise.allSettled([
      sendReservationEmail(data),
      sendCustomerConfirmationEmail(data),
    ]);
    for (const r of results) {
      if (r.status === 'rejected') {
        console.error('[Latina Grill] Email delivery failed:', r.reason);
      }
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
