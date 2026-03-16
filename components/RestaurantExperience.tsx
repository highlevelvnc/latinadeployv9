'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function RestaurantExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const content = {
    pt: {
      badge: 'O Espaço',
      title: 'Ambiente que Respira Autenticidade',
      subtitle: 'Cada detalhe conta a história da verdadeira grelha portuguesa',
      description: 'Do design rústico-sofisticado às mesas estrategicamente posicionadas para visualizar a grelha aberta, cada elemento foi pensado para elevar sua experiência. Madeira nobre, iluminação intimista e o som hipnotizante das brasas criam uma atmosfera única em Cascais.',
      cta: 'Reserve Sua Mesa'
    },
    en: {
      badge: 'The Space',
      title: 'Atmosphere that Breathes Authenticity',
      subtitle: 'Every detail tells the story of true Portuguese grilling',
      description: 'From rustic-sophisticated design to tables strategically positioned to view the open grill, every element was designed to elevate your experience. Noble wood, intimate lighting and the hypnotic sound of embers create a unique atmosphere in Cascais.',
      cta: 'Reserve Your Table'
    },
    fr: {
      badge: 'L\'Espace',
      title: 'Ambiance qui Respire l\'Authenticité',
      subtitle: 'Chaque détail raconte l\'histoire du vrai grill portugais',
      description: 'Du design rustique-sophistiqué aux tables stratégiquement positionnées pour voir le grill ouvert, chaque élément a été pensé pour élever votre expérience. Bois noble, éclairage intime et le son hypnotique des braises créent une atmosphère unique à Cascais.',
      cta: 'Réservez Votre Table'
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  const images = [
    { src: '/restaurantelocal.jpeg', span: 'md:col-span-2 md:row-span-2' },
    { src: '/restaurantelocal1.jpeg', span: '' },
    { src: '/restaurantelocal2.jpeg', span: '' },
    { src: '/restaurantelocal3.jpeg', span: '' },
    { src: '/restaurantelocal5.jpeg', span: 'md:col-span-2' },
    { src: '/restaurantelocal6.jpeg', span: '' },
    { src: '/restaurantelocal7.jpeg', span: '' }
  ];

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-black/20 bg-black/[0.04] px-5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-black/50" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-black/70">
                {t.badge}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black mb-8 leading-[1.05] tracking-tight">
              {t.title}
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-red" />
              <div className="w-2 h-2 bg-red rotate-45" />
            </div>

            <h3 className="text-2xl font-serif text-black/70 mb-10 leading-tight">
              {t.subtitle}
            </h3>

            <p className="text-lg text-black/60 leading-relaxed mb-12 font-light max-w-xl">
              {t.description}
            </p>

            <Link
              href={`/${locale}/reservations`}
              className="group inline-flex items-center gap-3 rounded-full border border-black/35 bg-black/[0.04] px-12 py-5 text-sm font-bold uppercase tracking-[0.3em] text-black transition-all duration-500 hover:border-black hover:bg-black hover:text-white hover:shadow-[0_16px_45px_rgba(0,0,0,0.15)]"
            >
              {t.cta}
            </Link>
          </motion.div>

          {/* First Image with parallax */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px] overflow-hidden group rounded-[24px]"
          >
            <Image
              src="/restaurantelocal.jpeg"
              alt="Interior Latina Grill"
              fill
              className="object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
          </motion.div>
        </div>

        {/* Masonry Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 auto-rows-[200px]">
            {images.slice(1).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{
                  initial: { duration: 0.7, delay: 0.7 + index * 0.1 },
                  hover: { duration: 0.4 }
                }}
                className={`${img.span} relative overflow-hidden group cursor-pointer rounded-2xl`}
              >
                <Image
                  src={img.src}
                  alt={`Restaurante ${index + 2}`}
                  fill
                  className="object-cover group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
