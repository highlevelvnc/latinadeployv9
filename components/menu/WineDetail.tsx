'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Wine, Award, Crown, Sparkles, Star,
  Maximize2, Grape, BookOpen, UtensilsCrossed,
} from 'lucide-react';
import { t as lt } from '@/lib/localized';
import { getMenuItemImage } from '@/lib/menu-images';
import { getWineInfo } from '@/lib/wine-info';
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
 * Immersive wine detail modal.
 *
 * Bug fixes (this revision):
 * - X button was sometimes unresponsive: it lived above a giant
 *   <button> (the WineHero zoom area) that covered ~48vh. Mistaps near
 *   the X edge triggered the zoom instead. Solution:
 *     1. WineHero is now a <div> with onClick on a small INNER zoom badge,
 *        not the entire hero area. Tap-down anywhere else does nothing.
 *     2. X has z-50 (above zoom badge z-20), 44×44 touch target,
 *        stopPropagation on click, and visible backdrop+ring for affordance.
 * - Exit animation shortened so navigating between wines feels snappy.
 */
export default function WineDetail({ item, onClose }: Props) {
  const locale = useLocale() as Locale;
  const [zoomed, setZoomed] = useState(false);

  // Close on ESC. Zoom takes precedence: ESC first closes the lightbox,
  // then closes the modal on a second press.
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
    <AnimatePresence mode="wait">
      {item && (
        <motion.div
          key="wine-modal"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
          />

          {/* Centering wrapper — flex centers on desktop, pins to bottom on mobile.
              pointer-events-none so clicks fall through to the backdrop UNLESS
              they hit the panel (which is pointer-events-auto). */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-6">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.8 }}
              role="dialog"
              aria-modal="true"
              aria-label={lt(item.name, locale)}
              className="pointer-events-auto relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-gradient-to-b from-zinc-950 via-stone-950 to-black shadow-2xl shadow-black/60 lg:max-h-[90vh] lg:max-w-2xl lg:rounded-3xl lg:border"
            >
              {/* Drag handle (mobile-only) */}
              <div className="flex shrink-0 justify-center pt-2 pb-1 lg:hidden">
                <div className="h-1 w-10 rounded-full bg-white/25" />
              </div>

              {/* Close button — z-50, bigger touch target, stopPropagation,
                  enhanced visibility with ring + drop shadow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close"
                className="absolute right-3.5 top-3.5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg shadow-black/50 ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white/35 hover:bg-black active:scale-90 lg:top-5 lg:right-5"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <WineHero item={item} onZoom={() => setZoomed(true)} locale={locale} />
                <WineBody item={item} locale={locale} />
              </div>
            </motion.div>
          </div>

          {/* Fullscreen lightbox */}
          {zoomed && (
            <Lightbox item={item} onClose={() => setZoomed(false)} locale={locale} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero — vertical bottle showcase (NOT clickable as a whole) ─────────── */
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-amber-950/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />

      <div className="relative mx-auto flex h-[40vh] min-h-[260px] w-full items-end justify-center overflow-hidden lg:h-[46vh]">
        {src ? (
          <Image
            src={src}
            alt={lt(item.name, locale)}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
            className="object-contain object-bottom"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wine className="h-24 w-24 text-white/10" />
          </div>
        )}

        {/* Zoom badge — small clickable area in the corner. Doesn't capture
            taps anywhere else on the hero, so the X above is never blocked. */}
        {src && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onZoom();
            }}
            aria-label="Zoom image"
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/95 shadow-md shadow-black/40 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/85 active:scale-95"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Zoom
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Editorial body — name, region, history, pairing ─────────────────── */
function WineBody({ item, locale }: { item: MenuItem; locale: Locale }) {
  const info = getWineInfo(item.id);
  const region = lt(item.description, locale);

  return (
    <div className="px-6 pb-10 pt-7 lg:px-10 lg:pt-8">
      {/* Tags row */}
      {item.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const Icon = tagIcons[tag];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-yellow"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Wine name — editorial style */}
      <h2 className="font-serif text-[28px] font-bold leading-[1.05] tracking-tight text-white sm:text-3xl lg:text-4xl">
        {lt(item.name, locale)}
      </h2>

      {/* Region + country flag */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        {region && (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2">
            <MapPin className="h-3.5 w-3.5 text-accent-yellow" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/90">
              {region}
            </span>
          </div>
        )}
        {info?.country && (
          <span
            className="text-[26px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            aria-hidden
          >
            {info.country}
          </span>
        )}
      </div>

      {/* Grapes (if curated) */}
      {info?.grapes && (
        <div className="mt-5 flex items-start gap-2 text-[12.5px] text-white/60">
          <Grape className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
          <span className="italic leading-relaxed">{info.grapes}</span>
        </div>
      )}

      {/* Editorial divider */}
      <div className="my-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <Wine className="h-4 w-4 text-white/35" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* History */}
      <Section
        icon={<BookOpen className="h-4 w-4 text-accent-yellow" />}
        title={
          {
            pt: 'História',
            en: 'History',
            fr: 'Histoire',
            ru: 'История',
            zh: '故事',
          }[locale] ?? 'História'
        }
      >
        <p className="text-[14.5px] leading-[1.65] text-white/80">
          {info?.history
            ? lt(info.history as never, locale)
            : genericHistory(region, locale)}
        </p>
      </Section>

      {/* Pairing */}
      <Section
        icon={<UtensilsCrossed className="h-4 w-4 text-accent-yellow" />}
        title={
          {
            pt: 'Harmonização sugerida',
            en: 'Suggested pairing',
            fr: 'Accord suggéré',
            ru: 'Рекомендуемое сочетание',
            zh: '推荐搭配',
          }[locale] ?? 'Harmonização sugerida'
        }
      >
        <p className="text-[14.5px] leading-[1.65] text-white/80">
          {info?.pairing
            ? lt(info.pairing as never, locale)
            : genericPairing(item, locale)}
        </p>
      </Section>

      {/* Sommelier note */}
      <div className="mt-9 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-center">
        <p className="text-[11px] italic leading-relaxed text-white/55">
          {{
            pt: 'Consulte o nosso sommelier para harmonizações personalizadas e disponibilidade.',
            en: 'Ask our sommelier for personalized pairings and availability.',
            fr: 'Consultez notre sommelier pour des accords personnalisés.',
            ru: 'Уточните у сомелье индивидуальные сочетания.',
            zh: '请咨询我们的侍酒师了解个性化搭配。',
          }[locale] ?? 'Consulte o nosso sommelier.'}
        </p>
      </div>
    </div>
  );
}

/* ── Section helper ─────────────────────────────────────────────────────── */
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="mb-2.5 flex items-center gap-2">
        {icon}
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

/* ── Generic fallbacks when wine isn't curated in wine-info.ts ──────────── */
function genericHistory(region: string, locale: Locale): string {
  if (locale === 'pt') {
    return region
      ? `Vinho da região de ${region}, expressão da identidade local. Cada garrafa carrega o terroir do seu solo, clima e tradição vinícola da região.`
      : 'Vinho com identidade própria, fruto de tradição e cuidado na vinificação.';
  }
  if (locale === 'en') {
    return region
      ? `A wine from ${region}, expressing the identity of its origin. Each bottle reflects the terroir, climate and winemaking tradition of the region.`
      : 'A wine with its own identity, fruit of tradition and careful vinification.';
  }
  if (locale === 'fr') {
    return region
      ? `Un vin de ${region}, expression de l'identité locale. Chaque bouteille reflète le terroir et la tradition de la région.`
      : "Vin avec son identité propre, fruit de tradition et de soin.";
  }
  if (locale === 'zh') {
    return region
      ? `产自${region}地区的葡萄酒，承载产区独特风土与酿造传统。`
      : '具独特个性的葡萄酒，传统与匠心的结晶。';
  }
  return 'Vinho com identidade própria.';
}

function genericPairing(item: MenuItem, locale: Locale): string {
  const isPremium = item.tags.includes('premium') || item.tags.includes('signature');
  const isWhite = item.categoryId === 'wines-white' || item.categoryId === 'wines-sparkling';

  if (locale === 'pt') {
    if (isWhite) return 'Excelente com mariscos grelhados, atum braseado, queijos suaves e entradas frias.';
    if (isPremium) return 'Recomendado com cortes nobres como Tomahawk, Chuletón Wagyu ou Costela no Bafo. Pede ocasiões memoráveis.';
    return 'Combina com Picanha, Filet Mignon e cortes maturados na brasa.';
  }
  if (locale === 'en') {
    if (isWhite) return 'Excellent with grilled seafood, seared tuna, mild cheeses and cold starters.';
    if (isPremium) return 'Pairs with noble cuts like Tomahawk, Wagyu Chuletón or Slow-Steamed Short Ribs. Memorable occasions.';
    return 'Goes well with Picanha, Filet Mignon and dry-aged cuts on the grill.';
  }
  if (locale === 'fr') {
    if (isWhite) return 'Excellent avec fruits de mer grillés, thon saisi et fromages doux.';
    if (isPremium) return 'À marier avec Tomahawk, Chuletón Wagyu ou Côtes 12h.';
    return 'Bon avec Picanha, Filet Mignon et viandes maturées.';
  }
  if (locale === 'zh') {
    if (isWhite) return '与烤海鲜、炙烤金枪鱼、温和奶酪及冷前菜相得益彰。';
    if (isPremium) return '建议搭配战斧、和牛带骨牛排或12小时慢蒸牛肋。难忘时刻之选。';
    return '与臀盖肉、菲力牛排及炭烤熟成肉品搭配。';
  }
  return 'Combina com cortes premium da casa.';
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
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close zoom"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg shadow-black/50 ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black active:scale-90"
      >
        <X className="h-5 w-5" strokeWidth={2.5} />
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
        {{
          pt: 'Toque fora para fechar',
          en: 'Tap outside to close',
          fr: 'Appuyez en dehors pour fermer',
          ru: 'Нажмите снаружи, чтобы закрыть',
          zh: '点击外部关闭',
        }[locale] ?? 'Tap outside to close'}
      </p>
    </motion.div>
  );
}
