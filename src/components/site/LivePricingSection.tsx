import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
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

type Brand = "RASHMI" | "JSW";

interface PriceRow {
  size: string;
  price: string;
  change: string;
  isUp: boolean;
  lastUpdated: string;
}

const PRICING_DATA: Record<Brand, PriceRow[]> = {
  RASHMI: [
    { size: "8 MM", price: "₹ 54,500", change: "+ ₹ 500", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "10 MM", price: "₹ 54,000", change: "+ ₹ 400", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "12 MM", price: "₹ 53,800", change: "+ ₹ 300", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "16 MM", price: "₹ 53,500", change: "- ₹ 200", isUp: false, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "20 MM", price: "₹ 53,200", change: "+ ₹ 200", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "25 MM", price: "₹ 53,000", change: "+ ₹ 100", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "32 MM", price: "₹ 52,600", change: "+ ₹ 300", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
  ],
  JSW: [
    { size: "8 MM", price: "₹ 57,800", change: "+ ₹ 400", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "10 MM", price: "₹ 57,200", change: "+ ₹ 350", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "12 MM", price: "₹ 56,900", change: "+ ₹ 250", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "16 MM", price: "₹ 56,500", change: "- ₹ 150", isUp: false, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "20 MM", price: "₹ 56,100", change: "+ ₹ 200", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "25 MM", price: "₹ 55,800", change: "+ ₹ 100", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
    { size: "32 MM", price: "₹ 55,400", change: "+ ₹ 300", isUp: true, lastUpdated: "16 May 2024, 10:30 AM" },
  ],
};

export function LivePricingSection() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>("RASHMI");
  const [unit, setUnit] = useState<string>("Price / Ton");
  const [countdown, setCountdown] = useState<number>(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
                TMT Bars <br />
                <span className="text-[#b8860b] dark:text-amber-400">Rashmi & JSW</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-slate-600 dark:text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Real-time pricing for Rashmi and JSW TMT bars. Prices are updated regularly to give you the most accurate and transparent rates.
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
                  src="/images/tmt_bars.png"
                  alt="Rashmi and JSW TMT Steel Bars"
                  className="w-full h-65 sm:h-75 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="bg-amber-500/30 border border-amber-400/60 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-amber-300">
                      RASHMI & JSW CERTIFIED STEEL
                    </span>
                    <h3 className="font-display text-xl font-bold">Direct Mill Pricing in Jharkhand</h3>
                  </div>
                </div>

                {/* Floating "Last Updated" Card */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 border border-amber-400/40 rounded-xl p-3.5 shadow-xl backdrop-blur-md text-slate-900 dark:text-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Updated</p>
                      <p className="font-display font-extrabold text-xs">16 May 2024, 10:30 AM</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-border/60 flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Auto Refresh in
                    </span>
                    <span className="bg-amber-500/10 px-2 py-0.5 rounded font-black">{countdown}s</span>
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
                  {/* Brand 1: RASHMI */}
                  <button
                    onClick={() => setSelectedBrand("RASHMI")}
                    className={`w-full relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      selectedBrand === "RASHMI"
                        ? "border-[#b8860b] bg-linear-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-white shadow-lg scale-102"
                        : "border-slate-200 dark:border-border bg-slate-50/60 dark:bg-secondary/40 text-slate-900 dark:text-foreground hover:border-[#b8860b]/50"
                    }`}
                  >
                    <div>
                      <span className="font-display font-black text-lg tracking-wider block">RASHMI</span>
                      <span className="text-[10px] font-bold opacity-80 block tracking-widest uppercase">
                        SME-TMT & FE 550D
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                      {selectedBrand === "RASHMI" && <CheckCircle2 className="w-4 h-4 fill-white text-[#b8860b]" />}
                    </div>
                  </button>

                  {/* Brand 2: JSW */}
                  <button
                    onClick={() => setSelectedBrand("JSW")}
                    className={`w-full relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      selectedBrand === "JSW"
                        ? "border-blue-600 bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg scale-102"
                        : "border-slate-200 dark:border-border bg-slate-50/60 dark:bg-secondary/40 text-slate-900 dark:text-foreground hover:border-blue-500/50"
                    }`}
                  >
                    <div>
                      <span className="font-display font-black text-lg tracking-wider block">JSW TMT</span>
                      <span className="text-[10px] font-bold opacity-80 block tracking-widest uppercase">
                        NEOSTEEL · BETTER EVERYDAY
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                      {selectedBrand === "JSW" && <CheckCircle2 className="w-4 h-4 fill-white text-blue-600" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* Pricing Notes Box */}
              <div className="bg-white dark:bg-card/90 border border-slate-200/80 dark:border-border/60 rounded-2xl p-6 shadow-md backdrop-blur-md space-y-4">
                <p className="eyebrow text-xs font-black tracking-widest text-slate-400 uppercase">
                  PRICING NOTES
                </p>

                <ul className="space-y-3 text-xs text-slate-600 dark:text-muted-foreground font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Prices are inclusive of GST.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Transportation charges extra based on location.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Prices may vary by location across Jharkhand.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Contact us directly for special bulk order pricing.</span>
                  </li>
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
                    {selectedBrand} TMT BAR PRICING
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
                      <th className="py-3.5 px-4">PRICE / TON (₹)</th>
                      <th className="py-3.5 px-4">CHANGE</th>
                      <th className="py-3.5 px-4 text-center">TREND</th>
                      <th className="py-3.5 px-4 rounded-r-lg text-right">LAST UPDATED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 dark:divide-border/60 font-semibold text-slate-800 dark:text-slate-200">
                    {PRICING_DATA[selectedBrand].map((row) => (
                      <tr
                        key={row.size}
                        className="hover:bg-slate-50 dark:hover:bg-accent/40 transition-colors duration-200"
                      >
                        <td className="py-4 px-4 font-display font-black text-sm text-slate-900 dark:text-foreground">
                          {row.size}
                        </td>
                        <td className="py-4 px-4 font-display font-black text-sm text-slate-900 dark:text-foreground">
                          {row.price}
                        </td>
                        <td
                          className={`py-4 px-4 font-bold ${
                            row.isUp
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {row.change}
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
                        <td className="py-4 px-4 text-right text-slate-500 dark:text-muted-foreground text-[11px]">
                          {row.lastUpdated}
                        </td>
                      </tr>
                    ))}
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
