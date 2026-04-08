'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { featuredItemIds } from '@/data/recommendations';
import PriceDisplay from '@/components/shared/PriceDisplay';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import type { MenuItem } from '@/types/menu';
import type { Locale } from '@/i18n';

interface Props {
  onSelectItem: (item: MenuItem) => void;
}

export default function FeaturedSection({ onSelectItem }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');

  const featured = featuredItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => m !== undefined && m.available);

  if (featured.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-accent-yellow" />
        <div>
          <h2 className="font-serif text-lg font-bold text-white">{t('featured')}</h2>
          <p className="text-[11px] text-white/35">{t('featuredSubtitle')}</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {featured.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            onClick={() => onSelectItem(item)}
            className="group relative min-w-[200px] max-w-[200px] shrink-0 cursor-pointer rounded-2xl border border-white/[0.08] bg-surface p-3 transition-all hover:border-red/20 hover:bg-surface-elevated"
          >
            {/* Image */}
            <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl bg-dark-lighter">
              <MenuImage
                itemId={item.id}
                categoryId={item.categoryId}
                alt={lt(item.name, locale)}
                priority={i < 3}
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              {/* Badge */}
              {item.tags.includes('bestseller') && (
                <span className="absolute left-2 top-2 z-20 rounded-full bg-accent-orange/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                  {t('tags.bestseller')}
                </span>
              )}
              {item.tags.includes('signature') && !item.tags.includes('bestseller') && (
                <span className="absolute left-2 top-2 z-20 rounded-full bg-accent-yellow/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black">
                  {t('tags.signature')}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="mb-1 text-[13px] font-semibold text-white/90 leading-snug line-clamp-2">
              {lt(item.name, locale)}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <PriceDisplay
                cents={item.price}
                priceUnit={item.priceUnit}
                className="text-sm font-bold text-red-light"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
