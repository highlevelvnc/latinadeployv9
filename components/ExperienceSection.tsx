'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const content = {
    pt: {
      badge: 'O Espaço',
      title: 'Onde a Grelha é Arte',
      subtitle: 'Experiência Premium',
      description: 'Um restaurante desenhado para celebrar a carne na sua expressão máxima. Grelha a carvão vegetal, à vista de todos, ambiente sofisticado e uma atmosfera que convida a prolongar cada momento.'
    },
    en: {
      badge: 'The Space',
      title: 'Where Grilling is an Art',
      subtitle: 'Premium Experience',
      description: 'A restaurant designed to celebrate meat at its finest. Charcoal grill in full view, sophisticated ambiance and an atmosphere that invites you to extend every moment.'
    },
    fr: {
      badge: 'L\'Espace',
      title: 'Où le Grill est un Art',
      subtitle: 'Expérience Premium',
      description: 'Un restaurant conçu pour célébrer la viande dans son expression maximale. Grill au charbon de bois, ambiance sophistiquée et une atmosphère qui invite à prolonger chaque instant.'
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block border border-black/20 px-6 py-2 mb-8">
              <span className="text-xs text-black uppercase tracking-[0.4em] font-medium">
                {t.badge}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black mb-6 leading-[1.1] tracking-tight">
              {t.title}
            </h2>
            
            <div className="w-24 h-px bg-gradient-to-r from-red to-transparent mb-8" />

            <p className="text-lg text-black/60 leading-relaxed mb-10 font-light tracking-wide">
              {t.description}
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-red pl-4">
                <div className="text-4xl font-serif font-bold text-black mb-1">1000+</div>
                <div className="text-sm text-black/50 uppercase tracking-wider">Reviews</div>
              </div>
              <div className="border-l-2 border-red pl-4">
                <div className="text-4xl font-serif font-bold text-black mb-1">4.8</div>
                <div className="text-sm text-black/50 uppercase tracking-wider">Google Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Large Main Image */}
              <div className="col-span-2 relative h-[450px] overflow-hidden group">
                <Image
                  src="/grelhan.webp"
                  alt="Grelha Latina Grill"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>

              {/* Two smaller */}
              <div className="relative h-[250px] overflow-hidden group">
                <Image
                  src="/mesavazia.jpeg"
                  alt="Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>

              <div className="relative h-[250px] overflow-hidden group">
                <Image
                  src="/restaurantelocal1.webp"
                  alt="Espaço Premium"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-t-2 border-r-2 border-red/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
