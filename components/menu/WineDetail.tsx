'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Wine, Award, Crown, Sparkles, Star, Maximize2 } from 'lucide-react';
import { t as lt } from '@/lib/localized';
import { getMenuItemImage } from '@/lib/menu-images';
import type { MenuItem, DietaryTag } from '@/types/menu';
import type { Locale } from '@/i18n';

const tagIcons: Partial<Record<DietaryTag, typeof Wine>> = {
  signature: Star,
  premium: Award,
  gold: Crown,
  'chefs-pick': Sparkles,
};

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

/**
 * Immersive wine detail modal — built specifically for the bottle aspect.
 *
 * Differences from the regular MenuItemDetail:
 * - Hero focuses on the bottle (vertical aspect, centered, dark gradient bg)
 * - Click the image → fullscreen lightbox with pinch/zoom (CSS object-contain)
 * - Region badge prominent (with map pin icon)
 * - No "recommended sauces / sides" sections (not relevant for wine)
 * - Slightly more editorial typography
 */
export default function WineDetail({ item, onClose }: Props) {
  const locale = useLocale() as Locale;
  const [zoomed, setZoomed] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [item]);

  // Close on ESC
  useEffect(() => {
    if (!item) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (zoomed) setZoomed(false);
      else onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [item, zoomed, onClose]);

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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={lt(item.name, locale)}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[94vh] flex-col rounded-t-3xl border-t border-white/10 bg-gradient-to-b from-zinc-950 via-stone-950 to-black lg:inset-auto lg:left-1/2 lg:top-1/2 lg:max-h-[90vh] lg:w-full lg:max-w-2xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl lg:border"
          >
            {/* Drag handle */}
            <div className="flex shrink-0 justify-center pt-2 pb-1 lg:hidden">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            {/* Close — fixed top-right of modal panel */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/85 active:scale-90 lg:top-5"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Hero — bottle showcase */}
              <WineHero item={item} onZoom={() => setZoomed(true)} locale={locale} />

              {/* Body */}
              <div className="px-6 pb-10 pt-6 lg:px-10">
                {/* Tags row */}
                {item.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => {
                      const Icon = tagIcons[tag];
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent-yellow"
                        >
                          {Icon && <Icon className="h-3 w-3" />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Wine name — editorial style */}
                <h2 className="font-serif text-3xl font-bold leading-[1.05] tracking-tight text-white lg:text-4xl">
                  {lt(item.name, locale)}
                </h2>

                {/* Region badge */}
                {lt(item.description, locale) && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2">
                    <MapPin className="h-3.5 w-3.5 text-accent-yellow" />
                    <span className="text-[12px] font-medium uppercase tracking-wider text-white/85">
                      {lt(item.description, locale)}
                    </span>
                  </div>
                )}

                {/* Editorial divider */}
                <div className="my-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <Wine className="h-4 w-4 text-white/30" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                {/* "Sob consulta" or pairing hint */}
                <p className="text-center text-[12px] italic leading-relaxed text-white/40">
                  {locale === 'pt' && 'Consulte o nosso sommelier para harmonização e disponibilidade.'}
                  {locale === 'en' && 'Ask our sommelier for pairing and availability.'}
                  {locale === 'fr' && 'Consultez notre sommelier pour l\'accord et la disponibilité.'}
                  {locale === 'ru' && 'Уточните у сомелье сочетание и наличие.'}
                  {locale === 'zh' && '请咨询我们的侍酒师了解搭配与库存。'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Fullscreen lightbox — click image to expand */}
          {zoomed && (
            <Lightbox item={item} onClose={() => setZoomed(false)} locale={locale} />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Hero — vertical bottle showcase ────────────────────────────────────── */
function WineHero({
  item,
  onZoom,
  locale,
}: {
  item: MenuItem;
  onZoom: () => void;
  locale: Locale;
}) {
  const src = getMenuItemImage(item.id);

  return (
    <div className="relative">
      {/* Atmospheric backdrop — warm wine cellar feel */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-amber-950/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />

      <button
        type="button"
        onClick={onZoom}
        aria-label="Zoom image"
        className="relative mx-auto flex h-[44vh] min-h-[280px] w-full items-end justify-center overflow-hidden lg:h-[52vh]"
      >
        {src ? (
          <Image
            src={src}
            alt={lt(item.name, locale)}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
            className="object-contain object-bottom transition-transform duration-700 hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wine className="h-24 w-24 text-white/10" />
          </div>
        )}

        {/* Zoom hint */}
        {src && (
          <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" />
            Zoom
          </div>
        )}
      </button>
    </div>
  );
}

/* ── Fullscreen lightbox ────────────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
  locale,
}: {
  item: MenuItem;
  onClose: () => void;
  locale: Locale;
}) {
  const src = getMenuItemImage(item.id);
  if (!src) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close zoom"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/85 active:scale-90"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative h-[90vh] w-[92vw] max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={lt(item.name, locale)}
          fill
          sizes="92vw"
          priority
          className="object-contain"
        />
      </motion.div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-wider text-white/55">
        {locale === 'pt' && 'Toque fora para fechar'}
        {locale === 'en' && 'Tap outside to close'}
        {locale === 'fr' && 'Appuyez en dehors pour fermer'}
        {locale === 'ru' && 'Нажмите снаружи, чтобы закрыть'}
        {locale === 'zh' && '点击外部关闭'}
      </p>
    </motion.div>
  );
}
