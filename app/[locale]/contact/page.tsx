import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
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

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://latinagrill.pt/${locale}/contact`,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt/contacto',
        'en': 'https://latinagrill.pt/en/contact',
        'fr': 'https://latinagrill.pt/fr/contact',
      },
    },
  };
}

async function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  const address = 'Estrada Da Malveira da Serra, 261, 2750-782 Cascais, Portugal';
  const addressEncoded = encodeURIComponent(address);
  const phoneNumber = '+351 968 707 515';
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-light mb-4">
              {t('title')}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-8 hover:border-accent-orange/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('address.label')}
                    </h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${addressEncoded}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light/70 hover:text-accent-orange transition-colors leading-relaxed block mb-3"
                    >
                      {t('address.street')}<br />
                      {t('address.city')}
                    </a>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${addressEncoded}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-yellow text-dark px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t('address.openMaps')}
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir//${addressEncoded}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-dark-lighter border border-light/10 hover:border-accent-orange text-light px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                      >
                        <MapPin className="w-4 h-4" />
                        {t('address.directions')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-8 hover:border-accent-orange/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('phone.label')}
                    </h3>
                    <a 
                      href={`tel:${phoneNumberClean}`}
                      className="text-2xl font-bold text-light hover:text-accent-orange transition-colors block mb-2"
                    >
                      {phoneNumber}
                    </a>
                    <p className="text-xs text-light/50 mb-4">{t('phone.networkInfo')}</p>
                    <a
                      href={`tel:${phoneNumberClean}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-6 py-3 rounded-full text-sm font-semibold transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      {t('phone.callText')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-dark-light border border-light/5 rounded-2xl p-8 hover:border-accent-orange/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-full flex-shrink-0">
                    <Instagram className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light mb-3">
                      {t('social.label')}
                    </h3>
                    <a 
                      href="https://www.instagram.com/latina.grill/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-light/70 hover:text-accent-orange transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      @latina.grill
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/reservations`}
                className="block text-center bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-red/40"
              >
                {locale === 'pt' ? 'Reservar Mesa' : locale === 'en' ? 'Book a Table' : 'Réserver'}
              </Link>
            </div>

            {/* Map */}
            <div className="bg-dark-light border border-light/5 rounded-2xl overflow-hidden h-[600px]">
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
      <WhatsAppFloat />
    </>
  );
}

export default ContactPage;
