'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Flame, Leaf, Star, Sparkles, Award, Crown, Beef } from 'lucide-react';
import { useMenuStore } from '@/stores/useMenuStore';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import { getWineCountryFlag } from '@/lib/wine-info';
import type { MenuItem as MenuItemType, DietaryTag } from '@/types/menu';
import type { Locale } from '@/i18n';

const tagIcons: Partial<Record<DietaryTag, typeof Flame>> = {
  spicy: Flame,
  vegetarian: Leaf,
  vegan: Leaf,
  'chefs-pick': Star,
  'new': Sparkles,
  bestseller: Award,
  signature: Star,
  premium: Award,
  wagyu: Beef,
  gold: Crown,
};

const tagColors: Partial<Record<DietaryTag, string>> = {
  spicy: 'text-accent-orange',
  vegetarian: 'text-accent-green',
  vegan: 'text-accent-green',
  'chefs-pick': 'text-accent-yellow',
  'new': 'text-accent-blue',
  bestseller: 'text-accent-orange',
  signature: 'text-accent-yellow',
  premium: 'text-accent-yellow',
  wagyu: 'text-red-light',
  gold: 'text-accent-yellow',
  board: 'text-white/50',
};

// Premium items get a subtle glow border
const isPremiumItem = (item: MenuItemType) =>
  item.tags.includes('premium') ||
  item.tags.includes('wagyu') ||
  item.tags.includes('gold') ||
  item.tags.includes('signature');

interface Props {
  item: MenuItemType;
  onSelect: (item: MenuItemType) => void;
  /** Optional inline style — used by MenuGrid to stagger entrance animations. */
  style?: React.CSSProperties;
}

export default function MenuItem({ item, onSelect, style }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const isItemAvailable = useMenuStore((s) => s.isItemAvailable);

  const dynamicAvailable = isItemAvailable(item.id);
  const isUnavailable = !item.available || !dynamicAvailable;
  const premium = isPremiumItem(item);

  // For wines, show the country flag in the corner of the image —
  // helps customers spot French / Italian / Spanish bottles at a glance
  // without opening each card.
  const isWine = item.categoryId.startsWith('wines-');
  const wineFlag = isWine ? getWineCountryFlag(item) : null;

  // Accessible label for screen readers — name + key context.
  // Without this, VoiceOver/TalkBack only announce "button" → user has
  // no idea what they're about to open.
  const ariaParts: string[] = [lt(item.name, locale)];
  if (isUnavailable) ariaParts.push(t('unavailable'));
  if (premium) ariaParts.push('premium');
  if (item.tags.includes('signature')) ariaParts.push('signature');
  const ariaLabel = ariaParts.join(', ');

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-disabled={isUnavailable || undefined}
      aria-label={ariaLabel}
      style={style}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out
        animate-fade-in-up
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark
        active:scale-[0.985]
        ${
          isUnavailable
            ? 'border-white/[0.04] bg-surface opacity-50 grayscale pointer-events-auto'
            : premium
              ? 'border-accent-yellow/15 bg-surface hover:-translate-y-0.5 hover:border-accent-yellow/35 hover:shadow-xl hover:shadow-accent-yellow/10'
              : 'border-white/[0.06] bg-surface hover:-translate-y-0.5 hover:border-white/15 hover:shadow-xl hover:shadow-black/30'
        }`}
    >
      {/* ── Image Section ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-stone-700/25 via-stone-800/15 to-stone-900/25">
        {/* Image with smooth zoom on hover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
          <MenuImage
            itemId={item.id}
            categoryId={item.categoryId}
            alt={lt(item.name, locale)}
            priority={false}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Premium subtle glow — always visible at low opacity, intensifies on hover */}
        {premium && !isUnavailable && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-accent-yellow/[0.06] via-transparent to-transparent transition-opacity duration-500 group-hover:from-accent-yellow/15" />
        )}

        {/* Unavailable overlay */}
        {isUnavailable && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
            <span className="rounded-full border border-white/10 bg-dark/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70">
              {t('unavailable')}
            </span>
          </div>
        )}

        {/* Country flag — top right corner for wines (helps scan at a glance) */}
        {wineFlag && (
          <div className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/55 text-base shadow-md shadow-black/30 backdrop-blur-md">
            <span aria-hidden>{wineFlag}</span>
          </div>
        )}

        {/* Badge overlay — top left */}
        <div className="absolute left-2 top-2 z-20 flex flex-col gap-1">
          {item.tags.includes('gold') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-yellow/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black shadow-md shadow-accent-yellow/30">
              <Crown className="h-2.5 w-2.5" />
              Gold
            </span>
          )}
          {item.tags.includes('wagyu') && !item.tags.includes('gold') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-md shadow-red/30">
              <Beef className="h-2.5 w-2.5" />
              Wagyu
            </span>
          )}
          {item.tags.includes('bestseller') && !item.tags.includes('gold') && !item.tags.includes('wagyu') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-orange/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-md shadow-accent-orange/30">
              <Award className="h-2.5 w-2.5" />
              #1
            </span>
          )}
          {item.tags.includes('new') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-blue/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-md">
              <Sparkles className="h-2.5 w-2.5" />
              New
            </span>
          )}
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="flex flex-1 flex-col p-3 pb-3.5">
        {/* Tags row */}
        {item.tags.length > 0 && (
          <div className="mb-1.5 flex items-center gap-1.5">
            {item.tags.slice(0, 2).map((tag) => {
              const Icon = tagIcons[tag];
              const color = tagColors[tag] ?? 'text-white/40';
              return (
                <span
                  key={tag}
                  className={`flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider ${color}`}
                >
                  {Icon && <Icon className="h-2.5 w-2.5" />}
                  {t(`tags.${tag}`)}
                </span>
              );
            })}
          </div>
        )}

        {/* Name */}
        <h3
          className={`mb-1 line-clamp-2 text-[14px] font-semibold leading-snug transition-colors group-hover:text-white ${
            premium ? 'text-white' : 'text-white/90'
          }`}
        >
          {lt(item.name, locale)}
        </h3>

        {/* Description */}
        {lt(item.description, locale) && (
          <p className="line-clamp-2 text-[11px] leading-relaxed text-white/30">
            {lt(item.description, locale)}
          </p>
        )}
      </div>
    </button>
  );
}
