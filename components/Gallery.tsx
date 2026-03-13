'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://cdn.website.dish.co/media/fb/f6/5189650/Latina-Grill-Steakhouse-252307672-292067949588108-1479978839390152596-n-jpg.jpg',
    alt: 'Latina Grill Interior Atmosphere'
  },
  {
    src: 'https://cdn.website.dish.co/media/63/00/5189658/Latina-Grill-Steakhouse-252307627-293654599429443-5315061003337340379-n-jpg.jpg',
    alt: 'Premium Steak Presentation'
  },
  {
    src: 'https://cdn.website.dish.co/media/80/68/5189673/Latina-Grill-Steakhouse-283159230-433868132074755-1427349009624093335-n-jpg.jpg',
    alt: 'Live Music Performance'
  },
  {
    src: 'https://cdn.website.dish.co/media/01/c7/5189668/Latina-Grill-Steakhouse-281127408-430258225769079-8243558770075040862-n-jpg.jpg',
    alt: 'Elegant Dining Setup'
  },
  {
    src: 'https://cdn.website.dish.co/media/90/90/5189663/Latina-Grill-Steakhouse-252307672-292067949588108-1479978839390152596-n-jpg.jpg',
    alt: 'Restaurant Ambiance'
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedImage(null);
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useState(() => {
    if (selectedImage !== null) {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => window.removeEventListener('keydown', handleKeyDown as any);
    }
  });

  return (
    <>
      <section ref={ref} className="py-24 lg:py-32 bg-anthracite-dark">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${index === 2 ? 'md:row-span-2' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative w-full h-full min-h-[200px] md:min-h-[300px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-anthracite/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-cream text-sm font-medium">Ver imagem</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-anthracite/98 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-cream/80 hover:text-cream transition-colors z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-6 text-cream/80 hover:text-cream transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 text-cream/80 hover:text-cream transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                quality={95}
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
