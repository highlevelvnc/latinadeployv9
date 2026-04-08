/**
 * Localized string with support for the site's 5 locales.
 * `ru` is optional — menu content is seeded in pt/en/fr/zh; Russian visitors
 * get a fallback via the `t()` helper in `lib/localized.ts`.
 */
export type LocalizedString = {
  pt: string;
  en: string;
  fr: string;
  zh: string;
  ru?: string;
};

export type DietaryTag =
  | 'spicy'
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'chefs-pick'
  | 'popular'
  | 'new'
  | 'bestseller'
  | 'signature'
  | 'premium'
  | 'wagyu'
  | 'gold'
  | 'board';

export interface MenuItem {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number | null;
  priceUnit?: string;
  image: string;
  tags: DietaryTag[];
  available: boolean;
  preparationTime?: number;
}

export interface MenuCategory {
  id: string;
  name: LocalizedString;
  icon: string;
  sortOrder: number;
}
