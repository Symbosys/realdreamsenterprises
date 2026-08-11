import { useState } from "react";
import { CLIENTS } from "@/data/clients";
import { Glass } from "./Primitives";
import { Reveal } from "./Reveal";

const CATEGORIES = ["All", "Government & Infra", "Industrial & Energy", "Commercial & Developers"] as const;

export function AboutClientsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredClients = CLIENTS.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory,
  );

  return (
    <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-ember">Client Credential Directory</p>
            <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl font-display font-extrabold tracking-tight">
              Our Esteemed <span className="text-ember-gradient">Government & Industry Clients</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
              Real Dreams Enterprises is the trusted supplier of Rashmi TMT steel for major government departments, central public works, state infrastructure corporations, power plants, and premier real estate developers across Jharkhand.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? "border-ember bg-ember text-primary-foreground shadow-md scale-102"
                  : "border-border/80 bg-card/60 text-muted-foreground hover:border-ember/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Client Credential Grid (IMAGE ONLY DEFAULT, NAME DISPLAY ON HOVER) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredClients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.05}>
              <Glass className="group relative flex h-40 items-center justify-center p-6 transition-all duration-300 hover:border-ember/70 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                {/* Client Logo Image Only by Default */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-20 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Smooth Name Overlay Display on Hover */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-background/92 px-4 py-3 text-center opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 border border-ember/60 shadow-lg">
                  <span className="font-display text-sm font-extrabold text-foreground tracking-wide">
                    {client.name}
                  </span>
                  <span className="text-[10px] font-bold text-ember uppercase tracking-widest mt-1">
                    {client.badge}
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1 font-medium">
                    {client.location}
                  </span>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
