import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Glass, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { LivePricingSection } from "@/components/site/LivePricingSection";
import { PRODUCTS, SITE_CONTACT } from "@/data/site";
import { useGetWebConfig, getConfigValue } from "@/api/webconfig.api";
import { useGetActiveLocations, ServingLocationData } from "@/api/location.api";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Truck,
  ArrowRight,
  Search,
  Award,
  FileCheck,
  Sparkles,
  Package,
  Layers,
  PhoneCall,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "TMT Steel Bars Products & Live Pricing — Exclusive Supplier in Jharkhand" },
      {
        name: "description",
        content:
          "Explore 8mm to 32mm SME-TMT and Rashmi TMT steel bars with live market rates, technical specifications, and 24-district delivery across Jharkhand.",
      },
      { property: "og:title", content: "TMT Steel Bars Products & Live Pricing — Exclusive Supplier in Jharkhand" },
      {
        property: "og:description",
        content: "Explore SME-TMT & Rashmi TMT bars with live market pricing & 24-district delivery across Jharkhand.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES = ["All", "Light MM (8-10mm)", "Medium MM (12-16mm)", "Heavy MM (20-32mm)"];

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: locations = [] } = useGetActiveLocations();
  const { data: webConfig } = useGetWebConfig();

  const phone = getConfigValue(webConfig, "contact.phone", SITE_CONTACT.phone || "651-3511561");
  const phoneRaw = getConfigValue(webConfig, "contact.phoneRaw", SITE_CONTACT.phoneRaw || "6513511561");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.blurb.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-background text-foreground relative">
      {/* Hero */}
      <PageHero
        eyebrow="Products & Live Market Rates · Authorized Supplier in Jharkhand"
        title={
          <>
            Government-Authorized TMT Steel Bars & <br />
            <span className="text-ember-gradient">Live Market Rates</span>
          </>
        }
        lead="Explore our full catalogue of 8mm to 32mm SME-TMT and Rashmi TMT Bars with real-time mill pricing, guaranteed mill test reports, and 24-district site delivery across Jharkhand."
        scene={
          <div className="absolute inset-0">
            <img
              src="/images/tmt_bars.png"
              alt="Rashmi TMT Steel Bars"
              className="h-full w-full object-cover opacity-30 scale-102 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-background/40 to-background" />
          </div>
        }
      />

      {/* --- LIVE PRICING SECTION INTEGRATION --- */}
      <LivePricingSection />

      {/* --- PRODUCTS CATALOGUE SHOWCASE --- */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Catalogue"
            title="Complete Range of High-Yield TMT Bars"
            lead="Fully certified Fe 500D & Fe 550D grade steel rebars manufactured using Thermex German quenching technology."
          />

          {/* Category Filter & Search Bar */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-md">
            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-ember text-ember-foreground shadow-md scale-102"
                      : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search diameter, grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ember/50"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Glass className="group h-full p-7 flex flex-col justify-between transition-all duration-300 hover:border-ember/60 hover:-translate-y-1">
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-ember/15 text-ember border border-ember/30 font-display text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {p.grade}
                      </span>
                      <span className="border-border bg-muted/60 text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {p.stock}
                      </span>
                    </div>

                    {/* Image Box */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-muted/40 border border-border/60 group-hover:border-ember/30 transition-colors">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-white text-xs font-bold bg-background/85 px-2.5 py-1 rounded-md border border-border/80 backdrop-blur-md">
                          IS 1786 Certified
                        </span>
                        <span className="text-ember font-bold text-xs bg-ember/20 border border-ember/40 px-2 py-0.5 rounded backdrop-blur-md">
                          100% Ductile
                        </span>
                      </div>
                    </div>

                    {/* Title & Blurb */}
                    <h3 className="font-display text-xl font-extrabold text-foreground group-hover:text-ember transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase font-semibold mt-1">
                      {p.tag}
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed line-clamp-3">
                      {p.blurb}
                    </p>

                    {/* Specs List */}
                    <div className="mt-5 grid grid-cols-2 gap-2 border-t border-b border-border/50 py-4">
                      {p.specs.slice(0, 4).map(([label, value]) => (
                        <div key={label} className="text-xs">
                          <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                            {label}
                          </span>
                          <span className="font-bold text-foreground truncate block">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="mt-6 pt-2 flex items-center justify-between gap-3">
                    <Link
                      to="/contact"
                      className="flex-1 bg-ember text-ember-foreground hover:brightness-110 text-center py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Get Best Quote
                    </Link>
                    <a
                      href={`https://wa.me/91${phoneRaw || "6513511561"}?text=Hi,%20I%20want%20price%20quote%20for%20${encodeURIComponent(
                        p.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border/80 bg-muted/40 hover:bg-accent p-2.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                      title="Instant WhatsApp Inquiry"
                    >
                      <PhoneCall className="h-4 w-4 text-emerald-500" />
                    </a>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVING LOCATIONS & DELIVERY REACH --- */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow text-ember font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-4 w-4" /> State-Wide Logistics Network
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Serving All <span className="text-ember-gradient">24 Districts in Jharkhand</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
                Direct site delivery within 24 to 48 hours to any government tender or private site across all districts of Jharkhand.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                24/7 Active Supply Fleet
              </span>
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc: ServingLocationData, i: number) => (
              <Reveal key={loc.code || loc.name} delay={i * 0.03}>
                <Glass className="p-5 hover:border-ember/60 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="font-display font-bold text-base text-foreground">{loc.name}</div>
                      <div className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                        {loc.zone} · {loc.state}
                      </div>
                    </div>
                    {loc.isHub && (
                      <span className="bg-ember/20 text-ember border border-ember/30 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        HUB
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-border/50 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-ember" /> Lead Time:
                      </span>
                      <span className="font-bold text-foreground">{loc.leadTime || "24-48 Hours"}</span>
                    </div>

                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3 text-emerald-500" /> Stock Status:
                      </span>
                      <span className="font-bold text-emerald-400">{loc.stockStatus || "Ready Stock"}</span>
                    </div>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Order / Quote CTA Banner */}
      <section className="relative py-16 px-6 md:px-12 bg-card border-t border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-ember/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Need Bulk TMT Steel Supply for your Project?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get instant government schedule of rates (SOR) approved quotes, mill test reports, and delivery schedules tailored to your site requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="bg-ember text-ember-foreground hover:brightness-110 px-8 py-3.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-widest shadow-lg transition-all hover:scale-105"
            >
              Request Project Quote
            </Link>
            <a
              href={`tel:${phoneRaw || phone.replace(/\D/g, "")}`}
              className="border border-border bg-background hover:bg-accent px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-ember" /> Call {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
