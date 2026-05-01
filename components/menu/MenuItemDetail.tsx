'use client';

import { useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { X, Clock, Flame, Leaf, Star, Sparkles, Award, Crown, Beef, Droplets, Carrot } from 'lucide-react';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import { menuItems } from '@/data/menu';
import { getSaucesForItem, getSidesForItem, meatCategories, mainCourseCategories } from '@/data/recommendations';
import type { MenuItem, DietaryTag } from '@/types/menu';
import type { Locale } from '@/i18n';

/**
 * WineDetail is 683 lines and only used when the user opens a wine.
 * Lazy-loading saves ~12KB from the initial JS bundle.
 *
 * IMPORTANT: ssr:false is intentional — WineDetail uses framer-motion
 * heavily and we hit hydration mismatch issues otherwise. Loading state
 * is a no-op (the parent backdrop already provides visual feedback).
 *
 * The previous regression where "from the 2nd wine onward, body didn't
 * render" was caused by a constant key on the outer motion.div, NOT by
 * dynamic import. That bug is fixed in WineDetail itself (key=item.id).
 */
const WineDetail = dynamic(() => import('@/components/menu/WineDetail'), {
  ssr: false,
});

/**
 * Wines and wine-related categories use a dedicated immersive modal.
 *
 * IMPORTANT: This used to be a hardcoded Set of category IDs, but when we
 * split reds by country (wines-red-france, wines-red-italy, wines-red-spain,
 * wines-red-usa) those new categories weren't added — and ALL non-Portugal
 * red wines silently fell back to the generic modal (no history, no pairing,
 * no flag). The user reported "only Pera Manca shows everything" — that's
 * because only wines-red-portugal was in the list.
 *
 * Switching to a prefix check means any future wine category (e.g.
 * wines-orange, wines-natural, wines-by-region-tuscany) is auto-included.
 */
function isWineCategory(categoryId: string): boolean {
  return categoryId.startsWith('wines-');
}

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

  // Wines get an immersive, editorial-style modal. The branch is AFTER the
  // hook calls so we don't violate the rules of hooks (hooks must run in the
  // same order every render).
  if (item && isWineCategory(item.categoryId)) {
    return <WineDetail item={item} onClose={onClose} />;
  }

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
                <motion.div
                  className="mb-3 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.tags.map((tag, idx) => {
                    const Icon = tagIcons[tag];
                    return (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.06 + idx * 0.04, duration: 0.3 }}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/55"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {t(`tags.${tag}`)}
                      </motion.span>
                    );
                  })}
                </motion.div>
              )}

              {/* Name */}
              <motion.h2
                className="mb-2 font-serif text-2xl font-bold leading-tight text-white"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {lt(item.name, locale)}
              </motion.h2>

              {/* Prep time */}
              {item.preparationTime && (
                <motion.div
                  className="mb-4 flex items-center gap-1.5 text-white/35"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[11px]">{t('prepTime', { minutes: item.preparationTime })}</span>
                </motion.div>
              )}

              {/* Description */}
              {lt(item.description, locale) && (
                <motion.p
                  className="mb-6 text-[14px] leading-relaxed text-white/55 [text-wrap:pretty]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {lt(item.description, locale)}
                </motion.p>
              )}

              {/* ── Recommended Sauces ── */}
              {recommendedSauces.length > 0 && (
                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5 text-accent-orange" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      {t('recommendedSauces')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSauces.map((sauce, idx) =>
                      sauce ? (
                        <motion.div
                          key={sauce.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.2 + idx * 0.05,
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="rounded-full border border-white/[0.08] bg-surface px-3 py-1.5 text-[11px] text-white/65 transition-all duration-200 hover:border-accent-orange/30 hover:bg-accent-orange/5 hover:text-white/85"
                        >
                          {lt(sauce.name, locale)}
                        </motion.div>
                      ) : null
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── Recommended Sides ── */}
              {recommendedSides.length > 0 && (
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <Carrot className="h-3.5 w-3.5 text-accent-green" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      {t('completeDish')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recommendedSides.map((side, idx) =>
                      side ? (
                        <motion.div
                          key={side.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.28 + idx * 0.06,
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-surface px-3 py-2 transition-all duration-200 hover:border-accent-green/25 hover:bg-accent-green/5"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-lighter">
                            <span className="text-xs opacity-30">🥗</span>
                          </div>
                          <span className="text-[12px] text-white/75">{lt(side.name, locale)}</span>
                        </motion.div>
                      ) : null
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
