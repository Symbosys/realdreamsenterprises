import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

/** Cinematic cross-fade with a morphing curtain between routes. */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname, isLoading } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, isLoading: s.status === "pending" }),
  });

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="curtain"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="from-background/95 pointer-events-none fixed inset-0 z-60 bg-linear-to-b to-transparent"
          >
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
              <span className="bg-ember h-1.5 w-1.5 animate-pulse rounded-full" />
              <span className="eyebrow">Loading</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
