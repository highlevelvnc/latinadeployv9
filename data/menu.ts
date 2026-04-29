import type { CategoryGroup, MenuCategory, MenuItem } from '@/types/menu';

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'entradas',
    name: {
      pt: 'Entradas',
      en: 'Starters',
      fr: 'Entrées',
      zh: '前菜',
    },
    icon: 'Salad',
    sortOrder: 40,
  },
  {
    id: 'meats',
    name: {
      pt: 'Carnes',
      en: 'Meats',
      fr: 'Viandes',
      zh: '肉类',
    },
    icon: 'Beef',
    sortOrder: 10,
  },
  {
    id: 'alcoholic-drinks',
    name: {
      pt: 'Bebidas Alcoólicas',
      en: 'Alcoholic Drinks',
      fr: 'Boissons Alcoolisées',
      zh: '酒精饮品',
    },
    icon: 'Wine',
    sortOrder: 90,
  },
  {
    id: 'non-alcoholic-drinks',
    name: {
      pt: 'Bebidas Não Alcoólicas',
      en: 'Non-Alcoholic Drinks',
      fr: 'Boissons Sans Alcool',
      zh: '无酒精饮品',
    },
    icon: 'CupSoda',
    sortOrder: 95,
  },
];

export const categories: MenuCategory[] = [
  { id: 'couvert', name: { pt: 'Couverts', en: 'Couverts', fr: 'Couverts', zh: '餐前小食' }, icon: 'Bread', sortOrder: 41, parentGroup: 'entradas' },
  { id: 'cold-starters', name: { pt: 'Entradas Frias', en: 'Cold Starters', fr: 'Entrées Froides', zh: '冷前菜' }, icon: 'Salad', sortOrder: 42, parentGroup: 'entradas' },
  { id: 'hot-starters', name: { pt: 'Entradas Quentes', en: 'Hot Starters', fr: 'Entrées Chaudes', zh: '热前菜' }, icon: 'Flame', sortOrder: 43, parentGroup: 'entradas' },
  { id: 'cheese-cold-cuts', name: { pt: 'Queijos e Enchidos', en: 'Cheese and Cold Cuts', fr: 'Fromages et Charcuterie', zh: '奶酪与冷切' }, icon: 'Slice', sortOrder: 44, parentGroup: 'entradas' },
  { id: 'kids', name: { pt: 'Kids', en: 'Kids', fr: 'Enfants', zh: '儿童菜单' }, icon: 'Baby', sortOrder: 100 },
  { id: 'dry-aged-meats', name: { pt: 'Carnes Maturadas', en: 'Dry Aged Meats', fr: 'Viandes Maturées', zh: '熟成牛肉' }, icon: 'Beef', sortOrder: 12, parentGroup: 'meats' },
  { id: 'wagyu', name: { pt: 'Wagyu', en: 'Wagyu', fr: 'Wagyu', zh: '和牛' }, icon: 'Star', sortOrder: 13, parentGroup: 'meats' },
  { id: 'grilled-seafood', name: { pt: 'Marisco Fresco na Grelha', en: 'Fresh Seafood on the Grill', fr: 'Fruits de Mer Frais au Grill', zh: '炭烤鲜海鲜' }, icon: 'Fish', sortOrder: 30 },
  { id: 'premium-selection', name: { pt: 'Seleção Premium', en: 'Premium Selection', fr: 'Sélection Premium', zh: '精选高级肉类' }, icon: 'Award', sortOrder: 14, parentGroup: 'meats' },
  { id: 'other-cuts', name: { pt: 'Outros Cortes', en: 'Other Cuts', fr: 'Autres Pièces', zh: '其他肉类' }, icon: 'Utensils', sortOrder: 15, parentGroup: 'meats' },
  { id: 'boards', name: { pt: 'Tábuas', en: 'Boards', fr: 'Planches', zh: '分享拼盘' }, icon: 'LayoutGrid', sortOrder: 20 },
  { id: 'side-dishes', name: { pt: 'Guarnições', en: 'Side Dishes', fr: 'Accompagnements', zh: '配菜' }, icon: 'Carrot', sortOrder: 50 },
  { id: 'vegetarian', name: { pt: 'Opções Vegetarianas', en: 'Vegetarian Options', fr: 'Options Végétariennes', zh: '素食' }, icon: 'Leaf', sortOrder: 60 },
  { id: 'gold-selection', name: { pt: 'Golden Selection', en: 'Golden Selection', fr: 'Sélection Golden', zh: '黄金甄选' }, icon: 'Crown', sortOrder: 11, parentGroup: 'meats' },
  { id: 'sauces', name: { pt: 'Molhos', en: 'Sauces', fr: 'Sauces', zh: '酱汁' }, icon: 'Droplets', sortOrder: 70 },
  { id: 'chef-suggestion', name: { pt: 'Sugestão do Chef', en: "Chef's Suggestion", fr: 'Suggestion du Chef', zh: '主厨推荐' }, icon: 'ChefHat', sortOrder: 0 },
  { id: 'desserts', name: { pt: 'Sobremesas', en: 'Desserts', fr: 'Desserts', zh: '甜点' }, icon: 'Cookie', sortOrder: 80 },
  { id: 'wines-red-portugal', name: { pt: 'Vinhos Tintos – Portugal', en: 'Red Wines – Portugal', fr: 'Vins Rouges – Portugal', zh: '葡萄牙红酒' }, icon: 'Wine', sortOrder: 91, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-red-world', name: { pt: 'Vinhos Tintos do Mundo', en: 'Red Wines of the World', fr: 'Vins Rouges du Monde', zh: '世界红酒' }, icon: 'Wine', sortOrder: 92, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-white', name: { pt: 'Vinhos Brancos', en: 'White Wines', fr: 'Vins Blancs', zh: '白葡萄酒' }, icon: 'Wine', sortOrder: 93, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-rose', name: { pt: 'Vinhos Rosé', en: 'Rosé Wines', fr: 'Vins Rosés', zh: '桃红葡萄酒' }, icon: 'Wine', sortOrder: 94, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-sparkling', name: { pt: 'Espumantes & Champagne', en: 'Sparkling & Champagne', fr: 'Mousseux & Champagne', zh: '起泡酒与香槟' }, icon: 'Wine', sortOrder: 95, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-fortified', name: { pt: 'Vinhos Fortificados', en: 'Fortified Wines', fr: 'Vins Fortifiés', zh: '加强葡萄酒' }, icon: 'Wine', sortOrder: 96, parentGroup: 'alcoholic-drinks' },
  { id: 'wines-by-glass', name: { pt: 'Vinho a Copo', en: 'Wine by the Glass', fr: 'Vin au Verre', zh: '杯装葡萄酒' }, icon: 'Wine', sortOrder: 97, parentGroup: 'alcoholic-drinks' },
  { id: 'cocktails', name: { pt: 'Cocktails', en: 'Cocktails', fr: 'Cocktails', zh: '鸡尾酒' }, icon: 'Martini', sortOrder: 98, parentGroup: 'alcoholic-drinks' },
  { id: 'sangrias', name: { pt: 'Sangrias', en: 'Sangrias', fr: 'Sangrias', zh: '桑格利亚' }, icon: 'Wine', sortOrder: 99, parentGroup: 'alcoholic-drinks' },
  { id: 'mocktails', name: { pt: 'Mocktails', en: 'Mocktails', fr: 'Mocktails', zh: '无酒精鸡尾酒' }, icon: 'CupSoda', sortOrder: 96, parentGroup: 'non-alcoholic-drinks' },
  { id: 'natural-juices', name: { pt: 'Sumos Naturais', en: 'Natural Juices', fr: 'Jus Naturels', zh: '鲜榨果汁' }, icon: 'Citrus', sortOrder: 97, parentGroup: 'non-alcoholic-drinks' },
  { id: 'coffee-tea', name: { pt: 'Café & Chá', en: 'Coffee & Tea', fr: 'Café & Thé', zh: '咖啡与茶' }, icon: 'Coffee', sortOrder: 98, parentGroup: 'non-alcoholic-drinks' },
  { id: 'soft-drinks', name: { pt: 'Refrigerantes', en: 'Soft Drinks', fr: 'Sodas', zh: '软饮' }, icon: 'CupSoda', sortOrder: 99, parentGroup: 'non-alcoholic-drinks' },
  { id: 'beers', name: { pt: 'Cervejas', en: 'Beers', fr: 'Bières', zh: '啤酒' }, icon: 'Beer', sortOrder: 100, parentGroup: 'alcoholic-drinks' },
  { id: 'waters', name: { pt: 'Águas', en: 'Waters', fr: 'Eaux', zh: '水' }, icon: 'Droplet', sortOrder: 100, parentGroup: 'non-alcoholic-drinks' },
  { id: 'aperitifs', name: { pt: 'Aperitivos', en: 'Aperitifs', fr: 'Apéritifs', zh: '开胃酒' }, icon: 'Wine', sortOrder: 101, parentGroup: 'alcoholic-drinks' },
  { id: 'liqueurs', name: { pt: 'Licores', en: 'Liqueurs', fr: 'Liqueurs', zh: '利口酒' }, icon: 'Wine', sortOrder: 102, parentGroup: 'alcoholic-drinks' },
];

export const menuItems: MenuItem[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // COUVERTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'basket-of-bread',
    categoryId: 'couvert',
    name: { pt: 'Cesta de Pão', en: 'Bread Basket', fr: 'Corbeille de Pain', zh: '面包篮' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 250,
    image: '/menu/bread-basket.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'garlic-herb-butter',
    categoryId: 'couvert',
    name: {
      pt: 'Manteiga de Alho e Ervas – Azeite e Balsámico',
      en: 'Garlic & Herb Butter – Olive Oil and Balsamic',
      fr: "Beurre à l'Ail et aux Herbes – Huile d'Olive et Balsamique",
      zh: '香草蒜味黄油 – 橄榄油与香醋',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 250,
    image: '/menu/garlic-butter.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'beef-croquettes',
    categoryId: 'couvert',
    name: {
      pt: 'Croquetes de Novilho',
      en: 'Beef Croquettes',
      fr: 'Croquettes de Bœuf',
      zh: '牛肉可乐饼',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 780,
    image: '/menu/beef-croquettes.webp',
    tags: ['bestseller'],
    available: true,
  },
  {
    id: 'cheese-gratin',
    categoryId: 'couvert',
    name: {
      pt: 'Queijo Gratinado com Pistácio e Mel',
      en: 'Gratinated Cheese with Pistachio and Honey',
      fr: 'Fromage Gratiné à la Pistache et Miel',
      zh: '开心果蜂蜜焗芝士',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 780,
    image: '/menu/cheese-gratin.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'bolo-do-caco',
    categoryId: 'couvert',
    name: {
      pt: 'Bolo do Caco com Manteiga de Alho',
      en: 'Bolo do Caco with Garlic Butter',
      fr: "Bolo do Caco au Beurre à l'Ail",
      zh: '蒜香黄油葡式扁面包',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 480,
    image: '/menu/bolo-do-caco.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENTRADAS FRIAS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'beef-carpaccio',
    categoryId: 'cold-starters',
    name: { pt: 'Carpaccio de Novilho', en: 'Beef Carpaccio', fr: 'Carpaccio de Bœuf', zh: '生牛肉薄片' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1400,
    image: '/menu/beef-carpaccio.webp',
    tags: [],
    available: true,
  },
  {
    id: 'tenderloin-tartare',
    categoryId: 'cold-starters',
    name: {
      pt: 'Tártaro de Lombos Nobres',
      en: 'Noble Tenderloin Tartare',
      fr: 'Tartare de Filets Nobles',
      zh: '顶级牛里脊塔塔',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1800,
    image: '/menu/beef-chef-special.jpeg',
    tags: ['signature'],
    available: true,
  },
  {
    id: 'tuna-tartare',
    categoryId: 'cold-starters',
    name: {
      pt: 'Tártaro de Atum com Pimenta Espelette e Abacate',
      en: 'Tuna Tartare with Espelette Pepper and Avocado',
      fr: "Tartare de Thon au Piment d'Espelette et Avocat",
      zh: '埃斯佩莱特辣椒牛油果金枪鱼塔塔',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1780,
    image: '/menu/tuna-tartare.webp',
    tags: [],
    available: true,
  },
  {
    id: 'chef-caesar',
    categoryId: 'cold-starters',
    name: {
      pt: 'Salada Caesar do Chef',
      en: "Chef's Caesar Salad",
      fr: 'Salade César du Chef',
      zh: '主厨凯撒沙拉',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1700,
    image: '/menu/caesar-salad.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'caesar-tuna',
    categoryId: 'cold-starters',
    name: {
      pt: 'Salada Caesar com Atum Braseado',
      en: 'Caesar Salad with Seared Tuna',
      fr: 'Salade César au Thon Saisi',
      zh: '炙烤金枪鱼凯撒沙拉',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1750,
    image: '/menu/caesar-tuna.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'nachos-guacamole',
    categoryId: 'cold-starters',
    name: {
      pt: 'Nachos com Guacamole',
      en: 'Nachos with Guacamole',
      fr: 'Nachos au Guacamole',
      zh: '玉米片配牛油果酱',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 950,
    image: '/menu/nachos.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENTRADAS QUENTES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tomato-soup-egg',
    categoryId: 'hot-starters',
    name: {
      pt: 'Sopa de Tomate com Ovo BT',
      en: 'Tomato Soup with Slow-Cooked Egg',
      fr: 'Soupe de Tomate avec Œuf Basse Température',
      zh: '番茄汤配低温蛋',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 900,
    image: '/menu/tomato-soup.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'foie-gras-chef',
    categoryId: 'hot-starters',
    name: {
      pt: "Foie Gras do Frankie Chef's Signature",
      en: "Frankie's Foie Gras Chef's Signature",
      fr: "Foie Gras de Frankie Chef's Signature",
      zh: "Frankie 主厨招牌鹅肝",
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1700,
    image: '/menu/foie-gras.jpg',
    tags: ['premium', 'signature'],
    available: true,
  },
  {
    id: 'egg-croutons-truffle',
    categoryId: 'hot-starters',
    name: {
      pt: 'Ovo BT com Croutons, Chips de Presunto e Trufas',
      en: 'Slow-Cooked Egg with Croutons, Ham Chips and Truffles',
      fr: 'Œuf Basse Température avec Croûtons, Chips de Jambon et Truffes',
      zh: '低温蛋配面包丁、火腿脆片与松露',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 900,
    image: '/menu/egg-croutons-truffle.webp',
    tags: [],
    available: true,
  },
  {
    id: 'shrimp-flambe',
    categoryId: 'hot-starters',
    name: { pt: 'Camarão Flambé', en: 'Flambéed Shrimp', fr: 'Crevettes Flambées', zh: '火焰大虾' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2100,
    image: '/menu/shrimp-flambe.jpg',
    tags: ['bestseller'],
    available: true,
  },
  {
    id: 'buffalo-wings',
    categoryId: 'hot-starters',
    name: { pt: 'Buffalo Wings', en: 'Buffalo Wings', fr: 'Buffalo Wings', zh: '水牛城鸡翅' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1300,
    image: '/menu/buffalo-wings.jpg',
    tags: ['spicy'],
    available: true,
  },
  {
    id: 'kobe-tataki',
    categoryId: 'hot-starters',
    name: {
      pt: 'Tataki de Kobe Japonês 100 gr',
      en: 'Japanese Kobe Tataki 100g',
      fr: 'Tataki de Kobe Japonais 100g',
      zh: '日本神户牛炙烤薄切 100克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 7900,
    image: '/menu/kobe-tataki.jpg',
    tags: ['premium', 'wagyu', 'signature'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUEIJOS E ENCHIDOS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pata-negra',
    categoryId: 'cheese-cold-cuts',
    name: { pt: 'Presunto Pata Negra', en: 'Pata Negra Ham', fr: 'Jambon Pata Negra', zh: '伊比利亚黑标火腿' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2500,
    image: '/menu/pata-negra.jpg',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'cheese-board',
    categoryId: 'cheese-cold-cuts',
    name: { pt: 'Tábua de Queijos', en: 'Cheese Board', fr: 'Plateau de Fromages', zh: '奶酪拼盘' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 1900,
    image: '/menu/cheese-board.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KIDS (Até 10 anos)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'kids-spaghetti-bolognese',
    categoryId: 'kids',
    name: {
      pt: 'Spaghetti Bolognese',
      en: 'Spaghetti Bolognese',
      fr: 'Spaghetti Bolognaise',
      zh: '肉酱意大利面',
    },
    description: {
      pt: 'Até 10 anos',
      en: 'Up to 10 years',
      fr: "Jusqu'à 10 ans",
      zh: '10 岁以下',
    },
    price: 1050,
    image: '/menu/kids-spaghetti-bolognese.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'kids-cheeseburger',
    categoryId: 'kids',
    name: {
      pt: 'Kids Cheese Burger',
      en: 'Kids Cheeseburger',
      fr: 'Cheeseburger Enfant',
      zh: '儿童芝士汉堡',
    },
    description: {
      pt: 'Até 10 anos',
      en: 'Up to 10 years',
      fr: "Jusqu'à 10 ans",
      zh: '10 岁以下',
    },
    price: 1050,
    image: '/menu/kids-cheeseburger.webp',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARNES MATURADAS — ASSINATURA DA CASA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'chuleton-rubia-gallega-gold',
    categoryId: 'dry-aged-meats',
    name: {
      pt: 'Chuletón Rubia Gallega Gold',
      en: 'Rubia Gallega Gold Chuletón',
      fr: 'Chuletón Rubia Gallega Gold',
      zh: 'Rubia Gallega Gold 带骨牛排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 9900,
    priceUnit: '/kg',
    image: '/menu/chuletao-maturado-espanha.jpeg',
    tags: ['premium', 'signature'],
    available: true,
  },
  {
    id: 'chuleton-wagyu',
    categoryId: 'dry-aged-meats',
    name: { pt: 'Chuletón Wagyu Ibérico', en: 'Iberian Wagyu Chuletón', fr: 'Chuletón Wagyu Ibérique', zh: '伊比利亚和牛带骨牛排' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 14000,
    priceUnit: '/kg',
    image: '/menu/chuleton-wagyu.jpg',
    tags: ['wagyu', 'premium'],
    available: true,
  },
  {
    id: 'tomahawk-wagyu-australia',
    categoryId: 'dry-aged-meats',
    name: {
      pt: 'Tomahawk Wagyu Austrália',
      en: 'Australian Wagyu Tomahawk',
      fr: 'Tomahawk Wagyu Australien',
      zh: '澳洲和牛战斧牛排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 14500,
    priceUnit: '/kg',
    image: '/menu/tomahawk-wagyu-australia.webp',
    tags: ['wagyu', 'premium', 'bestseller'],
    available: true,
  },
  {
    id: 'tomahawk-australia-cognac-madeira',
    categoryId: 'dry-aged-meats',
    name: {
      pt: 'Tomahawk Austrália Maturado em Conhaque e Madeira',
      en: 'Australian Tomahawk Aged in Cognac and Madeira',
      fr: 'Tomahawk Australien Maturé au Cognac et Madère',
      zh: '干邑与马德拉酒熟成澳洲战斧牛排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 15500,
    priceUnit: '/kg',
    image: '/menu/tomahawk-australia-cognac-madeira.webp',
    tags: ['premium', 'signature'],
    available: true,
  },
  {
    id: 't-bone',
    categoryId: 'dry-aged-meats',
    name: { pt: 'T-Bone', en: 'T-Bone', fr: 'T-Bone', zh: '丁骨牛排' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 8900,
    priceUnit: '/kg',
    image: '/menu/t-bone.webp',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'rib-eye-usa-250g',
    categoryId: 'dry-aged-meats',
    name: {
      pt: 'Rib Eye EUA 250 gr',
      en: 'USA Rib Eye 250g',
      fr: 'Rib Eye USA 250g',
      zh: '美国肋眼牛排 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 18000,
    image: '/menu/rib-eye-usa-250g.webp',
    tags: ['premium'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WAGYU
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'wagyu-trio',
    categoryId: 'wagyu',
    name: {
      pt: 'Trio Wagyu com Pickle Caseiro e Ponzu Trufado',
      en: 'Wagyu Trio with Homemade Pickle and Truffled Ponzu',
      fr: 'Trio de Wagyu au Pickle Maison et Ponzu Truffé',
      zh: '自制腌菜松露柚子酱和牛三重奏',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 9900,
    image: '/menu/fine-dining-plate.jpeg',
    tags: ['wagyu', 'signature', 'bestseller'],
    available: true,
  },
  {
    id: 'wagyu-rib-eye-japan-250g',
    categoryId: 'wagyu',
    name: {
      pt: 'Rib Eye Wagyu Japão 250 gr',
      en: 'Japanese Wagyu Rib Eye 250g',
      fr: 'Rib Eye Wagyu Japon 250g',
      zh: '日本和牛肋眼 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 19900,
    image: '/menu/wagyu-rib-eye-japan.jpg',
    tags: ['wagyu', 'premium'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MARISCO FRESCO NA GRELHA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'blue-lobster',
    categoryId: 'grilled-seafood',
    name: { pt: 'Lavagante Azul', en: 'Blue Lobster', fr: 'Homard Bleu', zh: '蓝龙虾' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 12000,
    priceUnit: '/kg',
    image: '/menu/blue-lobster.jpg',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'lobster',
    categoryId: 'grilled-seafood',
    name: { pt: 'Lagosta', en: 'Lobster', fr: 'Langouste', zh: '大龙虾' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 14500,
    priceUnit: '/kg',
    image: '/menu/lobster.jpg',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'tiger-prawn',
    categoryId: 'grilled-seafood',
    name: {
      pt: 'Tigrão Solitário',
      en: 'Solo Tiger Prawn',
      fr: 'Crevette Tigre (Pièce)',
      zh: '单只虎虾',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2800,
    image: '/menu/grilled-prawns.jpeg',
    tags: [],
    available: true,
  },
  {
    id: 'grilled-tuna-steak',
    categoryId: 'grilled-seafood',
    name: {
      pt: 'Bife de Atum Grelhado',
      en: 'Grilled Tuna Steak',
      fr: 'Steak de Thon Grillé',
      zh: '炭烤金枪鱼排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2900,
    image: '/menu/tuna-steak.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SELEÇÃO PREMIUM
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'picanha-250g',
    categoryId: 'premium-selection',
    name: {
      pt: 'Picanha – Austrália ou EUA 250 gr',
      en: 'Picanha – Australia or USA 250g',
      fr: 'Picanha – Australie ou USA 250g',
      zh: '澳洲或美国臀盖肉 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2700,
    image: '/menu/picanha-250g.webp',
    tags: ['bestseller'],
    available: true,
  },
  {
    id: 'maminha-black-angus-250g',
    categoryId: 'premium-selection',
    name: {
      pt: 'Maminha Black Angus 250 gr',
      en: 'Black Angus Tri-Tip 250g',
      fr: 'Maminha Black Angus 250g',
      zh: '黑安格斯臀尖 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2700,
    image: '/menu/maminha.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'filet-mignon-200g',
    categoryId: 'premium-selection',
    name: { pt: 'Filet Mignon 200 gr', en: 'Filet Mignon 200g', fr: 'Filet Mignon 200g', zh: '菲力牛排 200克' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2900,
    image: '/menu/filet-mignon-200g.webp',
    tags: ['bestseller'],
    available: true,
  },
  {
    id: 'rib-eye-rubia-gallega-250g',
    categoryId: 'premium-selection',
    name: {
      pt: 'Rib Eye Rubia Gallega 250 gr',
      en: 'Rubia Gallega Rib Eye 250g',
      fr: 'Rib Eye Rubia Gallega 250g',
      zh: 'Rubia Gallega 肋眼 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 3600,
    image: '/menu/ribeye-served.jpeg',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'sirloin-australia-250g',
    categoryId: 'premium-selection',
    name: {
      pt: 'Vazia Austrália 250 gr',
      en: 'Australian Sirloin 250g',
      fr: 'Rumsteck Australien 250g',
      zh: '澳洲西冷 250克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 3600,
    image: '/menu/sirloin-australia-250g.webp',
    tags: ['premium'],
    available: true,
  },
  {
    id: 'latina-skewer',
    categoryId: 'premium-selection',
    name: {
      pt: 'Espetada Latina — Lombo',
      en: 'Latina Skewer — Tenderloin',
      fr: 'Brochette Latina — Filet',
      zh: 'Latina 牛里脊串',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2800,
    image: '/menu/beef-skewer.jpeg',
    tags: ['signature'],
    available: true,
  },
  {
    id: 'short-ribs-12h',
    categoryId: 'premium-selection',
    name: {
      pt: 'Costela no Bafo 12 horas',
      en: '12h Slow-Steamed Short Ribs',
      fr: 'Côtes Courtes Cuites à la Vapeur 12h',
      zh: '12 小时慢蒸牛肋排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 4500,
    image: '/menu/short-ribs-12h.webp',
    tags: ['signature', 'bestseller'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OUTROS CORTES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iberian-pork-plumas',
    categoryId: 'other-cuts',
    name: {
      pt: 'Plumas de Porco Preto com Cereja Basca em Porto',
      en: 'Iberian Pork Plumas with Basque Cherry in Port',
      fr: 'Plumas de Porc Ibérique à la Cerise Basque au Porto',
      zh: '巴斯克樱桃波特酒伊比利亚黑猪肉',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 3000,
    image: '/menu/iberian-pork-plumas.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'farm-chicken-supremes',
    categoryId: 'other-cuts',
    name: {
      pt: 'Supremos de Frango do Campo',
      en: 'Farm Chicken Supremes',
      fr: 'Suprêmes de Poulet Fermier',
      zh: '农场鸡胸肉',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2700,
    image: '/menu/farm-chicken.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TÁBUAS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'latina-premium-board',
    categoryId: 'boards',
    name: {
      pt: 'Tábua Latina Premium',
      en: 'Latina Premium Board',
      fr: 'Planche Latina Premium',
      zh: 'Latina 高级拼盘',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 15250,
    image: '/menu/latina-premium-board.webp',
    tags: ['board', 'premium', 'signature'],
    available: true,
  },
  {
    id: 'tender-board',
    categoryId: 'boards',
    name: { pt: 'Tender Board', en: 'Tender Board', fr: 'Tender Board', zh: 'Tender 拼盘' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 18300,
    image: '/menu/tender-board.jpg',
    tags: ['board', 'premium'],
    available: true,
  },
  {
    id: 'dry-aged-board',
    categoryId: 'boards',
    name: {
      pt: 'Tábua de Maturados',
      en: 'Dry Aged Board',
      fr: 'Planche de Viandes Maturées',
      zh: '熟成肉拼盘',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 29800,
    image: '/menu/dry-aged-board.jpg',
    tags: ['board', 'premium', 'gold'],
    available: true,
  },
  {
    id: 'surf-turf-board',
    categoryId: 'boards',
    name: {
      pt: 'Tábua Surf and Turf',
      en: 'Surf and Turf Board',
      fr: 'Planche Surf and Turf',
      zh: '海陆拼盘',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 30000,
    image: '/menu/surf-turf.jpg',
    tags: ['board', 'premium', 'wagyu', 'signature'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPÇÕES VEGETARIANAS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'truffled-mushroom-risotto',
    categoryId: 'vegetarian',
    name: {
      pt: 'Risotto de Cogumelos Selvagens Trufado',
      en: 'Wild Mushroom Truffled Risotto',
      fr: 'Risotto aux Champignons Sauvages Truffés',
      zh: '野菌松露烩饭',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2300,
    image: '/menu/mushroom-risotto.jpg',
    tags: ['vegetarian'],
    available: true,
  },
  {
    id: 'tagliatelle-portobello-walnuts',
    categoryId: 'vegetarian',
    name: {
      pt: 'Tagliatelli Fresco de Portobello e Nozes',
      en: 'Fresh Tagliatelle with Portobello and Walnuts',
      fr: 'Tagliatelles Fraîches aux Portobello et Noix',
      zh: '波托贝罗蘑菇核桃鲜制意面',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 2300,
    image: '/menu/tagliatelle-portobello.jpg',
    tags: ['vegetarian'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GUARNIÇÕES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'golden-potatoes-truffle',
    categoryId: 'side-dishes',
    name: {
      pt: 'Batata Dourada com Ovo BT, Queijo da Ilha e Trufa',
      en: 'Golden Potatoes with Slow-Cooked Egg, Azores Cheese and Truffle',
      fr: "Pommes de Terre Dorées à l'Œuf, Fromage des Açores et Truffe",
      zh: '低温蛋、亚速尔奶酪与松露金黄土豆',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 880,
    image: '/menu/truffle-raw.jpeg',
    tags: ['bestseller'],
    available: true,
  },
  {
    id: 'fries-truffle-aioli',
    categoryId: 'side-dishes',
    name: {
      pt: 'Batata Frita com Aioli Trufado',
      en: 'French Fries with Truffled Aioli',
      fr: 'Frites avec Aïoli Truffé',
      zh: '松露蒜香蛋黄酱薯条',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 580,
    image: '/menu/fries-truffle.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'sweet-potato-garlic-oregano',
    categoryId: 'side-dishes',
    name: {
      pt: 'Batata Doce Frita com Alho e Orégãos e Aioli Trufado',
      en: 'Sweet Potato Fries with Garlic, Oregano and Truffled Aioli',
      fr: "Frites de Patate Douce à l'Ail, Origan et Aïoli Truffé",
      zh: '蒜香牛至红薯条配松露蛋黄酱',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 700,
    image: '/menu/sweet-potato-garlic.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'roasted-sweet-potato',
    categoryId: 'side-dishes',
    name: { pt: 'Batata Doce Assada', en: 'Roasted Sweet Potato', fr: 'Patate Douce Rôtie', zh: '烤红薯' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 550,
    image: '/menu/roasted-sweet-potato.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'truffled-mashed-potato',
    categoryId: 'side-dishes',
    name: {
      pt: 'Puré de Batata Trufado',
      en: 'Truffled Mashed Potato',
      fr: 'Purée de Pommes de Terre Truffée',
      zh: '松露土豆泥',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 700,
    image: '/menu/mashed-potato.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'grilled-vegetables',
    categoryId: 'side-dishes',
    name: {
      pt: 'Legumes Grelhados na Brasa',
      en: 'Charcoal Grilled Vegetables',
      fr: 'Légumes Grillés à la Braise',
      zh: '炭火烤时蔬',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 780,
    image: '/menu/grilled-vegetables.webp',
    tags: [],
    available: true,
  },
  {
    id: 'river-rice',
    categoryId: 'side-dishes',
    name: { pt: 'Arroz do Rio', en: 'River Rice', fr: 'Riz du Fleuve', zh: '河畔风味米饭' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 550,
    image: '/menu/river-rice.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'bean-rice-chorizo',
    categoryId: 'side-dishes',
    name: {
      pt: 'Arroz de Feijão com Chouriço de Porco Preto',
      en: 'Bean Rice with Iberian Pork Chorizo',
      fr: 'Riz aux Haricots et Chorizo de Porc Ibérique',
      zh: '伊比利亚黑猪香肠豆饭',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 550,
    image: '/menu/bean-rice.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'tomato-basil-duet',
    categoryId: 'side-dishes',
    name: {
      pt: 'Dueto de Tomate com Manjericão',
      en: 'Tomato Duet with Basil',
      fr: 'Duo de Tomates au Basilic',
      zh: '罗勒双番茄',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 600,
    image: '/menu/tomato-basil.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'rocket-parmesan-salad',
    categoryId: 'side-dishes',
    name: {
      pt: 'Salada de Rúcula com Lascas de Parmesão e Balsâmico',
      en: 'Rocket Salad with Parmesan Shavings and Balsamic',
      fr: 'Salade de Roquette aux Copeaux de Parmesan et Balsamique',
      zh: '帕玛森芝士片与香醋芝麻菜沙拉',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 550,
    image: '/menu/rocket-salad.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'farofa-latina',
    categoryId: 'side-dishes',
    name: { pt: 'Farofa Latina', en: 'Latina Farofa', fr: 'Farofa Latina', zh: 'Latina 风味木薯粉' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 550,
    image: '/menu/farofa.jpg',
    tags: ['signature'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GOLDEN SELECTION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'golden-chateaubriand-500g',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Chateaubriand – Filet 500 gr',
      en: 'Golden Chateaubriand – Filet 500g',
      fr: 'Golden Chateaubriand – Filet 500g',
      zh: '黄金甄选夏多布里昂菲力 500克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 11000,
    image: '/menu/chateaubriand.jpg',
    tags: ['gold', 'premium', 'signature'],
    available: true,
  },
  {
    id: 'golden-rib-eye-usa-500g',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Rib Eye USA 500 gr',
      en: 'Golden Rib Eye USA 500g',
      fr: 'Golden Rib Eye USA 500g',
      zh: '黄金甄选美国肋眼 500克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 30000,
    image: '/menu/ribeye-grill-2.jpeg',
    tags: ['gold', 'premium'],
    available: true,
  },
  {
    id: 'golden-rib-eye-500g',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Rib Eye 500 gr',
      en: 'Golden Rib Eye 500g',
      fr: 'Golden Rib Eye 500g',
      zh: '黄金甄选肋眼 500克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 12000,
    image: '/menu/golden-rib-eye-500g.webp',
    tags: ['gold', 'premium'],
    available: true,
  },
  {
    id: 'golden-japanese-wagyu-300g',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Japanese Wagyu Rib Eye 300 gr',
      en: 'Golden Japanese Wagyu Rib Eye 300g',
      fr: 'Golden Wagyu Japonais Rib Eye 300g',
      zh: '黄金甄选日本和牛肋眼 300克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 40000,
    image: '/menu/golden-japanese-wagyu-300g.webp',
    tags: ['gold', 'wagyu', 'premium'],
    available: true,
  },
  {
    id: 'golden-t-bone-800g',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden T-Bone 800 gr',
      en: 'Golden T-Bone 800g',
      fr: 'Golden T-Bone 800g',
      zh: '黄金甄选丁骨牛排 800克',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 15000,
    image: '/menu/ribeye-grill.jpeg',
    tags: ['gold', 'premium'],
    available: true,
  },
  {
    id: 'golden-iberian-chuleton-wagyu',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Iberian Chuletón Wagyu',
      en: 'Golden Iberian Wagyu Chuletón',
      fr: 'Golden Chuletón Wagyu Ibérique',
      zh: '黄金甄选伊比利亚和牛带骨牛排',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 19000,
    priceUnit: '/kg',
    image: '/menu/golden-chuleton-wagyu.jpg',
    tags: ['gold', 'wagyu', 'premium'],
    available: true,
  },
  {
    id: 'golden-australian-wagyu-tomahawk',
    categoryId: 'gold-selection',
    name: {
      pt: 'Golden Australian Wagyu Tomahawk',
      en: 'Golden Australian Wagyu Tomahawk',
      fr: 'Golden Tomahawk Wagyu Australien',
      zh: '黄金甄选澳洲和牛战斧',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: 19000,
    priceUnit: '/kg',
    image: '/menu/golden-australian-wagyu-tomahawk.webp',
    tags: ['gold', 'wagyu', 'premium', 'bestseller'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOLHOS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'piri-piri-latina',
    categoryId: 'sauces',
    name: { pt: 'Piri Piri Latina', en: 'Latina Piri Piri', fr: 'Piri Piri Latina', zh: 'Latina 辣椒酱' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/piri-piri.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'truffled-ponzu',
    categoryId: 'sauces',
    name: { pt: 'Ponzu Trufado', en: 'Truffled Ponzu', fr: 'Ponzu Truffé', zh: '松露柚子酱' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/truffled-ponzu.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'mustard-french',
    categoryId: 'sauces',
    name: {
      pt: 'Mostarda Francesa',
      en: 'French Mustard',
      fr: 'Moutarde Française',
      zh: '法式芥末',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/mustard-french.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'madeira-wine',
    categoryId: 'sauces',
    name: {
      pt: 'Vinho Madeira',
      en: 'Madeira Wine',
      fr: 'Vin de Madère',
      zh: '马德拉酒酱',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/madeira-wine.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'three-peppers',
    categoryId: 'sauces',
    name: {
      pt: 'Trio de Pimentas',
      en: 'Three Pepper Trio',
      fr: 'Trio de Poivres',
      zh: '三椒酱',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/three-peppers.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'chimichurri',
    categoryId: 'sauces',
    name: { pt: 'Chimichurri', en: 'Chimichurri', fr: 'Chimichurri', zh: '奇米丘里酱' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/chimichurri.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'truffled-aioli',
    categoryId: 'sauces',
    name: { pt: 'Aioli Trufado', en: 'Truffled Aioli', fr: 'Aïoli Truffé', zh: '松露蒜味蛋黄酱' },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/truffled-aioli.jpg',
    tags: [],
    available: true,
  },
  {
    id: 'blue-cheese-sauce',
    categoryId: 'sauces',
    name: {
      pt: 'Molho de Queijo Azul',
      en: 'Blue Cheese Sauce',
      fr: 'Sauce au Fromage Bleu',
      zh: '蓝纹芝士酱',
    },
    description: { pt: '', en: '', fr: '', zh: '' },
    price: null,
    image: '/menu/blue-cheese.jpg',
    tags: [],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUGESTÃO DO CHEF
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'chef-kobe-a5-bife-150g',
    categoryId: 'chef-suggestion',
    name: {
      pt: 'Kobe Japonês A5 – Bife (150g)',
      en: 'Japanese Kobe A5 – Steak (150g)',
      fr: 'Kobe Japonais A5 – Steak (150g)',
      zh: '日本神户 A5 牛排（150 克）',
    },
    description: {
      pt: 'Corte premium de Wagyu Japonês A5, reconhecido mundialmente pelo seu extraordinário marmoreio e textura extremamente macia. Grelhado cuidadosamente na brasa para realçar o sabor e a suculência da carne. Acompanha Batata Trufada e Legumes Grelhados.',
      en: 'Premium Japanese Wagyu A5 cut, world-renowned for its extraordinary marbling and extremely tender texture. Carefully charcoal-grilled to enhance the flavor and juiciness of the meat. Served with Truffled Potato and Grilled Vegetables.',
      fr: 'Coupe premium de Wagyu Japonais A5, mondialement reconnue pour son marbrage extraordinaire et sa texture extrêmement tendre. Grillée au charbon avec soin pour exalter la saveur et la jutosité de la viande. Accompagnée de Pomme de Terre Truffée et Légumes Grillés.',
      zh: '顶级日本 A5 和牛，以非凡的大理石花纹和极致柔软口感闻名于世。小心炭烤以凸显肉的鲜味与多汁。搭配松露薯泥与烤蔬菜。',
    },
    price: 15000,
    image: '/menu/chef-kobe-a5-bife-150g.webp',
    tags: ['wagyu', 'premium', 'signature', 'gold'],
    available: true,
  },
  {
    id: 'chef-chuleton-wagyu-premium',
    categoryId: 'chef-suggestion',
    name: {
      pt: 'Chuletón de Wagyu – Premium (1 kg)',
      en: 'Wagyu Chuletón – Premium (1 kg)',
      fr: 'Chuletón de Wagyu – Premium (1 kg)',
      zh: '和牛带骨牛排 – 精选（1 公斤）',
    },
    description: {
      pt: 'Corte nobre de Wagyu extremamente marmorizado, grelhado na brasa para proporcionar uma experiência gastronómica única.',
      en: 'Noble Wagyu cut with exceptional marbling, charcoal-grilled to provide a unique gastronomic experience.',
      fr: 'Coupe noble de Wagyu exceptionnellement marbrée, grillée au charbon pour offrir une expérience gastronomique unique.',
      zh: '极致大理石花纹的顶级和牛，炭烤呈现独特的美食体验。',
    },
    price: 14500,
    priceUnit: '/kg',
    image: '/menu/tomahawk-steak.jpeg',
    tags: ['wagyu', 'premium', 'signature'],
    available: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOBREMESAS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'dessert-chocolate-fondant', categoryId: 'desserts', name: { pt: 'Fondant de Chocolate', en: 'Chocolate Fondant', fr: 'Fondant au Chocolat', zh: '巧克力熔岩蛋糕' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/dessert-chocolate-fondant.webp', tags: [], available: true },
  { id: 'dessert-churros', categoryId: 'desserts', name: { pt: 'Churros com Nutella ou Doce de Leite', en: 'Churros with Nutella or Dulce de Leche', fr: 'Churros au Nutella ou Dulce de Leche', zh: '西班牙油条配 Nutella 或焦糖牛奶酱' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 650, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-apple-crumble', categoryId: 'desserts', name: { pt: 'Crumble de Maçã', en: 'Apple Crumble', fr: 'Crumble aux Pommes', zh: '苹果酥' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 750, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-latina-split', categoryId: 'desserts', name: { pt: 'Latina Split', en: 'Latina Split', fr: 'Latina Split', zh: 'Latina 香蕉船' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 900, image: '/menu/dessert-latina-split.webp', tags: ['signature'], available: true },
  { id: 'dessert-forest-cheesecake', categoryId: 'desserts', name: { pt: 'Cheesecake de Frutos do Bosque', en: 'Fruits of the Forest Cheesecake', fr: 'Cheesecake aux Fruits des Bois', zh: '森林野莓芝士蛋糕' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 650, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-waffle-icecream-nutella', categoryId: 'desserts', name: { pt: 'Waffle com Gelado e Nutella', en: 'Waffle with Ice Cream and Nutella', fr: 'Gaufre avec Glace et Nutella', zh: '华夫饼配冰淇淋与 Nutella' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 650, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-caramelized-banana', categoryId: 'desserts', name: { pt: 'Banana Caramelizada', en: 'Caramelized Banana', fr: 'Banane Caramélisée', zh: '焦糖香蕉' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 900, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-seasonal-fruit-board', categoryId: 'desserts', name: { pt: 'Tábua Mista de Frutas Sazonais', en: 'Seasonal Fruit Board', fr: 'Planche de Fruits de Saison', zh: '时令水果拼盘' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 1050, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },
  { id: 'dessert-brownie', categoryId: 'desserts', name: { pt: 'Brownie', en: 'Brownie', fr: 'Brownie', zh: '布朗尼' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 950, image: '/menu/placeholder-dessert.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHOS TINTOS — PORTUGAL (57 items from printed menu + 2 house selection)
  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Dão ───
  { id: 'wine-red-dao-niepoort-2021', categoryId: 'wines-red-portugal', name: { pt: 'Dão Niepoort 2021', en: 'Dão Niepoort 2021', fr: 'Dão Niepoort 2021', zh: 'Dão Niepoort 2021' }, description: { pt: 'Dão', en: 'Dão', fr: 'Dão', zh: 'Dão' }, price: 3500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-monteirinhos-manel-chaves-2021', categoryId: 'wines-red-portugal', name: { pt: 'Quinta dos Monteirinhos Manel Chaves 2021', en: 'Quinta dos Monteirinhos Manel Chaves 2021', fr: 'Quinta dos Monteirinhos Manel Chaves 2021', zh: 'Quinta dos Monteirinhos Manel Chaves 2021' }, description: { pt: 'Dão', en: 'Dão', fr: 'Dão', zh: 'Dão' }, price: 6000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-doga-2013', categoryId: 'wines-red-portugal', name: { pt: 'Doga 2013', en: 'Doga 2013', fr: 'Doga 2013', zh: 'Doga 2013' }, description: { pt: 'Dão', en: 'Dão', fr: 'Dão', zh: 'Dão' }, price: 15800, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },

  // ─── Bairrada ───
  { id: 'wine-red-luis-pato-vinhas-velhas-2022', categoryId: 'wines-red-portugal', name: { pt: 'Luis Pato Vinhas Velhas 2022', en: 'Luis Pato Vinhas Velhas 2022', fr: 'Luis Pato Vinhas Velhas 2022', zh: 'Luis Pato Vinhas Velhas 2022' }, description: { pt: 'Bairrada', en: 'Bairrada', fr: 'Bairrada', zh: 'Bairrada' }, price: 2900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-vadio-baga-2021', categoryId: 'wines-red-portugal', name: { pt: 'Vadio Baga 2021', en: 'Vadio Baga 2021', fr: 'Vadio Baga 2021', zh: 'Vadio Baga 2021' }, description: { pt: 'Bairrada', en: 'Bairrada', fr: 'Bairrada', zh: 'Bairrada' }, price: 6000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-palacio-bucaco-2015', categoryId: 'wines-red-portugal', name: { pt: 'Palácio do Buçaco 2015', en: 'Palácio do Buçaco 2015', fr: 'Palácio do Buçaco 2015', zh: 'Palácio do Buçaco 2015' }, description: { pt: 'Bairrada', en: 'Bairrada', fr: 'Bairrada', zh: 'Bairrada' }, price: 9500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },

  // ─── Tejo / Península de Setúbal ───
  { id: 'wine-red-cabeco-toiro-alicante-2018', categoryId: 'wines-red-portugal', name: { pt: 'Cabeço de Toiro Alicante Bouschet Reserva 2018', en: 'Cabeço de Toiro Alicante Bouschet Reserva 2018', fr: 'Cabeço de Toiro Alicante Bouschet Reserva 2018', zh: 'Cabeço de Toiro Alicante Bouschet Reserva 2018' }, description: { pt: 'Tejo / Península de Setúbal', en: 'Tejo / Setúbal Peninsula', fr: 'Tejo / Péninsule de Setúbal', zh: '特茹 / 塞图巴尔半岛' }, price: 6600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Alentejo ───
  { id: 'wine-red-cartuxa-colheita-2020', categoryId: 'wines-red-portugal', name: { pt: 'Cartuxa Colheita 2020', en: 'Cartuxa Colheita 2020', fr: 'Cartuxa Colheita 2020', zh: 'Cartuxa Colheita 2020' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2400, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-marques-borba-2021', categoryId: 'wines-red-portugal', name: { pt: 'Marquês de Borba Colheita 2021', en: 'Marquês de Borba Colheita 2021', fr: 'Marquês de Borba Colheita 2021', zh: 'Marquês de Borba Colheita 2021' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-voltface-reserva-2022', categoryId: 'wines-red-portugal', name: { pt: 'Voltface Reserva 2022', en: 'Voltface Reserva 2022', fr: 'Voltface Reserva 2022', zh: 'Voltface Reserva 2022' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-dona-maria-2020', categoryId: 'wines-red-portugal', name: { pt: 'Dona Maria 2020', en: 'Dona Maria 2020', fr: 'Dona Maria 2020', zh: 'Dona Maria 2020' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-ravasqueira-romas-2021', categoryId: 'wines-red-portugal', name: { pt: 'Ravasqueira Vinha das Romãs 2021', en: 'Ravasqueira Vinha das Romãs 2021', fr: 'Ravasqueira Vinha das Romãs 2021', zh: 'Ravasqueira Vinha das Romãs 2021' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 3800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-mouchao-2016', categoryId: 'wines-red-portugal', name: { pt: 'Mouchão 2016', en: 'Mouchão 2016', fr: 'Mouchão 2016', zh: 'Mouchão 2016' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 6800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-cartuxa-reserva-2017', categoryId: 'wines-red-portugal', name: { pt: 'Cartuxa Reserva 2017', en: 'Cartuxa Reserva 2017', fr: 'Cartuxa Reserva 2017', zh: 'Cartuxa Reserva 2017' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 6600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-tapada-coelheiros-2016', categoryId: 'wines-red-portugal', name: { pt: 'Tapada dos Coelheiros 2016', en: 'Tapada dos Coelheiros 2016', fr: 'Tapada dos Coelheiros 2016', zh: 'Tapada dos Coelheiros 2016' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 7800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-cem-reis-syrah-2022', categoryId: 'wines-red-portugal', name: { pt: 'Cem Reis Syrah 2022', en: 'Cem Reis Syrah 2022', fr: 'Cem Reis Syrah 2022', zh: 'Cem Reis Syrah 2022' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 7800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-peso-icone-2018', categoryId: 'wines-red-portugal', name: { pt: 'Herdade do Peso Ícone 2018', en: 'Herdade do Peso Ícone 2018', fr: 'Herdade do Peso Ícone 2018', zh: 'Herdade do Peso Ícone 2018' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 19800, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-pera-manca-2018', categoryId: 'wines-red-portugal', name: { pt: 'Pêra Manca 2018', en: 'Pêra Manca 2018', fr: 'Pêra Manca 2018', zh: 'Pêra Manca 2018' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 56000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature'], available: true },
  { id: 'wine-red-mil-reis', categoryId: 'wines-red-portugal', name: { pt: 'Mil Réis', en: 'Mil Réis', fr: 'Mil Réis', zh: 'Mil Réis' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 58000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },

  // ─── Douro ───
  { id: 'wine-red-gaivosa-2020', categoryId: 'wines-red-portugal', name: { pt: 'Quinta da Gaivosa 2020', en: 'Quinta da Gaivosa 2020', fr: 'Quinta da Gaivosa 2020', zh: 'Quinta da Gaivosa 2020' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 9800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-monte-meao-vale-meao-2022', categoryId: 'wines-red-portugal', name: { pt: 'Monte Meão Quinta Vale Meão 2022', en: 'Monte Meão Quinta Vale Meão 2022', fr: 'Monte Meão Quinta Vale Meão 2022', zh: 'Monte Meão Quinta Vale Meão 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 8800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-crasto-vinhas-velhas-2022', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Crasto Vinhas Velhas 2022', en: 'Quinta do Crasto Vinhas Velhas 2022', fr: 'Quinta do Crasto Vinhas Velhas 2022', zh: 'Quinta do Crasto Vinhas Velhas 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 9500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-palato-coa-reserva-2017', categoryId: 'wines-red-portugal', name: { pt: 'Palato do Côa Grande Reserva 2017', en: 'Palato do Côa Grande Reserva 2017', fr: 'Palato do Côa Grande Reserva 2017', zh: 'Palato do Côa Grande Reserva 2017' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 9500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-poeira-55-barricas-2020', categoryId: 'wines-red-portugal', name: { pt: 'Poeira 55 Barricas 2020', en: 'Poeira 55 Barricas 2020', fr: 'Poeira 55 Barricas 2020', zh: 'Poeira 55 Barricas 2020' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 11000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-vale-d-maria-2021', categoryId: 'wines-red-portugal', name: { pt: 'Quinta Vale D. Maria 2021', en: 'Quinta Vale D. Maria 2021', fr: 'Quinta Vale D. Maria 2021', zh: 'Quinta Vale D. Maria 2021' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 11000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-touriga-cha-2022', categoryId: 'wines-red-portugal', name: { pt: 'Quinta Touriga Chã 2022', en: 'Quinta Touriga Chã 2022', fr: 'Quinta Touriga Chã 2022', zh: 'Quinta Touriga Chã 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 14500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-vesuvio-symington-2017', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Vesúvio Symington 2017', en: 'Quinta do Vesúvio Symington 2017', fr: 'Quinta do Vesúvio Symington 2017', zh: 'Quinta do Vesúvio Symington 2017' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 10000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-vacaria-reserva-2019', categoryId: 'wines-red-portugal', name: { pt: 'Quinta da Vacaria Reserva 2019', en: 'Quinta da Vacaria Reserva 2019', fr: 'Quinta da Vacaria Reserva 2019', zh: 'Quinta da Vacaria Reserva 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 11000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-trufa-2020', categoryId: 'wines-red-portugal', name: { pt: 'Trufa 2020', en: 'Trufa 2020', fr: 'Trufa 2020', zh: 'Trufa 2020' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 10800, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-chryseia-ps-2022', categoryId: 'wines-red-portugal', name: { pt: 'Chryseia P&S 2022', en: 'Chryseia P&S 2022', fr: 'Chryseia P&S 2022', zh: 'Chryseia P&S 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 12000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-charme-niepoort-2022', categoryId: 'wines-red-portugal', name: { pt: 'Charme Niepoort 2022', en: 'Charme Niepoort 2022', fr: 'Charme Niepoort 2022', zh: 'Charme Niepoort 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 12000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-batuta-niepoort-2022', categoryId: 'wines-red-portugal', name: { pt: 'Batuta Niepoort 2022', en: 'Batuta Niepoort 2022', fr: 'Batuta Niepoort 2022', zh: 'Batuta Niepoort 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 12000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-gaivosa-lordelo-15l-2019', categoryId: 'wines-red-portugal', name: { pt: 'Quinta Gaivosa Vinha Lordelo 1,5 L 2019', en: 'Quinta Gaivosa Vinha Lordelo 1.5 L 2019', fr: 'Quinta Gaivosa Vinha Lordelo 1,5 L 2019', zh: 'Quinta Gaivosa Vinha Lordelo 1.5 L 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 32000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-vale-meao-2022', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Vale Meão 2022', en: 'Quinta do Vale Meão 2022', fr: 'Quinta do Vale Meão 2022', zh: 'Quinta do Vale Meão 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 38500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-abandonado-gaivosa-2022', categoryId: 'wines-red-portugal', name: { pt: 'Abandonado Quinta da Gaivosa 2022', en: 'Abandonado Quinta da Gaivosa 2022', fr: 'Abandonado Quinta da Gaivosa 2022', zh: 'Abandonado Quinta da Gaivosa 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 16600, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-crasto-vinha-ponte-2019', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Crasto Vinha da Ponte 2019', en: 'Quinta do Crasto Vinha da Ponte 2019', fr: 'Quinta do Crasto Vinha da Ponte 2019', zh: 'Quinta do Crasto Vinha da Ponte 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 39500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-barca-velha-2011', categoryId: 'wines-red-portugal', name: { pt: 'Barca Velha 2011', en: 'Barca Velha 2011', fr: 'Barca Velha 2011', zh: 'Barca Velha 2011' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 158000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },
  { id: 'wine-red-barca-velha-1991', categoryId: 'wines-red-portugal', name: { pt: 'Barca Velha 1991', en: 'Barca Velha 1991', fr: 'Barca Velha 1991', zh: 'Barca Velha 1991' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 188000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },
  { id: 'wine-red-barca-velha-1983', categoryId: 'wines-red-portugal', name: { pt: 'Barca Velha 1983', en: 'Barca Velha 1983', fr: 'Barca Velha 1983', zh: 'Barca Velha 1983' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 188000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },

  // ─── Douro (página adicional) ───
  { id: 'wine-red-valle-dona-maria-douro-2022', categoryId: 'wines-red-portugal', name: { pt: 'Valle Dona Maria Douro Superior 2022', en: 'Valle Dona Maria Douro Superior 2022', fr: 'Valle Dona Maria Douro Superior 2022', zh: 'Valle Dona Maria Douro Superior 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-crasto-2022', categoryId: 'wines-red-portugal', name: { pt: 'Crasto 2022', en: 'Crasto 2022', fr: 'Crasto 2022', zh: 'Crasto 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-duas-quintas-rp-2022', categoryId: 'wines-red-portugal', name: { pt: 'Duas Quintas RP 2022', en: 'Duas Quintas RP 2022', fr: 'Duas Quintas RP 2022', zh: 'Duas Quintas RP 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-duorum-jpr-2022', categoryId: 'wines-red-portugal', name: { pt: 'Duorum JPR 2022', en: 'Duorum JPR 2022', fr: 'Duorum JPR 2022', zh: 'Duorum JPR 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-vallado-tres-melros-2023', categoryId: 'wines-red-portugal', name: { pt: 'Vallado Três Melros 2023', en: 'Vallado Três Melros 2023', fr: 'Vallado Três Melros 2023', zh: 'Vallado Três Melros 2023' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-pintas-character-2022', categoryId: 'wines-red-portugal', name: { pt: 'Pintas Character Wine & Soul 2022', en: 'Pintas Character Wine & Soul 2022', fr: 'Pintas Character Wine & Soul 2022', zh: 'Pintas Character Wine & Soul 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 6800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-pombal-vesuvio-2022', categoryId: 'wines-red-portugal', name: { pt: 'Pombal do Vesúvio F&S 2022', en: 'Pombal do Vesúvio F&S 2022', fr: 'Pombal do Vesúvio F&S 2022', zh: 'Pombal do Vesúvio F&S 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 4200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-espinho-senior-2021', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Espinho Sénior 2021', en: 'Quinta do Espinho Sénior 2021', fr: 'Quinta do Espinho Sénior 2021', zh: 'Quinta do Espinho Sénior 2021' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 4200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-fraga-alta-reserva-2019', categoryId: 'wines-red-portugal', name: { pt: 'Fraga Alta Reserva 2019', en: 'Fraga Alta Reserva 2019', fr: 'Fraga Alta Reserva 2019', zh: 'Fraga Alta Reserva 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-romanos-reserva-2019', categoryId: 'wines-red-portugal', name: { pt: 'Quinta dos Romanos Reserva 2019', en: 'Quinta dos Romanos Reserva 2019', fr: 'Quinta dos Romanos Reserva 2019', zh: 'Quinta dos Romanos Reserva 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 15000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-vallado-orgal-2021', categoryId: 'wines-red-portugal', name: { pt: 'Vallado Quinta do Orgal 2021', en: 'Vallado Quinta do Orgal 2021', fr: 'Vallado Quinta do Orgal 2021', zh: 'Vallado Quinta do Orgal 2021' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 5700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-crasto-superior-2022', categoryId: 'wines-red-portugal', name: { pt: 'Crasto Superior 2022', en: 'Crasto Superior 2022', fr: 'Crasto Superior 2022', zh: 'Crasto Superior 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-meandro-vale-meao-2022', categoryId: 'wines-red-portugal', name: { pt: 'Meandro Vale Meão 2022', en: 'Meandro Vale Meão 2022', fr: 'Meandro Vale Meão 2022', zh: 'Meandro Vale Meão 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-valbom-2018', categoryId: 'wines-red-portugal', name: { pt: 'Quinta do Valbom 2018', en: 'Quinta do Valbom 2018', fr: 'Quinta do Valbom 2018', zh: 'Quinta do Valbom 2018' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 4500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-bioma-niepoort-2018', categoryId: 'wines-red-portugal', name: { pt: 'Bioma Niepoort 2018', en: 'Bioma Niepoort 2018', fr: 'Bioma Niepoort 2018', zh: 'Bioma Niepoort 2018' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 4500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-espinho-grande-reserva-2019', categoryId: 'wines-red-portugal', name: { pt: 'Espinho Grande Reserva 2019', en: 'Espinho Grande Reserva 2019', fr: 'Espinho Grande Reserva 2019', zh: 'Espinho Grande Reserva 2019' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 5800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-redoma-niepoort-2021', categoryId: 'wines-red-portugal', name: { pt: 'Redoma Niepoort 2021', en: 'Redoma Niepoort 2021', fr: 'Redoma Niepoort 2021', zh: 'Redoma Niepoort 2021' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 7900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-duas-quintas-reserva-2022', categoryId: 'wines-red-portugal', name: { pt: 'Duas Quintas Reserva 2022', en: 'Duas Quintas Reserva 2022', fr: 'Duas Quintas Reserva 2022', zh: 'Duas Quintas Reserva 2022' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 7900, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Seleção da Casa (garrafa tinto) ───
  { id: 'wine-red-paulo-laureano-caricatura-bottle', categoryId: 'wines-red-portugal', name: { pt: 'Paulo Laureano Caricatura (Garrafa)', en: 'Paulo Laureano Caricatura (Bottle)', fr: 'Paulo Laureano Caricatura (Bouteille)', zh: 'Paulo Laureano Caricatura（瓶装）' }, description: { pt: 'Alentejo — Seleção da Casa', en: 'Alentejo — House Selection', fr: 'Alentejo — Sélection Maison', zh: 'Alentejo — 本店精选' }, price: 2300, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-oliveirinha-alves-sousa-bottle', categoryId: 'wines-red-portugal', name: { pt: 'Quinta da Oliveirinha Eng° Alves de Sousa (Garrafa)', en: 'Quinta da Oliveirinha Eng° Alves de Sousa (Bottle)', fr: 'Quinta da Oliveirinha Eng° Alves de Sousa (Bouteille)', zh: 'Quinta da Oliveirinha Eng° Alves de Sousa（瓶装）' }, description: { pt: 'Douro — Seleção da Casa', en: 'Douro — House Selection', fr: 'Douro — Sélection Maison', zh: 'Douro — 本店精选' }, price: 2400, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHOS TINTOS — MUNDO (17 items)
  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Espanha ───
  { id: 'wine-red-protos-crianza-2020', categoryId: 'wines-red-world', name: { pt: 'Protos Crianza 2020', en: 'Protos Crianza 2020', fr: 'Protos Crianza 2020', zh: 'Protos Crianza 2020' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 4500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-protos-reserva-2019', categoryId: 'wines-red-world', name: { pt: 'Protos Reserva 2019', en: 'Protos Reserva 2019', fr: 'Protos Reserva 2019', zh: 'Protos Reserva 2019' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 9800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-pintia-ribera-duero-2019', categoryId: 'wines-red-world', name: { pt: 'Pintia Ribera del Duero 2019', en: 'Pintia Ribera del Duero 2019', fr: 'Pintia Ribera del Duero 2019', zh: 'Pintia Ribera del Duero 2019' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 18000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-alion-vega-sicilia-2019', categoryId: 'wines-red-world', name: { pt: 'Alión Vega Sicilia Ribera del Duero 2019', en: 'Alión Vega Sicilia Ribera del Duero 2019', fr: 'Alión Vega Sicilia Ribera del Duero 2019', zh: 'Alión Vega Sicilia Ribera del Duero 2019' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 18500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-valbuena-vega-sicilia-2019', categoryId: 'wines-red-world', name: { pt: 'Valbuena 5° Vega Sicilia Ribera del Duero 2019', en: 'Valbuena 5° Vega Sicilia Ribera del Duero 2019', fr: 'Valbuena 5° Vega Sicilia Ribera del Duero 2019', zh: 'Valbuena 5° Vega Sicilia Ribera del Duero 2019' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 28000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature'], available: true },
  { id: 'wine-red-vega-sicilia-unico-2014', categoryId: 'wines-red-world', name: { pt: 'Vega Sicilia Único Ribera del Duero 2014', en: 'Vega Sicilia Único Ribera del Duero 2014', fr: 'Vega Sicilia Único Ribera del Duero 2014', zh: 'Vega Sicilia Único Ribera del Duero 2014' }, description: { pt: 'Espanha', en: 'Spain', fr: 'Espagne', zh: '西班牙' }, price: 65000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },

  // ─── França ───
  { id: 'wine-red-chapoutier-cotes-rhone-2022', categoryId: 'wines-red-world', name: { pt: 'M. Chapoutier Côtes-du-Rhône 2022', en: 'M. Chapoutier Côtes-du-Rhône 2022', fr: 'M. Chapoutier Côtes-du-Rhône 2022', zh: 'M. Chapoutier Côtes-du-Rhône 2022' }, description: { pt: 'França', en: 'France', fr: 'France', zh: '法国' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-senechaux-chateauneuf-2015', categoryId: 'wines-red-world', name: { pt: 'Domaine des Sénéchaux Châteauneuf-du-Pape 2015', en: 'Domaine des Sénéchaux Châteauneuf-du-Pape 2015', fr: 'Domaine des Sénéchaux Châteauneuf-du-Pape 2015', zh: 'Domaine des Sénéchaux Châteauneuf-du-Pape 2015' }, description: { pt: 'França', en: 'France', fr: 'France', zh: '法国' }, price: 9200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-chateau-pavie-2010', categoryId: 'wines-red-world', name: { pt: 'Château Pavie 1er Grand Cru Classé B 2010', en: 'Château Pavie 1er Grand Cru Classé B 2010', fr: 'Château Pavie 1er Grand Cru Classé B 2010', zh: 'Château Pavie 1er Grand Cru Classé B 2010' }, description: { pt: 'França', en: 'France', fr: 'France', zh: '法国' }, price: 85000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },
  { id: 'wine-red-chateau-margaux-2012', categoryId: 'wines-red-world', name: { pt: 'Château Margaux 1er Grand Cru Classé 2012', en: 'Château Margaux 1er Grand Cru Classé 2012', fr: 'Château Margaux 1er Grand Cru Classé 2012', zh: 'Château Margaux 1er Grand Cru Classé 2012' }, description: { pt: 'França', en: 'France', fr: 'France', zh: '法国' }, price: 126000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },

  // ─── Itália ───
  { id: 'wine-red-nebbiolo-alba-sandrone-2020', categoryId: 'wines-red-world', name: { pt: "Nebbiolo d'Alba Valmaggiore Sandrone 2020", en: "Nebbiolo d'Alba Valmaggiore Sandrone 2020", fr: "Nebbiolo d'Alba Valmaggiore Sandrone 2020", zh: "Nebbiolo d'Alba Valmaggiore Sandrone 2020" }, description: { pt: 'Itália', en: 'Italy', fr: 'Italie', zh: '意大利' }, price: 11000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-brunello-montalcino-2016', categoryId: 'wines-red-world', name: { pt: 'Brunello di Montalcino Poggio Landi 2016', en: 'Brunello di Montalcino Poggio Landi 2016', fr: 'Brunello di Montalcino Poggio Landi 2016', zh: 'Brunello di Montalcino Poggio Landi 2016' }, description: { pt: 'Itália', en: 'Italy', fr: 'Italie', zh: '意大利' }, price: 13000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-red-tignanello-toscana-2020', categoryId: 'wines-red-world', name: { pt: 'Tignanello Toscana 2020', en: 'Tignanello Toscana 2020', fr: 'Tignanello Toscana 2020', zh: 'Tignanello Toscana 2020' }, description: { pt: 'Itália', en: 'Italy', fr: 'Italie', zh: '意大利' }, price: 38500, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature'], available: true },
  { id: 'wine-red-sassicaia-2019', categoryId: 'wines-red-world', name: { pt: 'Sassicaia Tenuta San Guido 2019', en: 'Sassicaia Tenuta San Guido 2019', fr: 'Sassicaia Tenuta San Guido 2019', zh: 'Sassicaia Tenuta San Guido 2019' }, description: { pt: 'Itália', en: 'Italy', fr: 'Italie', zh: '意大利' }, price: 85000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },

  // ─── EUA ───
  { id: 'wine-red-cigare-volant-2021', categoryId: 'wines-red-world', name: { pt: 'Le Cigare Volant Bonny Doon Vineyard 2021', en: 'Le Cigare Volant Bonny Doon Vineyard 2021', fr: 'Le Cigare Volant Bonny Doon Vineyard 2021', zh: 'Le Cigare Volant Bonny Doon Vineyard 2021' }, description: { pt: 'EUA', en: 'USA', fr: 'États-Unis', zh: '美国' }, price: 6000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-directors-cut-coppola-2018', categoryId: 'wines-red-world', name: { pt: "Director's Cut Zinfandel Francis Ford Coppola 2018", en: "Director's Cut Zinfandel Francis Ford Coppola 2018", fr: "Director's Cut Zinfandel Francis Ford Coppola 2018", zh: "Director's Cut Zinfandel Francis Ford Coppola 2018" }, description: { pt: 'EUA', en: 'USA', fr: 'États-Unis', zh: '美国' }, price: 9800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-red-georges-latour-beaulieu-2008', categoryId: 'wines-red-world', name: { pt: 'Georges de Latour Private Reserve Beaulieu Vineyard 2008', en: 'Georges de Latour Private Reserve Beaulieu Vineyard 2008', fr: 'Georges de Latour Private Reserve Beaulieu Vineyard 2008', zh: 'Georges de Latour Private Reserve Beaulieu Vineyard 2008' }, description: { pt: 'EUA', en: 'USA', fr: 'États-Unis', zh: '美国' }, price: 32500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHOS BRANCOS (21 items + 2 house selection)
  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Vinho Verde ───
  { id: 'wine-white-angelmo-mendes-muros-antigos', categoryId: 'wines-white', name: { pt: 'Angelmo Mendes Muros Antigos Escolha', en: 'Angelmo Mendes Muros Antigos Escolha', fr: 'Angelmo Mendes Muros Antigos Escolha', zh: 'Angelmo Mendes Muros Antigos Escolha' }, description: { pt: 'Vinho Verde', en: 'Vinho Verde', fr: 'Vinho Verde', zh: 'Vinho Verde' }, price: 2800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-so-alvarinho', categoryId: 'wines-white', name: { pt: 'Só Álvarinho', en: 'Só Álvarinho', fr: 'Só Álvarinho', zh: 'Só Álvarinho' }, description: { pt: 'Vinho Verde', en: 'Vinho Verde', fr: 'Vinho Verde', zh: 'Vinho Verde' }, price: 2800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-soalheiro-granit', categoryId: 'wines-white', name: { pt: 'Soalheiro Granit', en: 'Soalheiro Granit', fr: 'Soalheiro Granit', zh: 'Soalheiro Granit' }, description: { pt: 'Vinho Verde', en: 'Vinho Verde', fr: 'Vinho Verde', zh: 'Vinho Verde' }, price: 3200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-soalheiro-alvarinho', categoryId: 'wines-white', name: { pt: 'Soalheiro Álvarinho', en: 'Soalheiro Álvarinho', fr: 'Soalheiro Álvarinho', zh: 'Soalheiro Álvarinho' }, description: { pt: 'Vinho Verde', en: 'Vinho Verde', fr: 'Vinho Verde', zh: 'Vinho Verde' }, price: 3300, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Douro ───
  { id: 'wine-white-planalto', categoryId: 'wines-white', name: { pt: 'Planalto', en: 'Planalto', fr: 'Planalto', zh: 'Planalto' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-carm', categoryId: 'wines-white', name: { pt: 'Carm', en: 'Carm', fr: 'Carm', zh: 'Carm' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-duas-quintas', categoryId: 'wines-white', name: { pt: 'Duas Quintas', en: 'Duas Quintas', fr: 'Duas Quintas', zh: 'Duas Quintas' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 2800, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-cottage-wines', categoryId: 'wines-white', name: { pt: 'Cottage Wines', en: 'Cottage Wines', fr: 'Cottage Wines', zh: 'Cottage Wines' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-espinho-reserva', categoryId: 'wines-white', name: { pt: 'Espinho Reserva', en: 'Espinho Reserva', fr: 'Espinho Reserva', zh: 'Espinho Reserva' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3100, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-vale-dona-maria-sabor', categoryId: 'wines-white', name: { pt: 'Vale Dona Maria Vinhas do Sabor', en: 'Vale Dona Maria Vinhas do Sabor', fr: 'Vale Dona Maria Vinhas do Sabor', zh: 'Vale Dona Maria Vinhas do Sabor' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-carm-reserva', categoryId: 'wines-white', name: { pt: 'Carm Reserva', en: 'Carm Reserva', fr: 'Carm Reserva', zh: 'Carm Reserva' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Dão ───
  { id: 'wine-white-camelias-encruzado', categoryId: 'wines-white', name: { pt: 'Quinta das Camélias Reserva Encruzado', en: 'Quinta das Camélias Reserva Encruzado', fr: 'Quinta das Camélias Reserva Encruzado', zh: 'Quinta das Camélias Reserva Encruzado' }, description: { pt: 'Dão', en: 'Dão', fr: 'Dão', zh: 'Dão' }, price: 2500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Bairrada ───
  { id: 'wine-white-luis-pato-vinhas-velhas', categoryId: 'wines-white', name: { pt: 'Luis Pato Vinhas Velhas', en: 'Luis Pato Vinhas Velhas', fr: 'Luis Pato Vinhas Velhas', zh: 'Luis Pato Vinhas Velhas' }, description: { pt: 'Bairrada', en: 'Bairrada', fr: 'Bairrada', zh: 'Bairrada' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Beira Interior ───
  { id: 'wine-white-castelo-rodrigo', categoryId: 'wines-white', name: { pt: 'Marquês de Castelo Rodrigo', en: 'Marquês de Castelo Rodrigo', fr: 'Marquês de Castelo Rodrigo', zh: 'Marquês de Castelo Rodrigo' }, description: { pt: 'Beira Interior', en: 'Beira Interior', fr: 'Beira Interior', zh: 'Beira Interior' }, price: 2500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Tejo / Setúbal ───
  { id: 'wine-white-malvasia-colares', categoryId: 'wines-white', name: { pt: 'Malvasia Colares', en: 'Malvasia Colares', fr: 'Malvasia Colares', zh: 'Malvasia Colares' }, description: { pt: 'Tejo / Península de Setúbal', en: 'Tejo / Setúbal Peninsula', fr: 'Tejo / Péninsule de Setúbal', zh: '特茹 / 塞图巴尔半岛' }, price: 4000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Alentejo ───
  { id: 'wine-white-quinta-do-carmo', categoryId: 'wines-white', name: { pt: 'Quinta do Carmo', en: 'Quinta do Carmo', fr: 'Quinta do Carmo', zh: 'Quinta do Carmo' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-cartuxa', categoryId: 'wines-white', name: { pt: 'Cartuxa', en: 'Cartuxa', fr: 'Cartuxa', zh: 'Cartuxa' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-joaquim-madeira', categoryId: 'wines-white', name: { pt: 'Joaquim Madeira', en: 'Joaquim Madeira', fr: 'Joaquim Madeira', zh: 'Joaquim Madeira' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 2500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-pera-manca-white', categoryId: 'wines-white', name: { pt: 'Pêra Manca Branco', en: 'Pêra Manca White', fr: 'Pêra Manca Blanc', zh: 'Pêra Manca 白葡萄酒' }, description: { pt: 'Alentejo', en: 'Alentejo', fr: 'Alentejo', zh: 'Alentejo' }, price: 11500, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature'], available: true },

  // ─── Mundo ───
  { id: 'wine-white-villa-maria-sauv-blanc', categoryId: 'wines-white', name: { pt: 'Villa Maria Organic Sauvignon Blanc', en: 'Villa Maria Organic Sauvignon Blanc', fr: 'Villa Maria Organic Sauvignon Blanc', zh: 'Villa Maria Organic Sauvignon Blanc' }, description: { pt: 'Nova Zelândia', en: 'New Zealand', fr: 'Nouvelle-Zélande', zh: '新西兰' }, price: 3200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-riesling-alsace', categoryId: 'wines-white', name: { pt: "Riesling Vin d'Alsace", en: "Riesling Vin d'Alsace", fr: "Riesling Vin d'Alsace", zh: "Riesling Vin d'Alsace" }, description: { pt: 'França', en: 'France', fr: 'France', zh: '法国' }, price: 2200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ─── Seleção da Casa (garrafa branco) ───
  { id: 'wine-white-paulo-laureano-caricatura-bottle', categoryId: 'wines-white', name: { pt: 'Paulo Laureano Caricatura (Garrafa)', en: 'Paulo Laureano Caricatura (Bottle)', fr: 'Paulo Laureano Caricatura (Bouteille)', zh: 'Paulo Laureano Caricatura（瓶装）' }, description: { pt: 'Alentejo — Seleção da Casa', en: 'Alentejo — House Selection', fr: 'Alentejo — Sélection Maison', zh: 'Alentejo — 本店精选' }, price: 2300, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-white-oliveirinha-alves-sousa-bottle', categoryId: 'wines-white', name: { pt: 'Quinta da Oliveirinha Eng° Alves de Sousa (Garrafa)', en: 'Quinta da Oliveirinha Eng° Alves de Sousa (Bottle)', fr: 'Quinta da Oliveirinha Eng° Alves de Sousa (Bouteille)', zh: 'Quinta da Oliveirinha Eng° Alves de Sousa（瓶装）' }, description: { pt: 'Douro — Seleção da Casa', en: 'Douro — House Selection', fr: 'Douro — Sélection Maison', zh: 'Douro — 本店精选' }, price: 2500, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHOS ROSÉ (2 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'wine-rose-redoma-niepoort', categoryId: 'wines-rose', name: { pt: 'Redoma Rosé Niepoort', en: 'Redoma Rosé Niepoort', fr: 'Redoma Rosé Niepoort', zh: 'Redoma Rosé Niepoort' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 3200, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-rose-celeste-gaivosa', categoryId: 'wines-rose', name: { pt: 'Celeste Gaivosa', en: 'Celeste Gaivosa', fr: 'Celeste Gaivosa', zh: 'Celeste Gaivosa' }, description: { pt: 'Douro', en: 'Douro', fr: 'Douro', zh: 'Douro' }, price: 6600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESPUMANTES & CHAMPAGNE (10 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'wine-sparkling-terras-demo-malvasia', categoryId: 'wines-sparkling', name: { pt: 'Terras do Demo Malvasia Fina', en: 'Terras do Demo Malvasia Fina', fr: 'Terras do Demo Malvasia Fina', zh: 'Terras do Demo Malvasia Fina' }, description: { pt: 'Espumante — Portugal', en: 'Sparkling — Portugal', fr: 'Mousseux — Portugal', zh: '起泡酒 — 葡萄牙' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-sparkling-terras-demo-rose', categoryId: 'wines-sparkling', name: { pt: 'Terras do Demo Rosé', en: 'Terras do Demo Rosé', fr: 'Terras do Demo Rosé', zh: 'Terras do Demo Rosé' }, description: { pt: 'Espumante Rosé — Portugal', en: 'Sparkling Rosé — Portugal', fr: 'Mousseux Rosé — Portugal', zh: '桃红起泡酒 — 葡萄牙' }, price: 2600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-sparkling-freixenet-cordon-negro', categoryId: 'wines-sparkling', name: { pt: 'Freixenet Cordón Negro', en: 'Freixenet Cordón Negro', fr: 'Freixenet Cordón Negro', zh: 'Freixenet Cordón Negro' }, description: { pt: 'Cava — Espanha', en: 'Cava — Spain', fr: 'Cava — Espagne', zh: 'Cava — 西班牙' }, price: 3600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-sparkling-monteirinhos-blanc-noirs', categoryId: 'wines-sparkling', name: { pt: 'Quinta dos Monteirinhos Blanc de Noirs', en: 'Quinta dos Monteirinhos Blanc de Noirs', fr: 'Quinta dos Monteirinhos Blanc de Noirs', zh: 'Quinta dos Monteirinhos Blanc de Noirs' }, description: { pt: 'Espumante — Portugal', en: 'Sparkling — Portugal', fr: 'Mousseux — Portugal', zh: '起泡酒 — 葡萄牙' }, price: 3100, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-sparkling-soalheiro', categoryId: 'wines-sparkling', name: { pt: 'Soalheiro', en: 'Soalheiro', fr: 'Soalheiro', zh: 'Soalheiro' }, description: { pt: 'Espumante — Portugal', en: 'Sparkling — Portugal', fr: 'Mousseux — Portugal', zh: '起泡酒 — 葡萄牙' }, price: 4600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-sparkling-gh-mumm-brut', categoryId: 'wines-sparkling', name: { pt: 'G.H. Mumm Brut', en: 'G.H. Mumm Brut', fr: 'G.H. Mumm Brut', zh: 'G.H. Mumm Brut' }, description: { pt: 'Champagne — França', en: 'Champagne — France', fr: 'Champagne — France', zh: '香槟 — 法国' }, price: 8500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-sparkling-moet-brut-imperial', categoryId: 'wines-sparkling', name: { pt: 'Moët & Chandon Brut Impérial', en: 'Moët & Chandon Brut Impérial', fr: 'Moët & Chandon Brut Impérial', zh: 'Moët & Chandon Brut Impérial' }, description: { pt: 'Champagne — França', en: 'Champagne — France', fr: 'Champagne — France', zh: '香槟 — 法国' }, price: 9500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-sparkling-laurent-perrier-brut', categoryId: 'wines-sparkling', name: { pt: 'Laurent Perrier Brut', en: 'Laurent Perrier Brut', fr: 'Laurent Perrier Brut', zh: 'Laurent Perrier Brut' }, description: { pt: 'Champagne — França', en: 'Champagne — France', fr: 'Champagne — France', zh: '香槟 — 法国' }, price: 12000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-sparkling-ruinart-blanc-blancs', categoryId: 'wines-sparkling', name: { pt: 'Ruinart Blanc de Blancs', en: 'Ruinart Blanc de Blancs', fr: 'Ruinart Blanc de Blancs', zh: 'Ruinart Blanc de Blancs' }, description: { pt: 'Champagne — França', en: 'Champagne — France', fr: 'Champagne — France', zh: '香槟 — 法国' }, price: 18500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-sparkling-dom-perignon-2013', categoryId: 'wines-sparkling', name: { pt: 'Dom Pérignon Vintage 2013', en: 'Dom Pérignon Vintage 2013', fr: 'Dom Pérignon Vintage 2013', zh: 'Dom Pérignon Vintage 2013' }, description: { pt: 'Champagne — França', en: 'Champagne — France', fr: 'Champagne — France', zh: '香槟 — 法国' }, price: 60000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature', 'gold'], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHOS FORTIFICADOS (8 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'wine-port-dows-white-tawny-ruby', categoryId: 'wines-fortified', name: { pt: "Porto Dow's White / Tawny / Ruby", en: "Dow's Port White / Tawny / Ruby", fr: "Porto Dow's Blanc / Tawny / Ruby", zh: "Dow's 波特酒（白/茶/宝石红）" }, description: { pt: 'Porto', en: 'Port', fr: 'Porto', zh: '波特酒' }, price: 700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-port-lbv-2015', categoryId: 'wines-fortified', name: { pt: 'Porto LBV 2015', en: 'Port LBV 2015', fr: 'Porto LBV 2015', zh: 'LBV 波特酒 2015' }, description: { pt: 'Porto', en: 'Port', fr: 'Porto', zh: '波特酒' }, price: 1000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-madeira-verdelho-5y-barbeito-2013', categoryId: 'wines-fortified', name: { pt: 'Madeira Verdelho 5 Anos Medium Dry Barbeito 2013', en: 'Madeira Verdelho 5 Years Medium Dry Barbeito 2013', fr: 'Madeira Verdelho 5 Ans Medium Dry Barbeito 2013', zh: 'Madeira Verdelho 5 年中干 Barbeito 2013' }, description: { pt: 'Madeira', en: 'Madeira', fr: 'Madère', zh: '马德拉' }, price: 1600, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-madeira-verdelho-10y-barbeito', categoryId: 'wines-fortified', name: { pt: 'Madeira Verdelho 10 Anos Medium Dry Barbeito', en: 'Madeira Verdelho 10 Years Medium Dry Barbeito', fr: 'Madeira Verdelho 10 Ans Medium Dry Barbeito', zh: 'Madeira Verdelho 10 年中干 Barbeito' }, description: { pt: 'Madeira', en: 'Madeira', fr: 'Madère', zh: '马德拉' }, price: 2000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-madeira-dry-sercial-1930', categoryId: 'wines-fortified', name: { pt: 'Madeira Dry Sercial 1930', en: 'Madeira Dry Sercial 1930', fr: 'Madeira Dry Sercial 1930', zh: 'Madeira Dry Sercial 1930' }, description: { pt: 'Madeira', en: 'Madeira', fr: 'Madère', zh: '马德拉' }, price: 10000, image: '/menu/placeholder-wine.jpg', tags: ['premium', 'signature'], available: true },
  { id: 'wine-port-tawny-20-dows', categoryId: 'wines-fortified', name: { pt: "Tawny Port 20 Anos Dow's", en: "Tawny Port 20 Years Dow's", fr: "Porto Tawny 20 Ans Dow's", zh: "Dow's 20 年茶色波特酒" }, description: { pt: 'Porto', en: 'Port', fr: 'Porto', zh: '波特酒' }, price: 2000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'wine-port-tawny-40-vallado', categoryId: 'wines-fortified', name: { pt: 'Tawny Port 40 Anos Vallado', en: 'Tawny Port 40 Years Vallado', fr: 'Porto Tawny 40 Ans Vallado', zh: 'Vallado 40 年茶色波特酒' }, description: { pt: 'Porto', en: 'Port', fr: 'Porto', zh: '波特酒' }, price: 3800, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'wine-port-vintage-gaivosa-2020', categoryId: 'wines-fortified', name: { pt: 'Porto Vintage Gaivosa 2020', en: 'Vintage Port Gaivosa 2020', fr: 'Porto Vintage Gaivosa 2020', zh: 'Gaivosa 年份波特酒 2020' }, description: { pt: 'Porto', en: 'Port', fr: 'Porto', zh: '波特酒' }, price: 11000, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINHO A COPO (9 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'glass-espumante-terras-demo', categoryId: 'wines-by-glass', name: { pt: 'Espumante Terras do Demo Malvasia Fina (Copo)', en: 'Sparkling Terras do Demo Malvasia Fina (Glass)', fr: 'Mousseux Terras do Demo Malvasia Fina (Verre)', zh: 'Terras do Demo Malvasia Fina 起泡酒（杯）' }, description: { pt: 'Espumante', en: 'Sparkling', fr: 'Mousseux', zh: '起泡酒' }, price: 1100, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-flute-champagne', categoryId: 'wines-by-glass', name: { pt: 'Flute de Champagne', en: 'Champagne Flute', fr: 'Flûte de Champagne', zh: '香槟杯' }, description: { pt: 'Champagne', en: 'Champagne', fr: 'Champagne', zh: '香槟' }, price: 3500, image: '/menu/placeholder-wine.jpg', tags: ['premium'], available: true },
  { id: 'glass-white-paulo-laureano', categoryId: 'wines-by-glass', name: { pt: 'Paulo Laureano Caricatura (Copo)', en: 'Paulo Laureano Caricatura (Glass)', fr: 'Paulo Laureano Caricatura (Verre)', zh: 'Paulo Laureano Caricatura（杯）' }, description: { pt: 'Branco — Alentejo', en: 'White — Alentejo', fr: 'Blanc — Alentejo', zh: '白葡萄酒 — Alentejo' }, price: 700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-white-oliveirinha', categoryId: 'wines-by-glass', name: { pt: 'Quinta da Oliveirinha Alves de Sousa Branco (Copo)', en: 'Quinta da Oliveirinha Alves de Sousa White (Glass)', fr: 'Quinta da Oliveirinha Alves de Sousa Blanc (Verre)', zh: 'Quinta da Oliveirinha Alves de Sousa 白（杯）' }, description: { pt: 'Branco — Douro', en: 'White — Douro', fr: 'Blanc — Douro', zh: '白葡萄酒 — Douro' }, price: 700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-white-villa-maria', categoryId: 'wines-by-glass', name: { pt: 'Villa Maria Organic Sauvignon Blanc (Copo)', en: 'Villa Maria Organic Sauvignon Blanc (Glass)', fr: 'Villa Maria Organic Sauvignon Blanc (Verre)', zh: 'Villa Maria Organic Sauvignon Blanc（杯）' }, description: { pt: 'Branco — Nova Zelândia', en: 'White — New Zealand', fr: 'Blanc — Nouvelle-Zélande', zh: '白葡萄酒 — 新西兰' }, price: 1000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-white-selection', categoryId: 'wines-by-glass', name: { pt: 'Copo Seleção — Branco', en: 'Glass Selection — White', fr: 'Verre Sélection — Blanc', zh: '精选杯 — 白葡萄酒' }, description: { pt: 'Branco', en: 'White', fr: 'Blanc', zh: '白葡萄酒' }, price: 1000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-red-paulo-laureano', categoryId: 'wines-by-glass', name: { pt: 'Paulo Laureano Caricatura (Copo)', en: 'Paulo Laureano Caricatura (Glass)', fr: 'Paulo Laureano Caricatura (Verre)', zh: 'Paulo Laureano Caricatura（杯）' }, description: { pt: 'Tinto — Alentejo', en: 'Red — Alentejo', fr: 'Rouge — Alentejo', zh: '红葡萄酒 — Alentejo' }, price: 700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-red-oliveirinha', categoryId: 'wines-by-glass', name: { pt: 'Quinta da Oliveirinha Alves de Sousa Tinto (Copo)', en: 'Quinta da Oliveirinha Alves de Sousa Red (Glass)', fr: 'Quinta da Oliveirinha Alves de Sousa Rouge (Verre)', zh: 'Quinta da Oliveirinha Alves de Sousa 红（杯）' }, description: { pt: 'Tinto — Douro', en: 'Red — Douro', fr: 'Rouge — Douro', zh: '红葡萄酒 — Douro' }, price: 700, image: '/menu/placeholder-wine.jpg', tags: [], available: true },
  { id: 'glass-red-selection', categoryId: 'wines-by-glass', name: { pt: 'Copo Seleção — Tinto', en: 'Glass Selection — Red', fr: 'Verre Sélection — Rouge', zh: '精选杯 — 红葡萄酒' }, description: { pt: 'Tinto', en: 'Red', fr: 'Rouge', zh: '红葡萄酒' }, price: 1000, image: '/menu/placeholder-wine.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // COCKTAILS — SIGNATURE (6 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'cocktail-margarita', categoryId: 'cocktails', name: { pt: 'Margarita', en: 'Margarita', fr: 'Margarita', zh: '玛格丽特' }, description: { pt: 'Tequila, Cointreau, Lima', en: 'Tequila, Cointreau, Lime', fr: 'Tequila, Cointreau, Citron Vert', zh: '龙舌兰、君度、青柠' }, price: 1100, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'cocktail-passion-margarita', categoryId: 'cocktails', name: { pt: 'Margarita de Maracujá', en: 'Passion Fruit Margarita', fr: 'Margarita Fruit de la Passion', zh: '百香果玛格丽特' }, description: { pt: 'Tequila, Cointreau, Lima, Maracujá', en: 'Tequila, Cointreau, Lime, Passion Fruit', fr: 'Tequila, Cointreau, Citron Vert, Fruit de la Passion', zh: '龙舌兰、君度、青柠、百香果' }, price: 1300, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'cocktail-mojito', categoryId: 'cocktails', name: { pt: 'Mojito', en: 'Mojito', fr: 'Mojito', zh: '莫吉托' }, description: { pt: 'Rum Branco, Menta, Açúcar, Lima, Soda', en: 'White Rum, Mint, Sugar, Lime, Soda', fr: 'Rhum Blanc, Menthe, Sucre, Citron Vert, Soda', zh: '白朗姆、薄荷、糖、青柠、苏打' }, price: 1100, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'cocktail-passion-mojito', categoryId: 'cocktails', name: { pt: 'Mojito de Maracujá', en: 'Passion Fruit Mojito', fr: 'Mojito Fruit de la Passion', zh: '百香果莫吉托' }, description: { pt: 'Rum Branco, Menta, Açúcar, Lima, Maracujá, Soda', en: 'White Rum, Mint, Sugar, Lime, Passion Fruit, Soda', fr: 'Rhum Blanc, Menthe, Sucre, Citron Vert, Fruit de la Passion, Soda', zh: '白朗姆、薄荷、糖、青柠、百香果、苏打' }, price: 1300, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'cocktail-caipirinha', categoryId: 'cocktails', name: { pt: 'Caipirinha', en: 'Caipirinha', fr: 'Caipirinha', zh: '卡琵莉亚' }, description: { pt: 'Lima, Cachaça, Açúcar', en: 'Lime, Cachaça, Sugar', fr: 'Citron Vert, Cachaça, Sucre', zh: '青柠、卡莎萨、糖' }, price: 1100, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'cocktail-caipiroska', categoryId: 'cocktails', name: { pt: 'Caipiroska / Morangoska', en: 'Caipiroska / Strawberry', fr: 'Caipiroska / Fraise', zh: '卡琵罗斯卡 / 草莓' }, description: { pt: 'Lima, Morango, Vodka, Açúcar. Outros sabores: Kiwi, Maracujá, Goiaba.', en: 'Lime, Strawberry, Vodka, Sugar. Other flavours: Kiwi, Passion Fruit, Guava.', fr: 'Citron Vert, Fraise, Vodka, Sucre. Autres saveurs : Kiwi, Fruit de la Passion, Goyave.', zh: '青柠、草莓、伏特加、糖。其他口味：奇异果、百香果、番石榴。' }, price: 1300, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // COCKTAILS — CLASSICS (12 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'cocktail-manhattan', categoryId: 'cocktails', name: { pt: 'Manhattan', en: 'Manhattan', fr: 'Manhattan', zh: '曼哈顿' }, description: { pt: 'Whisky Bourbon, Vermouth, Angostura', en: 'Bourbon Whisky, Vermouth, Angostura', fr: 'Whisky Bourbon, Vermouth, Angostura', zh: '波本威士忌、味美思、安格斯图拉' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-negroni', categoryId: 'cocktails', name: { pt: 'Negroni', en: 'Negroni', fr: 'Negroni', zh: '内格罗尼' }, description: { pt: 'Gin, Vermouth, Campari', en: 'Gin, Vermouth, Campari', fr: 'Gin, Vermouth, Campari', zh: '金酒、味美思、金巴利' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-old-fashioned', categoryId: 'cocktails', name: { pt: 'Old Fashioned', en: 'Old Fashioned', fr: 'Old Fashioned', zh: '古典鸡尾酒' }, description: { pt: 'Bourbon, Açúcar, Bitters, Zeste de Laranja', en: 'Bourbon, Sugar, Bitters, Orange Zest', fr: "Bourbon, Sucre, Bitters, Zeste d'Orange", zh: '波本、糖、苦精、橙皮' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-kir-royal', categoryId: 'cocktails', name: { pt: 'Kir Royal', en: 'Kir Royal', fr: 'Kir Royal', zh: '皇家基尔' }, description: { pt: 'Espumante, Crème de Cassis', en: 'Sparkling Wine, Crème de Cassis', fr: 'Mousseux, Crème de Cassis', zh: '起泡酒、黑加仑利口酒' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-rin', categoryId: 'cocktails', name: { pt: 'Rin', en: 'Rin', fr: 'Rin', zh: 'Rin' }, description: { pt: 'Espumante, Puré de Morango', en: 'Sparkling Wine, Strawberry Purée', fr: 'Mousseux, Purée de Fraise', zh: '起泡酒、草莓泥' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-mimosa', categoryId: 'cocktails', name: { pt: 'Mimosa', en: 'Mimosa', fr: 'Mimosa', zh: '含羞草' }, description: { pt: 'Espumante, Sumo de Laranja', en: 'Sparkling Wine, Orange Juice', fr: "Mousseux, Jus d'Orange", zh: '起泡酒、橙汁' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-americano', categoryId: 'cocktails', name: { pt: 'Americano', en: 'Americano', fr: 'Americano', zh: '美国佬' }, description: { pt: 'Campari, Vermouth, Gasosa', en: 'Campari, Vermouth, Soda Water', fr: 'Campari, Vermouth, Eau Gazeuse', zh: '金巴利、味美思、苏打水' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-aperol-spritz', categoryId: 'cocktails', name: { pt: 'Aperol Spritz', en: 'Aperol Spritz', fr: 'Aperol Spritz', zh: '阿佩罗汽酒' }, description: { pt: 'Aperol, Soda, Espumante', en: 'Aperol, Soda, Sparkling Wine', fr: 'Aperol, Soda, Mousseux', zh: '阿佩罗、苏打、起泡酒' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-dry-martini', categoryId: 'cocktails', name: { pt: 'Dry Martini', en: 'Dry Martini', fr: 'Dry Martini', zh: '干马提尼' }, description: { pt: 'Gin, Martini Dry Bianco', en: 'Gin, Martini Dry Bianco', fr: 'Gin, Martini Dry Bianco', zh: '金酒、干马提尼' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-pina-colada', categoryId: 'cocktails', name: { pt: 'Piña Colada', en: 'Piña Colada', fr: 'Piña Colada', zh: '椰林飘香' }, description: { pt: 'Rum Branco, Ananás, Leite de Côco', en: 'White Rum, Pineapple, Coconut Milk', fr: 'Rhum Blanc, Ananas, Lait de Coco', zh: '白朗姆、菠萝、椰奶' }, price: 1300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-espresso-martini', categoryId: 'cocktails', name: { pt: 'Expresso Martini', en: 'Espresso Martini', fr: 'Espresso Martini', zh: '浓缩咖啡马提尼' }, description: { pt: 'Vodka, Licor de Café, Café', en: 'Vodka, Coffee Liqueur, Coffee', fr: 'Vodka, Liqueur de Café, Café', zh: '伏特加、咖啡利口酒、咖啡' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-irish-coffee', categoryId: 'cocktails', name: { pt: 'Irish Coffee', en: 'Irish Coffee', fr: 'Irish Coffee', zh: '爱尔兰咖啡' }, description: { pt: 'Whisky Irlandês, Café, Chantilly', en: 'Irish Whiskey, Coffee, Whipped Cream', fr: 'Whisky Irlandais, Café, Chantilly', zh: '爱尔兰威士忌、咖啡、鲜奶油' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOURS (2 items — classificados como cocktails clássicos)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'cocktail-pisco-sour', categoryId: 'cocktails', name: { pt: 'Pisco Sour', en: 'Pisco Sour', fr: 'Pisco Sour', zh: '皮斯科酸酒' }, description: { pt: 'Pisco, Açúcar, Sumo de Lima, Clara de Ovo', en: 'Pisco, Sugar, Lime Juice, Egg White', fr: 'Pisco, Sucre, Jus de Citron Vert, Blanc d’Œuf', zh: '皮斯科、糖、青柠汁、蛋白' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'cocktail-whisky-sour', categoryId: 'cocktails', name: { pt: 'Whisky Sour', en: 'Whisky Sour', fr: 'Whisky Sour', zh: '威士忌酸酒' }, description: { pt: 'Whisky, Açúcar, Sumo de Lima, Clara de Ovo', en: 'Whisky, Sugar, Lime Juice, Egg White', fr: 'Whisky, Sucre, Jus de Citron Vert, Blanc d’Œuf', zh: '威士忌、糖、青柠汁、蛋白' }, price: 1200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // SANGRIAS (4 items — cada uma em garrafa e 2 L)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'sangria-latina-bottle', categoryId: 'sangrias', name: { pt: 'Sangria Latina (Garrafa)', en: 'Latina Sangria (Bottle)', fr: 'Sangria Latina (Bouteille)', zh: 'Latina 桑格利亚（瓶装）' }, description: { pt: 'Frutos Tropicais, Maracujá, Vodka, Rum, Espumante', en: 'Tropical Fruits, Passion Fruit, Vodka, Rum, Sparkling Wine', fr: 'Fruits Tropicaux, Fruit de la Passion, Vodka, Rhum, Mousseux', zh: '热带水果、百香果、伏特加、朗姆酒、起泡酒' }, price: 2400, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'sangria-latina-2l', categoryId: 'sangrias', name: { pt: 'Sangria Latina (2 L)', en: 'Latina Sangria (2 L)', fr: 'Sangria Latina (2 L)', zh: 'Latina 桑格利亚（2 升）' }, description: { pt: 'Frutos Tropicais, Maracujá, Vodka, Rum, Espumante', en: 'Tropical Fruits, Passion Fruit, Vodka, Rum, Sparkling Wine', fr: 'Fruits Tropicaux, Fruit de la Passion, Vodka, Rhum, Mousseux', zh: '热带水果、百香果、伏特加、朗姆酒、起泡酒' }, price: 3800, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'sangria-red-lips-bottle', categoryId: 'sangrias', name: { pt: 'Sangria Red Lips (Garrafa)', en: 'Red Lips Sangria (Bottle)', fr: 'Sangria Red Lips (Bouteille)', zh: 'Red Lips 桑格利亚（瓶装）' }, description: { pt: 'Frutos Vermelhos, Vodka, Gin, Espumante', en: 'Red Berries, Vodka, Gin, Sparkling Wine', fr: 'Fruits Rouges, Vodka, Gin, Mousseux', zh: '红色莓果、伏特加、金酒、起泡酒' }, price: 2200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'sangria-red-lips-2l', categoryId: 'sangrias', name: { pt: 'Sangria Red Lips (2 L)', en: 'Red Lips Sangria (2 L)', fr: 'Sangria Red Lips (2 L)', zh: 'Red Lips 桑格利亚（2 升）' }, description: { pt: 'Frutos Vermelhos, Vodka, Gin, Espumante', en: 'Red Berries, Vodka, Gin, Sparkling Wine', fr: 'Fruits Rouges, Vodka, Gin, Mousseux', zh: '红色莓果、伏特加、金酒、起泡酒' }, price: 3400, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOCKTAILS (4 items — sem álcool)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'mocktail-virgin-colada', categoryId: 'mocktails', name: { pt: 'Virgin Colada', en: 'Virgin Colada', fr: 'Virgin Colada', zh: '无酒精椰林飘香' }, description: { pt: 'Ananás, Leite de Côco', en: 'Pineapple, Coconut Milk', fr: 'Ananas, Lait de Coco', zh: '菠萝、椰奶' }, price: 980, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'mocktail-virgin-mojito', categoryId: 'mocktails', name: { pt: 'Virgin Mojito', en: 'Virgin Mojito', fr: 'Virgin Mojito', zh: '无酒精莫吉托' }, description: { pt: 'Maracujá, Sumo de Lima, Gasosa, Menta', en: 'Passion Fruit, Lime Juice, Soda, Mint', fr: 'Fruit de la Passion, Jus de Citron Vert, Soda, Menthe', zh: '百香果、青柠汁、苏打、薄荷' }, price: 990, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'mocktail-latina-splash', categoryId: 'mocktails', name: { pt: 'Latina Splash', en: 'Latina Splash', fr: 'Latina Splash', zh: 'Latina Splash' }, description: { pt: 'Xarope de Gengibre, Chá da Casa, Sumo de Lima. Sabores: Morango, Maracujá, Maçã Verde.', en: 'Ginger Syrup, Homemade Tea, Lime Juice. Flavours: Strawberry, Passion Fruit, Green Apple.', fr: 'Sirop de Gingembre, Thé Maison, Jus de Citron Vert. Saveurs : Fraise, Fruit de la Passion, Pomme Verte.', zh: '姜汁糖浆、自制茶、青柠汁。口味：草莓、百香果、青苹果。' }, price: 1100, image: '/menu/placeholder-drink.jpg', tags: ['signature'], available: true },
  { id: 'mocktail-homemade-lemonade', categoryId: 'mocktails', name: { pt: 'Limonada da Casa', en: 'Homemade Lemonade', fr: 'Limonade Maison', zh: '自制柠檬水' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 1000, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMOS NATURAIS (5 items — conforme a época)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'juice-orange', categoryId: 'natural-juices', name: { pt: 'Sumo de Laranja', en: 'Orange Juice', fr: "Jus d'Orange", zh: '鲜榨橙汁' }, description: { pt: 'Conforme a época', en: 'In season', fr: 'De saison', zh: '当季' }, price: 950, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'juice-watermelon', categoryId: 'natural-juices', name: { pt: 'Sumo de Melancia', en: 'Watermelon Juice', fr: "Jus de Pastèque", zh: '鲜榨西瓜汁' }, description: { pt: 'Conforme a época', en: 'In season', fr: 'De saison', zh: '当季' }, price: 950, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'juice-pineapple-mint', categoryId: 'natural-juices', name: { pt: 'Sumo de Ananás & Hortelã', en: 'Pineapple & Mint Juice', fr: 'Jus Ananas & Menthe', zh: '菠萝薄荷汁' }, description: { pt: 'Conforme a época', en: 'In season', fr: 'De saison', zh: '当季' }, price: 950, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'juice-passion-fruit', categoryId: 'natural-juices', name: { pt: 'Sumo de Maracujá', en: 'Passion Fruit Juice', fr: 'Jus de Fruit de la Passion', zh: '百香果汁' }, description: { pt: 'Conforme a época', en: 'In season', fr: 'De saison', zh: '当季' }, price: 950, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'juice-strawberry', categoryId: 'natural-juices', name: { pt: 'Sumo de Morango', en: 'Strawberry Juice', fr: 'Jus de Fraise', zh: '草莓汁' }, description: { pt: 'Conforme a época', en: 'In season', fr: 'De saison', zh: '当季' }, price: 950, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // ÁGUAS (5 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'water-house', categoryId: 'waters', name: { pt: 'Água da Casa', en: 'Bottle of Water', fr: 'Bouteille d’Eau', zh: '本店瓶装水' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 250, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'water-luso-1l', categoryId: 'waters', name: { pt: 'Água do Luso 1 L', en: 'Luso Water 1 L', fr: 'Eau Luso 1 L', zh: 'Luso 矿泉水 1 升' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 450, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'water-castelo', categoryId: 'waters', name: { pt: 'Água Castelo', en: 'Castelo Sparkling Water', fr: 'Eau Pétillante Castelo', zh: 'Castelo 气泡水' }, description: { pt: 'Com gás', en: 'Sparkling', fr: 'Pétillante', zh: '气泡' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'water-pedras', categoryId: 'waters', name: { pt: 'Água das Pedras', en: 'Pedras Sparkling Water', fr: 'Eau Pétillante Pedras', zh: 'Pedras 气泡水' }, description: { pt: 'Com gás', en: 'Sparkling', fr: 'Pétillante', zh: '气泡' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'water-luso-gas-1l', categoryId: 'waters', name: { pt: 'Água Luso com Gás 1 L', en: 'Luso Sparkling Water 1 L', fr: 'Eau Luso Pétillante 1 L', zh: 'Luso 气泡水 1 升' }, description: { pt: 'Com gás', en: 'Sparkling', fr: 'Pétillante', zh: '气泡' }, price: 450, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // CAFÉ & CHÁ (7 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'coffee-expresso', categoryId: 'coffee-tea', name: { pt: 'Expresso', en: 'Espresso', fr: 'Expresso', zh: '浓缩咖啡' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-decaf', categoryId: 'coffee-tea', name: { pt: 'Descafeinado', en: 'Decaffeinated', fr: 'Décaféiné', zh: '低因咖啡' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 200, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-double-expresso', categoryId: 'coffee-tea', name: { pt: 'Double Expresso', en: 'Double Espresso', fr: 'Double Expresso', zh: '双份浓缩' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-americano', categoryId: 'coffee-tea', name: { pt: 'Café Americano', en: 'Americano', fr: 'Café Americano', zh: '美式咖啡' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-cappuccino', categoryId: 'coffee-tea', name: { pt: 'Cappuccino', en: 'Cappuccino', fr: 'Cappuccino', zh: '卡布奇诺' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 450, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-latte', categoryId: 'coffee-tea', name: { pt: 'Latte', en: 'Latte', fr: 'Latte', zh: '拿铁' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 450, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'coffee-tea', categoryId: 'coffee-tea', name: { pt: 'Chá', en: 'Tea', fr: 'Thé', zh: '茶' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // REFRIGERANTES (8 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'soft-coca-cola', categoryId: 'soft-drinks', name: { pt: 'Coca-Cola', en: 'Coca-Cola', fr: 'Coca-Cola', zh: '可口可乐' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-coca-cola-zero', categoryId: 'soft-drinks', name: { pt: 'Coca-Cola Zero', en: 'Coca-Cola Zero', fr: 'Coca-Cola Zero', zh: '零度可口可乐' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-fanta', categoryId: 'soft-drinks', name: { pt: 'Fanta', en: 'Fanta', fr: 'Fanta', zh: '芬达' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-iced-tea', categoryId: 'soft-drinks', name: { pt: 'Iced Tea', en: 'Iced Tea', fr: 'Thé Glacé', zh: '冰茶' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-sprite', categoryId: 'soft-drinks', name: { pt: 'Sprite', en: 'Sprite', fr: 'Sprite', zh: '雪碧' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-ginger-ale', categoryId: 'soft-drinks', name: { pt: 'Ginger Ale', en: 'Ginger Ale', fr: 'Ginger Ale', zh: '姜汁汽水' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-ginger-beer', categoryId: 'soft-drinks', name: { pt: 'Ginger Beer', en: 'Ginger Beer', fr: 'Ginger Beer', zh: '姜汁啤酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'soft-red-bull', categoryId: 'soft-drinks', name: { pt: 'Red Bull', en: 'Red Bull', fr: 'Red Bull', zh: '红牛' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 450, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERVEJAS (6 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'beer-imperial', categoryId: 'beers', name: { pt: 'Imperial', en: 'Imperial', fr: 'Imperial', zh: 'Imperial' }, description: { pt: 'Pequena', en: 'Small', fr: 'Petite', zh: '小杯' }, price: 300, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'beer-tulipa', categoryId: 'beers', name: { pt: 'Tulipa', en: 'Tulipa', fr: 'Tulipa', zh: 'Tulipa' }, description: { pt: 'Média', en: 'Medium', fr: 'Moyenne', zh: '中杯' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'beer-caneca', categoryId: 'beers', name: { pt: 'Caneca', en: 'Caneca', fr: 'Caneca', zh: 'Caneca' }, description: { pt: 'Grande', en: 'Large', fr: 'Grande', zh: '大杯' }, price: 500, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'beer-sagres-preta', categoryId: 'beers', name: { pt: 'Sagres Preta', en: 'Sagres Dark Beer', fr: 'Sagres Brune', zh: 'Sagres 黑啤' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'beer-sagres-zero', categoryId: 'beers', name: { pt: 'Sagres 0%', en: 'Sagres 0%', fr: 'Sagres 0%', zh: 'Sagres 无酒精' }, description: { pt: 'Sem álcool', en: 'Alcohol-free', fr: 'Sans alcool', zh: '无酒精' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'beer-sidra-bandida', categoryId: 'beers', name: { pt: 'Sidra Bandida', en: 'Bandida Cider', fr: 'Cidre Bandida', zh: 'Bandida 苹果酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 350, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // APERITIVOS (8 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'aperitif-campari', categoryId: 'aperitifs', name: { pt: 'Campari', en: 'Campari', fr: 'Campari', zh: '金巴利' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 700, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-martini-ambrato', categoryId: 'aperitifs', name: { pt: 'Martini Ambrato', en: 'Martini Ambrato', fr: 'Martini Ambrato', zh: 'Martini Ambrato' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-martini-rosso', categoryId: 'aperitifs', name: { pt: 'Martini Rosso', en: 'Martini Rosso', fr: 'Martini Rosso', zh: 'Martini Rosso' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-martini-bianco', categoryId: 'aperitifs', name: { pt: 'Martini Bianco', en: 'Martini Bianco', fr: 'Martini Bianco', zh: 'Martini Bianco' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-moscatel-10', categoryId: 'aperitifs', name: { pt: 'Moscatel 10 Anos', en: 'Moscatel 10 Years', fr: 'Moscatel 10 Ans', zh: '10 年麝香酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-porto-chip-dry-white', categoryId: 'aperitifs', name: { pt: 'Porto Chip Dry White', en: 'Port Chip Dry White', fr: 'Porto Chip Dry White', zh: 'Chip Dry 白波特酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 1000, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-porto-tawny', categoryId: 'aperitifs', name: { pt: 'Porto Tawny', en: 'Port Tawny', fr: 'Porto Tawny', zh: '茶色波特酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 1000, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'aperitif-madeira-md', categoryId: 'aperitifs', name: { pt: 'Madeira MD', en: 'Madeira MD', fr: 'Madère MD', zh: 'Madeira MD' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 1000, image: '/menu/placeholder-drink.jpg', tags: [], available: true },

  // ═══════════════════════════════════════════════════════════════════════════
  // LICORES (11 items)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'liqueur-amaretto', categoryId: 'liqueurs', name: { pt: 'Amaretto', en: 'Amaretto', fr: 'Amaretto', zh: '杏仁甜酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-amendoa-amarga', categoryId: 'liqueurs', name: { pt: 'Amêndoa Amarga', en: 'Bitter Almond Liqueur', fr: 'Liqueur d’Amande Amère', zh: '苦杏仁利口酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-baileys', categoryId: 'liqueurs', name: { pt: 'Baileys', en: 'Baileys', fr: 'Baileys', zh: '百利甜酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-cointreau', categoryId: 'liqueurs', name: { pt: 'Cointreau', en: 'Cointreau', fr: 'Cointreau', zh: '君度橙酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-drambuie', categoryId: 'liqueurs', name: { pt: 'Drambuie', en: 'Drambuie', fr: 'Drambuie', zh: 'Drambuie 蜂蜜酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-fernet-branca', categoryId: 'liqueurs', name: { pt: 'Fernet Branca', en: 'Fernet Branca', fr: 'Fernet Branca', zh: 'Fernet Branca' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-ginja', categoryId: 'liqueurs', name: { pt: 'Ginja', en: 'Ginja (Sour Cherry Liqueur)', fr: 'Ginja (Liqueur de Griotte)', zh: 'Ginja 樱桃酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-jagermeister', categoryId: 'liqueurs', name: { pt: 'Jägermeister', en: 'Jägermeister', fr: 'Jägermeister', zh: '野格' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-beirao', categoryId: 'liqueurs', name: { pt: 'Licor Beirão', en: 'Licor Beirão', fr: 'Licor Beirão', zh: 'Beirão 利口酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-limoncello', categoryId: 'liqueurs', name: { pt: 'Limoncello', en: 'Limoncello', fr: 'Limoncello', zh: '柠檬甜酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
  { id: 'liqueur-malibu', categoryId: 'liqueurs', name: { pt: 'Malibu', en: 'Malibu', fr: 'Malibu', zh: 'Malibu 椰子酒' }, description: { pt: '', en: '', fr: '', zh: '' }, price: 800, image: '/menu/placeholder-drink.jpg', tags: [], available: true },
];
