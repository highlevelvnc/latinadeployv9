'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useTableStore } from '@/stores/useTableStore';
import { useMenuStore } from '@/stores/useMenuStore';
import CategoryNav from '@/components/menu/CategoryNav';
import SearchBar from '@/components/menu/SearchBar';
import DietaryFilter from '@/components/menu/DietaryFilter';
import HeroVideo from '@/components/menu/HeroVideo';
import FeaturedSection from '@/components/menu/FeaturedSection';
import ShareSection from '@/components/menu/ShareSection';
import ExperienceSection from '@/components/menu/ExperienceSection';
import MenuGrid from '@/components/menu/MenuGrid';
import MenuItemDetail from '@/components/menu/MenuItemDetail';
import TableBadge from '@/components/shared/TableBadge';
import LanguageSelector from '@/components/LanguageSelector';
import type { MenuItem } from '@/types/menu';

/** Inner component — needs to be inside <Suspense> because it uses useSearchParams */
function MenuPageInner() {
  const locale = useLocale();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { activeCategory, searchQuery, activeTags } = useAppStore();
  const { setTable } = useTableStore();
  const searchParams = useSearchParams();

  // Hydrate stores (skipHydration=true requires manual call)
  useEffect(() => {
    useTableStore.persist.rehydrate();
    useMenuStore.persist.rehydrate();
  }, []);

  // Read ?table= from URL and persist in store
  useEffect(() => {
    const tableParam = searchParams.get('table');
    if (tableParam) {
      setTable(tableParam, true); // fromQR = true
    }
  }, [searchParams, setTable]);

  // Show curated sections only when viewing "All" with no search/filter active
  const showCuratedSections = !activeCategory && !searchQuery.trim() && activeTags.length === 0;

  return (
    <>
      {/* Mini header — integrates with the site */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-dark/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.webp"
              alt="Latina Grill"
              className="h-7 w-7 rounded-full object-contain"
            />
            <span className="hidden font-serif text-sm font-bold text-white sm:block">
              Latina Grill
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <TableBadge />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <CategoryNav />

      <div className="container mx-auto px-4 py-5">
        <div className="mb-4 space-y-3">
          <SearchBar />
          <DietaryFilter />
        </div>

        {showCuratedSections && (
          <>
            <HeroVideo />
            <FeaturedSection onSelectItem={setSelectedItem} />
            <ExperienceSection />
            <ShareSection onSelectItem={setSelectedItem} />
          </>
        )}

        <MenuGrid onSelectItem={setSelectedItem} />
      </div>

      <MenuItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuPageInner />
    </Suspense>
  );
}
