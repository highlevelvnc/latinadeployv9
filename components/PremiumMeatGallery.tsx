'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Thermometer, Award, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type LocaleKey = 'pt' | 'en' | 'fr';

type Feature = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

type GalleryImage = {
  src: string;
  title: string;
  subtitle: string;
  objectPosition?: string;
  thumbPosition?: string;
};

export default function PremiumMeatGallery() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale() as LocaleKey;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

  const content: Record<
    LocaleKey,
    {
      overline: string;
      title: string;
      subtitle: string;
      processText: string;
      spotlightLabel: string;
      gallerySubtitle: string;
      features: Feature[];
      images: GalleryImage[];
    }
  > = {
    pt: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Carne, fogo e tempo no ponto certo',
      subtitle:
        'Maturação controlada, cortes com presença e fogo bem executado. Uma apresentação pensada para marcar a experiência.',
      processText:
        'O cuidado não aparece como discurso. Aparece no corte, no ponto, na textura e na forma como cada peça chega à mesa.',
      spotlightLabel: 'Spotlight',
      gallerySubtitle: 'Do frio à brasa',
      features: [
        {
          icon: Thermometer,
          label: 'Maturação precisa',
          desc: 'Temperatura, tempo e consistência tratados com rigor em cada etapa.',
        },
        {
          icon: Award,
          label: 'Cortes com critério',
          desc: 'Seleção orientada por origem, textura, marmoreado e presença no prato.',
        },
        {
          icon: Clock,
          label: 'Tempo respeitado',
          desc: 'Do repouso ao serviço, cada detalhe trabalhado sem pressa nem excesso.',
        },
      ],
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origem, maturação e controlo',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/ribeygrelha1.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Presença monumental à mesa',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/ribeygrelha.jpeg',
          title: 'Fire Finish',
          subtitle: 'Fogo, intensidade e espetáculo',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Textura e marmoreado',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Profundidade de sabor',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Precisão antes da grelha',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
      ],
    },

    en: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Meat, fire and time at the right point',
      subtitle:
        'Controlled aging, cuts with presence and well-executed fire. A presentation designed to leave a lasting mark.',
      processText:
        "Care doesn't appear as a speech. It appears in the cut, the doneness, the texture and the way each piece reaches the table.",
      spotlightLabel: 'Spotlight',
      gallerySubtitle: 'From cold room to fire',
      features: [
        {
          icon: Thermometer,
          label: 'Precise aging',
          desc: 'Temperature, timing and consistency handled with rigor at every stage.',
        },
        {
          icon: Award,
          label: 'Cuts with criteria',
          desc: 'Selection guided by origin, texture, marbling and plate presence.',
        },
        {
          icon: Clock,
          label: 'Time respected',
          desc: 'From resting to service, every detail handled without rush or excess.',
        },
      ],
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origin, aging and control',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/bandejalatinatomahawk.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Monumental table presence',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/tomahawkchamas.jpeg',
          title: 'Fire Finish',
          subtitle: 'Fire, intensity and spectacle',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Texture and marbling',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Depth of flavor',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Precision before the grill',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
      ],
    },

    fr: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Viande, feu et temps au bon point',
      subtitle:
        "Affinage contrôlé, coupes avec présence et feu maîtrisé. Une présentation pensée pour marquer l'expérience.",
      processText:
        "Le soin ne s'exprime pas par un discours. Il se voit dans la coupe, la cuisson, la texture et la manière dont chaque pièce arrive à table.",
      spotlightLabel: 'Spotlight',
      gallerySubtitle: 'Du froid à la braise',
      features: [
        {
          icon: Thermometer,
          label: 'Affinage précis',
          desc: 'Température, temps et régularité travaillés avec rigueur à chaque étape.',
        },
        {
          icon: Award,
          label: 'Coupes exigeantes',
          desc: "Sélection guidée par l'origine, la texture, le persillage et la présence visuelle.",
        },
        {
          icon: Clock,
          label: 'Temps respecté',
          desc: 'Du repos au service, chaque détail sans précipitation ni excès.',
        },
      ],
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origine, affinage et contrôle',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/bandejalatinatomahawk.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Présence monumentale à table',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/tomahawkchamas.jpeg',
          title: 'Fire Finish',
          subtitle: 'Feu, intensité et spectacle',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Texture et persillage',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Profondeur de saveur',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Précision avant le grill',
          objectPosition: 'center center',
          thumbPosition: 'center center',
        },
      ],
    },
  };

  const t = content[locale] || content.pt;

  const activeImage = useMemo(() => {
    return t.images[activeIndex] || t.images[0];
  }, [activeIndex, t.images]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          'radial-gradient(circle at 8% 12%, rgba(120,15,15,0.16) 0%, transparent 38%), radial-gradient(circle at 92% 88%, rgba(255,255,255,0.03) 0%, transparent 30%), linear-gradient(180deg, #110d0d 0%, #161010 50%, #0e0a0a 100%)',
      }}
    >
      <div className="pointer-events-none absolute left-[3%] top-[6%] h-[300px] w-[300px] rounded-full bg-red-800/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[4%] h-[200px] w-[200px] rounded-full bg-white/[0.025] blur-[100px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="order-2 lg:order-1"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-red-400/70">
              {t.overline}
            </p>

            <h2 className="font-serif text-[2.7rem] font-bold leading-[0.93] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              {t.title}
            </h2>

            <div className="mb-7 mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-red-500/65 to-transparent" />
              <div className="h-1.5 w-1.5 rotate-45 bg-red-500/55" />
            </div>

            <p className="max-w-[300px] text-[15px] font-normal leading-relaxed text-white/55 xl:max-w-[320px]">
              {t.subtitle}
            </p>

            <div className="mt-9">
              {t.features.map((feature, i) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
                    className="group flex items-start gap-4 border-t border-white/8 py-4 first:border-t-0 first:pt-0"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/[0.04] transition-all duration-300 group-hover:border-red-500/22 group-hover:bg-red-500/[0.08]">
                      <Icon className="h-3.5 w-3.5 text-white/42 transition-colors duration-300 group-hover:text-red-400" />
                    </div>

                    <div>
                      <p className="mb-0.5 text-[13px] font-semibold leading-tight text-white/82">
                        {feature.label}
                      </p>
                      <p className="text-[12px] leading-relaxed text-white/38">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="mt-8 border-l-2 border-red-500/22 pl-5"
            >
              <p className="text-[13px] font-light italic leading-relaxed text-white/44">
                {t.processText}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="group relative mb-3 overflow-hidden rounded-2xl bg-[#120d0d] lg:rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative aspect-[16/10] w-full"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,15,15,0.18),transparent_65%)]" />

                  <Image
                    src={activeImage.src}
                    alt={activeImage.title}
                    fill
                    priority
                    className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
                    style={{ objectPosition: activeImage.objectPosition || 'center center' }}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-black/8" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/18 via-transparent to-black/12" />

                  <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-white/20" />
                  <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-white/20" />

                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/7 lg:rounded-3xl" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="mb-1.5 text-[9px] uppercase tracking-[0.32em] text-white/42">
                      {t.spotlightLabel}
                    </p>
                    <h4 className="mb-1 font-serif text-xl font-bold leading-tight tracking-tight text-white md:text-2xl lg:text-[1.55rem]">
                      {activeImage.title}
                    </h4>
                    <p className="text-[12px] text-white/60 md:text-sm">
                      {activeImage.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {t.images.map((img, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${img.src}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Selecionar imagem ${index + 1}: ${img.title}`}
                    className={`relative h-[68px] overflow-hidden rounded-xl border transition-all duration-300 md:h-[80px] ${
                      isActive
                        ? 'border-red-500 shadow-[0_0_12px_rgba(180,20,20,0.22)]'
                        : 'border-white/10 opacity-65 hover:border-white/20 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      className={`object-cover transition-all duration-500 ${
                        isActive ? 'scale-[1.04]' : 'grayscale-[0.25] hover:grayscale-0'
                      }`}
                      style={{ objectPosition: img.thumbPosition || 'center center' }}
                      sizes="(max-width: 768px) 33vw, 10vw"
                    />

                    <div
                      className={`absolute inset-0 transition-colors duration-300 ${
                        isActive ? 'bg-transparent' : 'bg-black/28 hover:bg-black/10'
                      }`}
                    />

                    {isActive && (
                      <div className="absolute bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-red-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/26">
                {t.gallerySubtitle}
              </p>

              <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/26">
                <span className="tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <div className="h-px w-7 bg-white/12" />
                <span className="tabular-nums">
                  {String(t.images.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}