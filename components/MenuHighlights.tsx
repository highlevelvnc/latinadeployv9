'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type Locale = 'pt' | 'en' | 'fr';
type WineCategory = 'tinto' | 'branco' | 'espumante' | 'rose';
type TabId = 'carta' | 'harmonizacoes' | 'selecao';
type LS = Record<Locale, string>; // LocalizedString shorthand

type Wine = {
  id: string;
  name: string;
  year: number;
  region: string;
  country: string;
  category: WineCategory;
  notes: LS;
  pairing: LS;
  image?: string; // Optional — provide when photo is available in /public
};

type Pairing = {
  id: string;
  badge: LS;
  meatTitle: LS;
  meatImage: string;
  wineNote: LS;
  wineImage: string;
  bridgeNote: LS;
};

// ═══════════════════════════════════════════════════════════════════════════════
//  WINE CATALOGUE
//  → Add new wines here as photos become available in /public
//  → Each Wine with an `image` field triggers a live preview on hover
// ═══════════════════════════════════════════════════════════════════════════════

const WINES: Wine[] = [

  // ── FRANCE ──────────────────────────────────────────────────────────────────

  {
    id: 'petrus-2021',
    name: 'Château Petrus',
    year: 2021,
    region: 'Pomerol',
    country: 'FR',
    category: 'tinto',
    notes: {
      pt: 'Merlot puro de Pomerol. Textura de veludo, taninos sedosos. Ameixa negra, trufas, cacau e minerais de argila. Concentração excepcional com precisão mineral única.',
      en: 'Pure Pomerol Merlot. Velvet texture, silky tannins. Black plum, truffle, cocoa and iron-rich clay minerals. Exceptional concentration with unrivalled mineral precision.',
      fr: "Merlot pur de Pomerol. Texture veloutée, tanins soyeux. Prune noire, truffe, cacao et minéraux d'argile. Concentration exceptionnelle, précision minérale sans égale.",
    },
    pairing: {
      pt: 'Tomahawk premium, Wagyu e cortes de maturação prolongada.',
      en: 'Premium Tomahawk, Wagyu and long dry-aged cuts.',
      fr: 'Tomahawk premium, Wagyu et pièces à maturation prolongée.',
    },
    image: '/vinhopetrvs.jpeg',
  },

  {
    id: 'leoville-barton-2018',
    name: 'Ch. Léoville-Barton',
    year: 2018,
    region: 'Saint-Julien',
    country: 'FR',
    category: 'tinto',
    notes: {
      pt: 'Grand Cru Classé de grande elegância. Cassis, cedro, lápis e tabaco. Taninos firmes e bem integrados, persistência notável e potencial de guarda excecional.',
      en: 'Grand Cru Classé of great elegance. Cassis, cedar, graphite and tobacco. Firm, well-integrated tannins with remarkable length and outstanding ageing potential.',
      fr: "Grand Cru Classé d'une grande élégance. Cassis, cèdre, graphite et tabac. Tanins fermes et bien intégrés, finale remarquable, grand potentiel de garde.",
    },
    pairing: {
      pt: 'Ribeye, Tomahawk Signature e cortes nobres com presença no prato.',
      en: 'Ribeye, Tomahawk Signature and noble cuts with strong plate presence.',
      fr: 'Ribeye, Tomahawk Signature et coupes nobles avec présence en assiette.',
    },
    image: '/wine-leovillon.jpeg',
  },

  {
    id: 'pichon-baron-2018',
    name: 'Ch. Pichon Baron',
    year: 2018,
    region: 'Pauillac',
    country: 'FR',
    category: 'tinto',
    notes: {
      pt: 'Pauillac de poder e precisão. Groselha negra, grafite, especiaria e tabaco. Estrutura clássica com taninos de longa vida. Uma das grandes referências do Médoc.',
      en: 'Pauillac of power and precision. Blackcurrant, graphite, spice and tobacco leaf. Classic structure with long-lived tannins. One of the Médoc\'s great references.',
      fr: 'Pauillac de puissance et de précision. Cassis, graphite, épices et feuille de tabac. Structure classique, tanins de grande garde. Une des grandes références du Médoc.',
    },
    pairing: {
      pt: 'Tomahawk na brasa, carnes de maturação premium e costeletas de vaca velha.',
      en: 'Grilled Tomahawk, premium aged meats and old-cow chops.',
      fr: 'Tomahawk grillé, viandes de maturation premium et côtelettes de vieille vache.',
    },
    image: '/wine-pichon.jpeg',
  },

  // ── PORTUGAL ─────────────────────────────────────────────────────────────────

  {
    id: 'barca-velha-2015',
    name: 'Barca Velha',
    year: 2015,
    region: 'Douro Superior',
    country: 'PT',
    category: 'tinto',
    notes: {
      pt: 'O vinho português mais icónico. Complexidade extraordinária: ameixa madura, especiaria, cedro, balsâmico e tabaco. Persistência legendária. Produzido apenas em anos excepcionais.',
      en: "Portugal's most iconic wine. Extraordinary complexity: ripe plum, spice, cedar, balsamic and tobacco. Legendary finish. Produced only in exceptional vintages.",
      fr: 'Le vin portugais le plus iconique. Complexité extraordinaire: prune mûre, épices, cèdre, balsamique et tabac. Persistance légendaire. Produit uniquement en années exceptionnelles.',
    },
    pairing: {
      pt: 'Tomahawk na brasa, costela dry-aged e os grandes cortes da casa.',
      en: 'Grilled Tomahawk, dry-aged rib and the great house cuts.',
      fr: 'Tomahawk grillé, côte dry-aged et les grandes pièces de la maison.',
    },
    image: '/wine-barcavelha.jpeg',
  },

  {
    id: 'crasto-old-vines-2019',
    name: 'Crasto Reserva Old Vines',
    year: 2019,
    region: 'Douro',
    country: 'PT',
    category: 'tinto',
    notes: {
      pt: 'Vinhas velhas do Douro com intensidade controlada. Frutos negros maduros, violeta, mineral e terra. Estrutura firme com elegância natural e final extenso.',
      en: 'Old Douro vines with controlled intensity. Ripe dark fruits, violet, mineral and earth. Firm structure with natural elegance and an extended finish.',
      fr: 'Vieilles vignes du Douro avec une intensité maîtrisée. Fruits noirs mûrs, violette, minéral et terre. Structure ferme, élégance naturelle, longue finale.',
    },
    pairing: {
      pt: 'Ribeye selection, cortes premium na grelha e carnes de carácter.',
      en: 'Ribeye selection, premium grilled cuts and character-driven meats.',
      fr: 'Ribeye selection, coupes premium au grill et viandes de caractère.',
    },
    image: '/wine-crasto.jpeg',
  },

  {
    id: 'mouchao-2018',
    name: 'Herdade do Mouchão',
    year: 2018,
    region: 'Alentejano',
    country: 'PT',
    category: 'tinto',
    notes: {
      pt: 'Elegância rústica do Alentejo. Alicante Bouschet e Trincadeira. Cereja, ervas, fruta seca e couro com mineralidade distinta. Autenticidade alentejana em cada gole.',
      en: 'Rustic elegance from Alentejo. Alicante Bouschet and Trincadeira. Cherry, herbs, dried fruit and leather with distinct minerality. True Alentejo character in every sip.',
      fr: "Élégance rustique de l'Alentejo. Alicante Bouschet et Trincadeira. Cerise, herbes, fruit sec et cuir avec une minéralité distincte. Authenticité alentejane en chaque gorgée.",
    },
    pairing: {
      pt: 'Costela lenta, carnes de carácter e grelhados com marinadas aromáticas.',
      en: 'Slow-cooked rib, character-driven cuts and aromatic marinated grills.',
      fr: 'Côte mijotée, coupes de caractère et grillades aux marinades aromatiques.',
    },
    image: '/wine-mouchao.jpeg',
  },

  // ── Para adicionar novos vinhos: copie o bloco acima, preencha e descomente ──
  // {
  //   id: '',
  //   name: '',
  //   year: 0,
  //   region: '',
  //   country: '',
  //   category: 'tinto',
  //   notes: { pt: '', en: '', fr: '' },
  //   pairing: { pt: '', en: '', fr: '' },
  //   image: '', // coloque a foto em /public e referencie aqui
  // },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  PAIRINGS  →  Edit/expand as wine list grows
// ═══════════════════════════════════════════════════════════════════════════════

const PAIRINGS: Pairing[] = [
  {
    id: 'tomahawk-petrus',
    badge: { pt: 'Signature', en: 'Signature', fr: 'Signature' },
    meatTitle: { pt: 'Tomahawk na Brasa', en: 'Grilled Tomahawk', fr: 'Tomahawk Grillé' },
    meatImage: '/tomahawkchamas.jpeg',
    wineNote: {
      pt: 'Château Petrus 2021 · Pomerol',
      en: 'Château Petrus 2021 · Pomerol',
      fr: 'Château Petrus 2021 · Pomerol',
    },
    wineImage: '/vinhopetrvs.jpeg',
    bridgeNote: {
      pt: 'Merlot sedoso de Pomerol encontra a intensidade da brasa. Trufa e cacau elevam o corte.',
      en: 'Silky Pomerol Merlot meets the fire\'s intensity. Truffle and cocoa notes elevate the cut.',
      fr: 'Le Merlot soyeux de Pomerol rencontre la braise. Truffe et cacao subliment la pièce.',
    },
  },
  {
    id: 'ribeye-leoville',
    badge: { pt: 'Premium', en: 'Premium', fr: 'Premium' },
    meatTitle: { pt: 'Ribeye Selection', en: 'Ribeye Selection', fr: 'Ribeye Selection' },
    meatImage: '/ribeygrelha.jpeg',
    wineNote: {
      pt: 'Ch. Léoville-Barton 2018 · Saint-Julien',
      en: 'Ch. Léoville-Barton 2018 · Saint-Julien',
      fr: 'Ch. Léoville-Barton 2018 · Saint-Julien',
    },
    wineImage: '/wine-leovillon.jpeg',
    bridgeNote: {
      pt: 'Cassis e grafite do Saint-Julien a espelhar o marmoreado e a intensidade do ribeye.',
      en: 'Cassis and graphite from Saint-Julien mirror the marbling and intensity of the ribeye.',
      fr: 'Cassis et graphite du Saint-Julien reflètent le persillage et la puissance du ribeye.',
    },
  },
  {
    id: 'costela-barcavelha',
    badge: { pt: 'Classic', en: 'Classic', fr: 'Classique' },
    meatTitle: { pt: 'Costela Lenta', en: 'Slow-Cooked Rib', fr: 'Côte Lente' },
    meatImage: '/costela.jpeg',
    wineNote: {
      pt: 'Barca Velha 2015 · Douro Superior',
      en: 'Barca Velha 2015 · Douro Superior',
      fr: 'Barca Velha 2015 · Douro Supérieur',
    },
    wineImage: '/wine-barcavelha.jpeg',
    bridgeNote: {
      pt: 'Complexidade legendária da Barca Velha a amplificar a profundidade da cozedura lenta.',
      en: 'Barca Velha\'s legendary complexity amplifies the depth of the slow cook.',
      fr: 'La complexité légendaire de la Barca Velha amplifie la profondeur de la cuisson lente.',
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  UI STRINGS
// ═══════════════════════════════════════════════════════════════════════════════

const UI = {
  pt: {
    overline: 'Adega · Harmonização · Curadoria',
    title: 'O vinho certo\npara cada corte.',
    subtitle: 'Rótulos selecionados para elevar cada refeição à sua expressão mais completa.',
    tabs: {
      carta: 'Carta de Vinhos',
      harmonizacoes: 'Harmonizações',
      selecao: 'Selecção da Casa',
    },
    categoryLabel: {
      tinto: 'Tintos',
      branco: 'Brancos',
      espumante: 'Espumantes',
      rose: 'Rosés',
    },
    sommelierNote: '"Selecionamos rótulos que ampliam, não que competem com a carne."',
    pairingsSubtitle: 'Cada corte tem o seu vinho. Cada vinho tem o seu momento.',
    selecaoSubtitle: 'Curadoria pensada para acompanhar a intensidade da grelha.',
    selecaoWineNote:
      'Vinho seleccionado pelo sommelier para harmonizar com a identidade do Latina Grill.',
    cta: 'Ver carta completa em PDF',
    labelNotes: 'Notas',
    labelPairing: 'Harmonização',
  },
  en: {
    overline: 'Cellar · Pairings · Curation',
    title: 'The right wine\nfor every cut.',
    subtitle: 'Selected labels to elevate each meal to its fullest expression.',
    tabs: {
      carta: 'Wine List',
      harmonizacoes: 'Pairings',
      selecao: 'House Selection',
    },
    categoryLabel: {
      tinto: 'Reds',
      branco: 'Whites',
      espumante: 'Sparkling',
      rose: 'Rosés',
    },
    sommelierNote: '"We select wines that amplify the meat, not compete with it."',
    pairingsSubtitle: 'Every cut has its wine. Every wine has its moment.',
    selecaoSubtitle: 'A curated choice to accompany the intensity of the grill.',
    selecaoWineNote:
      'Wine selected by our sommelier to harmonise with the Latina Grill identity.',
    cta: 'View full menu as PDF',
    labelNotes: 'Notes',
    labelPairing: 'Pairing',
  },
  fr: {
    overline: 'Cave · Accords · Curation',
    title: 'Le bon vin\npour chaque coupe.',
    subtitle: "Des étiquettes sélectionnées pour élever chaque repas à sa pleine expression.",
    tabs: {
      carta: 'Carte des Vins',
      harmonizacoes: 'Accords',
      selecao: 'Sélection Maison',
    },
    categoryLabel: {
      tinto: 'Rouges',
      branco: 'Blancs',
      espumante: 'Pétillants',
      rose: 'Rosés',
    },
    sommelierNote:
      '"Nous sélectionnons des vins qui amplifient la viande, pas qui la concurrencent."',
    pairingsSubtitle: 'Chaque coupe a son vin. Chaque vin a son moment.',
    selecaoSubtitle: "Une curation pensée pour accompagner l'intensité du grill.",
    selecaoWineNote:
      "Vin sélectionné par notre sommelier pour harmoniser avec l'identité du Latina Grill.",
    cta: 'Voir la carte complète en PDF',
    labelNotes: 'Notes',
    labelPairing: 'Accord',
  },
} as const;

type UIStrings = (typeof UI)[Locale];

const TABS: { id: TabId; getLabel: (t: UIStrings) => string }[] = [
  { id: 'carta', getLabel: (t) => t.tabs.carta },
  { id: 'harmonizacoes', getLabel: (t) => t.tabs.harmonizacoes },
  { id: 'selecao', getLabel: (t) => t.tabs.selecao },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  WINE ROW — hover-reveal: notes + pairing slide in beneath the row
// ═══════════════════════════════════════════════════════════════════════════════

function WineRow({
  wine,
  locale,
  t,
  isHovered,
  onEnter,
  onLeave,
}: {
  wine: Wine;
  locale: Locale;
  t: UIStrings;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="border-b border-white/[0.055] last:border-b-0"
    >
      {/* Main row */}
      <div
        className={`grid grid-cols-[34px_1fr_auto] items-baseline gap-x-3 rounded-sm px-2 py-3 transition-colors duration-200 ${
          isHovered ? 'bg-white/[0.03]' : ''
        }`}
      >
        <span className="font-mono tabular-nums text-[11px] text-red-400/60">{wine.year}</span>
        <span className="text-[13.5px] font-medium leading-snug text-white/82">{wine.name}</span>
        <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/28">
          {wine.region}
        </span>
      </div>

      {/* Hover reveal: notes + pairing, slides in below the row */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="wine-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-4 pt-0.5">
              <div className="space-y-1.5 border-l border-red-500/15 pl-3">
                <p className="text-[11px] leading-relaxed text-white/38">
                  <span className="mr-2 text-[9px] uppercase tracking-[0.38em] text-red-400/50">
                    {t.labelNotes}
                  </span>
                  {wine.notes[locale]}
                </p>
                <p className="text-[11px] leading-relaxed text-white/30">
                  <span className="mr-2 text-[9px] uppercase tracking-[0.38em] text-red-400/50">
                    {t.labelPairing}
                  </span>
                  {wine.pairing[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 1 — CARTA DE VINHOS
//  Left: dominant image (crossfades to hovered wine's photo if available)
//  Right: categorised wine list with tabular typography
// ═══════════════════════════════════════════════════════════════════════════════

function CartaTab({ locale, t }: { locale: Locale; t: UIStrings }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Group wines by category (order: tinto, branco, espumante, rose)
  const categoryOrder: WineCategory[] = ['tinto', 'branco', 'espumante', 'rose'];
  const byCategory = useMemo(() => {
    const map: Partial<Record<WineCategory, Wine[]>> = {};
    for (const wine of WINES) {
      if (!map[wine.category]) map[wine.category] = [];
      map[wine.category]!.push(wine);
    }
    return map;
  }, []);

  const hoveredWine = WINES.find((w) => w.id === hoveredId) ?? null;
  const fallbackImage = WINES.find((w) => w.image)?.image ?? '/vinhopetrvs.jpeg';
  const activeImage = hoveredWine?.image ?? fallbackImage;
  const activeCaption = hoveredWine ?? WINES[0];

  return (
    <div className="grid gap-10 md:grid-cols-[0.44fr_0.56fr] md:gap-12">
      {/* ── Left: dominant image panel ── */}
      <div className="relative h-[300px] overflow-hidden rounded-2xl md:h-auto md:min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt="Vinho selecionado"
              fill
              className="object-cover"
              style={{ filter: 'sepia(8%) brightness(0.86)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

        {/* Caption: crossfades with hovered wine */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCaption?.id ?? 'empty'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeCaption && (
                <>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.42em] text-white/35">
                    {activeCaption.region} · {activeCaption.country}
                  </p>
                  <p className="text-[13px] font-medium text-white/65">{activeCaption.name}</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: wine list ── */}
      <div className="flex flex-col justify-between">
        <div className="flex-1">
          {categoryOrder.map((cat) => {
            const catWines = byCategory[cat];
            if (!catWines || catWines.length === 0) return null;
            return (
              <div key={cat} className="mb-7 last:mb-0">
                {/* Category header */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/20">
                    {t.categoryLabel[cat]}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>

                {/* Wine rows */}
                {catWines.map((wine) => (
                  <WineRow
                    key={wine.id}
                    wine={wine}
                    locale={locale}
                    t={t}
                    isHovered={hoveredId === wine.id}
                    onEnter={() => setHoveredId(wine.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Sommelier note */}
        <div className="mt-10 border-l border-red-500/12 pl-4">
          <p className="text-[12.5px] italic leading-relaxed text-white/32">
            {t.sommelierNote}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 2 — HARMONIZAÇÕES
//  Editorial pairing rows: meat thumbnail + bridge text + wine note
// ═══════════════════════════════════════════════════════════════════════════════

function HarmonizacoesTab({ locale, t }: { locale: Locale; t: UIStrings }) {
  return (
    <div>
      <p className="mb-8 text-[11px] uppercase tracking-[0.38em] text-white/25">
        {t.pairingsSubtitle}
      </p>

      <div className="divide-y divide-white/[0.05]">
        {PAIRINGS.map((pair, idx) => (
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: idx * 0.09 }}
            className="group grid grid-cols-1 items-center gap-5 py-7 first:pt-0 last:pb-0 md:grid-cols-[1fr_48px_1fr]"
          >
            {/* Meat side */}
            <div className="flex items-center gap-4">
              <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={pair.meatImage}
                  alt={pair.meatTitle[locale]}
                  fill
                  className="object-cover transition-all duration-500 group-hover:brightness-110"
                />
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/22">
                  {pair.badge[locale]}
                </p>
                <p className="text-[14px] font-medium text-white/78">{pair.meatTitle[locale]}</p>
              </div>
            </div>

            {/* Bridge */}
            <div className="hidden flex-col items-center md:flex">
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <span className="my-1 font-mono text-[10px] text-white/15">+</span>
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>

            {/* Wine side */}
            <div className="flex items-center gap-4 md:flex-row-reverse md:text-right">
              <div
                className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl"
                style={{ filter: 'sepia(6%)' }}
              >
                <Image
                  src={pair.wineImage}
                  alt={pair.wineNote[locale]}
                  fill
                  className="object-cover transition-all duration-500 group-hover:brightness-105"
                />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white/58">{pair.wineNote[locale]}</p>
                <p className="mt-1.5 text-[11.5px] italic leading-relaxed text-white/28">
                  {pair.bridgeNote[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 3 — SELECÇÃO DA CASA
//  Narrative editorial format: large image + story text
// ═══════════════════════════════════════════════════════════════════════════════

function SelecaoTab({ locale, t }: { locale: Locale; t: UIStrings }) {
  const featured = WINES[0];
  if (!featured) return null;

  return (
    <div className="grid gap-10 md:grid-cols-[0.52fr_0.48fr] md:gap-12">
      {/* Left: cinematic image + wine identity */}
      <div className="relative h-[320px] overflow-hidden rounded-2xl md:h-auto md:min-h-[460px]">
        {featured.image && (
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover"
            style={{ filter: 'sepia(10%) brightness(0.80)' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent" />

        {/* Wine identity overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-red-400/55">
            {t.selecaoSubtitle}
          </p>
          <h3 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
            {featured.name}
          </h3>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.3em] text-white/38">
            {featured.year} · {featured.region} · {featured.country}
          </p>
        </div>
      </div>

      {/* Right: editorial narrative */}
      <div className="flex flex-col justify-center py-2">
        {/* Sensory notes */}
        <div className="mb-7">
          <p className="mb-3 text-[9px] uppercase tracking-[0.48em] text-red-400/48">
            {t.labelNotes}
          </p>
          <p className="text-[13.5px] leading-[1.75] text-white/50">{featured.notes[locale]}</p>
        </div>

        {/* Pairing */}
        <div className="mb-8 border-t border-white/[0.06] pt-6">
          <p className="mb-3 text-[9px] uppercase tracking-[0.48em] text-red-400/48">
            {t.labelPairing}
          </p>
          <p className="text-[13.5px] leading-[1.75] text-white/55">{featured.pairing[locale]}</p>
        </div>

        {/* Sommelier stamp */}
        <div className="border-l border-red-500/12 pl-4">
          <p className="text-[12px] italic leading-relaxed text-white/28">
            {t.selecaoWineNote}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MenuHighlights() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const locale = useLocale() as Locale;
  const t = UI[locale] ?? UI.pt;

  const [activeTab, setActiveTab] = useState<TabId>('carta');

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: 'linear-gradient(160deg, #060405 0%, #050405 55%, #080607 100%)' }}
    >
      {/* Ambient glows — static, no scroll */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full bg-red-950/10 blur-[220px]" />
        <div className="absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full bg-purple-950/8 blur-[200px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        {/* ── ZONE A: Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="mb-16 max-w-xl"
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.52em] text-white/28">
            {t.overline}
          </p>
          <h2 className="whitespace-pre-line font-serif text-4xl font-bold leading-[1.06] text-white md:text-5xl lg:text-[3.5rem]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-[420px] text-[13.5px] leading-relaxed text-white/42">
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── ZONE B: Tab bar ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mb-11 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          <div className="flex min-w-max border-b border-white/[0.07] md:min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative mr-9 pb-4 text-left outline-none last:mr-0"
              >
                <span
                  className={`text-[11px] uppercase tracking-[0.38em] transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-white/88'
                      : 'text-white/30 hover:text-white/55'
                  }`}
                >
                  {tab.getLabel(t)}
                </span>

                {activeTab === tab.id && (
                  <motion.span
                    layoutId="wineTabIndicator"
                    className="absolute bottom-0 left-0 h-px w-full bg-red-500"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── ZONE C: Tab content ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {activeTab === 'carta' && <CartaTab locale={locale} t={t} />}
              {activeTab === 'harmonizacoes' && <HarmonizacoesTab locale={locale} t={t} />}
              {activeTab === 'selecao' && <SelecaoTab locale={locale} t={t} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── ZONE D: CTA strip ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 flex justify-start"
        >
          <a
            href="/latina-grill-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.35em] text-white/30 transition-colors duration-300 hover:text-white/60"
          >
            <span>{t.cta}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
