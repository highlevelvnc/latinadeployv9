import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneFloat from '@/components/PhoneFloat';
import ReservationForm from '@/components/ReservationForm';
import { Calendar } from 'lucide-react';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.reservations' });
  const url = `https://latinagrill.pt/${locale}/reservations`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt/reservations',
        'en':    'https://latinagrill.pt/en/reservations',
        'fr':    'https://latinagrill.pt/fr/reservations',
        'ru':    'https://latinagrill.pt/ru/reservations',
        'zh':    'https://latinagrill.pt/zh/reservations',
        'x-default': 'https://latinagrill.pt/pt/reservations',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Latina Grill Cascais',
      locale: locale === 'pt' ? 'pt_PT' : locale,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Latina Grill Cascais — Reservas',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  };
}

function ReservationsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('reservation');

  // Schema.org structured data — BreadcrumbList helps Google show the page
  // path in SERPs; ReserveAction signals to Google "this is the booking
  // page", which can surface a Reserve button directly in search results.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Latina Grill Cascais',
        item: `https://latinagrill.pt/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: `https://latinagrill.pt/${locale}/reservations`,
      },
    ],
  };

  const reserveActionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Latina Grill Cascais',
    url: 'https://latinagrill.pt',
    telephone: '+351968707515',
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://latinagrill.pt/${locale}/reservations`,
        inLanguage: locale,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'FoodEstablishmentReservation',
        name: 'Reserva no Latina Grill Cascais',
      },
    },
  };

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-red-500" aria-hidden="true" />
              <span className="text-xs lg:text-sm text-red-400 uppercase tracking-widest font-medium">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-[2rem] sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-light mb-4 leading-tight">
              {t('title')}
            </h1>

            <p className="text-base lg:text-lg text-light/75 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-dark-light border border-light/5 rounded-2xl p-5 sm:p-8 lg:p-12">
            <ReservationForm />
          </div>

          {/* Additional Info */}
          <div className="mt-10 sm:mt-12 text-center text-sm text-light/65">
            <p>{t('form.openingHoursLabel')}</p>
            <p className="font-medium text-light/85 mt-1">
              {t('form.openingHoursValue')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <PhoneFloat />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reserveActionJsonLd) }}
      />
    </>
  );
}

export default ReservationsPage;
