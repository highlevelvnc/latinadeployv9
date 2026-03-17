import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import LogoOverlap from '@/components/LogoOverlap';
import PremiumMeatGallery from '@/components/PremiumMeatGallery';
import MenuHighlights from '@/components/MenuHighlights';
import RestaurantExperience from '@/components/RestaurantExperience';
import MeatSection from '@/components/MeatSection';
import DrinksSection from '@/components/DrinksSection';
import EventsSection from '@/components/EventsSection';
import PremiumGallery from '@/components/PremiumGallery';
import OpeningHours from '@/components/OpeningHours';
import Testimonials from '@/components/Testimonials';
import ReservationCTA from '@/components/ReservationCTA';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Preloader from '@/components/Preloader';
import ScrollProgressBar from '@/components/ScrollProgressBar';

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
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Latina Grill Cascais',
        },
      ],
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
      
      <main className="overflow-hidden">
        {/* 1. Hero Vídeo LIMPO */}
        <Hero />
        
        {/* 2. Localização Cascais */}
        <LocationSection />
        
        {/* 3. Logo 3D Girando */}
        <LogoOverlap />
        
        {/* 4. Premium Meat Gallery - Frigorífico + Bandejas */}
        <PremiumMeatGallery />
        
        {/* 5. Menu Completo */}
        <MenuHighlights />
        
        {/* 6. Experiência Restaurante - 8 Fotos */}
        <RestaurantExperience />
        
        {/* 7. Carnes Premium Focus */}
        <MeatSection />
        
        {/* 8. Drinks & Cocktails */}
        <DrinksSection />
        
        {/* 9. Eventos Privados */}
        <EventsSection />
        
        {/* 10. Galeria Geral */}
        <PremiumGallery />
        
        {/* 11. Horários */}
        <OpeningHours />
        
        {/* 12. Testimonials */}
        <Testimonials />
        
        {/* 13. CTA Final */}
        <ReservationCTA />
      </main>
      
      <Footer />
      <WhatsAppFloat />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'Latina Grill Cascais',
            description: 'Steakhouse premium em Cascais com cortes do mundo, grelha aberta, carta de vinhos e música ao vivo às sextas e sábados.',
            image: 'https://latinagrill.pt/logo.png',
            url: 'https://latinagrill.pt',
            telephone: '+351968707515',
            priceRange: '€€€',
            servesCuisine: ['Steakhouse', 'Latin American', 'Portuguese', 'Grilled Meats'],
            menu: 'https://latinagrill.pt/latina-grill-menu.pdf',
            hasMap: 'https://www.google.com/maps/search/?api=1&query=Estrada+Da+Malveira+da+Serra+261+2750-782+Cascais',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Estrada Da Malveira da Serra, 261',
              addressLocality: 'Cascais',
              postalCode: '2750-782',
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
                closes: '16:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                ],
                opens: '18:30',
                closes: '23:00',
              },
            ],
            paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Visa', 'Mastercard', 'American Express'],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Open Grill' },
              { '@type': 'LocationFeatureSpecification', name: 'Accessibility' },
              { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' },
              { '@type': 'LocationFeatureSpecification', name: 'Delivery' },
              { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating' },
              { '@type': 'LocationFeatureSpecification', name: 'Parking' },
              { '@type': 'LocationFeatureSpecification', name: 'Private Events' },
              { '@type': 'LocationFeatureSpecification', name: 'Takeaway' },
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
