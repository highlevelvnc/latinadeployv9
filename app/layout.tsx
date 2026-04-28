import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import './[locale]/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://latinagrill.pt'),
};

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

  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
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
