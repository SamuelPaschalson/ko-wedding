import React from 'react';

/**
 * The lacework ornament from the invitation card, drawn in code rather than
 * shipped as an image so it stays razor sharp at any size and can be recoloured
 * with currentColor.
 *
 * It is built the way a real mandala is: one petal, repeated around a circle.
 */

const PETALS = 16;

function ring({ count, radius, length, width, rotate = 0, opacity = 1 }) {
  const petals = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (360 / count) * i + rotate;
    petals.push(
      <g key={`${radius}-${i}`} transform={`rotate(${angle} 100 100)`} opacity={opacity}>
        {/* teardrop petal pointing outward from the centre */}
        <path
          d={`M100 ${100 - radius}
              C ${100 + width} ${100 - radius - length * 0.35},
                ${100 + width} ${100 - radius - length * 0.8},
                100 ${100 - radius - length}
              C ${100 - width} ${100 - radius - length * 0.8},
                ${100 - width} ${100 - radius - length * 0.35},
                100 ${100 - radius} Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <ellipse
          cx="100"
          cy={100 - radius - length * 0.55}
          rx={width * 0.32}
          ry={length * 0.2}
          fill="currentColor"
          opacity="0.55"
        />
      </g>,
    );
  }
  return petals;
}

function dots({ count, radius, r, rotate = 0 }) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const angle = ((360 / count) * i + rotate) * (Math.PI / 180);
    out.push(
      <circle
        key={`d-${radius}-${i}`}
        cx={100 + radius * Math.sin(angle)}
        cy={100 - radius * Math.cos(angle)}
        r={r}
        fill="currentColor"
      />,
    );
  }
  return out;
}

export default function Mandala({ className = '', style }) {
  return (
    <svg
      className={`mandala ${className}`}
      style={style}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.6" />

      {ring({ count: 8, radius: 14, length: 16, width: 9 })}
      {dots({ count: 16, radius: 40, r: 1.4 })}

      <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {ring({ count: PETALS, radius: 46, length: 22, width: 11 })}

      <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {dots({ count: 32, radius: 76, r: 1.1, rotate: 5.6 })}
      {ring({
        count: PETALS,
        radius: 78,
        length: 18,
        width: 8,
        rotate: 360 / PETALS / 2,
        opacity: 0.85,
      })}
    </svg>
  );
}
