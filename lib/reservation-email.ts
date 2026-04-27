import { Resend } from 'resend';
import type { ReservationTokenPayload } from './reservation-token';

// ─── Constants ───────────────────────────────────────────────────────────────

export const RESTAURANT_INBOX = 'latinagrill@icloud.com';
// Custom domain authenticated in Resend (SPF + DKIM + DMARC + MX configured
// via dominios.pt). Authenticated sender → no spam folder on iCloud.
export const RESERVATION_FROM = 'Latina Grill <reservas@latinagrill.pt>';
// Replies from clients route to the real iCloud inbox, since reservas@ is
// a send-only address (no mailbox).
export const RESERVATION_REPLY_TO = 'latinagrill@icloud.com';

export const RESTAURANT_PHONE = '+351 968 707 515';
export const RESTAURANT_ADDRESS = 'Rua Frederico Arouca 25, 2750-353 Cascais';
export const RESTAURANT_MAPS_URL =
  'https://maps.google.com/?q=Latina+Grill+Cascais+Rua+Frederico+Arouca+25';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://latinagrill.pt';

const PHONE_HREF = RESTAURANT_PHONE.replace(/[^\d+]/g, '');
const RESPONSE_WINDOW_HOURS = 12;

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function sanitizePhoneForHref(value: string): string {
  return value.replace(/[^\d+\s()\-]/g, '').slice(0, 30);
}

export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return date.toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Lisbon',
  });
}

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

// ─── Reusable email building blocks ──────────────────────────────────────────

const HEAD = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Latina Grill Cascais</title>
<!--[if mso]><style>body,table,td{font-family:Georgia,'Times New Roman',serif !important;}</style><![endif]-->
</head>`;

function shellOpen(): string {
  return `<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;color:#f5f0e6;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#0f0f0f;">
<tr><td style="background:linear-gradient(90deg,#0f0f0f 0%,#d4af6e 50%,#0f0f0f 100%);height:2px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
}

function shellClose(): string {
  return `<tr><td align="center" style="padding:32px;border-top:1px solid #1f1c18;background-color:#050505;">
<p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#f5f0e6;letter-spacing:4px;">LATINA GRILL CASCAIS</p>
<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#666;letter-spacing:1px;">A casa do churrasco</p>
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;">
<a href="${SITE_URL}" style="color:#d4af6e;text-decoration:none;letter-spacing:2px;">latinagrill.pt</a>
</p>
</td></tr>
<tr><td style="background:linear-gradient(90deg,#0a0a0a 0%,#d4af6e 50%,#0a0a0a 100%);height:2px;font-size:0;line-height:0;">&nbsp;</td></tr>
</table></td></tr></table></body></html>`;
}

function brandHeader(eyebrow: string): string {
  return `<tr><td align="center" style="padding:40px 32px 8px;">
<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:6px;text-transform:uppercase;">${eyebrow}</p>
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#f5f0e6;letter-spacing:6px;">LATINA&nbsp;GRILL</p>
<p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#666;letter-spacing:5px;">CASCAIS&nbsp;·&nbsp;EST.&nbsp;2014</p>
</td></tr>`;
}

// ─── (1) CUSTOMER · pending — sent immediately on submission ─────────────────

