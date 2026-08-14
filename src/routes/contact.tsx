import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Glass, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { SITE_CONTACT, FAQS } from "@/data/site";
import { useGetWebConfig, getConfigValue } from "@/api/webconfig.api";
import { useSubmitEnquiry } from "@/api/enquiry.api";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  Zap,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQ — Real Dreams Enterprises Limited" },
      {
        name: "description",
        content:
          "Contact Real Dreams Enterprises Limited: call 651-3511561 or email steelcrafttrading@gmail.com. Submit project enquiries for Rashmi TMT steel rates and SOR letters.",
      },
      { property: "og:title", content: "Contact & FAQ — Real Dreams Enterprises Limited" },
      {
        property: "og:description",
        content:
          "Get in touch with our engineering desk and find answers to common steel specification questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submitEnquiryMutation = useSubmitEnquiry();
  const { data: webConfig, isLoading } = useGetWebConfig();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  // Dynamic contact info with static fallbacks
  const phone = getConfigValue(webConfig, "contact.phone", SITE_CONTACT.phone);
  const email = getConfigValue(webConfig, "contact.email", SITE_CONTACT.email);
  const address = getConfigValue(webConfig, "contact.address", SITE_CONTACT.address);
  const regdAddress = getConfigValue(webConfig, "contact.regdAddress", SITE_CONTACT.regdAddress);
  const stateAddress = getConfigValue(webConfig, "contact.stateAddress", SITE_CONTACT.stateAddress);
  const fullName = getConfigValue(webConfig, "contact.fullName", SITE_CONTACT.fullName);
  const hours = getConfigValue(webConfig, "contact.hours", SITE_CONTACT.hours);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectLocation: "",
    requirementType: "Rashmi TMT Bars (8-32mm)",
    message: "",
  });

  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.email || !form.phone || !form.message) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const result = await submitEnquiryMutation.mutateAsync(form);
      setSubmittedReference(result.enquiryNumber);
      setForm({
        name: "",
        email: "",
        phone: "",
        projectLocation: "",
        requirementType: "Rashmi TMT Bars (8-32mm)",
        message: "",
      });
    } catch (err: any) {
      setFormError(err.message || "Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <main className="bg-background text-foreground">
      {/* Clean & Professional Header */}
      <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-background via-card/30 to-background pt-32 pb-16 md:pt-36 md:pb-20 px-6 md:px-12">
        {/* Subtle radial ambient background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-150 -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ember backdrop-blur-md"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Contact & FAQ · Direct Engineering Desk</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Tell us what you're <span className="text-ember-gradient">building</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            Get quotes within one working day. Speak directly with our metallurgical experts and sales engineering desk.
          </motion.p>

          {/* Quick trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6"
          >
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3.5 py-2 text-xs font-medium text-foreground backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-ember" />
              <span>Quotes in 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3.5 py-2 text-xs font-medium text-foreground backdrop-blur-md">
              <Phone className="h-3.5 w-3.5 text-ember" />
              <span>Direct Phone Desk</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3.5 py-2 text-xs font-medium text-foreground backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>24/7 Site Emergency Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="border-border/60 bg-card/30 border-y px-6 py-10 md:px-12 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {isLoading ? (
            <>
              <div className="border-border/80 flex items-center justify-between rounded-lg border bg-card/50 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="bg-ember/20 flex h-12 w-12 items-center justify-center rounded-full" />
                  <div className="space-y-2">
                    <div className="h-3 w-28 bg-muted/60 rounded" />
                    <div className="h-6 w-36 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-7 w-20 bg-muted/40 rounded-full" />
              </div>
              <div className="border-border/80 flex items-center justify-between rounded-lg border bg-card/50 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="bg-ember/20 flex h-12 w-12 items-center justify-center rounded-full" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-muted/60 rounded" />
                    <div className="h-5 w-48 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-7 w-24 bg-muted/40 rounded-full" />
              </div>
            </>
          ) : (
            <>
              <a
                href={`tel:${phone}`}
                className="border-border/80 hover:border-ember hover:bg-card/70 group flex items-center justify-between rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                      Direct Phone Desk
                    </p>
                    <p className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {phone}
                    </p>
                  </div>
                </div>
                <span className="border-border group-hover:border-ember group-hover:text-ember rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors">
                  Call Now
                </span>
              </a>

              <a
                href={`mailto:${email}`}
                className="border-border/80 hover:border-ember hover:bg-card/70 group flex items-center justify-between rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-ember/15 text-ember group-hover:bg-ember group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                      Official Email Support
                    </p>
                    <p className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
                      {email}
                    </p>
                  </div>
                </div>
                <span className="border-border group-hover:border-ember group-hover:text-ember rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors">
                  Send Email
                </span>
              </a>
            </>
          )}
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="grid gap-10 px-6 py-20 md:px-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Enquiry" title="Send a project brief" />

          {submittedReference && (
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" /> Enquiry Received Successfully!
              </div>
              <p className="text-xs text-muted-foreground">
                Your tracking reference number is: <span className="font-extrabold text-foreground">{submittedReference}</span>. Our Ranchi engineering desk will contact you shortly.
              </p>
            </div>
          )}

          {formError && (
            <div className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-bold text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> {formError}
            </div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                  Work Email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. rahul@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +91 94311 02938"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectLocation" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                  Project Location / District
                </label>
                <input
                  id="projectLocation"
                  type="text"
                  placeholder="e.g. Ranchi / Jamshedpur"
                  value={form.projectLocation}
                  onChange={(e) => setForm({ ...form, projectLocation: e.target.value })}
                  className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="requirementType" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                  Requirement Category
                </label>
                <select
                  id="requirementType"
                  value={form.requirementType}
                  onChange={(e) => setForm({ ...form, requirementType: e.target.value })}
                  className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors text-foreground"
                >
                  <option value="Rashmi TMT Bars (8-32mm)">Rashmi TMT Bars (8-32mm)</option>
                  <option value="JSW Neosteel TMT Bars">JSW Neosteel TMT Bars</option>
                  <option value="Structural Steel & Beams">Structural Steel & Beams</option>
                  <option value="Steel Rods & Bright Bars">Steel Rods & Bright Bars</option>
                  <option value="Government Bulk Tender / SOR">Government Bulk Tender / SOR</option>
                  <option value="General Price Quote">General Price Quote</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="msg" className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                Requirement Details & Specifications *
              </label>
              <textarea
                id="msg"
                rows={4}
                placeholder="Mention required grades (Fe 550D, Fe 500D), estimated tonnage, delivery timeline..."
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border-border/70 bg-card/50 focus:border-ember focus:bg-card mt-1 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitEnquiryMutation.isPending}
              className="bg-ember text-primary-foreground hover:shadow-ember flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              {submitEnquiryMutation.isPending ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Enquiry Brief
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          {isLoading ? (
            <div className="space-y-5">
              <Glass className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/20 h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 w-24 bg-muted/60 rounded" />
                    <div className="h-4 w-full bg-muted/40 rounded" />
                  </div>
                </div>
              </Glass>
              <Glass className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/20 h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 w-28 bg-muted/60 rounded" />
                    <div className="h-4 w-full bg-muted/40 rounded" />
                  </div>
                </div>
              </Glass>
              <Glass className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/20 h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 w-32 bg-muted/60 rounded" />
                    <div className="h-6 w-36 bg-muted rounded" />
                  </div>
                </div>
              </Glass>
              <Glass className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/20 h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 w-28 bg-muted/60 rounded" />
                    <div className="h-5 w-48 bg-muted rounded" />
                  </div>
                </div>
              </Glass>
            </div>
          ) : (
            <>
              <Glass className="p-6 transition-all hover:border-ember/40">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/15 text-ember rounded-md p-3 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="eyebrow text-ember font-bold text-xs uppercase tracking-wider">Regd. Office</p>
                    <p className="text-foreground mt-1 text-sm font-semibold leading-relaxed">{regdAddress}</p>
                  </div>
                </div>
              </Glass>

              <Glass className="p-6 transition-all hover:border-ember/40">
                <div className="flex items-start gap-4">
                  <div className="bg-ember/15 text-ember rounded-md p-3 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="eyebrow text-ember font-bold text-xs uppercase tracking-wider">State Office (Ranchi)</p>
                    <p className="text-foreground mt-1 text-sm font-semibold leading-relaxed">{stateAddress}</p>
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
                    <a
                      href={`tel:${phone}`}
                      className="hover:text-ember mt-1 block font-display text-lg font-bold transition-colors"
                    >
                      {phone}
                    </a>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Direct line for price quotes, BBS processing, and order updates.
                    </p>
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
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-ember mt-1 block font-display text-base font-bold transition-colors"
                    >
                      {email}
                    </a>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Send project specifications, BOQ spreadsheets, or SOR letter requests.
                    </p>
                  </div>
                </div>
              </Glass>
            </>
          )}

          <Glass className="p-6 transition-all hover:border-ember/40">
            <div className="flex items-start gap-4">
              <div className="bg-ember/15 text-ember rounded-md p-3">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow text-ember">Desk Hours</p>
                {isLoading ? (
                  <div className="h-4 w-48 bg-muted/60 rounded animate-pulse mt-2" />
                ) : (
                  <p className="mt-1 text-sm font-semibold">{hours}</p>
                )}
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
            <p className="text-muted-foreground mt-2 text-sm">{address}</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-md">
            <iframe
              title="Real Dream Enterprises Location Map"
              src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1786606393282!5m2!1sen!2sin!6m8!1m7!1s21t4NU29ZxM9PndiMH8xdA!2m2!1d23.38235826218549!2d85.29564485712433!3f12.370699378279223!4f-4.201476866296034!5f0.4000000000000002"
              className="h-112.5 w-full rounded-xl border-0 transition-all duration-500"
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
              Clear answers on steel grades, mill test certificates, minimum order quantities,
              delivery lead times & custom detailing.
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
                    <span className="font-display text-base font-bold text-foreground md:text-lg">
                      {f.q}
                    </span>
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
