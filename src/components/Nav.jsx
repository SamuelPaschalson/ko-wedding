import React, { useEffect, useState } from 'react';
import { ROUTES } from '../routes';

export default function Nav({ current, transparent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [current]);

  const bare = transparent && !scrolled && !open;

  return (
    <header className={`nav${bare ? ' nav--transparent' : ''}`}>
      <nav className="nav-inner shell" aria-label="Main">
        <a className="nav-mark" href="#/">
          K&nbsp;O <span>26 · 09 · 26</span>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </button>

        <ul className={`nav-links${open ? ' is-open' : ''}`} id="nav-links">
          {ROUTES.map((r) => (
            <li key={r.path}>
              <a
                href={`#${r.path}`}
                aria-current={current === r.path ? 'page' : undefined}
              >
                {r.nav}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
