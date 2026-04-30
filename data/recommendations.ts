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

// ── Recommended sauces per meat item (fallback: top 4 sauces) ──
export const sauceRecommendations: Record<string, string[]> = {
  // Wagyu items → lighter sauces
  'wagyu-trio': ['truffled-ponzu', 'chimichurri'],
  'wagyu-rib-eye-japan-250g': ['truffled-ponzu', 'three-peppers'],
  'chuleton-wagyu': ['truffled-ponzu', 'mustard-madeira', 'chimichurri'],
  'golden-japanese-wagyu-300g': ['truffled-ponzu', 'three-peppers'],
  'golden-iberian-chuleton-wagyu': ['truffled-ponzu', 'chimichurri'],
  'golden-australian-wagyu-tomahawk': ['truffled-ponzu', 'mustard-madeira'],
  'kobe-tataki': ['truffled-ponzu'],
  // Premium steaks → robust sauces
  'filet-mignon-200g': ['three-peppers', 'mustard-madeira', 'truffled-ponzu'],
  'picanha-250g': ['chimichurri', 'piri-piri-latina', 'three-peppers'],
  'rib-eye-rubia-gallega-250g': ['three-peppers', 'mustard-madeira'],
  'sirloin-australia-250g': ['chimichurri', 'three-peppers'],
  'latina-skewer': ['chimichurri', 'piri-piri-latina'],
  'short-ribs-12h': ['chimichurri', 'mustard-madeira'],
  'rib-eye-usa-250g': ['three-peppers', 'mustard-madeira', 'chimichurri'],
  't-bone': ['three-peppers', 'chimichurri'],
  // Dry aged
  'chuleton-rubia-gallega-gold': ['mustard-madeira', 'three-peppers', 'chimichurri'],
  'tomahawk-wagyu-australia': ['truffled-ponzu', 'chimichurri'],
  'tomahawk-australia-cognac-madeira': ['mustard-madeira', 'three-peppers'],
  // Other cuts
  'iberian-pork-plumas': ['mustard-madeira', 'piri-piri-latina'],
  'farm-chicken-supremes': ['piri-piri-latina', 'truffled-aioli'],
  // Seafood
  'blue-lobster': ['truffled-aioli', 'truffled-ponzu'],
  'lobster': ['truffled-aioli', 'truffled-ponzu'],
  'tiger-prawn': ['piri-piri-latina', 'truffled-aioli'],
  'grilled-tuna-steak': ['truffled-ponzu', 'chimichurri'],
  // Gold selection
  'golden-chateaubriand-500g': ['three-peppers', 'mustard-madeira', 'truffled-ponzu'],
  'golden-rib-eye-usa-500g': ['three-peppers', 'mustard-madeira'],
  'golden-rib-eye-500g': ['three-peppers', 'chimichurri'],
  'golden-t-bone-800g': ['three-peppers', 'chimichurri', 'mustard-madeira'],
};

// Default sauces when no specific mapping exists
export const defaultSauces = ['chimichurri', 'three-peppers', 'truffled-ponzu', 'piri-piri-latina'];

// ── Recommended sides (premium first) ──
export const sideRecommendations: Record<string, string[]> = {
  // Wagyu → refined sides
  'wagyu-trio': ['truffled-mashed-potato', 'grilled-vegetables', 'rocket-parmesan-salad'],
  'wagyu-rib-eye-japan-250g': ['truffled-mashed-potato', 'golden-potatoes-truffle', 'grilled-vegetables'],
  'kobe-tataki': ['rocket-parmesan-salad', 'grilled-vegetables'],
  // Steaks → hearty sides
  'filet-mignon-200g': ['golden-potatoes-truffle', 'truffled-mashed-potato', 'grilled-vegetables'],
  'picanha-250g': ['fries-truffle-aioli', 'bean-rice-chorizo', 'farofa-latina'],
  'latina-skewer': ['farofa-latina', 'bean-rice-chorizo', 'fries-truffle-aioli'],
  'short-ribs-12h': ['truffled-mashed-potato', 'farofa-latina', 'bean-rice-chorizo'],
  // Seafood → lighter sides
  'blue-lobster': ['golden-potatoes-truffle', 'grilled-vegetables', 'rocket-parmesan-salad'],
  'lobster': ['golden-potatoes-truffle', 'grilled-vegetables', 'rocket-parmesan-salad'],
  'grilled-tuna-steak': ['grilled-vegetables', 'rocket-parmesan-salad', 'river-rice'],
};

// Default sides (prioritize premium/popular)
export const defaultSides = [
  'golden-potatoes-truffle',
  'fries-truffle-aioli',
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
  'tender-board',
  'dry-aged-board',
  'surf-turf-board',
  'cheese-board',
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
