'use client';

import { useEffect } from 'react';

/**
 * Last-resort error boundary — catches errors thrown in the root layout
 * itself (e.g. a fatal error in headers() / providers).
 *
 * Per Next.js docs, this MUST render its own <html> and <body> because
 * it replaces the entire document tree when triggered.
 *
 * No i18n, no Tailwind utilities (the layout that loads globals.css may
 * have crashed) — inline styles only, bilingual PT/EN copy.
 */

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error('[Latina Grill] Global error:', error);
  }, [error]);

  return (
    <html lang="pt">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#f5f5f5',
          fontFamily: 'Georgia, "Times New Roman", serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main
          style={{
            maxWidth: 480,
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 10,
              color: '#d4af6e',
              letterSpacing: 6,
              textTransform: 'uppercase',
              margin: '0 0 28px',
            }}
          >
            Latina Grill · Cascais
          </p>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '0 0 8px',
            }}
          >
            Algo correu mal
          </h1>
          <p
            style={{
              margin: '0 0 28px',
              fontSize: 16,
              fontStyle: 'italic',
              fontFamily: 'Arial, sans-serif',
              color: 'rgba(245,245,245,0.55)',
            }}
          >
            Something went wrong
          </p>

          <button
            onClick={reset}
            style={{
              border: 'none',
              background: '#dc2626',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Tentar de novo · Try again
          </button>

          {error.digest && (
            <p
              style={{
                marginTop: 32,
                fontSize: 10,
                fontFamily: 'monospace',
                color: 'rgba(245,245,245,0.3)',
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              ID: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
