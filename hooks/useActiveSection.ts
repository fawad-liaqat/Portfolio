'use client';

import { useEffect, useState } from 'react';

// Keep in step with NAV_ITEMS in components/portfolio/Navbar.tsx.
const SECTIONS = ['hero', 'work', 'research', 'training', 'about', 'connect'] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    function update() {
      let current: SectionId = 'hero';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          current = id;
        }
      }
      setActive(current);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return active;
}
