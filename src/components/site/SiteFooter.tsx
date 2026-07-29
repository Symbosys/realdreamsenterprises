import { Link } from "@tanstack/react-router";
import { lazy } from "react";
import { motion } from "motion/react";
import { SceneMount } from "@/components/SceneMount";
import { NAV } from "@/data/site";

const SkylineNightScene = lazy(() => import("@/components/three/SkylineNightScene"));

const SOCIALS = ["LinkedIn", "X", "YouTube", "Instagram"];

export function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden">
      <div className="relative h-[62vh] min-h-[420px] w-full">
        <SceneMount className="absolute inset-0" label="Lighting the skyline">
          <SkylineNightScene />
        </SceneMount>
        <div className="from-background via-background/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl font-extrabold uppercase md:text-4xl"
          >
            Stambh<span className="text-ember">.</span>
          </motion.div>
          <p className="text-muted-foreground mt-3 text-[11px] tracking-[0.3em] uppercase">
            Engineered · Certified · Delivered
          </p>
        </div>
      </div>

      <div className="relative px-6 pb-12 md:px-12">
        <div className="rule-line" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="max-w-sm text-2xl md:text-3xl">
              Specify the steel before you pour the concrete.
            </h3>
            <Link
              to="/contact"
              className="bg-ember text-primary-foreground mt-6 inline-flex items-center rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-transform hover:scale-[1.03]"
            >
              Request a quote
            </Link>
          </div>
          <nav className="flex flex-col gap-2">
            <p className="eyebrow mb-2">Explore</p>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-ember text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <p className="eyebrow mb-2">Connect</p>
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-muted-foreground hover:text-ember group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                <span className="bg-border group-hover:bg-ember h-px w-4 transition-all group-hover:w-7" />
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground mt-14 flex flex-col items-start justify-between gap-4 text-[11px] tracking-[0.2em] uppercase md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Stambh Steel</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border-border hover:border-ember hover:text-ember group flex items-center gap-3 rounded-sm border px-4 py-2 transition-colors"
          >
            <span className="relative flex h-4 w-3 items-end justify-center overflow-hidden">
              <span className="bg-ember h-3 w-1.5 transition-transform duration-500 group-hover:-translate-y-4" />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
