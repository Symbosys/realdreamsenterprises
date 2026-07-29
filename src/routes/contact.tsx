import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CampusZone } from "@/components/three/CampusScene";
import { SceneMount } from "@/components/SceneMount";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { SITE_CONTACT, FAQS } from "@/data/site";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, HelpCircle, Plus, Minus } from "lucide-react";

const CampusScene = lazy(() => import("@/components/three/CampusScene"));

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQ — Stambh Steel Works" },
      { name: "description", content: "Contact Stambh Steel: call 651-3511561 or email steelcrafttrading@gmail.com. Browse FAQs on TMT grades, mill test certificates, and delivery lead times." },
      { property: "og:title", content: "Contact & FAQ — Stambh Steel" },
      { property: "og:description", content: "Get in touch with our engineering desk and find answers to common steel specification questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [zone] = useState<CampusZone>("office");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Contact & FAQ · Direct Desk"
        title={<>Tell us what you're <span className="text-ember-gradient">building</span></>}
        lead="Quotes within one working day. Speak directly with our metallurgical and sales engineering desk."
        height="h-[76vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Mapping the campus">
            <CampusScene active={zone} />
          </SceneMount>
        }
      />

      {/* Direct Contact Banner */}
      <section className="border-border/60 bg-card/30 border-y px-6 py-10 md:px-12 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="border-border/80 hover:border-ember hover:bg-card/70 group flex items-center justify-between rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">Direct Phone Desk</p>
                <p className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">{SITE_CONTACT.phone}</p>
              </div>
            </div>
            <span className="border-border group-hover:border-ember group-hover:text-ember rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors">
              Call Now
            </span>
          </a>

          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="border-border/80 hover:border-ember hover:bg-card/70 group flex items-center justify-between rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">Official Email Support</p>
                <p className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">{SITE_CONTACT.email}</p>
              </div>
            </div>
            <span className="border-border group-hover:border-ember group-hover:text-ember rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors">
              Send Email
            </span>
          </a>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="grid gap-10 px-6 py-20 md:px-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Enquiry" title="Send a project brief" />
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              { id: "name", label: "Full Name", type: "text", placeholder: "e.g. Rahul Sharma" },
              { id: "email", label: "Work Email", type: "email", placeholder: "e.g. rahul@company.com" },
              { id: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. 651-3511561" },
              { id: "project", label: "Project Location / Tonnage", type: "text", placeholder: "e.g. Mumbai Commercial Tower / 250 MT" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="msg" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                Requirement & Specifications
              </label>
              <textarea
                id="msg"
                rows={4}
                placeholder="Mention required grades (Fe 550D, EN8, S355), delivery timeline, and bar sizes..."
                required
                className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-ember text-primary-foreground hover:shadow-ember flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:scale-[1.02]"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Received — We'll Call You Shortly
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Enquiry
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <Glass className="p-6 transition-all hover:border-ember/40">
            <div className="flex items-start gap-4">
              <div className="bg-ember/15 text-ember rounded-md p-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow text-ember">Headquarters & Works</p>
                <p className="mt-1 font-display text-base font-bold">{SITE_CONTACT.fullName}</p>
                <p className="text-muted-foreground mt-1 text-sm">{SITE_CONTACT.address}</p>
              </div>
            </div>
          </Glass>

          <Glass className="p-6 transition-all hover:border-ember/40">
            <div className="flex items-start gap-4">
              <div className="bg-ember/15 text-ember rounded-md p-3">
                <Phone className="h-5 w-5" />
              </div>
              <div className="w-full">
                <p className="eyebrow text-ember">Sales & Support Desk</p>
                <a href={`tel:${SITE_CONTACT.phone}`} className="hover:text-ember mt-1 block font-display text-lg font-bold transition-colors">
                  {SITE_CONTACT.phone}
                </a>
                <p className="text-muted-foreground mt-1 text-xs">Direct line for price quotes, BBS processing, and order updates.</p>
              </div>
            </div>
          </Glass>

          <Glass className="p-6 transition-all hover:border-ember/40">
            <div className="flex items-start gap-4">
              <div className="bg-ember/15 text-ember rounded-md p-3">
                <Mail className="h-5 w-5" />
              </div>
              <div className="w-full">
                <p className="eyebrow text-ember">Official Email Desk</p>
                <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-ember mt-1 block font-display text-base font-bold transition-colors">
                  {SITE_CONTACT.email}
                </a>
                <p className="text-muted-foreground mt-1 text-xs">Send purchase orders, specs, drawings, and MTC requests anytime.</p>
              </div>
            </div>
          </Glass>

          <Glass className="p-6 transition-all hover:border-ember/40">
            <div className="flex items-start gap-4">
              <div className="bg-ember/15 text-ember rounded-md p-3">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow text-ember">Desk Hours</p>
                <p className="mt-1 text-sm font-semibold">{SITE_CONTACT.hours}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="h-4 w-4" /> 24/7 Site Emergency Support Active
                </div>
              </div>
            </div>
          </Glass>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="border-t border-border/60 bg-card/10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:text-left">
            <span className="text-ember eyebrow flex items-center gap-2 justify-center sm:justify-start">
              <MapPin className="h-4 w-4 text-ember" /> Location & Directions
            </span>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              Visit Our Office in <span className="text-ember-gradient">Ranchi</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {SITE_CONTACT.address}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-md">
            <iframe
              title="Real Dream Enterprises Location Map"
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d1831.4122798689225!2d85.36615348346713!3d23.35836980059374!3m2!1i1024!2i768!4f13.1!2m1!1sReal%20Dream%20Enterprises%202nd%20Floor%2C%20Reena%20Tower%2C%20Behind%20Rajdhani%20Manya%20Tower%2C%20Piska%20More%2C%20Ranchi!5e0!3m2!1sen!2sus!4v1785322523366!5m2!1sen!2sus"
              className="h-[450px] w-full rounded-xl border-0 transition-all duration-500"
              style={{ filter: "invert(90%) hue-rotate(180deg) brightness(88%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      {/* Integrated FAQ Section */}
      <section className="border-t border-border/60 bg-card/20 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-ember eyebrow inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> Knowledge Base
            </span>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Frequently Asked <span className="text-ember-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm">
              Clear answers on steel grades, mill test certificates, minimum order quantities, delivery lead times & custom detailing.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <Glass className="overflow-hidden transition-all duration-300 hover:border-ember/40">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <span className="font-display text-base font-bold text-foreground md:text-lg">{f.q}</span>
                    <span className="bg-ember/15 text-ember flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300">
                      {openFaq === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="border-t border-border/40 px-6 py-5">
                          <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


