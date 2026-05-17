import type { Metadata } from 'next';
import Image from 'next/image';

/**
 * Maintenance page — shown to ALL traffic when MAINTENANCE_MODE=true env
 * var is set on Vercel. The middleware rewrites every public request to
 * here (except /api, /_next, static assets).
 *
 * Standalone route OUTSIDE [locale]: doesn't use i18n, doesn't pull
 * Header/Footer, doesn't load the heavy bundle.
 *
 * To enable: set MAINTENANCE_MODE=true in Vercel project env vars and
 * redeploy. To disable: set to false (or delete) and redeploy.
 */

export const metadata: Metadata = {
  title: 'Site em manutenção · Site under maintenance',
  description: 'Site temporariamente indisponível.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-20 text-center text-[#f5f5f5]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/12 blur-[180px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-10 h-20 w-20 sm:h-24 sm:w-24">
        <Image
          src="/logo.webp"
          alt="Latina Grill"
          fill
          sizes="(min-width: 640px) 96px, 80px"
          className="object-contain drop-shadow-[0_0_28px_rgba(220,38,38,0.45)]"
          priority
        />
      </div>

      {/* Title — bilingual */}
      <h1 className="relative z-10 mb-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
        Site em manutenção
      </h1>
      <p className="relative z-10 italic text-base sm:text-lg text-white/55 max-w-md">
        Site under maintenance
      </p>

      {/* Divider */}
      <div className="relative z-10 mt-8 mx-auto flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-red-500/70" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/60" />
      </div>
    </main>
  );
}
