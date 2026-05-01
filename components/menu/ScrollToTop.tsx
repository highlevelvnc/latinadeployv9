'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/**
 * Floating "back to top" button that fades in once the user has scrolled
 * past ~600px. Useful for long category lists (especially wines) where
 * the user might be deep in the grid and want to jump to the nav.
 *
 * Positioned bottom-right with safe-area inset so it never sits under
 * iPhone home indicator. Uses framer-motion AnimatePresence so the
 * appear/disappear feels intentional — not a jarring snap.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-dark/90 text-white/85 shadow-lg shadow-black/40 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:border-red/40 hover:bg-red/15 hover:text-white"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
