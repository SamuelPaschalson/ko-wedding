import React from 'react';
import { couple, dateLabel } from '../data/site';
import { ROUTES } from '../routes';

export default function Footer() {
  return (
    <footer className="footer">
      <img src={couple.monogram} alt="" aria-hidden="true" />
      <p className="footer-names">
        {couple.bride} &amp; {couple.groom}
      </p>
      <p className="footer-meta">
        {dateLabel.short} · {dateLabel.city}
      </p>

      <ul className="footer-links">
        {ROUTES.map((r) => (
          <li key={r.path}>
            <a href={`#${r.path}`}>{r.nav}</a>
          </li>
        ))}
      </ul>

      <p className="footer-hash">{couple.hashtag}</p>
    </footer>
  );
}
