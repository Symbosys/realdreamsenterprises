import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

/** Frosted panel used for cards, forms and floating overlays. */
export function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border/70 bg-card/45 relative overflow-hidden rounded-sm border backdrop-blur-xl ${className}`}
    >
      <span className="via-ember/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">{title}</h2>
      {lead ? <p className="text-muted-foreground mt-5 max-w-2xl text-base">{lead}</p> : null}
    </Reveal>
  );
}

/** Counts up to a numeric value once scrolled into view. */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value.replace(/[\d.]+/, "0"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/[\d.]+/);
    if (!match) return setShown(value);
    const target = parseFloat(match[0]);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 3);
        const n = target * eased;
        const text = match[0].includes(".") ? n.toFixed(1) : Math.round(n).toLocaleString();
        setShown(value.replace(match[0], text));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

/** Button that leans toward the cursor — a subtle magnetic micro-interaction. */
export function Magnetic({
  children,
  className = "",
  onClick,
  href,
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [d, setD] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setD({ x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35 });
  };

  const inner = (
    <motion.span
      animate={{ x: d.x, y: d.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setD({ x: 0, y: 0 })}
      className="inline-flex"
    >
      {href ? (
        <a href={href} className={className}>
          {inner}
        </a>
      ) : (
        <button type={type ?? "button"} onClick={onClick} className={className}>
          {inner}
        </button>
      )}
    </div>
  );
}

/** Full-bleed page hero with a 3D layer behind cinematic type. */
export function PageHero({
  eyebrow,
  title,
  lead,
  scene,
  height = "h-[86vh]",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  scene: ReactNode;
  height?: string;
}) {
  return (
    <section className={`relative ${height} w-full overflow-hidden`}>
      <div className="absolute inset-0">{scene}</div>
      <div className="from-background via-background/25 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="max-w-4xl text-4xl leading-[0.95] md:text-7xl"
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        {lead ? (
          <motion.p
            className="text-muted-foreground mt-6 max-w-xl text-base md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {lead}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
