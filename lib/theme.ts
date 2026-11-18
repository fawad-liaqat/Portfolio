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
 * Kept GitHub Pages projects live on another origin, so they cannot read
 * this site's localStorage. Links to these hosts get ?theme=light or
 * ?theme=dark added at the moment they are clicked, and those pages pass
 * the choice back the same way. Links between pages of this site need no
 * parameter: they share the stored choice.
 */
export const THEME_LINK_HOSTS = ["fawad-liaqat.github.io"];

/**
 * Runs in <head> before the page is painted, so the chosen theme shows from
 * the first frame. Kept small and free of imports on purpose. localStorage
 * can throw (private mode, blocked storage), so it is wrapped in try/catch.
 *
 * It does three things:
 * 1. Picks the theme: ?theme=light|dark in the address (from a GitHub Pages
 *    project) wins and is stored; otherwise the stored choice; otherwise dark.
 *    The parameter is then removed from the address bar.
 * 2. Sets data-theme on <html> and the browser bar colour, and keeps it set:
 *    if anything removes or blanks the attribute (for example React
 *    rebuilding the page), the last chosen theme is put straight back.
 * 3. Adds one delegated listener that appends ?theme= to links pointing at
 *    THEME_LINK_HOSTS when they are clicked, middle clicked, touched or
 *    opened with the keyboard, using the theme shown at that moment.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t=${JSON.stringify(
  DEFAULT_THEME,
)},k=${JSON.stringify(THEME_KEY)},H=${JSON.stringify(
  THEME_LINK_HOSTS,
)};function ok(v){return v==="light"||v==="dark"}try{var s=localStorage.getItem(k);if(ok(s))t=s}catch(e){}try{var u=new URL(location.href),q=u.searchParams.get("theme");if(ok(q)){t=q;try{localStorage.setItem(k,q)}catch(e){}u.searchParams.delete("theme");history.replaceState(history.state,"",u.pathname+u.search+u.hash)}}catch(e){}d.setAttribute("data-theme",t);try{new MutationObserver(function(){var v=d.getAttribute("data-theme");if(ok(v)){t=v}else{d.setAttribute("data-theme",t)}}).observe(d,{attributes:true,attributeFilter:["data-theme"]})}catch(e){}var c=${JSON.stringify(
  THEME_COLORS,
)}[t];function m(){var e=document.querySelector('meta[name="theme-color"]');if(e)e.setAttribute("content",c)}m();document.addEventListener("DOMContentLoaded",m);function tag(e){var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;if(!a)return;try{var l=new URL(a.href);if(H.indexOf(l.hostname)<0)return;l.searchParams.set("theme",d.getAttribute("data-theme")==="light"?"light":"dark");a.href=l.toString()}catch(e){}}["pointerdown","click","auxclick","keydown","contextmenu"].forEach(function(n){document.addEventListener(n,tag,true)})})();`;
