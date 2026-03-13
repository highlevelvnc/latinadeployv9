'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    { name: t('items.0.name'), text: t('items.0.text') },
    { name: t('items.1.name'), text: t('items.1.text') },
    { name: t('items.2.name'), text: t('items.2.text') },
    { name: t('items.3.name'), text: t('items.3.text') }
  ];

  const googleReviewsUrl = 'https://share.google/8vw79KB0bb72pWBIA';

  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-24 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px'
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
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
            <Quote className="h-4 w-4 text-red-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
              {t('badge')}
            </span>
          </div>

          <h2 className="font-serif text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>

          <div className="mx-auto my-7 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500 md:w-16" />
            <div className="h-2.5 w-2.5 rotate-45 bg-red-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500 md:w-16" />
          </div>

          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-red-500 text-red-500"
                  />
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

        {/* Marquee testimonials */}
        <div className="relative">
          {/* gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#050505] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#050505] to-transparent md:w-32" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden"
          >
            <motion.div
              className="flex w-max gap-6 py-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 28,
                ease: 'linear',
                repeat: Infinity
              }}
            >
              {loopedTestimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className="group relative flex min-h-[320px] w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-500/35 hover:bg-white/[0.055] md:w-[380px]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-red-600/[0.08] via-transparent to-white/[0.03]" />

                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-red-500 text-red-500"
                          />
                        ))}
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                        <Quote className="h-5 w-5 text-red-400" />
                      </div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-white/72 md:text-base">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  <div className="relative mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-red-600 to-red-800 text-sm font-bold text-white shadow-[0_0_24px_rgba(180,20,20,0.25)]">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        Google Reviews
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-500 via-white/70 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}