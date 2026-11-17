/*
 * Light and dark theme settings, shared by the inline script in
 * app/layout.tsx and the toggle in components/portfolio/ThemeToggle.tsx.
 *
 * Dark is the default. The visitor's choice is stored in localStorage under
 * THEME_KEY in their own browser. Nothing is sent anywhere. The system
 * colour scheme setting is not followed: the site opens dark until the
 * visitor chooses light.
 */
export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/** Browser bar colour for each theme. Matches --bg in styles/globals.css. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#070B14",
  light: "#F5F7FA",
};

/** Name of the event fired on <html> when the theme changes. */
export const THEME_EVENT = "themechange";

/**
 * Runs in <head> before the page is painted, so the chosen theme shows from
 * the first frame. Kept small and free of imports on purpose. localStorage
 * can throw (private mode, blocked storage), so it is wrapped in try/catch.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t=${JSON.stringify(
  DEFAULT_THEME,
)};try{var s=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});if(s==="light"||s==="dark")t=s}catch(e){}d.setAttribute("data-theme",t);var c=${JSON.stringify(
  THEME_COLORS,
)}[t];function m(){var e=document.querySelector('meta[name="theme-color"]');if(e)e.setAttribute("content",c)}m();document.addEventListener("DOMContentLoaded",m)})();`;
