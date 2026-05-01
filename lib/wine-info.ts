/**
 * Editorial information for wine items — history, story, pairing suggestions.
 *
 * Structure:
 * - `history`: short story about the wine / producer / region
 * - `pairing`: dish suggestions from the menu that match
 * - `grapes`: grape varieties (informational)
 * - `country`: ISO-like flag emoji used in the wine detail card
 *
 * If a wine isn't in this map, the WineDetail component falls back to a
 * generic message derived from `description` (region) + tags.
 */

export interface WineInfo {
  history: { pt: string; en: string; fr: string; ru?: string; zh: string };
  pairing: { pt: string; en: string; fr: string; ru?: string; zh: string };
  grapes?: string;
  country: string; // 🇵🇹 🇫🇷 🇮🇹 🇪🇸 🇺🇸
}

export const wineInfo: Record<string, WineInfo> = {
  // ─── Portugal ──────────────────────────────────────────────────────
  'wine-red-pera-manca-2018': {
    history: {
      pt: 'Um dos vinhos mais icónicos de Portugal. Produzido pela Fundação Eugénio de Almeida em Évora desde 1990, em quantidades muito limitadas e apenas em anos excepcionais. Repousa anos em barricas de carvalho francês.',
      en: 'One of the most iconic wines of Portugal. Produced by Fundação Eugénio de Almeida in Évora since 1990, in very limited quantities and only in exceptional years. Aged for years in French oak barrels.',
      fr: "L'un des vins les plus iconiques du Portugal. Produit par la Fundação Eugénio de Almeida à Évora depuis 1990, en quantités très limitées et uniquement les années exceptionnelles.",
      zh: '葡萄牙最具代表性的葡萄酒之一。自1990年起由Fundação Eugénio de Almeida在埃武拉酿造，仅在卓越年份限量生产，于法国橡木桶中长时间陈酿。',
    },
    pairing: {
      pt: 'Tomahawk Wagyu Austrália, Chuletón Wagyu Ibérico, Costela no Bafo 12 horas. Vinho de ocasião — peça em momentos memoráveis.',
      en: 'Australian Wagyu Tomahawk, Iberian Wagyu Chuletón, 12h Slow-Steamed Short Ribs. A wine for special occasions.',
      fr: 'Tomahawk Wagyu Australien, Chuletón Wagyu Ibérique, Côtes Courtes 12h. Un vin pour les grandes occasions.',
      zh: '澳洲和牛战斧、伊比利亚和牛带骨牛排、12小时慢蒸牛肋。值得珍藏的特殊时刻之选。',
    },
    grapes: 'Trincadeira, Aragonez (Tempranillo)',
    country: '🇵🇹',
  },

  'wine-red-mouchao-2016': {
    history: {
      pt: 'Herdade do Mouchão é um dos mais históricos produtores do Alentejo, fundado em 1872. Os vinhos são marcados por uma personalidade única: pisa lagar, vinificação tradicional e longa estágio.',
      en: 'Herdade do Mouchão is one of the most historic Alentejo producers, founded in 1872. The wines are marked by a unique personality: foot-treading, traditional vinification and long aging.',
      fr: "Herdade do Mouchão est l'un des producteurs historiques de l'Alentejo, fondé en 1872. Les vins ont une personnalité unique : foulage au pied et longue garde.",
      zh: '蒙乔庄园（Herdade do Mouchão）是阿连特茹最具历史的酒庄之一，创立于1872年。葡萄酒以独特个性著称：脚踩石槽、传统酿造、长期陈酿。',
    },
    pairing: {
      pt: 'Picanha 250g, Maminha Black Angus, Costela no Bafo 12h. Robusto e com taninos firmes — pede carne marcada na brasa.',
      en: 'Picanha 250g, Black Angus Tri-Tip, 12h Short Ribs. Robust with firm tannins — calls for charcoal-grilled meat.',
      fr: 'Picanha 250g, Maminha Black Angus, Côtes 12h. Tannins fermes — demande viande à la braise.',
      zh: '臀盖肉250克、黑安格斯臀尖、12小时慢蒸牛肋。单宁紧实，宜配炭火烤肉。',
    },
    grapes: 'Alicante Bouschet, Aragonez',
    country: '🇵🇹',
  },

  'wine-red-doga-2013': {
    history: {
      pt: 'Doga é o projeto de assinatura de Álvaro Castro no Dão. Vindo de vinhas velhas da Quinta da Pellada, é um vinho de elegância rara, com tipicidade do Dão e potencial de longa guarda.',
      en: 'Doga is Álvaro Castro\'s signature project in Dão. From old vines of Quinta da Pellada, it\'s a wine of rare elegance with Dão typicity and long-aging potential.',
      fr: "Doga est le projet signature d'Álvaro Castro dans le Dão. Issu des vieilles vignes de la Quinta da Pellada, élégance rare et grand potentiel de garde.",
      zh: 'Doga是Álvaro Castro在杜奥地区的签名作品，源自Quinta da Pellada的老藤葡萄，优雅罕见，具杜奥典型风格和陈年潜力。',
    },
    pairing: {
      pt: 'Filet Mignon, Rib Eye Rubia Gallega, Pluma de Porco Preto. Tem elegância para acompanhar carnes finas e expressivas.',
      en: 'Filet Mignon, Rubia Gallega Rib Eye, Iberian Pork Plumas. Elegant enough for refined and expressive cuts.',
      fr: 'Filet Mignon, Rib Eye Rubia Gallega, Plumas de Porc Ibérique. Élégance pour viandes fines et expressives.',
      zh: '菲力牛排、Rubia Gallega 肋眼、伊比利亚黑猪肉。优雅风格，宜配精致表现型肉品。',
    },
    grapes: 'Touriga Nacional, Jaen, Alfrocheiro',
    country: '🇵🇹',
  },

  'wine-red-charme-niepoort-2022': {
    history: {
      pt: 'Charme é o vinho mais delicado da gama Niepoort no Douro, inspirado nos grandes Borgonhas. Produzido a partir de vinhas muito velhas, com pisa a pé em lagares de granito.',
      en: 'Charme is the most delicate wine in Niepoort\'s Douro range, inspired by great Burgundies. Made from very old vines, with foot-treading in granite lagares.',
      fr: 'Charme est le vin le plus délicat de Niepoort au Douro, inspiré des grands Bourgognes. Vieilles vignes, foulage au pied en lagares de granite.',
      zh: 'Charme是Niepoort杜奥系列中最细腻的酒款，灵感源自勃艮第名酒。源自老藤葡萄，于花岗岩石槽脚踩酿造。',
    },
    pairing: {
      pt: 'Filet Mignon 200g, Plumas Porco Preto, Tagliatelli Portobello. Delicado e expressivo — pede pratos de igual elegância.',
      en: 'Filet Mignon 200g, Iberian Pork Plumas, Tagliatelle Portobello. Delicate and expressive — calls for equally refined dishes.',
      fr: 'Filet Mignon 200g, Plumas Porc Ibérique, Tagliatelles Portobello. Délicat et expressif.',
      zh: '菲力牛排200克、伊比利亚黑猪肉、波托贝罗意面。细腻富表现力。',
    },
    grapes: 'Touriga Franca, Tinta Roriz, blend de castas tradicionais',
    country: '🇵🇹',
  },

  'wine-red-vale-meao-2022': {
    history: {
      pt: 'Quinta do Vale Meão tem origens lendárias — pertenceu à Dona Antónia Adelaide Ferreira, uma das figuras mais marcantes da história do Douro. Desde 1999, a família Olazabal produz aqui um dos grandes Doouros modernos.',
      en: 'Quinta do Vale Meão has legendary origins — once owned by Dona Antónia Adelaide Ferreira, one of the most iconic figures in Douro history. Since 1999, the Olazabal family has crafted one of the great modern Douro reds here.',
      fr: 'Origines légendaires — propriété de Dona Antónia Adelaide Ferreira, figure historique du Douro. Depuis 1999, la famille Olazabal y élabore un grand Douro moderne.',
      zh: 'Quinta do Vale Meão拥有传奇渊源——曾属于杜奥历史标志性人物Dona Antónia Adelaide Ferreira。自1999年起，由Olazabal家族酿造现代杜奥名酒。',
    },
    pairing: {
      pt: 'Tomahawk Wagyu, T-Bone, Chuletón Rubia Gallega Gold. Estrutura grandiosa — pede cortes nobres e maturados.',
      en: 'Wagyu Tomahawk, T-Bone, Rubia Gallega Gold Chuletón. Grand structure — calls for noble dry-aged cuts.',
      fr: 'Tomahawk Wagyu, T-Bone, Chuletón Rubia Gallega. Structure majestueuse — viandes nobles maturées.',
      zh: '和牛战斧、丁骨牛排、Rubia Gallega Gold带骨牛排。架构宏大，宜配熟成顶级肉品。',
    },
    grapes: 'Touriga Nacional, Touriga Franca, Tinta Barroca',
    country: '🇵🇹',
  },

  'wine-red-pintas-character-2022': {
    history: {
      pt: 'Wine & Soul é o projeto de Sandra Tavares e Jorge Serôdio Borges no Vale Mendiz. Pintas Character é o segundo vinho da casa, das vinhas mais novas — fresco, expressivo e com a assinatura inconfundível dos produtores.',
      en: 'Wine & Soul is the Sandra Tavares and Jorge Serôdio Borges project in Vale Mendiz. Pintas Character is the second wine, from younger vines — fresh, expressive and with the unmistakable signature.',
      fr: 'Wine & Soul, projet de Sandra Tavares et Jorge Serôdio Borges. Pintas Character vient des vignes plus jeunes — frais et expressif.',
      zh: 'Wine & Soul是Sandra Tavares与Jorge Serôdio Borges位于Vale Mendiz的项目。Pintas Character出自较年轻的葡萄园，新鲜、富表现力。',
    },
    pairing: {
      pt: 'Picanha 250g, Filet Mignon, Espetada Latina. Versátil — combina com refeições principais variadas.',
      en: 'Picanha 250g, Filet Mignon, Latina Skewer. Versatile — pairs with varied mains.',
      fr: 'Picanha 250g, Filet Mignon, Brochette Latina. Polyvalent.',
      zh: '臀盖肉250克、菲力牛排、Latina牛串。搭配灵活。',
    },
    grapes: 'Touriga Nacional, Touriga Franca, Tinta Roriz, Tinto Cão',
    country: '🇵🇹',
  },

  'wine-red-crasto-vinhas-velhas-2022': {
    history: {
      pt: 'Quinta do Crasto é uma das mais reconhecidas casas do Douro, com vinhas centenárias plantadas em socalcos sobre o rio Douro. Vinhas Velhas é o vinho que melhor expressa a complexidade dessas vinhas antigas.',
      en: 'Quinta do Crasto is one of the most renowned Douro houses, with century-old vineyards on terraces above the Douro river. Vinhas Velhas best expresses the complexity of those old vines.',
      fr: 'Quinta do Crasto, l\'une des grandes maisons du Douro. Vinhas Velhas exprime la complexité des très vieilles vignes en terrasses.',
      zh: 'Quinta do Crasto是杜奥最知名的酒庄之一，百年老藤分布在杜奥河上方梯田。Vinhas Velhas最能展现这些老藤的复杂度。',
    },
    pairing: {
      pt: 'Tomahawk Wagyu, Costela 12h, Chuletón Maturado. Concentração e elegância.',
      en: 'Wagyu Tomahawk, 12h Short Ribs, Aged Chuletón. Concentration and elegance.',
      fr: 'Tomahawk Wagyu, Côtes 12h, Chuletón Maturé.',
      zh: '和牛战斧、12小时慢蒸牛肋、熟成带骨牛排。浓郁与优雅兼具。',
    },
    grapes: 'Field blend de mais de 30 castas tradicionais',
    country: '🇵🇹',
  },

  'wine-red-pintia-ribera-duero-2019': {
    history: {
      pt: 'Pintia é o projeto Vega Sicilia em Toro, lançado em 2003. Toro é uma DO árida com Tempranillo robusto (chamada localmente Tinta de Toro). Vinho potente, frutado e moderno.',
      en: 'Pintia is the Vega Sicilia project in Toro, launched in 2003. Toro is an arid DO with robust Tempranillo (called Tinta de Toro locally). Powerful, fruity and modern.',
      fr: 'Pintia, projet Vega Sicilia à Toro depuis 2003. DO aride au Tempranillo robuste (Tinta de Toro). Puissant et moderne.',
      zh: 'Pintia是Vega Sicilia于2003年在Toro产区创立的项目。Toro是干旱DO，Tempranillo（当地称Tinta de Toro）厚重果香现代。',
    },
    pairing: {
      pt: 'Costela 12 horas, Tomahawk, Picanha. Estrutura e força — pede carnes intensas.',
      en: '12h Short Ribs, Tomahawk, Picanha. Structure and force — calls for intense meats.',
      fr: 'Côtes 12h, Tomahawk, Picanha. Structure et force.',
      zh: '12小时慢蒸牛肋、战斧、臀盖肉。架构强劲。',
    },
    grapes: 'Tinta de Toro (Tempranillo)',
    country: '🇪🇸',
  },

  'wine-red-vega-sicilia-unico-2014': {
    history: {
      pt: 'O Único é a maior expressão de Vega Sicilia e um dos vinhos mais cobiçados do mundo. Repousa entre 9 e 11 anos antes de ser lançado, em barricas, cubas e garrafa. Para vinte celebrar, mais nada.',
      en: 'Único is Vega Sicilia\'s greatest expression and one of the most coveted wines in the world. Rests 9 to 11 years before release, in barrels, vats and bottle. For grand celebrations only.',
      fr: 'Único est la plus haute expression de Vega Sicilia, l\'un des vins les plus convoités au monde. 9 à 11 ans de garde avant sortie. Pour les grandes célébrations.',
      zh: 'Único是Vega Sicilia的巅峰之作，世界上最受追捧的葡萄酒之一。在橡木桶、大桶和瓶中陈年9至11年方上市。盛大庆典之选。',
    },
    pairing: {
      pt: 'Tomahawk Wagyu Austrália, Chuletón Wagyu Ibérico Premium do Chef. Vinho de gala — para momentos únicos.',
      en: 'Australian Wagyu Tomahawk, Iberian Wagyu Chuletón Premium. A gala wine — for unique moments.',
      fr: 'Tomahawk Wagyu Australien, Chuletón Wagyu Premium. Vin de gala.',
      zh: '澳洲和牛战斧、伊比利亚和牛带骨牛排。盛宴之选——独特时刻。',
    },
    grapes: 'Tempranillo, Cabernet Sauvignon',
    country: '🇪🇸',
  },

  'wine-red-brunello-montalcino-2016': {
    history: {
      pt: 'Brunello di Montalcino é uma das mais nobres DOCG da Itália. Feito 100% com Sangiovese Grosso (chamado localmente "Brunello"), exige no mínimo 5 anos de envelhecimento, dos quais 2 em barrica. Pura tradição toscana.',
      en: 'Brunello di Montalcino is one of Italy\'s noblest DOCGs. Made 100% from Sangiovese Grosso (called "Brunello" locally), requires minimum 5 years aging including 2 in barrel. Pure Tuscan tradition.',
      fr: 'Brunello di Montalcino, l\'une des DOCG les plus nobles d\'Italie. 100% Sangiovese Grosso, 5 ans minimum dont 2 en fût.',
      zh: 'Brunello di Montalcino是意大利最尊贵的DOCG之一。100% Sangiovese Grosso（当地称"Brunello"），法定至少5年陈年其中2年于木桶。纯正托斯卡纳传统。',
    },
    pairing: {
      pt: 'Costela 12 horas, Plumas com Cereja Basca, Tomahawk Maturado. Tradição e profundidade.',
      en: '12h Short Ribs, Iberian Pork with Basque Cherry, Aged Tomahawk. Tradition and depth.',
      fr: 'Côtes 12h, Plumas Cerise Basque, Tomahawk Maturé.',
      zh: '12小时慢蒸牛肋、巴斯克樱桃黑猪肉、熟成战斧。传统与深度。',
    },
    grapes: 'Sangiovese Grosso (Brunello)',
    country: '🇮🇹',
  },

  // ─── Espanha ──────────────────────────────────────────────────────
  'wine-red-valbuena-vega-sicilia-2019': {
    history: {
      pt: 'Vega Sicilia é considerado o "Château Margaux espanhol" — fundada em 1864 em Ribera del Duero. Valbuena 5° é o irmão mais novo do Único, com 5 anos de estágio entre madeira e garrafa.',
      en: 'Vega Sicilia is considered the "Spanish Château Margaux" — founded in 1864 in Ribera del Duero. Valbuena 5° is the younger sibling of Único, aged 5 years between oak and bottle.',
      fr: 'Vega Sicilia, le « Château Margaux espagnol », fondé en 1864 dans la Ribera del Duero. Valbuena 5° vieillit 5 ans entre bois et bouteille.',
      zh: 'Vega Sicilia被誉为"西班牙的玛歌酒庄"——创立于1864年，位于Ribera del Duero产区。Valbuena 5°是Único的"小弟"，在橡木桶和瓶中陈年5年。',
    },
    pairing: {
      pt: 'Tomahawk Maturado em Conhaque, Chuletón Wagyu, Costela no Bafo. Profundo, complexo, longuíssimo na boca.',
      en: 'Cognac-Aged Tomahawk, Wagyu Chuletón, Slow-Steamed Short Ribs. Deep, complex, very long finish.',
      fr: 'Tomahawk Maturé Cognac, Chuletón Wagyu, Côtes 12h. Profondeur et longueur exceptionnelles.',
      zh: '干邑熟成战斧、和牛带骨牛排、12小时慢蒸牛肋。深邃复杂，余韵悠长。',
    },
    grapes: 'Tempranillo, Merlot',
    country: '🇪🇸',
  },

  'wine-red-alion-vega-sicilia-2019': {
    history: {
      pt: 'Alión é o projeto contemporâneo de Vega Sicilia, criado em 1991. Estilo mais moderno e expressivo, 100% Tempranillo, com estágio em barricas novas. Vinho de personalidade marcante.',
      en: 'Alión is Vega Sicilia\'s contemporary project, created in 1991. More modern and expressive style, 100% Tempranillo, aged in new oak barrels.',
      fr: 'Alión, projet contemporain de Vega Sicilia créé en 1991. Style moderne, 100% Tempranillo, fûts neufs.',
      zh: 'Alión是Vega Sicilia的现代项目，创立于1991年。风格更现代奔放，100% Tempranillo，全新橡木桶陈酿。',
    },
    pairing: {
      pt: 'Picanha, Rib Eye USA, Espetada Latina. Frutado, taninos polidos — versátil para vários cortes.',
      en: 'Picanha, USA Rib Eye, Latina Skewer. Fruity, polished tannins — versatile pairing.',
      fr: 'Picanha, Rib Eye USA, Brochette Latina. Fruité, tannins soyeux.',
      zh: '臀盖肉、美国肋眼、Latina牛串。果香丰富，单宁柔和，搭配多元。',
    },
    grapes: 'Tempranillo (100%)',
    country: '🇪🇸',
  },

  // ─── França ───────────────────────────────────────────────────────
  'wine-red-chateau-margaux-2012': {
    history: {
      pt: 'Premier Grand Cru Classé desde 1855, Château Margaux é uma das cinco maiores casas de Bordeaux. Famoso pela elegância feminina e perfume rendado — o vinho preferido de Thomas Jefferson.',
      en: 'Premier Grand Cru Classé since 1855, Château Margaux is one of Bordeaux\'s five greatest houses. Famous for feminine elegance and lace-like perfume — Thomas Jefferson\'s favorite.',
      fr: 'Premier Grand Cru Classé depuis 1855, Château Margaux est l\'une des cinq grandes maisons bordelaises. Célèbre pour son élégance féminine et son parfum dentelé.',
      zh: '自1855年列为顶级一级庄，玛歌酒庄是波尔多五大名庄之一。以阴柔优雅与精致芬芳闻名——曾为美国总统杰斐逊最爱。',
    },
    pairing: {
      pt: 'Filet Mignon 200g, Chateaubriand 500g, Foie Gras do Frankie. Vinho de gala — pede a melhor mesa da casa.',
      en: 'Filet Mignon 200g, Chateaubriand 500g, Frankie\'s Foie Gras. A gala wine — for the best table.',
      fr: 'Filet Mignon, Chateaubriand 500g, Foie Gras de Frankie. Vin de gala.',
      zh: '菲力牛排200克、夏多布里昂500克、Frankie主厨鹅肝。盛宴之选。',
    },
    grapes: 'Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot',
    country: '🇫🇷',
  },

  'wine-red-chateau-pavie-2010': {
    history: {
      pt: 'Château Pavie é Premier Grand Cru Classé "B" de Saint-Émilion. Sob a direção de Gérard Perse desde 1998, tornou-se um dos vinhos mais cobiçados da Margem Direita de Bordeaux.',
      en: 'Château Pavie is a Premier Grand Cru Classé "B" of Saint-Émilion. Under Gérard Perse since 1998, became one of the most coveted Right Bank Bordeaux wines.',
      fr: 'Château Pavie, Premier Grand Cru Classé « B » de Saint-Émilion. Sous Gérard Perse depuis 1998, l\'un des vins les plus convoités de la Rive Droite.',
      zh: '帕维酒庄是圣埃米利永一级特等酒庄"B"级。1998年起在Gérard Perse领导下，成为波尔多右岸最炙手可热的名酒之一。',
    },
    pairing: {
      pt: 'Tomahawk Wagyu, Plumas Porco Preto com Cereja Basca, Chuletón Wagyu. Concentração e generosidade.',
      en: 'Wagyu Tomahawk, Iberian Pork Plumas with Basque Cherry, Wagyu Chuletón. Concentration and generosity.',
      fr: 'Tomahawk Wagyu, Plumas Porc Ibérique Cerise Basque, Chuletón Wagyu. Concentration et générosité.',
      zh: '和牛战斧、伊比利亚黑猪肉配巴斯克樱桃、和牛带骨牛排。浓郁丰盛。',
    },
    grapes: 'Merlot, Cabernet Franc, Cabernet Sauvignon',
    country: '🇫🇷',
  },

  'wine-red-loratoire-des-papes-2023': {
    history: {
      pt: 'L\'Oratoire des Papes é uma jóia de Châteauneuf-du-Pape, no sul do Ródano. A região foi residência papal no século XIV, e os vinhos são marcados pelas pedras de calhau que armazenam calor — concentração e especiaria.',
      en: 'L\'Oratoire des Papes is a jewel of Châteauneuf-du-Pape, in the southern Rhône. Once a papal residence in the 14th century, the wines are marked by the heat-storing stones — concentration and spice.',
      fr: 'L\'Oratoire des Papes est un joyau de Châteauneuf-du-Pape. Les galets roulés stockent la chaleur — concentration et épices.',
      zh: 'L\'Oratoire des Papes是教皇新堡的明珠，位于南罗讷河谷。该区曾为14世纪教皇驻地，葡萄酒以储热卵石赋予的浓郁与香料感著称。',
    },
    pairing: {
      pt: 'Costela no Bafo 12 horas, Picanha, Iberian Pork Plumas. Especiaria e estrutura — perfeito para carnes de longa cocção.',
      en: '12h Slow-Steamed Short Ribs, Picanha, Iberian Pork Plumas. Spice and structure — slow-cooked meats.',
      fr: 'Côtes 12h, Picanha, Plumas Porc Ibérique. Épices et structure — viandes longuement mijotées.',
      zh: '12小时慢蒸牛肋、臀盖肉、伊比利亚黑猪肉。香料与结构感俱佳。',
    },
    grapes: 'Grenache, Syrah, Mourvèdre',
    country: '🇫🇷',
  },

  // ─── Itália ───────────────────────────────────────────────────────
  'wine-red-sassicaia-2019': {
    history: {
      pt: 'O pai dos Super-Tuscans. Criado em 1968 por Mario Incisa della Rocchetta na Tenuta San Guido em Bolgheri, mudou a história do vinho italiano ao apostar em Cabernet Sauvignon — algo impensável na época.',
      en: 'The father of Super-Tuscans. Created in 1968 by Mario Incisa della Rocchetta at Tenuta San Guido in Bolgheri — changed Italian wine history by betting on Cabernet Sauvignon.',
      fr: 'Le père des Super-Toscans. Créé en 1968 par Mario Incisa della Rocchetta à la Tenuta San Guido. Cabernet Sauvignon en Bolgheri — révolutionnaire à l\'époque.',
      zh: '"超级托斯卡纳"之父。1968年由Mario Incisa della Rocchetta侯爵于波尔盖里的Tenuta San Guido酒庄创立——以赤霞珠改写了意大利葡萄酒历史。',
    },
    pairing: {
      pt: 'Filet Mignon, T-Bone, Chuletón Wagyu Ibérico. Cabernet de classe mundial — para os melhores cortes.',
      en: 'Filet Mignon, T-Bone, Iberian Wagyu Chuletón. World-class Cabernet — for the finest cuts.',
      fr: 'Filet Mignon, T-Bone, Chuletón Wagyu Ibérique. Cabernet de classe mondiale.',
      zh: '菲力牛排、丁骨牛排、伊比利亚和牛带骨牛排。世界级赤霞珠——配最顶级的肉品。',
    },
    grapes: 'Cabernet Sauvignon, Cabernet Franc',
    country: '🇮🇹',
  },

  'wine-red-tignanello-toscana-2020': {
    history: {
      pt: 'Tignanello é o vinho que originou a categoria Super-Tuscan. Criado por Piero Antinori em 1971, foi o primeiro Sangiovese moderno em barricas de Bordeaux e o primeiro a misturar castas internacionais com a tradicional Toscana.',
      en: 'Tignanello is the wine that birthed the Super-Tuscan category. Created by Piero Antinori in 1971, it was the first modern Sangiovese in Bordeaux barrels.',
      fr: 'Tignanello, le vin qui a fondé la catégorie Super-Toscan. Créé par Piero Antinori en 1971.',
      zh: 'Tignanello开创了"超级托斯卡纳"这一品类。1971年由Piero Antinori创造，首款于波尔多桶陈酿的现代Sangiovese。',
    },
    pairing: {
      pt: 'Picanha, Filet Mignon, Tagliatelle Portobello. Estilo elegante e expressivo — versatil.',
      en: 'Picanha, Filet Mignon, Tagliatelle Portobello. Elegant and expressive — versatile.',
      fr: 'Picanha, Filet Mignon, Tagliatelles Portobello. Élégant et polyvalent.',
      zh: '臀盖肉、菲力牛排、波托贝罗意面。优雅富表现力，搭配灵活。',
    },
    grapes: 'Sangiovese, Cabernet Sauvignon, Cabernet Franc',
    country: '🇮🇹',
  },

  'wine-red-pian-delle-vigne-2020': {
    history: {
      pt: 'Pian delle Vigne é a propriedade Antinori em Montalcino, dedicada exclusivamente ao Brunello. O vinho passa pelo mínimo legal de 5 anos antes de chegar ao mercado, dos quais 2 em barrica.',
      en: 'Pian delle Vigne is Antinori\'s Montalcino estate, dedicated exclusively to Brunello. The wine ages a minimum of 5 years before release, including 2 in barrel.',
      fr: 'Pian delle Vigne, le domaine Antinori à Montalcino, exclusivement Brunello. 5 ans de garde minimum.',
      zh: 'Pian delle Vigne是Antinori家族在蒙塔西诺的庄园，专酿Brunello。法定陈年至少5年方可上市，其中2年于木桶中。',
    },
    pairing: {
      pt: 'Costela no Bafo 12 horas, Tomahawk Maturado, Mouchão pratos longos. Sangiovese clássico — pede tempo e sabor profundo.',
      en: '12h Short Ribs, Aged Tomahawk, slow-cooked dishes. Classic Sangiovese — calls for time and depth.',
      fr: 'Côtes 12h, Tomahawk Maturé, plats longs. Sangiovese classique.',
      zh: '12小时慢蒸牛肋、熟成战斧、慢炖菜肴。经典Sangiovese——配时间与风味俱深的菜。',
    },
    grapes: 'Sangiovese Grosso (Brunello)',
    country: '🇮🇹',
  },

  // ─── EUA ──────────────────────────────────────────────────────────
  'wine-red-cigare-volant-2021': {
    history: {
      pt: 'Le Cigare Volant é homenagem ao Châteauneuf-du-Pape — em 1954, a câmara local proibiu OVNIs ("cigarros voadores") nas vinhas. Bonny Doon, na Califórnia, brincou com a história e fez seu próprio blend Rhône-style.',
      en: 'Le Cigare Volant honors Châteauneuf-du-Pape — in 1954, the local council banned UFOs ("flying cigars") from the vineyards. Bonny Doon in California played with the story to make their Rhône-style blend.',
      fr: 'Le Cigare Volant rend hommage à Châteauneuf-du-Pape — en 1954, le conseil local interdit les OVNIs (« cigares volants ») dans les vignes. Bonny Doon, Californie, joue avec cette histoire.',
      zh: 'Le Cigare Volant致敬教皇新堡——1954年当地政府禁止UFO（"飞行雪茄"）出现在葡萄园。Bonny Doon酒庄借此典故于加州酿造其罗讷风格混酿。',
    },
    pairing: {
      pt: 'Picanha, Iberian Pork Plumas, Espetada Latina. Frutado e fácil de beber — vinho de partilha.',
      en: 'Picanha, Iberian Pork Plumas, Latina Skewer. Fruity and approachable — sharing wine.',
      fr: 'Picanha, Plumas Porc Ibérique, Brochette Latina. Fruité et accessible.',
      zh: '臀盖肉、伊比利亚黑猪肉、Latina牛串。果味怡人，适合分享。',
    },
    grapes: 'Grenache, Mourvèdre, Syrah',
    country: '🇺🇸',
  },
};

