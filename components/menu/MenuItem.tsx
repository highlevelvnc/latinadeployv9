'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Flame, Leaf, Star, Sparkles, Award, Crown, Beef } from 'lucide-react';
import { useMenuStore } from '@/stores/useMenuStore';
import PriceDisplay from '@/components/shared/PriceDisplay';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
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
  item.tags.includes('premium') || item.tags.includes('wagyu') || item.tags.includes('gold') || item.tags.includes('signature');

interface Props {
  item: MenuItemType;
  onSelect: (item: MenuItemType) => void;
}

export default function MenuItem({ item, onSelect }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const isItemAvailable = useMenuStore((s) => s.isItemAvailable);

  const dynamicAvailable = isItemAvailable(item.id);
  const isUnavailable = !item.available || !dynamicAvailable;
  const premium = isPremiumItem(item);

  return (
    <div
      onClick={() => onSelect(item)}
      aria-disabled={isUnavailable || undefined}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
        isUnavailable
          ? 'border-white/[0.04] bg-surface opacity-50 grayscale pointer-events-auto'
          : premium
            ? 'border-accent-yellow/15 bg-surface hover:border-accent-yellow/30 hover:shadow-lg hover:shadow-accent-yellow/5'
            : 'border-white/[0.06] bg-surface hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20'
      }`}
    >
      {/* ── Image Section ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-lighter">
        <MenuImage
          itemId={item.id}
          categoryId={item.categoryId}
          alt={lt(item.name, locale)}
          priority={false}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Premium shimmer overlay */}
        {premium && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-accent-yellow/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}

        {/* Desktop hover zoom */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" />

        {/* Unavailable overlay */}
        {isUnavailable && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-dark/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/60 border border-white/10">
              {t('unavailable')}
            </span>
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
      <div className="p-3 pb-3.5">
        {/* Tags row */}
        {item.tags.length > 0 && (
          <div className="mb-1.5 flex items-center gap-1.5">
            {item.tags.slice(0, 2).map((tag) => {
              const Icon = tagIcons[tag];
              const color = tagColors[tag] ?? 'text-white/40';
              return (
                <span key={tag} className={`flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider ${color}`}>
                  {Icon && <Icon className="h-2.5 w-2.5" />}
                  {t(`tags.${tag}`)}
                </span>
              );
            })}
          </div>
        )}

        {/* Name */}
        <h3 className={`text-[14px] font-semibold leading-snug line-clamp-2 mb-1 ${premium ? 'text-white' : 'text-white/90'}`}>
          {lt(item.name, locale)}
        </h3>

        {/* Description */}
        {lt(item.description, locale) && (
          <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2 mb-2">
            {lt(item.description, locale)}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <PriceDisplay
            cents={item.price}
            priceUnit={item.priceUnit}
            className={`text-[15px] font-bold ${premium ? 'text-accent-yellow' : 'text-white/80'}`}
          />
        </div>
      </div>
    </div>
  );
}
