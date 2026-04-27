import { NextRequest, NextResponse } from 'next/server';
import { verifyReservationToken } from '@/lib/reservation-token';
import { sendCustomerDeclinedEmail } from '@/lib/reservation-email';
import { markDeclined } from '@/lib/reservation-store';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { token?: string; reason?: string };
    const token = body.token;
    const reason = String(body.reason ?? '').trim().slice(0, 300);

    if (!token) return NextResponse.json({ error: 'missing_token' }, { status: 400 });
    if (!reason) return NextResponse.json({ error: 'missing_reason' }, { status: 400 });

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
        await sendCustomerDeclinedEmail(payload, reason);
      } catch (e) {
        console.error('[Latina Grill] Decline email failed:', e);
        return NextResponse.json({ error: 'email_send_failed' }, { status: 500 });
      }
    }

    try {
      await markDeclined(payload.reservationId);
    } catch (e) {
      console.error('[Latina Grill] KV markDeclined failed:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Latina Grill] decline handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
