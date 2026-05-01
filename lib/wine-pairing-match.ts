/**
 * Fuzzy-matching for wine pairing chips → real menu items.
 *
 * Wine pairings are stored as free-form strings ("Tomahawk Wagyu, Picanha
 * 250g, Filet Mignon"). To turn each chip into a clickable thumbnail we
 * need to map the chip text back to a `MenuItem` from `data/menu`.
 *
 * The matching is intentionally lenient:
 *   - lowercased, accent-stripped, non-alphanumeric removed
 *   - "12h" treated same as "12 horas"
 *   - "250g" same as "250 gr"
 *   - tokens are matched as a Jaccard-ish overlap (≥ 0.55)
 *
 * Items already photographed bubble up: when two items match equally well
 * we prefer the one with a real photo for nicer thumbnails.
 */

import { menuItems } from '@/data/menu';
import { hasMenuItemImage } from '@/lib/menu-images';
import type { MenuItem } from '@/types/menu';
import type { Locale } from '@/i18n';
import { t as lt } from '@/lib/localized';

const stripAccents = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '');

const normalize = (s: string): string =>
  stripAccents(s.toLowerCase())
    .replace(/\b(\d+)\s*(?:h(?:oras?)?)\b/g, '$1h')   // 12 horas, 12h → 12h
    .replace(/\b(\d+)\s*(?:gr|grs?|grama)\b/g, '$1g') // 250 gr, 250 grama → 250g
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (s: string): string[] =>
  normalize(s).split(' ').filter((t) => t.length > 1);

/**
 * Score the similarity between a query and a candidate name.
 *  - 1.0 if normalized strings are equal
 *  - Otherwise: Jaccard token overlap, but require at least one rare token
 *    (>= 4 chars) to match so "Filet Mignon 200g" doesn't lazily match
 *    "Filet" alone via the digit "200".
 */
function score(query: string, candidate: string): number {
  const qNorm = normalize(query);
  const cNorm = normalize(candidate);
  if (qNorm === cNorm) return 1;
  if (cNorm.includes(qNorm) || qNorm.includes(cNorm)) {
    // Substring match (e.g. "Picanha" ⊂ "Picanha 250g") is strong but not perfect
    return 0.85;
  }
  const qTokens = new Set(tokenize(query));
  const cTokens = new Set(tokenize(candidate));
  if (qTokens.size === 0 || cTokens.size === 0) return 0;

  let overlap = 0;
  let strongOverlap = false;
  for (const t of qTokens) {
    if (cTokens.has(t)) {
      overlap++;
      if (t.length >= 4) strongOverlap = true;
    }
  }
  if (!strongOverlap) return 0;
  // Jaccard
  const union = new Set([...qTokens, ...cTokens]).size;
  return overlap / union;
}

/**
 * Try to map a free-text pairing chip to a real MenuItem.
 * Returns null if no candidate scores above the threshold.
 */
export function findMenuItemByPairingText(
  pairingText: string,
  locale: Locale,
): MenuItem | null {
  const THRESHOLD = 0.55;
  let best: { item: MenuItem; s: number } | null = null;

  for (const item of menuItems) {
    if (!item.available) continue;
    const itemName = lt(item.name, locale);
    const s = score(pairingText, itemName);
    if (s < THRESHOLD) continue;
    if (
      !best ||
      s > best.s ||
      // Tie-break: prefer photographed items
      (s === best.s && hasMenuItemImage(item.id) && !hasMenuItemImage(best.item.id))
    ) {
      best = { item, s };
    }
  }

  return best?.item ?? null;
}
