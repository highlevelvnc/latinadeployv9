'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getMenuItemImage, getMenuItemImagePosition, getMenuItemImageScale } from '@/lib/menu-images';

interface Props {
  itemId: string;
  categoryId: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Premium placeholder shown when no real photo exists */
function Placeholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-700/30 via-stone-800/20 to-stone-900/30',
        className,
      )}
    >
      <span className="text-4xl opacity-[0.12] select-none">🍽</span>
    </div>
  );
}

export default function MenuImage({
  itemId,
  alt,
  fill = true,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
}: Props) {
  const src = getMenuItemImage(itemId);
  const objectPosition = getMenuItemImagePosition(itemId);
  const scale = getMenuItemImageScale(itemId);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // No image mapped → elegant placeholder
  if (!src || error) {
    return <Placeholder className={className} />;
  }

  return (
    <>
      {/* Shimmering skeleton while loading — feels much faster perceptually
          than a flat gray box. Uses .animate-shimmer-skel from globals.css */}
      {!loaded && (
        <div className="absolute inset-0 z-[1] overflow-hidden bg-stone-900/40">
          <div className="absolute inset-0 animate-shimmer-skel" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        // object-position e transform.scale via inline style — Tailwind
        // não tem suporte a arbitrary values destas props nas versões
        // antigas, e precisamos do override per-item.
        // O scale > 1 dá mais zoom no prato (útil quando a foto original
        // tem muito espaço vazio em volta do alimento).
        style={{
          objectPosition,
          ...(scale !== 1 && { transform: `scale(${scale})` }),
        }}
        className={cn(
          'object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}
