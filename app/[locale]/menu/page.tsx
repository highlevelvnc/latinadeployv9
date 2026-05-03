'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Salad } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useTableStore } from '@/stores/useTableStore';
import { useMenuStore } from '@/stores/useMenuStore';
import CategoryNav from '@/components/menu/CategoryNav';
import SearchBar from '@/components/menu/SearchBar';
import FeaturedSection from '@/components/menu/FeaturedSection';
import ShareSection from '@/components/menu/ShareSection';
import MenuGrid from '@/components/menu/MenuGrid';
import MenuItemDetail from '@/components/menu/MenuItemDetail';
import ScrollToTop from '@/components/menu/ScrollToTop';
import TableBadge from '@/components/shared/TableBadge';
import LanguageSelector from '@/components/LanguageSelector';
import type { MenuItem } from '@/types/menu';

/** Inner component — needs to be inside <Suspense> because it uses useSearchParams */
function MenuPageInner() {
  const locale = useLocale();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { activeCategory, searchQuery } = useAppStore();
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
  const showCuratedSections = !activeCategory && !searchQuery.trim();

  // Skip-link target ID — keyboard users can press Tab once to jump
  // directly to the menu content, bypassing the header/nav.
  const mainId = 'menu-main';

  // Localized "Skip to menu" copy (no need for full i18n key — single string).
  const skipLabel = {
    pt: 'Saltar para o menu',
    en: 'Skip to menu',
    fr: 'Aller au menu',
    ru: 'Перейти к меню',
    zh: '跳至菜单',
  }[locale] ?? 'Skip to menu';

  return (
    <>
      {/* Skip link — invisible until focused via Tab. Crucial for keyboard
          and screen reader users to bypass the sticky header + category nav. */}
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-red focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:shadow-red/40 focus:ring-2 focus:ring-white"
      >
        {skipLabel}
      </a>

      {/* Mini header — integrates with the site */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-dark/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link
            href={`/${locale}`}
            aria-label="Latina Grill — voltar para a página inicial"
            className="flex items-center gap-2 rounded-lg text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.webp"
              alt=""
              aria-hidden="true"
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

      <main id={mainId} className="ambient-gold-top container relative mx-auto px-4 py-5">
        {/* Children sit above the ::before glow */}
        <div className="relative z-10 mb-4">
          <SearchBar />
        </div>

        <div className="relative z-10">
          {showCuratedSections ? (
            <>
              <FeaturedSection onSelectItem={setSelectedItem} />
              <ShareSection onSelectItem={setSelectedItem} />

              {/* Beneath ShareSection, na home view: só a categoria
                  Entradas. O grid completo é alcançado via tabs do topo. */}
              <section className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <Salad className="h-5 w-5 text-accent-green" />
                  <div>
                    <h2 className="font-serif text-lg font-bold text-white">
                      {locale === 'pt' && 'Entradas'}
                      {locale === 'en' && 'Starters'}
                      {locale === 'fr' && 'Entrées'}
                      {locale === 'ru' && 'Закуски'}
                      {locale === 'zh' && '前菜'}
                    </h2>
                  </div>
                </div>
                <MenuGrid onSelectItem={setSelectedItem} forceCategoryId="starters" />
              </section>
            </>
          ) : (
            <MenuGrid onSelectItem={setSelectedItem} />
          )}
        </div>
      </main>

      <MenuItemDetail
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectItem={setSelectedItem}
      />
      <ScrollToTop />
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
