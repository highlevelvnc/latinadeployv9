import Image from 'next/image';

/**
 * Route-level loading UI for the [locale] segment.
 *
 * Shown while a server component is suspending (e.g. between page
 * navigations that fetch data). Kept minimal: branded logo + a faint
 * pulse so the user knows something's happening, no text (so it works
 * across all 5 locales without lookups).
 *
 * Different from the Preloader (which only runs once on first paint via
 * a setTimeout — this one is the Next.js Suspense fallback).
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative h-20 w-20 animate-pulse">
          <Image
            src="/logo.webp"
            alt=""
            fill
            sizes="80px"
            className="object-contain drop-shadow-[0_0_24px_rgba(220,38,38,0.45)]"
            priority
          />
        </div>

        {/* Indeterminate progress bar — slim, gold, not yelling */}
        <div className="relative h-px w-32 overflow-hidden rounded-full bg-white/8">
          <span
            className="absolute inset-y-0 -left-1/3 w-1/3 rounded-full bg-gradient-to-r from-transparent via-red-500/80 to-transparent"
            style={{ animation: 'loadingSlide 1.4s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Inline keyframe — avoids touching globals.css for a route-only animation */}
      <style>{`
        @keyframes loadingSlide {
          0% { transform: translateX(0); }
          50% { transform: translateX(300%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
