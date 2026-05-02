'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function LogoOverlap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  const locale = useLocale();

  const content = {
    pt: {
      eyebrow: 'Latina Grill Cascais',
      title: 'Onde a brasa, o corte e a apresentação se encontram',
      description:
        'No coração de Cascais, o Latina Grill transforma cada serviço numa experiência visual e gastronómica. Cortes nobres, fogo preciso, ambiente sofisticado e uma identidade marcada pela intensidade dos sabores.'
    },
    en: {
      eyebrow: 'Latina Grill Cascais',
      title: 'Where fire, premium cuts and presentation meet',
      description:
        'In the heart of Cascais, Latina Grill turns every service into a visual and gastronomic experience. Noble cuts, precise fire, sophisticated atmosphere and an identity shaped by intense flavors.'
    },
    fr: {
      eyebrow: 'Latina Grill Cascais',
      title: 'Là où le feu, la coupe et la présentation se rencontrent',
      description:
        'Au cœur de Cascais, le Latina Grill transforme chaque service en une expérience visuelle et gastronomique. Viandes nobles, cuisson précise, ambiance sophistiquée et identité marquée par l’intensité des saveurs.'
    },
    ru: {
      eyebrow: 'Latina Grill Cascais',
      title: 'Там, где огонь, отруб и подача встречаются',
      description:
        'В самом сердце Каскайша Latina Grill превращает каждое обслуживание в визуальный и гастрономический опыт. Благородные отрубы, точный огонь, изысканная атмосфера и индивидуальность, рождённая насыщенностью вкусов.'
    },
    zh: {
      eyebrow: 'Latina Grill Cascais',
      title: '当炭火、肉切与呈现交汇',
      description:
        '坐落于卡斯凯什的心脏地带，Latina Grill将每一次用餐化为视觉与美食的双重体验。精选肉切、精准火候、雅致氛围，以及由浓郁风味塑造的独特个性。'
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-8 pt-10 pb-20 sm:-mt-10 sm:pt-12 sm:pb-24 lg:-mt-20 lg:pt-0 lg:pb-32"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-[42%] sm:-translate-y-[46%] lg:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute inset-0 scale-125 rounded-full bg-red-600/25 blur-3xl" />
              <div className="absolute inset-0 scale-[1.16] rounded-full border border-white/10" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-black/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40">
                <div className="absolute inset-[6px] rounded-full border border-red-500/20" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent" />
                <Image
                  src="/logo.webp"
                  alt="Latina Grill"
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
                  className="object-contain p-4 sm:p-5 drop-shadow-[0_0_30px_rgba(220,38,38,0.45)]"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:rounded-[30px]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-red-700/10 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-600/10 blur-[140px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            </div>

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '42px 42px'
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative px-5 pb-10 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-18 md:px-10 md:pb-14 md:pt-24 lg:px-16 lg:pb-20 lg:pt-28"
            >
              <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-400 sm:text-[11px] md:text-xs">
                  {t.eyebrow}
                </span>
              </div>

              <h2 className="mx-auto max-w-5xl text-3xl font-bold leading-[1.08] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t.title}
              </h2>

              <div className="mx-auto my-7 flex items-center justify-center gap-4">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-500 sm:w-12 md:w-16" />
                <div className="h-2.5 w-2.5 rotate-45 bg-red-500" />
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-red-500 sm:w-12 md:w-16" />
              </div>

              <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/72 sm:text-[17px] md:text-lg">
                {t.description}
              </p>
            </motion.div>

            <div className="absolute left-0 top-0 h-14 w-14 border-l border-t border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute right-0 top-0 h-14 w-14 border-r border-t border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute bottom-0 left-0 h-14 w-14 border-b border-l border-red-500/20 md:h-20 md:w-20" />
            <div className="absolute bottom-0 right-0 h-14 w-14 border-b border-r border-red-500/20 md:h-20 md:w-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}