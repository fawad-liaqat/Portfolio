"use client";

import { useState, useCallback, useEffect } from "react";
import ParticleCanvas from "./ParticleCanvas";
import { siteConfig } from "@/data/site";

interface Props {
  onEnter: () => void;
  hidden?: boolean;
}

export default function LandingZone({ onEnter, hidden = false }: Props) {
  const [exiting, setExiting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset state when landing zone is shown again
  useEffect(() => {
    if (!hidden) {
      setExiting(false);
      setLoading(false);
    }
  }, [hidden]);

  const handleEnter = useCallback(() => {
    if (exiting || hidden) return;
    setLoading(true);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        onEnter();
      }, 800);
    }, 600);
  }, [exiting, hidden, onEnter]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" && !hidden && !exiting) handleEnter();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleEnter, hidden, exiting]);

  if (hidden) return null;

  return (
    <div id="zone-a" className={exiting ? "exiting" : ""}>
      <ParticleCanvas />
      <div className="landing-content">
        <div className="avatar-container">
          <div className="avatar-glow" />
          <div className="avatar-ring" />
          {/* Avatar loaded from public/images/avatar.png */}
          <img
            className="avatar-img"
            src="/images/avatar.png"
            alt={siteConfig.name}
            width={220}
            height={220}
          />
          <div className="avatar-data-nodes">
            <span className="data-node">FAPI 1.0</span>
            <span className="data-node">SBP_BPRD</span>
            <span className="data-node">G.729</span>
            <span className="data-node">NADRA</span>
            <span className="data-node">KYC_T2</span>
            <span className="data-node">RAAST</span>
          </div>
        </div>
        <h1 className="landing-name">{siteConfig.name.toUpperCase()}</h1>
        <p className="landing-sub">{siteConfig.tagline}</p>
        <p className="landing-tagline">{siteConfig.oneliner}</p>
        <button className="cta-button" onClick={handleEnter}>
          ENTER PORTFOLIO <span className="cta-cursor" />
        </button>
        <span className="landing-hint">press Enter or click to continue</span>
        <span
          className="landing-loading"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--accent-purple)",
            letterSpacing: "0.15em",
            opacity: loading ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        ></span>
      </div>
    </div>
  );
}
