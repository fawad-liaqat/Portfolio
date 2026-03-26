'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SignalStrip from './SignalStrip';
import AboutSection from './AboutSection';
import ResearchSection from './ResearchSection';
import WorkSection from './WorkSection';
import ConnectSection from './ConnectSection';
import Footer from './Footer';

interface Props {
  active: boolean;
  onBackToLanding?: () => void;
}

export default function PortfolioZone({ active, onBackToLanding }: Props) {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'auto';
      const timer = setTimeout(() => setNavVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setNavVisible(false);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div id="zone-b" className="active">
      <Navbar visible={navVisible} onBackToLanding={onBackToLanding} />
      <HeroSection />
      <SignalStrip />
      <AboutSection />
      <ResearchSection />
      <WorkSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
