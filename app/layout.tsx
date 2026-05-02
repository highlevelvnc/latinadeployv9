import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
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
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased bg-dark text-light">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
