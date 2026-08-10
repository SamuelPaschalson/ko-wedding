import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';
import useReveal from './hooks/useReveal';
import { routeFor } from './routes';
import { couple } from './data/site';

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

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

  useReveal(route.path);

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
