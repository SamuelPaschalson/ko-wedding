import React, { useMemo } from 'react';

/**
 * Ambient layer behind the envelope screen: slow gilded waves, warm aurora
 * glows and drifting gold dust. Purely decorative, so it is hidden from
 * assistive tech and it stands down for reduced-motion guests.
 */
export default function BackgroundEffects() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.4 + 0.6,
        delay: Math.random() * 10,
        duration: 9 + Math.random() * 14,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="bg-effects" aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />

      <div className="flows">
        <svg className="flow-svg" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path
            className="flow-path flow-path-1"
            d="M0,160 C320,300 420,0 720,160 C1020,320 1120,40 1440,160 V800 H0 Z"
          />
          <path
            className="flow-path flow-path-2"
            d="M0,240 C320,100 420,300 720,240 C1020,180 1120,360 1440,240 V800 H0 Z"
          />
          <path
            className="flow-path flow-path-3"
            d="M0,400 C400,200 600,600 800,400 C1000,200 1200,600 1440,400 V800 H0 Z"
          />
        </svg>
      </div>

      <div className="gold-dust">
        {particles.map((p) => (
          <span
            key={p.id}
            className="dust-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-vignette" />
    </div>
  );
}
