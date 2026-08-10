import { useEffect } from 'react';

/**
 * Reveals any element with .reveal as it enters the viewport.
 * WHY a hook and not a component: the markup stays clean — pages just
 * add className="reveal" and this observes whatever is on the page,
 * re-running whenever the route changes.
 */
export default function useReveal(dependency) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [dependency]);
}
