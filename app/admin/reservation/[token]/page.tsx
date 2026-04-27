import { verifyReservationToken } from '@/lib/reservation-token';
import { formatDateLong } from '@/lib/reservation-email';
import AdminClient from './AdminClient';
import Link from 'next/link';

// Don't index admin pages
export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false },
  title: 'Gestão de Reserva — Latina Grill',
};

export default async function AdminReservationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = verifyReservationToken(decodeURIComponent(token));

  if (!payload) return <ExpiredPage />;
  if (payload.status !== 'pending') return <AlreadyActionedPage />;

  return (
    <AdminClient
      token={token}
      payload={payload}
      dateLong={formatDateLong(payload.date)}
    />
  );
}

// ─── Error states ────────────────────────────────────────────────────────────

function ExpiredPage() {
  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl mb-2">⏱</div>
        <h1 className="text-3xl font-serif">Link expirado ou inválido</h1>
        <p className="text-light/60 leading-relaxed">
          Este link de gestão já não é válido. Pode ter expirado (válido por 72h) ou
          já ter sido usado anteriormente.
        </p>
        <p className="text-light/60 leading-relaxed text-sm">
          Procura uma <strong>versão mais recente</strong> deste pedido na tua inbox,
          ou contacta o cliente diretamente.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-d-gold hover:text-d-gold-bright transition-colors text-sm uppercase tracking-widest"
          style={{ color: '#d4af6e' }}
        >
          Voltar ao site →
        </Link>
      </div>
    </div>
  );
}

function AlreadyActionedPage() {
  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl mb-2">✓</div>
        <h1 className="text-3xl font-serif">Já tratado</h1>
        <p className="text-light/60 leading-relaxed">
          Este pedido já foi gerido anteriormente. Verifica a tua inbox para ver
          a resposta enviada ao cliente.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-sm uppercase tracking-widest transition-colors"
          style={{ color: '#d4af6e' }}
        >
          Voltar ao site →
        </Link>
      </div>
    </div>
  );
}
