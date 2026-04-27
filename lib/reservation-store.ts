import { kv } from '@vercel/kv';

// ─── Reservation persistence (Vercel KV / Upstash Redis) ────────────────────
//
// Persists reservation state so the daily cron can:
//   1. Send D-1 reminders to customers with confirmed reservations for tomorrow
//   2. Alert the restaurant if reservations have been pending > 12h
//
// Free tier on Vercel KV: 30k commands / day, 256 MB. More than enough for a
// single-restaurant flow (~10–30 reservations / day, ~10 commands per).
//
// Schema:
//   reservation:[id]              hash    full record
//   pending                       set     ids of records with status='pending'
//   confirmed:by-date:[YYYY-MM-DD] set    ids of confirmed records on that date
//
// All reservation hashes get a TTL of (reservation date + 7 days) when first
// written, so the store self-cleans without a separate sweep job.

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'alternative-offered';

export interface StoredReservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  observations?: string;
  status: ReservationStatus;
  createdAt: number; // ms epoch
  updatedAt: number;
  reminderSentAt?: number; // ms epoch, set when D-1 reminder is dispatched
  pendingDigestAt?: number; // ms epoch, set when included in a pending digest
}

const KEY = {
  reservation: (id: string) => `reservation:${id}`,
  pendingSet: 'pending',
  confirmedByDate: (date: string) => `confirmed:by-date:${date}`,
} as const;

function isStoreConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// Compute a TTL in seconds that lives until reservation date + 7 days.
// For reservations pending past their own date, falls back to 7 days from now.
function ttlSecondsUntilAfterDate(date: string): number {
  const [y, m, d] = date.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return 7 * 24 * 3600;
  const target = Date.UTC(y, m - 1, d, 23, 59, 59);
  const now = Date.now();
  const fromTarget = Math.floor((target - now) / 1000) + 7 * 24 * 3600;
  return Math.max(7 * 24 * 3600, fromTarget);
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function saveNewPending(record: Omit<StoredReservation, 'createdAt' | 'updatedAt' | 'status'>): Promise<void> {
  if (!isStoreConfigured()) return; // Soft no-op in dev without KV
  const now = Date.now();
  const full: StoredReservation = {
    ...record,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  await Promise.all([
    kv.set(KEY.reservation(full.id), full, { ex: ttlSecondsUntilAfterDate(full.date) }),
    kv.sadd(KEY.pendingSet, full.id),
  ]);
}

export async function markConfirmed(id: string, opts?: { newTime?: string }): Promise<StoredReservation | null> {
  if (!isStoreConfigured()) return null;
  const current = await kv.get<StoredReservation>(KEY.reservation(id));
  if (!current) return null;

  const updated: StoredReservation = {
    ...current,
    status: 'confirmed',
    time: opts?.newTime ?? current.time,
    updatedAt: Date.now(),
  };

  await Promise.all([
    kv.set(KEY.reservation(id), updated, { ex: ttlSecondsUntilAfterDate(updated.date) }),
    kv.srem(KEY.pendingSet, id),
    kv.sadd(KEY.confirmedByDate(updated.date), id),
  ]);
  return updated;
}

export async function markDeclined(id: string): Promise<void> {
  if (!isStoreConfigured()) return;
  const current = await kv.get<StoredReservation>(KEY.reservation(id));
  if (!current) return;

  const updated: StoredReservation = {
    ...current,
    status: 'declined',
    updatedAt: Date.now(),
  };

  await Promise.all([
    kv.set(KEY.reservation(id), updated, { ex: ttlSecondsUntilAfterDate(updated.date) }),
    kv.srem(KEY.pendingSet, id),
  ]);
}

export async function markAlternativeOffered(id: string): Promise<void> {
  if (!isStoreConfigured()) return;
  const current = await kv.get<StoredReservation>(KEY.reservation(id));
  if (!current) return;

  const updated: StoredReservation = {
    ...current,
    status: 'alternative-offered',
    updatedAt: Date.now(),
  };

  // Stays out of `pending` (the owner has acted) and out of confirmed (waiting customer)
  await Promise.all([
    kv.set(KEY.reservation(id), updated, { ex: ttlSecondsUntilAfterDate(updated.date) }),
    kv.srem(KEY.pendingSet, id),
  ]);
}

export async function markReminderSent(id: string): Promise<void> {
  if (!isStoreConfigured()) return;
  const current = await kv.get<StoredReservation>(KEY.reservation(id));
  if (!current) return;
  const updated: StoredReservation = { ...current, reminderSentAt: Date.now() };
  await kv.set(KEY.reservation(id), updated, { ex: ttlSecondsUntilAfterDate(updated.date) });
}

export async function markIncludedInPendingDigest(ids: string[]): Promise<void> {
  if (!isStoreConfigured() || ids.length === 0) return;
  const ts = Date.now();
  await Promise.all(
    ids.map(async (id) => {
      const current = await kv.get<StoredReservation>(KEY.reservation(id));
      if (!current) return;
      await kv.set(
        KEY.reservation(id),
        { ...current, pendingDigestAt: ts },
        { ex: ttlSecondsUntilAfterDate(current.date) },
      );
    }),
  );
}

// ─── Reads (cron job) ─────────────────────────────────────────────────────────

export async function getConfirmedForDate(date: string): Promise<StoredReservation[]> {
  if (!isStoreConfigured()) return [];
  const ids = await kv.smembers(KEY.confirmedByDate(date));
  if (!ids || ids.length === 0) return [];
  const records = await Promise.all(
    ids.map((id) => kv.get<StoredReservation>(KEY.reservation(id))),
  );
  // Filter out null (TTL-expired) and ensure still confirmed
  return records.filter(
    (r): r is StoredReservation => r !== null && r.status === 'confirmed',
  );
}

export async function getPendingOlderThan(thresholdMs: number): Promise<StoredReservation[]> {
  if (!isStoreConfigured()) return [];
  const ids = await kv.smembers(KEY.pendingSet);
  if (!ids || ids.length === 0) return [];
  const records = await Promise.all(
    ids.map((id) => kv.get<StoredReservation>(KEY.reservation(id))),
  );
  const now = Date.now();
  return records.filter(
    (r): r is StoredReservation =>
      r !== null && r.status === 'pending' && now - r.createdAt >= thresholdMs,
  );
}

// Tomorrow in Europe/Lisbon (matches the customer-facing date format).
export function lisbonTomorrowDate(): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  // 'en-CA' produces YYYY-MM-DD which matches our storage format
  const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
  return fmt.format(tomorrow);
}
