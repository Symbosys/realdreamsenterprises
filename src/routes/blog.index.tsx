import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useMemo, useState } from "react";
import { SceneMount } from "@/components/SceneMount";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/data/site";

const BlueprintScene = lazy(() => import("@/components/three/BlueprintScene"));

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Steel Engineering Knowledge Hub | Real Dreams Enterprises" },
      { name: "description", content: "Field notes on metallurgy, structural detailing, sustainability and site practice from the Real Dreams Enterprises engineering team." },
      { property: "og:title", content: "Insights — Steel Engineering Knowledge Hub" },
      { property: "og:description", content: "Metallurgy, detailing and site practice, written by engineers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

const CATS = ["All", "Materials", "Structures", "Sustainability", "Site Practice"] as const;

function BlogIndex() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const posts = useMemo(() => POSTS.filter((p) => cat === "All" || p.category === cat), [cat]);
  const [featured, ...rest] = posts;

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Insights · Knowledge hub"
        title={<>Engineering notes, <span className="text-ember-gradient">not marketing</span></>}
        lead="Written by the metallurgists and structural engineers who answer the phone when a site has a question."
        height="h-[72vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Drafting">
            <BlueprintScene />
          </SceneMount>
        }
      />

      <section className="px-6 py-20 md:px-12">
        <div className="flex flex-wrap gap-3">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-sm border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                cat === c ? "border-ember text-ember" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured ? (
          <Reveal className="mt-10">
            <Link to="/blog/$slug" params={{ slug: featured.slug }}>
              <Glass className="hover:border-ember/60 grid gap-8 p-8 transition-colors md:grid-cols-[1.4fr_1fr] md:p-12">
                <div>
                  <p className="eyebrow">Featured · {featured.category}</p>
                  <h2 className="mt-4 text-3xl md:text-5xl">{featured.title}</h2>
                  <p className="text-muted-foreground mt-4 max-w-xl">{featured.excerpt}</p>
                </div>
                <div className="text-muted-foreground self-end text-[11px] tracking-[0.2em] uppercase">
                  {featured.author} · {featured.readMinutes} min read
                </div>
              </Glass>
            </Link>
          </Reveal>
        ) : null}

        <SectionHeading eyebrow="Archive" title="All articles" className="mt-20" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                <Glass className="hover:border-ember/60 flex h-full flex-col p-7 transition-colors">
                  <p className="eyebrow">{p.category}</p>
                  <h3 className="mt-3 text-xl">{p.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{p.excerpt}</p>
                  <span className="text-muted-foreground mt-auto pt-6 text-[10px] tracking-[0.22em] uppercase">
                    {p.readMinutes} min · {p.date}
                  </span>
                </Glass>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
