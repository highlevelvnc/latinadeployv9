'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock3, CalendarDays, UtensilsCrossed } from 'lucide-react';

export default function OpeningHours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const schedule = [
    {
      group: 'Segunda a Quinta',
      lunch: '12:00 – 15:00',
      dinner: '19:00 – 23:00',
      note: 'Almoço e jantar'
    },
    {
      group: 'Sexta e Sábado',
      lunch: '12:00 – 16:00',
      dinner: '19:00 – 00:00',
      note: 'Horário estendido'
    },
    {
      group: 'Domingo',
      lunch: '12:00 – 16:00',
      dinner: '19:00 – 22:30',
      note: 'Ideal para almoço em família'
    }
  ];

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
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:px-14 lg:py-14">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-600/25 bg-red-600/10 px-4 py-2">
                  <Clock3 className="h-4 w-4 text-red-500" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400 md:text-xs">
                    Horário de Funcionamento
                  </span>
                </div>

                <h2 className="text-3xl leading-tight text-white md:text-4xl lg:text-5xl font-semibold">
                  Horários organizados de forma
                  <span className="block text-red-500">clara, elegante e rápida</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                  Reformulámos esta seção para facilitar a consulta e transmitir
                  uma experiência mais premium, com melhor leitura no desktop e no mobile.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-600/20 bg-red-600/10">
                      <UtensilsCrossed className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Almoço e jantar
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Horários pensados para tornar a escolha mais intuitiva.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-red-600/20 bg-red-600/5 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-600/25 bg-red-600/10">
                      <CalendarDays className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Reservas recomendadas
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Principalmente em sextas, sábados e datas especiais.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right */}
              <div className="grid gap-4">
                {schedule.map((item, index) => (
                  <motion.div
                    key={item.group}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + index * 0.08,
                      ease: 'easeOut'
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_14px_35px_rgba(0,0,0,0.32)] md:p-6"
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
                            Almoço
                          </p>
                          <p className="mt-1 text-sm font-medium text-white md:text-base">
                            {item.lunch}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-red-400">
                            Jantar
                          </p>
                          <p className="mt-1 text-sm font-medium text-white md:text-base">
                            {item.dinner}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}