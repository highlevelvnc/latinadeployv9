'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/stores/useAppStore';

export default function SearchBar() {
  const t = useTranslations('menu');
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('search')}
        className="w-full rounded-2xl border border-white/[0.08] bg-surface py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-red/40 focus:bg-surface-elevated"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
