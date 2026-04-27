import { NextRequest, NextResponse } from 'next/server';
import { verifyReservationToken } from '@/lib/reservation-token';
import { sendCustomerConfirmedEmail } from '@/lib/reservation-email';

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

    if (payload.status !== 'pending') {
      return NextResponse.json(
        { error: 'invalid_status', status: payload.status },
        { status: 400 }
      );
    }

    if (payload.email) {
      try {
        await sendCustomerConfirmedEmail(payload);
      } catch (e) {
        console.error('[Latina Grill] Confirmation email failed:', e);
        return NextResponse.json({ error: 'email_send_failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Latina Grill] confirm handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
