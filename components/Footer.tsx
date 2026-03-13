'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-light border-t border-light/5 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Latina Grill"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-light tracking-tight group-hover:text-accent-orange transition-colors">
                  Latina Grill
                </span>
                <span className="text-xs text-red font-sans uppercase tracking-widest -mt-1">
                  Cascais
                </span>
              </div>
            </Link>
            <p className="text-light/60 text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-light/60 hover:text-light transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/menu`} className="text-light/60 hover:text-light transition-colors text-sm">
                  Menu
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reservations`} className="text-light/60 hover:text-light transition-colors text-sm">
                  Reservas
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-light/60 hover:text-light transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-light/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-orange" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Estrada+Da+Malveira+da+Serra+261+Cascais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-light transition-colors"
                >
                  Estrada Da Malveira da Serra, 261<br />2750-782 Cascais
                </a>
              </li>
              <li className="flex items-center gap-2 text-light/60 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent-orange" />
                <a href="tel:+351968707515" className="hover:text-light transition-colors">
                  +351 968 707 515
                </a>
              </li>
              <li className="flex items-center gap-2 text-light/60 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent-orange" />
                <span>info@latinagrill.pt</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Redes Sociais
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/latina.grill/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red/20 hover:bg-red/30 text-light px-4 py-2.5 rounded-full text-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @latina.grill
              </a>
              <a
                href="https://share.google/8vw79KB0bb72pWBIA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-orange/20 hover:bg-accent-orange/30 text-light px-4 py-2.5 rounded-full text-sm transition-colors w-full"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-light/40">
          <p>
            © {currentYear} Latina Grill Cascais. {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-light/60 transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-light/60 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
