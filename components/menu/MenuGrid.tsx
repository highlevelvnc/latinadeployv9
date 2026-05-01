'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { categories, categoryGroups, menuItems } from '@/data/menu';
import { hasMenuItemImage } from '@/lib/menu-images';
import { getWinePopularityScore } from '@/lib/wine-info';
import MenuItem from './MenuItem';
import { t as lt } from '@/lib/localized';
import type { MenuItem as MenuItemType } from '@/types/menu';
import type { Locale } from '@/i18n';

interface Props {
  onSelectItem: (item: MenuItemType) => void;
  /** Force a specific category id (used by the home view to show only "Entradas"
   *  beneath ShareSection). Overrides the global activeCategory store value. */
  forceCategoryId?: string;
}

export default function MenuGrid({ onSelectItem, forceCategoryId }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const { activeCategory, searchQuery } = useAppStore();
  const unavailableItems = useMenuStore((s) => s.unavailableItems);

  const filtered = useMemo(() => {
    let items = menuItems.filter((i) => i.available);

    const effectiveCategory = forceCategoryId ?? activeCategory;
    if (effectiveCategory) {
      // activeCategory may be either a sub-category id OR a group id (e.g.
      // 'alcoholic-drinks'). If it's a group, include items from any of its
      // sub-categories.
      const isGroup = categoryGroups.some((g) => g.id === effectiveCategory);
      if (isGroup) {
        const subIds = new Set(
          categories.filter((c) => c.parentGroup === effectiveCategory).map((c) => c.id)
        );
        items = items.filter((i) => subIds.has(i.categoryId));
      } else {
        items = items.filter((i) => i.categoryId === effectiveCategory);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          lt(i.name, locale).toLowerCase().includes(q) ||
          lt(i.description, locale).toLowerCase().includes(q)
      );
    }

    // Sort priority:
    //   1. Available items before unavailable
    //   2. Items with photo before placeholders
    //   3. (wines only) Popularity score — see lib/wine-info.ts.
    //      We DO NOT sort by price — the client explicitly asked not to
    //      show the most expensive bottles at the top.
    items.sort((a, b) => {
      const aUnavail = unavailableItems.includes(a.id) ? 1 : 0;
      const bUnavail = unavailableItems.includes(b.id) ? 1 : 0;
      if (aUnavail !== bUnavail) return aUnavail - bUnavail;

      const aHasImg = hasMenuItemImage(a.id) ? 0 : 1;
      const bHasImg = hasMenuItemImage(b.id) ? 0 : 1;
      if (aHasImg !== bHasImg) return aHasImg - bHasImg;

      // Within the same available+photo tier, wines bubble up the popular
      // ones (curated + signature/premium + popular regions).
      const aIsWine = a.categoryId.startsWith('wines-');
      const bIsWine = b.categoryId.startsWith('wines-');
      if (aIsWine && bIsWine) {
        const diff = getWinePopularityScore(b) - getWinePopularityScore(a);
        if (diff !== 0) return diff;
      }
      return 0;
    });

    return items;
  }, [activeCategory, searchQuery, locale, unavailableItems, forceCategoryId]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center animate-fade-in-up">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-surface text-3xl opacity-40">
          🍽
        </div>
        <p className="text-sm font-medium text-white/55">{t('emptyState')}</p>
        <p className="mt-1 text-[12px] text-white/30">
          {t('search')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((item, i) => (
        <MenuItem
          key={item.id}
          item={item}
          onSelect={onSelectItem}
          style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
        />
      ))}
    </div>
  );
}
