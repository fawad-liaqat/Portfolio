"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_COLORS,
  THEME_EVENT,
  THEME_KEY,
  type Theme,
} from "@/lib/theme";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked. The theme still changes for this visit.
  }
  root.dispatchEvent(new CustomEvent(THEME_EVENT));
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}

/**
 * Switches between the dark and light themes.
 *
 * Rendered hidden on the server, so visitors without JavaScript never see a
 * button that cannot work. Two copies exist (header and mobile menu); they
 * stay in step through the THEME_EVENT event on <html>.
 */
export default function ThemeToggle({
  variant,
}: {
  variant: "header" | "menu";
}) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(currentTheme());
    sync();
    setReady(true);
    root.addEventListener(THEME_EVENT, sync);
    return () => root.removeEventListener(THEME_EVENT, sync);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label =
    next === "light" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle-${variant}`}
      hidden={!ready}
      aria-label={variant === "header" ? label : undefined}
      title={variant === "header" ? label : undefined}
      onClick={() => applyTheme(next)}
    >
      {next === "light" ? <SunIcon /> : <MoonIcon />}
      {variant === "menu" && <span>{label}</span>}
    </button>
  );
}
