import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * Mounts heavy WebGL children only in the browser and only once the section
 * approaches the viewport, so 3D never blocks first paint.
 */
export function SceneMount({
  children,
  className,
  label = "Loading 3D scene",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const hydrated = useHydrated();
  const holder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    // Safety net: some browsers skip the initial callback after a programmatic
    // jump-scroll, so fall back to a manual rect check shortly after mount.
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 400 && r.bottom > -400) setNear(true);
    }, 600);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [near]);

  return (
    <div ref={holder} className={className}>
      {hydrated && near ? (
        <Suspense fallback={<SceneFallback label={label} />}>{children}</Suspense>
      ) : (
        <SceneFallback label={label} />
      )}
    </div>
  );
}

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="bg-ember h-1.5 w-1.5 animate-pulse rounded-full" />
        <span className="eyebrow">{label}</span>
      </div>
    </div>
  );
}