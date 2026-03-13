'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Highlights() {
  const t = useTranslations('highlights');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const items = [
    t('items.0.title'),
    t('items.1.title'),
    t('items.2.title'),
    t('items.3.title'),
  ].map((title, index) => ({
    title,
    description: t(`items.${index}.description`),
  }));

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-anthracite relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ruby/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-ruby/10 border border-ruby/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-ruby" />
            <span className="text-xs lg:text-sm text-ruby uppercase tracking-widest font-medium">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream mb-6 leading-tight">
            {t('title')}
          </h2>

          <p className="text-base lg:text-lg text-cream/70 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group bg-anthracite-light border border-cream/5 rounded-2xl p-8 hover:border-ruby/30 transition-all duration-500 hover:shadow-2xl hover:shadow-ruby/10 hover:-translate-y-1"
            >
              <h3 className="text-xl lg:text-2xl font-serif font-bold text-cream mb-3 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-cream/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/menu`}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-gold/30 hover:border-gold hover:bg-gold/10 text-gold px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
          >
            {t('cta')}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
