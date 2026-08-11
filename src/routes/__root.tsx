import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageTransition } from "@/components/site/PageTransition";
import { SceneMount } from "@/components/SceneMount";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { lazy } from "react";

const RobotScene = lazy(() => import("@/components/three/RobotScene"));

function NotFoundComponent() {
  return (
    <main className="bg-background text-foreground relative min-h-screen">
      <section className="relative h-screen w-full overflow-hidden">
        <SceneMount className="absolute inset-0" label="Sending the site robot">
          <RobotScene />
        </SceneMount>
        <div className="from-background via-background/25 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:px-12">
          <p className="eyebrow mb-4">Error 404 · Structure incomplete</p>
          <h1 className="max-w-3xl text-5xl leading-[0.95] md:text-7xl">
            This floor hasn't been <span className="text-ember-gradient">built yet</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-lg">
            Our site robot is still looking for the page you asked for. The cranes keep working
            meanwhile — head back to solid ground.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="bg-ember text-primary-foreground inline-flex items-center rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-transform hover:scale-[1.03]"
            >
              Back to home
            </Link>
            <Link
              to="/products"
              className="border-border hover:border-ember hover:text-ember inline-flex items-center rounded-sm border px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stambh Steel — Cinematic 3D Construction Materials Experience" },
      {
        name: "description",
        content:
          "An immersive 3D showroom for TMT bars, structural steel and engineering solutions — cinematic construction storytelling, interactive product models and smart-city visualisation.",
      },
      { name: "author", content: "Stambh Steel" },
      { property: "og:title", content: "Stambh Steel — Cinematic 3D Construction Materials Experience" },
      {
        property: "og:description",
        content: "An immersive 3D showroom for TMT bars, structural steel and engineering solutions — cinematic construction storytelling, interactive product models and smart-city visualisation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Stambh Steel — Cinematic 3D Construction Materials Experience" },
      { name: "twitter:description", content: "An immersive 3D showroom for TMT bars, structural steel and engineering solutions — cinematic construction storytelling, interactive product models and smart-city visualisation." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(m){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useSmoothScroll();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
      const isDark = (e ?? media).matches;
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();

    if (media.addEventListener) {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    } else if ("addListener" in media) {
      (media as any).addListener(applyTheme);
      return () => (media as any).removeListener(applyTheme);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <PageTransition>
        <Outlet />
      </PageTransition>
      <SiteFooter />
    </QueryClientProvider>
  );
}

