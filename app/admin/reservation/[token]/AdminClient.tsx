'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Clock, Phone, Mail, Calendar, Users, MessageSquare,
  AlertCircle, ArrowRight, ArrowLeft, Loader2, Sun, Moon,
} from 'lucide-react';
import type { ReservationTokenPayload } from '@/lib/reservation-token';

const LUNCH_SLOTS = ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

const DECLINE_REASONS = [
  { value: 'capacity', label: 'Capacidade máxima nesse horário' },
  { value: 'private', label: 'Reservado para evento privado' },
  { value: 'closed', label: 'Encerrados nesse dia' },
  { value: 'other', label: 'Outro motivo' },
];

type View = 'choose' | 'confirming' | 'declining' | 'proposing' | 'success';
type SuccessKind = 'confirmed' | 'declined' | 'proposed';

interface Props {
  token: string;
  payload: ReservationTokenPayload;
  dateLong: string;
}

export default function AdminClient({ token, payload, dateLong }: Props) {
  const [view, setView] = useState<View>('choose');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successKind, setSuccessKind] = useState<SuccessKind | null>(null);

  // Confirm form
  const [confirmMessage, setConfirmMessage] = useState<string>('');

  // Decline form
  const [declineReasonValue, setDeclineReasonValue] = useState<string>('');
  const [declineCustom, setDeclineCustom] = useState<string>('');

  // Propose form
  const [selectedAlts, setSelectedAlts] = useState<string[]>([]);
  const [proposalMessage, setProposalMessage] = useState<string>('');

  // Time-since chip
  const [waitingFor, setWaitingFor] = useState<string>(formatWaitingTime(payload.iat));
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingFor(formatWaitingTime(payload.iat));
    }, 60_000);
    return () => clearInterval(interval);
  }, [payload.iat]);

  const phoneHref = payload.phone.replace(/[^\d+]/g, '');

  // ─── Actions ──────────────────────────────────────────────────────────────

  async function confirmReservation() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          message: confirmMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setSuccessKind('confirmed');
      setView('success');
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitDecline() {
    const reason =
      declineReasonValue === 'other'
        ? declineCustom.trim()
        : DECLINE_REASONS.find((r) => r.value === declineReasonValue)?.label || '';

    if (!reason) {
      setError('Indica o motivo antes de enviar.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setSuccessKind('declined');
      setView('success');
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitProposal() {
    if (selectedAlts.length === 0) {
      setError('Escolhe pelo menos 1 horário alternativo.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations/propose-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          alternatives: selectedAlts,
          message: proposalMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setSuccessKind('proposed');
      setView('success');
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSubmitting(false);
    }
  }

  function toggleAlt(slot: string) {
    setSelectedAlts((cur) => {
      if (cur.includes(slot)) return cur.filter((s) => s !== slot);
      if (cur.length >= 3) return cur;
      return [...cur, slot];
    });
  }

  // ─── UI helpers ───────────────────────────────────────────────────────────

  const filteredLunch = useMemo(
    () => LUNCH_SLOTS.filter((s) => s !== payload.time),
    [payload.time],
  );
  const filteredDinner = useMemo(
    () => DINNER_SLOTS.filter((s) => s !== payload.time),
    [payload.time],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] px-4 py-8 sm:py-12">
      <div className="max-w-xl mx-auto">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div
            className="h-[2px] w-full mb-8"
            style={{ background: 'linear-gradient(90deg,transparent 0%,#d4af6e 50%,transparent 100%)' }}
          />
          <p className="text-[10px] uppercase tracking-[6px] mb-3" style={{ color: '#d4af6e' }}>
            Gestão de Reserva
          </p>
          <p className="font-serif text-lg tracking-[6px]">LATINA&nbsp;GRILL</p>
          <p className="text-[9px] uppercase tracking-[5px] text-white/40 mt-1">CASCAIS · ADMIN</p>
        </div>

        {/* Reservation card */}
        <div className="border border-[#1f1c18] rounded-sm bg-[#0f0f0f] mb-8">

          {/* Status pill */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1c18]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#d4af6e' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#d4af6e' }} />
              </span>
              <span className="text-[10px] uppercase tracking-[3px]" style={{ color: '#d4af6e' }}>
                Aguarda decisão
              </span>
            </div>
            <span className="text-[11px] text-white/45 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {waitingFor}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Big summary */}
            <h1 className="font-serif text-2xl sm:text-3xl leading-tight mb-2">
              <span className="font-semibold">{payload.name}</span>
            </h1>
            <p className="font-serif text-lg text-white/70 capitalize mb-6">
              {dateLong} · {payload.time} · {payload.guests}{' '}
              {payload.guests === 1 ? 'pessoa' : 'pessoas'}
            </p>

            {/* Quick contact */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <a
                href={`tel:${phoneHref}`}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-white/20 transition-colors text-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="truncate">{payload.phone}</span>
              </a>
              {payload.email ? (
                <a
                  href={`mailto:${payload.email}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-white/20 transition-colors text-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">Email</span>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0a0a0a] border border-[#1a1a1a] text-white/30 text-sm">
                  Sem email
                </div>
              )}
            </div>

            {/* Detail grid */}
            <div className="space-y-3 text-sm">
              <DetailRow icon={<Calendar className="w-3.5 h-3.5" />} label="Data" value={<span className="capitalize">{dateLong}</span>} />
              <DetailRow icon={<Clock className="w-3.5 h-3.5" />} label="Hora pedida" value={payload.time} />
              <DetailRow icon={<Users className="w-3.5 h-3.5" />} label="Pessoas" value={String(payload.guests)} />
              {payload.email && (
                <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={<span className="truncate block">{payload.email}</span>} />
              )}
              {payload.observations && (
                <div className="pt-2 mt-2 border-t border-[#1f1c18]">
                  <div className="flex items-start gap-2 mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5 mt-0.5 text-white/40" />
                    <span className="text-[10px] uppercase tracking-[2px] text-white/40">Observações</span>
                  </div>
                  <p className="font-serif italic text-white/85 leading-relaxed pl-5">
                    “{payload.observations}”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View switcher */}
        <AnimatePresence mode="wait">
          {view === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <ActionButton
                primary
                disabled={submitting}
                onClick={() => { setError(null); setView('confirming'); }}
                title="Confirmar Reserva"
                subtitle="Cliente recebe confirmação · pode adicionar mensagem"
                icon={<Check className="w-5 h-5" />}
              />
              <ActionButton
                disabled={submitting}
                onClick={() => { setError(null); setView('proposing'); }}
                title="Propor Outra Hora"
                subtitle="Sugerir 1–3 horários alternativos"
                icon={<Clock className="w-5 h-5" />}
              />
              <ActionButton
                muted
                disabled={submitting}
                onClick={() => { setError(null); setView('declining'); }}
                title="Recusar Pedido"
                subtitle="Enviar resposta educada com motivo"
                icon={<X className="w-5 h-5" />}
              />
            </motion.div>
          )}

          {view === 'confirming' && (
            <motion.div
              key="confirming"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border border-[#1f1c18] rounded-sm bg-[#0f0f0f] p-6 sm:p-8"
            >
              <button
                onClick={() => setView('choose')}
                className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5 mb-5"
              >
                <ArrowLeft className="w-3 h-3" /> Voltar
              </button>

              <h2 className="font-serif text-xl mb-2">Confirmar reserva</h2>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                Cliente vai receber email de confirmação imediatamente. Podes adicionar uma mensagem
                pessoal opcional (ex: detalhes da mesa, agradecimento, atenção especial).
              </p>

              {/* Optional personal message */}
              <label className="block mb-6">
                <span className="text-[10px] uppercase tracking-[3px] text-white/50 mb-2 block">
                  Mensagem para o cliente <span className="normal-case tracking-normal text-white/30">(opcional)</span>
                </span>
                <textarea
                  value={confirmMessage}
                  onChange={(e) => setConfirmMessage(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Ex: Reservei a mesa junto à janela. Parabéns pelo aniversário da sua mãe — vamos preparar algo especial."
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af6e] focus:outline-none p-3 text-sm leading-relaxed transition-colors resize-none"
                />
                <span className="block mt-1.5 text-[10px] text-white/30 text-right">
                  {confirmMessage.length}/500
                </span>
              </label>

              {/* Quick suggestions */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[3px] text-white/40 mb-2">Sugestões rápidas</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Reservei a sua mesa preferida.',
                    'Vamos preparar algo especial.',
                    'Será um prazer recebê-lo.',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setConfirmMessage((cur) => cur ? cur : suggestion)}
                      disabled={!!confirmMessage}
                      className="px-3 py-1.5 text-xs border border-[#2a2a2a] hover:border-[#d4af6e]/50 hover:text-[#d4af6e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-950/40 border border-red-900/50 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                disabled={submitting}
                onClick={confirmReservation}
                className="w-full py-4 text-sm uppercase tracking-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#d4af6e',
                  color: '#0a0a0a',
                  fontWeight: 700,
                }}
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> A confirmar…</>
                ) : (
                  <>
                    {confirmMessage.trim() ? 'Confirmar e Enviar Mensagem' : 'Confirmar Sem Mensagem'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {view === 'declining' && (
            <motion.div
              key="declining"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border border-[#1f1c18] rounded-sm bg-[#0f0f0f] p-6 sm:p-8"
            >
              <button
                onClick={() => setView('choose')}
                className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5 mb-5"
              >
                <ArrowLeft className="w-3 h-3" /> Voltar
              </button>

              <h2 className="font-serif text-xl mb-6">Recusar pedido</h2>

              <fieldset className="space-y-2 mb-5">
                <legend className="text-[10px] uppercase tracking-[3px] text-white/50 mb-3">Motivo</legend>
                {DECLINE_REASONS.map((r) => (
                  <label
                    key={r.value}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                      declineReasonValue === r.value
                        ? 'border-[#d4af6e] bg-[#d4af6e]/5'
                        : 'border-[#2a2a2a] hover:border-[#444]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={r.value}
                      checked={declineReasonValue === r.value}
                      onChange={(e) => setDeclineReasonValue(e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`w-3 h-3 rounded-full border ${
                        declineReasonValue === r.value
                          ? 'border-[#d4af6e] bg-[#d4af6e]'
                          : 'border-white/30'
                      }`}
                    />
                    <span className="text-sm">{r.label}</span>
                  </label>
                ))}
              </fieldset>

              {declineReasonValue === 'other' && (
                <textarea
                  value={declineCustom}
                  onChange={(e) => setDeclineCustom(e.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="Escreve o motivo (vai aparecer no email enviado ao cliente)"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af6e] focus:outline-none p-3 text-sm leading-relaxed mb-4 transition-colors"
                />
              )}

              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-950/40 border border-red-900/50 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                disabled={submitting || !declineReasonValue}
                onClick={submitDecline}
                className="w-full py-4 bg-[#1a1a1a] border border-[#444] hover:border-white text-sm uppercase tracking-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> A enviar…</>
                ) : (
                  <>Enviar Recusa <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>
          )}

          {view === 'proposing' && (
            <motion.div
              key="proposing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border border-[#1f1c18] rounded-sm bg-[#0f0f0f] p-6 sm:p-8"
            >
              <button
                onClick={() => setView('choose')}
                className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5 mb-5"
              >
                <ArrowLeft className="w-3 h-3" /> Voltar
              </button>

              <h2 className="font-serif text-xl mb-2">Propor horário alternativo</h2>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                Cliente vai receber um email com botões para aceitar uma destas horas.
                Escolhe até 3 (excluindo a hora original {payload.time}).
              </p>

              {/* Lunch slots */}
              {filteredLunch.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sun className="w-3.5 h-3.5" style={{ color: '#d4af6e' }} />
                    <span className="text-[11px] uppercase tracking-[3px] text-white/55">Almoço</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {filteredLunch.map((s) => (
                      <SlotChip
                        key={s}
                        slot={s}
                        selected={selectedAlts.includes(s)}
                        disabled={!selectedAlts.includes(s) && selectedAlts.length >= 3}
                        onClick={() => toggleAlt(s)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dinner slots */}
              {filteredDinner.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Moon className="w-3.5 h-3.5" style={{ color: '#d4af6e' }} />
                    <span className="text-[11px] uppercase tracking-[3px] text-white/55">Jantar</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {filteredDinner.map((s) => (
                      <SlotChip
                        key={s}
                        slot={s}
                        selected={selectedAlts.includes(s)}
                        disabled={!selectedAlts.includes(s) && selectedAlts.length >= 3}
                        onClick={() => toggleAlt(s)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Optional message */}
              <label className="block mb-6">
                <span className="text-[10px] uppercase tracking-[3px] text-white/50 mb-2 block">
                  Mensagem opcional
                </span>
                <textarea
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  rows={2}
                  maxLength={300}
                  placeholder="Ex: 20h está cheio, mas conseguimos encaixar mais cedo ou mais tarde."
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#d4af6e] focus:outline-none p-3 text-sm leading-relaxed transition-colors"
                />
              </label>

              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-950/40 border border-red-900/50 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                disabled={submitting || selectedAlts.length === 0}
                onClick={submitProposal}
                className="w-full py-4 text-sm uppercase tracking-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: selectedAlts.length === 0 ? '#1a1a1a' : '#d4af6e',
                  color: selectedAlts.length === 0 ? '#666' : '#0a0a0a',
                  fontWeight: 700,
                }}
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> A enviar…</>
                ) : (
                  <>
                    Enviar {selectedAlts.length || ''} {selectedAlts.length === 1 ? 'proposta' : 'propostas'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {view === 'success' && successKind && (
            <SuccessView kind={successKind} customerName={payload.name} hasEmail={!!payload.email} />
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-12 mb-4">
          <p className="text-[10px] uppercase tracking-[3px] text-white/30">
            Painel privado · Latina Grill Cascais
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[#1a1a1a] last:border-0">
      <span className="text-white/40 mt-1">{icon}</span>
      <span className="text-[10px] uppercase tracking-[2px] text-white/40 w-24 flex-shrink-0 mt-1.5">{label}</span>
      <span className="text-white/90 text-sm font-medium flex-1 min-w-0">{value}</span>
    </div>
  );
}

function ActionButton({
  title,
  subtitle,
  icon,
  onClick,
  primary,
  muted,
  disabled,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  muted?: boolean;
  disabled?: boolean;
}) {
  if (primary) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="group w-full p-5 transition-all flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#d4af6e', color: '#0a0a0a' }}
      >
        <span className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <span className="flex-1 text-left">
          <span className="block font-bold text-base uppercase tracking-[3px] mb-0.5">{title}</span>
          <span className="block text-xs opacity-75">{subtitle}</span>
        </span>
        <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-full p-5 transition-all flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed ${
        muted
          ? 'bg-transparent border border-[#2a2a2a] hover:border-white/30 text-white/85'
          : 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#d4af6e]/60 text-[#f5f0e6]'
      }`}
    >
      <span
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          muted ? 'bg-[#1a1a1a]' : 'bg-[#0a0a0a]'
        }`}
        style={!muted ? { color: '#d4af6e' } : undefined}
      >
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block font-medium text-base mb-0.5">{title}</span>
        <span className="block text-xs text-white/55">{subtitle}</span>
      </span>
      <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${muted ? 'text-white/40' : ''}`} />
    </button>
  );
}

function SlotChip({
  slot,
  selected,
  disabled,
  onClick,
}: {
  slot: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative px-3 py-2.5 text-sm font-medium transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed ${
        selected
          ? 'border'
          : 'bg-[#1a1a1a] text-[#f5f0e6] border border-[#2a2a2a] hover:border-[#d4af6e]/50 hover:bg-white/5 active:scale-[0.97]'
      }`}
      style={
        selected
          ? { backgroundColor: '#d4af6e', color: '#0a0a0a', borderColor: '#d4af6e' }
          : undefined
      }
    >
      {slot}
    </button>
  );
}

function SuccessView({
  kind,
  customerName,
  hasEmail,
}: {
  kind: SuccessKind;
  customerName: string;
  hasEmail: boolean;
}) {
  const config = {
    confirmed: {
      icon: '✓',
      title: 'Reserva confirmada',
      message: hasEmail
        ? `${customerName} acabou de receber o email de confirmação.`
        : `${customerName} ainda não tem email — contacta por telefone.`,
    },
    declined: {
      icon: '✕',
      title: 'Resposta enviada',
      message: hasEmail
        ? `${customerName} recebeu a resposta com o motivo da recusa.`
        : `Não foi possível avisar por email — contacta por telefone.`,
    },
    proposed: {
      icon: '⏱',
      title: 'Proposta enviada',
      message: hasEmail
        ? `${customerName} recebeu o email com as alternativas. Aguardas resposta.`
        : `Sem email — contacta por telefone para propor as alternativas.`,
    },
  } as const;

  const c = config[kind];

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="border border-[#1f1c18] rounded-sm bg-[#0f0f0f] p-8 sm:p-12 text-center"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
        style={{ backgroundColor: '#d4af6e', color: '#0a0a0a' }}
      >
        {c.icon}
      </div>
      <h2 className="font-serif text-3xl mb-3">{c.title}</h2>
      <p className="text-white/65 leading-relaxed max-w-sm mx-auto mb-8">
        {c.message}
      </p>
      <p className="text-[10px] uppercase tracking-[3px] text-white/35">
        Podes fechar esta página
      </p>
    </motion.div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatWaitingTime(iat: number): string {
  if (!iat) return 'agora';
  const diff = Date.now() - iat;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'agora mesmo';
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h${m % 60 ? ' ' + (m % 60) + 'min' : ''}`;
  const d = Math.floor(h / 24);
  return `há ${d}d ${h % 24}h`;
}

function humanError(e: unknown): string {
  const msg = (e as Error)?.message || String(e);
  if (msg.includes('expired') || msg.includes('invalid_or_expired')) {
    return 'Este link já expirou. Procura o email mais recente.';
  }
  if (msg.includes('invalid_status')) {
    return 'Esta reserva já foi gerida anteriormente.';
  }
  if (msg.includes('email_send')) {
    return 'O email não pôde ser enviado. Tenta novamente em segundos.';
  }
  return 'Ocorreu um erro. Tenta novamente.';
}
