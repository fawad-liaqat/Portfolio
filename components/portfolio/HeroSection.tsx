"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import GradientText from "@/components/ui/GradientText";
import NetworkCanvas from "./NetworkCanvas";

export default function HeroSection() {
  return (
    <section id="hero">
      <RevealOnScroll>
        <div className="hero-content">
          <span className="section-label">01 — Identity</span>
          <h2 className="hero-headline">
            <GradientText>
              Building Financial Infrastructure for Emerging Markets
            </GradientText>
          </h2>
          <p className="hero-sub">
            FinTech senior at FAST Islamabad. Working inside the SBP ecosystem.
            Building on Pakistan&apos;s open banking stack. Designing financial
            solutions for populations the formal banking system hasn&apos;t
            reached.
          </p>
          <div className="hero-ctas">
            <a
              href="#work"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </a>
            <a
              href="https://fawad-liaqat.github.io/Research-Articles/"
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Research
            </a>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="network-canvas-container">
          <NetworkCanvas />
        </div>
      </RevealOnScroll>
    </section>
  );
}
