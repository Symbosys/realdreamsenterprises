import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Runs a GSAP timeline builder once the element scrolls into view (Lenis-safe). */
export function useGsapReveal<T extends HTMLElement>(
  build: (tl: gsap.core.Timeline) => void,
) {
  const root = useRef<T>(null);
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let io: IntersectionObserver | null = null;
    let fallback = 0;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      buildRef.current(tl);
      if (reduced) {
        tl.progress(1);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            tl.play();
          }
        },
        { threshold: 0.12 },
      );
      io.observe(el);
      fallback = window.setTimeout(() => {
        io?.disconnect();
        tl.play();
      }, 4000);
    }, el);

    return () => {
      io?.disconnect();
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return root;
}
