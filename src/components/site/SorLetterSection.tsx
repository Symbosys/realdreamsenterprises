import { ShieldCheck, Award, FileSearch, RefreshCw, Download, ArrowRight, Landmark, Handshake, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function SorLetterSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#fdfbf7] dark:bg-background text-foreground overflow-hidden border-t border-border/40 transition-colors duration-300">
      {/* 3D Background Canvas from sor-background.png */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-20 transition-opacity duration-300"
        style={{ backgroundImage: "url('/images/sor/sor-background.png')" }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          
          {/* Left Column: Official Recognition Details & Feature Badges */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c99a43]/60" />
                <div className="flex items-center gap-2 text-[#b8860b] dark:text-amber-400 text-xs font-black tracking-[0.25em] uppercase">
                  <Award className="w-4 h-4 text-[#b8860b] dark:text-amber-400" />
                  <span>OFFICIAL RECOGNITION</span>
                </div>
                <span className="h-px w-10 bg-[#c99a43]/60" />
              </div>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-foreground leading-[1.08]">
                SOR LETTER <br />
                <span className="text-[#b8860b] dark:text-amber-400">BY AUTHORIZED DEPARTMENT</span>
              </h2>

              {/* Gold Diamond Accent */}
              <div className="my-4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rotate-45 bg-[#b8860b] dark:bg-amber-400" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-slate-600 dark:text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Our SOR Letter is issued by the authorized government department. This recognizes our authenticity and eligibility as a trusted supplier and allows us to participate in government and private projects.
              </p>
            </Reveal>

            {/* 4 Feature Cards Grid (2x2) */}
            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Official Document */}
                <div className="flex items-start gap-3.5 bg-white/90 dark:bg-card/80 border border-slate-200/80 dark:border-border/60 p-4 rounded-xl shadow-sm backdrop-blur-md">
                  <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0 border border-amber-200/80 dark:border-amber-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-foreground">Official Document</h3>
                    <p className="text-slate-500 dark:text-muted-foreground text-xs leading-snug mt-0.5 font-medium">
                      Issued by authorized government department.
                    </p>
                  </div>
                </div>

                {/* 2. Verified & Valid */}
                <div className="flex items-start gap-3.5 bg-white/90 dark:bg-card/80 border border-slate-200/80 dark:border-border/60 p-4 rounded-xl shadow-sm backdrop-blur-md">
                  <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0 border border-amber-200/80 dark:border-amber-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-foreground">Verified & Valid</h3>
                    <p className="text-slate-500 dark:text-muted-foreground text-xs leading-snug mt-0.5 font-medium">
                      Authentic and government verified.
                    </p>
                  </div>
                </div>

                {/* 3. Recognized & Eligible */}
                <div className="flex items-start gap-3.5 bg-white/90 dark:bg-card/80 border border-slate-200/80 dark:border-border/60 p-4 rounded-xl shadow-sm backdrop-blur-md">
                  <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0 border border-amber-200/80 dark:border-amber-500/20">
                    <FileSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-foreground">Recognized & Eligible</h3>
                    <p className="text-slate-500 dark:text-muted-foreground text-xs leading-snug mt-0.5 font-medium">
                      Eligible for government and private projects.
                    </p>
                  </div>
                </div>

                {/* 4. Always Updated */}
                <div className="flex items-start gap-3.5 bg-white/90 dark:bg-card/80 border border-slate-200/80 dark:border-border/60 p-4 rounded-xl shadow-sm backdrop-blur-md">
                  <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-[#b8860b] dark:text-amber-400 shrink-0 border border-amber-200/80 dark:border-amber-500/20">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-foreground">Always Updated</h3>
                    <p className="text-slate-500 dark:text-muted-foreground text-xs leading-snug mt-0.5 font-medium">
                      We keep our documents current and up-to-date.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA Download Pill Button */}
            <Reveal delay={0.3}>
              <div className="pt-4">
                <a
                  href="/images/sor/sor.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="SOR_LETTER_RASHMI_TMT.pdf"
                  className="group inline-flex items-center gap-4 rounded-full border border-[#d4af37] bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] p-1.5 pr-6 text-white font-black text-xs tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/20 text-white group-hover:bg-black/30 transition-colors">
                    <Download className="w-5 h-5" />
                  </span>
                  <span className="font-display text-white drop-shadow-sm text-sm">VIEW / DOWNLOAD SOR LETTER</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Live PDF Viewer on Pedestal & Trusted Sidebar */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-12 items-center">
            
            {/* Center Live PDF Viewer Box */}
            <div className="sm:col-span-8 flex justify-center">
              <Reveal delay={0.2}>
                <div className="relative group">
                  {/* Pedestal Glow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-10 bg-amber-500/25 blur-xl rounded-full" />
                  
                  {/* PDF Document Container Frame */}
                  <div className="relative bg-white dark:bg-slate-900 border-4 border-[#d4af37] rounded-xl shadow-2xl w-full max-w-[340px] h-[480px] overflow-hidden transition-transform duration-500 group-hover:scale-102">
                    
                    {/* Live Browser PDF Viewer */}
                    <object
                      data="/images/sor/sor.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                      type="application/pdf"
                      className="w-full h-full border-0 rounded-lg"
                    >
                      <iframe
                        src="/images/sor/sor.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                        title="SOR Letter PDF Viewer"
                        className="w-full h-full border-0 rounded-lg"
                      />
                    </object>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Side Trusted Sidebar Card */}
            <div className="sm:col-span-4">
              <Reveal delay={0.3}>
                <div className="bg-white/95 dark:bg-card/90 border border-amber-300/60 dark:border-amber-500/30 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-5 text-slate-900 dark:text-foreground">
                  <div className="text-center pb-3 border-b border-slate-200 dark:border-border/60">
                    <div className="mx-auto w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-[#b8860b] dark:text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-black text-xs text-slate-900 dark:text-foreground mt-2 tracking-wider">
                      Trusted By The Government
                    </h4>
                    <div className="w-8 h-0.5 bg-[#b8860b] dark:bg-amber-400 mx-auto mt-2 rounded-full" />
                  </div>

                  {/* Sidebar Items */}
                  <div className="space-y-4 text-xs">
                    {/* Item 1 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-foreground">
                        <Landmark className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0" />
                        <span>Government Authorized</span>
                      </div>
                      <p className="text-slate-500 dark:text-muted-foreground text-[10px] leading-tight font-medium">
                        We are officially authorized supplier.
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-border/60">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-foreground">
                        <Award className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0" />
                        <span>Complete Transparency</span>
                      </div>
                      <p className="text-slate-500 dark:text-muted-foreground text-[10px] leading-tight font-medium">
                        All documents are genuine and verified.
                      </p>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-border/60">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-foreground">
                        <Handshake className="w-4 h-4 text-[#b8860b] dark:text-amber-400 shrink-0" />
                        <span>Built on Trust</span>
                      </div>
                      <p className="text-slate-500 dark:text-muted-foreground text-[10px] leading-tight font-medium">
                        Delivering quality with honesty and commitment.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
