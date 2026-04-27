import { NextRequest, NextResponse } from 'next/server';
import { verifyReservationToken } from '@/lib/reservation-token';
import {
  sendCustomerConfirmedEmail,
  sendOwnerAlternativeAcceptedEmail,
} from '@/lib/reservation-email';
import { markConfirmed } from '@/lib/reservation-store';
import { sendSMS, formatDateShort } from '@/lib/sms';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { token?: string; slot?: string };
    const token = body.token;
    const slot = String(body.slot ?? '').trim();

    if (!token) return NextResponse.json({ error: 'missing_token' }, { status: 400 });
    if (!slot) return NextResponse.json({ error: 'missing_slot' }, { status: 400 });

    const payload = verifyReservationToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'invalid_or_expired_token' }, { status: 400 });
    }
    if (payload.status !== 'alternative-offered') {
      return NextResponse.json(
        { error: 'invalid_status', status: payload.status },
        { status: 400 }
      );
    }
    if (!payload.alternatives?.includes(slot)) {
      return NextResponse.json({ error: 'slot_not_offered' }, { status: 400 });
    }

    // Update the time to the accepted slot before sending confirmation
    const confirmedPayload = { ...payload, time: slot };

    const results = await Promise.allSettled([
      sendCustomerConfirmedEmail(confirmedPayload),
      sendOwnerAlternativeAcceptedEmail(payload, slot),
    ]);

    const someFailed = results.some((r) => r.status === 'rejected');
    if (someFailed) {
      results.forEach((r) => {
        if (r.status === 'rejected') {
          console.error('[Latina Grill] accept-alt email failed:', r.reason);
        }
      });
      // Customer email is critical; if both fail, surface error
      if (results.every((r) => r.status === 'rejected')) {
        return NextResponse.json({ error: 'email_send_failed' }, { status: 500 });
      }
    }

    try {
      await markConfirmed(payload.reservationId, { newTime: slot });
    } catch (e) {
      console.error('[Latina Grill] KV markConfirmed (accept-alt) failed:', e);
    }

    // SMS confirmation with the accepted slot — best-effort
    void sendSMS({
      to: payload.phone,
      body: `Latina Grill: reserva CONFIRMADA para ${formatDateShort(payload.date)} as ${slot}. Aguardamos a sua visita!`,
    });

    return NextResponse.json({ success: true, slot });
  } catch (error) {
    console.error('[Latina Grill] accept-alt handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
