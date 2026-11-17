"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

// To add a page section to the menu, add it here and to SECTIONS in
// hooks/useActiveSection.ts. The id must match the section's id attribute.
const NAV_ITEMS = [
  { id: "series", label: "Series" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "training", label: "Training" },
  { id: "about", label: "About" },
  { id: "connect", label: "Connect" },
] as const;

/**
 * `base` is "" on the homepage (links like #work) and "/" on other pages
 * (links like /#work, which go back to the homepage section).
 */
export default function Navbar({ base = "" }: { base?: "" | "/" }) {
  const activeSection = useActiveSection();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container header-inner">
        <a href={`${base}#hero`} className="site-name" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="site-nav"
          className={open ? "site-nav open" : "site-nav"}
          aria-label="Sections"
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`${base}#${item.id}`}
                  aria-current={!base && activeSection === item.id ? "true" : undefined}
                  onClick={() => {
                    if (open) {
                      setOpen(false);
                      buttonRef.current?.focus();
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle variant="menu" />
        </nav>
        {/* Desktop copy, after the links so focus order matches what is seen. */}
        <ThemeToggle variant="header" />
      </div>
    </header>
  );
}
