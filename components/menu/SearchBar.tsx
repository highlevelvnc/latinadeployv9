'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';

export default function SearchBar() {
  const t = useTranslations('menu');
  const { searchQuery, setSearchQuery } = useAppStore();
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl border bg-surface transition-all duration-200 ${
        focused
          ? 'border-red/50 bg-surface-elevated shadow-lg shadow-red/10'
          : 'border-white/[0.08] hover:border-white/15'
      }`}
    >
      <Search
        className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
          focused ? 'text-red-light' : searchQuery ? 'text-white/60' : 'text-white/30'
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
        className="w-full bg-transparent py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-white/25"
      />
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
