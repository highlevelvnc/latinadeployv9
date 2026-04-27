import { Playfair_Display, Inter } from 'next/font/google';
import '../[locale]/globals.css';

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

// Standalone layout for owner-facing admin routes (linked from email).
// Lives outside [locale] so the URL stays clean: /admin/reservation/[token].
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.webp" />
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body className="font-sans antialiased bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
