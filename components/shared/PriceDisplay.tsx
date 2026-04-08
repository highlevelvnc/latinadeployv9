'use client';

import { useLocale } from 'next-intl';
import { formatPrice } from '@/lib/format';
import type { Locale } from '@/i18n';

interface Props {
  cents: number | null;
  priceUnit?: string;
  className?: string;
}

export default function PriceDisplay({ cents, priceUnit, className = '' }: Props) {
  const locale = useLocale() as Locale;

  if (cents === null) {
    const includedLabel: Record<Locale, string> = {
      pt: 'Incluído',
      en: 'Included',
      fr: 'Inclus',
      zh: '已含',
      ru: 'Включено',
    };
    return <span className={className}>{includedLabel[locale]}</span>;
  }

  const formatted = formatPrice(cents, locale);
  if (priceUnit) {
    return <span className={className}>{formatted} <span className="text-[0.75em] opacity-60">{priceUnit}</span></span>;
  }

  return <span className={className}>{formatted}</span>;
}
