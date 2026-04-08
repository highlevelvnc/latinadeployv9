'use client';

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import type { DietaryTag } from '@/types/menu';
import { cn } from '@/lib/utils';

const FILTER_TAGS: DietaryTag[] = [
  'bestseller', 'signature', 'premium', 'wagyu', 'gold',
  'vegetarian', 'spicy', 'board',
];

export default function DietaryFilter() {
  const t = useTranslations('menu.tags');
  const { activeTags, toggleTag } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_TAGS.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/50 focus-visible:ring-offset-1 focus-visible:ring-offset-dark',
              isActive
                ? 'border-red/50 bg-red/15 text-red-light'
                : 'border-white/[0.08] bg-transparent text-white/35 hover:border-white/15 hover:text-white/55'
            )}
          >
            {t(tag)}
          </button>
        );
      })}
    </div>
  );
}
