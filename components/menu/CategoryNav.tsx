'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Home } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { categories, categoryGroups } from '@/data/menu';
import { t as lt } from '@/lib/localized';
import type { Locale } from '@/i18n';
import type { LocalizedString } from '@/types/menu';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  name: LocalizedString;
  sortOrder: number;
  isGroup: boolean;
}

export default function CategoryNav() {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const { activeCategory, setActiveCategory } = useAppStore();

  // Top-level nav: food cats (no parentGroup) + the 2 drink groups.
  // Drink sub-categories are hidden until their group is selected.
  const topLevel: NavItem[] = useMemo(() => {
    const foodCats: NavItem[] = categories
      .filter((c) => !c.parentGroup)
      .map((c) => ({ id: c.id, name: c.name, sortOrder: c.sortOrder, isGroup: false }));
    const groups: NavItem[] = categoryGroups.map((g) => ({
      id: g.id,
      name: g.name,
      sortOrder: g.sortOrder,
      isGroup: true,
    }));
    return [...foodCats, ...groups].sort((a, b) => a.sortOrder - b.sortOrder);
  }, []);

  // When a group is active, find its sub-categories
  const activeGroupId = useMemo(() => {
    if (!activeCategory) return null;
    const isGroup = categoryGroups.some((g) => g.id === activeCategory);
    if (isGroup) return activeCategory;
    // Active is a sub-category — return its parent group
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.parentGroup ?? null;
  }, [activeCategory]);

  const subCategories = useMemo(() => {
    if (!activeGroupId) return [];
    return categories
      .filter((c) => c.parentGroup === activeGroupId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [activeGroupId]);

  return (
    <div className="sticky top-14 z-30 border-b border-white/[0.06] bg-dark/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Top-level: "Início" + food categories + drink groups */}
        <div
          className="hide-scrollbar flex gap-1.5 overflow-x-auto py-2.5"
          role="tablist"
          aria-label="Menu categories"
        >
          {/* "Início" — clicking returns to the curated landing view
              (Recomendado, Experiências, Partilhar) with all items below. */}
          <button
            role="tab"
            aria-selected={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold tracking-wide transition-colors duration-150',
              activeCategory === null
                ? 'bg-red/90 text-white shadow-sm shadow-red/20'
                : 'text-white/55 hover:text-white/85 active:text-white'
            )}
          >
            <Home className="h-3.5 w-3.5" />
            {t('home')}
          </button>

          {topLevel.map((item) => {
            const isActive =
              activeCategory === item.id ||
              (item.isGroup && activeGroupId === item.id);
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(isActive ? null : item.id)}
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

        {/* Sub-categories: only visible when a drink group is selected */}
        {subCategories.length > 0 && (
          <div
            className="hide-scrollbar flex gap-1.5 overflow-x-auto border-t border-white/[0.04] pb-2.5 pt-2"
            role="tablist"
            aria-label="Sub-categories"
          >
            {subCategories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    // Clicking active sub-cat → back to group (all sub-cats merged)
                    setActiveCategory(isActive ? c.parentGroup ?? null : c.id)
                  }
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 text-[10.5px] font-medium tracking-wide transition-colors duration-150',
                    isActive
                      ? 'border-red/60 bg-red/15 text-red-light'
                      : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/85'
                  )}
                >
                  {lt(c.name, locale)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
