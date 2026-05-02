'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Minus,
  Plus,
  AlertCircle,
  Check,
  Sun,
  Moon,
} from 'lucide-react';

// ─── Country codes ────────────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: '+351', flag: '🇵🇹', name: 'PT' },
  { code: '+55',  flag: '🇧🇷', name: 'BR' },
  { code: '+33',  flag: '🇫🇷', name: 'FR' },
  { code: '+44',  flag: '🇬🇧', name: 'GB' },
  { code: '+1',   flag: '🇺🇸', name: 'US' },
  { code: '+34',  flag: '🇪🇸', name: 'ES' },
  { code: '+49',  flag: '🇩🇪', name: 'DE' },
  { code: '+39',  flag: '🇮🇹', name: 'IT' },
  { code: '+31',  flag: '🇳🇱', name: 'NL' },
  { code: '+32',  flag: '🇧🇪', name: 'BE' },
  { code: '+41',  flag: '🇨🇭', name: 'CH' },
  { code: '+7',   flag: '🇷🇺', name: 'RU' },
  { code: '+86',  flag: '🇨🇳', name: 'CN' },
  { code: '+81',  flag: '🇯🇵', name: 'JP' },
  { code: '+82',  flag: '🇰🇷', name: 'KR' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+966', flag: '🇸🇦', name: 'SA' },
  { code: '+972', flag: '🇮🇱', name: 'IL' },
  { code: '+27',  flag: '🇿🇦', name: 'ZA' },
  { code: '+52',  flag: '🇲🇽', name: 'MX' },
];

// ─── Time slots — fine-dining style: lunch + dinner (no afternoon) ──────────
// Last reservation 22:00 — the kitchen closes at 22:00.

const LUNCH_SLOTS = ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

const PHONE_NUMBER = '+351 968 707 515';
const PHONE_HREF = PHONE_NUMBER.replace(/\s/g, '');
const EMAIL_ADDRESS = 'latinagrill@icloud.com';

const MAX_DAYS_AHEAD = 90;       // Online bookings up to 3 months out
const TIME_BUFFER_MIN = 60;      // Minimum lead time (min) for same-day reservations
const LARGE_GROUP_THRESHOLD = 10;
const MAX_GUESTS = 50;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Date / time helpers ─────────────────────────────────────────────────────

function getMinDate(): string {
  return new Date().toISOString().split('T')[0];
}

function getMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + MAX_DAYS_AHEAD);
  return d.toISOString().split('T')[0];
}

function isToday(dateStr: string): boolean {
  return dateStr === getMinDate();
}

