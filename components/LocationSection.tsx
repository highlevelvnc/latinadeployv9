'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { MapPin, Clock, Award } from 'lucide-react';

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const content = {
    pt: {
      badge: 'O Conceito',
      title: 'Cascais',
      subtitle: 'Onde a Costa Encontra a Grelha',
      description: 'Estrategicamente localizado no coração de Cascais, o Latina Grill oferece mais do que uma refeição — oferecemos uma experiência sensorial completa. Do aroma das brasas ao som da grelha, cada detalhe foi pensado para celebrar a arte da carne premium.',
      features: [
        {
          icon: MapPin,
          title: 'Localização Privilegiada',
          desc: 'Estrada da Malveira da Serra, 261'
        },
        {
          icon: Clock,
          title: 'Aberto Todos os Dias',
          desc: '12:30-16:00 | 18:30-23:00'
        },
        {
          icon: Award,
          title: '1000+ Reviews',
          desc: '4.8★ Google Rating'
        }
      ]
    },
    en: {
      badge: 'The Concept',
      title: 'Cascais',
      subtitle: 'Where the Coast Meets the Grill',
      description: 'Strategically located in the heart of Cascais, Latina Grill offers more than a meal — we offer a complete sensory experience. From the aroma of embers to the sound of the grill, every detail celebrates the art of premium meat.',
      features: [
        {
          icon: MapPin,
          title: 'Prime Location',
          desc: 'Estrada da Malveira da Serra, 261'
        },
        {
          icon: Clock,
          title: 'Open Every Day',
          desc: '12:30-16:00 | 18:30-23:00'
        },
        {
          icon: Award,
          title: '1000+ Reviews',
          desc: '4.8★ Google Rating'
        }
      ]
    },
    fr: {
      badge: 'Le Concept',
      title: 'Cascais',
      subtitle: 'Où la Côte Rencontre le Grill',
      description: 'Stratégiquement situé au cœur de Cascais, le Latina Grill offre plus qu\'un repas — nous offrons une expérience sensorielle complète. De l\'arôme des braises au son du grill, chaque détail célèbre l\'art de la viande premium.',
      features: [
        {
          icon: MapPin,
          title: 'Emplacement Privilégié',
          desc: 'Estrada da Malveira da Serra, 261'
        },
        {
          icon: Clock,
          title: 'Ouvert Tous les Jours',
          desc: '12:30-16:00 | 18:30-23:00'
        },
        {
          icon: Award,
          title: '1000+ Avis',
          desc: '4.8★ Google Rating'
        }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-3 border border-black/15 px-5 py-2 mb-10">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span className="text-[11px] text-black/55 uppercase tracking-[0.45em] font-semibold">
                {t.badge}
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-6 leading-[0.95] tracking-tight">
              {t.title}
            </h2>

            <div className="w-20 h-px bg-red mb-8" />

            <h3 className="text-2xl md:text-3xl font-serif text-black/70 mb-10 leading-tight">
              {t.subtitle}
            </h3>

            <p className="text-lg text-black/60 leading-relaxed mb-12 font-light max-w-xl">
              {t.description}
            </p>

            {/* Features */}
            <div className="space-y-6">
              {t.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                    className="flex items-start gap-4 group"
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
            </div>
          </motion.div>

          {/* Image with Parallax */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
              <Image
                src="/restaurantelocal.jpeg"
                alt="Latina Grill Cascais"
                fill
                className="object-cover transition-transform duration-700"
              />
              
              {/* Frame decorativo */}
              <div className="absolute -inset-4 border-2 border-black/10 pointer-events-none" />
              <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-red" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}