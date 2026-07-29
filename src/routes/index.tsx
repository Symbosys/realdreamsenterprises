import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { SceneMount } from "@/components/SceneMount";
import { AboutCompany } from "@/components/site/AboutCompany";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { LatestNews } from "@/components/site/LatestNews";
import { useSectionProgress } from "@/hooks/use-section-progress";
import type { ProductId, ViewMode } from "@/components/three/ProductScene";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));
const TimelineScene = lazy(() => import("@/components/three/TimelineScene"));
const ProductScene = lazy(() => import("@/components/three/ProductScene"));
const CityScene = lazy(() => import("@/components/three/CityScene"));
const LegacyScene = lazy(() => import("@/components/three/LegacyScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stambh Steel — Cinematic 3D Construction Materials Experience" },
      {
        name: "description",
        content:
          "An immersive 3D showroom for TMT bars, structural steel and engineering solutions — cinematic construction storytelling, interactive product models and smart-city visualisation.",
      },
      { property: "og:title", content: "Stambh Steel — Cinematic 3D Construction Materials Experience" },
      {
        property: "og:description",
        content:
          "An immersive 3D showroom for TMT bars, structural steel and engineering solutions — cinematic construction storytelling, interactive product models and smart-city visualisation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STAGES = [
  { n: "01", t: "Foundation", d: "Excavation, compaction and load-path planning." },
  { n: "02", t: "Concrete Pour", d: "High-grade mix cast into engineered formwork." },
  { n: "03", t: "Reinforcement", d: "Fe 550D TMT cages tied to structural drawings." },
  { n: "04", t: "Columns Rise", d: "Vertical load members set to millimetre tolerance." },
  { n: "05", t: "Floor Plates", d: "Slab after slab, the frame gains altitude." },
  { n: "06", t: "Roofing", d: "Topping out — the structural envelope closes." },
  { n: "07", t: "Glass Façade", d: "Unitised curtain wall clads the steel skeleton." },
  { n: "08", t: "Handover", d: "Interiors energise. The tower goes live." },
];

const PRODUCTS: Record<
  ProductId,
  {
    name: string;
    tag: string;
    blurb: string;
    specs: [string, string][];
    hotspots: { label: string; position: [number, number, number] }[];
  }
> = {
  tmt: {
    name: "TMT Bars",
    tag: "Fe 500D · Fe 550D · Fe 600",
    blurb:
      "Thermo-mechanically treated rebar with a tough martensitic rim and ductile ferrite-pearlite core — high yield strength without losing bendability.",
    specs: [
      ["Yield strength", "500–600 N/mm²"],
      ["Elongation", "≥ 16%"],
      ["Diameter range", "8mm – 40mm"],
      ["Corrosion", "CRS grade available"],
    ],
    hotspots: [
      { label: "Rib pattern", position: [1.1, 0.28, 0] },
      { label: "Soft core", position: [-1.3, -0.3, 0.2] },
    ],
  },
  rod: {
    name: "Steel Rods",
    tag: "Bright bar · Hot rolled",
    blurb:
      "Precision-drawn rounds with consistent metallurgy and surface finish for machining, fabrication and structural fastening.",
    specs: [
      ["Tolerance", "h9 / h11"],
      ["Surface", "Ra ≤ 0.8 µm"],
      ["Lengths", "3m – 12m"],
      ["Finish", "Bright / black"],
    ],
    hotspots: [{ label: "Drawn finish", position: [1.4, 0.45, 0.2] }],
  },
  stambh: {
    name: "Tata Stambh",
    tag: "Structural pillar system",
    blurb:
      "A modular column system engineered for rapid erection: cast base, load-bearing shaft and capital plate that transfer forces cleanly to the foundation.",
    specs: [
      ["Axial capacity", "Up to 2,400 kN"],
      ["Base plate", "Grouted anchor set"],
      ["Coating", "Hot-dip galvanised"],
      ["Erection", "< 40 min / unit"],
    ],
    hotspots: [
      { label: "Capital plate", position: [0.7, 2, 0] },
      { label: "Anchored base", position: [1.3, -1.4, 0] },
    ],
  },
  structural: {
    name: "Structural Steel",
    tag: "I-beams · Channels · Angles",
    blurb:
      "Rolled sections with certified mill test reports, built for long spans, seismic detailing and heavy industrial loading.",
    specs: [
      ["Grades", "E250 – E450"],
      ["Section depth", "100mm – 900mm"],
      ["Standard", "IS 2062 / EN 10025"],
      ["Weldability", "CE ≤ 0.42"],
    ],
    hotspots: [
      { label: "Top flange", position: [1.6, 1, 0.4] },
      { label: "Web", position: [-1.6, 0, 0.2] },
    ],
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

const MILESTONES = [
  { year: "1994", label: "Founded" },
  { year: "2003", label: "First Rolling Mill" },
  { year: "2011", label: "ISO 9001" },
  { year: "2018", label: "1M Tonnes" },
  { year: "2026", label: "Green Steel" },
];

const MODES: { id: ViewMode; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "wireframe", label: "Wireframe" },
  { id: "exploded", label: "Exploded" },
  { id: "section", label: "Cross-section" },
];

function Index() {
  const timeline = useSectionProgress<HTMLDivElement>();
  const city = useSectionProgress<HTMLDivElement>();
  const legacy = useSectionProgress<HTMLDivElement>();
  const [product, setProduct] = useState<ProductId>("tmt");
  const [mode, setMode] = useState<ViewMode>("solid");
  const active = PRODUCTS[product];

  return (
    <main className="bg-background text-foreground relative">
      {/* Hero */}
      <section id="top" className="relative h-screen w-full overflow-hidden">
        <SceneMount className="absolute inset-0" label="Rendering site">
          <HeroScene />
        </SceneMount>
        <div className="from-background/95 via-background/20 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-24">
          <p className="eyebrow mb-4">Construction materials · Engineering solutions</p>
          <h1 className="max-w-4xl text-5xl leading-[0.92] md:text-8xl">
            Strength you can
            <span className="text-ember-gradient"> build a skyline on</span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base md:text-lg">
            TMT bars, structural steel and column systems engineered for towers that outlive the
            people who commission them.
          </p>
        </div>
        <div className="text-muted-foreground absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </div>
      </section>

      {/* Timeline */}
      <section id="build" ref={timeline.ref} className="relative h-[560vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Preparing site">
            <TimelineScene progress={timeline.progress} />
          </SceneMount>
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12">
            <div>
              <p className="eyebrow">Experience 02</p>
              <h2 className="mt-3 max-w-md text-3xl md:text-5xl">Ground to skyline, in one scroll</h2>
            </div>
            <div className="grid max-w-4xl grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              {STAGES.map((s) => (
                <div key={s.n} className="border-border/60 border-t pt-3">
                  <div className="text-ember font-display text-xs font-bold">{s.n}</div>
                  <div className="text-sm font-semibold">{s.t}</div>
                  <div className="text-muted-foreground text-xs">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative px-6 py-24 md:px-12">
        <p className="eyebrow">Experience 03</p>
        <h2 className="mt-3 text-3xl md:text-5xl">The catalogue, in your hands</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="border-border bg-card/50 relative h-[62vh] min-h-105 rounded-sm border">
            <SceneMount className="absolute inset-0" label="Loading model">
              <ProductScene product={product} mode={mode} hotspots={active.hotspots} />
            </SceneMount>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-sm border border-border/70 bg-background/80 p-1 backdrop-blur">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-sm px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors ${
                    mode === m.id
                      ? "bg-ember text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <span className="text-muted-foreground absolute top-3 right-4 text-[10px] tracking-[0.25em] uppercase">
              Drag to orbit
            </span>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PRODUCTS) as ProductId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => setProduct(id)}
                  className={`rounded-sm border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                    product === id
                      ? "border-ember text-ember"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {PRODUCTS[id].name}
                </button>
              ))}
            </div>
            <p className="eyebrow mt-8">{active.tag}</p>
            <h3 className="mt-2 text-2xl md:text-4xl">{active.name}</h3>
            <p className="text-muted-foreground mt-4 max-w-lg">{active.blurb}</p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
              {active.specs.map(([k, v]) => (
                <div key={k} className="bg-card p-4">
                  <dt className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                    {k}
                  </dt>
                  <dd className="font-display mt-1 text-lg font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/products"
              className="border-border hover:border-ember hover:text-ember mt-6 inline-flex rounded-sm border px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
            >
              Open the showroom
            </Link>
          </div>
        </div>
      </section>

      {/* About the company */}
      <AboutCompany />

      {/* City */}
      <section id="city" ref={city.ref} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Launching drone">
            <CityScene progress={city.progress} />
          </SceneMount>
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12">
            <div>
              <p className="eyebrow">Experience 04</p>
              <h2 className="mt-3 max-w-lg text-3xl md:text-5xl">
                A city is a material decision, repeated
              </h2>
            </div>
            <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
              {SECTORS.map((s) => (
                <div key={s.t} className="border-border/60 border-t pt-3">
                  <div className="text-sm font-semibold">{s.t}</div>
                  <div className="text-muted-foreground text-xs">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section id="legacy" ref={legacy.ref} className="relative h-[380vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Assembling archive">
            <LegacyScene progress={legacy.progress} milestones={MILESTONES} />
          </SceneMount>
          <div className="pointer-events-none absolute inset-x-0 top-0 p-6 md:p-12">
            <p className="eyebrow">Experience 05</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-5xl">Three decades, drawn to scale</h2>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 p-6 md:grid-cols-4 md:p-12">
            {[
              ["1.4M t", "Annual capacity"],
              ["2,800+", "Projects delivered"],
              ["ISO 9001", "Quality certified"],
              ["18", "States served"],
            ].map(([v, k]) => (
              <div key={k} className="border-border/60 border-t pt-3">
                <div className="font-display text-2xl font-extrabold md:text-3xl">{v}</div>
                <div className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                  {k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 py-24 md:px-12">
        <p className="eyebrow">Continue the journey</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {[
            { to: "/about" as const, t: "Our story", d: "Three decades, rendered as a walkable timeline." },
            { to: "/gallery" as const, t: "Projects", d: "Drone fly-throughs and before/after builds." },
            { to: "/blog" as const, t: "Insights", d: "Engineering notes from the mill and the site." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="bg-card hover:bg-secondary/60 group p-8 transition-colors">
              <div className="font-display text-xl font-bold">{c.t}</div>
              <p className="text-muted-foreground mt-2 text-sm">{c.d}</p>
              <span className="text-ember mt-6 inline-block text-[11px] tracking-[0.25em] uppercase">
                Enter →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Latest news */}
      <LatestNews />
    </main>
  );
}