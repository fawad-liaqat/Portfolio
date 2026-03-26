'use client';

import { useState, useCallback } from 'react';
import LandingZone from '@/components/landing/LandingZone';
import PortfolioZone from '@/components/portfolio/PortfolioZone';

export default function Home() {
  const [portfolioActive, setPortfolioActive] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const handleEnter = useCallback(() => {
    setPortfolioActive(true);
  }, []);

  const handleBackToLanding = useCallback(() => {
    setPortfolioActive(false);
    setShowLanding(false);
    // Force remount of LandingZone by toggling showLanding
    requestAnimationFrame(() => {
      setShowLanding(true);
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <>
      {showLanding && <LandingZone onEnter={handleEnter} hidden={portfolioActive} />}
      <PortfolioZone active={portfolioActive} onBackToLanding={handleBackToLanding} />
    </>
  );
}
