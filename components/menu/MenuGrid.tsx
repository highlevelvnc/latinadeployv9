'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { categories, categoryGroups, menuItems } from '@/data/menu';
import { hasMenuItemImage } from '@/lib/menu-images';
import MenuItem from './MenuItem';
import { t as lt } from '@/lib/localized';
import type { MenuItem as MenuItemType } from '@/types/menu';
import type { Locale } from '@/i18n';

interface Props {
  onSelectItem: (item: MenuItemType) => void;
}

export default function MenuGrid({ onSelectItem }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const { activeCategory, searchQuery, activeTags } = useAppStore();
  const unavailableItems = useMenuStore((s) => s.unavailableItems);

  const filtered = useMemo(() => {
    let items = menuItems.filter((i) => i.available);

    if (activeCategory) {
      // activeCategory may be either a sub-category id OR a group id (e.g.
      // 'alcoholic-drinks'). If it's a group, include items from any of its
      // sub-categories.
      const isGroup = categoryGroups.some((g) => g.id === activeCategory);
      if (isGroup) {
        const subIds = new Set(
          categories.filter((c) => c.parentGroup === activeCategory).map((c) => c.id)
        );
        items = items.filter((i) => subIds.has(i.categoryId));
      } else {
        items = items.filter((i) => i.categoryId === activeCategory);
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

    if (activeTags.length > 0) {
      items = items.filter((i) => activeTags.some((tag) => i.tags.includes(tag)));
    }

    // Sort: items with photo first, then unavailable to the end
    items.sort((a, b) => {
      const aUnavail = unavailableItems.includes(a.id) ? 1 : 0;
      const bUnavail = unavailableItems.includes(b.id) ? 1 : 0;
      if (aUnavail !== bUnavail) return aUnavail - bUnavail;

      const aHasImg = hasMenuItemImage(a.id) ? 0 : 1;
      const bHasImg = hasMenuItemImage(b.id) ? 0 : 1;
      return aHasImg - bHasImg;
    });

    return items;
  }, [activeCategory, searchQuery, activeTags, locale, unavailableItems]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="mb-3 text-4xl opacity-20">🍽️</span>
        <p className="text-sm text-white/30">{t('emptyState')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((item) => (
        <MenuItem key={item.id} item={item} onSelect={onSelectItem} />
      ))}
    </div>
  );
}
