import React, { useState } from 'react';
import { couple } from '../data/site';

/**
 * The arch-framed image plate — the site's signature frame.
 *
 * Responsive images: every photo in /public/images ships with -800 and -1400
 * siblings, so we build a srcset by convention. A phone downloads the 800px
 * file instead of the full-size one — much faster on mobile data, and no
 * visible quality loss at that size.
 *
 * Fallbacks (no broken-image icons, ever):
 *  - mono: shows the KO monogram on a warm oat→mocha panel.
 *  - otherwise: a warm panel with a small label.
 */

/** '/images/pre-01.jpg' -> srcset across 800w / 1400w / original. */
function buildSrcSet(src) {
  if (!src || !/^\/images\/.+\.jpe?g$/i.test(src)) return undefined;
  const base = src.replace(/\.jpe?g$/i, '');
  return `${base}-800.jpg 800w, ${base}-1400.jpg 1400w, ${src} 2000w`;
}

export default function Plate({
  src,
  alt = '',
  label = 'Photo coming soon',
  mono = false,
  flat = false,
  className = '',
  sizes = '(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 560px',
  eager = false,
  onClick,
  ...rest
}) {
  const [failed, setFailed] = useState(!src);
  const showFallback = failed || !src;
  const srcSet = failed ? undefined : buildSrcSet(src);

  return (
    <figure
      className={`plate${flat ? ' plate--flat' : ''}${mono && showFallback ? ' plate--mono' : ''} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {!showFallback && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {showFallback && mono && (
        <span className="plate-mono">
          <img src={couple.monogram} alt="" />
        </span>
      )}
      {showFallback && !mono && <span className="plate-fallback">{label}</span>}
    </figure>
  );
}