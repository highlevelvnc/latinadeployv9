/**
 * Latina Grill Cascais — Motion Design System
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all framer-motion animations across the site.
 *
 * Design philosophy (luxury/premium brand):
 *  • Smooth, deliberate — never rushed, never abrupt
 *  • GPU-only properties: transform + opacity only (no layout shift)
 *  • Stagger reveals content in logical reading order
 *  • Interactive elements have spring physics for tactile feel
 *  • Mobile: shorter durations, reduced distances, no parallax overhead
 *
 * Usage:
 *   import { fadeUp, containerVariants, buttonVariants, EASE_OUT } from '@/lib/animations'
 *
 *   <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
 *     <motion.p variants={fadeUp}>...</motion.p>
 *   </motion.div>
 */

import type { Variants, Transition } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// 1. TIMING CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const DURATION = {
  /** Instant feedback — toggle states, micro-flashes */
  instant: 0.12,
  /** Fast — tooltip, badge pop, icon swap */
  fast: 0.22,
  /** Normal — button feedback, small card reveal */
  normal: 0.42,
  /** Slow — primary section entrance, most elements */
  slow: 0.68,
  /** Slower — hero, full-width images, parallax containers */
  slower: 0.95,
  /** Crawl — luxury image cross-fade, background slides */
  crawl: 1.3,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. EASING CURVES
// ─────────────────────────────────────────────────────────────────────────────

/** Smooth deceleration — the default for most UI entrances */
export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Symmetrical — used for elements moving across the screen */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as [number, number, number, number];

/** Subtle ease for ambient/background elements */
export const EASE_STANDARD = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ─────────────────────────────────────────────────────────────────────────────
// 3. SPRING CONFIGS
// ─────────────────────────────────────────────────────────────────────────────

/** Gentle spring — sticky bar entrance, drawers, panels */
export const SPRING_GENTLE: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 1,
};

/** Snappy spring — tab indicators, toggle elements */
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
};

/** Button press — immediate, tactile */
export const SPRING_BUTTON: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. STAGGER CHILDREN DELAYS
// ─────────────────────────────────────────────────────────────────────────────

export const STAGGER = {
  /** Default — feature lists, card grids */
  children: 0.09,
  /** Tight — dense lists, icon rows */
  fast: 0.055,
  /** Spacious — editorial reveals, hero sequences */
  slow: 0.15,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 5. INVIEW TRIGGER MARGIN
// ─────────────────────────────────────────────────────────────────────────────

/** Standard margin — triggers animation when element is 8% into viewport */
export const INVIEW_MARGIN = '-8%' as const;

/** Early margin — triggers just before entering viewport (for large elements) */
export const INVIEW_MARGIN_EARLY = '-5%' as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6. SECTION / CONTAINER VARIANTS
// Use on wrapper elements to orchestrate staggered children
// ─────────────────────────────────────────────────────────────────────────────

/** Default stagger container — most sections */
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.children,
      delayChildren: 0.08,
    },
  },
};

/** Tight stagger — dense lists, galleries */
export const containerFastVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.fast,
      delayChildren: 0.05,
    },
  },
};

/** Spacious stagger — hero sequences, editorial layouts */
export const containerSlowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.slow,
      delayChildren: 0.12,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. ELEMENT VARIANTS — the core building blocks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * fadeUp — the site's signature entrance animation.
 * Fades in while rising 22px. Used for most content blocks.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/**
 * fadeUpSubtle — lighter rise (12px). Supporting text, captions, metadata.
 */
export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

/**
 * fadeIn — pure opacity, no movement. Overlays, background images, ambient elements.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_STANDARD },
  },
};

/**
 * scaleIn — subtle scale + fade. Gallery cards, feature highlights, modals.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/**
 * slideFromLeft — enters from the left. Content columns, editor layouts.
 */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -38 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slower, ease: EASE_OUT },
  },
};

/**
 * slideFromRight — enters from the right. Image columns, side panels.
 */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 38 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slower, ease: EASE_OUT },
  },
};

/**
 * badgePop — badge/pill entrance with subtle scale. Section labels.
 */
export const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. MOBILE-REDUCED VARIANTS
// Lower Y distance + shorter duration for smaller screens / weaker devices.
// Use via the useMotionVariants() hook below.
// ─────────────────────────────────────────────────────────────────────────────

export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

export const scaleInMobile: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

export const slideFromLeftMobile: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

export const slideFromRightMobile: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. INTERACTIVE VARIANTS — buttons, cards, CTAs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * buttonVariants — premium CTA button micro-interaction.
 * Scale up on hover, slight press on tap.
 * Pair with whileHover="hover" whileTap="tap" on motion elements.
 */
export const buttonVariants: Variants = {
  idle:  { scale: 1 },
  hover: {
    scale: 1.028,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  tap:   {
    scale: 0.965,
    transition: { duration: 0.1, ease: EASE_IN_OUT },
  },
};

/**
 * buttonSecondaryVariants — ghost/outline button.
 * Lighter scale, subtle brightness boost.
 */
export const buttonSecondaryVariants: Variants = {
  idle:  { scale: 1, opacity: 1 },
  hover: {
    scale: 1.02,
    opacity: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  tap:   {
    scale: 0.975,
    transition: { duration: 0.1 },
  },
};

/**
 * cardLift — elevates a card on hover.
 * Used on feature cards, schedule rows, review cards.
 */
export const cardLift: Variants = {
  idle:  { y: 0, scale: 1 },
  hover: {
    y: -5,
    scale: 1.008,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  tap:   {
    y: -2,
    scale: 0.998,
    transition: { duration: 0.12 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. STICKY BAR VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

export const stickyBarVariants: Variants = {
  hidden: {
    y: '115%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ...SPRING_GENTLE },
  },
  exit: {
    y: '115%',
    opacity: 0,
    transition: { duration: DURATION.normal, ease: EASE_IN_OUT },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. LIGHTBOX / OVERLAY VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

export const lightboxBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast },
  },
};

export const lightboxImage: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: DURATION.fast },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. PREBUILT TRANSITIONS (for non-variant usage)
// ─────────────────────────────────────────────────────────────────────────────

/** Standard transition for most animated elements */
export const transitionBase: Transition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
};

/** Fast transition for quick UI feedback */
export const transitionFast: Transition = {
  duration: DURATION.fast,
  ease: EASE_OUT,
};

/** Slow transition for luxury image reveals */
export const transitionCrawl: Transition = {
  duration: DURATION.crawl,
  ease: EASE_OUT,
};
