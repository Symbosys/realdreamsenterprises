import { ShieldCheck, FileCheck, Gavel, Handshake } from "lucide-react";
import { Reveal } from "./Reveal";

export function GovtAuthorizedSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-background/50 border-t border-border/40 overflow-hidden">
      {/* Background Subtle Gradient & Frame Accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Main Grid: Left Details & Right 3D Emblem Badge */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <p className="eyebrow text-[#c99a43] tracking-widest uppercase font-bold text-xs md:text-sm">
                OUR AUTHORIZATION
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
                Government Authorized <br className="hidden sm:inline" />
                <span className="text-foreground">Supplier</span>
              </h2>
              {/* Gold Divider Line */}
              <div className="mt-4 h-1 w-16 bg-[#c99a43] rounded-full" />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mt-6">
                We are proud to be a Government-Authorized supplier/exporter of Rashmi TMT bars across Jharkhand.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Highlight Block quote with Gold Left Border */}
              <div className="mt-6 border-l-4 border-[#c99a43] bg-card/60 p-5 rounded-r-xl shadow-sm border backdrop-blur-md max-w-2xl">
                <p className="font-display font-bold text-foreground text-sm md:text-base leading-snug">
                  Across Jharkhand, we are a trusted supplier/exporter of Rashmi TMT bars.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3D Gold Shield Badge Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/10 opacity-70 blur-2xl transition-all duration-500 group-hover:opacity-100" />
                <img
                  src="/images/govt_authorized_supplier_badge.png"
                  alt="Government Authorized Supplier Badge"
                  className="relative max-h-95 w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom 4 Feature Cards Grid */}
        <Reveal delay={0.3}>
          <div className="mt-16 bg-card/80 border border-border/70 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            {/* 1. AUTHORIZED */}
            <div className="pt-4 sm:pt-0 sm:px-4 text-center first:pt-0 first:px-0">
              <div className="flex justify-center text-[#c99a43] mb-3">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-foreground text-base tracking-wider uppercase">
                AUTHORIZED
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 max-w-50 mx-auto">
                We are officially authorized supplier.
              </p>
            </div>

            {/* 2. VERIFIED */}
            <div className="pt-6 sm:pt-0 sm:px-4 text-center">
              <div className="flex justify-center text-[#c99a43] mb-3">
                <FileCheck className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-foreground text-base tracking-wider uppercase">
                VERIFIED
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 max-w-50 mx-auto">
                Our authorization is verified and valid.
              </p>
            </div>

            {/* 3. COMPLIANT */}
            <div className="pt-6 sm:pt-0 sm:px-4 text-center">
              <div className="flex justify-center text-[#c99a43] mb-3">
                <Gavel className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-foreground text-base tracking-wider uppercase">
                COMPLIANT
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 max-w-50 mx-auto">
                We follow all government norms and guidelines.
              </p>
            </div>

            {/* 4. TRUSTED */}
            <div className="pt-6 sm:pt-0 sm:px-4 text-center">
              <div className="flex justify-center text-[#c99a43] mb-3">
                <Handshake className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-foreground text-base tracking-wider uppercase">
                TRUSTED
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 max-w-50 mx-auto">
                Trusted by builders, contractors & industries.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
