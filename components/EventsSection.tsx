'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_PLAY_INTERVAL = 5000;

// Images that rotate through the stack (3 images = 3 events)
const stackImages = ['/aniversario.jpeg', '/clientes.jpeg', '/aniversario1.jpeg'];

// Stack visual configs: front → middle → back
const stackConfigs = [
  { rotate: 0,  y: 0,  x: 0,   scale: 1,    opacity: 1,    z: 30 },
  { rotate: -3, y: 18, x: -10, scale: 0.93,  opacity: 0.55, z: 20 },
  { rotate:  4, y: 30, x:  12, scale: 0.87,  opacity: 0.28, z: 10 },
];

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();
  const [active, setActive] = useState(0);

  const content = {
    pt: {
      badge: 'Eventos Privados',
      overallTitle: 'Celebrações Memoráveis',
      cta: 'Planeie o Seu Evento',
      events: [
        {
          label: 'Aniversários & Casamentos',
          title: 'Celebrações que Ficam na Memória',
          description:
            'Dias únicos merecem espaços únicos. Criamos o ambiente perfeito para aniversários e casamentos com menu exclusivo, decoração personalizada e serviço de excelência para cada momento especial.',
        },
        {
          label: 'Eventos Corporativos',
          title: 'Jantares de Empresa & Conferências',
          description:
            'Do jantar executivo à conferência empresarial, oferecemos espaço privado para até 150 pessoas com serviço impecável, tecnologia e menus adaptados a cada ocasião profissional.',
        },
        {
          label: 'Celebrações Especiais',
          title: 'Momentos que Merecem o Melhor',
          description:
            'Seja qual for a ocasião, garantimos uma experiência marcada pela qualidade dos cortes premium, pela sofisticação do ambiente e pela atenção meticulosa a cada detalhe.',
        },
      ],
    },
    en: {
      badge: 'Private Events',
      overallTitle: 'Memorable Celebrations',
      cta: 'Plan Your Event',
      events: [
        {
          label: 'Birthdays & Weddings',
          title: 'Celebrations That Stay in Memory',
          description:
            'Unique days deserve unique spaces. We create the perfect atmosphere for birthdays and weddings with an exclusive menu, personalised decoration and exceptional service for every special moment.',
        },
        {
          label: 'Corporate Events',
          title: 'Company Dinners & Conferences',
          description:
            'From executive dinner to business conference, we offer private space for up to 150 people with impeccable service, technology and menus tailored to each professional occasion.',
        },
        {
          label: 'Special Celebrations',
          title: 'Moments That Deserve the Best',
          description:
            'Whatever the occasion, we guarantee an experience defined by the quality of premium cuts, the sophistication of the atmosphere and meticulous attention to every detail.',
        },
      ],
    },
    fr: {
      badge: 'Événements Privés',
      overallTitle: 'Célébrations Mémorables',
      cta: 'Planifiez Votre Événement',
      events: [
        {
          label: 'Anniversaires & Mariages',
          title: 'Des Célébrations qui Restent en Mémoire',
          description:
            'Les jours uniques méritent des espaces uniques. Nous créons l\'atmosphère parfaite pour les anniversaires et les mariages avec un menu exclusif et un service personnalisé.',
        },
        {
          label: 'Événements d\'Entreprise',
          title: 'Dîners d\'Entreprise & Conférences',
          description:
            'Du dîner exécutif à la conférence d\'entreprise, nous offrons un espace privé pour jusqu\'à 150 personnes avec technologie et service d\'excellence.',
        },
        {
          label: 'Célébrations Spéciales',
          title: 'Des Moments qui Méritent le Meilleur',
          description:
            'Quelle que soit l\'occasion, nous garantissons une expérience marquée par la qualité des coupes premium et l\'attention méticuleuse portée à chaque détail.',
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.pt;
  const events = t.events;

  // AutoPlay — only when visible
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % events.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isInView, events.length]);

  const handlePrev = () =>
    setActive((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  const handleNext = () =>
    setActive((prev) => (prev + 1) % events.length);

  return (
    <section ref={ref} className="relative py-16 lg:py-32 bg-black overflow-hidden">
      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-red-900/8 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-red-900/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-20"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.52em] text-white/30">{t.badge}</p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {t.overallTitle}
          </h2>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-6xl mx-auto">

          {/* ── Left: Image Stack ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative flex items-center justify-center order-1"
            style={{ height: '420px' }}
          >
            {stackImages.map((img, i) => {
              const pos = (i - active + stackImages.length) % stackImages.length;
              const cfg = stackConfigs[pos];

              return (
                <motion.div
                  key={img}
                  animate={{
                    rotate: cfg.rotate,
                    y: cfg.y,
                    x: cfg.x,
                    scale: cfg.scale,
                    opacity: cfg.opacity,
                    zIndex: cfg.z,
                  }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute"
                  style={{ width: '100%', maxWidth: '430px' }}
                >
                  <div
                    className="relative overflow-hidden rounded-xl"
                    style={{
                      height: '340px',
                      boxShadow:
                        pos === 0
                          ? '0 25px 60px rgba(0,0,0,0.65)'
                          : pos === 1
                          ? '0 12px 35px rgba(0,0,0,0.4)'
                          : '0 6px 20px rgba(0,0,0,0.25)',
                    }}
                  >
                    <Image
                      src={img}
                      alt="Evento Latina Grill"
                      fill
                      className={`object-cover transition-all duration-700 ${
                        pos === 0 ? '' : 'grayscale'
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Dark overlay on background images */}
                    {pos !== 0 && (
                      <div className="absolute inset-0 bg-black/30" />
                    )}

                    {/* Subtle corner accent on front image */}
                    {pos === 0 && (
                      <>
                        <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-red-500/35 pointer-events-none" />
                        <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-red-500/35 pointer-events-none" />
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Right: Event Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col order-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Event type label */}
                <div className="inline-block border border-white/12 rounded-full px-4 py-1.5 mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    {events[active].label}
                  </span>
                </div>

                {/* Event title */}
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5 leading-[1.15]">
                  {events[active].title}
                </h3>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-red-500/60" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-red-500/60" />
                </div>

                {/* Description */}
                <p className="text-base lg:text-[17px] text-white/58 leading-relaxed font-light mb-10">
                  {events[active].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-all duration-300 hover:border-red-500/45 hover:bg-red-600/10 hover:text-white active:scale-95"
                aria-label="Evento anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-1">
                {events.map((_, index) => (
                  // h-8 w-8 = 32px hit area; visual dot stays 6px × 6px (or 28px active)
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
                    aria-label={`Evento ${index + 1}`}
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === active
                        ? 'w-7 bg-red-500'
                        : 'w-1.5 bg-white/22 hover:bg-white/38'
                    }`} />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/55 transition-all duration-300 hover:border-red-500/45 hover:bg-red-600/10 hover:text-white active:scale-95"
                aria-label="Próximo evento"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <span className="text-[11px] text-white/28 tabular-nums tracking-wider ml-1">
                {String(active + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
              </span>
            </div>

            {/* CTA */}
            <div>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 rounded-full border border-red-500/35 bg-red-600/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_16px_40px_rgba(180,20,20,0.35)]"
              >
                {t.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
