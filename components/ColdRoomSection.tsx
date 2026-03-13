'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Thermometer, Clock, Award } from 'lucide-react';

export default function ColdRoomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const content = {
    pt: {
      badge: 'O Processo',
      title: 'Câmara de Maturação',
      subtitle: 'Onde o Tempo se Torna Sabor',
      description: 'Nossa câmara frigorífica controlada é o coração secreto da Latina Grill. Aqui, a ciência encontra a tradição: temperatura de 2°C, humidade de 85% e tempo de 21-45 dias transformam carne em obra-prima. Cada corte é monitorizando diariamente, desenvolvendo sabores complexos e textura amanteigada que apenas o dry-aging verdadeiro pode oferecer.',
      stats: [
        { icon: Thermometer, value: '2°C', label: 'Temperatura Perfeita' },
        { icon: Clock, value: '45 Dias', label: 'Maturação Máxima' },
        { icon: Award, value: '100%', label: 'Controlo Diário' }
      ]
    },
    en: {
      badge: 'The Process',
      title: 'Aging Chamber',
      subtitle: 'Where Time Becomes Flavor',
      description: 'Our controlled cold room is the secret heart of Latina Grill. Here, science meets tradition: 2°C temperature, 85% humidity and 21-45 days transform meat into masterpiece. Each cut is monitored daily, developing complex flavors and buttery texture that only true dry-aging can offer.',
      stats: [
        { icon: Thermometer, value: '2°C', label: 'Perfect Temperature' },
        { icon: Clock, value: '45 Days', label: 'Maximum Aging' },
        { icon: Award, value: '100%', label: 'Daily Control' }
      ]
    },
    fr: {
      badge: 'Le Processus',
      title: 'Chambre d\'Affinage',
      subtitle: 'Où le Temps Devient Saveur',
      description: 'Notre chambre froide contrôlée est le cœur secret de Latina Grill. Ici, la science rencontre la tradition : température de 2°C, humidité de 85% et 21-45 jours transforment la viande en chef-d\'œuvre. Chaque coupe est surveillée quotidiennement, développant des saveurs complexes et une texture beurrée que seul le vrai dry-aging peut offrir.',
      stats: [
        { icon: Thermometer, value: '2°C', label: 'Température Parfaite' },
        { icon: Clock, value: '45 Jours', label: 'Affinage Maximum' },
        { icon: Award, value: '100%', label: 'Contrôle Quotidien' }
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
            <div className="inline-block border-2 border-black/20 px-6 py-2 mb-10">
              <span className="text-xs text-black uppercase tracking-[0.6em] font-bold">
                {t.badge}
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-8 leading-[0.9] tracking-tight">
              {t.title}
            </h2>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-20 h-px bg-red" />
              <div className="w-3 h-3 bg-red rotate-45" />
            </div>

            <h3 className="text-3xl font-serif text-black/70 mb-12 leading-tight">
              {t.subtitle}
            </h3>

            <p className="text-lg text-black/60 leading-relaxed mb-16 font-light">
              {t.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {t.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      initial: { duration: 0.6, delay: 0.8 + index * 0.15 },
                      hover: { duration: 0.2 }
                    }}
                    className="border-l-2 border-red pl-6"
                  >
                    <Icon className="w-8 h-8 text-red mb-4" />
                    <div className="text-4xl font-serif font-bold text-black mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-black/50 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Images with Parallax */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid gap-6">
              <motion.div
                style={{ y: imageY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative h-[450px] group overflow-hidden"
              >
                <Image
                  src="/frigorifigo.jpeg"
                  alt="Câmara Frigorífica"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Frame decorativo */}
                <div className="absolute -inset-6 border-2 border-black/10 pointer-events-none" />
                <div className="absolute top-8 left-8 w-32 h-32 border-t-2 border-l-2 border-red" />
                <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-red" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative h-[350px] group overflow-hidden"
              >
                <Image
                  src="/frigorifigo1.jpeg"
                  alt="Carnes Maturando"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}