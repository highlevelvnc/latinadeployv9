import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from 'next';
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
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
      </head>
      <body className="font-sans antialiased bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