export async function sendCustomerPendingEmail(
  data: ReservationTokenPayload,
): Promise<void> {
  if (!data.email) return;
  const resend = getResend();
  if (!resend) return;

  const e = {
    firstName: escapeHtml(data.name.split(' ')[0] || data.name),
    dateLong: escapeHtml(formatDateLong(data.date)),
    time: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
    guestsLabel: data.guests === 1 ? 'pessoa' : 'pessoas',
    observations: data.observations ? escapeHtml(data.observations) : '',
  };

  const text = `Olá ${data.name},

Recebemos o seu pedido de reserva e estamos a confirmá-lo internamente.
Receberá um email de confirmação em até ${RESPONSE_WINDOW_HOURS} horas.

Detalhes do seu pedido:
  Data:    ${formatDateLong(data.date)}
  Hora:    ${data.time}
  Pessoas: ${data.guests}
${data.observations ? `  Notas:   ${data.observations}\n` : ''}
Se for urgente, ligue ${RESTAURANT_PHONE}.

— Latina Grill Cascais`;

  const html = `${HEAD}${shellOpen()}
${brandHeader('Pedido recebido')}

<tr><td align="center" style="padding:40px 32px 0;">
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:38px;font-weight:normal;color:#f5f0e6;line-height:1.15;letter-spacing:1px;">
Estamos a<br><em style="color:#d4af6e;font-style:italic;">confirmar</em>.
</h1>
</td></tr>

<tr><td align="center" style="padding:24px 56px 0;">
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#bbb;line-height:1.8;">
Olá ${e.firstName}, recebemos o seu pedido. A nossa equipa vai confirmar a disponibilidade e responder em <strong style="color:#f5f0e6;">até ${RESPONSE_WINDOW_HOURS} horas</strong>.
</p>
</td></tr>

<tr><td align="center" style="padding:40px 32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:1px;width:60px;background-color:#d4af6e;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>
</td></tr>

<tr><td style="padding:0 48px 32px;">
<p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;text-align:center;">Detalhes do Pedido</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:14px 0;color:#888;width:110px;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Data</td>
<td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;text-transform:capitalize;">${e.dateLong}</td></tr>
<tr><td style="padding:14px 0;color:#888;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hora</td>
<td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;">${e.time}</td></tr>
<tr><td style="padding:14px 0;color:#888;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Pessoas</td>
<td style="padding:14px 0;color:#f5f0e6;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Georgia,serif;font-size:16px;">${e.guests} ${e.guestsLabel}</td></tr>
${e.observations ? `<tr><td style="padding:14px 0;color:#888;vertical-align:top;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Notas</td>
<td style="padding:14px 0;color:#f5f0e6;font-family:Georgia,serif;font-size:15px;line-height:1.7;font-style:italic;">"${e.observations}"</td></tr>` : ''}
</table>
</td></tr>

<tr><td align="center" style="padding:0 48px 40px;">
<p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#888;line-height:1.7;font-style:italic;">
Caso seja urgente, contacte-nos por telefone:<br>
<a href="tel:${PHONE_HREF}" style="color:#d4af6e;text-decoration:none;font-size:15px;font-style:normal;letter-spacing:1px;">${RESTAURANT_PHONE}</a>
</p>
</td></tr>

${shellClose()}`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: data.email,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Pedido recebido — confirmação em até ${RESPONSE_WINDOW_HOURS}h`,
    text,
    html,
  });
  if (error) throw new Error(`Customer pending email: ${error.message}`);
}

// ─── (2) CUSTOMER · confirmed — sent after owner approves ───────────────────

export async function sendCustomerConfirmedEmail(
  data: ReservationTokenPayload,
): Promise<void> {
  if (!data.email) return;
  const resend = getResend();
  if (!resend) return;

  const e = {
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

  const text = `Olá ${data.name},

A sua reserva está confirmada.

Data:    ${formatDateLong(data.date)}
Hora:    ${data.time}
Pessoas: ${data.guests}

Morada:   ${RESTAURANT_ADDRESS}
Telefone: ${RESTAURANT_PHONE}

Aguardamos a sua visita.

— Latina Grill Cascais`;

  const html = `${HEAD}${shellOpen()}
${brandHeader('Reserva Confirmada')}

<tr><td style="padding:32px 0 0;">
<img src="${SITE_URL}/chapacarne.webp" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">
</td></tr>

<tr><td align="center" style="padding:48px 32px 8px;">
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:normal;color:#f5f0e6;line-height:1.15;letter-spacing:1px;">
À mesa,<br><em style="color:#d4af6e;font-style:italic;">em breve.</em>
</h1>
</td></tr>

<tr><td align="center" style="padding:24px 56px 0;">
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#bbb;line-height:1.8;">
Olá ${e.firstName}, a sua reserva foi confirmada. Será um prazer recebê-lo na nossa casa.
</p>
</td></tr>

<tr><td align="center" style="padding:40px 32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:1px;width:60px;background-color:#d4af6e;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>
</td></tr>

<tr><td style="padding:0 48px 32px;">
<p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;text-align:center;">A Sua Reserva</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:14px 0;color:#888;width:110px;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Data</td>
<td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;text-transform:capitalize;">${e.dateLong}</td></tr>
<tr><td style="padding:14px 0;color:#888;border-bottom:1px solid #1f1c18;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hora</td>
<td style="padding:14px 0;color:#f5f0e6;border-bottom:1px solid #1f1c18;font-family:Georgia,serif;font-size:16px;">${e.time}</td></tr>
<tr><td style="padding:14px 0;color:#888;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Pessoas</td>
<td style="padding:14px 0;color:#f5f0e6;${e.observations ? 'border-bottom:1px solid #1f1c18;' : ''}font-family:Georgia,serif;font-size:16px;">${e.guests} ${e.guestsLabel}</td></tr>
${e.observations ? `<tr><td style="padding:14px 0;color:#888;vertical-align:top;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Notas</td>
<td style="padding:14px 0;color:#f5f0e6;font-family:Georgia,serif;font-size:15px;line-height:1.7;font-style:italic;">"${e.observations}"</td></tr>` : ''}
</table>
</td></tr>

<tr><td align="center" style="padding:32px 32px 0;background-color:#080808;border-top:1px solid #1f1c18;">
<p style="margin:32px 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;">Encontre-nos</p>
<p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#f5f0e6;line-height:1.5;">${e.address}</p>
<p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#888;letter-spacing:1px;">
<a href="tel:${e.phoneHref}" style="color:#888;text-decoration:none;">${e.phone}</a>
</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px;">
<tr><td style="border:1px solid #d4af6e;">
<a href="${RESTAURANT_MAPS_URL}" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d4af6e;letter-spacing:3px;text-decoration:none;text-transform:uppercase;font-weight:600;">Ver no Mapa</a>
</td></tr></table>
</td></tr>

<tr><td align="center" style="padding:32px 48px;background-color:#0a0a0a;">
<p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#888;line-height:1.8;font-style:italic;">
Precisa alterar ou cancelar? Responda a este email ou ligue-nos diretamente.
</p>
</td></tr>

${shellClose()}`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: data.email,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Reserva confirmada — ${formatDateLong(data.date)} às ${data.time}`,
    text,
    html,
  });
  if (error) throw new Error(`Customer confirmed email: ${error.message}`);
}

