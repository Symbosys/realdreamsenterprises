import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";
import type { CampusZone } from "@/components/three/CampusScene";
import { SceneMount } from "@/components/SceneMount";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";

const CampusScene = lazy(() => import("@/components/three/CampusScene"));

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Stambh Steel — Quotes, Specs and Site Support" },
      { name: "description", content: "Talk to the Stambh Steel team: request a quote, ask for mill test certificates, or plan delivery windows around your pour schedule." },
      { property: "og:title", content: "Contact Stambh Steel" },
      { property: "og:description", content: "Explore our campus in 3D and reach the right desk directly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [zone] = useState<CampusZone>("office");

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Contact · Pune campus"
        title={<>Tell us what you're <span className="text-ember-gradient">building</span></>}
        lead="Quotes within one working day. Technical questions answered by engineers, not a call centre."
        height="h-[76vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Mapping the campus">
            <CampusScene active={zone} />
          </SceneMount>
        }
      />

      <section className="grid gap-10 px-6 py-20 md:px-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Enquiry" title="Send a brief" />
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Work email", type: "email" },
              { id: "project", label: "Project / city", type: "text" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  className="border-border bg-card/50 focus:border-ember mt-1 w-full rounded-sm border px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="msg" className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">
                Requirement
              </label>
              <textarea
                id="msg"
                rows={5}
                required
                className="border-border bg-card/50 focus:border-ember mt-1 w-full rounded-sm border px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-ember text-primary-foreground rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-transform hover:scale-[1.03]"
            >
              {sent ? "Received — we'll reply shortly" : "Send enquiry"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {[
            { t: "Head office", d: "Stambh Steel Works, Hinjawadi Phase II, Pune 411057" },
            { t: "Sales desk", d: "projects@stambhsteel.example · +91 20 4000 1994" },
            { t: "Technical support", d: "engineering@stambhsteel.example — specs, MTCs and detailing" },
            { t: "Hours", d: "Mon–Sat, 09:00–19:00 IST. Site emergencies answered 24/7." },
          ].map((c) => (
            <Glass key={c.t} className="p-6">
              <p className="eyebrow">{c.t}</p>
              <p className="mt-2 text-sm">{c.d}</p>
            </Glass>
          ))}
        </div>
      </section>
    </main>
  );
}
