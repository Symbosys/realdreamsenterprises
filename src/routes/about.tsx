import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { SceneMount } from "@/components/SceneMount";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { Glass, PageHero, SectionHeading, Counter } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { CERTIFICATIONS, LEADERSHIP, MILESTONES, STATS } from "@/data/site";

const HeadquartersScene = lazy(() => import("@/components/three/HeadquartersScene"));
const LegacyScene = lazy(() => import("@/components/three/LegacyScene"));
const WarehouseScene = lazy(() => import("@/components/three/WarehouseScene"));
const BlueprintScene = lazy(() => import("@/components/three/BlueprintScene"));

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Stambh Steel — Three Decades of Engineered Strength" },
      {
        name: "description",
        content:
          "An immersive documentary of Stambh Steel: founding yard to rolling mill, national distribution and green steel — told through interactive 3D storytelling.",
      },
      { property: "og:title", content: "About Stambh Steel — Three Decades of Engineered Strength" },
      {
        property: "og:description",
        content: "Walk our journey in 3D: headquarters, mill, warehouses and certifications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const ZONES = [
  { t: "Steel storage", d: "Racked by grade, diameter and heat number." },
  { t: "Loading docks", d: "Six bays sequenced against pour schedules." },
  { t: "Inventory control", d: "Barcode-tagged bundles, live stock visibility." },
  { t: "Delivery fleet", d: "Owned trailers with GPS to gate." },
  { t: "Product stacking", d: "Sleepered stacks that protect specification." },
  { t: "Crane operations", d: "Overhead gantries handling 12-tonne picks." },
];

function AboutPage() {
  const legacy = useSectionProgress<HTMLDivElement>();
  const warehouse = useSectionProgress<HTMLDivElement>();
  const [zone, setZone] = useState(0);

  return (
    <main className="bg-background text-foreground relative">
      <PageHero
        eyebrow="About · Since 1994"
        title={
          <>
            A company built the same way we ask you to
            <span className="text-ember-gradient"> build</span>
          </>
        }
        lead="One weighbridge became a rolling mill, then a national distribution network. The method never changed: measure everything, promise only what the metallurgy supports."
        scene={
          <SceneMount className="absolute inset-0" label="Raising headquarters">
            <HeadquartersScene />
          </SceneMount>
        }
      />

      {/* Journey */}
      <section ref={legacy.ref} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Assembling archive">
            <LegacyScene
              progress={legacy.progress}
              milestones={MILESTONES.map((m) => ({ year: m.year, label: m.label }))}
            />
          </SceneMount>
          <div className="pointer-events-none absolute inset-x-0 top-0 p-6 pt-24 md:p-12 md:pt-28">
            <p className="eyebrow">Company journey</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-5xl">Scroll through thirty-two years</h2>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 p-6 md:grid-cols-4 md:p-12">
            {STATS.map((s) => (
              <div key={s.label} className="border-border/60 border-t pt-3">
                <Counter value={s.value} className="font-display text-2xl font-extrabold md:text-3xl" />
                <div className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <SectionHeading eyebrow="Milestones" title="Every step, with a date on it" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.04} className="bg-card p-7">
              <div className="text-ember font-display text-xs font-bold tracking-[0.25em]">
                {m.year}
              </div>
              <div className="mt-2 text-lg font-semibold">{m.label}</div>
              <p className="text-muted-foreground mt-2 text-sm">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision & mission */}
      <section className="relative h-[130vh] w-full overflow-hidden">
        <SceneMount className="absolute inset-0" label="Drafting">
          <BlueprintScene />
        </SceneMount>
        <div className="from-background/90 via-background/40 to-background/90 absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="grid w-full gap-6 md:grid-cols-2">
            {[
              {
                t: "Vision",
                d: "To make certified, low-carbon structural steel the default choice on every serious project in the country — not the premium option.",
              },
              {
                t: "Mission",
                d: "Supply material with traceable metallurgy, engineering support at the design stage, and delivery windows a site manager can actually plan around.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <Glass className="p-8 md:p-10">
                  <p className="eyebrow">{c.t}</p>
                  <p className="mt-4 text-xl leading-snug md:text-2xl">{c.d}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-24 md:px-12">
        <SectionHeading eyebrow="Leadership" title="The people who sign the certificates" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <Glass className="group h-full p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="from-steel/30 to-ember/20 mb-6 h-24 w-24 rounded-sm bg-gradient-to-br" />
                <div className="font-display text-lg font-bold">{p.name}</div>
                <div className="text-ember text-[11px] tracking-[0.2em] uppercase">{p.role}</div>
                <p className="text-muted-foreground mt-3 text-sm">{p.note}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Infrastructure explorer */}
      <section ref={warehouse.ref} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneMount className="absolute inset-0" label="Opening the warehouse">
            <WarehouseScene progress={warehouse.progress} />
          </SceneMount>
          <div className="from-background/85 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <div className="max-w-sm">
              <p className="eyebrow">Infrastructure</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Inside the yard</h2>
              <div className="mt-6 flex flex-col gap-1">
                {ZONES.map((z, i) => (
                  <button
                    key={z.t}
                    onMouseEnter={() => setZone(i)}
                    onFocus={() => setZone(i)}
                    className={`border-border/50 border-b py-3 text-left transition-colors ${
                      zone === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm font-semibold tracking-[0.12em] uppercase">{z.t}</span>
                    {zone === i ? (
                      <span className="text-muted-foreground mt-1 block text-xs normal-case">
                        {z.d}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 py-24 md:px-12">
        <SectionHeading
          eyebrow="Certifications"
          title="Paperwork that survives an audit"
          lead="Every dispatch carries traceable documentation from heat number to gate pass."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.05}>
              <Glass className="hover:border-ember/60 flex items-center justify-between p-6 transition-colors">
                <div>
                  <div className="font-display text-xl font-bold">{c.code}</div>
                  <div className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                    {c.body}
                  </div>
                </div>
                <span className="bg-ember/70 h-10 w-px" />
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
