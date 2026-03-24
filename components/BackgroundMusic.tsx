'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// ─── Config ───────────────────────────────────────────────────────────────────
const AUDIO_SRC = '/ambient-music.mp3';
const LS_KEY    = 'lg_ambient_muted';
const SHOW_DELAY_MS = 3500; // appear after page settles

// ─── Component ────────────────────────────────────────────────────────────────

export default function BackgroundMusic() {
  const audioRef        = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted]     = useState(true);   // always start muted — autoplay policy
  const [canPlay, setCanPlay] = useState(false);
  const [visible, setVisible] = useState(false);

  // Reveal control only once the audio file is confirmed loadable
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let timer: ReturnType<typeof setTimeout>;

    const onReady = () => {
      setCanPlay(true);
      timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    };
    // If file is missing/inaccessible, keep the control hidden silently
    audio.addEventListener('canplaythrough', onReady, { once: true });
    audio.addEventListener('loadedmetadata', onReady, { once: true });

    return () => {
      clearTimeout(timer);
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('loadedmetadata', onReady);
    };
  }, []);

  // Apply muted state and attempt play when user unmutes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (!muted && canPlay) {
      audio.play().catch(() => {/* silently ignore autoplay rejection */});
    }
  }, [muted, canPlay]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem(LS_KEY, String(next));

    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = next;
    if (!next) {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      {/* Audio element — preload="metadata" checks file availability without buffering full audio */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        muted
        aria-hidden
      />

      {/* Control pill — fixed bottom-left */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed bottom-6 left-6 z-40"
          >
            <button
              onClick={toggle}
              aria-label={muted ? 'Activar música ambiente' : 'Silenciar música ambiente'}
              className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-400 ${
                muted
                  ? 'border-white/8 bg-black/55 hover:border-white/15 hover:bg-black/70'
                  : 'border-amber-400/20 bg-black/70 hover:border-amber-400/35'
              }`}
            >
              {/* Icon */}
              <span
                className={`flex-shrink-0 transition-colors duration-300 ${
                  muted ? 'text-white/22' : 'text-amber-300/75'
                }`}
              >
                {muted
                  ? <VolumeX className="w-3.5 h-3.5" />
                  : <Volume2 className="w-3.5 h-3.5" />
                }
              </span>

              {/* Animated EQ bars */}
              <span className="flex items-end gap-[3px]" aria-hidden>
                {([0.9, 1.2, 0.75] as const).map((duration, i) => (
                  <motion.span
                    key={i}
                    className={`block w-[2px] rounded-full transition-colors duration-300 ${
                      muted ? 'bg-white/12' : 'bg-amber-300/65'
                    }`}
                    animate={
                      muted
                        ? { height: '3px' }
                        : { height: ['3px', `${8 + i * 3}px`, '3px'] }
                    }
                    transition={
                      muted
                        ? { duration: 0.2 }
                        : { duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                    }
                    style={{ height: '3px' }}
                  />
                ))}
              </span>

              {/* Label */}
              <span
                className={`text-[9px] uppercase tracking-[0.32em] font-medium transition-colors duration-300 ${
                  muted ? 'text-white/20' : 'text-white/42'
                }`}
              >
                Música
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
