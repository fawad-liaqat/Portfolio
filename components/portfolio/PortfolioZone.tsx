import Navbar from "./Navbar";
import { cvLink } from "@/lib/cv";
import HeroSection from "./HeroSection";
import SignalStrip from "./SignalStrip";
import AboutSection from "./AboutSection";
import WorkSection from "./WorkSection";
import ResearchSection from "./ResearchSection";
import CredentialsSection from "./CredentialsSection";
import ConnectSection from "./ConnectSection";
import Footer from "./Footer";
import SeriesSection from "@/components/series/SeriesSection";
import Enhancements from "./Enhancements";

// Page order. Each section reads its content from a file in data/.
export default function PortfolioZone() {
  return (
    <div className="page">
      <Navbar cv={cvLink()} />
      <main id="main">
        <HeroSection />
        <SignalStrip />
        <SeriesSection />
        <WorkSection />
        <ResearchSection />
        <CredentialsSection />
        <AboutSection />
        <ConnectSection />
      </main>
      <Footer />
      <Enhancements />
    </div>
  );
}
