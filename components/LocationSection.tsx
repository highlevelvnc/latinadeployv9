'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, Clock, Award } from 'lucide-react';
import {
  containerVariants,
  fadeUp,
  badgePop,
  slideFromLeft,
  slideFromRight,
  EASE_OUT,
  INVIEW_MARGIN,
} from '@/lib/animations';

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: INVIEW_MARGIN });
  const t = useTranslations('location');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on image — GPU-only (transform only)
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const features = [
    { icon: MapPin, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: Clock,  title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Award,  title: t('feature3Title'), desc: t('feature3Desc') },
  ];

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Content — slides in from left */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-2 lg:order-1"
          >
            {/* Badge — pops in */}
            <motion.div
              variants={badgePop}
              className="inline-flex items-center gap-3 border border-black/15 px-5 py-2 mb-10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span className="text-[11px] text-black/55 uppercase tracking-[0.45em] font-semibold">
                {t('badge')}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-6 leading-[0.95] tracking-tight"
            >
              {t('title')}
            </motion.h2>

            <motion.div variants={fadeUp} className="w-20 h-px bg-red mb-8" />

            <motion.h3
              variants={fadeUp}
              className="text-2xl md:text-3xl font-serif text-black/70 mb-10 leading-tight"
            >
              {t('subtitle')}
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="text-lg text-black/60 leading-relaxed mb-12 font-light max-w-xl"
            >
              {t('description')}
            </motion.p>

            {/* Features — staggered list with hover lift */}
            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.28, ease: EASE_OUT } }}
                    whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-black flex items-center justify-center group-hover:bg-red transition-colors duration-500">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-black font-semibold mb-1 text-lg">{feature.title}</h4>
                      <p className="text-black/50 text-sm uppercase tracking-wider">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image with Parallax — slides in from right */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2 relative"
          >
            {/* Parallax wrapper — GPU transform only */}
            <motion.div style={{ y: imageY }}>
              <div className="relative h-[600px] lg:h-[700px] overflow-hidden group">
                <Image
                  src="/restaurantelocal.jpeg"
                  alt="Latina Grill Cascais"
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Frame decorativo */}
                <div className="absolute -inset-4 border-2 border-black/10 pointer-events-none" />
                <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-red" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}