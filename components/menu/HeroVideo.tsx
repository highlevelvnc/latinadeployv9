'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  { src: '/videos/hero-pratos.mp4', poster: '/videos/hero-pratos.jpg' },
  { src: '/videos/hero-croquetes.mp4', poster: '/videos/hero-croquetes.jpg' },
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

  // Mobile: never cycles. Stays on first video looping.
  // Desktop: cycles via onEnded → setIndex.
  const current = isMobile ? VIDEOS[0] : VIDEOS[index];

  useEffect(() => {
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
  }, [videoBroken, index]);

  const handleEnded = () => {
    if (!isMobile) setIndex((i) => (i + 1) % VIDEOS.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative -mx-4 mb-6 h-[180px] overflow-hidden sm:mx-0 sm:rounded-3xl md:h-[260px]"
      style={{
        backgroundImage: `url(${current.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!videoBroken && (
        <video
          ref={videoRef}
          // On mobile, video doesn't change → no key (no remount).
          // On desktop, key changes per cycle to load next clip.
          key={isMobile ? 'mobile-loop' : current.src}
          autoPlay
          muted
          loop={isMobile}
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

      {!isMobile && !videoBroken && (
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
