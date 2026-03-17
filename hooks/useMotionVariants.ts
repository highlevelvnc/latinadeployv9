/**
 * useMotionVariants
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the correct set of motion variants based on:
 *  1. OS preference: prefers-reduced-motion (via framer-motion's useReducedMotion)
 *  2. Screen size: mobile devices get shorter distances + durations
 *
 * This hook is the recommended way to access variants — it ensures every
 * component automatically respects accessibility preferences and mobile
 * performance without any manual checks.
 *
 * Usage:
 *   const { fadeUp, slideFromLeft, containerVariants } = useMotionVariants()
 *
 *   <motion.div
 *     variants={containerVariants}
 *     initial="hidden"
 *     animate={isInView ? "visible" : "hidden"}
 *   >
 *     <motion.h2 variants={fadeUp}>...</motion.h2>
 *   </motion.div>
 */

'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Variants } from 'framer-motion';

import {
  // Desktop full variants
  fadeUp,
  fadeUpSubtle,
  fadeIn,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  badgePop,
  containerVariants,
  containerFastVariants,
  containerSlowVariants,
  buttonVariants,
  buttonSecondaryVariants,
  cardLift,
  stickyBarVariants,
  lightboxBackdrop,
  lightboxImage,

  // Mobile-reduced variants
  fadeUpMobile,
  scaleInMobile,
  slideFromLeftMobile,
  slideFromRightMobile,
  INVIEW_MARGIN,
  INVIEW_MARGIN_EARLY,
} from '@/lib/animations';

// Static no-op variants — used when motion is disabled
const noopVariant: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  idle: { scale: 1 },
  hover: { scale: 1 },
  tap: { scale: 1 },
};

const noopContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

export function useMotionVariants() {
  const shouldReduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Accessibility first: if user prefers reduced motion, strip all movement
  if (shouldReduce) {
    return {
      fadeUp: noopVariant,
      fadeUpSubtle: noopVariant,
      fadeIn: noopVariant,
      scaleIn: noopVariant,
      slideFromLeft: noopVariant,
      slideFromRight: noopVariant,
      badgePop: noopVariant,
      containerVariants: noopContainer,
      containerFastVariants: noopContainer,
      containerSlowVariants: noopContainer,
      buttonVariants: noopVariant,
      buttonSecondaryVariants: noopVariant,
      cardLift: noopVariant,
      stickyBarVariants: noopVariant,
      lightboxBackdrop: noopVariant,
      lightboxImage: noopVariant,
      inviewMargin: INVIEW_MARGIN,
      isMobile,
    };
  }

  // Mobile: reduced distances + durations, no horizontal slides
  if (isMobile) {
    return {
      fadeUp: fadeUpMobile,
      fadeUpSubtle: fadeUpMobile,
      fadeIn,
      scaleIn: scaleInMobile,
      slideFromLeft: slideFromLeftMobile,
      slideFromRight: slideFromRightMobile,
      badgePop,
      containerVariants,
      containerFastVariants,
      containerSlowVariants,
      buttonVariants,
      buttonSecondaryVariants,
      cardLift: noopVariant, // no lift on touch devices
      stickyBarVariants,
      lightboxBackdrop,
      lightboxImage,
      inviewMargin: INVIEW_MARGIN_EARLY,
      isMobile,
    };
  }

  // Desktop: full premium variants
  return {
    fadeUp,
    fadeUpSubtle,
    fadeIn,
    scaleIn,
    slideFromLeft,
    slideFromRight,
    badgePop,
    containerVariants,
    containerFastVariants,
    containerSlowVariants,
    buttonVariants,
    buttonSecondaryVariants,
    cardLift,
    stickyBarVariants,
    lightboxBackdrop,
    lightboxImage,
    inviewMargin: INVIEW_MARGIN,
    isMobile,
  };
}
