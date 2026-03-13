'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Thermometer, Award, Clock, ArrowUpRight } from 'lucide-react';
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
};

export default function PremiumMeatGallery() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale() as LocaleKey;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const imageY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const content: Record<
    LocaleKey,
    {
      overline: string;
      title: string;
      subtitle: string;
      features: Feature[];
      galleryTitle: string;
      gallerySubtitle: string;
      processLabel: string;
      processText: string;
      spotlightLabel: string;
      images: GalleryImage[];
    }
  > = {
    pt: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Carne, fogo e tempo no ponto certo',
      subtitle:
        'Uma leitura mais visual do que define a casa: maturação controlada, cortes com presença, fogo bem executado e uma apresentação pensada para marcar a experiência.',
      processLabel: 'Processo',
      processText:
        'Aqui, o cuidado não aparece como discurso. Aparece no corte, no ponto, na textura e na forma como cada peça chega à mesa.',
      spotlightLabel: 'Spotlight',
      features: [
        {
          icon: Thermometer,
          label: 'Maturação precisa',
          desc: 'Temperatura, tempo e consistência tratados com rigor em cada etapa.'
        },
        {
          icon: Award,
          label: 'Cortes com critério',
          desc: 'Escolha orientada por origem, textura, marmoreado e presença no prato.'
        },
        {
          icon: Clock,
          label: 'Tempo respeitado',
          desc: 'Do repouso ao serviço, cada detalhe é trabalhado sem pressa e sem excesso.'
        }
      ],
      galleryTitle: 'Do frio à brasa',
      gallerySubtitle:
        'Um percurso visual entre seleção, fogo, corte e apresentação.',
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origem, maturação e controlo'
        },
        {
          src: '/bandejalatinatomahawk.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Presença monumental à mesa'
        },
        {
          src: '/tomahawkchamas.jpeg',
          title: 'Fire Finish',
          subtitle: 'Fogo, intensidade e espetáculo'
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Textura e marmoreado'
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Profundidade de sabor'
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Precisão antes da grelha'
        }
      ]
    },
    en: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Meat, fire and time at the right point',
      subtitle:
        'A more visual reading of what defines the house: controlled aging, cuts with presence, well-executed fire and presentation designed to leave a mark.',
      processLabel: 'Process',
      processText:
        'Here, care doesn’t appear as a speech. It appears in the cut, the doneness, the texture and the way each piece reaches the table.',
      spotlightLabel: 'Spotlight',
      features: [
        {
          icon: Thermometer,
          label: 'Precise aging',
          desc: 'Temperature, timing and consistency treated with rigor at every stage.'
        },
        {
          icon: Award,
          label: 'Cuts with criteria',
          desc: 'Selection guided by origin, texture, marbling and plate presence.'
        },
        {
          icon: Clock,
          label: 'Time respected',
          desc: 'From resting to service, every detail is handled without rush or excess.'
        }
      ],
      galleryTitle: 'From cold room to fire',
      gallerySubtitle:
        'A visual path through selection, fire, cut and presentation.',
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origin, aging and control'
        },
        {
          src: '/bandejalatinatomahawk.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Monumental table presence'
        },
        {
          src: '/tomahawkchamas.jpeg',
          title: 'Fire Finish',
          subtitle: 'Fire, intensity and spectacle'
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Texture and marbling'
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Depth of flavor'
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Precision before the grill'
        }
      ]
    },
    fr: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Viande, feu et temps au bon point',
      subtitle:
        'Une lecture plus visuelle de ce qui définit la maison : affinage contrôlé, coupes avec présence, feu maîtrisé et présentation pensée pour marquer l’expérience.',
      processLabel: 'Processus',
      processText:
        'Ici, le soin ne s’exprime pas par un discours. Il se voit dans la coupe, la cuisson, la texture et la manière dont chaque pièce arrive à table.',
      spotlightLabel: 'Spotlight',
      features: [
        {
          icon: Thermometer,
          label: 'Affinage précis',
          desc: 'Température, temps et régularité travaillés avec rigueur à chaque étape.'
        },
        {
          icon: Award,
          label: 'Coupes choisies avec exigence',
          desc: 'Sélection guidée par l’origine, la texture, le persillage et la présence visuelle.'
        },
        {
          icon: Clock,
          label: 'Temps respecté',
          desc: 'Du repos au service, chaque détail est travaillé sans précipitation ni excès.'
        }
      ],
      galleryTitle: 'Du froid à la braise',
      gallerySubtitle:
        'Un parcours visuel entre sélection, feu, coupe et présentation.',
      images: [
        {
          src: '/frigorifigo.jpeg',
          title: 'Cold Room Selection',
          subtitle: 'Origine, affinage et contrôle'
        },
        {
          src: '/bandejalatinatomahawk.jpeg',
          title: 'Latina Signature Board',
          subtitle: 'Présence monumentale à table'
        },
        {
          src: '/tomahawkchamas.jpeg',
          title: 'Fire Finish',
          subtitle: 'Feu, intensité et spectacle'
        },
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Texture et persillage'
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Profondeur de saveur'
        },
        {
          src: '/frigorifico1.jpeg',
          title: 'Curated Chamber',
          subtitle: 'Précision avant le grill'
        }
      ]
    }
  };

  const t = content[locale] || content.pt;
  const activeImage = useMemo(
    () => t.images[activeIndex] || t.images[0],
    [activeIndex, t.images]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-visible bg-[#0f0b0b] pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-36 lg:pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,15,15,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,#110d0d_0%,#171111_45%,#0f0b0b_100%)]" />

      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-[7%] top-[12%] h-[340px] w-[340px] rounded-full bg-red-700/12 blur-[130px]"
      />
      <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute bottom-[8%] right-[10%] h-[300px] w-[300px] rounded-full bg-white/5 blur-[150px]"
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.028]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.92 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="
          pointer-events-none absolute z-30
          left-1/2 top-[22px] -translate-x-1/2
          sm:top-[12px]
          lg:left-auto lg:right-[4%] lg:top-[6px] lg:translate-x-0
          xl:right-[7%] xl:top-[-2px]
        "
      >
        <div
          className="
            relative
            h-[220px] w-[220px]
            sm:h-[250px] sm:w-[250px]
            md:h-[290px] md:w-[290px]
            lg:h-[420px] lg:w-[420px]
            xl:h-[500px] xl:w-[500px]
          "
        >
          <Image
            src="/ribeyindex.png"
            alt="Ribeye na grelha"
            fill
            priority
            className="object-contain drop-shadow-[0_45px_90px_rgba(0,0,0,0.72)]"
          />
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-14 max-w-5xl pt-[150px] sm:pt-[175px] md:pt-[205px] lg:mb-16 lg:max-w-[62%] lg:pt-10 xl:max-w-[58%]"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-red-400/75">
            {t.overline}
          </p>

          <h2 className="mb-6 max-w-5xl font-serif text-[2.7rem] font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
            {t.title}
          </h2>

          <p className="max-w-3xl text-base font-light leading-relaxed text-white/60 sm:text-lg md:text-xl">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="mb-12 grid items-start gap-8 lg:gap-10 xl:grid-cols-[0.38fr_0.62fr] lg:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="space-y-4"
          >
            {t.features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                  className="group rounded-[26px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-500/25 hover:bg-white/[0.05] hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] lg:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 transition-all duration-300 group-hover:border-red-500/25 group-hover:bg-red-500/10">
                      <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-red-400" />
                    </div>

                    <div>
                      <h3 className="mb-2 font-serif text-lg font-bold text-white md:text-xl">
                        {feature.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/58 md:text-base">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="rounded-[26px] border border-red-500/15 bg-gradient-to-br from-red-500/[0.08] via-white/[0.03] to-transparent p-5 backdrop-blur-sm lg:p-6"
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-red-400/75">
                {t.processLabel}
              </p>
              <p className="leading-relaxed text-white/80">{t.processText}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm md:rounded-[32px] md:p-5 lg:p-6">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-red-400/60">
                    {t.gallerySubtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                    {t.galleryTitle}
                  </h3>
                </div>

                <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/35 md:flex">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <div className="h-px w-10 bg-white/15" />
                  <span>{String(t.images.length).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-5">
                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="group relative min-h-[320px] overflow-hidden rounded-[22px] border border-white/10 sm:min-h-[390px] md:rounded-[26px] lg:min-h-[620px]"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.title}
                    fill
                    className="object-cover transition-all duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_30%)]" />

                  <div className="absolute left-5 top-5 h-16 w-16 border-l border-t border-white/30 transition-colors duration-500 group-hover:border-red-400/70 md:h-20 md:w-20" />
                  <div className="absolute bottom-5 right-5 h-16 w-16 border-b border-r border-white/30 transition-colors duration-500 group-hover:border-red-400/70 md:h-20 md:w-20" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 backdrop-blur-sm">
                      <ArrowUpRight className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/85">
                        {t.spotlightLabel}
                      </span>
                    </div>

                    <h4 className="mb-2 font-serif text-2xl font-bold tracking-tight text-white md:text-4xl">
                      {activeImage.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/75 md:text-base">
                      {activeImage.subtitle}
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {t.images.map((img, index) => {
                    const active = index === activeIndex;

                    return (
                      <button
                        key={img.src}
                        onClick={() => setActiveIndex(index)}
                        className={`group relative h-[150px] overflow-hidden rounded-[20px] border text-left transition-all duration-300 sm:h-[170px] md:h-[210px] md:rounded-[22px] ${
                          active
                            ? 'border-red-500 shadow-[0_16px_35px_rgba(120,0,0,0.24)]'
                            : 'border-white/10 hover:border-red-500/35'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.title}
                          fill
                          className={`object-cover transition-all duration-[1000ms] ${
                            active
                              ? 'scale-[1.03]'
                              : 'grayscale-[0.18] group-hover:grayscale-0 group-hover:scale-[1.06]'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                          <p className="mb-1 text-sm font-medium leading-tight text-white md:text-base">
                            {img.title}
                          </p>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-white/62 md:text-xs">
                            {img.subtitle}
                          </p>
                        </div>

                        {active && (
                          <div className="absolute right-3 top-3 h-2.5 w-2.5 rotate-45 bg-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}