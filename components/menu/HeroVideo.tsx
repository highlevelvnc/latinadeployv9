'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  { src: '/videos/hero-croquetes.mp4', poster: '/videos/hero-croquetes.jpg' },
  { src: '/videos/hero-pratos.mp4', poster: '/videos/hero-pratos.jpg' },
  { src: '/videos/hero-kids.mp4', poster: '/videos/hero-kids.jpg' },
];

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [videoBroken, setVideoBroken] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el || videoBroken) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const result = video.play();
          if (result && typeof result.then === 'function') {
            result.catch(() => {
              // Autoplay blocked (common on iOS Low Power Mode) — keep poster as bg
              setVideoBroken(true);
            });
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
    setIndex((i) => (i + 1) % VIDEOS.length);
  };

  const current = VIDEOS[index];

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
          key={current.src}
          autoPlay
          muted
          loop={VIDEOS.length === 1}
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
