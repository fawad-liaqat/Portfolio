"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Props {
  visible: boolean;
  onBackToLanding?: () => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "connect", label: "Connect" },
] as const;

export default function Navbar({ visible, onBackToLanding }: Props) {
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault();
    if (onBackToLanding) {
      onBackToLanding();
    }
  }

  return (
    <>
      <nav className={`navbar ${visible ? "visible" : ""}`} id="navbar">
        <a
          href="#"
          className="nav-logo"
          onClick={handleLogoClick}
          title="Back to landing"
        >
          FL<span>.</span>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-section={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="mobile-menu-btn"
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
        >
          &#9776;
        </button>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-close"
          aria-label="Close"
          onClick={() => setMobileOpen(false)}
        >
          &times;
        </button>
        <a
          href="#"
          className="mobile-link"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            if (onBackToLanding) onBackToLanding();
          }}
        >
          &#8592; Landing
        </a>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-link"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
