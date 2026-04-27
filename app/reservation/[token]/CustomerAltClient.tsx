'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, AlertCircle, Phone } from 'lucide-react';
import type { ReservationTokenPayload } from '@/lib/reservation-token';

interface Props {
  token: string;
  payload: ReservationTokenPayload;
  dateLong: string;
  preselectAccept?: string;
  preselectDecline?: boolean;
}

export default function CustomerAltClient({
  token,
  payload,
  dateLong,
  preselectAccept,
  preselectDecline,
}: Props) {
  const [view, setView] = useState<'choose' | 'success-accept' | 'success-decline'>('choose');
  const [submitting, setSubmitting] = useState(false);
  const [acceptedSlot, setAcceptedSlot] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // If user clicked an action button in the email, the URL has ?accept=21:30 or ?decline=1.
  // Auto-fire the action so the experience is one-click.
  useEffect(() => {
    if (preselectAccept && payload.alternatives?.includes(preselectAccept)) {
      void acceptSlot(preselectAccept);
    } else if (preselectDecline) {
      void declineAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function acceptSlot(slot: string) {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations/accept-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, slot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setAcceptedSlot(slot);
      setView('success-accept');
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function declineAll() {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations/decline-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setView('success-decline');
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSubmitting(false);
    }
  }

  const firstName = payload.name.split(' ')[0] || payload.name;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] px-4 py-8 sm:py-16">
      <div className="max-w-xl mx-auto">

        {/* Brand */}
        <div className="text-center mb-10">
          <div
            className="h-[2px] w-full mb-10"
            style={{ background: 'linear-gradient(90deg,transparent 0%,#d4af6e 50%,transparent 100%)' }}
          />
          <p className="text-[10px] uppercase tracking-[6px] mb-3" style={{ color: '#d4af6e' }}>
            Proposta de Horário
          </p>
          <p className="font-serif text-lg tracking-[6px]">LATINA&nbsp;GRILL</p>
          <p className="text-[9px] uppercase tracking-[5px] text-white/40 mt-1">CASCAIS</p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Greeting */}
              <h1 className="font-serif text-3xl sm:text-4xl text-center mb-4 leading-tight">
                Olá {firstName},<br />
                <em style={{ color: '#d4af6e' }} className="font-normal">temos outras opções</em>.
              </h1>

              <p className="text-center text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto">
                A hora <strong className="text-[#f5f0e6]">{payload.time}</strong> em{' '}
                <span className="capitalize">{dateLong}</span> não está disponível.
                Conseguimos encaixá-lo num destes horários:
              </p>

              {/* Optional message from owner */}
              {payload.proposalMessage && (
                <div
                  className="p-5 mb-8 border-l-2"
                  style={{ borderColor: '#d4af6e', backgroundColor: '#1a1610' }}
                >
                  <p className="font-serif italic text-white/80 leading-relaxed">
                    “{payload.proposalMessage}”
                  </p>
                </div>
              )}

              {/* Slot buttons */}
              <div className="space-y-3 mb-8">
                {payload.alternatives?.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => acceptSlot(slot)}
                    disabled={submitting}
                    className="group w-full p-5 border transition-all flex items-center justify-between disabled:opacity-50"
                    style={{
                      backgroundColor: '#0f0f0f',
                      borderColor: '#d4af6e',
                    }}
                  >
                    <span className="text-left">
                      <span className="block font-serif text-2xl mb-0.5">{slot}</span>
                      <span className="block text-[10px] uppercase tracking-[3px] text-white/55 capitalize">
                        {dateLong}
                      </span>
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[3px] flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
                      style={{ color: '#d4af6e' }}
                    >
                      Aceitar <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-950/40 border border-red-900/50 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Decline link */}
              <div className="text-center">
                <button
                  onClick={declineAll}
                  disabled={submitting}
                  className="text-sm text-white/45 hover:text-white/80 underline underline-offset-4 transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Um momento…
                    </span>
                  ) : (
                    'Nenhum me serve'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {view === 'success-accept' && (
            <motion.div
              key="success-accept"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="border rounded-sm p-8 sm:p-12 text-center"
              style={{ borderColor: '#1f1c18', backgroundColor: '#0f0f0f' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
                style={{ backgroundColor: '#d4af6e', color: '#0a0a0a' }}
              >
                ✓
              </div>
              <h2 className="font-serif text-3xl mb-3">Reserva confirmada</h2>
              <p className="text-white/70 leading-relaxed mb-2">
                <span className="capitalize">{dateLong}</span>
              </p>
              <p className="font-serif text-2xl mb-8" style={{ color: '#d4af6e' }}>
                {acceptedSlot}
              </p>
              <p className="text-white/55 leading-relaxed text-sm max-w-xs mx-auto mb-8">
                Vai receber um email de confirmação em segundos. Aguardamos a sua visita.
              </p>
              <a
                href="https://maps.google.com/?q=Latina+Grill+Cascais+Rua+Frederico+Arouca+25"
                className="inline-block px-8 py-3 border text-xs uppercase tracking-[3px] transition-colors"
                style={{ borderColor: '#d4af6e', color: '#d4af6e' }}
              >
                Ver no mapa
              </a>
            </motion.div>
          )}

          {view === 'success-decline' && (
            <motion.div
              key="success-decline"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="border rounded-sm p-8 sm:p-12 text-center"
              style={{ borderColor: '#1f1c18', backgroundColor: '#0f0f0f' }}
            >
              <h2 className="font-serif text-3xl mb-4">Pena.</h2>
              <p className="text-white/70 leading-relaxed mb-6 max-w-sm mx-auto">
                Lamentamos não conseguir oferecer-lhe um horário adequado.
                Adoraríamos recebê-lo numa próxima ocasião.
              </p>
              <a
                href="tel:+351968707515"
                className="inline-flex items-center gap-2 px-8 py-3 border text-xs uppercase tracking-[3px] transition-colors"
                style={{ borderColor: '#d4af6e', color: '#d4af6e' }}
              >
                <Phone className="w-3.5 h-3.5" /> +351 968 707 515
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-12">
          <p className="text-[10px] uppercase tracking-[3px] text-white/30">
            latinagrill.pt
          </p>
        </div>
      </div>
    </div>
  );
}

function humanError(e: unknown): string {
  const msg = (e as Error)?.message || String(e);
  if (msg.includes('expired') || msg.includes('invalid_or_expired')) {
    return 'Este link já expirou. Contacte-nos por telefone para reservar.';
  }
  if (msg.includes('invalid_status')) {
    return 'Esta proposta já foi respondida anteriormente.';
  }
  if (msg.includes('slot_not_offered')) {
    return 'Este horário já não está nas opções disponíveis.';
  }
  return 'Ocorreu um erro. Tenta de novo ou liga-nos.';
}
