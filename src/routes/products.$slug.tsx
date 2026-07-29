import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { SceneMount } from "@/components/SceneMount";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { Glass, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS, type Product } from "@/data/site";
import type { ProductId, ViewMode } from "@/components/three/ProductScene";

const ProductScene = lazy(() => import("@/components/three/ProductScene"));
const FactoryScene = lazy(() => import("@/components/three/FactoryScene"));

const MODES: { id: ViewMode; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "wireframe", label: "Wireframe" },
  { id: "exploded", label: "Exploded" },
  { id: "section", label: "Cross-section" },
];

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Stambh Steel" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.grade} | Stambh Steel`;
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

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const factory = useSectionProgress<HTMLDivElement>();
  const [mode, setMode] = useState<ViewMode>("solid");

  return (
    <main className="bg-background text-foreground">
      <section className="grid gap-0 pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative h-[70vh] min-h-110">
          <SceneMount className="absolute inset-0" label="Loading model">
            <ProductScene product={product.scene as ProductId} mode={mode} hotspots={product.hotspots} />
          </SceneMount>
          <div className="border-border/70 bg-background/80 absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-sm border p-1 backdrop-blur">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`rounded-sm px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors ${
                  mode === m.id ? "bg-ember text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-12">
          <p className="eyebrow">{product.category} · {product.stock}</p>
          <h1 className="mt-3 text-4xl md:text-6xl">{product.name}</h1>
          <p className="text-muted-foreground mt-5 max-w-lg">{product.blurb}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
            {product.specs.map(([k, v]) => (
              <div key={k} className="bg-card p-4">
                <dt className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">{k}</dt>
                <dd className="font-display mt-1 text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="bg-ember text-primary-foreground rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-transform hover:scale-[1.03]">
              Request a quote
            </Link>
            <Link to="/products" className="border-border hover:border-ember hover:text-ember rounded-sm border px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors">
              All products
            </Link>
          </div>
        </div>
      </section>

      <section ref={factory.ref} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Firing the mill">
            <FactoryScene progress={factory.progress} stages={product.process.map((s) => s.step)} />
          </SceneMount>
          <div className="pointer-events-none absolute inset-x-0 top-0 p-6 pt-24 md:p-12 md:pt-28">
            <p className="eyebrow">Manufacturing process</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-5xl">From billet to bundle</h2>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 grid gap-4 p-6 md:grid-cols-4 md:p-12">
            {product.process.map((s) => (
              <div key={s.step} className="border-border/60 border-t pt-3">
                <div className="font-display text-sm font-bold tracking-[0.18em] uppercase">{s.step}</div>
                <p className="text-muted-foreground mt-1 text-xs">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <SectionHeading eyebrow="Applications" title="Where this steel earns its place" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {product.applications.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <Glass className="h-full p-7">
                <h3 className="text-xl">{a.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{a.body}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <SectionHeading eyebrow="Related" title="Other products" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="bg-card hover:bg-secondary/60 rounded-sm border border-border p-6 transition-colors">
              <div className="font-display text-lg font-bold">{p.name}</div>
              <p className="text-muted-foreground mt-1 text-sm">{p.tag}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
