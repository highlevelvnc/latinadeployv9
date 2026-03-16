'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <video
          key="mobile-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover md:hidden"
        >
          <source src="/heromobile.mp4" type="video/mp4" />
        </video>

        {/* Desktop */}
        <video
          key="desktop-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden h-full w-full object-cover md:block"
        >
          <source src="/header.mp4" type="video/mp4" />
        </video>

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
