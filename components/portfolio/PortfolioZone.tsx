import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SignalStrip from "./SignalStrip";
import AboutSection from "./AboutSection";
import WorkSection from "./WorkSection";
import ResearchSection from "./ResearchSection";
import ConnectSection from "./ConnectSection";
import Footer from "./Footer";

export default function PortfolioZone() {
  return (
    <div id="zone-b" className="active">
      <Navbar />
      <HeroSection />
      <SignalStrip />
      <WorkSection />
      <ResearchSection />
      <AboutSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
