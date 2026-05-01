'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Wine, Award, Crown, Sparkles, Star,
  Maximize2, Grape, BookOpen, UtensilsCrossed, ChevronDown,
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
 * Immersive editorial wine modal.
 *
 * UX rules tested:
 * - X is z-50 with 44×44 touch target + stopPropagation. WineHero is
 *   NOT a giant button anymore — only a small Zoom badge in the corner
 *   triggers the lightbox. So mistaps near X never trigger zoom.
 * - mode="wait" + 0.2s exit on backdrop = snappy nav between wines.
 * - Body scroll lock is delegated to the parent MenuItemDetail so we
 *   don't get the race-condition where the page becomes unscrollable.
 */
export default function WineDetail({ item, onClose }: Props) {
  const locale = useLocale() as Locale;
  const [zoomed, setZoomed] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Reset scroll + show scroll hint each time a new wine opens.
  // Without this, on iOS Safari the scroll position from the previous
  // wine could persist and the user lands mid-body, missing the hero.
  useEffect(() => {
    if (!item) return;
    setShowScrollHint(true);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [item]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop > 24 && showScrollHint) {
      setShowScrollHint(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {item && (
        // KEY tied to item.id — without this, framer-motion + the nested
        // staggered variants in <WineBody> don't reliably reset between
        // wines. Symptom: only the first wine opened renders its full body;
        // subsequent wines show a blank/partial body. Forcing the key to
        // change per item guarantees AnimatePresence cycles exit→enter and
        // every nested motion.div gets a fresh mount with `initial="hidden"`
        // → `animate="visible"` running again.
        <motion.div
          key={`wine-${item.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
          />

          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-6">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.8 }}
              role="dialog"
              aria-modal="true"
              aria-label={lt(item.name, locale)}
              className="pointer-events-auto relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-gradient-to-b from-zinc-950 via-stone-950 to-black shadow-2xl shadow-black/70 lg:max-h-[90vh] lg:max-w-2xl lg:rounded-3xl lg:border"
            >
              {/* Drag handle (mobile-only) — pushed below safe area so it
                  doesn't sit under the iPhone notch / dynamic island */}
              <div
                className="flex shrink-0 justify-center pb-1 lg:hidden"
                style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
              >
                <div className="h-1 w-10 rounded-full bg-white/25" />
              </div>

              {/* Close button — positioned with enough top padding to clear:
                  • Safari iOS notch / dynamic island (~50-60px)
                  • Chrome iOS URL bar (~50px) — it overlays content rather
                    than reducing the viewport, so env(safe-area-inset-top)
                    returns 0 and the X gets covered.
                  Solution: max(env, 60px) so we never end up under browser UI. */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close"
                style={{ top: 'max(env(safe-area-inset-top, 0px) + 12px, 60px)' }}
                className="absolute right-3.5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg shadow-black/50 ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white/35 hover:bg-black active:scale-90 lg:!top-5 lg:right-5"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>

              {/* Scrollable body */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overscroll-contain"
              >
                <WineHero item={item} onZoom={() => setZoomed(true)} locale={locale} />
                <WineBody item={item} locale={locale} />
                {/* Bottom safe-area padding so the home indicator doesn't
                    eat into the sommelier note on iPhone. */}
                <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
              </div>

              {/* Scroll-for-more hint — pulses gently at the bottom of the
                  modal when there's content below the fold. Disappears the
                  moment the user starts scrolling. Crucial because the hero
                  image is large and the history/pairing sit below it.
                  This is the fix for "I only see name + região, where's the
                  history?" — telling the user there's more to see. */}
              <AnimatePresence>
                {showScrollHint && (
                  <motion.div
                    key="scroll-hint"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pb-3"
                    style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 14px)' }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md shadow-lg shadow-black/40"
                    >
                      <ChevronDown className="h-3 w-3" />
                      {{
                        pt: 'História',
                        en: 'History',
                        fr: 'Histoire',
                        ru: 'Подробнее',
                        zh: '故事',
                      }[locale] ?? 'História'}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {zoomed && (
            <Lightbox item={item} onClose={() => setZoomed(false)} locale={locale} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero — bottle showcase with breathing spotlight + floor reflection ─ */
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
    <div className="relative overflow-hidden">
      {/* Slow breathing warm spotlight — gives the bottle a "lived" feel */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-amber-700/35 via-amber-900/15 to-transparent animate-breathe-glow" />

      {/* Soft fade to dark at the bottom — frames the bottle */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />

      {/* Stage / reflection ground */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-12 w-[55%] -translate-x-1/2 rounded-[100%] bg-amber-950/40 blur-2xl" />

      {/* Slow rotating halo behind the bottle — gives depth without
          competing with the breathing glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(217,119,6,0.18), transparent, rgba(180,83,9,0.12), transparent)',
          animation: 'wineHaloSpin 22s linear infinite',
        }}
      />

      {/* Hero height tuned so the "História" headline is visible above
          the fold on a typical phone (iPhone 16 ~ 932 viewport): ~32vh
          for the bottle leaves enough room for tags + name + região +
          start of the história section. Reduced from 42vh after user
          feedback that the body looked empty. */}
      <div className="relative mx-auto flex h-[32vh] min-h-[220px] w-full items-end justify-center pb-1 lg:h-[40vh]">
        {src ? (
          <motion.div
            initial={{ y: 36, opacity: 0, scale: 0.94 }}
            animate={{
              y: [0, -6, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              y: {
                delay: 0.6,
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              },
              opacity: { delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              scale: { delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src={src}
              alt={lt(item.name, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              priority
              className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wine className="h-24 w-24 text-white/10" />
          </div>
        )}

        {/* Zoom badge — small clickable area, doesn't block X above */}
        {src && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onZoom();
            }}
            aria-label="Zoom image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/95 shadow-md shadow-black/40 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/85 active:scale-95"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Zoom
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ── Editorial body — name, region, history, pairing ─────────────────── */
function WineBody({ item, locale }: { item: MenuItem; locale: Locale }) {
  const info = getWineInfo(item.id);
  const region = lt(item.description, locale);
  const fullName = lt(item.name, locale);
  const { displayName, vintage } = useMemo(() => parseVintage(fullName), [fullName]);

  // Stagger config — kept tight so the entire body (history + pairing
  // + sommelier) is on-screen well under 800ms. Longer delays were
  // making users on iOS think the history "wasn't loading".
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.05 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  };

  const isHighlight = item.tags.includes('gold') ||
    item.tags.includes('signature') ||
    item.tags.includes('premium');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-6 pb-10 pt-7 lg:px-10 lg:pt-9"
    >
      {/* Tags row */}
      {item.tags.length > 0 && (
        <motion.div variants={itemVariants} className="mb-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const Icon = tagIcons[tag];
            const isPrestige = tag === 'gold' || tag === 'signature' || tag === 'premium';
            return (
              <span
                key={tag}
                className="relative inline-flex items-center gap-1 overflow-hidden rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-yellow"
              >
                {/* Subtle shimmer sweep on prestige tags */}
                {isPrestige && (
                  <span className="pointer-events-none absolute inset-0 animate-shimmer" />
                )}
                {Icon && <Icon className="relative z-10 h-3 w-3" />}
                <span className="relative z-10">{tag}</span>
              </span>
            );
          })}
        </motion.div>
      )}

      {/* Wine name + vintage display */}
      <motion.div variants={itemVariants}>
        <h2 className="font-serif text-[28px] font-bold leading-[1.05] tracking-tight text-white sm:text-3xl lg:text-4xl">
          {displayName}
        </h2>
        {vintage && (
          <motion.div
            className="mt-3 flex items-baseline gap-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block font-serif text-[44px] font-light leading-none tracking-tight text-accent-yellow lg:text-[52px]"
                style={{ textShadow: '0 4px 18px rgba(234,179,8,0.18)' }}
              >
                {vintage}
              </motion.span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px origin-left bg-accent-yellow/40 mt-1.5"
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              {{
                pt: 'Safra',
                en: 'Vintage',
                fr: 'Millésime',
                ru: 'Урожай',
                zh: '年份',
              }[locale] ?? 'Vintage'}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Region + flag */}
      <motion.div variants={itemVariants} className="mt-5 flex flex-wrap items-center gap-2.5">
        {region && (
          <div className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 backdrop-blur-sm transition-all duration-300 hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.06]">
            <MapPin className="h-3.5 w-3.5 text-accent-yellow transition-transform duration-300 group-hover:scale-110" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/90">
              {region}
            </span>
          </div>
        )}
        {info?.country && (
          <motion.span
            className="text-[26px] leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            aria-hidden
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 14 }}
          >
            {info.country}
          </motion.span>
        )}
      </motion.div>

      {/* Grapes */}
      {info?.grapes && (
        <motion.div
          variants={itemVariants}
          className="mt-5 flex items-start gap-2 text-[12.5px] text-white/65"
        >
          <Grape className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
          <span className="italic leading-relaxed">{info.grapes}</span>
        </motion.div>
      )}

      {/* Editorial divider — animated lines that draw from the center
          outward + a tiny rotating wine glyph as the focal point */}
      <motion.div variants={itemVariants} className="my-7 flex items-center gap-3">
        <motion.div
          className="h-px origin-right flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/25"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 240, damping: 15 }}
        >
          <Wine className="h-4 w-4 text-accent-yellow/70" />
        </motion.div>
        <motion.div
          className="h-px origin-left flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/25"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* History */}
      <motion.div variants={itemVariants} className="mb-7">
        <SectionHeader
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
        />
        {/* Editorial quote-style block. The opening quote scales/rotates
            in slightly after the paragraph — feels like the punctuation
            is being drawn over the text. */}
        <div className="relative pl-5">
          <motion.span
            className="pointer-events-none absolute -left-1 -top-3 select-none font-serif text-[64px] leading-none text-accent-yellow/25"
            aria-hidden
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            “
          </motion.span>
          <p className="text-[14.5px] leading-[1.72] text-white/85 [text-wrap:pretty]">
            {info?.history
              ? lt(info.history as never, locale)
              : genericHistory(region, locale)}
          </p>
        </div>
      </motion.div>

      {/* Pairing */}
      <motion.div variants={itemVariants} className="mb-7">
        <SectionHeader
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
        />
        <p className="text-[14.5px] leading-[1.72] text-white/85 [text-wrap:pretty]">
          {info?.pairing
            ? lt(info.pairing as never, locale)
            : genericPairing(item, locale)}
        </p>
      </motion.div>

      {/* Sommelier note — gold gradient sweep on hover for prestige wines.
          On non-highlight wines, a softer fade. Always feels alive. */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`group relative mt-9 overflow-hidden rounded-xl border px-4 py-4 text-center transition-colors duration-500 ${
          isHighlight
            ? 'border-accent-yellow/25 bg-accent-yellow/[0.04] hover:border-accent-yellow/45 hover:bg-accent-yellow/[0.08]'
            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
        }`}
      >
        {/* Subtle horizontal sheen on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
        />
        <p className="relative text-[11.5px] italic leading-relaxed text-white/65">
          {{
            pt: 'Consulte o nosso sommelier para harmonizações personalizadas e disponibilidade.',
            en: 'Ask our sommelier for personalized pairings and availability.',
            fr: 'Consultez notre sommelier pour des accords personnalisés.',
            ru: 'Уточните у сомелье индивидуальные сочетания.',
            zh: '请咨询我们的侍酒师了解个性化搭配。',
          }[locale] ?? 'Consulte o nosso sommelier.'}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Section header ─────────────────────────────────────────────────────── */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">
        {title}
      </h3>
      {/* Hairline that draws to the right of the header — adds editorial
          rhythm without overwhelming. */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="h-px flex-1 origin-left bg-gradient-to-r from-white/15 to-transparent"
      />
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

/** Pulls a 4-digit year out of the wine name for big-display vintage. */
function parseVintage(name: string): { displayName: string; vintage: string | null } {
  const match = name.match(/\b(19|20)\d{2}\b/);
  if (!match) return { displayName: name, vintage: null };
  // Remove the year + any surrounding spaces
  const displayName = name.replace(match[0], '').replace(/\s+/g, ' ').trim();
  return { displayName, vintage: match[0] };
}

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
        style={{ top: 'max(env(safe-area-inset-top, 0px) + 12px, 60px)' }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg shadow-black/50 ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black active:scale-90 lg:!top-5"
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
