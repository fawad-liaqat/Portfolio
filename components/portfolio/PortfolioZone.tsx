import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SignalStrip from "./SignalStrip";
import AboutSection from "./AboutSection";
import WorkSection from "./WorkSection";
import ResearchSection from "./ResearchSection";
import CredentialsSection from "./CredentialsSection";
import ConnectSection from "./ConnectSection";
import Footer from "./Footer";

// Page order. Each section reads its content from a file in data/.
export default function PortfolioZone() {
  return (
    <div className="page">
      <Navbar />
      <main id="main">
        <HeroSection />
        <SignalStrip />
        <WorkSection />
        <ResearchSection />
        <CredentialsSection />
        <AboutSection />
        <ConnectSection />
      </main>
      <Footer />
    </div>
  );
}
