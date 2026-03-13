'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

export default function ReservationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const content = {
    pt: {
      badge: 'Reservas',
      title: 'Reserve a sua mesa e viva o Latina Grill no seu melhor',
      subtitle:
        'Garanta o seu lugar para uma experiência marcada por cortes premium, ambiente sofisticado e uma apresentação memorável.',
      cta: 'Fazer Reserva',
      phone: 'Ligar Agora',
      phoneNumber: '+351 968 707 515',
      note: 'Recomendamos reserva antecipada para sextas, sábados e datas especiais.'
    },
    en: {
      badge: 'Reservations',
      title: 'Book your table and experience Latina Grill at its finest',
      subtitle:
        'Secure your place for an experience defined by premium cuts, sophisticated atmosphere and memorable presentation.',
      cta: 'Make Reservation',
      phone: 'Call Now',
      phoneNumber: '+351 968 707 515',
      note: 'We recommend booking in advance for Fridays, Saturdays and special dates.'
    },
    fr: {
      badge: 'Réservations',
      title: 'Réservez votre table et vivez le Latina Grill à son meilleur',
      subtitle:
        'Assurez votre place pour une expérience marquée par des coupes premium, une ambiance sophistiquée et une présentation mémorable.',
      cta: 'Faire une Réservation',
      phone: 'Appeler',
      phoneNumber: '+351 968 707 515',
      note: 'Nous recommandons une réservation anticipée pour les vendredis, samedis et dates spéciales.'
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-24 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/10 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.04] via-transparent to-white/[0.02]" />

            <div className="relative px-6 py-12 text-center md:px-10 md:py-14 lg:px-16 lg:py-20">
              {/* badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5"
              >
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
                  {t.badge}
                </span>
              </motion.div>

              {/* title */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl"
              >
                {t.title}
              </motion.h2>

              {/* divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mx-auto my-8 flex items-center justify-center gap-4"
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500 md:w-16" />
                <div className="h-2.5 w-2.5 rotate-45 bg-red-500" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500 md:w-16" />
              </motion.div>

              {/* subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mx-auto max-w-3xl text-base leading-relaxed text-white/65 md:text-xl"
              >
                {t.subtitle}
              </motion.p>

              {/* actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.4 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  href={`/${locale}/reservations`}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-red-500/30 bg-red-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:translate-y-[-2px] hover:border-red-500 hover:bg-red-500 hover:shadow-[0_16px_40px_rgba(180,20,20,0.35)] sm:w-auto"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{t.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href={`tel:${t.phoneNumber.replace(/\s/g, '')}`}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:translate-y-[-2px] hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
                >
                  <Phone className="h-4 w-4 text-red-400 transition-colors duration-300 group-hover:text-red-300" />
                  <span>{t.phone}</span>
                </a>
              </motion.div>

              {/* phone number */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-6 text-sm text-white/45"
              >
                {t.phoneNumber}
              </motion.p>

              {/* note */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
              >
                <p className="text-sm leading-relaxed text-white/58">
                  {t.note}
                </p>
              </motion.div>
            </div>

            {/* corner accents */}
            <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-red-500/20 md:h-20 md:w-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}