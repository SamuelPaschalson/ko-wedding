import React, { useEffect, useState } from 'react';
import Envelope from './components/Envelope';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';
import useReveal from './hooks/useReveal';
import { routeFor } from './routes';
import { couple } from './data/site';

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  // WHY: the envelope is a welcome, not a toll gate. Once a guest has opened
  // it we remember that for the tab, so a refresh or a shared deep link does
  // not make them break the seal all over again.
  const [envelopeOpen, setEnvelopeOpen] = useState(() => {
    try {
      if (sessionStorage.getItem('ko-envelope-opened') === '1') return true;
    } catch {
      /* private mode — fall through and just show the envelope */
    }
    // Deep links into an inner page skip the envelope entirely.
    return (window.location.hash || '#/') !== '#/';
  });

  const openEnvelope = () => {
    try {
      sessionStorage.setItem('ko-envelope-opened', '1');
    } catch {
      /* ignore */
    }
    setEnvelopeOpen(true);
  };

  // Lock the page behind the envelope so nothing scrolls underneath it.
  useEffect(() => {
    document.body.style.overflow = envelopeOpen ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [envelopeOpen]);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || '#/');
      // WHY: hash navigation keeps the old scroll position, which lands
      // guests halfway down a page they have never seen.
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const route = routeFor(hash);
  const { Component } = route;

  useEffect(() => {
    document.title =
      route.path === '/'
        ? `${couple.bride} & ${couple.groom} · ${couple.hashtag}`
        : `${route.title} · ${couple.bride} & ${couple.groom}`;
  }, [route]);

  // WHY the envelope is part of the key: while the envelope is up, the site
  // markup does not exist yet, so the observer finds nothing to watch and every
  // .reveal block stays invisible. Re-running once the envelope opens is what
  // actually brings the home page content in.
  useReveal(`${route.path}|${envelopeOpen}`);

  if (!envelopeOpen) {
    return <Envelope onOpen={openEnvelope} />;
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav current={route.path} transparent={route.path === '/'} />
      <main id="main" className={route.path === '/' ? '' : 'page'}>
        <Component />
      </main>
      <Footer />
      <MusicToggle />
    </>
  );
}
