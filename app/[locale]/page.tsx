import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import LogoOverlap from '@/components/LogoOverlap';
import PremiumMeatGallery from '@/components/PremiumMeatGallery';
import MenuHighlights from '@/components/MenuHighlights';
import RestaurantExperience from '@/components/RestaurantExperience';
import PrivateExperiences from '@/components/PrivateExperiences';
import MeatSection from '@/components/MeatSection';
import DrinksSection from '@/components/DrinksSection';
import EventsSection from '@/components/EventsSection';
import PremiumGallery from '@/components/PremiumGallery';
import OpeningHours from '@/components/OpeningHours';
import Testimonials from '@/components/Testimonials';
import ReservationCTA from '@/components/ReservationCTA';
import Footer from '@/components/Footer';
import PhoneFloat from '@/components/PhoneFloat';
import StickyReservationBar from '@/components/StickyReservationBar';
import Preloader from '@/components/Preloader';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackgroundMusic from '@/components/BackgroundMusic';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  const canonicalUrl = `https://latinagrill.pt/${locale}`;
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt',
        'en': 'https://latinagrill.pt/en',
        'fr': 'https://latinagrill.pt/fr',
        'ru': 'https://latinagrill.pt/ru',
        'zh': 'https://latinagrill.pt/zh',
        'x-default': 'https://latinagrill.pt/pt',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Latina Grill Cascais',
      locale: locale === 'pt' ? 'pt_PT' : locale,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Latina Grill Cascais — Steakhouse',
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

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ScrollProgressBar />
      <Preloader />
      <Header />
      
      <main id="main" className="overflow-hidden">
        {/* 1. Hero Vídeo LIMPO — NÃO ALTERAR */}
        <Hero />

        {/* 2. Localização / Contexto — trust imediato */}
        <LocationSection />

        {/* 3. Experiência / Ambiente — buy-in emocional precoce */}
        <RestaurantExperience />

        {/* 3b. Experiências Privadas — exclusividade e conversão */}
        <PrivateExperiences />

        {/* 4. Logo 3D — transição de marca */}
        <LogoOverlap />

        {/* 5. Premium Meat Gallery — produto hero */}
        <PremiumMeatGallery />

        {/* 6. Carnes Premium Focus — criação de desejo */}
        <MeatSection />

        {/* 7. Menu Completo — converte intenção */}
        <MenuHighlights />

        {/* 8. Drinks & Cocktails — upsell */}
        <DrinksSection />

        {/* 9. Prova Social — antes do CTA final */}
        <Testimonials />

        {/* 10. Eventos Privados — conversão secundária */}
        <EventsSection />

        {/* 11. Galeria Geral — FOMO / Instagram */}
        <PremiumGallery />

        {/* 12. Horários — remove fricção prática */}
        <OpeningHours />

        {/* 13. CTA Final */}
        <div id="reservation-cta">
          <ReservationCTA />
        </div>
      </main>
      
      <Footer />
      <PhoneFloat />
      <StickyReservationBar />
      <BackgroundMusic />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'Latina Grill Cascais',
            description: 'Steakhouse premium em Cascais com cortes do mundo, grelha aberta, carta de vinhos e música ao vivo às sextas e sábados.',
            image: 'https://latinagrill.pt/logo.webp',
            url: 'https://latinagrill.pt',
            telephone: '+351968707515',
            priceRange: '€€€',
            servesCuisine: ['Steakhouse', 'Latin American', 'Portuguese', 'Grilled Meats'],
            menu: `https://latinagrill.pt/${locale}/menu`,
            hasMap: 'https://www.google.com/maps/search/?api=1&query=Estrada+da+Malveira+da+Serra+261+2750-787+Cascais',
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
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ],
                opens: '12:30',
                closes: '15:30',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ],
                opens: '18:30',
                closes: '22:30',
              },
            ],
            paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Visa', 'Mastercard', 'American Express'],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Open Grill' },
              { '@type': 'LocationFeatureSpecification', name: 'Accessibility' },
              { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' },
              { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating' },
              { '@type': 'LocationFeatureSpecification', name: 'Parking' },
              { '@type': 'LocationFeatureSpecification', name: 'Private Events' },
              { '@type': 'LocationFeatureSpecification', name: 'Wedding Venue' },
              { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
              { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1000',
              bestRating: '5',
              worstRating: '1',
            },
            sameAs: [
              'https://www.instagram.com/latina.grill/',
              'https://share.google/8vw79KB0bb72pWBIA'
            ],
          }),
        }}
      />
    </>
  );
}
