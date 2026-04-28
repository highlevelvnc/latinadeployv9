const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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