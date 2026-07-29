import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useMemo, useState } from "react";
import { SceneMount } from "@/components/SceneMount";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { HIRING_STEPS, JOBS } from "@/data/site";

const HeadquartersScene = lazy(() => import("@/components/three/HeadquartersScene"));

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Stambh Steel — Engineering, Quality and Logistics Roles" },
      { name: "description", content: "Open roles in metallurgy, structural design, logistics and sustainability at Stambh Steel, with a hiring process that respects your time." },
      { property: "og:title", content: "Careers at Stambh Steel" },
      { property: "og:description", content: "Build the infrastructure people rely on. See open roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [dept, setDept] = useState("All");
  const depts = useMemo(() => ["All", ...new Set(JOBS.map((j) => j.dept))], []);
  const jobs = useMemo(() => JOBS.filter((j) => dept === "All" || j.dept === dept), [dept]);

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Careers · We are hiring"
        title={<>Work where the <span className="text-ember-gradient">tolerances</span> matter</>}
        lead="Six open roles across the mill, the yard and the design office."
        height="h-[72vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Raising headquarters">
            <HeadquartersScene />
          </SceneMount>
        }
      />

      <section className="px-6 py-20 md:px-12">
        <SectionHeading eyebrow="Open roles" title="Find your bench" />
        <div className="mt-8 flex flex-wrap gap-3">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-sm border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                dept === d ? "border-ember text-ember" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="mt-10 divide-border divide-y border-border overflow-hidden rounded-sm border">
          {jobs.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.04}>
              <div className="bg-card hover:bg-secondary/50 flex flex-wrap items-center justify-between gap-4 p-6 transition-colors">
                <div>
                  <div className="font-display text-lg font-bold">{j.title}</div>
                  <div className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                    {j.dept} · {j.place} · {j.type}
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="border-border hover:border-ember hover:text-ember rounded-sm border px-5 py-2 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors"
                >
                  Apply
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <SectionHeading eyebrow="Process" title="Five steps, no theatre" />
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {HIRING_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <Glass className="h-full p-6">
                <div className="text-ember font-display text-xs font-bold tracking-[0.3em]">
                  0{i + 1}
                </div>
                <div className="mt-2 text-lg font-semibold">{s.step}</div>
                <p className="text-muted-foreground mt-2 text-sm">{s.body}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
