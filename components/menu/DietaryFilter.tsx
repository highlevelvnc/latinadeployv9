'use client';

import { useTranslations } from 'next-intl';
import {
  TrendingUp, Star, Award, Beef, Crown, LayoutGrid,
  Leaf, Sprout, WheatOff, MilkOff, NutOff, Flame, X,
  type LucideIcon,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import type { DietaryTag } from '@/types/menu';
import { cn } from '@/lib/utils';

interface TagDef {
  id: DietaryTag;
  icon: LucideIcon;
}

// Quality / category tags — red accent when active
const QUALITY_TAGS: TagDef[] = [
  { id: 'bestseller', icon: TrendingUp },
  { id: 'signature', icon: Star },
  { id: 'premium', icon: Award },
  { id: 'wagyu', icon: Beef },
  { id: 'gold', icon: Crown },
  { id: 'board', icon: LayoutGrid },
];

// Allergen / dietary tags — green accent when active
const DIETARY_TAGS: TagDef[] = [
  { id: 'vegetarian', icon: Leaf },
  { id: 'vegan', icon: Sprout },
  { id: 'gluten-free', icon: WheatOff },
  { id: 'lactose-free', icon: MilkOff },
  { id: 'nut-free', icon: NutOff },
  { id: 'spicy', icon: Flame },
];

export default function DietaryFilter() {
  const t = useTranslations('menu.tags');
  const tCommon = useTranslations('common');
  const { activeTags, toggleTag } = useAppStore();
  const hasActive = activeTags.length > 0;

  const clearAll = () => {
    activeTags.forEach((tag) => toggleTag(tag));
  };

  const renderChip = ({ id, icon: Icon }: TagDef, variant: 'quality' | 'dietary') => {
    const isActive = activeTags.includes(id);
    const activeStyle =
      variant === 'dietary'
        ? 'border-accent-green/50 bg-accent-green/15 text-accent-green'
        : 'border-red/50 bg-red/15 text-red-light';

    return (
      <button
        key={id}
        onClick={() => toggleTag(id)}
        aria-pressed={isActive}
        className={cn(
          'group flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold tracking-wide transition-all duration-200 active:scale-[0.93]',
          isActive
            ? cn(activeStyle, 'shadow-sm shadow-black/20')
            : 'border-white/[0.08] bg-white/[0.02] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/90'
        )}
      >
        <Icon
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            isActive ? 'scale-110' : 'text-white/40 group-hover:text-white/70'
          )}
        />
        <span>{t(id)}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      {/* Row 1: quality / category tags — full-bleed scroll on mobile */}
      <div className="hide-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
        {QUALITY_TAGS.map((tag) => renderChip(tag, 'quality'))}
      </div>

      {/* Row 2: dietary / allergen tags + clear button when active */}
      <div className="hide-scrollbar -mx-4 flex items-center gap-1.5 overflow-x-auto px-4">
        {DIETARY_TAGS.map((tag) => renderChip(tag, 'dietary'))}
        {hasActive && (
          <button
            onClick={clearAll}
            aria-label={tCommon('clearFilters')}
            className="ml-1 flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[10.5px] font-medium text-white/55 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.05] hover:text-white/90 active:scale-[0.93]"
          >
            <X className="h-3 w-3" />
            <span>{tCommon('clearFilters')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
