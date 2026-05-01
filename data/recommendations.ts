/**
 * Recommendation mappings for upselling.
 * Maps menu item IDs → suggested accompaniments, sauces, and related items.
 */

// ── Meat category IDs that should get sauce recommendations ──
export const meatCategories = [
  'dry-aged-meats',
  'wagyu',
  'premium-selection',
  'other-cuts',
  'gold-selection',
];

// ── Categories that should get side dish recommendations ──
export const mainCourseCategories = [
  ...meatCategories,
  'grilled-seafood',
  'vegetarian',
];

// ── Recommended sauces per meat item ──
// Sauces foram removidos do menu (decisão da Cláudia). Mantemos o helper
// para não quebrar imports, mas retorna sempre [].
export const sauceRecommendations: Record<string, string[]> = {};

// Default sauces when no specific mapping exists
export const defaultSauces: string[] = [];

// ── Recommended sides (premium first) ──
export const sideRecommendations: Record<string, string[]> = {
  // Wagyu → refined sides
  'wagyu-trio': ['truffled-mashed-potato', 'grilled-vegetables'],
  'wagyu-rib-eye-japan-250g': ['truffled-mashed-potato', 'golden-potatoes-truffle', 'grilled-vegetables'],
  'kobe-tataki': ['grilled-vegetables'],
  // Steaks → hearty sides
  'filet-mignon-200g': ['golden-potatoes-truffle', 'truffled-mashed-potato', 'grilled-vegetables'],
  'picanha-250g': ['golden-potatoes-truffle', 'grilled-vegetables'],
  'latina-skewer': ['golden-potatoes-truffle', 'grilled-vegetables'],
  'short-ribs-12h': ['truffled-mashed-potato'],
  // Seafood → lighter sides
  'blue-lobster': ['golden-potatoes-truffle', 'grilled-vegetables'],
  'lobster': ['golden-potatoes-truffle', 'grilled-vegetables'],
  'grilled-tuna-steak': ['grilled-vegetables'],
};

// Default sides (prioritize premium/popular)
export const defaultSides = [
  'golden-potatoes-truffle',
  'truffled-mashed-potato',
  'grilled-vegetables',
];

// ── Featured / "Mais Pedidos" items ──
export const featuredItemIds = [
  'wagyu-trio',               // Wagyu Trio — signature, bestseller
  'short-ribs-12h',           // Short Ribs 12h — signature, bestseller
  'picanha-250g',             // Picanha — bestseller
  'filet-mignon-200g',        // Filet Mignon — bestseller
  'tomahawk-wagyu-australia',  // Tomahawk Wagyu — premium, bestseller
  'foie-gras-chef',           // Foie Gras — premium, signature
  'shrimp-flambe',            // Camarão Flambé — bestseller
  'golden-potatoes-truffle',  // Batata Dourada — bestseller side
];

// ── "Ideal para Partilhar" items ──
export const shareItemIds = [
  'latina-premium-board',
  'dry-aged-board',
  'surf-turf-board',
  'pata-negra',
];

// ── Helper: get sauces for an item ──
export function getSaucesForItem(itemId: string): string[] {
  return sauceRecommendations[itemId] ?? defaultSauces;
}

// ── Helper: get sides for an item ──
export function getSidesForItem(itemId: string): string[] {
  return sideRecommendations[itemId] ?? defaultSides;
}
