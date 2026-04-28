import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always'
});

export const config = {
  // Match every path except API routes, Next internals, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
