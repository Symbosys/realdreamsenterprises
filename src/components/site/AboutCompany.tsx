import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ShieldCheck, Award, Factory, CheckCircle2, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    title: "Exclusive Jharkhand Supplier",
    desc: "Real Dreams Enterprises is the sole authorized supplier & exporter of Rashmi TMT Bars across all 24 districts of Jharkhand.",
  },
  {
    title: "Government Authorized & SOR Approved",
    desc: "100% Government approved & SOR letter certified for PWD, CPWD, NHAI, Railways, and all government tenders.",
  },
  {
    title: "Most Affordable Direct Pricing",
    desc: "Guaranteed most affordable direct mill pricing for high-yield Rashmi TMT steel in the market.",
  },
  {
    title: "German Quenching Metallurgy",
    desc: "Fe 550D / Fe 600 thermo-mechanically treated rebar with high ductility core & corrosion resistance.",
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
      setYears(30);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.from("[data-anim='head'] > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 })
        .from("[data-anim='img']", { y: 30, opacity: 0, duration: 0.9 }, "<0.15")
        .to(
          { v: 0 },
          {
            v: 30,
            duration: 1.2,
            ease: "power2.out",
            onUpdate() {
              setYears((this.targets()[0] as { v: number }).v);
            },
          },
          "<",
        )
        .from("[data-anim='pillar']", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "<0.2");

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
      }, 3500);

      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about-company" className="relative px-6 py-20 md:px-12 bg-background text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Content Column (7 cols) */}
          <div data-anim="head" className="lg:col-span-7 space-y-5">
            <p className="eyebrow text-ember">About Company</p>
            
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              Government Authorized <span className="text-ember-gradient">Rashmi TMT Bars</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              Real Dreams Enterprises is the sole authorized supplier and exporter of Rashmi TMT Bars across all 24 districts of Jharkhand. We supply popular, government-authorized, SOR-letter verified Rashmi TMT steel at the most affordable rates for all government tenders, PWD projects, highways, and commercial construction.
            </p>

            {/* Clean Feature Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  data-anim="pillar"
                  className="border-border/70 bg-card/40 rounded-lg border p-4.5 transition-colors hover:border-ember/40 hover:bg-card/70"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-ember shrink-0" />
                    <h3 className="font-display text-sm font-bold text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/products"
                className="bg-ember text-primary-foreground hover:shadow-ember flex items-center gap-2 rounded-md px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:scale-102"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="border-border/80 bg-card/60 hover:border-ember hover:bg-card flex items-center gap-2 rounded-md border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Contact Sales Desk
              </Link>
            </div>
          </div>

          {/* Right Image Showcase Column (5 cols) */}
          <div data-anim="img" className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border/80 bg-card/50 p-3 shadow-xl backdrop-blur-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-card">
                <img
                  src="/images/tmt_steel_manufacturing.png"
                  alt="TMT Steel Manufacturing Plant"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-103"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Simple Clean Experience Badge */}
              <div className="mt-3 flex items-center justify-between rounded-lg border border-border/60 bg-background/80 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="bg-ember/15 text-ember flex h-10 w-10 items-center justify-center rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-extrabold text-foreground">
                      <span ref={yearsRef}>0</span>
                      <span className="text-ember">+</span>
                    </div>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                      Years of Manufacturing Excellence
                    </p>
                  </div>
                </div>
                <span className="border-border/70 text-muted-foreground hidden rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider sm:inline-block">
                  IS 1786 Certified
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}