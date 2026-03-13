'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function PremiumGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const images = [
    { src: '/tomahawklinda.jpeg', span: 'col-span-2 row-span-2', alt: 'Tomahawk' },
    { src: '/ribeygrelha.jpeg', span: 'col-span-1', alt: 'Ribeye' },
    { src: '/costela.jpeg', span: 'col-span-1', alt: 'Costela' },
    { src: '/restaurantelocal3.jpeg', span: 'col-span-1', alt: 'Ambiente' },
    { src: '/petitgateau.jpeg', span: 'col-span-1', alt: 'Sobremesa' },
    { src: '/restaurantelocal2.jpeg', span: 'col-span-2', alt: 'Interior' },
    { src: '/bandejalatina1.jpeg', span: 'col-span-1', alt: 'Bandeja' },
    { src: '/sobremesatrufa.jpeg', span: 'col-span-1', alt: 'Trufa' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <a
            href="https://www.instagram.com/latina.grill/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors group mb-6 border border-black/20 px-6 py-2"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.4em]">@latina.grill</span>
          </a>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-black tracking-tight">
            Momentos
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative overflow-hidden group ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
              
              {/* Minimal overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/latina.grill/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-black hover:bg-black hover:text-white text-black px-12 py-5 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-500"
          >
            <Instagram className="w-5 h-5" />
            Seguir
          </a>
        </motion.div>
      </div>
    </section>
  );
}
