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
    },
    ru: {
      badge: 'Премиум-бар',
      title: 'Коктейли и вина',
      description: 'От тщательно отобранной винной карты до эксклюзивных коктейлей — каждый напиток идеально дополняет насыщенность наших блюд.',
      drinks: [
        { name: 'Moscow Mule' },
        { name: 'Blackberry' },
        { name: 'Casamigos' },
        { name: 'Chocolate Martini' }
      ]
    },
    zh: {
      badge: '精品酒吧',
      title: '鸡尾酒与美酒',
      description: '从精心挑选的酒单到独家调制的鸡尾酒，每一杯都与我们浓郁风味的菜肴完美搭配。',
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
            <div className="inline-flex items-center gap-3 border border-black/15 px-5 py-2 mb-10">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span className="text-[11px] text-black/55 uppercase tracking-[0.42em] font-semibold">
                {t.badge}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black mb-6 leading-[1.05] tracking-tight">
              {t.title}
            </h2>

            <div className="w-16 h-px bg-red-600 mb-8" />

            <p className="text-base text-black/55 leading-relaxed font-light mb-12 tracking-wide max-w-sm">
              {t.description}
            </p>

            {/* Drinks List — editorial numbered style */}
            <div className="border-t border-black/8">
              {t.drinks.map((drink, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + index * 0.1 }}
                  className="flex items-center gap-5 py-4 border-b border-black/8 group cursor-default"
                >
                  <span className="text-[11px] font-bold text-red-500/60 tabular-nums tracking-widest w-6 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-black/60 font-medium text-[17px] tracking-wide group-hover:text-black transition-colors duration-300 flex-1">
                    {drink.name}
                  </span>
                  <div className="w-0 h-px bg-red-600 group-hover:w-6 transition-all duration-500 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-2 gap-5">
              {/* Tall Main Image */}
              <div className="row-span-2 relative h-[600px] overflow-hidden group">
                <Image
                  src="/drinkmartini.jpeg"
                  alt="Martini Premium"
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Top Right */}
              <div className="relative h-[290px] overflow-hidden group">
                <Image
                  src="/moscowmule.jpeg"
                  alt="Moscow Mule"
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Bottom Right */}
              <div className="relative h-[290px] overflow-hidden group">
                <Image
                  src="/drinkblackberry.jpeg"
                  alt="Blackberry"
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
