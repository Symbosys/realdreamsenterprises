import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Award, FileCheck, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Glass } from "./Primitives";
import { Reveal } from "./Reveal";
import { useGetActiveLocations } from "@/api/location.api";

export function ExclusiveJharkhandExporter() {
  const { data: activeLocations = [], isLoading } = useGetActiveLocations();

  const hubs = activeLocations.filter((loc) => loc.isHub);
  const activeCount = activeLocations.length;

  return (
    <section className="relative py-28 px-6 md:px-12 bg-background border-t border-border/40 overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-ember/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-ember/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-bold text-ember uppercase tracking-widest shadow-sm">
            <Award className="h-4 w-4" /> 100% Exclusive Distributorship Rights
          </div>
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl leading-tight">
            Sole Supplier & Exporter of <span className="text-ember-gradient">Rashmi TMT Bars</span> Across All {activeCount || 24} Districts of Jharkhand
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Real Dreams Enterprises is the only authorized supplier and exporter for Rashmi TMT & SME-TMT Bars in Jharkhand. We guarantee direct mill pricing, 100% government SOR letter certification, and site delivery to active districts across the state.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              stat: "100%",
              title: "Exclusive Supplier Rights",
              desc: "Sole authorized distribution partner for Rashmi TMT Bars across the entire state of Jharkhand.",
              icon: ShieldCheck,
            },
            {
              stat: `${activeCount} / 24`,
              title: "Districts Covered",
              desc: "Dedicated supply network delivering directly to project sites in active districts of Jharkhand.",
              icon: MapPin,
            },
            {
              stat: "Govt SOR",
              title: "Letter Certified",
              desc: "100% Government approved for PWD, CPWD, NHAI, Railways, and all public infrastructure tenders.",
              icon: FileCheck,
            },
            {
              stat: "#1",
              title: "Most Affordable Rate",
              desc: "Guaranteed lowest direct mill pricing on Rashmi TMT steel without middleman markups.",
              icon: Truck,
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <Glass className="group h-full p-7 transition-all duration-300 hover:border-ember/60 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="border-ember/30 bg-ember/10 flex h-12 w-12 items-center justify-center rounded-lg text-ember">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-2xl font-extrabold text-ember">{item.stat}</span>
                </div>
                <h3 className="font-display text-lg font-bold mt-5 text-foreground group-hover:text-ember transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{item.desc}</p>
              </Glass>
            </Reveal>
          ))}
        </div>

        {/* 24 Districts Interactive Coverage Banner */}
        <div className="mt-16 rounded-2xl border border-border/80 bg-card/60 p-8 md:p-10 backdrop-blur-xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-ember/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2 text-ember text-xs font-bold uppercase tracking-wider">
                <MapPin className="h-4 w-4" /> Statewide Network
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mt-1">
                Guaranteed Delivery Across Active Jharkhand Districts
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Express Delivery Active ({activeCount} Districts)
              </span>
            </div>
          </div>

          {/* Central Hubs Callout Badges */}
          {hubs.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs font-extrabold uppercase text-ember tracking-wider">Primary Dispatch Hubs:</span>
              {hubs.map((hub) => (
                <span key={hub.id} className="inline-flex items-center gap-1 bg-ember/15 border border-ember/30 px-3 py-1 rounded-full text-xs font-extrabold text-ember">
                  <MapPin className="h-3.5 w-3.5" /> {hub.name} Hub ({hub.leadTime})
                </span>
              ))}
            </div>
          )}

          {/* District Badges Grid */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {isLoading ? (
              <p className="text-xs text-muted-foreground">Loading active serving locations...</p>
            ) : activeLocations.length === 0 ? (
              <p className="text-xs text-muted-foreground">No active locations configured.</p>
            ) : (
              activeLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="group border border-border/70 bg-background/80 hover:border-ember/60 hover:bg-card/90 flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold text-foreground transition-all duration-200 hover:scale-105 shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-ember shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{loc.name}</span>
                  {loc.isHub && <span className="text-[9px] font-black uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Hub</span>}
                </div>
              ))
            )}
          </div>

          {/* Call to Action Bar */}
          <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xl text-center sm:text-left">
              Need immediate site delivery or government project SOR approval letters for your tender in Jharkhand? Get in touch with our Ranchi logistics desk.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="bg-ember text-primary-foreground hover:shadow-ember flex items-center gap-2 rounded-md px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
              >
                Request Site Supply <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
