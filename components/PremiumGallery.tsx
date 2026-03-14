'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { useLocale } from 'next-intl';

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
};

export default function PremiumGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();
  const t = content[locale as keyof typeof content] || content.pt;

  const images = [
    { src: '/tomahawklinda.jpeg', span: 'col-span-2 row-span-2', alt: 'Tomahawk' },
    { src: '/ribeygrelha.jpeg', span: 'col-span-1', alt: 'Ribeye' },
    { src: '/costela.jpeg', span: 'col-span-1', alt: 'Costela' },
    { src: '/restaurantelocal3.jpeg', span: 'col-span-1', alt: 'Ambiente' },
    { src: '/petitgateau.jpeg', span: 'col-span-1', alt: 'Sobremesa' },
    { src: '/restaurantelocal2.jpeg', span: 'col-span-2', alt: 'Interior' },
    { src: '/bandejalatina1.jpeg', span: 'col-span-1', alt: 'Bandeja' },
    { src: '/sobremesatrufa.jpeg', span: 'col-span-1', alt: 'Trufa' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
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
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-4 md:gap-5"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className={`relative overflow-hidden group rounded-2xl ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-out grayscale group-hover:grayscale-0"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 rounded-2xl" />
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
    </section>
  );
}
