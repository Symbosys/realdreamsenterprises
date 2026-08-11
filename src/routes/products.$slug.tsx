import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Glass, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS, type Product } from "@/data/site";
import { ShieldCheck, Zap, Flame, Award, Link2, Sparkles, Percent, CheckCircle2, Factory, FileCheck } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Real Dreams Enterprises" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.grade} | Government Authorized Rashmi TMT Bar`;
    return {
      meta: [
        { title },
        { name: "description", content: product.blurb.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.blurb.slice(0, 155) },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
});

const RASHMI_ADVANTAGES = [
  {
    title: "Earthquake Resistant",
    desc: "The Thermo Mechanical Treatment attributes higher elongation (Fe 500D / 550 EQCR) to Rashmi TMT Bars, providing high UTS/YS ratio for superior seismic safety in earthquake prone areas.",
    icon: Zap,
    badge: "Seismic Grade",
  },
  {
    title: "Corrosion Resistant",
    desc: "Forming a hard Ferric Oxide skin on the cooling bed combined with low carbon chemistry prevents coarse carbide formation, ensuring long-term resistance to atmospheric moisture & corrosion.",
    icon: ShieldCheck,
    badge: "CRS Protection",
  },
  {
    title: "Fire Resistant",
    desc: "Specially manufactured to tolerate extreme thermal stress up to 600°C without loss of structural integrity, superior to ordinary CTD and TOR steel bars.",
    icon: Flame,
    badge: "Heat Proof (600°C)",
  },
  {
    title: "Extra Strength & Ductility",
    desc: "A tough tempered martensite outer surface paired with a fine grain ferrite-pearlite core delivers unmatched tensile yield load capability and elongation.",
    icon: Award,
    badge: "IS 1786:2008",
  },
  {
    title: "Super Bondability",
    desc: "Deep precision ribbed profile strongly bonds with surrounding concrete, preventing slip and adding maximum firmness to beams, columns, and slabs.",
    icon: Link2,
    badge: "Concrete Grip",
  },
  {
    title: "Higher Weldability",
    desc: "Formulated with ultra-low carbon raw materials, allowing seamless high-strength site welding without requiring pre-heating or special electrodes.",
    icon: Sparkles,
    badge: "Low Carbon",
  },
  {
    title: "15% Steel Savings",
    desc: "Strict sectional weight tolerance control allows Rashmi TMT Bars to save approx 15% in total steel tonnage consumption compared to conventional rebar.",
    icon: Percent,
    badge: "Maximum Economy",
  },
];

