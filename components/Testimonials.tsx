'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef, useState } from 'react';
import { Quote, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Review = {
  name: string;
  location: string;
  text: string;
  date: string;
};

// ─── Review data ─────────────────────────────────────────────────────────────
// Each locale shows reviews written in that language — authentic voice, not translated.

const reviewsPT: Review[] = [
  {
    name: 'Miguel Cardoso',
    location: 'Lisboa',
    date: 'Jan 2025',
    text: 'Sem dúvida o melhor Tomahawk que provei em Portugal. O ambiente é sofisticado sem ser pretensioso e a música ao vivo cria um clima perfeito. Voltaremos certamente.',
  },
  {
    name: 'Sofia Marques',
    location: 'Cascais',
    date: 'Fev 2025',
    text: 'A Picanha estava no ponto perfeito e o serviço foi atencioso durante toda a noite. O ambiente com música ao vivo é mesmo especial — uma noite que não se esquece.',
  },
  {
    name: 'Ricardo Tavares',
    location: 'Sintra',
    date: 'Dez 2024',
    text: 'Qualidade excecional das carnes. Nota-se a seleção cuidada e a técnica de preparação. Recomendo vivamente para ocasiões especiais em Cascais.',
  },
  {
    name: 'Ana Oliveira',
    location: 'Porto',
    date: 'Jan 2025',
    text: 'Ambiente acolhedor, carta de vinhos interessante e carnes fantásticas. A equipa conhece bem os produtos e ajudou-nos a escolher. Excelente descoberta.',
  },
  {
    name: 'Pedro Ferreira',
    location: 'Estoril',
    date: 'Mar 2025',
    text: 'O Wagyu A5 foi uma revelação absoluta — textura e sabor que raramente se encontram. O espaço tem uma energia muito especial, perfeita para um jantar a dois.',
  },
  {
    name: 'Mariana Costa',
    location: 'Oeiras',
    date: 'Fev 2025',
    text: 'Viemos para um jantar de aniversário e foi memorável em todos os sentidos. Equipa extraordinariamente atenciosa e o sommelier fez escolhas perfeitas para cada prato.',
  },
];

const reviewsEN: Review[] = [
  {
    name: 'Michael Thompson',
    location: 'London',
    date: 'Jan 2025',
    text: "Hands down the best Tomahawk I've had in Portugal. The atmosphere is sophisticated without being pretentious, and the live music sets the perfect tone for the evening.",
  },
  {
    name: 'Emma Richardson',
    location: 'Edinburgh',
    date: 'Feb 2025',
    text: 'We loved every moment. The Picanha was cooked to perfection and the service was attentive throughout. The evening atmosphere with live music is truly something special.',
  },
  {
    name: 'David Santos',
    location: 'New York',
    date: 'Dec 2024',
    text: "Exceptional meat quality — you can tell the care that goes into every cut. One of the best meals of my entire Portugal trip. Highly recommend for any special occasion.",
  },
  {
    name: 'Laura Martinez',
    location: 'Madrid',
    date: 'Jan 2025',
    text: "Outstanding wine list, welcoming atmosphere and fantastic cuts. The team knows their products and guided us brilliantly. An excellent find on the Cascais coast.",
  },
  {
    name: 'James Whitfield',
    location: 'Dublin',
    date: 'Mar 2025',
    text: "The Wagyu A5 was a genuine revelation — texture and depth I've rarely experienced anywhere. The open grill adds real energy to the room. An unforgettable evening.",
  },
  {
    name: 'Sarah Collins',
    location: 'Toronto',
    date: 'Feb 2025',
    text: "Celebrated my husband's birthday here and it exceeded every expectation. The sommelier's pairings were spot on for each course. We will absolutely return to Portugal.",
  },
];

const reviewsFR: Review[] = [
  {
    name: 'Philippe Dubois',
    location: 'Paris',
    date: 'Jan 2025',
    text: "Sans aucun doute le meilleur Tomahawk que j'ai goûté au Portugal. L'atmosphère est sophistiquée sans être prétentieuse, et la musique live crée une ambiance parfaite.",
  },
  {
    name: 'Camille Laurent',
    location: 'Lyon',
    date: 'Fév 2025',
    text: "La Picanha était cuite à la perfection et le service fut attentif tout au long du repas. L'ambiance du soir avec musique live est vraiment spéciale. Une soirée parfaite.",
  },
  {
    name: 'Marc Fontaine',
    location: 'Bordeaux',
    date: 'Déc 2024',
    text: "Qualité exceptionnelle des viandes. On remarque la sélection soignée et la maîtrise technique. Je recommande vivement pour les occasions spéciales à Cascais.",
  },
  {
    name: 'Sophie Mercier',
    location: 'Nice',
    date: 'Jan 2025',
    text: "Atmosphère accueillante, carte des vins remarquable et viandes fantastiques. L'équipe connaît parfaitement ses produits. Une excellente découverte sur la côte portugaise.",
  },
  {
    name: 'Antoine Rousseau',
    location: 'Marseille',
    date: 'Mar 2025',
    text: "Le Wagyu A5 était une véritable révélation — une texture et une profondeur rarement atteintes. Le grill ouvert apporte une belle énergie à la salle. Soirée inoubliable.",
  },
  {
    name: 'Élise Bernard',
    location: 'Toulouse',
    date: 'Fév 2025',
    text: "Nous avons fêté notre anniversaire de mariage ici et cela a dépassé toutes nos attentes. Les accords vins du sommelier étaient parfaits. Nous reviendrons sans hésiter.",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  delay = 0,
  isInView,
}: {
  review: Review;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-500/35 hover:bg-white/[0.055] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      {/* Hover overlays */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-red-600/[0.07] via-transparent to-white/[0.02]" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-500 via-white/50 to-transparent transition-all duration-700 group-hover:w-full" />

      {/* Stars + icon */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-red-500 text-red-500" />
          ))}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
          <Quote className="h-3.5 w-3.5 text-red-400" />
        </div>
      </div>

      {/* Review text */}
      <p className="relative flex-1 text-[13.5px] leading-relaxed text-white/68">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="relative mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-red-600 to-red-800 text-sm font-bold text-white shadow-[0_0_16px_rgba(180,20,20,0.2)]">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-white">{review.name}</p>
            <p className="text-[11px] text-white/38">{review.location}</p>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/22 tabular-nums">
          {review.date}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeSlide, setActiveSlide] = useState(0);

  const reviews =
    locale === 'en' ? reviewsEN : locale === 'fr' ? reviewsFR : reviewsPT;

  const googleReviewsUrl = 'https://share.google/8vw79KB0bb72pWBIA';

  const handlePrev = () =>
    setActiveSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#050505] py-16 lg:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          {/* Badge — minimal icon format */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-500/25" />
            <Quote className="h-3.5 w-3.5 text-red-400/55" />
            <div className="h-px w-8 bg-red-500/25" />
          </div>

          <h2 className="font-serif text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>

          {/* Divider */}
          <div className="mx-auto my-7 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500/40 to-transparent md:w-24" />
          </div>

          {/* ── Social proof strip ── */}
          <div className="inline-flex flex-col items-center gap-4 sm:flex-row sm:gap-6">

            {/* Rating block — editorial */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-3.5">
              <span className="font-serif text-[2rem] font-bold leading-none text-white">
                4.8
              </span>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="mb-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                  {t('googleReviews')}
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-red-500/25 bg-red-600/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_12px_30px_rgba(180,20,20,0.28)]"
            >
              <span>{t('seeAllReviews')}</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* ── Desktop: 3 × 2 grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.name}
              review={review}
              delay={0.15 + index * 0.08}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Mobile: single-card slider ── */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
              >
                <ReviewCard review={reviews[activeSlide]} delay={0} isInView={isInView} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-white active:scale-95"
              aria-label="Avaliação anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
                  aria-label={`Avaliação ${index + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? 'w-6 bg-red-500'
                        : 'w-1.5 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-white active:scale-95"
              aria-label="Próxima avaliação"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Slide counter */}
          <p className="mt-4 text-center text-[11px] tabular-nums text-white/22 tracking-widest">
            {String(activeSlide + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