// ─── (3) CUSTOMER · declined with reason ─────────────────────────────────────

export async function sendCustomerDeclinedEmail(
  data: ReservationTokenPayload,
  reason: string,
): Promise<void> {
  if (!data.email) return;
  const resend = getResend();
  if (!resend) return;

  const e = {
    firstName: escapeHtml(data.name.split(' ')[0] || data.name),
    dateLong: escapeHtml(formatDateLong(data.date)),
    time: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
    reason: escapeHtml(reason),
    phone: escapeHtml(RESTAURANT_PHONE),
    phoneHref: sanitizePhoneForHref(RESTAURANT_PHONE),
  };

  const text = `Olá ${data.name},

Lamentamos não conseguir confirmar a sua reserva para ${formatDateLong(data.date)} às ${data.time}.

Motivo: ${reason}

Adoraríamos recebê-lo noutra ocasião — basta responder a este email ou ligar para ${RESTAURANT_PHONE}.

— Latina Grill Cascais`;

  const html = `${HEAD}${shellOpen()}
${brandHeader('Não foi possível confirmar')}

<tr><td align="center" style="padding:40px 32px 0;">
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:normal;color:#f5f0e6;line-height:1.2;letter-spacing:1px;">
Lamentamos<br><em style="color:#d4af6e;font-style:italic;">imensamente.</em>
</h1>
</td></tr>

<tr><td align="center" style="padding:24px 56px 0;">
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#bbb;line-height:1.8;">
Olá ${e.firstName}, infelizmente não conseguimos confirmar a sua reserva para <strong style="color:#f5f0e6;text-transform:capitalize;">${e.dateLong}</strong> às <strong style="color:#f5f0e6;">${e.time}</strong>.
</p>
</td></tr>

<tr><td style="padding:32px 48px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:24px;background-color:#1a1610;border-left:3px solid #d4af6e;">
<p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:3px;text-transform:uppercase;">Motivo</p>
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#f5f0e6;line-height:1.6;">${e.reason}</p>
</td></tr></table>
</td></tr>

<tr><td align="center" style="padding:32px 48px 8px;">
<p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#bbb;line-height:1.8;">
Adoraríamos recebê-lo noutra ocasião. Se quiser tentar uma data ou hora diferente, basta responder a este email ou contactar-nos diretamente.
</p>
</td></tr>

<tr><td align="center" style="padding:32px 32px 48px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="border:1px solid #d4af6e;">
<a href="tel:${e.phoneHref}" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d4af6e;letter-spacing:3px;text-decoration:none;text-transform:uppercase;font-weight:600;">Ligar &nbsp;${e.phone}</a>
</td></tr></table>
</td></tr>

${shellClose()}`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: data.email,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Não foi possível confirmar a sua reserva — ${formatDateLong(data.date)}`,
    text,
    html,
  });
  if (error) throw new Error(`Customer declined email: ${error.message}`);
}

// ─── (4) CUSTOMER · alternative offered with action buttons ──────────────────

export async function sendCustomerAlternativeOfferedEmail(
  data: ReservationTokenPayload,
  customerToken: string,
): Promise<void> {
  if (!data.email) return;
  if (!data.alternatives || data.alternatives.length === 0) return;
  const resend = getResend();
  if (!resend) return;

  const baseUrl = `${SITE_URL}/reservation/${encodeURIComponent(customerToken)}`;

  const e = {
    firstName: escapeHtml(data.name.split(' ')[0] || data.name),
    dateLong: escapeHtml(formatDateLong(data.date)),
    time: escapeHtml(data.time),
    proposalMessage: data.proposalMessage ? escapeHtml(data.proposalMessage) : '',
  };

  const altsText = data.alternatives.map((a) => `  · ${a}`).join('\n');
  const altsHtml = data.alternatives
    .map((alt) => {
      const safe = escapeHtml(alt);
      return `<tr><td style="padding:0 0 12px;">
<a href="${baseUrl}?accept=${encodeURIComponent(alt)}" style="display:block;padding:18px 20px;background-color:#0f0f0f;border:1px solid #d4af6e;text-decoration:none;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#f5f0e6;letter-spacing:1px;">${safe}</td>
<td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d4af6e;letter-spacing:3px;text-transform:uppercase;text-align:right;">Aceitar →</td>
</tr></table></a></td></tr>`;
    })
    .join('');

  const text = `Olá ${data.name},

A hora pedida (${data.time}) não está disponível para ${formatDateLong(data.date)}.
Mas temos as seguintes alternativas para si:

${altsText}

${data.proposalMessage ? `Mensagem: ${data.proposalMessage}\n\n` : ''}
Para escolher, abra:
${baseUrl}

— Latina Grill Cascais`;

  const html = `${HEAD}${shellOpen()}
${brandHeader('Proposta de Horário')}

<tr><td align="center" style="padding:40px 32px 0;">
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:normal;color:#f5f0e6;line-height:1.2;letter-spacing:1px;">
Temos<br><em style="color:#d4af6e;font-style:italic;">outras opções</em>.
</h1>
</td></tr>

<tr><td align="center" style="padding:24px 56px 0;">
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#bbb;line-height:1.8;">
Olá ${e.firstName}, a hora <strong style="color:#f5f0e6;">${e.time}</strong> em <span style="color:#f5f0e6;text-transform:capitalize;">${e.dateLong}</span> não está disponível, mas conseguimos oferecer-lhe estas alternativas:
</p>
</td></tr>

${e.proposalMessage ? `<tr><td style="padding:32px 48px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:20px 24px;background-color:#1a1610;border-left:3px solid #d4af6e;">
<p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#bbb;line-height:1.7;font-style:italic;">"${e.proposalMessage}"</p>
</td></tr></table>
</td></tr>` : ''}

<tr><td align="center" style="padding:32px 32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:1px;width:60px;background-color:#d4af6e;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>
</td></tr>

<tr><td style="padding:8px 48px 16px;">
<p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#d4af6e;letter-spacing:5px;text-transform:uppercase;text-align:center;">Escolha um Horário</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${altsHtml}
</table>
</td></tr>

<tr><td align="center" style="padding:0 48px 40px;">
<a href="${baseUrl}?decline=1" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#888;letter-spacing:2px;text-decoration:underline;text-transform:uppercase;">Nenhum me serve</a>
</td></tr>

${shellClose()}`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: data.email,
    replyTo: RESERVATION_REPLY_TO,
    subject: `Proposta de horário — ${formatDateLong(data.date)}`,
    text,
    html,
  });
  if (error) throw new Error(`Customer alternative email: ${error.message}`);
}

// ─── (5) OWNER · new request with admin link ─────────────────────────────────

export async function sendOwnerNewRequestEmail(
  data: ReservationTokenPayload,
  adminToken: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.log('[Latina Grill] Reservation received (RESEND_API_KEY missing):', data);
    return;
  }

  const adminUrl = `${SITE_URL}/admin/reservation/${encodeURIComponent(adminToken)}`;
  const receivedAt = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

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

  const text = `Pedido de Reserva — Latina Grill Cascais
=============================================
Nome:          ${data.name}
Telefone:      ${data.phone}${data.email ? `\nEmail:         ${data.email}` : ''}
Data:          ${data.date}
Hora:          ${data.time}
Nº de pessoas: ${data.guests}
${data.observations ? `Observações:   ${data.observations}` : ''}
=============================================
Recebido em: ${receivedAt}

⚠ AÇÃO NECESSÁRIA — confirma ou recusa em:
${adminUrl}
  `.trim();

  const html = `<!DOCTYPE html>
<html lang="pt"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Novo Pedido — ${e.name}</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;"><tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e5e5e5;">

<tr><td style="background-color:#0a0a0a;padding:28px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:middle;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#d4af6e;text-transform:uppercase;">Aguarda Confirmação</p>
<p style="margin:6px 0 0;font-family:Georgia,serif;font-size:18px;color:#f5f0e6;letter-spacing:3px;">LATINA GRILL CASCAIS</p>
</td>
<td style="vertical-align:middle;text-align:right;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#888;">${e.receivedAt}</p>
</td>
</tr></table>
</td></tr>

<tr><td style="padding:32px 32px 24px;background-color:#fffbe9;border-bottom:1px solid #e5e5e5;">
<p style="margin:0 0 18px;font-family:Georgia,serif;font-size:24px;color:#1a1a1a;line-height:1.4;">
<strong style="color:#a87a1f;">${e.name}</strong> — ${e.date} às ${e.time}
<br><span style="font-size:16px;color:#666;">${e.guests} ${data.guests === 1 ? 'pessoa' : 'pessoas'}</span>
</p>
<a href="${adminUrl}" style="display:block;padding:18px;background-color:#0a0a0a;color:#d4af6e;text-decoration:none;text-align:center;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border:2px solid #d4af6e;">
✓ Confirmar ou Recusar &nbsp;→
</a>
<p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#888;text-align:center;">
Toca no botão acima — abre uma página segura para gerir este pedido.
</p>
</td></tr>

<tr><td style="padding:24px 32px;background-color:#ffffff;">
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
</tr></table>
</td></tr>

<tr><td style="padding:8px 32px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;">
<tr><td style="padding:10px 0;color:#888;width:120px;border-bottom:1px solid #f0f0f0;">Nome</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.name}</td></tr>
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Telefone</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;"><a href="tel:${e.phoneHref}" style="color:#1a1a1a;text-decoration:none;">${e.phone}</a></td></tr>
${e.email ? `<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Email</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;"><a href="mailto:${e.email}" style="color:#1a1a1a;text-decoration:none;">${e.email}</a></td></tr>` : ''}
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Data</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.date}</td></tr>
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Hora</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.time}</td></tr>
<tr><td style="padding:10px 0;color:#888;${e.observations ? 'border-bottom:1px solid #f0f0f0;' : ''}">Pessoas</td><td style="padding:10px 0;color:#1a1a1a;font-weight:600;${e.observations ? 'border-bottom:1px solid #f0f0f0;' : ''}">${e.guests}</td></tr>
${e.observations ? `<tr><td style="padding:10px 0;color:#888;vertical-align:top;">Observações</td><td style="padding:10px 0;color:#1a1a1a;background-color:#fffce5;padding-left:8px;border-left:3px solid #d4af6e;">${e.observations}</td></tr>` : ''}
</table>
</td></tr>