const RASHMI_GRADES = [
  { grade: "Rashmi TMT Fe 415", note: "Standard ductility for residential slabs" },
  { grade: "Rashmi TMT Fe 415D", note: "Enhanced elongation for light framing" },
  { grade: "Rashmi TMT Fe 500", note: "High yield strength for commercial columns" },
  { grade: "Rashmi TMT Fe 500D", note: "Superior seismic resistance & bendability" },
  { grade: "Rashmi TMT Fe 550 EQCR", note: "Maximum UTS/YS seismic & corrosion protection" },
];

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };

  return (
    <main className="bg-background text-foreground">
      <section className="grid gap-0 pt-24 lg:grid-cols-[1.1fr_1fr] bg-background">
        <div className="relative h-[65vh] min-h-100 p-4 flex items-center justify-center bg-card/40 border-b lg:border-b-0 lg:border-r border-border/60">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-background/50 flex items-center justify-center p-6 border border-border/70 group">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {product.hotspots.map((h) => (
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
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="border-ember/40 bg-ember/10 text-ember rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              100% Government Authorized
            </span>
            <span className="border-border bg-card text-muted-foreground rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              SOR Letter Certified
            </span>
          </div>
          <p className="eyebrow text-ember">{product.category} · {product.stock}</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold">{product.name}</h1>
          <p className="text-muted-foreground mt-5 max-w-lg text-sm md:text-base leading-relaxed">{product.blurb}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {product.specs.map(([k, v]) => (
              <div key={k} className="bg-card p-4">
                <dt className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-bold">{k}</dt>
                <dd className="font-display mt-1 text-base md:text-lg font-bold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="bg-ember text-primary-foreground rounded-md px-6 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase transition-all hover:scale-105 shadow-md">
              Request a quote
            </Link>
            <Link to="/products" className="border-border hover:border-ember hover:text-ember rounded-md border px-6 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors">
              All products
            </Link>
          </div>
        </div>
      </section>

      {/* Government Authorization & Rashmi Metaliks Mill Profile Section */}
      <section className="relative py-20 px-6 md:px-12 bg-card/30 border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-ember/30 bg-card/80 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-bold text-ember uppercase tracking-widest">
                  <FileCheck className="h-4 w-4" /> Government Authorized & Public Sector Approved
                </div>
                <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                  Rashmi Group TMT Steel — <span className="text-ember-gradient">1.7 Million MTPA Capacity</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Rashmi Metaliks is one of India's premier Pig Iron & Steel manufacturers with a capacity of 1.7 million MT per annum. Featuring an integrated DRI (Direct Reduced Iron) plant, Steel Melting Shop, and state-of-the-art rolling mill with 1.18 MTPA TMT capacity, Rashmi TMT Bars are widely specified by government agencies, civil contractors, PWD, CPWD, NHAI, Railways, and real estate developers for critical flyovers, dams, and bridges.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                  <div className="border border-border/60 bg-background/60 rounded-lg p-3">
                    <span className="text-ember font-bold text-xs uppercase block">Mill Standard</span>
                    <span className="font-display font-extrabold text-sm">IS 1786:2008</span>
                  </div>
                  <div className="border border-border/60 bg-background/60 rounded-lg p-3">
                    <span className="text-ember font-bold text-xs uppercase block">Jharkhand Supply</span>
                    <span className="font-display font-extrabold text-sm">All 24 Districts</span>
                  </div>
                  <div className="border border-border/60 bg-background/60 rounded-lg p-3 col-span-2 sm:col-span-1">
                    <span className="text-ember font-bold text-xs uppercase block">Pricing</span>
                    <span className="font-display font-extrabold text-sm">Most Affordable</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 border-l border-border/60 pl-0 lg:pl-8 space-y-4">
                <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Factory className="h-4 w-4 text-ember" /> Available Rashmi Grades
                </h3>
                <div className="space-y-2">
                  {RASHMI_GRADES.map((g) => (
                    <div key={g.grade} className="border border-border/70 bg-background/80 rounded-lg p-3 transition-colors hover:border-ember/50">
                      <div className="font-display text-xs font-extrabold text-foreground">{g.grade}</div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">{g.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Core Advantages of Rashmi TMT Bars */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Key Product Advantages"
            title="Why Rashmi TMT Bars are the Best Choice"
            lead="Thermo-mechanically treated to provide higher yield load, elongation, and structural safety without compromising quality."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RASHMI_ADVANTAGES.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 0.05}>
                <Glass className="group h-full p-8 transition-all duration-300 hover:border-ember/60 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="border-ember/30 bg-ember/10 flex h-12 w-12 items-center justify-center rounded-lg text-ember">
                      <adv.icon className="h-6 w-6" />
                    </div>
                    <span className="border-border/80 bg-background/80 text-foreground rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {adv.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mt-6 text-foreground group-hover:text-ember transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing process */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="eyebrow text-ember">Manufacturing process</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-5xl font-display font-extrabold tracking-tight">
              From billet to bundle
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-sm md:text-base">
              Controlled quenching, thermal treatment, and mechanical testing at every rolling pass.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.process.map((s) => (
              <div
                key={s.step}
                className="border-border/70 bg-card/40 hover:border-ember/50 hover:bg-card/70 relative rounded-xl border p-6 transition-all duration-300 backdrop-blur-md"
              >
                <div className="font-display text-xs font-bold tracking-[0.18em] uppercase text-ember">
                  {s.step}
                </div>
                <p className="text-foreground font-semibold mt-3 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Applications" title="Where this steel earns its place" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {product.applications.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <Glass className="h-full p-7">
                  <h3 className="text-xl font-display font-bold">{a.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{a.body}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="px-6 pb-28 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Related MM Sizes" title="Other Rashmi TMT Bar Diameters" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="bg-card hover:bg-secondary/60 rounded-xl border border-border p-6 transition-colors">
                <div className="font-display text-lg font-bold">{p.name}</div>
                <p className="text-muted-foreground mt-1 text-sm">{p.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

