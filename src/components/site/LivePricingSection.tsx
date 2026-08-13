import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Tag,
  Target,
  Truck,
  Headphones,
  FileText,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { useGetLivePricing, BrandData } from "@/api/pricing.api";

export function LivePricingSection() {
  const { data: pricingData, isLoading, isRefetching, refetch } = useGetLivePricing();
  const brands = pricingData?.brands || [];
  const notes = pricingData?.notes || [];

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>("Price / Ton");
  const [countdown, setCountdown] = useState<number>(45);

  // Set initial selected brand when data loads
  useEffect(() => {
    if (brands.length > 0 && selectedBrandId === null) {
      setSelectedBrandId(brands[0].id);
    }
  }, [brands, selectedBrandId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refetch();
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refetch]);

  const currentBrand: BrandData | undefined =
    brands.find((b) => b.id === selectedBrandId) || brands[0];

  const formatPrice = (val?: number) => {
    if (!val) return "₹ 0";
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  return (
    <section className="relative py-20 px-6 md:px-12 bg-[#faf8f5] dark:bg-background text-slate-900 dark:text-foreground border-t border-border/40 overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Header & Right Image Canvas */}
        <div className="grid gap-10 lg:grid-cols-12 items-center mb-12">
          
          {/* Left Title & Key Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="flex items-center gap-2 text-[#b8860b] dark:text-amber-400 text-xs font-black tracking-[0.25em] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#b8860b] dark:bg-amber-400 animate-pulse" />
                <span>LIVE PRICING</span>
                <span className="h-px w-8 bg-[#b8860b]/40" />
              </div>

              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-foreground leading-[1.1]">
                Live Pricing of <br />
                TMT Steel Bars <br />
                <span className="text-[#b8860b] dark:text-amber-400">
                  {brands.map((b) => b.name).join(" & ") || "Rashmi & JSW"}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-slate-600 dark:text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Real-time pricing for authorized brand TMT bars across Jharkhand. Prices are updated regularly to give you the most accurate rates.
              </p>
            </Reveal>

            {/* 3 Micro Feature Badges */}
            <Reveal delay={0.2}>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-foreground">Real-Time Updates</h4>
                    <p className="text-slate-500 dark:text-muted-foreground text-[11px] leading-tight">
                      Prices updated in real-time
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-foreground">100% Transparent</h4>
                    <p className="text-slate-500 dark:text-muted-foreground text-[11px] leading-tight">
                      No hidden charges & extra costs
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-foreground">Best Market Rates</h4>
                    <p className="text-slate-500 dark:text-muted-foreground text-[11px] leading-tight">
                      Competitive pricing guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: TMT Bars Stack Graphic with Floating Refresh Card */}
          <div className="lg:col-span-6 relative flex justify-center">
            <Reveal delay={0.2}>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-border/60 max-w-lg">
                <img
                  src={currentBrand?.logoUrl || "/images/tmt_bars.png"}
                  alt={currentBrand?.name || "TMT Steel Bars"}
                  className="w-full h-65 sm:h-75 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="bg-amber-500/30 border border-amber-400/60 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-amber-300">
                      {currentBrand?.name || "AUTHORIZED"} CERTIFIED STEEL
                    </span>
                    <h3 className="font-display text-xl font-bold">Direct Mill Pricing in Jharkhand</h3>
                  </div>
                </div>

                {/* Floating Auto Refresh Card (removed Last Updated display) */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 border border-amber-400/40 rounded-xl p-3.5 shadow-xl backdrop-blur-md text-slate-900 dark:text-foreground">
                  <div className="flex items-center gap-3">
                    <RefreshCw className={`w-4 h-4 text-[#b8860b] dark:text-amber-400 ${isRefetching ? "animate-spin" : ""}`} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Auto Refresh</p>
                      <p className="font-display font-extrabold text-xs">{countdown}s</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Interactive Pricing Dashboard Grid */}
        <Reveal delay={0.3}>
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Sidebar: Select Brand & Pricing Notes */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Select Brand Box */}
              <div className="bg-white dark:bg-card/90 border border-slate-200/80 dark:border-border/60 rounded-2xl p-6 shadow-md backdrop-blur-md">
                <p className="eyebrow text-xs font-black tracking-widest text-slate-400 uppercase mb-4">
                  SELECT BRAND
                </p>

                <div className="space-y-3">
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-muted/40 animate-pulse flex items-center justify-between p-4">
                        <div className="h-4 w-24 bg-slate-300 dark:bg-muted rounded" />
                        <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-muted" />
                      </div>
                      <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-muted/40 animate-pulse flex items-center justify-between p-4">
                        <div className="h-4 w-28 bg-slate-300 dark:bg-muted rounded" />
                        <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-muted" />
                      </div>
                    </div>
                  ) : brands.length === 0 ? (
                    <div className="p-4 text-center text-xs text-muted-foreground">No active brands available.</div>
                  ) : (
                    brands.map((b) => {
                      const isSelected = (currentBrand?.id === b.id);
                      return (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBrandId(b.id)}
                          className={`w-full relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "border-[#b8860b] bg-linear-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-white shadow-lg scale-102"
                              : "border-slate-200 dark:border-border bg-slate-50/60 dark:bg-secondary/40 text-slate-900 dark:text-foreground hover:border-[#b8860b]/50"
                          }`}
                        >
                          <div>
                            <span className="font-display font-black text-lg tracking-wider block text-left">
                              {b.name}
                            </span>
                            {b.subtitle && (
                              <span className="text-[10px] font-bold opacity-80 block tracking-widest uppercase text-left">
                                {b.subtitle}
                              </span>
                            )}
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                            {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-[#b8860b]" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Pricing Notes Box */}
              <div className="bg-white dark:bg-card/90 border border-slate-200/80 dark:border-border/60 rounded-2xl p-6 shadow-md backdrop-blur-md space-y-4">
                <p className="eyebrow text-xs font-black tracking-widest text-slate-400 uppercase">
                  PRICING NOTES
                </p>

                <ul className="space-y-3 text-xs text-slate-600 dark:text-muted-foreground font-medium">
                  {notes.length === 0 ? (
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>Prices are inclusive of GST.</span>
                    </li>
                  ) : (
                    notes.map((note) => (
                      <li key={note.id} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{note.noteText}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

            </div>

            {/* Right Column: Live Price Table Dashboard */}
            <div className="lg:col-span-8 bg-white dark:bg-card/90 border border-slate-200/80 dark:border-border/60 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-border/60">
                <div>
                  <span className="text-xs font-extrabold text-[#b8860b] dark:text-amber-400 uppercase tracking-widest">
                    LIVE RATE CARD
                  </span>
                  <h3 className="font-display font-black text-xl md:text-2xl text-slate-900 dark:text-foreground mt-0.5">
                    {currentBrand?.name || "TMT BAR"} PRICING
                  </h3>
                </div>

                {/* Price Unit Selector Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    aria-label="Select pricing unit"
                    className="bg-slate-50 dark:bg-secondary border border-slate-200 dark:border-border rounded-lg px-3 py-1.5 text-xs font-extrabold text-slate-900 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                  >
                    <option value="Price / Ton">Price / Ton</option>
                    <option value="Price / Piece">Price / Piece</option>
                    <option value="Price / Bundle">Price / Bundle</option>
                  </select>
                </div>
              </div>

              {/* Responsive Live Price Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white dark:bg-slate-950 dark:text-slate-100 font-extrabold uppercase tracking-wider">
                      <th className="py-3.5 px-4 rounded-l-lg">SIZE (MM)</th>
                      <th className="py-3.5 px-4">{unit.toUpperCase()} (₹)</th>
                      <th className="py-3.5 px-4">CHANGE</th>
                      <th className="py-3.5 px-4 text-center rounded-r-lg">TREND</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 dark:divide-border/60 font-semibold text-slate-800 dark:text-slate-200">
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="py-4 px-4"><div className="h-4 w-12 bg-slate-200 dark:bg-muted/50 rounded" /></td>
                          <td className="py-4 px-4"><div className="h-4 w-20 bg-slate-200 dark:bg-muted/50 rounded" /></td>
                          <td className="py-4 px-4"><div className="h-4 w-16 bg-slate-200 dark:bg-muted/50 rounded" /></td>
                          <td className="py-4 px-4 text-center"><div className="h-5 w-14 bg-slate-200 dark:bg-muted/50 rounded-full mx-auto" /></td>
                        </tr>
                      ))
                    ) : !currentBrand || !currentBrand.pricingItems || currentBrand.pricingItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          No rates configured for this brand.
                        </td>
                      </tr>
                    ) : (
                      currentBrand.pricingItems.map((row) => {
                        let displayedPrice = formatPrice(row.pricePerTon);
                        if (unit === "Price / Piece") {
                          displayedPrice = formatPrice(row.pricePerPiece || Math.round(row.pricePerTon / 80));
                        } else if (unit === "Price / Bundle") {
                          displayedPrice = formatPrice(row.pricePerBundle || Math.round(row.pricePerTon / 20));
                        }

                        return (
                          <tr
                            key={row.id}
                            className="hover:bg-slate-50 dark:hover:bg-accent/40 transition-colors duration-200"
                          >
                            <td className="py-4 px-4 font-display font-black text-sm text-slate-900 dark:text-foreground">
                              {row.size}
                            </td>
                            <td className="py-4 px-4 font-display font-black text-sm text-slate-900 dark:text-foreground">
                              {displayedPrice}
                            </td>
                            <td
                              className={`py-4 px-4 font-bold ${
                                row.isUp
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {row.priceChange}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {row.isUp ? (
                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                                  <TrendingUp className="w-3.5 h-3.5" /> Up
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full font-bold">
                                  <TrendingDown className="w-3.5 h-3.5" /> Down
                                </span>
                              )}
                            </td>
                            {/* Last Updated column removed */}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </Reveal>

        {/* Bottom Banner Bar: Bulk Quote & 4 Guarantee Badges */}
        <Reveal delay={0.4}>
          <div className="mt-12 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 md:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Bulk Call Out */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-[#b8860b] text-white shrink-0 shadow-md">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-foreground">
                  Need Bulk Pricing?
                </h4>
                <p className="text-slate-500 dark:text-muted-foreground text-xs font-medium">
                  Get the best rates for your large requirements across Jharkhand.
                </p>
              </div>
              <a
                href="/contact"
                className="sm:ml-auto inline-flex items-center gap-2 rounded-xl border border-[#b8860b] px-4 py-2.5 text-xs font-extrabold text-[#b8860b] dark:text-amber-400 hover:bg-[#b8860b] hover:text-white transition-all duration-300 shrink-0"
              >
                <span>GET A QUOTE NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right 4 Guarantee Badges */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-border pt-6 lg:pt-0 lg:pl-6">
              
              {/* 1 */}
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#b8860b] dark:text-amber-400 shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-900 dark:text-foreground">GST Included</h5>
                  <p className="text-[10px] text-slate-500 dark:text-muted-foreground">All prices include GST</p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#b8860b] dark:text-amber-400 shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-900 dark:text-foreground">Wide Supply Network</h5>
                  <p className="text-[10px] text-slate-500 dark:text-muted-foreground">Across Jharkhand</p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#b8860b] dark:text-amber-400 shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-900 dark:text-foreground">Quick Delivery</h5>
                  <p className="text-[10px] text-slate-500 dark:text-muted-foreground">On-time, every time</p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex items-center gap-2.5">
                <Headphones className="w-5 h-5 text-[#b8860b] dark:text-amber-400 shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-xs text-slate-900 dark:text-foreground">Dedicated Support</h5>
                  <p className="text-[10px] text-slate-500 dark:text-muted-foreground">We're here to help</p>
                </div>
              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
