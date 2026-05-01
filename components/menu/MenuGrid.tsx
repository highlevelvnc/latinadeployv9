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
    // Quick-tap suggestion chips — dropping the user back to a populated
    // category instead of leaving them at a dead end.
    const suggestions: { id: string; label: Record<string, string> }[] = [
      { id: 'starters', label: { pt: 'Entradas', en: 'Starters', fr: 'Entrées', ru: 'Закуски', zh: '前菜' } },
      { id: 'gold-selection', label: { pt: 'Golden', en: 'Golden', fr: 'Golden', ru: 'Golden', zh: '黄金甄选' } },
      { id: 'alcoholic-drinks', label: { pt: 'Vinhos', en: 'Wines', fr: 'Vins', ru: 'Вина', zh: '葡萄酒' } },
      { id: 'desserts', label: { pt: 'Sobremesas', en: 'Desserts', fr: 'Desserts', ru: 'Десерты', zh: '甜点' } },
    ];
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center animate-fade-in-up">
        {/* Pulsing icon — feels alive, not empty. */}
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-surface text-3xl opacity-50"
          style={{ animation: 'gentlePulse 2.4s ease-in-out infinite' }}
        >
          🍽
        </div>
        <p className="mb-1 text-sm font-medium text-white/65">{t('emptyState')}</p>
        <p className="mb-6 text-[12px] text-white/35">
          {locale === 'pt' && 'Tente uma das sugestões abaixo'}
          {locale === 'en' && 'Try one of the suggestions below'}
          {locale === 'fr' && 'Essayez une des suggestions ci-dessous'}
          {locale === 'ru' && 'Попробуйте одно из предложений ниже'}
          {locale === 'zh' && '试试以下建议'}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => useAppStore.getState().setActiveCategory(s.id)}
              className="rounded-full border border-white/10 bg-surface px-4 py-1.5 text-[11.5px] font-semibold text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-red/35 hover:bg-red/10 hover:text-white active:scale-95"
              style={{ animation: `fadeInUp 0.4s ${0.1 + idx * 0.06}s backwards ease-out` }}
            >
              {s.label[locale] ?? s.label.pt}
            </button>
          ))}
        </div>
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
          // Tighter stagger (20ms × 12 items = 240ms total) — gives a
          // crisp wave without dragging on long lists.
          style={{ animationDelay: `${Math.min(i * 20, 240)}ms` }}
        />
      ))}
    </div>
  );
}
