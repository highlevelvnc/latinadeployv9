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
  // (tomahawk-wagyu-australia: foto removida — aguardando foto real)
  'tomahawk-australia-cognac-madeira':'/menu/tomahawk-steak.jpeg',
  't-bone':                           '/menu/t-bone.webp',
  'rib-eye-usa-250g':                 '/menu/rib-eye-usa-250g.jpeg',

  // Wagyu
  // (wagyu-trio: foto removida — aguardando foto real)
  'wagyu-rib-eye-japan-250g':         '/menu/wagyu-rib-eye-japan-250g.png',

  // Marisco
  'tiger-prawn':                      '/menu/grilled-prawns.jpeg',

  // Seleção Premium
  'picanha-250g':                     '/menu/picanha-250g-new.png',
  // (filet-mignon-200g: foto removida — aguardando foto real)
  'rib-eye-rubia-gallega-250g':       '/menu/rib-eye-rubia-gallega-250g.jpeg',
  // (sirloin-australia-250g: foto removida — aguardando foto real)
  'latina-skewer':                    '/menu/beef-skewer.jpeg',
  'short-ribs-12h':                   '/menu/short-ribs-12h.webp',

  // Outros Cortes
  'iberian-pork-plumas':              '/menu/iberian-pork-plumas.jpeg',

  // Entradas (Starters)
  'cheese-gratin':                    '/menu/cheese-gratin.png',
  'foie-gras-chef':                   '/menu/foie-gras-chef.jpeg',
  'pata-negra':                       '/menu/pata-negra.png',
  'tenderloin-tartare':               '/menu/tenderloin-tartare.jpeg',

  // Tábuas
  // (latina-premium-board: foto removida, aguardando melhor)

  // Guarnições
  'golden-potatoes-truffle':          '/menu/truffle-raw.jpeg',
  'grilled-vegetables':               '/menu/grilled-vegetables.webp',
  'truffled-mashed-potato':           '/menu/truffled-mashed-potato.png',

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
  'dessert-latina-split':             '/menu/dessert-latina-split.png',
  'dessert-forest-cheesecake':        '/menu/dessert-forest-cheesecake.png',
  'dessert-waffle-icecream-nutella':  '/menu/dessert-waffle-icecream-nutella.png',

  // Vinhos Tintos – Portugal
  'wine-red-charme-niepoort-2022':    '/menu/wine-charme-niepoort.png',
  'wine-red-abandonado-gaivosa-2022': '/menu/wine-abandonado-gaivosa.png',
  'wine-red-duas-quintas-rp-2022':    '/menu/wine-duas-quintas-rp.png',
  'wine-red-poeira-55-barricas-2020': '/menu/wine-poeira-55-barricas.png',
  'wine-red-vale-d-maria-2021':       '/menu/wine-vale-d-maria.png',
  'wine-red-apocalipse-romanos':      '/menu/wine-apocalipse-romanos.png',
  'wine-red-humanitas-syrah':         '/menu/wine-humanitas-syrah.png',
  'wine-red-tete-a-tete':             '/menu/wine-tete-a-tete.png',
  // (wine-red-marques-borba-2021: foto atualizada para 2024 abaixo)
  'wine-red-vale-meao-2022':          '/menu/wine-vale-meao.png',
  'wine-red-chryseia-ps-2022':        '/menu/wine-chryseia.png',
  'wine-red-crasto-2022':             '/menu/wine-crasto.png',
  'wine-red-pintas-character-2022':   '/menu/wine-pintas-character.png',
  'wine-red-doga-2013':               '/menu/wine-doga-2013.png',
  'wine-red-alves-sousa-memorias-30': '/menu/wine-alves-sousa-memorias-30.png',
  'wine-red-cartuxa-vinea-2019':      '/menu/wine-cartuxa-vinea-2019.png',
  'wine-red-cartuxa-evora-2022':      '/menu/wine-cartuxa-evora-2022.png',
  'wine-red-bioma-niepoort-2018':     '/menu/wine-bioma-niepoort.png',
  'wine-red-pombal-vesuvio-2022':     '/menu/wine-pombal-vesuvio.png',
  'wine-red-grande-reserva-alentejo-2018': '/menu/wine-grande-reserva-alentejo-2018.png',
  'wine-red-monte-xisto-2020':        '/menu/wine-monte-xisto-2020.png',
  'wine-red-monte-meao-vinha-novos-2022': '/menu/wine-monte-meao-vinha-novos-2022.png',
  'wine-red-pera-manca-2018':         '/menu/wine-pera-manca.png',
  'wine-red-castas-portuguesas-laureano': '/menu/wine-castas-portuguesas-laureano.png',
  'wine-red-quinta-alcube-2016':      '/menu/wine-quinta-alcube-2016.png',
  'wine-red-infinitae-premium':       '/menu/wine-infinitae-premium.png',
  'wine-red-pacheca-douro-2019':      '/menu/wine-pacheca-douro-2019.png',
  'wine-red-marques-borba-2021':      '/menu/wine-marques-borba-2024.png',
  'wine-red-dona-maria-2020':         '/menu/wine-dona-maria.png',
  'wine-red-mouchao-2016':            '/menu/wine-mouchao.png',
  'wine-red-vadio-baga-2021':         '/menu/wine-vadio-2021.png',
  'wine-red-vadio-2015':              '/menu/wine-vadio-2015.png',
  'wine-red-cabeco-toiro-reserva-2022': '/menu/wine-cabeco-toiro-reserva-2022.png',
  // Vinhos Tintos do Mundo (mais)
  'wine-red-alion-vega-sicilia-2019': '/menu/wine-alion-vega-sicilia.png',
  'wine-red-pintia-ribera-duero-2019':'/menu/wine-pintia.png',
  'wine-red-valbuena-vega-sicilia-2019': '/menu/wine-valbuena-vega-sicilia.png',
  'wine-red-chateau-pavie-2010':      '/menu/wine-chateau-pavie-2010.png',
  'wine-red-chateau-margaux-2012':    '/menu/wine-chateau-margaux-2012.png',
  'wine-red-sassicaia-2019':          '/menu/wine-sassicaia-2019.png',
  'wine-red-tignanello-toscana-2020': '/menu/wine-tignanello-2022.png',
  'wine-red-kressmann-monopole-2019': '/menu/wine-kressmann-monopole-2019.png',
  'wine-red-pian-delle-vigne-2020':   '/menu/wine-pian-delle-vigne-2020.png',
  'wine-red-contugo-bolgheri-2022':   '/menu/wine-contugo-bolgheri-2022.png',

  // Vinhos Tintos do Mundo
  'wine-red-chapoutier-cotes-rhone-2022': '/menu/wine-chapoutier.png',
  'wine-red-cigare-volant-2021':      '/menu/wine-bonny-doon-cigare.png',
  'wine-red-loratoire-des-papes-2023':'/menu/wine-loratoire-des-papes-2023.png',
  'wine-red-beausejour-hostens-2019': '/menu/wine-beausejour-hostens-2019.png',
  'wine-red-vignobles-quet-dupontet-2019': '/menu/wine-vignobles-quet-dupontet-2019.png',

  // Vinhos Tintos do Mundo
  'wine-red-directors-cut-coppola-2018': '/menu/wine-coppola-directors-cut.png',
};

