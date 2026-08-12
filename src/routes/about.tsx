import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Glass, PageHero, SectionHeading, Counter } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { AboutClientsSection } from "@/components/site/AboutClientsSection";
import { GallerySection } from "@/components/site/GallerySection";
import { CERTIFICATIONS, LEADERSHIP, MILESTONES as FALLBACK_MILESTONES, STATS as FALLBACK_STATS } from "@/data/site";
import { useGetWebConfig, parseJsonConfig } from "@/api/webconfig.api";
import { Award, CheckCircle2, ShieldCheck, Truck, FileCheck, BadgePercent } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rashmi TMT & SME-TMT Bars — Exclusive Supplier in Jharkhand" },
      {
        name: "description",
        content:
          "Sole authorized supplier of SME-TMT and Rashmi TMT Bars across all 24 districts of Jharkhand. Government-authorized, SOR letter certified, and most affordable.",
      },
      { property: "og:title", content: "About Rashmi TMT & SME-TMT Bars — Exclusive Supplier in Jharkhand" },
      {
        property: "og:description",
        content: "Government-authorized Rashmi TMT & SME-TMT Bars — most affordable prices across Jharkhand.",
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
  const [zone, setZone] = useState(0);
  const { data: webConfig } = useGetWebConfig();

  const dynamicStats = parseJsonConfig<{ value: string; label: string }[]>(webConfig, "stats", FALLBACK_STATS);
  const dynamicMilestones = parseJsonConfig<{ year: string; label: string; body: string }[]>(webConfig, "milestones.timeline", FALLBACK_MILESTONES);

  return (
    <main className="bg-background text-foreground relative">
      <PageHero
        eyebrow="About · Authorized Supplier Across Jharkhand"
        title={
          <>
            Jharkhand's most affordable
            <span className="text-ember-gradient"> Rashmi TMT Bars</span>
          </>
        }
        lead="We sell government-authorized Rashmi TMT Bars at the most affordable prices across all districts of Jharkhand — fully certified and approved for government, PWD, rail, and major infrastructure projects."
        scene={
          <div className="absolute inset-0">
            <img
              src="/images/tmt_steel_manufacturing.png"
              alt="Stambh Steel Plant Headquarters"
              className="h-full w-full object-cover opacity-30 scale-102 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-background/40 to-background" />
          </div>
        }
      />

      {/* Journey */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ember">Company journey</p>
              <h2 className="mt-3 max-w-lg text-3xl md:text-5xl font-display font-extrabold tracking-tight">
                Scroll through thirty-two years
              </h2>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {dynamicStats.map((s) => (
              <div key={s.label} className="bg-card p-6 md:p-8">
                <Counter value={s.value} className="font-display text-3xl font-extrabold md:text-4xl text-foreground" />
                <div className="text-muted-foreground mt-2 text-[11px] tracking-[0.2em] uppercase font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Milestones" title="Every step, with a date on it" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {dynamicMilestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.04} className="bg-card p-7">
                <div className="text-ember font-display text-xs font-bold tracking-[0.25em]">
                  {m.year}
                </div>
                <div className="mt-2 text-lg font-semibold">{m.label}</div>
                <p className="text-muted-foreground mt-2 text-sm">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-ember/10 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                t: "Vision",
                d: "To provide government-authorized Rashmi TMT bars at the most affordable rates across every district in Jharkhand — making certified steel accessible for all government and private construction.",
              },
              {
                t: "Mission",
                d: "Deliver 100% government-approved, SOR-certified Rashmi TMT bars with guaranteed mill test reports, unbeatable pricing across Jharkhand, and fast site delivery.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <Glass className="p-8 md:p-10">
                  <p className="eyebrow text-ember">{c.t}</p>
                  <p className="mt-4 text-xl leading-snug md:text-2xl font-display font-semibold">{c.d}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive SME-TMT & Rashmi TMT Showcase Section */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ember">Exclusive Jharkhand Distributorship</p>
              <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl font-display font-extrabold tracking-tight">
                Sole Supplier of <span className="text-ember-gradient">SME-TMT & Rashmi TMT Bars</span> in Jharkhand
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
                Real Dreams Enterprises is the exclusive authorized supplier and exporter of SME-TMT & Rashmi TMT Bars across all 24 districts of Jharkhand. Fully verified with Government Schedule of Rates (SOR) approval letters for all PWD, CPWD, Railways, and government infrastructure tenders.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sole Supplier in Jharkhand",
                desc: "We are the only authorized exporter & distributor for SME-TMT and Rashmi TMT Bars supplying all 24 districts of Jharkhand with guaranteed stock.",
                icon: ShieldCheck,
                badge: "100% Exclusive",
              },
              {
                title: "Government Authorized (SOR)",
                desc: "SOR letter certified and approved for all PWD, CPWD, NHAI, Railways, and government tender projects across the state.",
                icon: FileCheck,
                badge: "SOR Letter Verified",
              },
              {
                title: "Most Affordable Mill Rates",
                desc: "Direct mill pricing ensuring contractor & builder cost savings without compromising metallurgical grade or yield strength.",
                icon: BadgePercent,
                badge: "Unbeatable Price",
              },
              {
                title: "Fe 500D / 550D High Yield",
                desc: "German thermo-quenching technology producing a tough martensitic rim with ductile ferrite-pearlite core for superior seismic safety.",
                icon: Award,
                badge: "IS 1786 Certified",
              },
              {
                title: "100% Traceable MTC",
                desc: "Every bundle ships with an authentic Mill Test Certificate (MTC) matching the heat number stamped on the rebar tags.",
                icon: CheckCircle2,
                badge: "Audit Ready",
              },
              {
                title: "24-District Rapid Logistics",
                desc: "Dedicated logistics fleet delivering SME-TMT & Rashmi TMT Bars directly to site gates within 24 to 48 hours across Jharkhand.",
                icon: Truck,
                badge: "24–48h Delivery",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.05}>
                <Glass className="group h-full p-8 transition-all duration-300 hover:border-ember/60 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="border-ember/30 bg-ember/10 flex h-12 w-12 items-center justify-center rounded-lg text-ember">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <span className="border-border/80 bg-background/80 text-foreground rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mt-6 text-foreground group-hover:text-ember transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Leadership" title="The people who sign the certificates" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <Glass className="group h-full p-7 transition-transform duration-500 hover:-translate-y-1">
                  <div className="from-steel/30 to-ember/20 mb-6 h-24 w-24 rounded-sm bg-linear-to-br" />
                  <div className="font-display text-lg font-bold">{p.name}</div>
                  <div className="text-ember text-[11px] tracking-[0.2em] uppercase">{p.role}</div>
                  <p className="text-muted-foreground mt-3 text-sm">{p.note}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure explorer */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow text-ember">Infrastructure</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Inside the yard</h2>
              <div className="mt-6 flex flex-col gap-1">
                {ZONES.map((z, i) => (
                  <button
                    key={z.t}
                    onMouseEnter={() => setZone(i)}
                    onFocus={() => setZone(i)}
                    onClick={() => setZone(i)}
                    className={`border-border/50 border-b py-3.5 text-left transition-colors ${
                      zone === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`text-sm font-bold tracking-[0.12em] uppercase ${zone === i ? "text-ember" : ""}`}>
                      {z.t}
                    </span>
                    {zone === i ? (
                      <span className="text-muted-foreground mt-1 block text-xs normal-case leading-relaxed">
                        {z.d}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-border bg-card/60 relative aspect-16/10 rounded-xl border p-3 shadow-xl overflow-hidden backdrop-blur-md">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-background">
                  <img
                    src="/images/tmt_steel_manufacturing.png"
                    alt="Steel Manufacturing Yard"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-border/80 bg-background/85 p-3 backdrop-blur-md">
                    <div>
                      <span className="text-ember font-display text-xs font-bold uppercase tracking-wider block">
                        Active Infrastructure Zone
                      </span>
                      <span className="font-display text-sm font-bold text-foreground">
                        {ZONES[zone].t}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider border border-border/60 rounded px-2 py-1">
                      Yard Operations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rashmi TMT Corporate Showcase Video */}
      <section className="relative py-8 md:py-12 px-6 md:px-12 bg-background border-t border-border/40 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-5">
            <p className="eyebrow text-ember font-bold text-xs uppercase tracking-widest">
              Corporate Showcase · Rashmi Metaliks
            </p>
            <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              <span className="text-foreground font-black">Watch</span>{" "}
              <span className="text-ember-gradient">Rashmi TMT Manufacturing Excellence</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <video
              src="/video/rashmi.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[50vh] md:max-h-[55vh] object-contain rounded-2xl shadow-xl border border-border/70 bg-black/40"
            />
          </div>
        </div>
      </section>

      {/* Esteemed Client Credentials Section (Grid & Category Filter UI) */}
      <AboutClientsSection />

      {/* Certifications */}
      <section className="px-6 py-24 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
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
        </div>
      </section>

      {/* Dynamic Gallery Section */}
      <GallerySection />
    </main>
  );
}

