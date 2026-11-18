import Navbar from "./Navbar";
import { cvLink } from "@/lib/cv";
import HeroSection from "./HeroSection";
import SignalStrip from "./SignalStrip";
import AboutSection from "./AboutSection";
import WorkSection from "./WorkSection";
import StartGuide from "./StartGuide";
import CredentialsSection from "./CredentialsSection";
import ConnectSection from "./ConnectSection";
import Footer from "./Footer";
import Enhancements from "./Enhancements";

// Page order. Each section reads its content from a file in data/.
export default function PortfolioZone() {
  return (
    <div className="page">
      <Navbar cv={cvLink()} />
      <main id="main">
        <HeroSection />
        {/* Owner's order: About, Start, Work, Training, Connect (CV is the header button). */}
        <AboutSection />
        <StartGuide />
        <SignalStrip />
        {/* Series, articles and projects, in that order. */}
        <WorkSection />
        <CredentialsSection />
        <ConnectSection />
      </main>
      <Footer />
      <Enhancements />
    </div>
  );
}
