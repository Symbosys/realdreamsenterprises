import { createFileRoute } from "@tanstack/react-router";
import { lazy, useMemo, useState } from "react";
import { motion } from "motion/react";
import { SceneMount } from "@/components/SceneMount";
import { PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { GALLERY, GALLERY_SECTORS } from "@/data/site";

const CityScene = lazy(() => import("@/components/three/CityScene"));

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Towers, Flyovers and Depots | Stambh Steel" },
      { name: "description", content: "A visual index of structures built with Stambh Steel: commercial towers, metro viaducts, industrial depots and residential frames across India." },
      { property: "og:title", content: "Project Gallery — Stambh Steel" },
      { property: "og:description", content: "Browse the structures our steel holds up." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [sector, setSector] = useState("All");
  const items = useMemo(
    () => GALLERY.filter((g) => sector === "All" || g.sector === sector),
    [sector],
  );

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Gallery · Built work"
        title={<>Steel you can <span className="text-ember-gradient">stand on</span></>}
        lead="Every project below shipped with traceable metallurgy and a delivery schedule that held."
        height="h-[70vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Building the skyline">
            <CityScene progress={{ current: 0.6 }} />
          </SceneMount>
        }
      />

      <section className="px-6 py-20 md:px-12">
        <SectionHeading eyebrow="Index" title="Filter by sector" />
        <div className="mt-8 flex flex-wrap gap-3">
          {GALLERY_SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-sm border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                sector === s ? "border-ember text-ember" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal
              key={g.title}
              delay={i * 0.04}
              className={`${g.span === "tall" ? "row-span-2" : ""} ${g.span === "wide" ? "col-span-2" : ""}`}
            >
              <motion.figure
                whileHover={{ scale: 1.015 }}
                className="border-border from-steel/25 via-card to-ember/10 group relative h-full overflow-hidden rounded-sm border bg-gradient-to-br"
              >
                <figcaption className="from-background/95 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-5">
                  <div className="font-display text-lg font-bold">{g.title}</div>
                  <div className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">
                    {g.sector} · {g.city}
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
