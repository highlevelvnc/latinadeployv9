import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://latinagrill.pt';
  const locales = ['pt', 'en', 'fr'];
  const routes = ['', '/menu', '/reservations', '/contact'];

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            'pt-PT': `${baseUrl}/pt${route}`,
            'en': `${baseUrl}/en${route}`,
            'fr': `${baseUrl}/fr${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
