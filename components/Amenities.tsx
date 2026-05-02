'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accessibility,
  Wind,
  Trees,
  ParkingCircle,
  Users,
  Heart,
  Wifi,
  Dog
} from 'lucide-react';

export default function Amenities() {
  const t = useTranslations('contact.amenities');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const amenities = [
    { key: 'accessibility', icon: Accessibility },
    { key: 'airConditioning', icon: Wind },
    { key: 'outdoorSeating', icon: Trees },
    { key: 'parking', icon: ParkingCircle },
    { key: 'privateEvents', icon: Users },
    { key: 'weddings', icon: Heart },
    { key: 'wifi', icon: Wifi },
    { key: 'petFriendly', icon: Dog },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-light">
              {t('label')}
            </h2>
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.li
                  key={amenity.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-dark-lighter border border-light/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-accent-orange/30 transition-colors group text-center min-h-[110px]"
                >
                  <Icon className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px] text-light/80 font-medium leading-tight">
                    {t(`items.${amenity.key}`)}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
