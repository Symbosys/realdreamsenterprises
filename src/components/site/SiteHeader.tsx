import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV } from "@/data/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "border-border/60 bg-background/80 border-b backdrop-blur-xl" : ""
        }`}
    >
      <div className="flex items-center justify-between px-6 py-1 md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo/logo.png" alt="Real Dreams Enterprises logo" className="h-20 md:h-24 w-auto object-contain" />
          <span className="sr-only">Real Dreams Enterprises</span>
        </Link>

        <nav className="hidden gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground hover:text-foreground relative text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="border-border hover:border-ember hover:text-ember hidden rounded-sm border px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors sm:inline-flex"
          >
            Enquire
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="border-border flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-sm border lg:hidden"
          >
            <span
              className={`bg-foreground h-px w-4 transition-transform ${open ? "translate-y-0.75 rotate-45" : ""}`}
            />
            <span
              className={`bg-foreground h-px w-4 transition-transform ${open ? "-translate-y-0.75 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-border/50 text-muted-foreground hover:text-ember border-b py-3 text-xs font-semibold tracking-[0.22em] uppercase"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
