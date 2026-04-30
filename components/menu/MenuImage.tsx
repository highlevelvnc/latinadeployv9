'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getMenuItemImage } from '@/lib/menu-images';

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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // No image mapped → elegant placeholder
  if (!src || error) {
    return <Placeholder className={className} />;
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-[1] animate-pulse bg-surface-elevated" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={cn(
          // object-cover preenche todo o card slot (sem letterboxing nas
          // pontas) — fica "tela cheia" no quadrinho. Pode cropar levemente
          // as pontas em fotos muito off-aspect, mas o ganho visual de
          // ocupar 100% do espaço compensa. object-center mantém o foco
          // no meio da foto (onde geralmente está a carne).
          'object-cover object-center transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}
