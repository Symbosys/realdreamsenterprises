import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { NAV, SITE_CONTACT } from "@/data/site";
import { useGetWebConfig, getConfigValue } from "@/api/webconfig.api";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";

export function SiteFooter() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { data: webConfig, isLoading } = useGetWebConfig();

  // Dynamic contact info with static fallbacks
  const phone = getConfigValue(webConfig, "contact.phone", SITE_CONTACT.phone);
  const email = getConfigValue(webConfig, "contact.email", SITE_CONTACT.email);
  const regdAddress = getConfigValue(webConfig, "contact.regdAddress", SITE_CONTACT.regdAddress);
  const stateAddress = getConfigValue(webConfig, "contact.stateAddress", SITE_CONTACT.stateAddress);
  const companyName = getConfigValue(webConfig, "contact.companyName", SITE_CONTACT.companyName);
  const hours = getConfigValue(webConfig, "contact.hours", SITE_CONTACT.hours);

  // Dynamic social links - render ONLY those added in webConfig
  const socialLinks = [
    { label: "LinkedIn", href: getConfigValue(webConfig, "social.linkedin", ""), icon: Linkedin },
    { label: "Twitter / X", href: getConfigValue(webConfig, "social.twitter", ""), icon: Twitter },
    { label: "YouTube", href: getConfigValue(webConfig, "social.youtube", ""), icon: Youtube },
    { label: "Instagram", href: getConfigValue(webConfig, "social.instagram", ""), icon: Instagram },
    { label: "Facebook", href: getConfigValue(webConfig, "social.facebook", ""), icon: Facebook },
  ].filter((s) => s.href && s.href.trim() !== "" && s.href.trim() !== "#");

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
      {/* Night Skyline Banner Header */}
      <div className="relative min-h-105 w-full overflow-hidden bg-background flex flex-col justify-start pt-10 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-ember/15 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* Ambient Dark Gradient Overlays */}
        <div className="from-background via-background/25 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="from-background/90 via-transparent pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />

        {/* Hero Footer Branding */}
        <div className="relative z-0 flex flex-col items-center px-6 text-center pt-4 pb-16">
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
              Real Dreams Enterprises Limited
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <img src="/logo/logo.png" alt="Real Dreams Enterprises Limited logo" className="mx-auto h-32 w-auto object-contain md:h-44 dark:hidden" />
            <img src="/logo/logo-dark-mode.png" alt="Real Dreams Enterprises Limited logo" className="mx-auto h-32 w-auto object-contain md:h-44 hidden dark:block" />
          </motion.div>

          <p className="text-muted-foreground mt-2 text-xs tracking-[0.3em] uppercase md:text-sm">
            High-Grade Rebars · Structural Steel · Precision Engineering
          </p>
        </div>
      </div>

      {/* Quick Contact & Action Callout Bar */}
      <div className="relative z-10 -mt-16 px-6 md:px-12">
        <div className="mx-auto max-w-6xl rounded-xl border border-border/80 bg-card/85 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
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

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 lg:col-span-7 lg:justify-end">
              <a
                href={`tel:${phone}`}
                className="group border-border/80 bg-background/80 hover:border-ember hover:bg-ember/10 flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all shrink-0"
              >
                <div className="bg-ember/20 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span>{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="group border-border/80 bg-background/80 hover:border-ember hover:bg-ember/10 flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-bold transition-all shrink-0"
              >
                <div className="bg-ember/20 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="lowercase font-semibold">{email}</span>
              </a>

              <Link
                to="/contact"
                className="bg-ember text-primary-foreground hover:shadow-ember flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 shrink-0"
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
                <img src="/logo/logo.png" alt="Real Dreams Enterprises Limited logo" className="h-28 w-auto object-contain md:h-32 dark:hidden" />
                <img src="/logo/logo-dark-mode.png" alt="Real Dreams Enterprises Limited logo" className="h-28 w-auto object-contain md:h-32 hidden dark:block" />
                <span className="sr-only">Real Dreams Enterprises Limited</span>
              </Link>
              <p className="text-muted-foreground mt-4 text-xs leading-relaxed max-w-sm">
                Sole authorized supplier and exporter of Government-Authorized Rashmi TMT Bars across all 24 districts of Jharkhand. Approved for all government tenders, PWD projects, NHAI highways, and high-rise construction at the most affordable rates.
              </p>

              {/* Quality Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Govt Authorized (SOR)", "BIS IS 1786", "Jharkhand Supplier", "Most Affordable"].map((badge) => (
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
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="h-14 rounded-lg bg-card/40 border border-border/50 animate-pulse p-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-ember/20" />
                      <div className="space-y-1">
                        <div className="h-2 w-16 bg-muted/60 rounded" />
                        <div className="h-3 w-28 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="h-14 rounded-lg bg-card/40 border border-border/50 animate-pulse p-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-ember/20" />
                      <div className="space-y-1">
                        <div className="h-2 w-16 bg-muted/60 rounded" />
                        <div className="h-3 w-32 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-1 animate-pulse">
                      <div className="h-3 w-20 bg-muted/60 rounded" />
                      <div className="h-3 w-full bg-muted/40 rounded" />
                    </div>
                    <div className="space-y-1.5 pt-1 animate-pulse">
                      <div className="h-3 w-24 bg-muted/60 rounded" />
                      <div className="h-3 w-full bg-muted/40 rounded" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Phone Link */}
                    <a
                      href={`tel:${phone}`}
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
                          {phone}
                        </span>
                      </div>
                    </a>

                    {/* Email Link */}
                    <a
                      href={`mailto:${email}`}
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
                          {email}
                        </span>
                      </div>
                    </a>

                    {/* Regd Location */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <MapPin className="h-4 w-4 text-ember shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold text-foreground block">Regd. Office:</span>
                        <span className="text-muted-foreground">{regdAddress}</span>
                      </div>
                    </div>

                    {/* State Location */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <MapPin className="h-4 w-4 text-ember shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold text-foreground block">State Office (Ranchi):</span>
                        <span className="text-muted-foreground">{stateAddress}</span>
                      </div>
                    </div>
                  </>
                )}
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
                <span className="text-muted-foreground text-[11px]">{hours}</span>
              </div>

              {/* Social Media Links (Icon + Name) - Only rendered if added in webConfig */}
              {socialLinks.length > 0 ? (
                <div className="mt-6 pt-4 border-t border-border/40">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-2.5">
                    Follow Us
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-border/60 bg-card/40 hover:border-ember hover:text-ember text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all hover:bg-card"
                        >
                          <Icon className="h-3.5 w-3.5 text-ember" />
                          <span>{s.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

          </div>

          {/* Divider */}
          <div className="rule-line my-10" />

          {/* Bottom Bar: Copyright, Social Icons, Scroll To Top */}
          <div className="flex flex-col items-center justify-between gap-6 text-xs text-muted-foreground md:flex-row">
            <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
              <p className="font-medium">
                © {new Date().getFullYear()}  Limited / {companyName}. All rights reserved.
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Precision Steel Manufacturing & Global Export Desk
              </p>
            </div>

            {/* Social Links (Icons only) - Only rendered if added in webConfig */}
            {socialLinks.length > 0 ? (
              <div className="flex items-center gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="border-border/70 bg-card/40 hover:border-ember hover:text-ember flex h-8 w-8 items-center justify-center rounded-lg border text-muted-foreground transition-all hover:bg-card hover:scale-110"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            ) : null}

            {/* Developed by Symbosys link */}
            <a
              href="https://www.symbosys.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/70 bg-card/40 hover:border-ember hover:text-ember group flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold transition-all hover:bg-card mr-14 sm:mr-16 md:mr-0"
            >
              <span>Developed by <span className="font-bold text-foreground group-hover:text-ember transition-colors">Symbosys</span></span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

