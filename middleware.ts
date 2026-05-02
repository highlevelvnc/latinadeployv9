import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always',
});

// Wrap next-intl so we can pass the resolved pathname through to the root
// layout (via a custom header). The root layout uses it to set <html lang>
// dynamically — without this it would be hardcoded to 'pt' even on /en/* etc.
export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  // Only match locale-prefixed paths and root.
  // /menu, /reservations, /contact have their own app/<route>/page.tsx
  // which use redirect() to forward to /pt/<route>.
  matcher: ['/', '/(pt|en|fr|ru|zh)/:path*'],
};
