import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import {
  ShieldCheck,
  Award,
  Zap,
  Factory,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Building2,
  TrendingUp,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Factory,
    title: "Thermo-Mechanical Treatment",
    desc: "Quenched martensitic rim with ductile ferrite-pearlite core for maximum yield strength and high elongation.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Mill Quality",
    desc: "Strict adherence to IS 1786 (Fe 500D / Fe 550D / Fe 600) with 100% heat-traceable Mill Test Certificates.",
  },
  {
    icon: Layers,
    title: "Seismic Zone Detailing",
    desc: "Controlled UTS-to-yield ratios designed to absorb cyclic loads in seismic zones III to V without brittle snap.",
  },
  {
    icon: Zap,
    title: "Rapid Dispatch Network",
    desc: "Over 1.4 million tonnes annual capacity with 48 to 72 hour site delivery windows across 18 states.",
  },
];

const METRICS = [
  { value: "1.4M t", label: "Annual Mill Capacity", icon: TrendingUp },
  { value: "2,800+", label: "Landmark Projects", icon: Building2 },
  { value: "100%", label: "Heat Traceability", icon: ShieldCheck },
  { value: "30+", label: "Years Experience", icon: Award },
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

      tl.from("[data-anim='head'] > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 })
        .from("[data-anim='img-box']", { scale: 0.95, opacity: 0, duration: 0.9, ease: "power2.out" }, "<0.15")
        .to(
          { v: 0 },
          {
            v: 30,
            duration: 1.4,
            ease: "power2.out",
            onUpdate() {
              setYears((this.targets()[0] as { v: number }).v);
            },
          },
          "<",
        )
        .from("[data-anim='feature-card']", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, "<0.2")
        .from("[data-anim='stat-box']", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "<0.15");

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            tl.play();
          }
        },
        { threshold: 0.12 },
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
    <section ref={root} id="about-company" className="relative px-6 py-24 md:px-12 bg-background text-foreground overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-ember/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-steel/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Main Grid Section */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Content Column (7 cols) */}
          <div data-anim="head" className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-ember" />
              <span className="text-ember text-[11px] font-bold uppercase tracking-[0.25em]">
                Pioneering Metallurgy & Steel Works
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:leading-[1.15]">
              Leading the Industry in High-Performance <span className="text-ember-gradient">TMT Steel</span> Rebars
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              Real Dreams Enterprises & Stambh Steel deliver certified Thermo-Mechanically Treated (TMT) rebars engineered for structural strength, superior bendability, and high seismic endurance. Built to power high-rise towers, long-span bridges, and critical infrastructure.
            </p>

            {/* Key Feature Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {HIGHLIGHTS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    data-anim="feature-card"
                    className="group border-border/70 bg-card/40 hover:bg-card hover:border-ember/40 rounded-xl border p-4.5 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors">
                        <IconComponent className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/products"
                className="bg-ember text-primary-foreground hover:shadow-ember flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
              >
                Explore TMT Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="border-border/80 bg-card/60 hover:border-ember hover:bg-card flex items-center gap-2 rounded-lg border px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
              >
                Request Technical Quote
              </Link>
            </div>
          </div>

          {/* Right Image Showcase Column (5 cols) */}
          <div className="lg:col-span-5">
            <div
              data-anim="img-box"
              className="relative mx-auto max-w-md lg:max-w-none group rounded-2xl border border-border/80 bg-card/60 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-ember/50"
            >
              {/* Decorative Glowing Backdrop */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-ember/30 via-steel/20 to-ember/20 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

              {/* Main Image Wrapper */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-card">
                <img
                  src="/images/tmt_steel_manufacturing.png"
                  alt="Thermo-Mechanically Treated TMT Steel Manufacturing Plant"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Image Gradients */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Overlaid Floating Badge - Top Right */}
                <div className="absolute right-4 top-4 rounded-lg border border-border/70 bg-background/80 px-3.5 py-2 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      IS 1786 Grade Certified
                    </span>
                  </div>
                </div>

                {/* Overlaid Bottom Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-lg border border-border/80 bg-background/85 p-3.5 shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-ember">Precision Rolling Mill</p>
                        <p className="font-display text-xs font-bold text-foreground">Fe 500D / Fe 550D / Fe 600 Rebars</p>
                      </div>
                      <div className="bg-ember/15 text-ember flex h-7 w-7 items-center justify-center rounded-full">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Counter Badge - Overhanging Card Bottom */}
              <div className="relative mt-4 rounded-xl border border-border/80 bg-card/90 p-5 shadow-xl backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-ember/15 text-ember flex h-12 w-12 items-center justify-center rounded-xl font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-black text-foreground md:text-3xl">
                      <span ref={yearsRef}>0</span>
                      <span className="text-ember">+</span>
                    </div>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                      Years of Manufacturing Excellence
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metrics Ribbon */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => {
            const IconComp = m.icon;
            return (
              <div
                key={m.label}
                data-anim="stat-box"
                className="group border-border/70 bg-card/30 hover:bg-card/70 hover:border-ember/40 flex items-center gap-4 rounded-xl border p-5 transition-all duration-300 backdrop-blur-md"
              >
                <div className="bg-ember/10 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors">
                  <IconComp className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold text-foreground md:text-2xl">{m.value}</p>
                  <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">{m.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}