<tr><td style="padding:16px 32px 24px;background-color:#fafafa;border-top:1px solid #e5e5e5;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#999;line-height:1.6;">
${e.email ? 'Cliente recebeu email a informar que o pedido está em análise.' : 'Cliente não forneceu email — confirma a reserva por telefone.'}
</p>
</td></tr>

</table></td></tr></table></body></html>`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: RESTAURANT_INBOX,
    replyTo: RESERVATION_REPLY_TO,
    subject: `⏳ Pedido — ${data.name} — ${data.date} ${data.time} (${data.guests}p)`,
    text,
    html,
  });
  if (error) throw new Error(`Owner new request email: ${error.message}`);
}

// ─── (6) OWNER · customer accepted alternative — info only ──────────────────

export async function sendOwnerAlternativeAcceptedEmail(
  data: ReservationTokenPayload,
  acceptedSlot: string,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const e = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    phoneHref: sanitizePhoneForHref(data.phone),
    date: escapeHtml(data.date),
    originalTime: escapeHtml(data.time),
    acceptedSlot: escapeHtml(acceptedSlot),
    guests: escapeHtml(String(data.guests)),
  };

  const text = `${data.name} aceitou a hora alternativa.

Reserva confirmada para:
  Data:    ${data.date}
  Hora:    ${acceptedSlot}  (substituiu ${data.time})
  Pessoas: ${data.guests}
  Telefone: ${data.phone}

