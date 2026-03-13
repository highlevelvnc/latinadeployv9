'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Thermometer, Award, Clock, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type LocaleKey = 'pt' | 'en' | 'fr';

type Feature = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

type GalleryImage = {
  src: string;
  title: string;
  subtitle: string;
};

export default function PremiumMeatGallery() {

  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const locale = useLocale() as LocaleKey;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const content = {
    pt: {
      overline: 'Dry-Aged · Fire · Precision',
      title: 'Carne, fogo e tempo no ponto certo',
      subtitle:
        'Uma leitura mais visual do que define a casa: maturação controlada, cortes com presença, fogo bem executado e uma apresentação pensada para marcar a experiência.',
      processLabel: 'Processo',
      processText:
        'Aqui, o cuidado não aparece como discurso. Aparece no corte, no ponto, na textura e na forma como cada peça chega à mesa.',
      spotlightLabel: 'Spotlight',
      galleryTitle: 'Do frio à brasa',
      gallerySubtitle:
        'Um percurso visual entre seleção, fogo, corte e apresentação.',
      features: [
        {
          icon: Thermometer,
          label: 'Maturação precisa',
          desc: 'Temperatura, tempo e consistência tratados com rigor em cada etapa.'
        },
        {
          icon: Award,
          label: 'Cortes com critério',
          desc: 'Escolha orientada por origem, textura e marmoreado.'
        },
        {
          icon: Clock,
          label: 'Tempo respeitado',
          desc: 'Cada detalhe é trabalhado sem pressa.'
        }
      ],
      images: [
        {
          src: '/carne3.jpeg',
          title: 'Wagyu Detail',
          subtitle: 'Textura e marmoreado'
        },
        {
          src: '/costela.jpeg',
          title: 'Slow Depth',
          subtitle: 'Profundidade de sabor'
        }
      ]
    }
  };

  const t = content.pt;

  const activeImage = useMemo(
    () => t.images[activeIndex] || t.images[0],
    [activeIndex, t.images]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-visible bg-[#0f0b0b] pt-40 pb-24 lg:pt-32 lg:pb-32"
    >

      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,15,15,0.18),transparent_30%),linear-gradient(180deg,#110d0d_0%,#171111_45%,#0f0b0b_100%)]" />

      {/* glow */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-[10%] top-[10%] h-[340px] w-[340px] rounded-full bg-red-700/15 blur-[130px]"
      />

      {/* ===== CARNE ===== */}

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.92 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="
        pointer-events-none absolute z-30
        
        left-1/2
        -translate-x-1/2
        
        top-[-70px]
        sm:top-[-80px]
        md:top-[-90px]

        lg:left-auto
        lg:right-[15%]
        lg:translate-x-0
        lg:top-[0px]

        xl:right-[18%]
        "
      >

        <div
          className="
          relative
          
          h-[340px] w-[340px]
          sm:h-[380px] sm:w-[380px]
          md:h-[420px] md:w-[420px]
          
          lg:h-[480px] lg:w-[480px]
          xl:h-[560px] xl:w-[560px]
          "
        >
          <Image
            src="/ribeyindex.png"
            alt="Ribeye"
            fill
            priority
            className="object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.8)]"
          />
        </div>

      </motion.div>

      {/* ===== TEXTO ===== */}

      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="
          max-w-4xl
          pt-[220px]
          sm:pt-[250px]
          md:pt-[280px]
          
          lg:pt-16
          lg:max-w-[60%]
          "
        >

          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-red-400/75">
            {t.overline}
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-6xl xl:text-7xl">
            {t.title}
          </h2>

          <p className="max-w-3xl text-lg text-white/60">
            {t.subtitle}
          </p>

        </motion.div>

      </div>

    </section>
  );
}
