'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react';

/**
 * Error boundary for the [locale] segment.
 *
 * Caught: any uncaught error inside a server or client component on a
 * locale-prefixed route. Examples: data fetch crash, render-time exception,
 * unhandled promise rejection in a useEffect.
 *
 * Visual matches the 404 page (same brand language) so users don't feel
 * dropped into a default Next error screen.
 *
 * Note: must be a Client Component (per Next.js docs). Receives `reset()`
 * which re-mounts the route segment — useful for transient errors (e.g.
 * a flaky network call).
 */

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocalizedError({ error, reset }: Props) {
  const t = useTranslations('errorState');

  useEffect(() => {
    // In production this is where you'd ship the error to Sentry/Datadog.
    // Logging to console here so it shows up in Vercel function logs at
    // minimum until proper observability is wired up.
    console.error('[Latina Grill] Route error:', error);
  }, [error]);

  return (
    <main
      id="main"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark px-4 py-20 text-center"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/12 blur-[180px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-10 h-16 w-16 sm:h-20 sm:w-20">
        <Image
          src="/logo.webp"
          alt="Latina Grill"
          fill
          sizes="(min-width: 640px) 80px, 64px"
          className="object-contain drop-shadow-[0_0_24px_rgba(220,38,38,0.45)]"
          priority
        />
      </div>

      {/* Alert glyph */}
      <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10">
        <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
      </div>

      {/* Title */}
      <h1 className="relative z-10 mb-4 font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-light max-w-2xl">
        {t('title')}
      </h1>

      {/* Divider */}
      <div className="relative z-10 mb-6 mx-auto flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-red-500/70" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-500/60" />
      </div>

      {/* Description */}
      <p className="relative z-10 mb-10 max-w-md text-base sm:text-lg text-light/65 leading-relaxed">
        {t('description')}
      </p>

      {/* Actions */}
      <div className="relative z-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={reset}
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_rgba(220,38,38,0.32)] transition-colors duration-200 hover:bg-red-500 sm:flex-initial"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          <span>{t('retry')}</span>
        </button>

        <Link
          href="/"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-light/15 bg-light/[0.03] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-light/85 transition-colors duration-200 hover:border-light/30 hover:bg-light/[0.07] sm:flex-initial"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>{t('backHome')}</span>
        </Link>
      </div>

      {/* Optional debug ID — only shown when the runtime gives us a digest
          (production server errors have one; dev errors usually don't). */}
      {error.digest && (
        <p className="relative z-10 mt-10 text-[11px] uppercase tracking-[0.28em] text-light/30 tabular-nums">
          ID: {error.digest}
        </p>
      )}
    </main>
  );
}
