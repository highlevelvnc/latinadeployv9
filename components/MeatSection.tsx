'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function MeatSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const content = {
    pt: {
      badge: 'Carnes Premium',
      title: 'Do Grill ao Prato',
      subtitle: 'Seleção Rigorosa',
      description: 'Trabalhamos apenas com os melhores cortes de carne do mundo. Cada peça é maturada com precisão, temperada com respeito e grelhada sobre brasas ardentes.',
      cta: 'Explorar Menu',
      highlights: [
        { label: 'Wagyu A5', desc: 'Japão' },
        { label: 'Black Angus', desc: 'Argentina' },
        { label: 'Tomahawk', desc: '45 dias' },
        { label: 'Picanha', desc: 'Brasil' }
      ]
    },
    en: {
      badge: 'Premium Meats',
      title: 'From Grill to Plate',
      subtitle: 'Rigorous Selection',
      description: 'We work only with the finest cuts of meat in the world. Each piece is aged with precision, seasoned with respect and grilled over hot coals.',
      cta: 'Explore Menu',
      highlights: [
        { label: 'Wagyu A5', desc: 'Japan' },
        { label: 'Black Angus', desc: 'Argentina' },
        { label: 'Tomahawk', desc: '45 days' },
        { label: 'Picanha', desc: 'Brazil' }
      ]
    },
    fr: {
      badge: 'Viandes Premium',
      title: 'Du Grill à l\'Assiette',
      subtitle: 'Sélection Rigoureuse',
      description: 'Nous travaillons uniquement avec les meilleurs morceaux de viande au monde. Chaque pièce est affinée avec précision, assaisonnée avec respect et grillée.',
      cta: 'Explorer Menu',
      highlights: [
        { label: 'Wagyu A5', desc: 'Japon' },
        { label: 'Black Angus', desc: 'Argentine' },
        { label: 'Tomahawk', desc: '45 jours' },
        { label: 'Picanha', desc: 'Brésil' }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[600px] lg:h-[750px] overflow-hidden">
              <Image
                src="/tomahawklatina.jpeg"
                alt="Tomahawk Premium"
                fill
                className="object-cover"
                priority
              />
              
              {/* Info Card Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <div className="w-2 h-2 bg-red mt-2" />
                  <h4 className="text-2xl font-serif font-bold text-white">Tomahawk Premium</h4>
                </div>
                <p className="text-white/60 text-sm uppercase tracking-[0.2em]">Maturação 45 dias</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block border border-red/30 px-6 py-2 mb-8">
              <span className="text-xs text-red uppercase tracking-[0.4em] font-medium">
                {t.badge}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {t.title}
            </h2>

            <div className="w-24 h-px bg-gradient-to-r from-red to-transparent mb-8" />

            <p className="text-lg text-white/60 leading-relaxed mb-12 font-light tracking-wide">
              {t.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {t.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="border border-white/10 p-6 hover:border-red/50 transition-colors duration-500 group"
                >
                  <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-red transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link
              href={`/${locale}/menu`}
              className="inline-block border-2 border-red hover:bg-red text-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-500"
            >
              {t.cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
