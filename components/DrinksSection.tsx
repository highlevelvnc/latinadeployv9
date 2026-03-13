'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function DrinksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const content = {
    pt: {
      badge: 'Bar Premium',
      title: 'Cocktails & Vinhos',
      description: 'Da nossa carta de vinhos cuidadosamente selecionada aos cocktails exclusivos, cada drink harmoniza na perfeição com a intensidade dos nossos pratos.',
      drinks: [
        { name: 'Moscow Mule' },
        { name: 'Blackberry' },
        { name: 'Casamigos' },
        { name: 'Chocolate Martini' }
      ]
    },
    en: {
      badge: 'Premium Bar',
      title: 'Cocktails & Wines',
      description: 'From our carefully selected wine list to exclusive cocktails, each drink pairs perfectly with the intensity of our dishes.',
      drinks: [
        { name: 'Moscow Mule' },
        { name: 'Blackberry' },
        { name: 'Casamigos' },
        { name: 'Chocolate Martini' }
      ]
    },
    fr: {
      badge: 'Bar Premium',
      title: 'Cocktails & Vins',
      description: 'De notre carte des vins soigneusement sélectionnée aux cocktails exclusifs, chaque boisson s\'accorde parfaitement.',
      drinks: [
        { name: 'Moscow Mule' },
        { name: 'Blackberry' },
        { name: 'Casamigos' },
        { name: 'Chocolate Martini' }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="lg:col-span-2"
          >
            <div className="inline-block border border-black/20 px-6 py-2 mb-8">
              <span className="text-xs text-black uppercase tracking-[0.4em] font-medium">
                {t.badge}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black mb-8 leading-[1.1] tracking-tight">
              {t.title}
            </h2>

            <p className="text-lg text-black/60 leading-relaxed font-light mb-10 tracking-wide">
              {t.description}
            </p>

            {/* Drinks List */}
            <div className="space-y-4">
              {t.drinks.map((drink, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-px bg-red group-hover:w-12 transition-all duration-300" />
                  <span className="text-black/70 font-medium text-lg group-hover:text-black transition-colors">
                    {drink.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Tall Main Image */}
              <div className="row-span-2 relative h-[600px] overflow-hidden group">
                <Image
                  src="/drinkmartini.jpeg"
                  alt="Martini Premium"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>

              {/* Top Right */}
              <div className="relative h-[290px] overflow-hidden group">
                <Image
                  src="/moscowmule.jpeg"
                  alt="Moscow Mule"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>

              {/* Bottom Right */}
              <div className="relative h-[290px] overflow-hidden group">
                <Image
                  src="/drinkblackberry.jpeg"
                  alt="Blackberry"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
