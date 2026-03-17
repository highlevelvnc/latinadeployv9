'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Quote, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialCard({
  testimonial,
  delay = 0,
  isInView,
}: {
  testimonial: { name: string; text: string };
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-500/35 hover:bg-white/[0.055] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] min-h-[280px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-red-600/[0.07] via-transparent to-white/[0.02] rounded-[24px]" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-500 via-white/50 to-transparent transition-all duration-700 group-hover:w-full" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            ))}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <Quote className="h-4 w-4 text-red-400" />
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-white/70">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      <div className="relative mt-7 flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-red-600 to-red-800 text-sm font-bold text-white shadow-[0_0_20px_rgba(180,20,20,0.2)]">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Google Reviews
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    { name: t('items.0.name'), text: t('items.0.text') },
    { name: t('items.1.name'), text: t('items.1.text') },
    { name: t('items.2.name'), text: t('items.2.text') },
    { name: t('items.3.name'), text: t('items.3.text') },
  ];

  const googleReviewsUrl = 'https://share.google/8vw79KB0bb72pWBIA';

  const handlePrev = () =>
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#050505] py-16 lg:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500/25" />
            <Quote className="h-3.5 w-3.5 text-red-400/55" />
            <div className="h-px w-8 bg-red-500/25" />
          </div>

          <h2 className="font-serif text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>

          <div className="mx-auto my-7 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500/40 to-transparent md:w-24" />
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/75">
                {t('googleReviews')}
              </span>
            </div>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-600/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_12px_30px_rgba(180,20,20,0.28)]"
            >
              <span>{t('seeAllReviews')}</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* ── Desktop: 2 × 2 premium grid ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              delay={0.2 + index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Mobile: single-card slider ── */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
              >
                <TestimonialCard
                  testimonial={testimonials[activeSlide]}
                  delay={0}
                  isInView={isInView}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-white active:scale-95"
              aria-label="Testemunho anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {testimonials.map((_, index) => (
                // h-8 w-8 = 32px hit area; visual dot stays 6px × 6px (or 24px active)
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
                  aria-label={`Testemunho ${index + 1}`}
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? 'w-6 bg-red-500'
                      : 'w-1.5 bg-white/25 hover:bg-white/40'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-white active:scale-95"
              aria-label="Próximo testemunho"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
