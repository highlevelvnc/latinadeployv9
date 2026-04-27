import { NextRequest, NextResponse } from 'next/server';
import {
  signReservationToken,
  verifyReservationToken,
  type ReservationTokenPayload,
} from '@/lib/reservation-token';
import { sendCustomerAlternativeOfferedEmail } from '@/lib/reservation-email';
import { markAlternativeOffered } from '@/lib/reservation-store';

const TIME_REGEX = /^\d{1,2}:\d{2}$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      token?: string;
      alternatives?: string[];
      message?: string;
    };
    const token = body.token;
    const message = String(body.message ?? '').trim().slice(0, 300);

    if (!token) return NextResponse.json({ error: 'missing_token' }, { status: 400 });

    if (
      !Array.isArray(body.alternatives) ||
      body.alternatives.length === 0 ||
      body.alternatives.length > 3
    ) {
      return NextResponse.json({ error: 'alternatives_required_1_to_3' }, { status: 400 });
    }

    // Sanitize: only HH:MM strings, dedupe, max 3
    const alternatives = Array.from(
      new Set(
        body.alternatives
          .map((s) => String(s).trim())
          .filter((s) => TIME_REGEX.test(s)),
      ),
    ).slice(0, 3);

    if (alternatives.length === 0) {
      return NextResponse.json({ error: 'invalid_alternatives' }, { status: 400 });
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

    // Mint a customer-facing token carrying the alternatives
    const customerPayload: Omit<ReservationTokenPayload, 'iat' | 'exp'> = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      date: payload.date,
      time: payload.time,
      guests: payload.guests,
      observations: payload.observations,
      reservationId: payload.reservationId,
      status: 'alternative-offered',
      alternatives,
      proposalMessage: message || undefined,
    };
    const customerToken = signReservationToken(customerPayload);

    if (payload.email) {
      try {
        await sendCustomerAlternativeOfferedEmail(
          { ...customerPayload, iat: 0, exp: 0 },
          customerToken,
        );
      } catch (e) {
        console.error('[Latina Grill] Alternative email failed:', e);
        return NextResponse.json({ error: 'email_send_failed' }, { status: 500 });
      }
    }

    try {
      await markAlternativeOffered(payload.reservationId);
    } catch (e) {
      console.error('[Latina Grill] KV markAlternativeOffered failed:', e);
    }

    return NextResponse.json({ success: true, customerToken });
  } catch (error) {
    console.error('[Latina Grill] propose-alt handler error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
