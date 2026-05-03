/**
 * Image mapping for menu items.
 * Items not in this map show an elegant placeholder.
 */

const itemImageMap: Record<string, string> = {
  // Kids
  'kids-spaghetti-bolognese':         '/menu/kids-spaghetti-bolognese.webp',
  'kids-cheeseburger':                '/menu/kids-cheeseburger.webp',

  // Carnes Maturadas
  'chuleton-rubia-gallega-gold':      '/menu/chuleton-rubia-gallega-gold.webp',
  'chuleton-wagyu':                   '/menu/chuleton-wagyu.webp',
  'tomahawk-wagyu-australia':         '/menu/tomahawk-wagyu-australia.webp',
  'tomahawk-australia-cognac-madeira':'/menu/tomahawk-steak.jpeg',
  't-bone':                           '/menu/t-bone.webp',
  'rib-eye-usa-250g':                 '/menu/rib-eye-usa-250g.jpeg',

  // Wagyu
  'wagyu-trio':                       '/menu/wagyu-trio.webp',
  'wagyu-rib-eye-japan-250g':         '/menu/wagyu-rib-eye-japan-250g.webp',

  // Marisco
  'tiger-prawn':                      '/menu/grilled-prawns.jpeg',
  'lobster':                          '/menu/lagosta.webp',
  'blue-lobster':                     '/menu/blue-lobster.webp',
  'grilled-tuna-steak':               '/menu/grilled-tuna-steak.webp',

  // Seleção Premium
  'picanha-250g':                     '/menu/picanha-250g-new.webp',
  'filet-mignon-200g':                '/menu/filet-mignon-200g.webp',
  'rib-eye-rubia-gallega-250g':       '/menu/rib-eye-rubia-gallega-250g.jpeg',
  'sirloin-australia-250g':           '/menu/sirloin-australia-250g.webp',
  'maminha-black-angus-250g':         '/menu/maminha-black-angus-250g.webp',
  'farm-chicken-supremes':            '/menu/farm-chicken-supremes.webp',
  'latina-skewer':                    '/menu/beef-skewer.jpeg',
  'short-ribs-12h':                   '/menu/short-ribs-12h.webp',

  // Outros Cortes
  'iberian-pork-plumas':              '/menu/iberian-pork-plumas.jpeg',

  // Vegetarianas / Veganas
  'truffled-mushroom-risotto':        '/menu/truffled-mushroom-risotto.webp',
  'tagliatelle-portobello-walnuts':   '/menu/tagliatelle-portobello-walnuts.webp',

  // Entradas (Starters)
  'cheese-gratin':                    '/menu/cheese-gratin.webp',
  'foie-gras-chef':                   '/menu/foie-gras-chef.jpeg',
  'pata-negra':                       '/menu/pata-negra.webp',
  'tenderloin-tartare':               '/menu/tenderloin-tartare.jpeg',
  'chef-caesar':                      '/menu/chef-caesar.webp',
  'shrimp-flambe':                    '/menu/shrimp-flambe.webp',
  'kobe-tataki':                      '/menu/kobe-tataki.webp',

  // Tábuas (falta só a Surf and Turf)
  'latina-premium-board':             '/menu/latina-premium-board.webp',
  'dry-aged-board':                   '/menu/dry-aged-board.webp',

  // Guarnições
  'golden-potatoes-truffle':          '/menu/truffle-raw.jpeg',
  'grilled-vegetables':               '/menu/grilled-vegetables.webp',
  'truffled-mashed-potato':           '/menu/truffled-mashed-potato.webp',
  'sweet-potato-garlic-oregano':      '/menu/sweet-potato-garlic-oregano.webp',
  'tomato-basil-duet':                '/menu/tomato-basil-duet.webp',

  // Golden Selection
  'golden-chateaubriand-500g':        '/menu/golden-chateaubriand-500g.webp',
  'golden-rib-eye-usa-500g':          '/menu/golden-usa-wagyu-rib-eye-500g.webp',
  'golden-rib-eye-500g':              '/menu/golden-rib-eye-500g.webp',
  'golden-japanese-wagyu-300g':       '/menu/golden-japanese-wagyu-300g.webp',
  'golden-t-bone-800g':               '/menu/golden-t-bone-800g.webp',
  'golden-iberian-chuleton-wagyu':    '/menu/golden-iberian-chuleton-wagyu.webp',
  'golden-australian-wagyu-tomahawk': '/menu/golden-australian-wagyu-tomahawk-new.webp',

  // Sugestão do Chef
  'chef-kobe-a5-bife-150g':           '/menu/chef-kobe-a5-bife-150g.webp',
  'chef-chuleton-wagyu-premium':      '/menu/chuleton-wagyu.webp',

  // Sobremesas
  'dessert-chocolate-fondant':        '/menu/dessert-chocolate-fondant.webp',
  'dessert-latina-split':             '/menu/dessert-latina-split.webp',
  'dessert-forest-cheesecake':        '/menu/dessert-forest-cheesecake.webp',
  'dessert-waffle-icecream-nutella':  '/menu/dessert-waffle-icecream-nutella.webp',
  'dessert-caramelized-banana':       '/menu/dessert-caramelized-banana.webp',
  'dessert-brownie':                  '/menu/dessert-brownie.webp',
  'dessert-churros':                  '/menu/dessert-churros.webp',
  'dessert-apple-crumble':            '/menu/dessert-apple-crumble.webp',
  'dessert-seasonal-fruit-board':     '/menu/dessert-seasonal-fruit-board.webp',

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
  // Foto bate o produtor mas o ano da garrafa (Colheita 2023) é
  // diferente do ano do menu (JPR 2022) — mesmo produtor Duorum.
  'wine-red-duorum-jpr-2022':         '/menu/wine-duorum-jpr.webp',
  'wine-red-oliveirinha-alves-sousa-bottle': '/menu/wine-oliveirinha-douro.webp',
  // Garrafa "Reserva" sem ano legível na foto; menu tem 2019.
  'wine-red-romanos-reserva-2019':    '/menu/wine-romanos-reserva.webp',
  // Garrafa mostra "2015" mas menu tem 2018 — mesmo produtor Valbom.
  'wine-red-valbom-2018':             '/menu/wine-valbom-douro.webp',
  // Vinhos tintos Portugal — mais 9 fotos da Cláudia
  'wine-red-dao-niepoort-2021':       '/menu/wine-dao-niepoort-2021.webp',
  'wine-red-monteirinhos-manel-chaves-2021': '/menu/wine-monteirinhos-manel-chaves-2021.webp',
  'wine-red-luis-pato-vinhas-velhas-2022': '/menu/wine-luis-pato-vinhas-velhas-2022.webp',
  'wine-red-palacio-bucaco-2015':     '/menu/wine-palacio-bucaco-2015.webp',
  'wine-red-cabeco-toiro-alicante-2018': '/menu/wine-cabeco-toiro-alicante-2018.webp',
  'wine-red-cartuxa-colheita-2020':   '/menu/wine-cartuxa-colheita-2020.webp',
  'wine-red-voltface-reserva-2022':   '/menu/wine-voltface-reserva-2022.webp',
  'wine-red-ravasqueira-romas-2021':  '/menu/wine-ravasqueira-romas-2021.webp',
  'wine-red-cem-reis-syrah-2022':     '/menu/wine-cem-reis-syrah-2022.webp',
  // +10 vinhos top-tier do Douro/Alentejo (Cláudia)
  'wine-red-peso-icone-2018':         '/menu/wine-peso-icone-2018.webp',
  // Caricatura: foto v2 (mais polida) substituiu a v1. Menu descreve
  // como Alentejo mas a garrafa diz Douro — mesmo produtor Paulo
  // Laureano. Flag pra confirmar a região do menu.
  'wine-red-paulo-laureano-caricatura-bottle': '/menu/wine-paulo-laureano-caricatura-v2.webp',
  // Foto da garrafa diz "Mil Réis Limited Edition DOURO 2019" — menu
  // descreve como Alentejo sem ano. Confirmar com Cláudia.
  'wine-red-mil-reis':                '/menu/wine-mil-reis.webp',
  'wine-red-batuta-niepoort-2022':    '/menu/wine-batuta-niepoort-2022.webp',
  'wine-red-redoma-niepoort-2021':    '/menu/wine-redoma-niepoort-2021.webp',
  'wine-red-valle-dona-maria-douro-2022': '/menu/wine-valle-dona-maria-2022.webp',
  'wine-red-vallado-tres-melros-2023': '/menu/wine-vallado-tres-melros-2023.webp',
  // Barca Velha — top icônico, 3 vintages
  'wine-red-barca-velha-2011':        '/menu/wine-barca-velha-2011.webp',
  'wine-red-barca-velha-1991':        '/menu/wine-barca-velha-1991.webp',
  'wine-red-barca-velha-1983':        '/menu/wine-barca-velha-1983.webp',
  // Tintos internacionais (+5)
  'wine-red-protos-crianza-2020':     '/menu/wine-protos-crianza-2020.webp',
  'wine-red-protos-reserva-2019':     '/menu/wine-protos-reserva-2019.webp',
  'wine-red-vega-sicilia-unico-2014': '/menu/wine-vega-sicilia-unico-2014.webp',
  'wine-red-senechaux-chateauneuf-2015': '/menu/wine-senechaux-chateauneuf-2015.webp',
  'wine-red-brunello-montalcino-2016': '/menu/wine-brunello-montalcino-2016.webp',
  'wine-red-georges-latour-beaulieu-2008': '/menu/wine-georges-latour-beaulieu-2008.webp',
  // Espumantes / Champagnes (+4)
  'wine-sparkling-freixenet-cordon-negro': '/menu/wine-freixenet-cordon-negro.webp',
  'wine-sparkling-gh-mumm-brut':      '/menu/wine-gh-mumm-brut.webp',
  'wine-sparkling-moet-brut-imperial': '/menu/wine-moet-brut-imperial.webp',
  'wine-sparkling-dom-perignon-2013': '/menu/wine-dom-perignon-2013.webp',
  // Brancos (+7) — Vinho Verde, Beira Interior, Alentejo
  'wine-white-angelmo-mendes-muros-antigos': '/menu/wine-muros-antigos.webp',
  'wine-white-so-alvarinho':          '/menu/wine-so-alvarinho.webp',
  'wine-white-soalheiro-granit':      '/menu/wine-soalheiro-granit.webp',
  'wine-white-soalheiro-alvarinho':   '/menu/wine-soalheiro-alvarinho.webp',
  'wine-white-castelo-rodrigo':       '/menu/wine-castelo-rodrigo.webp',
  'wine-white-joaquim-madeira':       '/menu/wine-joaquim-madeira.webp',
  'wine-white-pera-manca-white':      '/menu/wine-pera-manca-white.webp',  // ⭐
  // Rosés (+2)
  'wine-rose-redoma-niepoort':        '/menu/wine-rose-redoma-niepoort.webp',
  'wine-rose-celeste-gaivosa':        '/menu/wine-rose-celeste-gaivosa.webp',
  // Madeira (+1)
  'wine-madeira-verdelho-5y-barbeito-2013': '/menu/wine-madeira-verdelho-5y-barbeito.webp',
  // +2 Madeiras
  'wine-madeira-verdelho-10y-barbeito': '/menu/wine-madeira-verdelho-10y-barbeito.webp',
  'wine-madeira-dry-sercial-1930':    '/menu/wine-madeira-dry-sercial-1930.webp',  // ⭐ raríssimo
  // Tintos Douro (+2 com match limpo de tinto/ano)
  'wine-red-duas-quintas-reserva-2022': '/menu/wine-duas-quintas-reserva-2022.webp',
  'wine-red-espinho-grande-reserva-2019': '/menu/wine-espinho-grande-reserva-2019.webp',
  // (Carm, Carm Reserva, Cottage Wines, Planalto, Vale Dona Maria
  //  Vinhas do Sabor: as fotos enviadas eram garrafas escuras que não
  //  parecem brancos — desmapeadas. Aguardando fotos das versões
  //  brancas reais.)
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
 * Per-item override of CSS object-position. Use percentage Y values:
 *   '50% 50%'  = center (default)
 *   '50% 100%' = bottom (mostra mais da parte de baixo da foto)
 *   '50% 75%'  = entre center e bottom — mostra mais da carne sem
 *                cortar tudo de cima
 */
const itemImagePositionMap: Record<string, string> = {
  'golden-chateaubriand-500g':         'bottom',
  'rib-eye-usa-250g':                  '50% 75%',
  'golden-rib-eye-usa-500g':           '50% 75%',
  'golden-australian-wagyu-tomahawk':  '50% 75%',
  // Foie Gras: a foto é portrait com o foie gras na parte SUPERIOR
  // do quadro (mesa de madeira ocupa o topo, prato no meio, base
  // vazia em baixo). Posição baixa cortava a comida — biased pro
  // topo (30%) pra mostrar foie + flor + grãos.
  'foie-gras-chef':                    '50% 30%',
};

/**
 * Per-item zoom override (CSS transform: scale).
 * Default is 1.0. Use values >1 to zoom INTO the photo (útil quando o
 * prato fica pequeno demais no card original — combine com object-position
 * pra controlar onde o zoom é centrado).
 *
 *   1.0  = default
 *   1.15 = 15% mais perto
 *   1.3  = 30% mais perto (boa pra fotos com muito espaço vazio)
 */
const itemImageScaleMap: Record<string, number> = {
  // Spaghetti Bolognese: o prato fica muito pequeno no quadro original
  // com muita mesa em volta — zoom forte pra preencher o card.
  'kids-spaghetti-bolognese':          1.5,
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
 * Get the per-item zoom factor (CSS transform: scale). Defaults to 1.
 */
export function getMenuItemImageScale(itemId: string): number {
  return itemImageScaleMap[itemId] ?? 1;
}

/**
 * Check whether an item has a real photo assigned.
 */
export function hasMenuItemImage(itemId: string): boolean {
  return itemId in itemImageMap;
}
