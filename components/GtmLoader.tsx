'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { readConsent } from '@/lib/cookie-consent';

/**
 * Loads Google Tag Manager only after the user grants analytics consent.
 *
 * Why this lives in its own client component:
 *   - The GTM <Script> previously fired on every page load, ignoring user
 *     choice — a direct RGPD violation (consent must precede the cookie).
 *   - Now it mounts the script only when readConsent().analytics === true,
 *     and listens for the 'cookie-consent-change' custom event so toggling
 *     consent at runtime takes effect without a reload.
 *
 * The <noscript> iframe fallback is intentionally inside the conditional
 * — even though it's marketing-cookie-free, it still pings GTM and is
 * better gated under the same opt-in.
 */

type Props = {
  gtmId: string;
};

export default function GtmLoader({ gtmId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readConsent()?.analytics === true);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ analytics?: boolean }>).detail;
      setEnabled(detail?.analytics === true);
    };
    window.addEventListener('cookie-consent-change', handler);
    return () => window.removeEventListener('cookie-consent-change', handler);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
