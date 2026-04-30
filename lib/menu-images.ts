/**
 * Image mapping for menu items.
 * Items not in this map show an elegant placeholder.
 */

const itemImageMap: Record<string, string> = {
  // Kids
  'kids-spaghetti-bolognese':         '/menu/kids-spaghetti-bolognese.png',
  'kids-cheeseburger':                '/menu/kids-cheeseburger.webp',

  // Carnes Maturadas
  'chuleton-rubia-gallega-gold':      '/menu/chuleton-rubia-gallega-gold.jpeg',
  'chuleton-wagyu':                   '/menu/chuleton-wagyu.png',
  'tomahawk-wagyu-australia':         '/menu/tomahawk-wagyu-australia.webp',
  'tomahawk-australia-cognac-madeira':'/menu/tomahawk-steak.jpeg',
  't-bone':                           '/menu/t-bone.webp',
  'rib-eye-usa-250g':                 '/menu/rib-eye-usa-250g.jpeg',

  // Wagyu
  'wagyu-trio':                       '/menu/fine-dining-plate.jpeg',

  // Marisco
  'tiger-prawn':                      '/menu/grilled-prawns.jpeg',

  // Seleção Premium
  'picanha-250g':                     '/menu/picanha-250g-new.png',
  'filet-mignon-200g':                '/menu/filet-mignon-200g.webp',
  'rib-eye-rubia-gallega-250g':       '/menu/rib-eye-rubia-gallega-250g.jpeg',
  'sirloin-australia-250g':           '/menu/sirloin-australia-250g.webp',
  'latina-skewer':                    '/menu/beef-skewer.jpeg',
  'short-ribs-12h':                   '/menu/short-ribs-12h.webp',

  // Outros Cortes
  'iberian-pork-plumas':              '/menu/iberian-pork-plumas.jpeg',

  // Entradas (Starters)
  'foie-gras-chef':                   '/menu/foie-gras-chef.jpeg',
  'pata-negra':                       '/menu/pata-negra.png',
  'tenderloin-tartare':               '/menu/tenderloin-tartare.jpeg',

  // Tábuas
  // (latina-premium-board: foto removida, aguardando melhor)

  // Guarnições
  'golden-potatoes-truffle':          '/menu/truffle-raw.jpeg',
  'grilled-vegetables':               '/menu/grilled-vegetables.webp',

  // Golden Selection
  'golden-chateaubriand-500g':        '/menu/golden-chateaubriand-500g.png',
  'golden-rib-eye-usa-500g':          '/menu/ribeye-grill-2.jpeg',
  // (golden-rib-eye-500g: foto removida, aguardando melhor)
  'golden-japanese-wagyu-300g':       '/menu/golden-japanese-wagyu-300g.webp',
  'golden-t-bone-800g':               '/menu/ribeye-grill.jpeg',
  'golden-australian-wagyu-tomahawk': '/menu/golden-australian-wagyu-tomahawk-new.png',

  // Sugestão do Chef
  // (chef-kobe-a5-bife-150g: foto removida, aguardando melhor)
  'chef-chuleton-wagyu-premium':      '/menu/chuleton-wagyu.png',

  // Sobremesas
  'dessert-chocolate-fondant':        '/menu/dessert-chocolate-fondant.webp',
  'dessert-latina-split':             '/menu/dessert-latina-split.webp',
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
