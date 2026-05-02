'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

/**
 * Floating call button (FAB).
 *
 * Coordinates with StickyReservationBar:
 *   - When the sticky bar is showing on mobile (<lg), this FAB hides — the
 *     bar already exposes the primary "Reserve" CTA, two stacked floats was
 *     visual noise (and they were colliding at bottom-6 right-6 anyway).
 *   - On desktop (≥lg) the sticky bar is never rendered, so the FAB stays
 *     visible regardless of the broadcast.
 *
 * Tracks `window.visualViewport` to stay flush with the visible bottom of
 * the screen on mobile browsers — without this it appears to detach when
 * Chrome shows/hides its toolbar on scroll, same bug the sticky bar had.
 */

const DESKTOP_QUERY = '(min-width: 1024px)'; // matches Tailwind's `lg`

export default function PhoneFloat() {
  const phoneNumber = '+351968707515';
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [bottomGap, setBottomGap] = useState(0);

  // Listen for sticky bar visibility broadcasts.
  useEffect(() => {
    const handler = (e: Event) => {
      setStickyBarVisible((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener('sticky-bar-visibility', handler);
    return () => window.removeEventListener('sticky-bar-visibility', handler);
  }, []);

  // Track viewport size to know whether we're on desktop.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // visualViewport tracking — keeps the FAB anchored to the visible bottom
  // (works around the Chrome mobile toolbar detach bug).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const gap = window.innerHeight - vv.height - vv.offsetTop;
      setBottomGap(Math.max(0, gap));
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  // Hide only when on mobile AND the sticky bar is up. Desktop always shows.
  const hidden = !isDesktop && stickyBarVisible;

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: hidden ? 0 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.22, delay: hidden ? 0 : 0.6 }}
      whileHover={{ scale: hidden ? 0 : 1.08 }}
      whileTap={{ scale: hidden ? 0 : 0.94 }}
      style={{ bottom: `calc(${bottomGap}px + 1.5rem)` }}
      className="fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-900/40 transition-colors duration-200 hover:bg-red-500 lg:right-8"
      aria-label="Ligar para o restaurante"
      aria-hidden={hidden ? 'true' : undefined}
      tabIndex={hidden ? -1 : 0}
    >
      <Phone className="h-6 w-6" aria-hidden="true" />
    </motion.a>
  );
}
