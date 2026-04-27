import { NextRequest, NextResponse } from 'next/server';
import { verifyReservationToken } from '@/lib/reservation-token';
import { sendOwnerAlternativeDeclinedEmail } from '@/lib/reservation-email';
import { markDeclined } from '@/lib/reservation-store';

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string };
    if (!token) {
      return NextResponse.json({ error: 'missing_token' }, { status: 400 });
    }

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

    try {
      await sendOwnerAlternativeDeclinedEmail(payload);
    } catch (e) {
      console.error('[Latina Grill] Owner alt-declined email failed:', e);
      // Non-critical for the customer flow; return success either way
    }

    try {
      await markDeclined(payload.reservationId);
    } catch (e) {
      console.error('[Latina Grill] KV markDeclined (alt) failed:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Latina Grill] decline-alt handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
