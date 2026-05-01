'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Award } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { featuredItemIds } from '@/data/recommendations';
import MenuImage from '@/components/menu/MenuImage';
import { t as lt } from '@/lib/localized';
import type { MenuItem } from '@/types/menu';
import type { Locale } from '@/i18n';

interface Props {
  onSelectItem: (item: MenuItem) => void;
}

export default function FeaturedSection({ onSelectItem }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu');
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  // Pause the marquee animation when the section scrolls out of view —
  // saves CPU/battery on devices where the user is deep in the menu and
  // the carousel keeps animating uselessly above. Uses IntersectionObserver
  // (passive, no scroll handler).
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '50px' } // small buffer — start animating just before visible
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const featured = featuredItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => m !== undefined && m.available);

  if (featured.length === 0) return null;

  // Duplicated track for seamless loop. animation translates -50% so when the
  // first set fully scrolls past, the second copy is exactly where the first
  // one started, making the seam invisible.
  const track = [...featured, ...featured];

  return (
    <section ref={sectionRef} className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-accent-yellow" />
        <div>
          <h2 className="font-serif text-lg font-bold text-white">{t('featured')}</h2>
          <p className="text-[11px] text-white/35">{t('featuredSubtitle')}</p>
        </div>
      </div>

      {/* Marquee container with edge fades. -mx-4 + px-4 makes it edge-to-edge
          on mobile while keeping items aligned with the page padding. */}
      <div className="relative -mx-4 overflow-hidden">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-dark to-transparent" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-dark to-transparent" />

        <div
          className="flex w-max gap-3 px-4 animate-marquee"
          // Pause animation when offscreen — saves CPU on devices.
          style={{ animationPlayState: inView ? 'running' : 'paused' }}
          aria-label={t('featured')}
        >
          {track.map((item, i) => {
            const isDuplicate = i >= featured.length;
            return (
            <button
              key={`${item.id}-${i}`}
              type="button"
              onClick={() => onSelectItem(item)}
              // Duplicates exist only for the seamless loop animation —
              // they must not appear in tab order or screen reader output.
              aria-hidden={isDuplicate}
              tabIndex={isDuplicate ? -1 : 0}
              aria-label={lt(item.name, locale)}
              className="group relative flex w-[200px] shrink-0 cursor-pointer flex-col rounded-2xl border border-white/[0.08] bg-surface p-3 text-left transition-all duration-200 hover:border-red/25 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark active:scale-[0.98]"
            >
              {/* Image */}
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl bg-dark-lighter">
                <MenuImage
                  itemId={item.id}
                  categoryId={item.categoryId}
                  alt={lt(item.name, locale)}
                  priority={i < 3}
                  sizes="200px"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badge */}
                {item.tags.includes('bestseller') && (
                  <span className="absolute left-2 top-2 z-20 rounded-full bg-accent-orange/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm shadow-black/30">
                    {t('tags.bestseller')}
                  </span>
                )}
                {item.tags.includes('signature') && !item.tags.includes('bestseller') && (
                  <span className="absolute left-2 top-2 z-20 rounded-full bg-accent-yellow/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black shadow-sm shadow-black/30">
                    {t('tags.signature')}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-white/90">
                {lt(item.name, locale)}
              </h3>
            </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
