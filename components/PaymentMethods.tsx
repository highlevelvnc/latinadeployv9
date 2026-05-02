'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentMethods() {
  const t = useTranslations('contact.payment');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const methods = [
    { key: 'visa', label: t('methods.visa') },
    { key: 'mastercard', label: t('methods.mastercard') },
    { key: 'amex', label: t('methods.amex') },
    { key: 'debit', label: t('methods.debit') },
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-4 py-2 mb-4">
              <CreditCard className="w-4 h-4 text-accent-orange" aria-hidden="true" />
              <span className="text-xs lg:text-sm text-accent-orange uppercase tracking-widest font-medium">
                {t('label')}
              </span>
            </div>
          </div>

          {/* Payment Icons */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {methods.map((method, index) => (
              <motion.li
                key={method.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-dark-lighter border border-light/8 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 hover:border-accent-orange/30 transition-colors group min-h-[120px]"
              >
                <CreditCard className="w-8 h-8 text-light/55 group-hover:text-accent-orange transition-colors" aria-hidden="true" />
                <span className="text-sm text-light/80 text-center font-medium">
                  {method.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
