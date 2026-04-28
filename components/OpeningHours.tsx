'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import {
  containerVariants,
  fadeUp,
  slideFromLeft,
  badgePop,
  INVIEW_MARGIN,
} from '@/lib/animations';
import { Clock3, CalendarDays, UtensilsCrossed } from 'lucide-react';

const content = {
  pt: {
    badge: 'Horário de Funcionamento',
    title: 'Abertos todos os dias,',
    titleAccent: 'ao almoço e ao jantar',
    description:
      'Do meio-dia à noite, o Latina Grill está disponível para recebê-lo. Recomendamos reserva antecipada, especialmente ao fim de semana.',
    infoA: { label: 'Almoço e Jantar', desc: 'Serviço contínuo. Cozinha aberta todos os dias.' },
    infoB: { label: 'Reservas Recomendadas', desc: 'Principalmente em sextas, sábados e datas especiais.' },
    lunchLabel: 'Almoço',
    dinnerLabel: 'Jantar',
    schedule: [
      { group: 'Todos os dias', lunch: '12:30 – 15:30', dinner: '18:30 – 22:30', note: 'Cozinha aberta todos os dias, almoço e jantar' },
    ],
  },
  en: {
    badge: 'Opening Hours',
    title: 'Open every day,',
    titleAccent: 'lunch and dinner',
    description:
      'From midday to night, Latina Grill is ready to welcome you. Advance booking recommended, especially on weekends.',
    infoA: { label: 'Lunch & Dinner', desc: 'Continuous service. Kitchen open every day.' },
    infoB: { label: 'Reservations Recommended', desc: 'Especially on Fridays, Saturdays and special dates.' },
    lunchLabel: 'Lunch',
    dinnerLabel: 'Dinner',
    schedule: [
      { group: 'Every day', lunch: '12:30 PM – 3:30 PM', dinner: '6:30 PM – 10:30 PM', note: 'Kitchen open every day, lunch and dinner' },
    ],
  },
  ru: {
    badge: 'Часы работы',
    title: 'Открыто каждый день,',
    titleAccent: 'обед и ужин',
    description:
      'С полудня до ночи Latina Grill готов принять вас. Рекомендуем бронировать заранее, особенно в выходные.',
    infoA: { label: 'Обед и ужин', desc: 'Непрерывное обслуживание. Кухня работает каждый день.' },
    infoB: { label: 'Рекомендуем бронировать', desc: 'Особенно в пятницу, субботу и в праздничные дни.' },
    lunchLabel: 'Обед',
    dinnerLabel: 'Ужин',
    schedule: [
      { group: 'Каждый день', lunch: '12:30 – 15:30', dinner: '18:30 – 22:30', note: 'Кухня открыта каждый день, обед и ужин' },
    ],
  },
  zh: {
    badge: '营业时间',
    title: '每日营业，',
    titleAccent: '午餐与晚餐',
    description:
      '从中午到夜晚，Latina Grill随时欢迎您。建议提前预订，尤其是周末。',
    infoA: { label: '午餐与晚餐', desc: '全天连续供应，每日开放。' },
    infoB: { label: '建议预订', desc: '尤其是周五、周六及特殊节日。' },
    lunchLabel: '午餐',
    dinnerLabel: '晚餐',
    schedule: [
      { group: '每天', lunch: '12:30 – 15:30', dinner: '18:30 – 22:30', note: '厨房每日开放，午餐与晚餐' },
    ],
  },
  fr: {
    badge: "Heures d'Ouverture",
    title: 'Ouvert tous les jours,',
    titleAccent: 'déjeuner et dîner',
    description:
      "De midi jusqu'au soir, le Latina Grill est prêt à vous accueillir. Réservation conseillée, surtout le week-end.",
    infoA: { label: 'Déjeuner & Dîner', desc: 'Service continu. Cuisine ouverte tous les jours.' },
    infoB: { label: 'Réservations Conseillées', desc: 'Surtout les vendredis, samedis et dates spéciales.' },
    lunchLabel: 'Déjeuner',
    dinnerLabel: 'Dîner',
    schedule: [
      { group: 'Tous les jours', lunch: '12h30 – 15h30', dinner: '18h30 – 22h30', note: 'Cuisine ouverte tous les jours, déjeuner et dîner' },
    ],
  },
};

export default function OpeningHours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: INVIEW_MARGIN });
  const locale = useLocale();
  const t = content[locale as keyof typeof content] || content.pt;
  const { schedule } = t;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-20 lg:py-28"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:px-14 lg:py-14">
              {/* Left — slides in from left */}
              <motion.div
                variants={slideFromLeft}
                className="flex flex-col justify-center"
              >
                <motion.div
                  variants={badgePop}
                  className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-600/25 bg-red-600/10 px-4 py-2"
                >
                  <Clock3 className="h-4 w-4 text-red-500" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400 md:text-xs">
                    {t.badge}
                  </span>
                </motion.div>

                <h2 className="text-3xl leading-tight text-white md:text-4xl lg:text-5xl font-serif font-bold">
                  {t.title}
                  <span className="block text-red-500">{t.titleAccent}</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                  {t.description}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-600/20 bg-red-600/10">
                      <UtensilsCrossed className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.infoA.label}</p>
                      <p className="mt-1 text-sm text-white/55">{t.infoA.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-red-600/20 bg-red-600/5 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-600/25 bg-red-600/10">
                      <CalendarDays className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.infoB.label}</p>
                      <p className="mt-1 text-sm text-white/55">{t.infoB.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right — staggered schedule cards */}
              <motion.div
                variants={containerVariants}
                className="grid gap-4"
              >
                {schedule.map((item, index) => (
                  <motion.div
                    key={item.group}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.28 } }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition-[border-color,box-shadow] duration-300 hover:border-red-500/30 hover:shadow-[0_14px_35px_rgba(0,0,0,0.32)] md:p-6"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-red-600/[0.08] via-transparent to-red-500/[0.05]" />

                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.65)]" />
                          <h3 className="text-xl font-semibold text-white">
                            {item.group}
                          </h3>
                        </div>

                        <p className="text-sm text-white/50">{item.note}</p>
                      </div>

                      <div className="grid gap-3 md:min-w-[250px]">
                        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-red-400">
                            {t.lunchLabel}
                          </p>
                          <p className="mt-1 text-sm font-medium text-white md:text-base">
                            {item.lunch}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-red-400">
                            {t.dinnerLabel}
                          </p>
                          <p className="mt-1 text-sm font-medium text-white md:text-base">
                            {item.dinner}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}