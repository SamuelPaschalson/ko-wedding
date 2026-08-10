import React, { useCallback, useEffect, useState } from 'react';
import Plate from '../components/Plate';
import { gallery, couple } from '../data/site';

export default function Gallery() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  const sets = gallery.sets.map((s, i) => ({ key: `set-${i}`, label: s.label, items: s.photos }));

  return (
    <>
      <section className="section section--tight">
        <div className="shell" style={{ textAlign: 'center', maxWidth: 680 }}>
          <p className="eyebrow reveal">Gallery</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginBlock: '12px 16px' }}>
            Us, so far
          </h1>
          <p className="lede reveal" style={{ marginInline: 'auto' }}>
            Fresh from the pre-wedding shoot. Add yours from the celebration
            with {couple.hashtag}.
          </p>
        </div>
      </section>

      {gallery.film.url && (
        <section className="section section--tight">
          <div className="shell" style={{ maxWidth: 900 }}>
            <p className="eyebrow reveal">{gallery.film.label}</p>
            <video
              className="reveal"
              controls
              playsInline
              poster={gallery.film.poster}
              src={gallery.film.url}
              style={{ width: '100%', marginTop: 16, borderRadius: 4 }}
            />
          </div>
        </section>
      )}

      {sets.map((set, i) => (
        <section className={`section${i % 2 === 1 ? ' section--ivory' : ''}`} key={set.key}>
          <div className="shell">
            <p className="eyebrow reveal">{set.label}</p>
            <hr className="rule reveal" style={{ marginBlock: '18px clamp(22px, 3vw, 36px)' }} />
            <div className="mosaic">
              {set.items.map((img) => (
                <Plate
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  label={set.label}
                  className="reveal"
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActive(img)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActive(img);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button className="lightbox-close" onClick={close} aria-label="Close photograph">
            ×
          </button>
          <img src={active.src} alt={active.alt} />
        </div>
      )}
    </>
  );
}
