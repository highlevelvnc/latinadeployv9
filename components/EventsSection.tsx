'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Users, Calendar, Heart } from 'lucide-react';

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const locale = useLocale();

  const content = {
    pt: {
      badge: 'Eventos Privados',
      title: 'Celebrações Memoráveis',
      subtitle: 'Do corporativo ao familiar, transformamos momentos em memórias',
      description: 'Oferecemos espaço exclusivo para até 150 pessoas. Cada evento é tratado com a mesma obsessão pela excelência que aplicamos aos nossos pratos. Menu personalizado, ambiente sofisticado e serviço impecável.',
      cta: 'Planeie o Seu Evento',
      features: [
        { icon: Users, label: 'Até 150 Convidados', desc: 'Espaço flexível e privado' },
        { icon: Calendar, label: 'Eventos Corporativos', desc: 'Jantares e conferências' },
        { icon: Heart, label: 'Celebrações Especiais', desc: 'Aniversários e casamentos' }
      ]
    },
    en: {
      badge: 'Private Events',
      title: 'Memorable Celebrations',
      subtitle: 'From corporate to family, we transform moments into memories',
      description: 'We offer exclusive space for up to 150 people. Each event is treated with the same obsession for excellence we apply to our dishes. Custom menu, sophisticated ambiance and impeccable service.',
      cta: 'Plan Your Event',
      features: [
        { icon: Users, label: 'Up to 150 Guests', desc: 'Flexible private space' },
        { icon: Calendar, label: 'Corporate Events', desc: 'Dinners and conferences' },
        { icon: Heart, label: 'Special Celebrations', desc: 'Birthdays and weddings' }
      ]
    },
    fr: {
      badge: 'Événements Privés',
      title: 'Célébrations Mémorables',
      subtitle: 'Du corporatif au familial, nous transformons les moments en souvenirs',
      description: 'Nous offrons un espace exclusif pour jusqu\'à 150 personnes. Chaque événement est traité avec la même obsession de l\'excellence que nous appliquons à nos plats. Menu personnalisé, ambiance sophistiquée et service impeccable.',
      cta: 'Planifiez Votre Événement',
      features: [
        { icon: Users, label: 'Jusqu\'à 150 Invités', desc: 'Espace flexible et privé' },
        { icon: Calendar, label: 'Événements d\'Entreprise', desc: 'Dîners et conférences' },
        { icon: Heart, label: 'Célébrations Spéciales', desc: 'Anniversaires et mariages' }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.pt;

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/aniversario.jpeg"
          alt="Eventos"
          fill
          className="object-cover opacity-15 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-block border border-red/30 px-6 py-2 mb-10">
            <span className="text-xs text-red uppercase tracking-[0.5em] font-medium">
              {t.badge}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
            {t.title}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-red" />
            <div className="w-2 h-2 bg-red rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-red" />
          </div>

          <p className="text-xl text-white/60 font-light mb-10 leading-relaxed">
            {t.subtitle}
          </p>

          <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto"
        >
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -10 }}
                transition={{
                  initial: { duration: 0.6, delay: 0.4 + index * 0.15 },
                  hover: { duration: 0.3 }
                }}
                className="border border-white/10 p-8 text-center hover:border-red/50 transition-all duration-500 group"
              >
                <Icon className="w-12 h-12 text-white mx-auto mb-6 group-hover:text-red transition-colors duration-500" />
                <h4 className="text-white font-bold text-lg mb-3 uppercase tracking-wider">{feature.label}</h4>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto"
        >
          {['/aniversario1.jpeg', '/clientes.jpeg', '/clientes1.jpeg'].map((img, index) => (
            <div key={index} className="relative h-[320px] overflow-hidden group">
              <Image
                src={img}
                alt={`Evento ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/contact`}
            className="group inline-block border-2 border-red hover:bg-red text-white px-16 py-6 text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:shadow-2xl hover:shadow-red/60 relative overflow-hidden"
          >
            <span className="relative z-10">{t.cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red/0 via-white/10 to-red/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}