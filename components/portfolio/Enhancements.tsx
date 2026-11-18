"use client";

import { useEffect } from "react";

/*
 * Small page wide enhancements. The page is complete without this file:
 * all content is in the HTML and every disclosure works on its own.
 *
 * What it adds:
 * 1. Scroll reveal for elements marked `data-reveal`.
 * 2. (Removed) Count up for key figures. It rewrote text that React had not
 *    finished hydrating, which made React rebuild the page and drop the
 *    chosen theme. Figures now show their final value from the start.
 * 3. Escape closes the open disclosure that has focus.
 * 4. A link to #project-... opens that card's details.
 * 5. Stack diagram: select a layer on hover, pause pulses when off screen.
 *
 * Reveal is skipped when the visitor asks for reduced motion.
 */
export default function Enhancements() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canObserve = "IntersectionObserver" in window;
    const cleanups: Array<() => void> = [];

    // 1. Scroll reveal. Elements already on screen are left as they are.
    if (!reduce && canObserve) {
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      for (const el of items) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      }
      root.classList.add("reveal-on");
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => {
        io.disconnect();
        root.classList.remove("reveal-on");
      });
    }

    // 3. Escape closes the disclosure that holds focus.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const open = (document.activeElement as HTMLElement | null)?.closest<HTMLDetailsElement>(
        "details[open]",
      );
      if (open) {
        open.open = false;
        open.querySelector<HTMLElement>("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    cleanups.push(() => document.removeEventListener("keydown", onKeyDown));

    // 4. Open a project card's details when it is linked to.
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith("project-")) return;
      const details = document.getElementById(id)?.querySelector<HTMLDetailsElement>("details");
      if (details) details.open = true;
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    cleanups.push(() => window.removeEventListener("hashchange", openFromHash));

    // 5. Stack diagram.
    const stack = document.querySelector<HTMLElement>("[data-stack]");
    if (stack) {
      if (window.matchMedia("(hover: hover)").matches) {
        stack.querySelectorAll<HTMLElement>("[data-stack-layer]").forEach((label) => {
          const select = () => {
            const input = label.querySelector<HTMLInputElement>("input");
            if (input) input.checked = true;
          };
          label.addEventListener("mouseenter", select);
          cleanups.push(() => label.removeEventListener("mouseenter", select));
        });
      }
      if (canObserve) {
        const io = new IntersectionObserver(([entry]) => {
          stack.classList.toggle("is-paused", !entry.isIntersecting);
        });
        io.observe(stack);
        cleanups.push(() => io.disconnect());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
