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

async function sendReservationEmail(data: ReservationData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[Latina Grill] Reservation received (RESEND_API_KEY not configured):', data);
    return;
  }

  const resend = new Resend(apiKey);

  const receivedAt = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

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

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1a1a1a; color: #f5f0e6; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">LATINA GRILL CASCAIS</h1>
        <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.8;">Nova Reserva Recebida</p>
      </div>
      <div style="padding: 24px; background: #fafafa; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #666; width: 130px;">Nome</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Telefone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${data.phone}" style="color: #1a1a1a; text-decoration: none;">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Data</td><td style="padding: 8px 0; font-weight: 600;">${data.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Hora</td><td style="padding: 8px 0; font-weight: 600;">${data.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Nº de pessoas</td><td style="padding: 8px 0; font-weight: 600;">${data.guests}</td></tr>
          ${data.observations ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Observações</td><td style="padding: 8px 0;">${data.observations}</td></tr>` : ''}
        </table>
        <p style="margin: 24px 0 0; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #999;">Recebido em ${receivedAt}</p>
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, date, time, guests, observations } = body as ReservationData;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data: ReservationData = { name, phone, date, time, guests, observations };

    try {
      await sendReservationEmail(data);
    } catch (emailError) {
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
