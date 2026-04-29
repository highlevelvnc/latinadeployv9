'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { shareItemIds } from '@/data/recommendations';
import PriceDisplay from '@/components/shared/PriceDisplay';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import type { MenuItem } from '@/types/menu';
import type { Locale } from '@/i18n';

interface Props {
  onSelectItem: (item: MenuItem) => void;
}

export default function ShareSection({ onSelectItem }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');

  const shareItems = shareItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => m !== undefined && m.available);

  if (shareItems.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-accent-blue" />
        <div>
          <h2 className="font-serif text-lg font-bold text-white">{t('shareTitle')}</h2>
          <p className="text-[11px] text-white/35">{t('shareSubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {shareItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectItem(item)}
            style={{ animationDelay: `${i * 60}ms` }}
            className="group relative flex cursor-pointer gap-4 rounded-2xl border border-accent-blue/10 bg-gradient-to-r from-accent-blue/[0.03] to-surface p-3 text-left transition-all duration-200 animate-fade-in-up hover:border-accent-blue/25 hover:from-accent-blue/[0.06] active:scale-[0.99]"
          >
            {/* Image */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-dark-lighter">
              <MenuImage
                itemId={item.id}
                categoryId={item.categoryId}
                alt={lt(item.name, locale)}
                sizes="80px"
              />
              {item.tags.includes('board') && (
                <span className="absolute left-1 top-1 rounded-full bg-accent-blue/80 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                  {t('tags.board')}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div>
                <h3 className="line-clamp-1 text-[13px] font-semibold leading-snug text-white/90">
                  {lt(item.name, locale)}
                </h3>
                {lt(item.description, locale) && (
                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-white/35">
                    {lt(item.description, locale)}
                  </p>
                )}
              </div>
              <PriceDisplay
                cents={item.price}
                priceUnit={item.priceUnit}
                className="text-sm font-bold text-white/80"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
