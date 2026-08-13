import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/** Lenis-powered inertial scrolling, loaded only in the browser for public website pages. */
export function useSmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    // Disable smooth wheel hijacking inside Admin Portal to ensure native sidebar & table mouse scrolling
    if (location.pathname.startsWith("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [location.pathname]);
}