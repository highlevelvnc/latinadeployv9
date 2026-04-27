import { NextRequest, NextResponse } from 'next/server';
import {
  getConfirmedForDate,
  getPendingOlderThan,
  lisbonTomorrowDate,
  markReminderSent,
  markIncludedInPendingDigest,
} from '@/lib/reservation-store';
import {
  sendCustomerReminderEmail,
  sendOwnerPendingDigestEmail,
} from '@/lib/reservation-email';

// ─── Daily cron ─────────────────────────────────────────────────────────────
//
// Triggered by Vercel Cron once a day (see vercel.json). Two jobs run:
//
//   1. D-1 reminder — for every reservation confirmed for "tomorrow" in
//      Europe/Lisbon, send a polite reminder if we haven't already.
//
//   2. Pending digest — if any pending reservations are older than 12h,
//      send a single consolidated alert to the restaurant inbox so the
//      owner doesn't miss them.
//
// Auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. Reject any
// request without it. The endpoint is also safe to invoke manually with
// the same header for ad-hoc runs.

export const dynamic = 'force-dynamic';

const PENDING_THRESHOLD_MS = 12 * 60 * 60 * 1000; // 12h

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const stats = {
    remindersSent: 0,
    remindersSkipped: 0,
    remindersFailed: 0,
    pendingDigestSent: false,
    pendingCount: 0,
  };

  // ─── 1) D-1 reminders ────────────────────────────────────────────────────
  try {
    const tomorrow = lisbonTomorrowDate();
    const confirmed = await getConfirmedForDate(tomorrow);

    for (const r of confirmed) {
      // Skip if already reminded (rerun-safety) or no email on file
      if (r.reminderSentAt) {
        stats.remindersSkipped++;
        continue;
      }
      if (!r.email) {
        stats.remindersSkipped++;
        continue;
      }

      try {
        await sendCustomerReminderEmail({
          name: r.name,
          email: r.email,
          date: r.date,
          time: r.time,
          guests: r.guests,
          observations: r.observations,
        });
        await markReminderSent(r.id);
        stats.remindersSent++;
      } catch (e) {
        console.error('[Latina Grill cron] reminder failed for', r.id, e);
        stats.remindersFailed++;
      }
    }
  } catch (e) {
    console.error('[Latina Grill cron] reminder block failed:', e);
  }

  // ─── 2) Pending digest ───────────────────────────────────────────────────
  try {
    const pending = await getPendingOlderThan(PENDING_THRESHOLD_MS);
    stats.pendingCount = pending.length;

    if (pending.length > 0) {
      await sendOwnerPendingDigestEmail(
        pending.map((r) => ({
          id: r.id,
          name: r.name,
          date: r.date,
          time: r.time,
          guests: r.guests,
          createdAt: r.createdAt,
        })),
      );
      await markIncludedInPendingDigest(pending.map((r) => r.id));
      stats.pendingDigestSent = true;
    }
  } catch (e) {
    console.error('[Latina Grill cron] pending digest failed:', e);
  }

  return NextResponse.json({ ok: true, stats });
}
