import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import CookieConsent from '@/components/CookieConsent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Locale layout — wraps i18n pages with the next-intl provider.
// Does NOT render <html>/<body>: that lives in the root layout (app/layout.tsx).
//
// The CookieConsent banner lives here (not in the root layout) because it
// uses useTranslations and must be inside NextIntlClientProvider. Routes
// outside [locale] (/admin, /reservation/[token]) are auth-tokenized
// links sent by email and don't render this banner — by design.
export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
