import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.menu' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://latinagrill.pt/${locale}/menu`,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt/menu',
        'en': 'https://latinagrill.pt/en/menu',
        'fr': 'https://latinagrill.pt/fr/menu',
      },
    },
  };
}

function MenuPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const menuSections = {
    pt: [
      {
        title: 'Entradas Premium',
        items: [
          { name: 'Carpaccio de Vaca Premium', desc: 'Lâminas finas de carne premium com rúcula, parmesão e azeite trufado' },
          { name: 'Tártaro de Atum Vermelho', desc: 'Tártaro fresco com molho ponzu, abacate e sementes de sésamo' },
          { name: 'Burrata com Tomate Heritage', desc: 'Queijo burrata cremoso, tomates coloridos, manjericão e redução balsâmica' },
        ],
      },
      {
        title: 'Carnes do Mundo',
        items: [
          { name: 'Wagyu Japonês A5', desc: 'O mais premium. Marmoreado excecional, textura sedosa' },
          { name: 'Black Angus Argentino', desc: 'Criado em pampas livres. Suculento e robusto' },
          { name: 'Tomahawk Maturado 45 dias', desc: 'Apresentação impressionante. Para 2 pessoas' },
          { name: 'Picanha Brasileira', desc: 'O clássico sul-americano. Técnica tradicional' },
          { name: 'Entrecôte de Vaca Galega', desc: 'Carne galega de qualidade superior' },
          { name: 'Churrasco Misto Premium', desc: 'Seleção dos melhores cortes para partilhar' },
        ],
      },
      {
        title: 'Acompanhamentos',
        items: [
          { name: 'Batatas Rústicas ao Forno' },
          { name: 'Legumes Grelhados da Época' },
          { name: 'Arroz de Açafrão' },
          { name: 'Salada Latina (mix verde, tomate cherry, queijo feta)' },
        ],
      },
    ],
    en: [
      {
        title: 'Premium Starters',
        items: [
          { name: 'Premium Beef Carpaccio', desc: 'Thin slices of premium meat with arugula, parmesan and truffle oil' },
          { name: 'Red Tuna Tartare', desc: 'Fresh tartare with ponzu sauce, avocado and sesame seeds' },
          { name: 'Burrata with Heritage Tomatoes', desc: 'Creamy burrata cheese, colorful tomatoes, basil and balsamic reduction' },
        ],
      },
      {
        title: 'Meats from Around the World',
        items: [
          { name: 'Japanese Wagyu A5', desc: 'The most premium. Exceptional marbling, silky texture' },
          { name: 'Argentinian Black Angus', desc: 'Raised on free-range pampas. Succulent and robust' },
          { name: '45-day Aged Tomahawk', desc: 'Impressive presentation. For 2 people' },
          { name: 'Brazilian Picanha', desc: 'The South American classic. Traditional technique' },
          { name: 'Galician Beef Ribeye', desc: 'Superior quality Galician beef' },
          { name: 'Premium Mixed Grill', desc: 'Selection of the best cuts to share' },
        ],
      },
      {
        title: 'Sides',
        items: [
          { name: 'Rustic Oven-Roasted Potatoes' },
          { name: 'Grilled Seasonal Vegetables' },
          { name: 'Saffron Rice' },
          { name: 'Latina Salad (mixed greens, cherry tomatoes, feta cheese)' },
        ],
      },
    ],
    fr: [
      {
        title: 'Entrées Premium',
        items: [
          { name: 'Carpaccio de Bœuf Premium', desc: 'Tranches fines de viande premium avec roquette, parmesan et huile de truffe' },
          { name: 'Tartare de Thon Rouge', desc: 'Tartare frais avec sauce ponzu, avocat et graines de sésame' },
          { name: 'Burrata aux Tomates Heritage', desc: 'Fromage burrata crémeux, tomates colorées, basilic et réduction balsamique' },
        ],
      },
      {
        title: 'Viandes du Monde',
        items: [
          { name: 'Wagyu Japonais A5', desc: 'Le plus premium. Persillage exceptionnel, texture soyeuse' },
          { name: 'Black Angus Argentin', desc: 'Élevé dans les pampas en liberté. Succulent et robuste' },
          { name: 'Tomahawk Maturé 45 jours', desc: 'Présentation impressionnante. Pour 2 personnes' },
          { name: 'Picanha Brésilienne', desc: 'Le classique sud-américain. Technique traditionnelle' },
          { name: 'Entrecôte de Bœuf Galicien', desc: 'Bœuf galicien de qualité supérieure' },
          { name: 'Grill Mixte Premium', desc: 'Sélection des meilleurs morceaux à partager' },
        ],
      },
      {
        title: 'Accompagnements',
        items: [
          { name: 'Pommes de Terre Rustiques au Four' },
          { name: 'Légumes Grillés de Saison' },
          { name: 'Riz au Safran' },
          { name: 'Salade Latina (mélange vert, tomates cerises, feta)' },
        ],
      },
    ],
  };

  const sections = menuSections[locale as keyof typeof menuSections] || menuSections.pt;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-anthracite">
        {/* Hero Section */}
        <div className="relative h-[40vh] mb-16">
          <Image
            src="https://cdn.website.dish.co/media/63/00/5189658/Latina-Grill-Steakhouse-252307627-293654599429443-5315061003337340379-n-jpg.jpg"
            alt="Menu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite/80 via-anthracite/60 to-anthracite" />
          <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream text-center">
              {locale === 'pt' ? 'Menu' : locale === 'en' ? 'Menu' : 'Menu'}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold mb-8 border-b border-gold/20 pb-4">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-cream/5 pb-4 last:border-0">
                    <h3 className="text-lg md:text-xl font-semibold text-cream mb-2">
                      {item.name}
                    </h3>
                    {item.desc && (
                      <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href={`/${locale}/reservations`}
              className="inline-flex bg-ruby hover:bg-ruby-light text-cream px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-ruby/40"
            >
              {locale === 'pt' ? 'Reservar Mesa' : locale === 'en' ? 'Book a Table' : 'Réserver'}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default MenuPage;
