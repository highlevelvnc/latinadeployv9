'use client';

import { useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Flame, Leaf, Star, Sparkles, Award, Crown, Beef, Droplets, Carrot } from 'lucide-react';
import MenuImage from '@/components/menu/MenuImage';
import WineDetail from '@/components/menu/WineDetail';
import { t as lt } from '@/lib/localized';
import { menuItems } from '@/data/menu';
import { getSaucesForItem, getSidesForItem, meatCategories, mainCourseCategories } from '@/data/recommendations';
import type { MenuItem, DietaryTag } from '@/types/menu';
import type { Locale } from '@/i18n';

/** Wines and wine-related categories use a dedicated immersive modal. */
const WINE_CATEGORIES = new Set([
  'wines-red-portugal',
  'wines-red-world',
  'wines-white',
  'wines-rose',
  'wines-sparkling',
  'wines-fortified',
  'wines-by-glass',
]);

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

  // Wines get an immersive, editorial-style modal (vertical bottle hero,
  // click-to-zoom lightbox, region badge, no sauce/side recommendations).
  if (item && WINE_CATEGORIES.has(item.categoryId)) {
    return <WineDetail item={item} onClose={onClose} />;
  }

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
    if (item.tags.includes('board')) return [];
    const ids = getSidesForItem(item.id);
    return ids
      .map((id) => menuItems.find((m) => m.id === id))
      .filter((m) => m !== undefined && m.available)
      .slice(0, 4);
  }, [item]);

  // Lock body scroll while modal is open (prevents background page from scrolling)
  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [item]);

  // Close on ESC key
  useEffect(() => {
    if (!item) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [item, onClose]);

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

          {/* Panel — split into non-scrolling header (image + close button) +
              scrolling body (content). This keeps the X button always visible
              on mobile, no matter how far the user scrolls. */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={item ? lt(item.name, locale) : ''}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92vh] flex-col rounded-t-3xl border-t border-white/10 bg-dark lg:inset-auto lg:left-1/2 lg:top-1/2 lg:max-h-[88vh] lg:w-full lg:max-w-lg lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl lg:border"
          >
            {/* Drag handle indicator (mobile-only visual hint) */}
            <div className="flex shrink-0 justify-center pt-2 pb-1 lg:hidden">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            {/* Header: image (non-scrolling) */}
            <div className="relative shrink-0 h-44 overflow-hidden bg-dark-lighter sm:h-52 lg:h-56">
              <MenuImage
                itemId={item.id}
                categoryId={item.categoryId}
                alt={lt(item.name, locale)}
                priority
                sizes="(max-width: 640px) 100vw, 512px"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              {(item.tags.includes('premium') || item.tags.includes('wagyu') || item.tags.includes('gold')) && (
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-accent-yellow/10 via-transparent to-red/5" />
              )}

              {/* Close button — z-30 so it's above gradient overlays.
                  Only scale on tap (no hover:rotate, that broke touch UX). */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/85 active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body: scrolls */}
            <div className="overflow-y-auto overscroll-contain px-6 pb-8 pt-5">
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const Icon = tagIcons[tag];
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/55"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {t(`tags.${tag}`)}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Name */}
              <h2 className="mb-2 font-serif text-2xl font-bold leading-tight text-white">
                {lt(item.name, locale)}
              </h2>

              {/* Prep time */}
              {item.preparationTime && (
                <div className="mb-4 flex items-center gap-1.5 text-white/35">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[11px]">{t('prepTime', { minutes: item.preparationTime })}</span>
                </div>
              )}

              {/* Description */}
              {lt(item.description, locale) && (
                <p className="mb-6 text-[14px] leading-relaxed text-white/55">
                  {lt(item.description, locale)}
                </p>
              )}

              {/* ── Recommended Sauces ── */}
              {recommendedSauces.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5 text-accent-orange" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      {t('recommendedSauces')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSauces.map((sauce) =>
                      sauce ? (
                        <div
                          key={sauce.id}
                          className="rounded-full border border-white/[0.08] bg-surface px-3 py-1.5 text-[11px] text-white/65"
                        >
                          {lt(sauce.name, locale)}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* ── Recommended Sides ── */}
              {recommendedSides.length > 0 && (
                <div className="mb-2">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Carrot className="h-3.5 w-3.5 text-accent-green" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      {t('completeDish')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recommendedSides.map((side) =>
                      side ? (
                        <div
                          key={side.id}
                          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-surface px-3 py-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-lighter">
                            <span className="text-xs opacity-30">🥗</span>
                          </div>
                          <span className="text-[12px] text-white/75">{lt(side.name, locale)}</span>
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
