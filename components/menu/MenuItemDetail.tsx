'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Flame, Leaf, Star, Sparkles, Award, Crown, Beef, Droplets, Carrot } from 'lucide-react';
import PriceDisplay from '@/components/shared/PriceDisplay';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import { menuItems } from '@/data/menu';
import { getSaucesForItem, getSidesForItem, meatCategories, mainCourseCategories } from '@/data/recommendations';
import type { MenuItem, DietaryTag } from '@/types/menu';
import type { Locale } from '@/i18n';

const tagIcons: Partial<Record<DietaryTag, typeof Flame>> = {
  spicy: Flame, vegetarian: Leaf, vegan: Leaf, 'chefs-pick': Star, 'new': Sparkles,
  bestseller: Award, signature: Star, premium: Award, wagyu: Beef, gold: Crown,
};

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuItemDetail({ item, onClose }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');

  // Recommended sauces for meat items (display-only)
  const recommendedSauces = useMemo(() => {
    if (!item) return [];
    if (!meatCategories.includes(item.categoryId)) return [];
    const ids = getSaucesForItem(item.id);
    return ids
      .map((id) => menuItems.find((m) => m.id === id))
      .filter((m) => m !== undefined && m.available)
      .slice(0, 4);
  }, [item]);

  // Recommended sides for main courses (display-only)
  const recommendedSides = useMemo(() => {
    if (!item) return [];
    if (!mainCourseCategories.includes(item.categoryId)) return [];
    // Boards already include sides, skip
    if (item.tags.includes('board')) return [];
    const ids = getSidesForItem(item.id);
    return ids
      .map((id) => menuItems.find((m) => m.id === id))
      .filter((m) => m !== undefined && m.available)
      .slice(0, 4);
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-label={item ? lt(item.name, locale) : ''}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-dark lg:inset-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-h-[85vh] lg:w-full lg:max-w-lg lg:rounded-3xl lg:border"
          >
            {/* Header image area */}
            <div className="relative h-48 overflow-hidden bg-dark-lighter lg:h-56">
              <MenuImage
                itemId={item.id}
                categoryId={item.categoryId}
                alt={lt(item.name, locale)}
                priority
                sizes="(max-width: 640px) 100vw, 512px"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
              {/* Premium glow for premium/wagyu/gold */}
              {(item.tags.includes('premium') || item.tags.includes('wagyu') || item.tags.includes('gold')) && (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-accent-yellow/10 via-transparent to-red/5" />
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 pt-5">
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const Icon = tagIcons[tag];
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {t(`tags.${tag}`)}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Name + Price */}
              <div className="mb-2 flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                  {lt(item.name, locale)}
                </h2>
                <PriceDisplay cents={item.price} priceUnit={item.priceUnit} className="shrink-0 text-xl font-bold text-red-light" />
              </div>

              {/* Prep time */}
              {item.preparationTime && (
                <div className="mb-4 flex items-center gap-1.5 text-white/30">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[11px]">{t('prepTime', { minutes: item.preparationTime })}</span>
                </div>
              )}

              {/* Description */}
              {lt(item.description, locale) && (
                <p className="mb-6 text-[14px] leading-relaxed text-white/50">
                  {lt(item.description, locale)}
                </p>
              )}

              {/* ── Recommended Sauces (display-only) ── */}
              {recommendedSauces.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5 text-accent-orange" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                      {t('recommendedSauces')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSauces.map((sauce) =>
                      sauce ? (
                        <div
                          key={sauce.id}
                          className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-surface px-3 py-1.5 text-[11px] text-white/60"
                        >
                          <span>{lt(sauce.name, locale)}</span>
                          {sauce.price === null ? (
                            <span className="text-[9px] text-accent-green/70 font-semibold">{t('included')}</span>
                          ) : (
                            <PriceDisplay cents={sauce.price} className="text-[10px] text-white/30" />
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* ── Recommended Sides (display-only) ── */}
              {recommendedSides.length > 0 && (
                <div className="mb-2">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Carrot className="h-3.5 w-3.5 text-accent-green" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                      {t('completeDish')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recommendedSides.map((side) =>
                      side ? (
                        <div
                          key={side.id}
                          className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface px-3 py-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-lighter">
                              <span className="text-xs opacity-30">🥗</span>
                            </div>
                            <span className="text-[12px] text-white/70">{lt(side.name, locale)}</span>
                          </div>
                          <PriceDisplay cents={side.price} className="text-[11px] text-white/40" />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