O cliente recebeu email de confirmação automaticamente.`;

  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Cliente aceitou</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;"><tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e5e5e5;">
<tr><td style="background-color:#0a0a0a;padding:28px 32px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#22c55e;text-transform:uppercase;">✓ Aceitou Alternativa</p>
<p style="margin:6px 0 0;font-family:Georgia,serif;font-size:18px;color:#f5f0e6;letter-spacing:3px;">LATINA GRILL CASCAIS</p>
</td></tr>
<tr><td style="padding:32px 32px 16px;background-color:#f0fdf4;">
<p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#1a1a1a;line-height:1.4;">
<strong style="color:#15803d;">${e.name}</strong> aceitou <strong>${e.acceptedSlot}</strong>
<br><span style="font-size:14px;color:#666;">${e.date} · ${e.guests} ${data.guests === 1 ? 'pessoa' : 'pessoas'} · era ${e.originalTime}</span>
</p>
</td></tr>
<tr><td style="padding:24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;">
<tr><td style="padding:10px 0;color:#888;width:120px;border-bottom:1px solid #f0f0f0;">Cliente</td><td style="padding:10px 0;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.name}</td></tr>
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Telefone</td><td style="padding:10px 0;font-weight:600;border-bottom:1px solid #f0f0f0;"><a href="tel:${e.phoneHref}" style="color:#1a1a1a;text-decoration:none;">${e.phone}</a></td></tr>
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Data</td><td style="padding:10px 0;font-weight:600;border-bottom:1px solid #f0f0f0;">${e.date}</td></tr>
<tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Hora aceite</td><td style="padding:10px 0;font-weight:700;color:#15803d;border-bottom:1px solid #f0f0f0;">${e.acceptedSlot}</td></tr>
<tr><td style="padding:10px 0;color:#888;">Pessoas</td><td style="padding:10px 0;font-weight:600;">${e.guests}</td></tr>
</table>
</td></tr>
<tr><td style="padding:16px 32px 24px;background-color:#fafafa;border-top:1px solid #e5e5e5;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#999;">Cliente já recebeu email de confirmação automaticamente.</p>
</td></tr>
</table></td></tr></table></body></html>`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: RESTAURANT_INBOX,
    replyTo: RESERVATION_REPLY_TO,
    subject: `✓ ${data.name} aceitou ${acceptedSlot} — ${data.date}`,
    text,
    html,
  });
  if (error) throw new Error(`Owner alt-accepted email: ${error.message}`);
}

