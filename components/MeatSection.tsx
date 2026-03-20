'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';

export default function MeatSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const t = useTranslations('meats');
  const cards = t.raw('cards') as { name: string; descriptor: string }[];

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0807 0%, #0d0b09 50%, #0a0807 100%)' }}
    >
      {/* ── Ambient warm glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-red-950/18 blur-[200px]" />
        <div className="absolute bottom-0 -left-16 h-[400px] w-[400px] rounded-full bg-amber-950/12 blur-[180px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-900/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute inset-0 bg-grain opacity-25" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[520px] lg:h-[720px] overflow-hidden rounded-3xl group">
              <Image
                src="/tomahawklatina.jpeg"
                alt="Tomahawk Premium"
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                priority
              />

              {/* Subtle ring border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/8 pointer-events-none" />

              {/* Bottom depth gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-red-500/25 pointer-events-none" />
              <div className="absolute bottom-[96px] right-5 w-10 h-10 border-b border-r border-red-500/25 pointer-events-none" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-black/90 backdrop-blur-sm border-t border-white/[0.07] px-8 py-6">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <h4 className="text-xl font-serif font-bold text-white tracking-tight leading-none">
                    {t('overlayTitle')}
                  </h4>
                </div>
                <p className="text-white/50 text-[11px] uppercase tracking-[0.25em]">
                  {t('overlaySubtitle')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Content column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
                {t('tag')}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl lg:text-[4.25rem] font-serif font-bold text-white mb-3 leading-[1.08] tracking-tight">
              {t('title')}
            </h2>

            {/* Subtitle */}
            <p className="text-[12px] text-white/45 uppercase tracking-[0.14em] mb-9 font-light leading-loose whitespace-pre-line">
              {t('subtitle')}
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-red-500 via-red-500/40 to-transparent mb-10" />

            {/* Description */}
            <p className="text-[17px] text-white/55 leading-[1.85] mb-12 font-light">
              {t('description')}
            </p>

            {/* ── Cards — editorial separator style ── */}
            <div className="border-b border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-14">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.42 + index * 0.09 }}
                  className="relative border-t border-white/[0.08] py-6 pl-5 group cursor-default select-none"
                >
                  {/* Floating left rule */}
                  <span className="absolute left-0 top-5 bottom-5 w-px bg-red-500/30 group-hover:bg-red-500/70 transition-colors duration-500" />

                  <p className="text-[13px] font-medium text-white/72 group-hover:text-white/92 transition-colors duration-400 leading-snug mb-[7px]">
                    {card.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/28 group-hover:text-white/48 transition-colors duration-400 leading-tight">
                    {card.descriptor}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/latina-grill-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-600/10 px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.28em] text-white/85 transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-[0_16px_48px_rgba(180,20,20,0.35)]"
            >
              {t('cta')}
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
