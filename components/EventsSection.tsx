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
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-red-400">
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
          className="grid md:grid-cols-3 gap-5 mb-20 max-w-5xl mx-auto"
        >
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -6 }}
                transition={{
                  default: { duration: 0.6, delay: 0.4 + index * 0.12 },
                  y: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-8 text-center transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.07] hover:shadow-[0_16px_45px_rgba(0,0,0,0.4)] group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-red-600/[0.07] via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] group-hover:border-red-500/30 group-hover:bg-red-600/10 transition-all duration-500">
                    <Icon className="w-6 h-6 text-white/65 group-hover:text-red-400 transition-colors duration-500" />
                  </div>
                  <h4 className="text-white font-semibold text-[15px] mb-2.5 uppercase tracking-[0.14em] leading-snug">
                    {feature.label}
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mb-16 max-w-6xl mx-auto"
        >
          {['/aniversario1.jpeg', '/clientes.jpeg', '/clientes1.jpeg'].map((img, index) => (
            <div key={index} className="relative h-[300px] overflow-hidden rounded-[20px] group border border-white/8">
              <Image
                src={img}
                alt={`Evento ${index + 1}`}
                fill
                className="object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms] ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/18 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 rounded-full border border-red-500/35 bg-red-600/10 px-12 py-5 text-sm font-semibold uppercase tracking-[0.28em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_16px_45px_rgba(180,20,20,0.38)]"
          >
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}