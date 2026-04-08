'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Calendar, FileText } from 'lucide-react';
import {
  stickyBarVariants,
  buttonVariants,
  buttonSecondaryVariants,
} from '@/lib/animations';

/**
 * StickyReservationBar
 * ─────────────────────────────────────────────────────────────────────────────
 * Mobile-only sticky bar (lg:hidden) — appears after scrolling past the hero
 * and hides when the final ReservationCTA enters the viewport.
 *
 * Animation: spring-based entrance from lib/animations (stickyBarVariants).
 * Buttons: whileHover / whileTap via buttonVariants for tactile feedback.
 *
 * Translation keys:
 *   stickyBar.reserve — "Reservar Mesa" / "Book a Table" / "Réserver une table"
 *   stickyBar.menu    — "Ver Menu" / "View Menu" / "Voir le menu"
 */

const MotionLink = motion(Link);

export default function StickyReservationBar() {
  const t = useTranslations('stickyBar');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroThreshold = window.innerHeight * 0.9;
    let passedHero = false;

    const ctaSection = document.getElementById('reservation-cta');

    // IntersectionObserver — hide bar when final CTA is on-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (passedHero) setVisible(!entry.isIntersecting);
      },
      { threshold: 0.12 },
    );
    if (ctaSection) observer.observe(ctaSection);

    // Scroll listener — show bar once past hero
    const onScroll = () => {
      if (window.scrollY > heroThreshold && !passedHero) {
        passedHero = true;
        setVisible(true);
      } else if (window.scrollY <= heroThreshold && passedHero) {
        passedHero = false;
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          variants={stickyBarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          {/* Frosted glass bar */}
          <div className="flex items-center gap-2.5 border-t border-white/[0.07] bg-black/92 px-4 py-3 backdrop-blur-xl">

            {/* Primary CTA — Reserve */}
            <MotionLink
              href={`/${locale}/reservations`}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_6px_24px_rgba(180,20,20,0.38)]"
            >
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{t('reserve')}</span>
            </MotionLink>

            {/* Secondary CTA — View Menu */}
            <MotionLink
              href={`/${locale}/menu`}
              variants={buttonSecondaryVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className="flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80"
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span>{t('menu')}</span>
            </MotionLink>
          </div>

          {/* Safe area spacer for iOS home indicator */}
          <div className="bg-black/92" style={{ height: 'env(safe-area-inset-bottom)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
