"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import type { CvLink } from "@/lib/cv";

// To add a page section to the menu, add it here and to SECTIONS in
// hooks/useActiveSection.ts. The id must match the section's id attribute.
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "start", label: "Start" },
  { id: "work", label: "Work" },
  { id: "training", label: "Training" },
  { id: "about", label: "About" },
  { id: "connect", label: "Connect" },
] as const;

/**
 * `base` is "" on the homepage (links like #work) and "/" on other pages
 * (links like /#work, which go back to the homepage section).
 */
export default function Navbar({
  base = "",
  cv,
  current,
}: {
  base?: "" | "/";
  /** Passed in from a server component. The CV links go to the CV page. */
  cv?: CvLink;
  /** Set on the CV page so its link is marked as the current page. */
  current?: "cv";
}) {
  const cvCurrent = current === "cv" ? ("page" as const) : undefined;
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
          {cv && (
            <a className="cv-link cv-link-menu" href={cv.page} aria-current={cvCurrent}>
              <DocIcon />
              View CV
            </a>
          )}
          <ThemeToggle variant="menu" />
        </nav>
        {/* Desktop copies, after the links so focus order matches what is seen. */}
        {cv && (
          <a className="cv-link cv-link-header" href={cv.page} aria-current={cvCurrent}>
            <DocIcon />
            <span className="cv-word">View</span> CV
          </a>
        )}
        <ThemeToggle variant="header" />
      </div>
    </header>
  );
}