// ─── (7) OWNER · customer declined all alternatives — info only ─────────────

export async function sendOwnerAlternativeDeclinedEmail(
  data: ReservationTokenPayload,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const e = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    phoneHref: sanitizePhoneForHref(data.phone),
    date: escapeHtml(data.date),
    originalTime: escapeHtml(data.time),
    guests: escapeHtml(String(data.guests)),
  };

  const text = `${data.name} recusou todas as alternativas propostas.

Pedido original: ${data.date} às ${data.time} (${data.guests}p)
Telefone: ${data.phone}

Pode contactar diretamente se quiser oferecer outra opção.`;

  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Cliente recusou</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;"><tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e5e5e5;">
<tr><td style="background-color:#0a0a0a;padding:28px 32px;">
<p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#dc2626;text-transform:uppercase;">✕ Recusou Alternativas</p>
<p style="margin:6px 0 0;font-family:Georgia,serif;font-size:18px;color:#f5f0e6;letter-spacing:3px;">LATINA GRILL CASCAIS</p>
</td></tr>
<tr><td style="padding:32px;">
<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:#1a1a1a;line-height:1.4;">
<strong>${e.name}</strong> não aceitou as alternativas
<br><span style="font-size:14px;color:#666;">Pedido original: ${e.date} às ${e.originalTime}, ${e.guests} ${data.guests === 1 ? 'pessoa' : 'pessoas'}</span>
</p>
<a href="tel:${e.phoneHref}" style="display:inline-block;padding:14px 28px;background-color:#0a0a0a;color:#f5f0e6;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;font-weight:600;">📞 Ligar ao cliente — ${e.phone}</a>
</td></tr>
</table></td></tr></table></body></html>`;

  const { error } = await resend.emails.send({
    from: RESERVATION_FROM,
    to: RESTAURANT_INBOX,
    replyTo: RESERVATION_REPLY_TO,
    subject: `✕ ${data.name} recusou alternativas — ${data.date}`,
    text,
    html,
  });
  if (error) throw new Error(`Owner alt-declined email: ${error.message}`);
}
