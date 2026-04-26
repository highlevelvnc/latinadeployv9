'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';

// ─── Image sources ────────────────────────────────────────────────────────────
const IMAGES = {
  cigar:    '/habanoscharuto.jpeg',   // Sala de charutos — cigar lounge hero
  private1: '/mesavazia.jpeg',        // Salas privativas — intimate table setting
  service:  '/clientes1.webp',        // Atendimento dedicado — private service
  terrace:  '/restaurantelocal4.webp',// Esplanada privada — outdoor setting
  private2: '/restaurantelocal7.jpeg',// Ambientes privativos — venue atmosphere
};

// ─── Copy ─────────────────────────────────────────────────────────────────────

const CONTENT = {
  pt: {
    overline: 'Exclusividade · Privacidade · Requinte',
    title: 'Momentos\nExclusivos.',
    subtitle: 'Espaços pensados para quem exige o melhor — em total privacidade.',
    contactLabel: 'Pedidos privados',
    experiences: [
      {
        id: 'charutos',
        tag: 'Sala de Charutos',
        title: 'O Ritual\ndo Charuto',
        desc: 'Uma sala dedicada ao prazer lento. Selecção de charutos premium, whisky aged e cognac. O lugar certo para encerrar uma refeição com o silêncio e o aroma que merecem.',
        detail: 'Por convite · Selecção curada',
      },
      {
        id: 'salas',
        tag: 'Salas Privativas',
        title: 'Mesa Privada',
        desc: 'Salas reservadas para grupos. Menu dedicado, sommelier à disposição e serviço exclusivo do início ao fim.',
        detail: 'Até 40 pessoas · Sob reserva',
      },
      {
        id: 'atendimento',
        tag: 'Serviço Privado',
        title: 'Atendimento\nDedicado',
        desc: 'A sua refeição gerida por um anfitrião exclusivo. Nenhum detalhe ao acaso — desde a disposição da mesa à escolha do vinho.',
        detail: 'Menu personalizado · Chef à mesa',
      },
      {
        id: 'esplanada',
        tag: 'Esplanada Privada',
        title: 'Ao Ar Livre,\nem Privado',
        desc: 'Esplanada reservada para jantares intimistas. O aroma da brasa, o céu de Cascais e a sua mesa — só sua.',
        detail: 'Ambiente exterior · Reserva exclusiva',
      },
      {
        id: 'eventos',
        tag: 'Ambientes Privativos',
        title: 'Celebrações\nExclusivas',
        desc: 'Casamentos, aniversários, corporate dinners. O Latina Grill adapta-se à sua celebração com a discrição e elegância que exige.',
        detail: 'Personalização total · Evento único',
      },
    ],
  },
  en: {
    overline: 'Exclusivity · Privacy · Refinement',
    title: 'Exclusive\nMoments.',
    subtitle: 'Spaces designed for those who demand the best — in total privacy.',
    contactLabel: 'Private enquiries',
    experiences: [
      {
        id: 'charutos',
        tag: 'Cigar Lounge',
        title: 'The Cigar\nRitual',
        desc: 'A room dedicated to slow pleasure. A selection of premium cigars, aged whisky and cognac. The right place to close a meal with the silence and aroma they deserve.',
        detail: 'By invitation · Curated selection',
      },
      {
        id: 'salas',
        tag: 'Private Rooms',
        title: 'Private\nTable',
        desc: 'Reserved rooms for groups. Dedicated menu, sommelier on hand and exclusive service from start to finish.',
        detail: 'Up to 40 guests · Upon reservation',
      },
      {
        id: 'atendimento',
        tag: 'Private Service',
        title: 'Dedicated\nAttendance',
        desc: 'Your meal managed by an exclusive host. Nothing left to chance — from table arrangement to wine selection.',
        detail: 'Tailored menu · Chef at the table',
      },
      {
        id: 'esplanada',
        tag: 'Private Terrace',
        title: 'Outdoors,\nin Private',
        desc: 'Reserved terrace for intimate dinners. The scent of charcoal, the Cascais sky and your table — yours alone.',
        detail: 'Outdoor setting · Exclusive reservation',
      },
      {
        id: 'eventos',
        tag: 'Private Venues',
        title: 'Exclusive\nCelebrations',
        desc: 'Weddings, anniversaries, corporate dinners. Latina Grill adapts to your celebration with the discretion and elegance it demands.',
        detail: 'Full personalisation · One-of-a-kind event',
      },
    ],
  },
  fr: {
    overline: 'Exclusivité · Intimité · Raffinement',
    title: 'Moments\nExclusifs.',
    subtitle: 'Des espaces pensés pour ceux qui exigent le meilleur — en toute intimité.',
    contactLabel: 'Demandes privées',
    experiences: [
      {
        id: 'charutos',
        tag: 'Salon Cigares',
        title: 'Le Rituel\ndu Cigare',
        desc: 'Une salle dédiée au plaisir lent. Sélection de cigares premium, whisky vieilli et cognac. L\'endroit idéal pour clore un repas avec le silence et les arômes qu\'il mérite.',
        detail: 'Sur invitation · Sélection curatée',
      },
      {
        id: 'salas',
        tag: 'Salles Privées',
        title: 'Table\nPrivée',
        desc: 'Salles réservées pour groupes. Menu dédié, sommelier à disposition et service exclusif du début à la fin.',
        detail: "Jusqu'à 40 personnes · Sur réservation",
      },
      {
        id: 'atendimento',
        tag: 'Service Privé',
        title: 'Accompagnement\nPersonnalisé',
        desc: 'Votre repas géré par un hôte exclusif. Aucun détail laissé au hasard — de la disposition de la table au choix du vin.',
        detail: 'Menu personnalisé · Chef à table',
      },
      {
        id: 'esplanada',
        tag: 'Terrasse Privée',
        title: 'En Plein Air,\nen Privé',
        desc: 'Terrasse réservée pour dîners intimistes. L\'arôme des braises, le ciel de Cascais et votre table — rien que pour vous.',
        detail: 'Cadre extérieur · Réservation exclusive',
      },
      {
        id: 'eventos',
        tag: 'Espaces Privatifs',
        title: 'Célébrations\nExclusives',
        desc: 'Mariages, anniversaires, dîners corporate. Le Latina Grill s\'adapte à votre célébration avec la discrétion et l\'élégance qu\'elle mérite.',
        detail: 'Personnalisation totale · Événement unique',
      },
    ],
  },
  ru: {
    overline: 'Эксклюзивность · Конфиденциальность · Изысканность',
    title: 'Эксклюзивные\nМоменты.',
    subtitle: 'Пространства для тех, кто требует лучшего — в полной приватности.',
    contactLabel: 'Частные запросы',
    experiences: [
      {
        id: 'charutos',
        tag: 'Сигарный Зал',
        title: 'Ритуал\nСигары',
        desc: 'Зал, посвящённый неспешному удовольствию. Отборные сигары, выдержанный виски и коньяк. Идеальное место для завершения трапезы.',
        detail: 'По приглашению · Кураторский выбор',
      },
      {
        id: 'salas',
        tag: 'Частные Залы',
        title: 'Частный\nСтол',
        desc: 'Зарезервированные залы для групп. Индивидуальное меню, сомелье и эксклюзивное обслуживание.',
        detail: 'До 40 гостей · По брони',
      },
      {
        id: 'atendimento',
        tag: 'Личный Сервис',
        title: 'Персональное\nОбслуживание',
        desc: 'Ваш ужин под управлением личного хозяина. Ни одной случайной детали — от сервировки до выбора вина.',
        detail: 'Персональное меню · Шеф у стола',
      },
      {
        id: 'esplanada',
        tag: 'Частная Терраса',
        title: 'На Воздухе,\nНаедине',
        desc: 'Зарезервированная терраса для интимных ужинов. Аромат углей, небо Каскайша и ваш стол.',
        detail: 'Терраса · Эксклюзивная бронь',
      },
      {
        id: 'eventos',
        tag: 'Приватные Мероприятия',
        title: 'Эксклюзивные\nПраздники',
        desc: 'Свадьбы, юбилеи, корпоративные ужины. Latina Grill адаптируется к вашему торжеству с полной дискретностью.',
        detail: 'Полная персонализация · Уникальное событие',
      },
    ],
  },
  zh: {
    overline: '尊享 · 私密 · 精致',
    title: '尊享\n时光。',
    subtitle: '为追求极致的您精心打造——完全私密的专属空间。',
    contactLabel: '私人咨询',
    experiences: [
      {
        id: 'charutos',
        tag: '雪茄室',
        title: '雪茄\n仪式',
        desc: '专属慢享空间。臻选顶级雪茄、陈年威士忌与白兰地。在这里，以静谧与芬芳为美食画下完美句点。',
        detail: '凭邀请入场 · 精心策选',
      },
      {
        id: 'salas',
        tag: '私人包厢',
        title: '专属\n餐桌',
        desc: '为团体保留的专属包厢。定制菜单、专属侍酒师与全程独享服务。',
        detail: '最多40位宾客 · 需提前预约',
      },
      {
        id: 'atendimento',
        tag: '专属服务',
        title: '专属\n管家服务',
        desc: '由专属管家全程协调您的用餐体验。从餐桌布置到葡萄酒选择，每个细节都精心安排。',
        detail: '定制菜单 · 主厨到台',
      },
      {
        id: 'esplanada',
        tag: '私人露台',
        title: '户外\n私享',
        desc: '专属露台，打造亲密晚宴。炭烤香气、卡斯凯什的天空，以及属于您的私密餐桌。',
        detail: '户外环境 · 独家预约',
      },
      {
        id: 'eventos',
        tag: '私人场地',
        title: '专属\n庆典',
        desc: '婚礼、周年纪念、商务晚宴。Latina Grill以您所需的低调与优雅，成就您的专属庆典。',
        detail: '全方位定制 · 独一无二',
      },
    ],
  },
} as const;

