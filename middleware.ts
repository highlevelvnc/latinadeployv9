import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always',
});

// ─── Maintenance-mode flag ───────────────────────────────────────────────────
// Toggled via Vercel env var. When 'true', ALL public traffic gets rewritten
// to /maintenance. The real site stays in the repo — nothing is deleted; it's
// just hidden until MAINTENANCE_MODE is flipped back to anything else.
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';

// Paths that must keep working even during maintenance:
//   - /maintenance itself (the page we rewrite TO)
//   - /api/* (so admin/cron jobs still run; remove if you want to kill these too)
//   - /_next, /favicon, static assets — handled by the matcher excluding them
function isAllowedDuringMaintenance(pathname: string): boolean {
  return (
    pathname === '/maintenance' ||
    pathname.startsWith('/api/')
  );
}

// Matches the locale-prefixed paths the i18n middleware should handle.
// Non-locale routes (/admin, /reservation/[token]) must pass through
// untouched — they have their own redirects and would break if rewritten.
const LOCALE_ROUTE_RE = /^\/(pt|en|fr|ru|zh)(\/|$)/;

// Wrap next-intl so we can pass the resolved pathname through to the root
// layout (via a custom header). The root layout uses it to set <html lang>
// dynamically — without this it would be hardcoded to 'pt' even on /en/* etc.
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance short-circuit. Status 503 tells Google "this is temporary,
  // don't reindex me as permanently down". Applies to ALL paths except the
  // explicit allow-list (the maintenance page itself, API routes).
  if (MAINTENANCE_MODE && !isAllowedDuringMaintenance(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url, { status: 503 });
  }

  // Outside maintenance mode: only the i18n middleware needs to fire, and
  // only for the locale-prefixed routes + the root. Everything else (admin
  // panel, reservation token pages) passes through untouched.
  const isLocaleRoute = pathname === '/' || LOCALE_ROUTE_RE.test(pathname);
  if (!isLocaleRoute) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  // Broad matcher so maintenance-mode can intercept any public URL.
  // Excludes:
  //   - /api/* (handled explicitly in the function above)
  //   - /_next/* (Next internals: assets, RSC, image optimization)
  //   - /maintenance (the page we rewrite TO)
  //   - paths with an extension (favicon.ico, logo.webp, sitemap.xml, robots.txt)
  matcher: [
    '/((?!api|_next|maintenance|.*\\..*).*)',
  ],
};
