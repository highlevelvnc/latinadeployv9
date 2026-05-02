'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Instagram, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const content = {
  pt: {
    badge: '@latina.grill',
    title: 'Momentos',
    cta: 'Seguir no Instagram',
  },
  en: {
    badge: '@latina.grill',
    title: 'Moments',
    cta: 'Follow on Instagram',
  },
  fr: {
    badge: '@latina.grill',
    title: 'Moments',
    cta: 'Suivre sur Instagram',
  },
  ru: {
    badge: '@latina.grill',
    title: 'Моменты',
    cta: 'Подписаться в Instagram',
  },
  zh: {
    badge: '@latina.grill',
    title: '精彩瞬间',
    cta: '在 Instagram 上关注',
  },
};

export default function PremiumGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();
  const a = useTranslations('a11y');
  const t = content[locale as keyof typeof content] || content.pt;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { src: '/tomahawklinda.webp', span: 'col-span-2 row-span-2', alt: 'Tomahawk' },
    { src: '/ribeygrelha.webp', span: 'col-span-1', alt: 'Ribeye' },
    { src: '/costela.webp', span: 'col-span-1', alt: 'Costela' },
    { src: '/restaurantelocal3.webp', span: 'col-span-1', alt: 'Ambiente' },
    { src: '/petitgateau.webp', span: 'col-span-1', alt: 'Sobremesa' },
    { src: '/restaurantelocal2.webp', span: 'col-span-2', alt: 'Interior' },
    { src: '/bandejalatina1.webp', span: 'col-span-1', alt: 'Bandeja' },
    { src: '/sobremesatrufa.jpeg', span: 'col-span-1', alt: 'Trufa' },
  ];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() =>
    setLightboxIndex((prev) => (prev === null ? null : prev === 0 ? images.length - 1 : prev - 1)),
    [images.length]
  );
  const showNext = useCallback(() =>
    setLightboxIndex((prev) => (prev === null ? null : prev === images.length - 1 ? 0 : prev + 1)),
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 md:mb-16"
        >
          <a
            href="https://www.instagram.com/latina.grill/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-black/20 bg-black/[0.04] px-6 py-2.5 mb-8 hover:bg-black/[0.08] transition-colors duration-300 group"
          >
            <Instagram className="w-4 h-4 text-black/50 group-hover:text-black/80 transition-colors" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/60 group-hover:text-black/80 transition-colors">{t.badge}</span>
          </a>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-black tracking-tight">
            {t.title}
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-3 md:gap-5"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className={`relative overflow-hidden group rounded-2xl cursor-pointer active:opacity-90 transition-opacity duration-150 ${image.span}`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-out md:grayscale md:group-hover:grayscale-0"
              />
              {/* Hover overlay — desktop only (touch never activates hover) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 rounded-2xl flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Ver
                </span>
              </div>

              {/* Mobile tap indicator — persistent, subtle, communicates interactivity */}
              <div className="md:hidden absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 border border-white/18 backdrop-blur-sm pointer-events-none">
                <ZoomIn className="h-3.5 w-3.5 text-white/55" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-center mt-14"
        >
          <a
            href="https://www.instagram.com/latina.grill/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-black/35 bg-black/[0.04] px-12 py-5 text-sm font-semibold uppercase tracking-[0.3em] text-black transition-all duration-500 hover:border-black hover:bg-black hover:text-white hover:shadow-[0_16px_45px_rgba(0,0,0,0.15)]"
          >
            <Instagram className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {t.cta}
          </a>
        </motion.div>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
              aria-label={a('close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white md:left-8"
              aria-label={a('previousImage')}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white md:right-8"
              aria-label={a('nextImage')}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="relative w-full h-full max-w-5xl max-h-[88vh] mx-12 md:mx-24"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/45 tracking-widest tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
