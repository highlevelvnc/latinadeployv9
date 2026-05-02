/**
 * Featured wine list shown on the landing page (MenuHighlights component).
 *
 * Strategy:
 *   1. House wine (Mythologyc — Furya) is hardcoded here as HOUSE_WINE.
 *      It does not exist in the public menu and stays exclusive to the home.
 *   2. The remaining featured wines are pulled from `data/menu.ts` and
 *      enriched with editorial content from `lib/wine-info.ts` (history,
 *      pairing, country flag, grapes). Only wines that have an entry in
 *      wine-info are included — that keeps the curation tight and ensures
 *      every wine on the home has rich editorial copy.
 *
 * To add a new wine to the home:
 *   - Add editorial content in `lib/wine-info.ts` for the wine's id.
 *     It will be picked up automatically.
 *
 * This module READS from data/menu.ts and lib/wine-info.ts. It does NOT
 * mutate them — the menu system remains the single source of truth for
 * the actual wine catalogue.
 */

import { menuItems } from '@/data/menu';
import { wineInfo } from '@/lib/wine-info';

// ─────────────────────────────────────────────────────────────────────────────
// Types — exported for MenuHighlights and any other consumer.
// Locale here is intentionally narrower than the site's full locale set
// (the editorial copy on the home is currently authored in pt/en/fr only).
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = 'pt' | 'en' | 'fr';
export type WineCategory = 'tinto' | 'branco' | 'espumante' | 'rose';
export type LS = Record<Locale, string>;

