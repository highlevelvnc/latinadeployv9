'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const locales = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'zh', label: 'ZH', name: '中文' },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const a = useTranslations('a11y');
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click + Escape, return focus to trigger when closed
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
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
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${a('languageSelector')}: ${current.name}`}
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white hover:bg-white/10 hover:border-white/25 transition-colors duration-150 min-h-[36px]"
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {current.label}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[180px] overflow-hidden rounded-xl border border-white/15 bg-zinc-900 shadow-2xl shadow-black/60"
        >
          <div className="flex flex-col p-1">
            {locales.map((loc) => {
              const isActive = locale === loc.code;
              return (
                <button
                  key={loc.code}
                  role="option"
                  aria-selected={isActive}
                  lang={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-100 ${
                    isActive
                      ? 'bg-red-600/20 text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="w-7 text-[11px] font-bold uppercase tracking-wider tabular-nums">
                    {loc.label}
                  </span>
                  <span className="flex-1 text-[13px] font-medium">
                    {loc.name}
                  </span>
                  {isActive && (
                    <Check className="h-3.5 w-3.5 text-red-400 flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
