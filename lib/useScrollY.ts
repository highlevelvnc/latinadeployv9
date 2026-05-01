'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to window scroll, returns a boolean state that flips when
 * crossing the given threshold. Centralizing scroll listeners here
 * (instead of one per component) cuts down on event handler attach/
 * detach churn — useful when multiple components (CategoryNav,
 * ScrollToTop) react to scroll position.
 *
 * Uses a single passive listener and rAF throttling for smoothness on
 * mobile where scroll fires at 60-120Hz.
 */
export function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setPast(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update(); // initial check
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return past;
}
