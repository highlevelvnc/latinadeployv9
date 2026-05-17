import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

/**
 * Maintenance page — shown to ALL traffic when MAINTENANCE_MODE=true env
 * var is set on Vercel. The middleware rewrites every public request to
 * here (except /api, /_next, static assets).
 *
 * Standalone route OUTSIDE [locale]: doesn't use i18n, doesn't pull
 * Header/Footer, doesn't load the heavy bundle. Loads in <100ms.
 *
 * To enable: set MAINTENANCE_MODE=true in Vercel project env vars and
 * redeploy. To disable: set to false (or delete) and redeploy.
 *
 * Edit the text/contact below to match what you want to say. Two tones
 * are commented out in the JSX — pick whichever fits your case.
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

// ───────────────────────────────────────────────────────────────────────────
// EDIT THESE — your contact info as the dev / agency
// ───────────────────────────────────────────────────────────────────────────
const DEV_EMAIL = 'vnc.oli@gmail.com';
const DEV_PHONE: string | null = null; // set to e.g. '+351 9XX XXX XXX' or leave null
// ───────────────────────────────────────────────────────────────────────────

export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-20 text-center text-[#f5f5f5]">
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

      {/* Overline */}
      <p className="relative z-10 mb-5 text-[10px] uppercase tracking-[0.5em] text-red-400/70 sm:text-[11px]">
        Latina Grill · Cascais
      </p>

      {/* Title — bilingual */}
      <h1 className="relative z-10 mb-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
        Site temporariamente em manutenção
      </h1>
      <p className="relative z-10 mb-6 italic text-base sm:text-lg text-white/55 max-w-md">
        Site temporarily under maintenance
      </p>

      {/* Divider */}
      <div className="relative z-10 mb-8 mx-auto flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-red-500/70" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/60" />
      </div>

      {/* Body copy — firm and professional. Pick a tone: */}

      {/* TONE A — Neutral (default) */}
      <p className="relative z-10 mb-10 max-w-md text-base sm:text-[17px] text-white/68 leading-relaxed">
        O site encontra-se temporariamente indisponível.
        Para mais informações, contacte o prestador de serviços abaixo.
      </p>

      {/*
      TONE B — Direct (uncomment to use):
      <p className="relative z-10 mb-10 max-w-md text-base sm:text-[17px] text-white/68 leading-relaxed">
        Serviço suspenso por motivo administrativo. Para retomar o
        funcionamento, contacte o prestador responsável.
      </p>
      */}

      {/* Contact card */}
      <div className="relative z-10 inline-flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 sm:px-8 sm:py-6">
        <p className="text-[10px] uppercase tracking-[0.42em] text-white/40">
          Contacto
        </p>
        <a
          href={`mailto:${DEV_EMAIL}`}
          className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-white/90 transition-colors hover:text-red-400"
        >
          <Mail className="h-4 w-4 text-red-400" aria-hidden="true" />
          {DEV_EMAIL}
        </a>
        {DEV_PHONE && (
          <a
            href={`tel:${DEV_PHONE.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-white/90 transition-colors hover:text-red-400"
          >
            <Phone className="h-4 w-4 text-red-400" aria-hidden="true" />
            {DEV_PHONE}
          </a>
        )}
      </div>

      {/* Footer brand */}
      <p className="relative z-10 mt-10 text-[10px] uppercase tracking-[0.42em] text-white/22">
        Voltaremos em breve · Back soon
      </p>
    </main>
  );
}
