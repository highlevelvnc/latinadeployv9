import { NextRequest, NextResponse } from 'next/server';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  observations?: string;
}

// ─── Email helper ─────────────────────────────────────────────────────────────
// Uses nodemailer only when SMTP environment variables are configured.
// If SMTP is not set up, the reservation is logged to the console as a
// safe fallback — the form still shows success to the user.

async function sendReservationEmail(data: ReservationData): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // SMTP not yet configured — log reservation so nothing is lost
    console.log('[Latina Grill] Reservation received (SMTP not configured):', data);
    return;
  }

  const nodemailer = await import('nodemailer');

  const transporter = nodemailer.default.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const emailBody = `
Nova Reserva — Latina Grill Cascais
=====================================
Nome:          ${data.name}
Telefone:      ${data.phone}
Data:          ${data.date}
Hora:          ${data.time}
Nº de pessoas: ${data.guests}
${data.observations ? `Observações:   ${data.observations}` : ''}
=====================================
Recebido em: ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
  `.trim();

  await transporter.sendMail({
    from: SMTP_USER,
    to: 'latinagrill@icloud.com',
    subject: `Nova Reserva — ${data.name} — ${data.date} às ${data.time} (${data.guests} pax)`,
    text: emailBody,
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, date, time, guests, observations } = body as ReservationData;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data: ReservationData = { name, phone, date, time, guests, observations };

    // Attempt email — never throws to the client
    try {
      await sendReservationEmail(data);
    } catch (emailError) {
      // Email failed but reservation was received — log and continue
      console.error('[Latina Grill] Email delivery failed:', emailError);
      console.log('[Latina Grill] Reservation data:', data);
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
