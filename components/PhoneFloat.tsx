'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function PhoneFloat() {
  const phoneNumber = '+351968707515';

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/40 transition-colors duration-200 lg:bottom-8 lg:right-8"
      aria-label="Ligar para o restaurante"
    >
      <Phone className="w-6 h-6" />
    </motion.a>
  );
}
