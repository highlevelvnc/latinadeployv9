'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function RestaurantExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on the hero image only
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const content = {
    pt: {
      badge: 'O Espaço',
      title: 'Ambiente que Respira Autenticidade',
      description:
        'Do design rústico-sofisticado às mesas estrategicamente posicionadas para visualizar a grelha a carvão vegetal, cada elemento foi pensado para elevar a sua experiência. Madeira nobre, iluminação intimista e a energia das brasas criam uma atmosfera única em Cascais.',
      cta: 'Reserve a Sua Mesa',
      stats: [
        { value: 'Cascais', label: 'Localização privilegiada' },
        { value: 'Grelha a Carvão Vegetal', label: 'À vista de todos' },
        { value: '100+', label: 'Mesas & lugares exclusivos' },
      ],
      labels: ['Interior', 'Ambiente', 'Sala', 'Espaço', 'Atmosfera', 'Detalhes'],
    },
    en: {
      badge: 'The Space',
      title: 'Atmosphere that Breathes Authenticity',
      description:
        'From rustic-sophisticated design to tables strategically positioned to view the charcoal grill, every element was designed to elevate your experience. Noble wood, intimate lighting and the energy of embers create a unique atmosphere in Cascais.',
      cta: 'Reserve Your Table',
      stats: [
        { value: 'Cascais', label: 'Prime location' },
        { value: 'Charcoal Grill', label: 'In full view' },
        { value: '100+', label: 'Tables & exclusive seats' },
      ],
      labels: ['Interior', 'Atmosphere', 'Dining Room', 'Space', 'Ambiance', 'Details'],
    },
    fr: {
      badge: "L'Espace",
      title: "Ambiance qui Respire l'Authenticité",
      description:
        "Du design rustique-sophistiqué aux tables stratégiquement positionnées pour voir le grill au charbon de bois, chaque élément a été pensé pour élever votre expérience. Bois noble, éclairage intime et l'énergie des braises créent une atmosphère unique à Cascais.",
      cta: 'Réservez Votre Table',
      stats: [
        { value: 'Cascais', label: 'Emplacement privilégié' },
        { value: 'Grill au Charbon', label: 'En pleine vue' },
        { value: '100+', label: 'Tables & places exclusives' },
      ],
      labels: ['Intérieur', 'Ambiance', 'Salle', 'Espace', 'Atmosphère', 'Détails'],
    },
    ru: {
      badge: 'Пространство',
      title: 'Атмосфера, дышащая подлинностью',
      description:
        'От рустикально-изысканного интерьера до столов, специально расположенных с видом на угольный гриль, каждая деталь продумана, чтобы возвысить ваш опыт. Благородное дерево, камерное освещение и энергия углей создают атмосферу, не имеющую аналогов в Каскайше.',
      cta: 'Забронировать столик',
      stats: [
        { value: 'Каскайш', label: 'Привилегированное расположение' },
        { value: 'Угольный гриль', label: 'На виду у всех' },
        { value: '100+', label: 'Столиков и эксклюзивных мест' },
      ],
      labels: ['Интерьер', 'Атмосфера', 'Зал', 'Пространство', 'Обстановка', 'Детали'],
    },
    zh: {
      badge: '空间',
      title: '充满本真气息的氛围',
      description:
        '从质朴而雅致的设计，到精心布置可一览炭烤明火的餐桌——每一处细节都为提升您的体验而生。名贵木材、温馨灯光与炭火的能量，共同营造卡斯凯什独一无二的氛围。',
      cta: '预订餐桌',
      stats: [
        { value: '卡斯凯什', label: '黄金地段' },
        { value: '炭烤明火', label: '全程可视' },
        { value: '100+', label: '餐桌与专属座位' },
      ],
      labels: ['内饰', '氛围', '餐厅', '空间', '环境', '细节'],
    },
  };

  const t = content[locale as keyof typeof content] || content.pt;

  // Bento gallery — 6 images, 3 rows (editorial rhythm)
  // Desktop layout (3-col grid, grid-rows-[400px_280px_310px]):
  //   Row 1: local1 (col-span-2) | local2 (col-span-1)  → h 400px
  //   Row 2: local3 (col-span-1) | local5 (col-span-2)  → h 280px
  //   Row 3: local6 (col-span-2) | local7 (col-span-1)  → h 310px
  // Mobile (2-col, auto-rows-[200px]): all items col-span-1 → 3 rows of 2
  const bentoItems = [
    { src: '/restaurantelocal1.webp', colSpan: 'md:col-span-2', label: t.labels[0] },
    { src: '/restaurantelocal2.webp', colSpan: 'md:col-span-1', label: t.labels[1] },
    { src: '/restaurantelocal3.webp', colSpan: 'md:col-span-1', label: t.labels[2] },
    { src: '/restaurantelocal5.webp', colSpan: 'md:col-span-2', label: t.labels[3] },
    { src: '/restaurantelocal6.jpeg', colSpan: 'md:col-span-2', label: t.labels[4] },
    { src: '/restaurantelocal7.jpeg', colSpan: 'md:col-span-1', label: t.labels[5] },
  ];

  // Lightbox — same pattern as PremiumGallery
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? null : prev === 0 ? bentoItems.length - 1 : prev - 1
      ),
    [bentoItems.length]
  );
  const showNext = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? null : prev === bentoItems.length - 1 ? 0 : prev + 1
      ),
    [bentoItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(155deg, #0e0c0a 0%, #0c0b09 45%, #100d0b 100%)',
      }}
    >
      {/* ── Ambient warm glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-red-950/18 blur-[180px]" />
        <div className="absolute bottom-0 -left-20 h-[380px] w-[380px] rounded-full bg-amber-950/12 blur-[160px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-900/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        {/* Grain texture */}
        <div className="absolute inset-0 bg-grain opacity-25" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ══════════════════════════════════════════
            ZONE A — Editorial Hero Split
        ══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-14 lg:mb-16">

          {/* Left: Text column */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
                {t.badge}
              </span>
            </div>

            {/* H2 */}
            <h2 className="text-[2rem] md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.08] md:leading-[1.05] tracking-tight">
              {t.title}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-px bg-gradient-to-r from-red-500/80 to-transparent" />
            </div>

            {/* Description */}
            <p className="text-base lg:text-[17px] text-white/62 leading-relaxed mb-10 font-normal max-w-lg">
              {t.description}
            </p>

            {/* CTA — strong, consistent with dark sections */}
            <Link
              href={`/${locale}/reservations`}
              className="group inline-flex items-center gap-3 rounded-full border border-red-500/35 bg-red-600/10 px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_16px_45px_rgba(180,20,20,0.38)]"
            >
              <span>{t.cta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right: Hero image with parallax */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative h-[420px] lg:h-[540px] overflow-hidden rounded-3xl group"
          >
            <Image
              src="/restaurantelocal4.webp"
              alt="Interior Latina Grill Cascais"
              fill
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle ring border */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/8 pointer-events-none" />
            {/* Bottom depth gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl pointer-events-none" />
            {/* Corner accent */}
            <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-red-500/25 pointer-events-none" />
            <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-red-500/25 pointer-events-none" />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            ZONE B — Facts bar
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-b border-white/8 py-7 mb-10 lg:mb-16"
        >
          <div className="grid grid-cols-3 divide-x divide-white/8">
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.08 }}
                className="flex flex-col items-center text-center px-4 py-2"
              >
                <span className="font-serif text-base md:text-3xl font-bold text-white mb-1.5 leading-tight tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/35 leading-relaxed">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            ZONE C — Bento Editorial Gallery
            Desktop: 3-col, rows 400/280/310px
            Mobile:  2-col, auto-rows 200px
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-2 auto-rows-[200px] md:grid-cols-3 md:grid-rows-[400px_280px_310px] gap-3 md:gap-4">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 + index * 0.09 }}
              onClick={() => setLightboxIndex(index)}
              className={`${item.colSpan} relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group`}
            >
              {/* Image — zoom on hover, no container scale */}
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Gradient: always visible on mobile (subtle), hover-reveal on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-100 transition-opacity duration-500 pointer-events-none md:opacity-0 md:group-hover:opacity-100" />

              {/* Label: always visible on mobile, slides in on hover for desktop */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pointer-events-none">
                <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 transition-all duration-300 ease-out md:translate-y-2 md:text-[11px] md:font-semibold md:tracking-[0.28em] md:text-white/80 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {item.label}
                </span>
              </div>

              {/* Permanent subtle border */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-white/6 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          LIGHTBOX — consistent with PremiumGallery
      ══════════════════════════════════════════ */}
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
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white md:left-8"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white md:right-8"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image with transition */}
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
                  src={bentoItems[lightboxIndex].src}
                  alt={bentoItems[lightboxIndex].label}
                  fill
                  className="object-contain"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/45 tracking-widest tabular-nums">
              {lightboxIndex + 1} / {bentoItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
