import Home from './pages/Home';
import Story from './pages/Story';
import WeddingDay from './pages/WeddingDay';
import BridalParty from './pages/BridalParty';
import Gallery from './pages/Gallery';
import GuestGuide from './pages/GuestGuide';
import Rsvp from './pages/Rsvp';

/** One list drives the nav, the footer and the router. */
export const ROUTES = [
  { path: '/', nav: 'Home', title: 'Home', Component: Home },
  { path: '/story', nav: 'Our Story', title: 'Our Story', Component: Story },
  { path: '/wedding-day', nav: 'The Day', title: 'The Wedding Day', Component: WeddingDay },
  { path: '/bridal-party', nav: 'Our People', title: 'Bridal Party', Component: BridalParty },
  { path: '/gallery', nav: 'Gallery', title: 'Gallery', Component: Gallery },
  { path: '/guest-guide', nav: 'Guest Guide', title: 'Guest Guide', Component: GuestGuide },
  { path: '/rsvp', nav: 'RSVP', title: 'RSVP', Component: Rsvp },
];

export function routeFor(hash) {
  const path = (hash || '').replace(/^#/, '').split('?')[0] || '/';
  return ROUTES.find((r) => r.path === path) || ROUTES[0];
}
