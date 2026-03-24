'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const locales = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'zh', label: 'ZH', name: '中文' },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
    setOpen(false);
  };

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-white/65 hover:text-white transition-colors duration-200 group select-none"
      >
        <Globe className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{current.label}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-3 z-[60] min-w-[148px] overflow-hidden rounded-2xl border border-white/10 bg-black/96 shadow-[0_24px_64px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {locales.map((loc) => {
                const isActive = locale === loc.code;
                return (
                  <button
                    key={loc.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => switchLocale(loc.code)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-all duration-150 group ${
                      isActive
                        ? 'bg-red-600/15 text-white'
                        : 'text-white/55 hover:bg-white/[0.055] hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] tabular-nums">
                      {loc.label}
                    </span>
                    <span className="text-[11px] text-white/35 group-hover:text-white/55 transition-colors flex-1">
                      {loc.name}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
