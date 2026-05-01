'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';
import { menuItems } from '@/data/menu';
import { t as lt } from '@/lib/localized';
import type { Locale } from '@/i18n';

export default function SearchBar() {
  const t = useTranslations('menu');
  const locale = useLocale() as Locale;
  const { searchQuery, setSearchQuery } = useAppStore();
  const [focused, setFocused] = useState(false);

  // Live result count — gives instant feedback to the user that the
  // search is actually filtering. Only computed when there's a query
  // (cheap enough on a ~220-item list, no need for debounce).
  const resultCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return menuItems.filter(
      (i) =>
        i.available &&
        (lt(i.name, locale).toLowerCase().includes(q) ||
          lt(i.description, locale).toLowerCase().includes(q))
    ).length;
  }, [searchQuery, locale]);

  const resultLabel = (n: number): string => {
    const map: Record<string, [string, string]> = {
      pt: ['1 resultado', `${n} resultados`],
      en: ['1 result', `${n} results`],
      fr: ['1 résultat', `${n} résultats`],
      ru: ['1 результат', `${n} результатов`],
      zh: ['1 个结果', `${n} 个结果`],
    };
    const [singular, plural] = map[locale] ?? map.pt;
    return n === 1 ? singular : plural;
  };

  return (
    <div
      className={`group relative rounded-2xl border bg-surface transition-all duration-200 ${
        focused
          ? 'border-red/50 bg-surface-elevated shadow-lg shadow-red/10'
          : 'border-white/[0.08] hover:border-white/15'
      }`}
    >
      {/* Magnifier — gets a subtle scale pulse when the input is focused
          to draw the eye toward the search affordance. */}
      <Search
        className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300 ${
          focused
            ? 'text-red-light scale-110'
            : searchQuery
              ? 'text-white/60'
              : 'text-white/30'
        }`}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={t('search')}
        aria-label={t('search')}
        className="w-full bg-transparent py-3 pl-11 pr-24 text-sm text-white outline-none placeholder:text-white/25"
      />

      {/* Live result count chip — appears with the search, gives instant
          "your search is working" feedback. Sits just left of the clear X. */}
      {resultCount !== null && (
        <span
          aria-live="polite"
          className={`absolute right-12 top-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
            resultCount === 0
              ? 'bg-white/[0.04] text-white/40'
              : 'bg-red/15 text-red-light'
          }`}
        >
          {resultLabel(resultCount)}
        </span>
      )}

      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/35 transition-all duration-150 hover:bg-white/10 hover:text-white/85 active:scale-90"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
