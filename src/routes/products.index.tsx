import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Box, ShieldCheck } from "lucide-react";
import { SceneMount } from "@/components/SceneMount";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS } from "@/data/site";
import type { ProductId, ViewMode } from "@/components/three/ProductScene";

const WarehouseScene = lazy(() => import("@/components/three/WarehouseScene"));
const ProductScene = lazy(() => import("@/components/three/ProductScene"));

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Steel Products — Interactive 3D Showroom | Stambh Steel" },
      {
        name: "description",
        content:
          "Explore TMT bars, structural sections, bright steel rods and the Stambh column system in an interactive 3D showroom with live specifications.",
      },
      { property: "og:title", content: "Steel Products — Interactive 3D Showroom" },
      {
        property: "og:description",
        content: "Rotate, explode and cross-section every product before you specify it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES = ["All", "Reinforcement", "Sections", "Systems", "Bright Steel"] as const;
const MODES: { id: ViewMode; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "wireframe", label: "Wireframe" },
  { id: "exploded", label: "Exploded" },
  { id: "section", label: "Cross-section" },
];

function ProductsPage() {
  const hero = useSectionProgress<HTMLDivElement>();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [carousel, setCarousel] = useState(0);
  const [compare, setCompare] = useState<[number, number]>([0, 3]);
  const [mode, setMode] = useState<ViewMode>("solid");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (p.name + p.tag + p.blurb).toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  const spotlight = PRODUCTS[carousel];
  const [a, b] = compare;

  return (
    <main className="bg-background text-foreground relative">
      <div ref={hero.ref}>
        <PageHero
          eyebrow="Products · Digital showroom"
          title={
            <>
              Walk the yard.
              <span className="text-ember-gradient"> Inspect the steel.</span>
            </>
          }
          lead="Every product here is a live 3D model, not a photograph. Rotate it, take it apart, slice it open, then request exactly the grade you need."
          scene={
            <SceneMount className="absolute inset-0" label="Opening the warehouse">
              <WarehouseScene progress={hero.progress} />
            </SceneMount>
          }
        />
      </div>

      {/* Explorer */}
      <section className="px-6 py-20 md:px-12">
        <SectionHeading eyebrow="Explorer" title="Filter, search, specify" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-xs border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 ${
                category === c
                  ? "border-ember text-ember bg-ember/10 shadow-[0_0_15px_rgba(235,94,40,0.15)]"
                  : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="border-border bg-card/50 focus:border-ember focus:ring-1 focus:ring-ember ml-auto w-full max-w-xs rounded-xs border px-4 py-2 text-sm outline-none transition-all"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group h-full"
              >
                <div className="border-border/70 bg-card/70 hover:border-ember/60 hover:shadow-[0_16px_36px_-10px_rgba(235,94,40,0.22)] relative flex h-full flex-col overflow-hidden rounded-md border p-5 backdrop-blur-xl transition-all duration-300">
                  {/* Image Container with Badges */}
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs bg-muted/40">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="from-background/90 via-background/20 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent opacity-85 transition-opacity group-hover:opacity-60" />

                    {/* Category badge top-left */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="border-border/80 bg-background/85 text-foreground shadow-xs rounded-xs border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                        {p.category}
                      </span>
                    </div>

                    {/* Stock status badge top-right */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md ${
                          p.stock === "In stock"
                            ? "border-emerald-500/40 bg-emerald-950/70 text-emerald-400"
                            : p.stock === "Limited"
                            ? "border-amber-500/40 bg-amber-950/70 text-amber-400"
                            : "border-ember/40 bg-ember/15 text-ember"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.stock === "In stock"
                              ? "bg-emerald-400 animate-pulse"
                              : p.stock === "Limited"
                              ? "bg-amber-400"
                              : "bg-ember"
                          }`}
                        />
                        {p.stock}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display group-hover:text-ember text-xl font-bold transition-colors">
                          {p.name}
                        </h3>
                        <span className="border-ember/40 text-ember bg-ember/10 font-mono rounded-xs border px-1.5 py-0.5 text-[11px] font-semibold">
                          {p.grade}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">{p.tag}</p>
                      <p className="text-muted-foreground/90 mt-2.5 line-clamp-2 text-xs leading-relaxed">
                        {p.blurb}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-border/60 pt-4">
                      {/* Quality meter */}
                      <div className="flex items-center justify-between text-[10px] tracking-wider uppercase">
                        <span className="text-muted-foreground font-medium flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-ember" />
                          Quality Index
                        </span>
                        <span className="text-ember font-bold">{p.quality}%</span>
                      </div>
                      <div className="bg-secondary/60 mt-1.5 h-1.5 w-full overflow-hidden rounded-full p-0.5">
                        <motion.div
                          className="bg-ember h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.quality}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      {/* Action Link */}
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        className="group/btn border-border/80 hover:border-ember bg-secondary/40 hover:bg-ember hover:text-primary-foreground mt-4 flex w-full items-center justify-center gap-2 rounded-xs border py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                      >
                        <span>Inspect in 3D</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm">No products match that search.</p>
          ) : null}
        </div>
      </section>

      {/* 3D carousel */}
      <section className="px-6 pb-20 md:px-12">
        <SectionHeading eyebrow="Rotating platform" title="The showroom turntable" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="border-border bg-card/40 relative h-[58vh] min-h-100 rounded-sm border">
            <SceneMount className="absolute inset-0" label="Loading model">
              <ProductScene
                product={spotlight.scene as ProductId}
                mode={mode}
                hotspots={spotlight.hotspots}
              />
            </SceneMount>
            <div className="border-border/70 bg-background/80 absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-sm border p-1 backdrop-blur">
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
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{spotlight.tag}</p>
            <h3 className="mt-2 text-3xl md:text-4xl">{spotlight.name}</h3>
            <p className="text-muted-foreground mt-4 max-w-lg">{spotlight.blurb}</p>
            <div className="mt-8 flex gap-2">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setCarousel(i)}
                  aria-label={`Show ${p.name}`}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    carousel === i ? "bg-ember" : "bg-border hover:bg-steel/60"
                  }`}
                />
              ))}
            </div>
            <Link
              to="/products/$slug"
              params={{ slug: spotlight.slug }}
              className="bg-ember text-primary-foreground mt-8 inline-flex w-fit rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-transform hover:scale-[1.03]"
            >
              Full technical view
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 pb-28 md:px-12">
        <SectionHeading
          eyebrow="Compare"
          title="Two products, one synchronised viewer"
          lead="Both models share rotation and lighting so differences in profile are honest."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
          {[a, b].map((idx, side) => {
            const p = PRODUCTS[idx];
            return (
              <div key={side} className="bg-card">
                <div className="relative h-[42vh] min-h-75">
                  <SceneMount className="absolute inset-0" label="Loading model">
                    <ProductScene
                      product={p.scene as ProductId}
                      mode="solid"
                      hotspots={p.hotspots}
                    />
                  </SceneMount>
                </div>
                <div className="p-6">
                  <select
                    value={idx}
                    onChange={(e) =>
                      setCompare((prev) => {
                        const next: [number, number] = [...prev] as [number, number];
                        next[side] = Number(e.target.value);
                        return next;
                      })
                    }
                    aria-label={`Compare slot ${side + 1}`}
                    className="border-border bg-background w-full rounded-sm border px-3 py-2 text-xs tracking-[0.16em] uppercase"
                  >
                    {PRODUCTS.map((op, i) => (
                      <option key={op.slug} value={i}>
                        {op.name}
                      </option>
                    ))}
                  </select>
                  <dl className="mt-4 space-y-2 text-sm">
                    {p.specs.map(([k, v]) => (
                      <div key={k} className="border-border/60 flex justify-between border-b pb-2">
                        <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
                          {k}
                        </dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