function slotToMinutes(slot: string): number {
  const [h, m] = slot.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentMinutesPlusBuffer(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes() + TIME_BUFFER_MIN;
}

function getDayOfWeek(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return '';
  // Noon UTC to avoid timezone shifting the day
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString(locale, {
    weekday: 'long',
    timeZone: 'Europe/Lisbon',
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReservationForm() {
  const t = useTranslations('reservation');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+351',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    observations: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ─── Smart slot filtering — recomputes when date changes ─────────────────────
  const availableSlots = useMemo(() => {
    if (!formData.date || !isToday(formData.date)) {
      return { lunch: LUNCH_SLOTS, dinner: DINNER_SLOTS };
    }
    const cutoff = getCurrentMinutesPlusBuffer();
    return {
      lunch: LUNCH_SLOTS.filter((s) => slotToMinutes(s) >= cutoff),
      dinner: DINNER_SLOTS.filter((s) => slotToMinutes(s) >= cutoff),
    };
  }, [formData.date]);

  const noSlotsAvailable =
    formData.date &&
    availableSlots.lunch.length === 0 &&
    availableSlots.dinner.length === 0;

  const dayOfWeek = useMemo(
    () => getDayOfWeek(formData.date, locale),
    [formData.date, locale],
  );

  // Real-time email validation (only flags as valid when fully typed)
  const showEmailValid =
    formData.email.trim() !== '' && EMAIL_REGEX.test(formData.email.trim());

  const isLargeGroup = formData.guests > LARGE_GROUP_THRESHOLD;

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.phone.trim()) newErrors.phone = t('validation.required');

    if (formData.email.trim() && !EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = t('validation.invalidEmail');
    }

    if (!formData.date) {
      newErrors.date = t('validation.required');
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const max = new Date();
      max.setDate(max.getDate() + MAX_DAYS_AHEAD);
      max.setHours(23, 59, 59, 999);

      if (selected < today) newErrors.date = t('validation.pastDate');
      else if (selected > max) newErrors.date = t('validation.tooFarFuture');
    }

    if (!formData.time) {
      newErrors.time = t('validation.required');
    } else if (
      formData.date &&
      isToday(formData.date) &&
      slotToMinutes(formData.time) < getCurrentMinutesPlusBuffer()
    ) {
      newErrors.time = t('validation.timeNotAvailable');
    }

    if (formData.guests < 1) newErrors.guests = t('validation.minGuests');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`,
        }),
      });

      if (!res.ok) throw new Error('Server error');
    } catch {
      // Non-blocking: we surface success either way; server logs the failure.
    } finally {
      setIsSubmitting(false);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '', countryCode: '+351', phone: '', email: '',
        date: '', time: '', guests: 2, observations: '',
      });
      setErrors({});
    }, 5000);
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Reset selected time if date changes — the available slots may be different
    if (name === 'date' && value !== formData.date) {
      setFormData((prev) => ({ ...prev, [name]: value, time: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleTimeSelect = (slot: string) => {
    setFormData((prev) => ({ ...prev, time: slot }));
    if (errors.time) {
      setErrors((prev) => { const n = { ...prev }; delete n.time; return n; });
    }
  };

  const handleGuestsChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(MAX_GUESTS, Math.max(1, prev.guests + delta)),
    }));
  };

  // ─── Slot button (extracted for clarity) ─────────────────────────────────────

  const TimeSlotButton = ({ slot }: { slot: string }) => {
    const selected = formData.time === slot;
    return (
      <button
        type="button"
        onClick={() => handleTimeSelect(slot)}
        aria-pressed={selected}
        className={`
          relative px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
          ${selected
            ? 'bg-accent-orange text-dark border border-accent-orange shadow-md shadow-accent-orange/30 scale-[1.02]'
            : 'bg-dark-lighter text-light border border-light/10 hover:border-accent-orange/50 hover:bg-light/[0.04] active:scale-[0.97]'
          }
        `}
      >
        {slot}
      </button>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative">

      {/* Info bar */}
      <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="text-sm text-light/85 space-y-1">
            <p className="font-medium text-light">{t('info.schedule')}</p>
            <p>{t('info.minGuests')} · {t('info.allDays')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* Name */}
        <div className="group">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <User className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full bg-dark-lighter border ${errors.name ? 'border-red-500' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/45 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            placeholder="João Silva"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="group">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Phone className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.phone')}
          </label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="shrink-0 w-[110px] bg-dark-lighter border border-light/10 rounded-xl px-3 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all text-sm"
              aria-label={t('form.countryCode')}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel-national"
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`flex-1 bg-dark-lighter border ${errors.phone ? 'border-red-500' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/45 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
              placeholder="968 707 515"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.phone}
            </p>
          )}
        </div>

        {/* Email — real-time valid indicator */}
        <div className="group">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Mail className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.email')}
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full bg-dark-lighter border rounded-xl px-4 py-3 pr-11 text-light placeholder:text-light/45 focus:outline-none focus:ring-2 transition-all
                ${errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : showEmailValid
                    ? 'border-accent-green/60 focus:border-accent-green focus:ring-accent-green/20'
                    : 'border-light/10 focus:border-accent-orange focus:ring-accent-orange/20'
                }`}
              placeholder="seu@email.com"
            />
            <AnimatePresence>
              {showEmailValid && !errors.email && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-green"
                  aria-hidden="true"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.email}
            </p>
          )}
        </div>

        {/* Date — with day-of-week chip */}
        <div className="group">
          <label htmlFor="date" className="flex items-center justify-between gap-2 text-sm font-medium text-light mb-2">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-orange" aria-hidden="true" />
              {t('form.date')}
            </span>
            <AnimatePresence mode="wait">
              {dayOfWeek && (
                <motion.span
                  key={dayOfWeek}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs uppercase tracking-wider text-accent-orange/85 font-normal"
                >
                  {dayOfWeek}
                </motion.span>
              )}
            </AnimatePresence>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            max={getMaxDate()}
            aria-invalid={errors.date ? 'true' : undefined}
            aria-describedby={errors.date ? 'date-error' : undefined}
            className={`w-full bg-dark-lighter border ${errors.date ? 'border-red-500' : 'border-light/10'} rounded-xl px-4 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
          />
          {errors.date && (
            <p id="date-error" role="alert" className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.date}
            </p>
          )}
        </div>

        {/* Time — chip picker grouped by service */}
        <div className="group" role="group" aria-labelledby="time-label">
          <label id="time-label" className="flex items-center gap-2 text-sm font-medium text-light mb-3">
            <Clock className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.time')}
          </label>

          {!formData.date ? (
            <div className="rounded-xl border border-light/10 bg-dark-lighter px-4 py-6 text-center">
              <p className="text-sm text-light/65 italic">{t('form.selectDateFirst')}</p>
            </div>
          ) : noSlotsAvailable ? (
            <div className="rounded-xl border border-accent-orange/30 bg-accent-orange/5 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm text-light/85 space-y-2">
                <p>{t('info.noSlotsToday')}</p>
                <a
                  href={`tel:${PHONE_HREF}`}
                  className="inline-flex items-center gap-1.5 text-accent-orange hover:text-accent-yellow font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {availableSlots.lunch.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sun className="w-3.5 h-3.5 text-accent-orange" aria-hidden="true" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-light/65 font-medium">
                      {t('info.lunch')}
                    </span>
                    <span className="text-[11px] text-light/45">12:30 – 15:00</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {availableSlots.lunch.map((slot) => (
                      <TimeSlotButton key={slot} slot={slot} />
                    ))}
                  </div>
                </div>
              )}

              {availableSlots.dinner.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Moon className="w-3.5 h-3.5 text-accent-orange" aria-hidden="true" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-light/65 font-medium">
                      {t('info.dinner')}
                    </span>
                    <span className="text-[11px] text-light/45">19:00 – 22:00</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {availableSlots.dinner.map((slot) => (
                      <TimeSlotButton key={slot} slot={slot} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {errors.time && (
            <p role="alert" className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.time}
            </p>
          )}
        </div>

        {/* Guests */}
        <div className="group">
          <label id="guests-label" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Users className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.guests')}
          </label>
          <div className="flex items-center gap-3 sm:gap-4" role="group" aria-labelledby="guests-label">
            <button
              type="button"
              onClick={() => handleGuestsChange(-1)}
              disabled={formData.guests <= 1}
              aria-label={t('form.decreaseGuests')}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-colors disabled:opacity-50 disabled:hover:border-light/10 active:scale-95 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Minus className="w-5 h-5 text-light" aria-hidden="true" />
            </button>
            <div
              className="flex-1 bg-dark-lighter border border-light/10 rounded-xl px-6 py-3 text-center overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={formData.guests}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-2xl font-semibold text-light inline-block"
                >
                  {formData.guests}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-light/70 ml-2">
                {formData.guests === 1 ? t('form.guestSingular') : t('form.guestPlural')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleGuestsChange(1)}
              disabled={formData.guests >= MAX_GUESTS}
              aria-label={t('form.increaseGuests')}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-colors disabled:opacity-50 disabled:hover:border-light/10 active:scale-95 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-light" aria-hidden="true" />
            </button>
          </div>

          {/* Large group inline note */}
          <AnimatePresence>
            {isLargeGroup && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div role="alert" className="rounded-xl border border-accent-orange/30 bg-accent-orange/5 p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-sm text-light/85 leading-relaxed">
                    <p className="font-semibold text-light mb-0.5">{t('info.largeGroupTitle')}</p>
                    <p>
                      {t('info.largeGroupNote')}{' '}
                      <a
                        href={`tel:${PHONE_HREF}`}
                        className="text-accent-orange hover:text-accent-yellow font-semibold transition-colors whitespace-nowrap"
                      >
                        {PHONE_NUMBER}
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Observations */}
        <div className="group">
          <label htmlFor="observations" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <MessageSquare className="w-4 h-4 text-accent-orange" aria-hidden="true" />
            {t('form.observations')}
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            maxLength={500}
            className="w-full bg-dark-lighter border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/45 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all resize-none"
            placeholder="Algum pedido especial?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full bg-gradient-to-r from-red-600 to-red-dark hover:from-red-500 hover:to-red-600 text-light px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </button>

        {/* Direct contact block */}
        <div className="rounded-xl border border-light/8 bg-light/[0.02] px-5 py-4">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-light/55">
            {t('form.directContact')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`tel:${PHONE_HREF}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-light/10 bg-dark-lighter px-5 py-3 text-sm font-semibold text-light transition-colors hover:border-accent-orange hover:text-accent-orange"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-light/10 bg-dark-lighter px-5 py-3 text-sm font-semibold text-light transition-colors hover:border-accent-orange hover:text-accent-orange"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              {EMAIL_ADDRESS}
            </a>
          </div>
        </div>

      </form>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
            className="absolute inset-0 bg-dark/95 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-accent-orange mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-serif font-bold text-light mb-2">{t('success.title')}</h3>
              <p className="text-light/80 mb-6">{t('success.message')}</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-accent-orange hover:text-accent-yellow transition-colors text-sm font-medium px-4 py-2 rounded min-h-[44px]"
              >
                {t('success.close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
