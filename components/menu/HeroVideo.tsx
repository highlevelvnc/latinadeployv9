'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  { src: '/videos/hero-croquetes.mp4', poster: '/videos/hero-croquetes.jpg' },
  { src: '/videos/hero-pratos.mp4', poster: '/videos/hero-pratos.jpg' },
  { src: '/videos/hero-kids.mp4', poster: '/videos/hero-kids.jpg' },
];

/** Detect mobile via matchMedia — runs only client-side */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [videoBroken, setVideoBroken] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return; // Skip video logic entirely on mobile (poster only)
    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el || videoBroken) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const result = video.play();
          if (result && typeof result.then === 'function') {
            result.catch(() => setVideoBroken(true));
          }
        } else {
          try { video.pause(); } catch {}
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoBroken, index, isMobile]);

  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEOS.length);
  };

  const current = VIDEOS[index];

  // Mobile: static poster only — no <video> element to avoid WebKit crashes
  if (isMobile) {
    return (
      <section
        className="relative -mx-4 mb-6 h-[180px] overflow-hidden sm:mx-0 sm:rounded-3xl"
        style={{
          backgroundImage: `url(${VIDEOS[0].poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </section>
    );
  }

  // Desktop: full video carousel
  return (
    <section
      ref={containerRef}
      className="relative mb-6 h-[260px] overflow-hidden rounded-3xl"
      style={{
        backgroundImage: `url(${current.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!videoBroken && (
        <video
          ref={videoRef}
          key={current.src}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={current.poster}
          onEnded={handleEnded}
          onError={() => setVideoBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={current.src} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {!videoBroken && (
        <div className="absolute bottom-3 right-4 z-10 flex gap-1.5">
          {VIDEOS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === index ? 'w-6 bg-accent-yellow' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
