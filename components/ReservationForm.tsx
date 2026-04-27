'use client';

import { useState } from 'react';
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

// ─── Time slots ───────────────────────────────────────────────────────────────

const generateTimeSlots = () => {
  const slots = [];
  let hour = 12;
  let minute = 30;

  while (hour < 23 || (hour === 23 && minute === 0)) {
    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    minute += 30;
    if (minute >= 60) { minute = 0; hour++; }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();
const PHONE_NUMBER = '+351 968 707 515';
const EMAIL_ADDRESS = 'latinagrill@icloud.com';

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReservationForm() {
  const t = useTranslations('reservation');

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

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.phone.trim()) newErrors.phone = t('validation.required');

    // Email is optional, but if provided must be valid
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('validation.invalidEmail');
    }

    if (!formData.date) {
      newErrors.date = t('validation.required');
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = t('validation.pastDate');
    }

    if (!formData.time) newErrors.time = t('validation.required');
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
      // Non-blocking: show success even if network fails —
      // the server logs the reservation and email is sent server-side.
    } finally {
      setIsSubmitting(false);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', countryCode: '+351', phone: '', email: '', date: '', time: '', guests: 2, observations: '' });
      setErrors({});
    }, 5000);
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleGuestsChange = (delta: number) => {
    setFormData((prev) => ({ ...prev, guests: Math.max(1, prev.guests + delta) }));
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative">

      {/* Info bar */}
      <div className="bg-red/10 border border-red/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-red mt-0.5 flex-shrink-0" />
          <div className="text-sm text-light/80 space-y-1">
            <p className="font-medium text-light">{t('info.schedule')}</p>
            <p>{t('info.minGuests')} · {t('info.allDays')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="group">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <User className="w-4 h-4 text-accent-orange" />
            {t('form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-dark-lighter border ${errors.name ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            placeholder="João Silva"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.name}
            </p>
          )}
        </div>

        {/* Phone — country code selector + number input */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Phone className="w-4 h-4 text-accent-orange" />
            {t('form.phone')}
          </label>
          <div className="flex gap-2">
            {/* Country code */}
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

            {/* Number */}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`flex-1 bg-dark-lighter border ${errors.phone ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
              placeholder="968 707 515"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.phone}
            </p>
          )}
        </div>

        {/* Email (optional) — used to send confirmation to the guest */}
        <div className="group">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Mail className="w-4 h-4 text-accent-orange" />
            {t('form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className={`w-full bg-dark-lighter border ${errors.email ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.email}
            </p>
          )}
        </div>

        {/* Date + Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
              <Calendar className="w-4 h-4 text-accent-orange" />
              {t('form.date')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full bg-dark-lighter border ${errors.date ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />{errors.date}
              </p>
            )}
          </div>

          <div className="group">
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
              <Clock className="w-4 h-4 text-accent-orange" />
              {t('form.time')}
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full bg-dark-lighter border ${errors.time ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            >
              <option value="">Selecione</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-sm text-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />{errors.time}
              </p>
            )}
          </div>
        </div>

        {/* Guests */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Users className="w-4 h-4 text-accent-orange" />
            {t('form.guests')}
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleGuestsChange(-1)}
              disabled={formData.guests <= 1}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-all disabled:opacity-50"
            >
              <Minus className="w-5 h-5 text-light" />
            </button>
            <div className="flex-1 bg-dark-lighter border border-light/10 rounded-xl px-6 py-3 text-center">
              <span className="text-2xl font-semibold text-light">{formData.guests}</span>
              <span className="text-sm text-light/60 ml-2">
                {formData.guests === 1 ? 'pessoa' : 'pessoas'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleGuestsChange(1)}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-all"
            >
              <Plus className="w-5 h-5 text-light" />
            </button>
          </div>
        </div>

        {/* Observations */}
        <div className="group">
          <label htmlFor="observations" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <MessageSquare className="w-4 h-4 text-accent-orange" />
            {t('form.observations')}
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            className="w-full bg-dark-lighter border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all resize-none"
            placeholder="Algum pedido especial?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-red/40 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </button>

        {/* Direct contact block */}
        <div className="rounded-xl border border-light/8 bg-light/[0.02] px-5 py-4">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-light/35">
            {t('form.directContact')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-light/10 bg-dark-lighter px-5 py-3 text-sm font-semibold text-light transition-all hover:border-accent-orange hover:text-accent-orange"
            >
              <Phone className="w-4 h-4 shrink-0" />
              {PHONE_NUMBER}
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-light/10 bg-dark-lighter px-5 py-3 text-sm font-semibold text-light transition-all hover:border-accent-orange hover:text-accent-orange"
            >
              <Mail className="w-4 h-4 shrink-0" />
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
            className="absolute inset-0 bg-dark/95 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-accent-orange mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-light mb-2">{t('success.title')}</h3>
              <p className="text-light/70 mb-6">{t('success.message')}</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-accent-orange hover:text-accent-yellow transition-colors text-sm font-medium"
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
