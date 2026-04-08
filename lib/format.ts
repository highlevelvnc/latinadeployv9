import type { Locale } from '@/i18n';

const localeMap: Record<Locale, string> = {
  pt: 'pt-PT',
  en: 'en-GB',
  fr: 'fr-FR',
  zh: 'zh-CN',
  ru: 'ru-RU',
};

export function formatPrice(cents: number, locale: Locale = 'pt'): string {
  if (!Number.isFinite(cents)) return '€0,00';
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatTime(timestamp: number, locale: Locale = 'pt'): string {
  if (!Number.isFinite(timestamp)) return '--:--';
  return new Intl.DateTimeFormat(localeMap[locale], {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: number, locale: Locale = 'pt'): string {
  if (!Number.isFinite(timestamp)) return '--';
  return new Intl.DateTimeFormat(localeMap[locale], {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}
