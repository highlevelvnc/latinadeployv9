'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Music, Calendar } from 'lucide-react';

export default function LiveMusic() {
  const t = useTranslations('liveMusic');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.website.dish.co/media/80/68/5189673/Latina-Grill-Steakhouse-283159230-433868132074755-1427349009624093335-n-jpg.jpg"
          alt="Live Music at Latina Grill"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite via-anthracite/90 to-anthracite/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-anthracite" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-ruby/20 border border-ruby/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Music className="w-4 h-4 text-ruby" />
              <span className="text-xs lg:text-sm text-ruby uppercase tracking-widest font-medium">
                {t('badge')}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream mb-6 leading-tight">
              {t('title')}
              <br />
              <span className="text-ruby">{t('titleHighlight')}</span>
            </h2>

            {/* Description */}
            <p className="text-base lg:text-lg text-cream/80 mb-8 leading-relaxed">
              {t('description')}
            </p>

            {/* Schedule */}
            <div className="flex items-center gap-3 bg-anthracite-light/80 border border-cream/10 rounded-xl px-6 py-4 mb-8 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-cream font-medium">
                {t('schedule')}
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/reservations`}
              className="inline-flex items-center gap-2 bg-ruby hover:bg-ruby-light text-cream px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-ruby/40"
            >
              {t('cta')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-anthracite to-transparent" />
    </section>
  );
}
