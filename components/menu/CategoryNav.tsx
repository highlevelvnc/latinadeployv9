'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import { categories } from '@/data/menu';
import { t as lt } from '@/lib/localized';
import type { Locale } from '@/i18n';
import { cn } from '@/lib/utils';

export default function CategoryNav() {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const { activeCategory, setActiveCategory } = useAppStore();

  const allItems = [{ id: null, label: t('allCategories') }, ...categories.map((c) => ({ id: c.id, label: lt(c.name, locale) }))];

  return (
    <div className="sticky top-14 z-30 border-b border-white/[0.06] bg-dark/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto py-3" role="tablist" aria-label="Menu categories">
          {allItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id ?? 'all'}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(item.id)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-200',
                  isActive
                    ? 'bg-red/90 text-white'
                    : 'text-white/40 hover:text-white/65'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
