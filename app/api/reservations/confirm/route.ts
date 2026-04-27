import { NextRequest, NextResponse } from 'next/server';
import { verifyReservationToken } from '@/lib/reservation-token';
import { sendCustomerConfirmedEmail } from '@/lib/reservation-email';
import { markConfirmed } from '@/lib/reservation-store';
import { sendSMS, formatDateShort } from '@/lib/sms';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { token?: string; message?: string };
    const token = body.token;
    const message = String(body.message ?? '').trim().slice(0, 500) || undefined;

    if (!token) {
      return NextResponse.json({ error: 'missing_token' }, { status: 400 });
    }

    const payload = verifyReservationToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'invalid_or_expired_token' }, { status: 400 });
    }

    if (payload.status !== 'pending') {
      return NextResponse.json(
        { error: 'invalid_status', status: payload.status },
        { status: 400 }
      );
    }

    if (payload.email) {
      try {
        await sendCustomerConfirmedEmail(payload, message);
      } catch (e) {
        console.error('[Latina Grill] Confirmation email failed:', e);
        return NextResponse.json({ error: 'email_send_failed' }, { status: 500 });
      }
    }

    // SMS confirmation — best-effort, never blocks the email path
    void sendSMS({
      to: payload.phone,
      body: `Latina Grill: reserva CONFIRMADA para ${formatDateShort(payload.date)} as ${payload.time}. Aguardamos a sua visita!`,
    });

    // Persist confirmation so the cron can pick it up for D-1 reminders
    try {
      await markConfirmed(payload.reservationId);
    } catch (e) {
      console.error('[Latina Grill] KV markConfirmed failed:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Latina Grill] confirm handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
