import { useEffect, useRef } from "react";
import gsap from "gsap";

const PILLARS = [
  {
    t: "World Experts",
    d: "Global leaders in TMT bar manufacturing.",
  },
  {
    t: "Mechanical Works",
    d: "Expert mechanical solutions for construction.",
  },
];

export function AboutCompany() {
  const root = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setYears = (n: number) => {
      if (yearsRef.current) yearsRef.current.textContent = String(Math.round(n));
    };

    if (reduced) {
      setYears(7);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.from("[data-anim='head'] > *", { y: 34, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(
          "[data-anim='badge']",
          { scale: 0.85, opacity: 0, duration: 0.9, ease: "back.out(1.6)" },
          "<0.1",
        )
        .to(
          { v: 0 },
          {
            v: 7,
            duration: 1.3,
            ease: "power2.out",
            onUpdate() {
              setYears((this.targets()[0] as { v: number }).v);
            },
          },
          "<",
        )
        .from("[data-anim='rule']", { scaleX: 0, transformOrigin: "left center", duration: 1 }, "<0.2")
        .from("[data-anim='card']", { y: 46, opacity: 0, duration: 0.9, stagger: 0.15 }, "<0.15");

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            tl.play();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(el);
      const fallback = window.setTimeout(() => {
        io.disconnect();
        tl.play();
      }, 4000);

      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about-company" className="relative px-6 py-24 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div data-anim="head">
          <p className="eyebrow">About Company</p>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">
            We are the best <span className="text-ember-gradient">TMT bar</span> company
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl text-base">
            Leading TMT bar manufacturer, known for unmatched quality, reliability, and innovative
            solutions to meet all construction requirements.
          </p>
        </div>

        <div className="flex items-start lg:justify-end">
          <div
            data-anim="badge"
            className="border-border/70 bg-card/45 relative overflow-hidden rounded-sm border px-8 py-7 backdrop-blur-xl"
          >
            <span className="via-ember/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
            <div className="font-display text-5xl leading-none font-extrabold md:text-6xl">
              <span ref={yearsRef}>0</span>
              <span className="text-ember"> +</span>
            </div>
            <div className="text-muted-foreground mt-3 text-[11px] tracking-[0.28em] uppercase">
              Years Experiences
            </div>
          </div>
        </div>
      </div>

      <div data-anim="rule" className="bg-border mt-14 h-px w-full" />

      <div data-anim="cards" className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div data-anim="card">
          <h3 className="font-display text-2xl font-bold md:text-3xl">Our History</h3>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Decades of expertise in providing high-quality TMT bars for reliable and sustainable
            construction solutions.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.t} data-anim="card" className="bg-card p-6">
              <div className="text-ember font-display text-xs font-bold tracking-[0.2em] uppercase">
                {p.t}
              </div>
              <p className="text-muted-foreground mt-3 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}