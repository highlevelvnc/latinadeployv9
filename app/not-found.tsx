import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowRight } from 'lucide-react';

/**
 * Global 404 fallback — used when:
 *   - the URL doesn't match the [locale] segment (e.g. /random-path,
 *     /admin/whatever-undefined)
 *   - the locale prefix is missing entirely
 *
 * No i18n here — this component renders OUTSIDE the next-intl provider.
 * We keep copy bilingual (PT primary + EN secondary) and link the user
 * back to the locale-prefixed home, where the middleware will route to
 * the right language based on Accept-Language headers.
 */

export default function GlobalNotFound() {
  return (
    <html lang="pt">
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#F5F5F5]">
        <main
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/12 blur-[180px]" />
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

          {/* 404 */}
          <p
            className="relative z-10 font-serif text-[5rem] sm:text-[7rem] md:text-[9rem] font-bold leading-none tracking-tight text-white/12"
            aria-hidden="true"
          >
            404
          </p>

          <h1 className="relative z-10 -mt-4 sm:-mt-6 mb-3 font-serif text-3xl sm:text-4xl font-bold leading-tight max-w-2xl">
            Página não encontrada
            <span className="block mt-2 text-base sm:text-lg font-sans font-normal text-white/55 italic">
              Page not found
            </span>
          </h1>

          <div className="relative z-10 my-6 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-red-500/70" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-500/60" />
          </div>

          <Link
            href="/pt"
            className="group relative z-10 inline-flex items-center gap-2.5 rounded-full bg-red-600 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_rgba(220,38,38,0.32)] transition-colors duration-200 hover:bg-red-500"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Voltar ao início · Back home</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </main>
      </body>
    </html>
  );
}