export type Wine = {
  id: string;
  name: string;
  year: number;
  region: string;
  country: string;
  category: WineCategory;
  notes: LS;
  pairing: LS;
  image?: string;
  isHouseLabel?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// House wine — hardcoded. Not part of the public menu.
// ─────────────────────────────────────────────────────────────────────────────

export const HOUSE_WINE: Wine = {
  id: 'mythologyc-furya',
  name: 'Mythologyc — Furya',
  year: 2021,
  region: 'Douro',
  country: 'PT',
  category: 'tinto',
  isHouseLabel: true,
  notes: {
    pt: 'O vinho da casa do Latina Grill. Touriga Nacional e Tinta Roriz do coração do Douro. Fruta negra madura, violeta, especiaria e mineralidade xistosa. Corpo generoso com final longo e elegante — nascido para a grelha.',
    en: 'The Latina Grill house wine. Touriga Nacional and Tinta Roriz from the heart of the Douro. Ripe dark fruit, violet, spice and schist minerality. Generous body with a long, elegant finish — born for the grill.',
    fr: "Le vin maison du Latina Grill. Touriga Nacional et Tinta Roriz du cœur du Douro. Fruits noirs mûrs, violette, épices et minéralité schisteuse. Corps généreux, finale longue et élégante — né pour le grill.",
  },
  pairing: {
    pt: 'Vinho da casa — harmoniza com toda a grelha: tomahawk, costela, picanha e cortes premium.',
    en: 'House wine — pairs with the full grill: tomahawk, rib, picanha and premium cuts.',
    fr: "Vin maison — s'accorde avec tout le grill: tomahawk, côte, picanha et coupes premium.",
  },
  image: '/mythologyc.webp',
};

// ─────────────────────────────────────────────────────────────────────────────
// Mapping helpers
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_BY_MENU_ID: Record<string, WineCategory> = {
  'wines-red-portugal': 'tinto',
  'wines-red-france': 'tinto',
  'wines-red-italy': 'tinto',
  'wines-red-spain': 'tinto',
  'wines-red-usa': 'tinto',
  'wines-white': 'branco',
  'wines-sparkling': 'espumante',
  'wines-rose': 'rose',
  // Note: 'wines-fortified' (Port, Madeira) is intentionally excluded — the
  //       home component only renders 4 categories. Add an entry here to opt
  //       in once the UI supports a "Fortificado" tab.
};

const PLACEHOLDER_IMAGE = '/menu/placeholder-wine.jpg';

/**
 * Image overrides for featured wines.
 *
 * Many wines in `data/menu.ts` reference the placeholder image even though
 * a real bottle photo exists in `/public/menu/`. Rather than editing the
 * menu data (single source of truth for the /menu page), we override here
 * for the home component only.
 *
 * Add an entry once a real photo is dropped into /public/menu/.
 * Conservative match: only entries where the filename clearly matches the
 * specific wine + vintage. Ambiguous matches (e.g. a generic "wine-crasto"
 * for "Crasto Vinhas Velhas 2022") are intentionally left empty so we don't
 * show a misleading bottle.
 */
const IMAGE_OVERRIDES: Record<string, string> = {
  'wine-red-pera-manca-2018': '/menu/wine-pera-manca.webp',
  'wine-red-mouchao-2016': '/menu/wine-mouchao.webp',
  'wine-red-doga-2013': '/menu/wine-doga-2013.webp',
  'wine-red-charme-niepoort-2022': '/menu/wine-charme-niepoort.webp',
  'wine-red-vale-meao-2022': '/menu/wine-vale-meao.webp',
  'wine-red-pintas-character-2022': '/menu/wine-pintas-character.webp',
  'wine-red-pintia-ribera-duero-2019': '/menu/wine-pintia.webp',
  'wine-red-vega-sicilia-unico-2014': '/menu/wine-vega-sicilia-unico-2014.webp',
  'wine-red-brunello-montalcino-2016': '/menu/wine-brunello-montalcino-2016.webp',
  'wine-red-valbuena-vega-sicilia-2019': '/menu/wine-valbuena-vega-sicilia.webp',
  'wine-red-alion-vega-sicilia-2019': '/menu/wine-alion-vega-sicilia.webp',
  'wine-red-chateau-margaux-2012': '/menu/wine-chateau-margaux-2012.webp',
  'wine-red-chateau-pavie-2010': '/menu/wine-chateau-pavie-2010.webp',
  'wine-red-sassicaia-2019': '/menu/wine-sassicaia-2019.webp',
  'wine-red-cigare-volant-2021': '/menu/wine-bonny-doon-cigare.webp',
};

// Pulls a 4-digit year (1900–2099) from the wine name, e.g.
// "Pêra Manca 2018" → 2018, "Vega Sicilia Único Ribera del Duero 2014" → 2014.
const extractYear = (name: string): number => {
  const m = name.match(/(?:19|20)\d{2}/);
  return m ? parseInt(m[0], 10) : 0;
};

// Strips a trailing year (and anything after it) so the displayed name reads
// cleanly as "Pêra Manca" instead of "Pêra Manca 2018" — the year is shown in
// its own column on the home wine list.
const stripYear = (name: string): string => {
  const stripped = name.replace(/\s+(?:19|20)\d{2}\b.*$/, '').trim();
  return stripped.length > 0 ? stripped : name;
};

// Picks the best image for a wine: explicit non-placeholder image from the
// menu, then a curated override (see IMAGE_OVERRIDES), else undefined so the
// component falls back to the wine card without a photo.
const resolveImage = (id: string, menuImage: string | undefined): string | undefined => {
  if (menuImage && menuImage !== PLACEHOLDER_IMAGE) return menuImage;
  return IMAGE_OVERRIDES[id];
};

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maps the curated set of menu wines (those with editorial copy in
 * wine-info.ts) into the Wine shape consumed by MenuHighlights.
 *
 * Excludes the house wine — combine with HOUSE_WINE manually if you want
 * the full home list, or use getCuratedWineList().
 */
export function getFeaturedWines(): Wine[] {
  const wines: Wine[] = [];

  for (const item of menuItems) {
    const info = wineInfo[item.id];
    if (!info) continue;

    const category = CATEGORY_BY_MENU_ID[item.categoryId];
    if (!category) continue;

    const fullName = item.name.pt;
    const year = extractYear(fullName);
    const name = stripYear(fullName);

    wines.push({
      id: item.id,
      name,
      year,
      region: item.description.pt,
      country: info.country,
      category,
      notes: {
        pt: info.history.pt,
        en: info.history.en,
        fr: info.history.fr,
      },
      pairing: {
        pt: info.pairing.pt,
        en: info.pairing.en,
        fr: info.pairing.fr,
      },
      image: resolveImage(item.id, item.image),
    });
  }

  return wines;
}

/**
 * Full home list: house wine first, then the 19-or-so editorial wines from
 * the menu. This is what MenuHighlights renders.
 */
export function getCuratedWineList(): Wine[] {
  return [HOUSE_WINE, ...getFeaturedWines()];
}
