'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import {
  buttonVariants,
  buttonSecondaryVariants,
  INVIEW_MARGIN,
} from '@/lib/animations';

const MotionLink = motion(Link);

export default function ReservationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: INVIEW_MARGIN });
  const t = useTranslations('reservationCta');
  const locale = useLocale();
  const phoneNumber = '+351 968 707 515';

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-16 lg:py-32"
    >
      {/* Subtle food image background — very low opacity for texture */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/tomahawklinda.webp"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.07 }}
          quality={60}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#050505]/88" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/10 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
      </div>

      {/* Subtle grid texture */}
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
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.05] via-transparent to-white/[0.02]" />

            <div className="relative px-5 py-10 text-center md:px-10 md:py-14 lg:px-16 lg:py-20">

              {/* Badge — with animated availability dot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-5 md:mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5"
              >
                <span className="relative flex h-2 w-2">
                  <motion.span
                    animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0.1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inline-flex h-full w-full rounded-full bg-red-400"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
                  {t('badge')}
                </span>
              </motion.div>

              {/* title */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mx-auto max-w-4xl font-serif text-[1.75rem] sm:text-[2.25rem] md:text-5xl md:leading-[1.05] lg:text-6xl font-bold leading-[1.14] text-white"
              >
                {t('title')}
              </motion.h2>

              {/* divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mx-auto my-5 md:my-8 flex items-center justify-center"
              >
                <div className="h-0.5 w-10 rounded-full bg-red-500/55" />
              </motion.div>

              {/* subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mx-auto max-w-3xl text-[15px] sm:text-base md:text-xl leading-relaxed text-white/65"
              >
                {t('subtitle')}
              </motion.p>

              {/* actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.4 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                {/* Primary — Reserve (spring micro-interaction) */}
                <MotionLink
                  href={`/${locale}/reservations`}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-red-500/30 bg-red-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_32px_rgba(180,20,20,0.35)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-red-400 hover:bg-red-500 hover:shadow-[0_16px_50px_rgba(180,20,20,0.55)] sm:w-auto"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{t('cta')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MotionLink>

                {/* Secondary — Call (outline, spring) */}
                <motion.a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  variants={buttonSecondaryVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-[background-color,border-color] duration-300 hover:border-white/30 hover:bg-white/[0.07] sm:w-auto"
                >
                  <Phone className="h-4 w-4 text-red-400 transition-colors duration-300 group-hover:text-red-300" />
                  <span>{t('phone')}</span>
                </motion.a>
              </motion.div>

              {/* phone number — hidden on mobile (button above already covers it), visible sm+ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-6 hidden sm:block"
              >
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {phoneNumber}
                </a>
              </motion.div>

              {/* note */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
              >
                <p className="text-sm leading-relaxed text-white/55">
                  {t('note')}
                </p>
              </motion.div>
            </div>

            {/* corner accents — desktop only (rounded-[32px] card breaks them on mobile) */}
            <div className="absolute left-0 top-0 hidden h-20 w-20 border-l border-t border-red-500/20 md:block" />
            <div className="absolute right-0 top-0 hidden h-20 w-20 border-r border-t border-red-500/20 md:block" />
            <div className="absolute bottom-0 left-0 hidden h-20 w-20 border-b border-l border-red-500/20 md:block" />
            <div className="absolute bottom-0 right-0 hidden h-20 w-20 border-b border-r border-red-500/20 md:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}