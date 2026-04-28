'use client';

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import type { DietaryTag } from '@/types/menu';
import { cn } from '@/lib/utils';

// Quality / category tags (one row, red accent)
const HIGHLIGHT_TAGS: DietaryTag[] = [
  'bestseller', 'signature', 'premium', 'wagyu', 'gold', 'board',
];

// Allergen / dietary preference tags (separate row, green accent)
const DIETARY_TAGS: DietaryTag[] = [
  'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'nut-free', 'spicy',
];

export default function DietaryFilter() {
  const t = useTranslations('menu.tags');
  const { activeTags, toggleTag } = useAppStore();

  const renderTag = (tag: DietaryTag, variant: 'quality' | 'dietary') => {
    const isActive = activeTags.includes(tag);
    return (
      <button
        key={tag}
        onClick={() => toggleTag(tag)}
        className={cn(
          'rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-dark',
          isActive
            ? variant === 'dietary'
              ? 'border-accent-green/50 bg-accent-green/15 text-accent-green focus-visible:ring-accent-green/50'
              : 'border-red/50 bg-red/15 text-red-light focus-visible:ring-red/50'
            : 'border-white/10 bg-transparent text-white/55 hover:border-white/25 hover:text-white/85'
        )}
      >
        {t(tag)}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {HIGHLIGHT_TAGS.map((tag) => renderTag(tag, 'quality'))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {DIETARY_TAGS.map((tag) => renderTag(tag, 'dietary'))}
      </div>
    </div>
  );
}
