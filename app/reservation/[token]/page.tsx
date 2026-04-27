import { verifyReservationToken } from '@/lib/reservation-token';
import { formatDateLong } from '@/lib/reservation-email';
import CustomerAltClient from './CustomerAltClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false },
  title: 'Escolher horário — Latina Grill Cascais',
};

export default async function CustomerAltPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ accept?: string; decline?: string }>;
}) {
  const { token } = await params;
  const sp = await searchParams;

  const payload = verifyReservationToken(decodeURIComponent(token));
  if (!payload || payload.status !== 'alternative-offered') {
    return <ExpiredPage />;
  }

  return (
    <CustomerAltClient
      token={token}
      payload={payload}
      dateLong={formatDateLong(payload.date)}
      preselectAccept={sp.accept}
      preselectDecline={sp.decline === '1'}
    />
  );
}

function ExpiredPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-5xl mb-2">⏱</div>
        <h1 className="font-serif text-3xl">Link já não é válido</h1>
        <p className="text-white/60 leading-relaxed">
          Esta página de escolha de horário já não está disponível. Talvez o link
          tenha expirado ou já tenha sido usado.
        </p>
        <p className="text-white/60 leading-relaxed text-sm">
          Para tentar uma nova reserva, contacte-nos diretamente.
        </p>
        <a
          href="tel:+351968707515"
          className="inline-block mt-4 px-8 py-3 border text-sm uppercase tracking-[3px] transition-colors"
          style={{ borderColor: '#d4af6e', color: '#d4af6e' }}
        >
          Ligar +351 968 707 515
        </a>
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-[2px] text-white/40 hover:text-white/70 transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}
