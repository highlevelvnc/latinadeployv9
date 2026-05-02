import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneFloat from '@/components/PhoneFloat';
import OpeningHours from '@/components/OpeningHours';
import PaymentMethods from '@/components/PaymentMethods';
import Amenities from '@/components/Amenities';
import { MapPin, Phone, Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  const url = `https://latinagrill.pt/${locale}/contact`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt/contact',
        'en':    'https://latinagrill.pt/en/contact',
        'fr':    'https://latinagrill.pt/fr/contact',
        'ru':    'https://latinagrill.pt/ru/contact',
        'zh':    'https://latinagrill.pt/zh/contact',
        'x-default': 'https://latinagrill.pt/pt/contact',
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
          alt: 'Latina Grill Cascais — Contacto',
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

async function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const address = 'Estrada da Malveira da Serra, 261, 2750-787 Cascais, Portugal';
  const addressEncoded = encodeURIComponent(address);
  const phoneNumber = '+351 968 707 515';
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');

  // Schema.org — BreadcrumbList for SERPs path display, ContactPage signals
  // Google this is the canonical contact page (helps Google Knowledge Panel).
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
        item: `https://latinagrill.pt/${locale}/contact`,
      },
    ],
  };

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('title'),
    url: `https://latinagrill.pt/${locale}/contact`,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Latina Grill Cascais',
      telephone: '+351968707515',
      email: 'latinagrill@icloud.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Estrada da Malveira da Serra, 261',
        addressLocality: 'Cascais',
        postalCode: '2750-787',
        addressCountry: 'PT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 38.7245,
        longitude: -9.4425,
      },
    },
  };

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-[2rem] sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-light mb-4 leading-tight">
              {t('title')}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Info Cards */}
            <div className="space-y-5 sm:space-y-6">
              {/* Address */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-6 sm:p-8 hover:border-accent-orange/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('address.label')}
                    </h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${addressEncoded}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light/75 hover:text-accent-orange transition-colors leading-relaxed block mb-3"
                    >
                      {t('address.street')}<br />
                      {t('address.city')}
                    </a>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${addressEncoded}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-yellow text-dark px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        {t('address.openMaps')}
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir//${addressEncoded}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-dark-lighter border border-light/10 hover:border-accent-orange text-light px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
                      >
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        {t('address.directions')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-6 sm:p-8 hover:border-accent-orange/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('phone.label')}
                    </h3>
                    <a
                      href={`tel:${phoneNumberClean}`}
                      className="text-xl sm:text-2xl font-bold text-light hover:text-accent-orange transition-colors block mb-2 break-all"
                    >
                      {phoneNumber}
                    </a>
                    <p className="text-xs text-light/65 mb-4">{t('phone.networkInfo')}</p>
                    <a
                      href={`tel:${phoneNumberClean}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-dark hover:from-red-500 hover:to-red-600 text-light px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {t('phone.callText')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-6 sm:p-8 hover:border-accent-orange/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <Instagram className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('social.label')}
                    </h3>
                    <a
                      href="https://www.instagram.com/latina.grill/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-light/75 hover:text-accent-orange transition-colors"
                    >
                      <Instagram className="w-5 h-5" aria-hidden="true" />
                      @latina.grill
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/reservations`}
                className="block text-center bg-gradient-to-r from-red-600 to-red-dark hover:from-red-500 hover:to-red-600 text-light px-8 py-4 rounded-full text-base font-semibold transition-colors duration-300 hover:shadow-xl hover:shadow-red-600/40"
              >
                {tNav('reserve')}
              </Link>
            </div>

            {/* Map */}
            <div className="bg-dark-light border border-light/5 rounded-2xl overflow-hidden h-[360px] sm:h-[480px] lg:h-[600px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.234!2d-9.4425!3d38.7245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzI4LjIiTiA5wrAyNiczMy4wIlc!5e0!3m2!1spt-PT!2spt!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Latina Grill Cascais Location"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <OpeningHours />

        {/* Payment Methods */}
        <PaymentMethods />

        {/* Amenities */}
        <Amenities />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}

export default ContactPage;
