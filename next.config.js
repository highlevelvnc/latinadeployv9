const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/**
 * Security headers applied to all routes.
 *
 * Choices:
 * - X-Frame-Options DENY: prevents the site from being embedded in <iframe>
 *   on third-party domains (clickjacking protection).
 * - X-Content-Type-Options nosniff: stops browsers from MIME-sniffing
 *   (e.g. interpreting an uploaded .txt as JS).
 * - Referrer-Policy strict-origin-when-cross-origin: leaks origin only,
 *   not the full URL with query strings, when navigating to other sites.
 * - Permissions-Policy: explicitly disables geolocation/mic/camera/payment
 *   that this site never uses. If a third-party script tries to invoke
 *   them, the browser blocks the call.
 * - Strict-Transport-Security: forces HTTPS for 2 years on this domain
 *   and all subdomains. Vercel handles HTTPS, but the browser-side hint
 *   prevents downgrade attacks on the next visit.
 *
 * NOT including a Content-Security-Policy header here on purpose: it would
 * need carefully-crafted directives to allow Google Tag Manager,
 * google-analytics, Vercel Analytics, Resend tracking pixels, fonts, etc.
 * Easy to ship one that breaks GTM/images. Add later with reportOnly first
 * to audit before enforcing.
 */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/menu', destination: '/pt/menu', permanent: false },
      { source: '/reservations', destination: '/pt/reservations', permanent: false },
      { source: '/contact', destination: '/pt/contact', permanent: false },
      { source: '/reservation', destination: '/pt/reservations', permanent: false },
    ];
  }
};

module.exports = withNextIntl(nextConfig);