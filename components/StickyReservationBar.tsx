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

/**
 * Broadcast visibility changes so other floating elements (PhoneFloat) can
 * step out of the way when the sticky bar is on screen. We use a window
 * CustomEvent instead of pulling in a state-management dependency — the
 * payload is one boolean and there are at most two listeners.
 */
const STICKY_BAR_EVENT = 'sticky-bar-visibility';

export default function StickyReservationBar() {
  const t = useTranslations('stickyBar');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [bottomGap, setBottomGap] = useState(0);

  // Broadcast visibility to other floats (PhoneFloat).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(STICKY_BAR_EVENT, { detail: visible }),
    );
  }, [visible]);

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

    // visualViewport tracking — keeps the bar glued to the visible bottom of
    // the screen, regardless of the mobile browser's address/toolbar showing
    // or hiding. Without this the bar appears to "float" once Chrome hides
    // its bottom UI on scroll-down.
    const vv = window.visualViewport;
    const updateGap = () => {
      if (!vv) return;
      const gap = window.innerHeight - vv.height - vv.offsetTop;
      setBottomGap(Math.max(0, gap));
    };
    updateGap();
    if (vv) {
      vv.addEventListener('resize', updateGap);
      vv.addEventListener('scroll', updateGap);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (vv) {
        vv.removeEventListener('resize', updateGap);
        vv.removeEventListener('scroll', updateGap);
      }
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
          className="fixed left-0 right-0 z-50 lg:hidden"
          style={{ bottom: `${bottomGap}px` }}
        >
          {/* Frosted-glass bar — anchored flush to the visual bottom */}
          <div className="flex items-center gap-2 border-t border-white/[0.08] bg-neutral-950/90 px-3 pb-3 pt-3 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
               style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            {/* Primary CTA — Reserve */}
            <MotionLink
              href={`/${locale}/reservations`}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(220,38,38,0.35)] min-h-[48px]"
            >
              <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{t('reserve')}</span>
            </MotionLink>

            {/* Secondary CTA — View Menu */}
            <MotionLink
              href={`/${locale}/menu`}
              variants={buttonSecondaryVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 min-h-[48px]"
            >
              <FileText className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{t('menu')}</span>
            </MotionLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
