import { Link } from "@tanstack/react-router";
import { POSTS } from "@/data/site";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function LatestNews() {
  const root = useGsapReveal<HTMLElement>((tl) => {
    tl.from("[data-n='head'] > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }).from(
      "[data-n='card']",
      { y: 44, opacity: 0, duration: 0.85, stagger: 0.13 },
      "<0.2",
    );
  });

  const posts = POSTS.slice(0, 3);

  return (
    <section ref={root} id="latest-news" className="relative px-6 py-24 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-n="head" className="max-w-2xl">
          <p className="eyebrow">Latest News</p>
          <h2 className="mt-3 text-3xl md:text-5xl">
            Notes from the <span className="text-ember-gradient">mill floor</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="border-border hover:border-ember hover:text-ember rounded-sm border px-6 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
        >
          All articles
        </Link>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            data-n="card"
            className="bg-card hover:bg-secondary/60 group flex flex-col p-8 transition-colors"
          >
            <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
              <span className="text-ember font-bold">{p.category}</span>
              <span className="text-muted-foreground">{p.readMinutes} min read</span>
            </div>
            <h3 className="font-display mt-5 text-xl font-bold leading-snug">{p.title}</h3>
            <p className="text-muted-foreground mt-3 text-sm">{p.excerpt}</p>
            <span className="text-muted-foreground mt-auto pt-6 text-[11px] tracking-[0.22em] uppercase">
              {new Date(p.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="text-ember mt-3 text-[11px] tracking-[0.25em] uppercase">Read →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
