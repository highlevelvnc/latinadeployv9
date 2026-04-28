import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always'
});

export const config = {
  // Only match locale-prefixed paths and root.
  // /menu, /reservations, /contact have their own app/<route>/page.tsx
  // which use redirect() to forward to /pt/<route>.
  matcher: ['/', '/(pt|en|fr|ru|zh)/:path*']
};
