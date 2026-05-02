import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Home, FileText, Mail, ArrowRight } from 'lucide-react';

/**
 * Localized 404 page for the [locale] segment.
 *
 * Triggered when:
 *   - notFound() is called inside a server component / page in the locale tree
 *   - the URL matches /pt|en|fr|ru|zh/<anything-undefined>
 *
 * Design: keeps the brand language (dark, gold-leaning, serif).
 * Routes link the user back to home, menu and contact (the 3 places we
 * actually want them to land).
 */

type Props = {
  params?: { locale?: string };
};

export default function LocalizedNotFound(_props: Props) {
  const t = useTranslations('notFound');
  // useLocale() is unreliable inside not-found.tsx in some Next versions
  // because the component renders outside the i18n provider when triggered
  // from middleware. We fall back to root '/' which the middleware will
  // redirect to the user's preferred locale.
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

      {/* 404 code — large, editorial */}
      <p
        className="relative z-10 font-serif text-[5rem] sm:text-[7rem] md:text-[9rem] font-bold leading-none tracking-tight text-white/12"
        aria-hidden="true"
      >
        {t('code')}
      </p>

      {/* Title */}
      <h1 className="relative z-10 -mt-4 sm:-mt-6 mb-4 font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-light max-w-2xl">
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
        <Link
          href="/"
          className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_rgba(220,38,38,0.32)] transition-colors duration-200 hover:bg-red-500 sm:flex-initial"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>{t('backHome')}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>

        <Link
          href="/menu"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-light/15 bg-light/[0.03] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-light/85 transition-colors duration-200 hover:border-light/30 hover:bg-light/[0.07] sm:flex-initial"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>{t('viewMenu')}</span>
        </Link>
      </div>

      {/* Secondary contact link */}
      <Link
        href="/contact"
        className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm text-light/55 transition-colors duration-200 hover:text-light/85"
      >
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{t('contact')}</span>
      </Link>
    </main>
  );
}
