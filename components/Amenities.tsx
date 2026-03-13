'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Accessibility, 
  Wind, 
  Truck, 
  Trees, 
  ParkingCircle, 
  Users, 
  ShoppingBag, 
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
    { key: 'delivery', icon: Truck },
    { key: 'outdoorSeating', icon: Trees },
    { key: 'parking', icon: ParkingCircle },
    { key: 'privateEvents', icon: Users },
    { key: 'takeaway', icon: ShoppingBag },
    { key: 'weddings', icon: Heart },
    { key: 'wifi', icon: Wifi },
    { key: 'petFriendly', icon: Dog },
  ];

  return (
    <section ref={ref} className="py-16 bg-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-light mb-4">
              {t('label')}
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-dark-lighter border border-light/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-accent-orange/30 transition-all group text-center"
                >
                  <Icon className="w-6 h-6 text-accent-orange" />
                  <span className="text-xs text-light/70 font-medium leading-tight">
                    {t(`items.${amenity.key}`)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
