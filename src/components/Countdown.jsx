import React, { useEffect, useState } from 'react';
import { weddingDate } from '../data/site';

function remaining(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  };
}

export default function Countdown() {
  const target = new Date(weddingDate).getTime();
  const [t, setT] = useState(() => remaining(target));

  useEffect(() => {
    const id = setInterval(() => setT(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <p className="serif-note" style={{ textAlign: 'center' }}>
        Today is the day.
      </p>
    );
  }

  const cells = [
    ['Days', t.days],
    ['Hours', t.hours],
    ['Minutes', t.minutes],
    ['Seconds', t.seconds],
  ];

  return (
    <div className="countdown" role="timer" aria-live="off">
      {cells.map(([label, value]) => (
        <div className="count-cell" key={label}>
          <div className="count-num">{String(value).padStart(2, '0')}</div>
          <div className="count-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
