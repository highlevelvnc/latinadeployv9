'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X } from 'lucide-react';
import { useTableStore } from '@/stores/useTableStore';

export default function TableBadge() {
  const t = useTranslations('table');
  const { activeTable, fromQR, clearTable } = useTableStore();

  // Hydrate the persisted store on the client
  useEffect(() => {
    useTableStore.persist.rehydrate();
  }, []);

  return (
    <AnimatePresence>
      {activeTable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="flex items-center gap-1.5 rounded-full border border-red/25 bg-red/10 pl-2 pr-1 py-1"
        >
          <QrCode className="h-3 w-3 shrink-0 text-red-light" />
          <span className="text-[11px] font-bold tracking-wide text-red-light">
            {t('badge', { table: activeTable })}
          </span>
          {fromQR && (
            <button
              onClick={clearTable}
              aria-label={t('clearTable')}
              className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-red/50 transition-colors hover:bg-red/20 hover:text-red-light"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
