'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, prefersReducedMotion ? 800 : 1500);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark bg-grain"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              filter: prefersReducedMotion 
                ? 'none' 
                : [
                    'drop-shadow(0 0 8px rgba(220, 38, 38, 0.3))',
                    'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))',
                    'drop-shadow(0 0 8px rgba(220, 38, 38, 0.3))',
                  ]
            }}
            transition={{ 
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
              filter: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative w-32 h-32 mb-6"
          >
            <Image
              src="/logo.png"
              alt="Latina Grill"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-serif font-bold text-light mb-1">Latina Grill</h2>
            <p className="text-sm text-light/60 uppercase tracking-widest">Cascais</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
