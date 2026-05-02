'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Cookie, X, Check } from 'lucide-react';
import {
  readConsent,
  writeConsent,
  ALL_ACCEPTED,
  ESSENTIAL_ONLY,
  type ConsentChoice,
} from '@/lib/cookie-consent';

/**
 * RGPD / Cookie-Law compliant consent banner.
 *
 * Compliance:
 *   - Three options surfaced equally: Accept all, Essential only, Customize.
 *     RGPD dark-pattern rule = "Reject" must be as easy as "Accept".
 *   - No analytics fires until the user makes an explicit choice (banner shown).
 *   - Defaults: essential=true (always), analytics=false (opt-in only).
 *   - Consent is renewed after 180 days (handled by readConsent()).
 *   - Settings link in Footer (TODO) lets the user revisit the choice.
 */

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const a = useTranslations('a11y');
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  // Show banner only when no valid stored choice exists.
  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      // Tiny delay so it doesn't compete with the Preloader animation
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setAnalytics(stored.analytics);
  }, []);

  // Listen for an external open event (e.g. user clicks "Cookie settings" in
  // Footer). Lets us re-open the banner without remounting the page.
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('cookie-consent-open', handler);
    return () => window.removeEventListener('cookie-consent-open', handler);
  }, []);

  const acceptAll = () => {
    writeConsent(ALL_ACCEPTED);
    setVisible(false);
    setShowCustomize(false);
  };

  const rejectAll = () => {
    writeConsent(ESSENTIAL_ONLY);
    setVisible(false);
    setShowCustomize(false);
  };

  const saveCustom = () => {
    writeConsent({
      version: ALL_ACCEPTED.version,
      essential: true,
      analytics,
    } as Omit<ConsentChoice, 'timestamp'>);
    setVisible(false);
    setShowCustomize(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop — only when customize modal is open */}
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCustomize(false)}
              aria-hidden="true"
            />
          )}

          {/* Banner / modal */}
          <motion.div
            key="cookie-consent"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            role="dialog"
            aria-modal={showCustomize ? 'true' : undefined}
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
            className={`fixed left-3 right-3 z-[90] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-neutral-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl ${
              showCustomize
                ? 'top-1/2 -translate-y-1/2'
                : 'bottom-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-start gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                <Cookie className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="flex-1 pt-0.5">
                <h2
                  id="cookie-consent-title"
                  className="font-serif text-lg font-bold text-white sm:text-xl"
                >
                  {t('title')}
                </h2>
                <p
                  id="cookie-consent-description"
                  className="mt-1 text-sm leading-relaxed text-white/65"
                >
                  {t('description')}
                </p>
              </div>
              {showCustomize && (
                <button
                  onClick={() => setShowCustomize(false)}
                  aria-label={a('close')}
                  className="-mr-1 -mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Customize body */}
            <AnimatePresence initial={false}>
              {showCustomize && (
                <motion.div
                  key="customize-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 px-5 py-4 sm:px-6 sm:py-5">
                    {/* Essential — always on */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white">
                          {t('categories.essential.title')}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                          <Check className="h-3 w-3" aria-hidden="true" />
                          {t('categories.essential.alwaysOn')}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-white/55">
                        {t('categories.essential.description')}
                      </p>
                    </div>

                    {/* Analytics — toggle */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <label className="flex cursor-pointer items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white">
                          {t('categories.analytics.title')}
                        </h3>
                        <span className="relative">
                          <input
                            type="checkbox"
                            checked={analytics}
                            onChange={(e) => setAnalytics(e.target.checked)}
                            className="peer sr-only"
                          />
                          <span
                            className="block h-6 w-11 rounded-full bg-white/10 transition-colors duration-200 peer-checked:bg-red-600 peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950"
                            aria-hidden="true"
                          />
                          <span
                            className="absolute left-0.5 top-0.5 block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 peer-checked:translate-x-5"
                            aria-hidden="true"
                          />
                        </span>
                      </label>
                      <p className="mt-2 text-xs leading-relaxed text-white/55">
                        {t('categories.analytics.description')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col gap-2 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6">
              {showCustomize ? (
                <button
                  onClick={saveCustom}
                  className="order-1 flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(220,38,38,0.32)] transition-colors hover:bg-red-500 sm:order-2 sm:flex-initial"
                >
                  {t('savePreferences')}
                </button>
              ) : (
                <>
                  {/* RGPD: Reject must be as visually weighted as Accept */}
                  <button
                    onClick={rejectAll}
                    className="order-2 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.08] sm:order-1 sm:flex-initial"
                  >
                    {t('rejectAll')}
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="order-3 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.08] sm:order-2 sm:flex-initial"
                  >
                    {t('customize')}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="order-1 flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(220,38,38,0.32)] transition-colors hover:bg-red-500 sm:order-3 sm:flex-initial"
                  >
                    {t('acceptAll')}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
