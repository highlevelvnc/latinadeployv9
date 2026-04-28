'use client';

import { useLocale } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import { categories } from '@/data/menu';
import { t as lt } from '@/lib/localized';
import type { Locale } from '@/i18n';
import { cn } from '@/lib/utils';

export default function CategoryNav() {
  const locale = useLocale() as Locale;
  const { activeCategory, setActiveCategory } = useAppStore();

  // Sorted by sortOrder for consistent UX
  const items = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="sticky top-14 z-30 border-b border-white/[0.06] bg-dark/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div
          className="hide-scrollbar flex gap-1.5 overflow-x-auto py-2.5"
          role="tablist"
          aria-label="Menu categories"
        >
          {items.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() =>
                  // Toggle: clicking the active category clears it (back to "all" view)
                  setActiveCategory(isActive ? null : item.id)
                }
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide transition-colors duration-150',
                  isActive
                    ? 'bg-red/90 text-white shadow-sm shadow-red/20'
                    : 'text-white/55 hover:text-white/85 active:text-white'
                )}
              >
                {lt(item.name, locale)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