type LocaleKey = keyof typeof CONTENT;

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrivateExperiences() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const rawLocale = useLocale();
  const locale: LocaleKey = (rawLocale in CONTENT ? rawLocale : 'pt') as LocaleKey;
  const c = CONTENT[locale];

  const [hero, ...rest] = c.experiences;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-36"
      style={{ background: 'linear-gradient(160deg, #09070a 0%, #0c0608 60%, #080506 100%)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-950/8 blur-[240px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-red-950/10 blur-[200px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="mb-14 max-w-xl"
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.52em] text-amber-400/40">
            {c.overline}
          </p>
          <h2 className="whitespace-pre-line font-serif text-4xl font-bold leading-[1.06] text-white md:text-5xl lg:text-[3.5rem]">
            {c.title}
          </h2>
          <p className="mt-5 max-w-[400px] text-[13.5px] leading-relaxed text-white/38">
            {c.subtitle}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">

          {/* Hero — Sala de Charutos — spans 2 rows on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl min-h-[360px] lg:row-span-2 lg:min-h-[640px]"
          >
            {/* Background image */}
            <Image
              src={IMAGES.cigar}
              alt="Sala de Charutos — Latina Grill"
              fill
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              style={{ filter: 'brightness(0.55) sepia(20%)' }}
            />

            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
              {/* Tag */}
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-px w-5 bg-amber-400/50" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-amber-300/70">
                  {hero.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-4 whitespace-pre-line font-serif text-3xl font-bold leading-[1.1] text-white md:text-4xl">
                {hero.title}
              </h3>

              {/* Description */}
              <p className="mb-6 max-w-[360px] text-[13px] leading-relaxed text-white/50">
                {hero.desc}
              </p>

              {/* Detail tag */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/18 bg-amber-950/40 px-4 py-2 backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-amber-400/60" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-amber-300/60">
                  {hero.detail}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 4 smaller tiles */}
          {rest.map((exp, idx) => {
            const imgSrc = idx === 0
              ? IMAGES.private1
              : idx === 1
              ? IMAGES.service
              : idx === 2
              ? IMAGES.terrace
              : IMAGES.private2;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl min-h-[220px] lg:min-h-[280px]"
              >
                {/* Background */}
                <Image
                  src={imgSrc}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  style={{ filter: 'brightness(0.45) sepia(15%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.44em] text-white/28">
                    {exp.tag}
                  </p>
                  <h3 className="mb-2.5 whitespace-pre-line font-serif text-xl font-bold leading-[1.15] text-white md:text-2xl">
                    {exp.title}
                  </h3>
                  <p className="mb-4 text-[11.5px] leading-relaxed text-white/38 line-clamp-2 group-hover:line-clamp-none">
                    {exp.desc}
                  </p>
                  <span className="text-[9.5px] uppercase tracking-[0.32em] text-white/22">
                    {exp.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="text-[11px] uppercase tracking-[0.38em] text-white/22">
            {c.contactLabel}
          </p>
          <div className="h-px w-12 bg-white/10 hidden sm:block" />
          <a
            href="mailto:latinagrill@icloud.com"
            className="text-[11px] font-medium text-amber-300/55 transition-colors hover:text-amber-300/90 underline underline-offset-4 decoration-amber-400/20"
          >
            latinagrill@icloud.com
          </a>
          <a
            href="tel:+351968707515"
            className="text-[11px] font-medium text-white/30 transition-colors hover:text-white/60"
          >
            +351 968 707 515
          </a>
        </motion.div>
      </div>
    </section>
  );
}
