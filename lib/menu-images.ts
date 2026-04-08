/**
 * Selective image mapping for menu items.
 * Only items with a clearly matching photo get an image.
 * All others show a premium placeholder — no forced/wrong images.
 *
 * 11 items mapped → 11 unique image assignments (no excessive repeats).
 */

const itemImageMap: Record<string, string> = {
  'beef-croquettes':              '/menu/croqueta-gourmet.jpeg',
  'shrimp-flambe':                '/menu/grilled-prawns.jpeg',
  'short-ribs-12h':               '/menu/beef-ribs.jpeg',
  'latina-skewer':                '/menu/beef-skewer.jpeg',
  'kobe-tataki':                  '/menu/beef-chef-special.jpeg',
  'chuleton-rubia-gallega-gold':  '/menu/chuletao-maturado-espanha.jpeg',
  'tomahawk-wagyu-australia':     '/menu/tomahawk-steak.jpeg',
  'rib-eye-rubia-gallega-250g':   '/menu/ribeye-served.jpeg',
  'rib-eye-usa-250g':             '/menu/ribeye-grill.jpeg',
  'golden-potatoes-truffle':      '/menu/truffle-dish.jpeg',
  'tenderloin-tartare':           '/menu/fine-dining-plate.jpeg',
};

/**
 * Get the image for a menu item, or null if none is mapped.
 */
export function getMenuItemImage(itemId: string): string | null {
  return itemImageMap[itemId] ?? null;
}

/**
 * Check whether an item has a real photo assigned.
 */
export function hasMenuItemImage(itemId: string): boolean {
  return itemId in itemImageMap;
}
