import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AboutCompany } from "@/components/site/AboutCompany";
import { Testimonials } from "@/components/site/Testimonials";
import { ExclusiveJharkhandExporter } from "@/components/site/ExclusiveJharkhandExporter";
import { HomeClientsMarquee } from "@/components/site/HomeClientsMarquee";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { GovtAuthorizedSection } from "@/components/site/GovtAuthorizedSection";
import { SorLetterSection } from "@/components/site/SorLetterSection";
import { LivePricingSection } from "@/components/site/LivePricingSection";
import { useGetWebConfig, parseJsonConfig } from "@/api/webconfig.api";

export type ProductId = "tmt" | "rod" | "stambh" | "structural";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rashmi TMT & SME-TMT Bars — Exclusive Supplier in Jharkhand | Real Dreams Enterprises Limited" },
      {
        name: "description",
        content:
          "Sole authorized supplier of SME-TMT and Rashmi TMT Bars across all 24 districts of Jharkhand. Government-authorized, SOR letter certified, and most affordable.",
      },
      { property: "og:title", content: "Rashmi TMT & SME-TMT Bars — Exclusive Supplier in Jharkhand | Real Dreams Enterprises Limited" },
      {
        property: "og:description",
        content:
          "HSole authorized supplier of SME-TMT and Rashmi TMT Bars across all 24 districts of Jharkhand. Government-authorized, SOR letter certified, and most affordable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRODUCTS: Record<
  ProductId,
  {
    name: string;
    tag: string;
    blurb: string;
    image: string;
    specs: [string, string][];
    hotspots: { label: string }[];
  }
> = {
  tmt: {
    name: "Rashmi TMT Bars",
    tag: "Government Authorized · Most Affordable · Fe 500D / 550D",
    image: "/images/tmt_bars.png",
    blurb:
      "Government-authorized Rashmi TMT steel approved for use in all government, PWD, rail, and public sector projects — delivering superior yield strength, ductility, and cost savings.",
    specs: [
      ["Government Approval", "Approved for all Govt Projects"],
      ["Yield strength", "500–600 N/mm²"],
      ["Elongation", "≥ 16%"],
      ["Diameter range", "8mm – 40mm"],
    ],
    hotspots: [{ label: "Govt Authorized (SOR)" }, { label: "High Ductility Core" }, { label: "Most Affordable" }],
  },
  rod: {
    name: "Steel Rods",
    tag: "Bright bar · Hot rolled",
    image: "/images/steel_rods.png",
    blurb:
      "Precision-drawn rounds with consistent metallurgy and surface finish for machining, fabrication and structural fastening.",
    specs: [
      ["Tolerance", "h9 / h11"],
      ["Surface", "Ra ≤ 0.8 µm"],
      ["Lengths", "3m – 12m"],
      ["Finish", "Bright / black"],
    ],
    hotspots: [{ label: "Drawn Finish" }, { label: "High Precision" }],
  },
  stambh: {
    name: "Tata Stambh",
    tag: "Structural pillar system",
    image: "/images/stambh_column.png",
    blurb:
      "A modular column system engineered for rapid erection: cast base, load-bearing shaft and capital plate that transfer forces cleanly to the foundation.",
    specs: [
      ["Axial capacity", "Up to 2,400 kN"],
      ["Base plate", "Grouted anchor set"],
      ["Coating", "Hot-dip galvanised"],
      ["Erection", "< 40 min / unit"],
    ],
    hotspots: [{ label: "Capital Plate" }, { label: "Anchored Base" }, { label: "Galvanised Shaft" }],
  },
  structural: {
    name: "Structural Steel",
    tag: "I-beams · Channels · Angles",
    image: "/images/structural_steel.png",
    blurb:
      "Rolled sections with certified mill test reports, built for long spans, seismic detailing and heavy industrial loading.",
    specs: [
      ["Grades", "E250 – E450"],
      ["Section depth", "100mm – 900mm"],
      ["Standard", "IS 2062 / EN 10025"],
      ["Weldability", "CE ≤ 0.42"],
    ],
    hotspots: [{ label: "Top Flange" }, { label: "Web Reinforcement" }, { label: "Certified Mill Weld" }],
  },
};

const SECTORS = [
  { t: "Commercial Towers", d: "Grade-A office cores with long clear spans." },
  { t: "Residential", d: "High-rise housing built on ductile reinforcement." },
  { t: "Flyovers & Bridges", d: "Cable-stay pylons and pre-stressed decks." },
  { t: "Metro & Rail", d: "Viaducts, depots and station superstructure." },
  { t: "Industrial Plants", d: "Heavy frames, silos and crane gantries." },
  { t: "Warehousing", d: "Clear-span portal sheds at logistics scale." },
];

const FALLBACK_MILESTONES = [
  { year: "1994", label: "Founded" },
  { year: "2003", label: "First Rolling Mill" },
  { year: "2011", label: "ISO 9001" },
  { year: "2018", label: "1M Tonnes" },
  { year: "2026", label: "Green Steel" },
];

const FALLBACK_STATS = [
  ["1.4M t", "Annual capacity"],
  ["2,800+", "Projects delivered"],
  ["ISO 9001", "Quality certified"],
  ["18", "States served"],
];

function Index() {
  const { data: webConfig, isLoading } = useGetWebConfig();

  const milestones = parseJsonConfig<{ year: string; label: string }[]>(webConfig, "milestones.hero", FALLBACK_MILESTONES);
  const statsRaw = parseJsonConfig<{ value: string; label: string }[]>(webConfig, "stats", []);
  const stats: [string, string][] = statsRaw.length > 0
    ? statsRaw.map((s) => [s.value, s.label] as [string, string])
    : FALLBACK_STATS as [string, string][];
  return (
    <main className="bg-background text-foreground relative">
      {/* Hero */}
      <section id="top" className="relative min-h-[90vh] md:min-h-screen w-full overflow-hidden bg-background flex flex-col justify-end">
        <div className="absolute inset-0">
          <img
            src="/images/tmt_steel_manufacturing.png"
            alt="Steel manufacturing plant"
            className="h-full w-full object-cover opacity-35 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-background/40 to-background" />
        </div>

        <div className="relative z-10 px-6 pb-20 md:px-12 md:pb-24 max-w-7xl mx-auto w-full">
          <p className="eyebrow mb-4 text-ember">Exclusive Supplier Across Jharkhand · Government Authorized & SOR Approved</p>
          <h1 className="max-w-4xl text-5xl leading-[0.92] md:text-8xl font-display font-extrabold tracking-tight">
            Jharkhand's premier
            <span className="text-ember-gradient"> Rashmi TMT Bars</span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base md:text-lg leading-relaxed">
            Sole authorized supplier & exporter of Rashmi TMT Bars across all 24 districts of Jharkhand — government-authorized, SOR-letter certified, and guaranteed most affordable.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-ember text-primary-foreground hover:shadow-ember inline-flex items-center justify-center rounded-md px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
            >
              Explore Catalogue
            </Link>
            <Link
              to="/contact"
              className="border-border/80 bg-card/60 hover:border-ember hover:bg-card inline-flex items-center justify-center rounded-md border px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Request Price Quote
            </Link>
          </div>
        </div>

        <div className="text-muted-foreground absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase z-10">
          Scroll
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-ember">Experience 03</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            The catalogue, in your hands
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            {/* Product Image Showcase Container */}
            <div className="border-border bg-card/60 relative h-[55vh] min-h-100 rounded-xl border p-4 shadow-xl overflow-hidden backdrop-blur-md group">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-background/50 flex items-center justify-center">
                <img
                  src={PRODUCTS.tmt.image}
                  alt={PRODUCTS.tmt.name}
                  className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />

                {/* Hotspot Badges Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {PRODUCTS.tmt.hotspots.map((h) => (
                    <span
                      key={h.label}
                      className="border-ember/40 bg-background/85 text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md shadow-md"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                      {h.label}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-muted-foreground absolute top-4 right-6 text-[10px] tracking-[0.25em] uppercase font-bold">
                Certified Steel Rebar
              </span>
            </div>

            <div>
              <p className="eyebrow text-ember">{PRODUCTS.tmt.tag}</p>
              <h3 className="mt-2 text-2xl md:text-4xl font-display font-bold">{PRODUCTS.tmt.name}</h3>
              <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">{PRODUCTS.tmt.blurb}</p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                {PRODUCTS.tmt.specs.map(([k, v]) => (
                  <div key={k} className="bg-card p-4">
                    <dt className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-bold">
                      {k}
                    </dt>
                    <dd className="font-display mt-1 text-base md:text-lg font-bold text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/products"
                className="bg-ember text-primary-foreground hover:shadow-ember mt-6 inline-flex rounded-md px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-all hover:scale-102"
              >
                Open the showroom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the company */}
      <AboutCompany />

      {/* City Section with Video Background */}
      <section id="city" className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/city.mp4" type="video/mp4" />
        </video>
        <div className="from-background/90 via-background/50 to-background/90 pointer-events-none absolute inset-0 bg-linear-to-t" />
        <div className="relative z-10 flex h-full min-h-screen flex-col justify-between p-6 md:p-12 max-w-7xl mx-auto">
          <div>
            <p className="eyebrow text-ember">Experience 04</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-5xl font-display font-extrabold">
              A city is a material decision, repeated
            </h2>
          </div>
          <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            {SECTORS.map((s) => (
              <div key={s.t} className="border-border/60 border-t pt-3 bg-background/40 p-3 rounded-md backdrop-blur-md">
                <div className="text-sm font-semibold">{s.t}</div>
                <div className="text-muted-foreground text-xs">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section id="legacy" className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ember">Experience 05</p>
              <h2 className="mt-3 max-w-lg text-3xl md:text-5xl font-display font-extrabold tracking-tight">
                Three decades, drawn to scale
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Over 30 years of engineering reliability, expanding rolling capacity, and delivering certified structural steel across the nation.
            </p>
          </div>

          {/* Timeline Milestones Track */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border-border/70 bg-card/40 rounded-xl border p-6 animate-pulse space-y-2">
                  <div className="h-7 w-16 bg-ember/20 rounded" />
                  <div className="h-4 w-24 bg-muted/60 rounded" />
                </div>
              ))
            ) : (
              milestones.map((m) => (
                <div
                  key={m.year}
                  className="border-border/70 bg-card/40 hover:border-ember/50 hover:bg-card/70 relative rounded-xl border p-6 transition-all duration-300"
                >
                  <div className="text-ember font-display text-3xl font-extrabold">{m.year}</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{m.label}</div>
                </div>
              ))
            )}
          </div>

          {/* Key Stats Counter Grid */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card p-6 md:p-8 animate-pulse space-y-2">
                  <div className="h-9 w-24 bg-muted/60 rounded" />
                  <div className="h-3 w-28 bg-muted/40 rounded" />
                </div>
              ))
            ) : (
              stats.map(([v, k]) => (
                <div key={k} className="bg-card p-6 md:p-8">
                  <div className="font-display text-3xl font-extrabold md:text-4xl text-foreground">{v}</div>
                  <div className="text-muted-foreground mt-2 text-[11px] tracking-[0.2em] uppercase font-bold">
                    {k}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Government Authorized Supplier Section */}
      <GovtAuthorizedSection />

      {/* Official Recognition - SOR Letter Section */}
      {/* <SorLetterSection /> */}

      {/* Live Pricing of TMT Bars (Rashmi & JSW) Section */}
      <LivePricingSection />

      {/* Journey */}
      <section className="px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-ember">Continue the journey</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {[
              { to: "/about" as const, t: "Our story", d: "Three decades, rendered as a walkable timeline." },
              { to: "/gallery" as const, t: "Projects", d: "Drone fly-throughs and before/after builds." },
              { to: "/blog" as const, t: "Insights", d: "Engineering notes from the mill and the site." },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="bg-card hover:bg-secondary/60 group p-8 transition-colors">
                <div className="font-display text-xl font-bold">{c.t}</div>
                <p className="text-muted-foreground mt-2 text-sm">{c.d}</p>
                <span className="text-ember mt-6 inline-block text-[11px] tracking-[0.25em] uppercase font-bold">
                  Enter →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Exclusive Jharkhand Exporter & Supplier Showcase */}
      <ExclusiveJharkhandExporter />

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Infinite Horizontal Scrolling Our Clients Section (Images Only) */}
      <HomeClientsMarquee />
    </main>
  );
}