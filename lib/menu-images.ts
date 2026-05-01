/**
 * Image mapping for menu items.
 * Items not in this map show an elegant placeholder.
 */

const itemImageMap: Record<string, string> = {
  // Kids
  'kids-spaghetti-bolognese':         '/menu/kids-spaghetti-bolognese.png',
  'kids-cheeseburger':                '/menu/kids-cheeseburger.webp',

  // Carnes Maturadas
  // (chuleton-rubia-gallega-gold: foto removida — a versão Gold ainda
  //  não tem foto real; a anterior era do Rubia Gallega normal)
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
  'lobster':                          '/menu/lagosta.webp',

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
  // O que estava mapeado como "japanese wagyu 300g.webp" era na verdade
  // a foto do USA Wagyu Rib Eye 500g — corrigido. Da versão japonesa
  // ainda não há foto real.
  'golden-rib-eye-usa-500g':          '/menu/golden-usa-wagyu-rib-eye-500g.webp',
  // (golden-rib-eye-500g: foto removida, aguardando melhor)
  // (golden-japanese-wagyu-300g: sem foto real ainda)
  // (golden-t-bone-800g: foto removida — a anterior era de rib eye,
  //  não T-bone; aguardando foto real)
  'golden-australian-wagyu-tomahawk': '/menu/golden-australian-wagyu-tomahawk-new.png',

  // Sugestão do Chef
  // (chef-kobe-a5-bife-150g: foto removida, aguardando melhor)
  'chef-chuleton-wagyu-premium':      '/menu/chuleton-wagyu.png',

  // Sobremesas
  'dessert-chocolate-fondant':        '/menu/dessert-chocolate-fondant.webp',
  'dessert-latina-split':             '/menu/dessert-latina-split.png',
  'dessert-forest-cheesecake':        '/menu/dessert-forest-cheesecake.png',
  'dessert-waffle-icecream-nutella':  '/menu/dessert-waffle-icecream-nutella.png',

  // Cocktails
  'cocktail-whisky-sour':             '/menu/whiskysour.jpeg',
  'cocktail-espresso-martini':        '/menu/cocktail-espresso-martini.webp',
  'cocktail-irish-coffee':            '/menu/cocktail-irish-coffee.webp',
  'cocktail-passion-margarita':       '/menu/cocktail-passion-margarita.webp',
  // Best-guess matches (não tinha foto exata, encaixados pelo visual):
  'cocktail-rin':                     '/menu/cocktail-rin.webp',          // morango em coupe → Rin (Espumante + Morango)
  'cocktail-caipiroska':              '/menu/blackraspberry.jpeg',         // gin de frutos vermelhos → Morangoska/Caipiroska multi-fruta
  'cocktail-americano':               '/menu/martini.jpeg',                // Martini Fiero rosa-laranja → Americano (Campari + Vermouth)

  // Vinhos Tintos – Portugal
  'wine-red-charme-niepoort-2022':    '/menu/wine-charme-niepoort.webp',
  'wine-red-abandonado-gaivosa-2022': '/menu/wine-abandonado-gaivosa.webp',
  'wine-red-duas-quintas-rp-2022':    '/menu/wine-duas-quintas-rp.webp',
  'wine-red-poeira-55-barricas-2020': '/menu/wine-poeira-55-barricas.webp',
  'wine-red-vale-d-maria-2021':       '/menu/wine-vale-d-maria.webp',
  'wine-red-apocalipse-romanos':      '/menu/wine-apocalipse-romanos.webp',
  'wine-red-humanitas-syrah':         '/menu/wine-humanitas-syrah.webp',
  'wine-red-tete-a-tete':             '/menu/wine-tete-a-tete.webp',
  // (wine-red-marques-borba-2021: foto atualizada para 2024 abaixo)
  'wine-red-vale-meao-2022':          '/menu/wine-vale-meao.webp',
  'wine-red-chryseia-ps-2022':        '/menu/wine-chryseia.webp',
  'wine-red-crasto-2022':             '/menu/wine-crasto.webp',
  'wine-red-pintas-character-2022':   '/menu/wine-pintas-character.webp',
  'wine-red-doga-2013':               '/menu/wine-doga-2013.webp',
  'wine-red-alves-sousa-memorias-30': '/menu/wine-alves-sousa-memorias-30.webp',
  'wine-red-cartuxa-vinea-2019':      '/menu/wine-cartuxa-vinea-2019.webp',
  'wine-red-cartuxa-evora-2022':      '/menu/wine-cartuxa-evora-2022.webp',
  'wine-red-bioma-niepoort-2018':     '/menu/wine-bioma-niepoort.webp',
  'wine-red-pombal-vesuvio-2022':     '/menu/wine-pombal-vesuvio.webp',
  'wine-red-grande-reserva-alentejo-2018': '/menu/wine-grande-reserva-alentejo-2018.webp',
  'wine-red-monte-xisto-2020':        '/menu/wine-monte-xisto-2020.webp',
  'wine-red-monte-meao-vinha-novos-2022': '/menu/wine-monte-meao-vinha-novos-2022.webp',
  'wine-red-pera-manca-2018':         '/menu/wine-pera-manca.webp',
  'wine-red-castas-portuguesas-laureano': '/menu/wine-castas-portuguesas-laureano.webp',
  'wine-red-quinta-alcube-2016':      '/menu/wine-quinta-alcube-2016.webp',
  'wine-red-infinitae-premium':       '/menu/wine-infinitae-premium.webp',
  'wine-red-pacheca-douro-2019':      '/menu/wine-pacheca-douro-2019.webp',
  'wine-red-marques-borba-2021':      '/menu/wine-marques-borba-2024.webp',
  'wine-red-dona-maria-2020':         '/menu/wine-dona-maria.webp',
  'wine-red-mouchao-2016':            '/menu/wine-mouchao.webp',
  'wine-red-vadio-baga-2021':         '/menu/wine-vadio-2021.webp',
  'wine-red-vadio-2015':              '/menu/wine-vadio-2015.webp',
  'wine-red-cabeco-toiro-reserva-2022': '/menu/wine-cabeco-toiro-reserva-2022.webp',
  // Vinhos Tintos do Mundo (mais)
  'wine-red-alion-vega-sicilia-2019': '/menu/wine-alion-vega-sicilia.webp',
  'wine-red-pintia-ribera-duero-2019':'/menu/wine-pintia.webp',
  'wine-red-valbuena-vega-sicilia-2019': '/menu/wine-valbuena-vega-sicilia.webp',
  'wine-red-chateau-pavie-2010':      '/menu/wine-chateau-pavie-2010.webp',
  'wine-red-chateau-margaux-2012':    '/menu/wine-chateau-margaux-2012.webp',
  'wine-red-sassicaia-2019':          '/menu/wine-sassicaia-2019.webp',
  'wine-red-tignanello-toscana-2020': '/menu/wine-tignanello-2022.webp',
  'wine-red-kressmann-monopole-2019': '/menu/wine-kressmann-monopole-2019.webp',
  'wine-red-pian-delle-vigne-2020':   '/menu/wine-pian-delle-vigne-2020.webp',
  'wine-red-contugo-bolgheri-2022':   '/menu/wine-contugo-bolgheri-2022.webp',

  // Vinhos Tintos do Mundo
  'wine-red-chapoutier-cotes-rhone-2022': '/menu/wine-chapoutier.webp',
  'wine-red-cigare-volant-2021':      '/menu/wine-bonny-doon-cigare.webp',
  'wine-red-loratoire-des-papes-2023':'/menu/wine-loratoire-des-papes-2023.webp',
  'wine-red-beausejour-hostens-2019': '/menu/wine-beausejour-hostens-2019.webp',
  'wine-red-vignobles-quet-dupontet-2019': '/menu/wine-vignobles-quet-dupontet-2019.webp',

  // Vinhos Tintos do Mundo
  'wine-red-directors-cut-coppola-2018': '/menu/wine-coppola-directors-cut.webp',
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
  'golden-rib-eye-usa-500g':           '50% 75%',
  'golden-australian-wagyu-tomahawk':  '50% 75%',
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