/**
 * Get wine info for a specific item id, or null if not curated.
 */
export function getWineInfo(itemId: string): WineInfo | null {
  return wineInfo[itemId] ?? null;
}

/**
 * Popularity score for sorting wines top-to-bottom in the grid.
 *
 * Higher = shown earlier. Built from heuristics:
 *  - Curated wines (with a hand-written history in wineInfo) → known/famous
 *  - Has a real photo mapped → editorial weight
 *  - Tags: bestseller > signature > premium > everything
 *  - Popular Portuguese regions get a small nudge
 *
 * EXPLICITLY DOES NOT factor in price — the client doesn't want the most
 * expensive bottles at the top of the list.
 */
const POPULAR_REGIONS_HIGH = ['douro', 'alentejo'];
const POPULAR_REGIONS_MID = ['bairrada', 'dão', 'dao', 'bordeaux', 'toscana', 'tuscany'];

interface WineLike {
  id: string;
  description: { pt: string };
  tags: readonly string[];
}

/**
 * Resolve the country flag emoji for a wine card. First tries the curated
 * wineInfo map; falls back to inferring from `description.pt` (region name).
 */
const REGION_TO_FLAG: { match: string[]; flag: string }[] = [
  { match: ['douro', 'alentejo', 'bairrada', 'dão', 'dao', 'tejo', 'setúbal', 'setubal', 'évora', 'evora'], flag: '🇵🇹' },
  { match: ['frança', 'franca', 'france', 'bordeaux', 'médoc', 'medoc', 'châteauneuf', 'chateauneuf', 'rhône', 'rhone'], flag: '🇫🇷' },
  { match: ['itália', 'italia', 'italy', 'toscana', 'tuscany', 'bolgheri', 'montalcino'], flag: '🇮🇹' },
  { match: ['espanha', 'spain', 'rioja', 'ribera del duero', 'toro'], flag: '🇪🇸' },
  { match: ['eua', 'usa', 'estados unidos', 'califórnia', 'california'], flag: '🇺🇸' },
];

export function getWineCountryFlag(item: WineLike): string | null {
  // First: curated entry
  const curated = wineInfo[item.id];
  if (curated?.country) return curated.country;

  // Fallback: infer from description.pt (region name)
  const region = (item.description.pt ?? '').toLowerCase();
  for (const { match, flag } of REGION_TO_FLAG) {
    if (match.some((m) => region.includes(m))) return flag;
  }
  return null;
}

export function getWinePopularityScore(item: WineLike): number {
  let score = 0;

  // Curated wines are the well-known / famous ones — top tier
  if (wineInfo[item.id]) score += 100;

  // Tag weights (no 'bestseller' on wines yet but kept for future)
  if (item.tags.includes('bestseller')) score += 40;
  if (item.tags.includes('signature')) score += 25;
  if (item.tags.includes('premium')) score += 10;

  // Popular regions get a small nudge so customers see familiar names first
  const region = (item.description.pt ?? '').toLowerCase();
  if (POPULAR_REGIONS_HIGH.some((r) => region.includes(r))) score += 8;
  else if (POPULAR_REGIONS_MID.some((r) => region.includes(r))) score += 4;

  return score;
}
