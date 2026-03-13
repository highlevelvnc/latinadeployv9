'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.98)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = {
    pt: [
      { label: 'Menu', href: '/menu' },
      { label: 'Reservas', href: '/reservations' },
      { label: 'Contacto', href: '/contact' }
    ],
    en: [
      { label: 'Menu', href: '/menu' },
      { label: 'Reservations', href: '/reservations' },
      { label: 'Contact', href: '/contact' }
    ],
    fr: [
      { label: 'Menu', href: '/menu' },
      { label: 'Réservations', href: '/reservations' },
      { label: 'Contact', href: '/contact' }
    ]
  };

  const navItems = nav[locale as keyof typeof nav] || nav.pt;

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-2xl border-b border-white/5' : ''
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-50 group">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-12 h-12 lg:w-14 lg:h-14"
              >
                <Image
                  src="/logo.png"
                  alt="Latina Grill"
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                />
              </motion.div>
              <span className="text-white text-xl lg:text-2xl font-serif font-bold tracking-tight">
                Latina Grill
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`/${locale}${item.href}`}
                className="text-white/70 hover:text-white text-sm uppercase tracking-[0.2em] font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-red group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            <a
              href="tel:+351968707515"
              className="flex items-center gap-2 border border-red hover:bg-red text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Reservar
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black/98 border-t border-white/10"
        >
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg uppercase tracking-wider font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+351968707515"
              className="flex items-center justify-center gap-2 border-2 border-red bg-red text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              Reservar
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}