/**
 * Per-item override of object-position for the image crop.
 * Default is 'center'. Use 'top' / 'bottom' / etc when the meat
 * sits off-center in the source photo and gets cut off.
 */
// Per-item override of CSS object-position. Use percentage Y values:
//   '50% 50%' = center (default)
//   '50% 100%' = bottom (mostra mais da parte de baixo da foto)
//   '50% 75%'  = entre center e bottom — mostra mais da carne sem
//                cortar tudo de cima
const itemImagePositionMap: Record<string, string> = {
  'golden-chateaubriand-500g':         'bottom',
  'rib-eye-usa-250g':                  '50% 75%',
  'golden-t-bone-800g':                '50% 75%',
  'golden-rib-eye-usa-500g':           '50% 75%',
  'golden-australian-wagyu-tomahawk':  '50% 75%',
  'chuleton-rubia-gallega-gold':       '50% 80%',
  // Foie Gras: alimento na parte de baixo da foto, mas 'bottom' (100%)
  // subia demais. '50% 75%' é o meio termo.
  'foie-gras-chef':                    '50% 75%',
};

/**
 * Get the image for a menu item, or null if none is mapped.
 */
export function getMenuItemImage(itemId: string): string | null {
  return itemImageMap[itemId] ?? null;
}

/**
 * Get the CSS object-position for an item's image. Defaults to 'center'.
 */
export function getMenuItemImagePosition(itemId: string): string {
  return itemImagePositionMap[itemId] ?? 'center';
}

/**
 * Check whether an item has a real photo assigned.
 */
export function hasMenuItemImage(itemId: string): boolean {
  return itemId in itemImageMap;
}
