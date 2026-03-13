import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ReservationForm from '@/components/ReservationForm';
import { Calendar } from 'lucide-react';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.reservations' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://latinagrill.pt/${locale}/reservations`,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt/reservas',
        'en': 'https://latinagrill.pt/en/reservations',
        'fr': 'https://latinagrill.pt/fr/reservation',
      },
    },
  };
}

function ReservationsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('reservation');

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-anthracite">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-ruby/10 border border-ruby/20 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-ruby" />
              <span className="text-xs lg:text-sm text-ruby uppercase tracking-widest font-medium">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream mb-4">
              {t('title')}
            </h1>

            <p className="text-base lg:text-lg text-cream/70 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-anthracite-light border border-cream/5 rounded-2xl p-8 lg:p-12">
            <ReservationForm />
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-sm text-cream/60">
            <p>{locale === 'pt' ? 'Horário de funcionamento:' : locale === 'en' ? 'Opening hours:' : 'Horaires d\'ouverture:'}</p>
            <p className="font-medium text-cream/80 mt-1">
              {locale === 'pt' ? 'Ter-Dom: 12h00-15h00, 19h00-23h30' : locale === 'en' ? 'Tue-Sun: 12:00-15:00, 19:00-23:30' : 'Mar-Dim: 12h00-15h00, 19h00-23h30'}
            </p>
            <p className="mt-1">
              {locale === 'pt' ? 'Segunda-feira: Encerrado' : locale === 'en' ? 'Monday: Closed' : 'Lundi: Fermé'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default ReservationsPage;
