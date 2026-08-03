import { Link } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { motion } from "motion/react";
import { SceneMount } from "@/components/SceneMount";
import { NAV, SITE_CONTACT } from "@/data/site";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  ArrowUp,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const SkylineNightScene = lazy(() => import("@/components/three/SkylineNightScene"));

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
];

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const [inputEmail, setInputEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail) {
      setSubscribed(true);
      setInputEmail("");
    }
  };

  return (
    <footer className="relative mt-16 overflow-hidden bg-background text-foreground border-t border-border/40">
      {/* 3D Night Skyline Banner Header */}
      <div className="relative h-[55vh] min-h-95 w-full overflow-hidden">
        <SceneMount className="absolute inset-0" label="Lighting the skyline">
          <SkylineNightScene />
        </SceneMount>

        {/* Ambient Dark Gradient Overlays */}
        <div className="from-background via-background/25 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="from-background/90 via-transparent pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />

        {/* Hero Footer Branding */}
        <div className="pointer-events-none absolute inset-x-0 top-12 flex flex-col items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-background/60 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember"></span>
            </span>
            <span className="text-muted-foreground text-[10px] font-bold tracking-[0.25em] uppercase">
              Real Dreams Enterprises
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <img src="/logo/logo.png" alt="Real Dreams Enterprises logo" className="mx-auto h-32 w-auto object-contain md:h-36" />
          </motion.div>

          <p className="text-muted-foreground mt-2 text-xs tracking-[0.3em] uppercase md:text-sm">
            High-Grade Rebars · Structural Steel · Precision Engineering
          </p>
        </div>
      </div>

      {/* Quick Contact & Action Callout Bar */}
      <div className="relative z-10 -mt-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl rounded-xl border border-border/80 bg-card/85 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-ember eyebrow flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" /> High Tonnage & Project Quotes
              </span>
              <h3 className="font-display mt-1 text-xl font-bold tracking-tight md:text-2xl">
                Ready to specify certified steel for your next landmark?
              </h3>
              <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                Get mill test certificates, cut-to-length schedules & direct manufacturer pricing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
              <a
                href={`tel:${SITE_CONTACT.phone}`}
                className="group border-border/80 bg-background/80 hover:border-ember hover:bg-ember/10 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all"
              >
                <div className="bg-ember/20 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span>{SITE_CONTACT.phone}</span>
              </a>

              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="group border-border/80 bg-background/80 hover:border-ember hover:bg-ember/10 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all"
              >
                <div className="bg-ember/20 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span>{SITE_CONTACT.email}</span>
              </a>

              <Link
                to="/contact"
                className="bg-ember text-primary-foreground hover:shadow-ember flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
              >
                Get Quote <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="relative px-6 pt-16 pb-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">

            {/* Col 1: Brand & Certification Seals (4 cols) */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center">
                <img src="/logo/logo.png" alt="Real Dreams Enterprises logo" className="h-20 w-auto object-contain" />
                <span className="sr-only">Real Dreams Enterprises</span>
              </Link>
              <p className="text-muted-foreground mt-4 text-xs leading-relaxed max-w-sm">
                Engineered Thermo-Mechanically Treated (TMT) rebar, heavy structural sections, and specialized bright steel. Certified for seismic zones III to V with traceable mill test reports.
              </p>

              {/* Quality Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["ISO 9001:2015", "BIS IS 1786", "EN 10025", "EPD Certified"].map((badge) => (
                  <span
                    key={badge}
                    className="border-border/60 bg-card/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase"
                  >
                    <ShieldCheck className="h-3 w-3 text-ember" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2: Navigation Links (2 cols) */}
            <div className="lg:col-span-2">
              <p className="eyebrow text-ember mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className="text-muted-foreground hover:text-ember group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      <span className="bg-ember/0 group-hover:bg-ember h-1 w-1 rounded-full transition-all" />
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct Contact Details (3 cols) */}
            <div className="lg:col-span-3">
              <p className="eyebrow text-ember mb-4">Direct Desk</p>
              <div className="space-y-4 text-xs">
                {/* Phone Link */}
                <a
                  href={`tel:${SITE_CONTACT.phone}`}
                  className="group border-border/50 hover:border-ember bg-card/40 hover:bg-card flex items-start gap-3 rounded-lg border p-3 transition-all"
                >
                  <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground rounded-md p-2 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider block">
                      Sales & Hotline
                    </span>
                    <span className="font-display text-sm font-bold text-foreground group-hover:text-ember transition-colors">
                      {SITE_CONTACT.phone}
                    </span>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="group border-border/50 hover:border-ember bg-card/40 hover:bg-card flex items-start gap-3 rounded-lg border p-3 transition-all"
                >
                  <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground rounded-md p-2 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider block">
                      Email Desk
                    </span>
                    <span className="font-display text-xs font-bold text-foreground group-hover:text-ember transition-colors truncate block">
                      {SITE_CONTACT.email}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3 pt-1">
                  <MapPin className="h-4 w-4 text-ember shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-xs leading-relaxed">
                    {SITE_CONTACT.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Col 4: Newsletter / Quick Catalog Request (3 cols) */}
            <div className="lg:col-span-3">
              <p className="eyebrow text-ember mb-4">Steel Specs & Updates</p>
              <p className="text-muted-foreground text-xs mb-4">
                Subscribe for structural steel price updates and technical specification guides.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Enter work email..."
                    className="border-border/70 bg-card/60 focus:border-ember focus:bg-card w-full rounded-md border px-3.5 py-2.5 pr-10 text-xs outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-ember text-primary-foreground hover:scale-105 absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-md transition-transform"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                {subscribed ? (
                  <p className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Subscribed successfully!
                  </p>
                ) : null}
              </form>

              <div className="mt-6 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-ember shrink-0" />
                <span className="text-muted-foreground text-[11px]">{SITE_CONTACT.hours}</span>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="rule-line my-10" />

          {/* Bottom Bar: Copyright, Socials, Scroll To Top */}
          <div className="flex flex-col items-center justify-between gap-6 text-xs text-muted-foreground md:flex-row">
            <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
              <p className="font-medium">
                © {new Date().getFullYear()} Real Dreams Enterprises / {SITE_CONTACT.companyName}. All rights reserved.
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Precision Steel Manufacturing & Global Export Desk
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="hover:text-ember transition-colors text-xs font-medium"
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-border/70 bg-card/40 hover:border-ember hover:text-ember group flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-all hover:bg-card"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

