'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import {
  getCuratedWineList,
  type Locale,
  type LS,
  type Wine,
  type WineCategory,
} from '@/lib/featured-wines';

// ═══════════════════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type TabId = 'carta' | 'harmonizacoes' | 'selecao';

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
//  → House wine (Mythologyc) is hardcoded in lib/featured-wines.ts
//  → Other featured wines come from data/menu.ts + lib/wine-info.ts
//  → To add a new wine: edit lib/wine-info.ts (it's auto-picked-up here)
// ═══════════════════════════════════════════════════════════════════════════════

const WINES: Wine[] = getCuratedWineList();

// ═══════════════════════════════════════════════════════════════════════════════
//  PAIRINGS  →  Edit/expand as wine list grows
// ═══════════════════════════════════════════════════════════════════════════════

const PAIRINGS: Pairing[] = [
  {
    id: 'tomahawk-petrus',
    badge: { pt: 'Signature', en: 'Signature', fr: 'Signature' },
    meatTitle: { pt: 'Tomahawk na Brasa', en: 'Grilled Tomahawk', fr: 'Tomahawk Grillé' },
    meatImage: '/tomahawkchamas.webp',
    wineNote: {
      pt: 'Château Petrus 2021 · Pomerol',
      en: 'Château Petrus 2021 · Pomerol',
      fr: 'Château Petrus 2021 · Pomerol',
    },
    wineImage: '/vinhopetrvs.webp',
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
    meatImage: '/ribeygrelha.webp',
    wineNote: {
      pt: 'Ch. Léoville-Barton 2018 · Saint-Julien',
      en: 'Ch. Léoville-Barton 2018 · Saint-Julien',
      fr: 'Ch. Léoville-Barton 2018 · Saint-Julien',
    },
    wineImage: '/wine-leovillon.webp',
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
    meatImage: '/costela.webp',
    wineNote: {
      pt: 'Barca Velha 2015 · Douro Superior',
      en: 'Barca Velha 2015 · Douro Superior',
      fr: 'Barca Velha 2015 · Douro Supérieur',
    },
    wineImage: '/wine-barcavelha.webp',
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
  isActive,
  onEnter,
  onLeave,
  onToggle,
}: {
  wine: Wine;
  locale: Locale;
  t: UIStrings;
  isHovered: boolean;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  // Desktop: expand on hover. Mobile: expand on tap (toggle).
  const isExpanded = isHovered || isActive;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      className="cursor-pointer border-b border-white/[0.055] last:border-b-0 active:bg-white/[0.03] transition-colors duration-150"
    >
      {/* Main row */}
      <div
        className={`grid grid-cols-[34px_1fr_auto] items-baseline gap-x-3 rounded-sm px-2 py-3 transition-colors duration-200 ${
          isExpanded ? 'bg-white/[0.03]' : ''
        }`}
      >
        <span className="font-mono tabular-nums text-[11px] text-red-400/60">{wine.year}</span>
        <span className="text-[13.5px] font-medium leading-snug text-white/82">{wine.name}</span>
        {/* Region + rotating + indicator (mobile only) */}
        <div className="flex items-center gap-1.5">
          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/28">
            {wine.region}
          </span>
          <motion.span
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden select-none text-[12px] font-light leading-none text-white/22"
            aria-hidden
          >
            +
          </motion.span>
        </div>
      </div>

      {/* Detail reveal: slides in below the row on hover (desktop) or tap (mobile) */}
      <AnimatePresence>
        {isExpanded && (
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
  // Mobile toggle: tap once to open, tap again (or tap another) to close
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleToggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

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
  const houseWine = WINES.find((w) => w.isHouseLabel) ?? WINES[0];
  const fallbackImage = houseWine?.image ?? WINES.find((w) => w.image)?.image ?? '/vinhopetrvs.webp';
  const activeImage = hoveredWine?.image ?? fallbackImage;
  const activeCaption = hoveredWine ?? houseWine;

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
              sizes="(min-width: 768px) 44vw, 100vw"
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
                    isActive={activeId === wine.id}
                    onEnter={() => setHoveredId(wine.id)}
                    onLeave={() => setHoveredId(null)}
                    onToggle={() => handleToggle(wine.id)}
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
                  sizes="78px"
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
                  sizes="78px"
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

const HOUSE_LABEL_BADGE: Record<Locale, string> = {
  pt: 'Vinho da Casa',
  en: 'House Wine',
  fr: 'Vin de la Maison',
};

const HOUSE_LABEL_INTRO: Record<Locale, string> = {
  pt: 'O vinho escolhido pela nossa equipa para acompanhar cada momento no Latina Grill.',
  en: 'The wine chosen by our team to accompany every moment at Latina Grill.',
  fr: 'Le vin choisi par notre équipe pour accompagner chaque moment au Latina Grill.',
};

function SelecaoTab({ locale, t }: { locale: Locale; t: UIStrings }) {
  const featured = WINES.find((w) => w.isHouseLabel) ?? WINES[0];
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
            sizes="(min-width: 768px) 52vw, 100vw"
            className="object-cover"
            style={{ filter: 'sepia(10%) brightness(0.80)' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent" />

        {/* House label gold badge */}
        {featured.isHouseLabel && (
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.4em] text-amber-300/90">
              {HOUSE_LABEL_BADGE[locale]}
            </span>
          </div>
        )}

        {/* Wine identity overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-amber-400/60">
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
        {/* House label intro */}
        {featured.isHouseLabel && (
          <div className="mb-7 rounded-xl border border-amber-400/10 bg-amber-950/20 px-4 py-3.5">
            <p className="text-[11px] leading-relaxed text-amber-200/50">
              {HOUSE_LABEL_INTRO[locale]}
            </p>
          </div>
        )}

        {/* Sensory notes */}
        <div className="mb-7">
          <p className="mb-3 text-[9px] uppercase tracking-[0.48em] text-amber-400/48">
            {t.labelNotes}
          </p>
          <p className="text-[13.5px] leading-[1.75] text-white/50">{featured.notes[locale]}</p>
        </div>

        {/* Pairing */}
        <div className="mb-8 border-t border-white/[0.06] pt-6">
          <p className="mb-3 text-[9px] uppercase tracking-[0.48em] text-amber-400/48">
            {t.labelPairing}
          </p>
          <p className="text-[13.5px] leading-[1.75] text-white/55">{featured.pairing[locale]}</p>
        </div>

        {/* Sommelier stamp */}
        <div className="border-l border-amber-400/12 pl-4">
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
  // Normalise locale: wine data only exists in pt/en/fr; ru and zh fall back to English
  const rawLocale = useLocale();
  const locale: Locale = rawLocale === 'pt' ? 'pt' : rawLocale === 'fr' ? 'fr' : 'en';
  const t = UI[locale] ?? UI.pt;

  const [activeTab, setActiveTab] = useState<TabId>('carta');

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-36"
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
          <Link
            href={`/${rawLocale}/menu`}
            className="group inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.35em] text-white/30 transition-colors duration-300 hover:text-white/60"
          >
            <span>{t.cta}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
