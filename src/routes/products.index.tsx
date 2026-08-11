import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS } from "@/data/site";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Rashmi TMT Bars MM Sizes (8mm to 32mm) — Authorized Jharkhand Catalogue" },
      {
        name: "description",
        content:
          "Official catalogue of Rashmi TMT Bars across all MM sizes (8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm). Government authorized & SOR certified.",
      },
      { property: "og:title", content: "Rashmi TMT Bars MM Sizes (8mm to 32mm) — Authorized Jharkhand Catalogue" },
      {
        property: "og:description",
        content: "Inspect mill specifications, weights per metre, and IS 1786 test certificates for all Rashmi TMT bar sizes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES = ["All", "Light MM (8-10mm)", "Medium MM (12-16mm)", "Heavy MM (20-32mm)"] as const;

function ProductsPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [carousel, setCarousel] = useState(0);
  const [compare, setCompare] = useState<[number, number]>([2, 3]);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (p.name + p.tag + p.blurb + p.grade).toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  const spotlight = PRODUCTS[carousel] || PRODUCTS[0];
  const [a, b] = compare;

  return (
    <main className="bg-background text-foreground relative">
      <div>
        <PageHero
          eyebrow="Rashmi TMT Bars · MM Diameter Catalogue"
          title={
            <>
              Rashmi TMT Bars —
              <span className="text-ember-gradient"> All MM Sizes (8mm to 32mm)</span>
            </>
          }
          lead="Official catalogue of Rashmi TMT Bars across all standard MM diameter sizes — 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm. 100% government-authorized, SOR certified, and supplied across all 24 districts of Jharkhand."
          scene={
            <div className="absolute inset-0">
              <img
                src="/images/tmt_steel_manufacturing.png"
                alt="Steel Warehouse Plant"
                className="h-full w-full object-cover opacity-25 scale-102 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-background/40 to-background" />
            </div>
          }
        />
      </div>

      {/* Explorer */}
      <section className="px-6 py-20 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Explorer" title="Filter, search, specify" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-md border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 ${
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
              className="border-border bg-card/50 focus:border-ember focus:ring-1 focus:ring-ember ml-auto w-full max-w-xs rounded-md border px-4 py-2 text-sm outline-none transition-all"
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
                  <div className="border-border/70 bg-card/70 hover:border-ember/60 hover:shadow-[0_16px_36px_-10px_rgba(235,94,40,0.22)] relative flex h-full flex-col overflow-hidden rounded-xl border p-5 backdrop-blur-xl transition-all duration-300">
                    {/* Image Container with Badges */}
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted/40">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="from-background/90 via-background/20 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent opacity-85 transition-opacity group-hover:opacity-60" />

                      {/* Category badge top-left */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="border-border/80 bg-background/85 text-foreground shadow-xs rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                          {p.category}
                        </span>
                      </div>

                      {/* Stock status badge top-right */}
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md ${
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
                          <span className="border-ember/40 text-ember bg-ember/10 font-mono rounded-md border px-1.5 py-0.5 text-[11px] font-semibold">
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
                          className="group/btn border-border/80 hover:border-ember bg-secondary/40 hover:bg-ember hover:text-primary-foreground mt-4 flex w-full items-center justify-center gap-2 rounded-md border py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                        >
                          <span>View Specifications</span>
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
        </div>
      </section>

      {/* Showroom Showcase */}
      <section className="px-6 pb-20 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Product Showcase" title="Featured product specifications" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] items-center">
            <div className="border-border bg-card/60 relative h-[55vh] min-h-100 rounded-xl border p-4 shadow-xl overflow-hidden backdrop-blur-md group">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-background/50 flex items-center justify-center">
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {spotlight.hotspots.map((h) => (
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
                Certified Steel Specification
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <p className="eyebrow text-ember">{spotlight.tag}</p>
              <h3 className="mt-2 text-3xl md:text-4xl font-display font-bold">{spotlight.name}</h3>
              <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">{spotlight.blurb}</p>
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
                className="bg-ember text-primary-foreground mt-8 inline-flex w-fit rounded-md px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-all hover:scale-105"
              >
                Full technical view
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 pb-28 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Compare"
            title="Two products, side-by-side comparison"
            lead="Compare technical specifications, dimensions, and structural properties to specify the ideal steel grade."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {[a, b].map((idx, side) => {
              const p = PRODUCTS[idx];
              return (
                <div key={side} className="bg-card p-6">
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-background/60 mb-6 border border-border/70 p-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
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
                      className="border-border bg-background w-full rounded-md border px-3 py-2.5 text-xs font-bold tracking-[0.16em] uppercase outline-none focus:border-ember"
                    >
                      {PRODUCTS.map((op, i) => (
                        <option key={op.slug} value={i}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                    <dl className="mt-6 space-y-3 text-sm">
                      {p.specs.map(([k, v]) => (
                        <div key={k} className="border-border/60 flex justify-between border-b pb-2">
                          <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase font-bold">
                            {k}
                          </dt>
                          <dd className="font-semibold text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

