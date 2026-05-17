import type { Metadata } from 'next';

/**
 * Standalone layout for the maintenance page.
 *
 * Wraps the page in its own <html>/<body> so the root layout's lang/font
 * setup doesn't apply and we don't need an i18n provider. Kept absolutely
 * minimal — this is shown to a paying customer who currently has the
 * service paused.
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://latinagrill.pt'),
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
