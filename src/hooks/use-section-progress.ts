import { useEffect, useRef, useState } from "react";

/**
 * Returns 0..1 scroll progress of an element through the viewport.
 * 0 = element top hits viewport bottom, 1 = element bottom hits viewport top.
 */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const raw = (window.innerHeight - rect.top) / total;
      progress.current = Math.min(1, Math.max(0, raw));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress, visible };
}