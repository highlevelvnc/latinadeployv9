import type { Locale } from '@/i18n';
import type { LocalizedString } from '@/types/menu';

/**
 * Get localized text with fallback.
 * Returns the value for the requested locale; if missing (e.g. `ru` on menu
 * content that only has pt/en/fr/zh), falls back to pt → en → first available.
 */
export function t(strings: LocalizedString, locale: Locale): string {
  const val = (strings as Record<string, string | undefined>)[locale];
  if (val) return val;
  if (strings.pt) return strings.pt;
  if (strings.en) return strings.en;
  const first = Object.values(strings).find((v) => typeof v === 'string' && v);
  return first || '';
}
