'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { experienceCombos } from '@/data/recommendations';
import PriceDisplay from '@/components/shared/PriceDisplay';
import { t as lt } from '@/lib/localized';
import type { Locale } from '@/i18n';

export default function ExperienceSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');

  const combos = useMemo(() => {
    return experienceCombos.map((combo) => {
      const items = combo.itemIds
        .map((id) => menuItems.find((m) => m.id === id))
        .filter((m) => m !== undefined && m.available && m.price !== null);
      const totalCents = items.reduce((sum, m) => sum + (m!.price ?? 0), 0);
      return { ...combo, resolvedItems: items, totalCents };
    });
  }, []);

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent-yellow" />
        <div>
          <h2 className="font-serif text-lg font-bold text-white">{t('experiencesTitle')}</h2>
          <p className="text-[11px] text-white/35">{t('experiencesSubtitle')}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {combos.map((combo, i) => (
          <div
            key={combo.id}
            style={{ animationDelay: `${i * 80}ms` }}
            className="relative overflow-hidden rounded-2xl border border-accent-yellow/15 bg-gradient-to-br from-accent-yellow/[0.04] via-surface to-surface transition-all duration-300 animate-fade-in-up hover:-translate-y-0.5 hover:border-accent-yellow/35 hover:shadow-xl hover:shadow-accent-yellow/10"
          >
            {/* Badge */}
            <div className="absolute right-3 top-3 z-10">
              <span className="rounded-full bg-accent-yellow/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                {lt(combo.badge, locale)}
              </span>
            </div>

            {/* Header gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red via-accent-orange to-accent-yellow" />

            <div className="p-5">
              <h3 className="mb-1 font-serif text-xl font-bold text-white">
                {lt(combo.name, locale)}
              </h3>
              <p className="mb-4 text-[12px] leading-relaxed text-white/45">
                {lt(combo.description, locale)}
              </p>

              {/* Items list */}
              <div className="mb-4 space-y-1.5">
                {combo.resolvedItems.map((item) =>
                  item ? (
                    <div key={item.id} className="flex items-center justify-between text-[11px]">
                      <span className="text-white/60">{lt(item.name, locale)}</span>
                      <PriceDisplay cents={item.price} className="text-white/35" />
                    </div>
                  ) : null
                )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/30">Total</span>
                  <PriceDisplay cents={combo.totalCents} className="block text-lg font-bold text-red-light" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
