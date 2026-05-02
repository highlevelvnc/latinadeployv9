import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import GtmLoader from '@/components/GtmLoader';
import './[locale]/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://latinagrill.pt'),
};

const SUPPORTED_LOCALES = ['pt', 'en', 'fr', 'ru', 'zh'] as const;

// Reads the `x-pathname` header injected by middleware.ts and extracts the
// locale prefix (/pt/..., /en/..., etc). Falls back to 'pt' for non-i18n
// routes like /admin and /reservation that the middleware doesn't touch.
function resolveLang(): string {
  const pathname = headers().get('x-pathname') ?? '';
  const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const candidate = match?.[1];
  return candidate && (SUPPORTED_LOCALES as readonly string[]).includes(candidate)
    ? candidate
    : 'pt';
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Root layout — owns <html> + <body> for ALL routes (i18n pages and the
// standalone /admin and /reservation routes alike). Per-segment layouts
// (e.g. [locale]/layout) only inject providers, never their own <html>/<body>.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const lang = resolveLang();

  return (
    <html lang={lang} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        {/* Preload logo — used by Header (LCP candidate above the fold)
            and Preloader on first paint. Avoids a render-blocking
            request when the page hydrates. */}
        <link rel="preload" as="image" href="/logo.webp" type="image/webp" />
      </head>
      <body className="font-sans antialiased bg-dark text-light">
        {/* GTM is loaded by the GtmLoader client component, which only
            mounts the script after the user grants analytics consent.
            Loading it unconditionally would fire the cookie BEFORE consent
            — direct RGPD violation. */}
        {gtmId && <GtmLoader gtmId={gtmId} />}
        {children}
      </body>
    </html>
  );
}
