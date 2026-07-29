import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SceneMount } from "@/components/SceneMount";
import { Glass, PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/data/site";

const BlueprintScene = lazy(() => import("@/components/three/BlueprintScene"));

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Grades, Certificates, Lead Times | Stambh Steel" },
      { name: "description", content: "Answers on TMT grades, mill test certificates, minimum order quantities, delivery lead times and technical support from Stambh Steel." },
      { property: "og:title", content: "Stambh Steel FAQ" },
      { property: "og:description", content: "Holographic answer cards for the questions buyers actually ask." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="FAQ · Straight answers"
        title={<>Questions, answered <span className="text-ember-gradient">precisely</span></>}
        height="h-[66vh]"
        scene={
          <SceneMount className="absolute inset-0" label="Drafting">
            <BlueprintScene />
          </SceneMount>
        }
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading eyebrow="Knowledge" title="Holographic answer cards" />
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.03}>
              <Glass className="overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="text-lg font-semibold">{f.q}</span>
                  <span className={`text-ember transition-transform ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-muted-foreground px-6 pb-6 text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Glass>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="bg-ember text-primary-foreground inline-flex rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase">
            Still stuck? Ask an engineer
          </Link>
        </div>
      </section>
    </main>
  );
}
