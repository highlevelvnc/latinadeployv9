'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  // Refs for programmatic play — iOS Safari requires .play() call even
  // when autoPlay, muted and playsInline are all set as attributes.
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tryPlay = (el: HTMLVideoElement | null) => {
      if (!el) return;
      // Belt-and-suspenders: set muted via property (in addition to attribute)
      // Safari on iOS sometimes ignores the HTML attribute alone.
      el.muted = true;
      el.play().catch(() => {
        // Silently swallow — autoplay policy may block on some browsers,
        // but muted + playsInline should always succeed on iOS.
      });
    };
    tryPlay(mobileVideoRef.current);
    tryPlay(desktopVideoRef.current);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Mobile background video
            — src directly on <video> (no <source> child) for maximum iOS compat
            — no key prop: prevents React from remounting on re-render
            — playsInline: prevents iOS from opening fullscreen player
            — muted: required for autoplay policy on all browsers            */}
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/heromobile.mp4"
          className="h-full w-full object-cover md:hidden"
        />

        {/* Desktop background video */}
        <video
          ref={desktopVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/header.mp4"
          className="hidden h-full w-full object-cover md:block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <h1 className="sr-only">Latina Grill Cascais — Restaurante de Carnes Premium em Cascais</h1>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-white/70 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
          <ChevronDown size={32} className="drop-shadow-2xl" />
        </motion.div>
      </motion.button>
    </section>
  );
}
