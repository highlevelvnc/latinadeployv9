'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Flame, Wine, Sparkles, FileText } from 'lucide-react';

export default function MenuHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const locale = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const content = {
    pt: {
      badge: 'Seleção Exclusiva',
      title: 'Uma experiência desenhada para impressionar',
      subtitle:
        'Cortes nobres, fogo, trufa e vinho em uma curadoria visual mais sofisticada, sensorial e alinhada ao universo Latina Grill.',
      cta: 'Explorar Menu Completo',
      ctaPdf: 'Descarregar Menu PDF',
      hero: {
        eyebrow: 'Signature Cut',
        title: 'Tomahawk na brasa com presença de palco',
        description:
          'Um dos grandes protagonistas da casa. Visual imponente, acabamento premium e apresentação que transforma o serviço em experiência.',
        image: '/tomahawkchamas.jpeg'
      },
      featured: [
        {
          title: 'Ribeye Selection',
          description:
            'Suculência, marmoreio e finalização precisa. Um clássico executado com força visual e profundidade de sabor.',
          image: '/ribeygrelha.jpeg',
          icon: 'flame'
        },
        {
          title: 'Tomahawk Signature',
          description:
            'Corte de impacto, pensado para mesa, partilha e memória. Uma peça que traduz o posicionamento premium do restaurante.',
          image: '/tomahawklinda.jpeg',
          icon: 'sparkles'
        },
        {
          title: 'Carta & Harmonização',
          description:
            'Rótulos selecionados para elevar a experiência e acompanhar a intensidade dos cortes da grelha.',
          image: '/vinhopetrvs.jpeg',
          icon: 'wine'
        }
      ],
      galleryTitle: 'Destaques da casa',
      gallery: [
        {
          title: 'Tomahawk Premium',
          image: '/tomahawk.jpeg'
        },
        {
          title: 'Tomahawk Presentation',
          image: '/tomahawkprat.jpeg'
        },
        {
          title: 'Ribeye House Cut',
          image: '/ribey.jpeg'
        },
        {
          title: 'Ribeye on Fire',
          image: '/ribeygrelha1.jpeg'
        },
        {
          title: 'Black Truffle Dessert',
          image: '/sobremesatrufa.jpeg'
        },
        {
          title: 'Trufa Negra',
          image: '/trufanegra.jpeg'
        }
      ]
    },
    en: {
      badge: 'Exclusive Selection',
      title: 'An experience designed to impress',
      subtitle:
        'Noble cuts, fire, truffle and wine in a more refined visual curation, aligned with the Latina Grill premium atmosphere.',
      cta: 'Explore Full Menu',
      ctaPdf: 'Download Menu PDF',
      hero: {
        eyebrow: 'Signature Cut',
        title: 'Tomahawk over fire with dramatic presence',
        description:
          'One of the house protagonists. Striking visuals, premium finish and a presentation that turns service into experience.',
        image: '/tomahawkchamas.jpeg'
      },
      featured: [
        {
          title: 'Ribeye Selection',
          description:
            'Juiciness, marbling and precise finishing. A classic executed with visual power and depth of flavor.',
          image: '/ribeygrelha.jpeg',
          icon: 'flame'
        },
        {
          title: 'Tomahawk Signature',
          description:
            'An impactful cut made for the table, for sharing and for memory. A piece that translates the restaurant’s premium positioning.',
          image: '/tomahawklinda.jpeg',
          icon: 'sparkles'
        },
        {
          title: 'Wine Pairing',
          description:
            'Selected labels to elevate the experience and complement the intensity of the grill.',
          image: '/vinhopetrvs.jpeg',
          icon: 'wine'
        }
      ],
      galleryTitle: 'House highlights',
      gallery: [
        {
          title: 'Tomahawk Premium',
          image: '/tomahawk.jpeg'
        },
        {
          title: 'Tomahawk Presentation',
          image: '/tomahawkprat.jpeg'
        },
        {
          title: 'Ribeye House Cut',
          image: '/ribey.jpeg'
        },
        {
          title: 'Ribeye on Fire',
          image: '/ribeygrelha1.jpeg'
        },
        {
          title: 'Black Truffle Dessert',
          image: '/sobremesatrufa.jpeg'
        },
        {
          title: 'Black Truffle',
          image: '/trufanegra.jpeg'
        }
      ]
    },
    fr: {
      badge: ‘Sélection Exclusive’,
      title: ‘Une expérience pensée pour impressionner’,
      subtitle:
        ‘Coupes nobles, feu, truffe et vin dans une mise en scène plus sophistiquée, cohérente avec l’univers premium du Latina Grill.’,
      cta: ‘Explorer le Menu’,
      ctaPdf: ‘Télécharger le Menu PDF’,
      hero: {
        eyebrow: 'Signature Cut',
        title: 'Tomahawk au feu avec une présence spectaculaire',
        description:
          'L’un des grands protagonistes de la maison. Un visuel fort, une finition premium et une présentation qui transforme le service en expérience.',
        image: '/tomahawkchamas.jpeg'
      },
      featured: [
        {
          title: 'Ribeye Selection',
          description:
            'Jutosité, persillage et finition précise. Un classique exécuté avec puissance visuelle et profondeur de goût.',
          image: '/ribeygrelha.jpeg',
          icon: 'flame'
        },
        {
          title: 'Tomahawk Signature',
          description:
            'Une coupe marquante, pensée pour la table, le partage et la mémoire. Une pièce qui traduit le positionnement premium du restaurant.',
          image: '/tomahawklinda.jpeg',
          icon: 'sparkles'
        },
        {
          title: 'Accords & Vins',
          description:
            'Des étiquettes sélectionnées pour enrichir l’expérience et accompagner l’intensité des viandes grillées.',
          image: '/vinhopetrvs.jpeg',
          icon: 'wine'
        }
      ],
      galleryTitle: 'Moments signature',
      gallery: [
        {
          title: 'Tomahawk Premium',
          image: '/tomahawk.jpeg'
        },
        {
          title: 'Tomahawk Presentation',
          image: '/tomahawkprat.jpeg'
        },
        {
          title: 'Ribeye House Cut',
          image: '/ribey.jpeg'
        },
        {
          title: 'Ribeye on Fire',
          image: '/ribeygrelha1.jpeg'
        },
        {
          title: 'Dessert à la Truffe Noire',
          image: '/sobremesatrufa.jpeg'
        },
        {
          title: 'Truffe Noire',
          image: '/trufanegra.jpeg'
        }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  const iconMap = {
    flame: Flame,
    wine: Wine,
    sparkles: Sparkles
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black py-24 lg:py-36"
    >
      {/* Background ambience */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-[8%] top-[14%] h-72 w-72 rounded-full bg-red-700/20 blur-[130px]" />
        <div className="absolute right-[8%] top-[28%] h-72 w-72 rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-800/15 blur-[150px]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
              {t.badge}
            </span>
          </div>

          <h2 className="font-serif text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
            {t.title}
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-white/60 md:text-xl">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-10 grid overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src={t.hero.image}
              alt={t.hero.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <span className="mb-4 text-[11px] uppercase tracking-[0.32em] text-red-400">
              {t.hero.eyebrow}
            </span>

            <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              {t.hero.title}
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-white/65 md:text-base">
              {t.hero.description}
            </p>

            <div className="mt-8 h-px w-24 bg-gradient-to-r from-red-500 to-transparent" />
          </div>
        </motion.div>

        {/* Featured cards */}
        <div className="mb-20 grid gap-6 lg:grid-cols-3">
          {t.featured.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_18px_50px_rgba(120,0,0,0.18)]"
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>

                <div className="h-px w-0 bg-gradient-to-r from-red-500 via-white/70 to-transparent transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-10"
        >
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.32em] text-red-400">
                Gallery
              </span>
              <h3 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
                {t.galleryTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {t.gallery.map((item, index) => {
              const large =
                index === 0 || index === 3;
              const medium = index === 1 || index === 4;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.4 + index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]
                    ${large ? 'lg:col-span-5' : medium ? 'lg:col-span-4' : 'lg:col-span-3'}`}
                >
                  <div className={`relative ${large ? 'h-[420px]' : medium ? 'h-[340px]' : 'h-[300px]'}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                          Signature
                        </span>
                      </div>

                      <h4 className="mt-3 font-serif text-xl font-bold text-white md:text-2xl">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/menu`}
            className="group inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_12px_35px_rgba(180,20,20,0.35)]"
          >
            <span>{t.cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="/latina-grill-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/70 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
          >
            <FileText className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors" />
            <span>{t.ctaPdf}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}