import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { lazy } from "react";
import { SceneMount } from "@/components/SceneMount";
import { Reveal } from "@/components/site/Reveal";
import { POSTS, type Post } from "@/data/site";

const BlueprintScene = lazy(() => import("@/components/three/BlueprintScene"));

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable — Stambh Steel" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Stambh Steel Insights` },
        { name: "description", content: post.excerpt.slice(0, 155) },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: Post };
  return (
    <main className="bg-background text-foreground">
      <section className="relative h-[62vh] w-full overflow-hidden">
        <SceneMount className="absolute inset-0" label="Drafting">
          <BlueprintScene />
        </SceneMount>
        <div className="from-background via-background/30 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 md:px-12">
          <p className="eyebrow">{post.category} · {post.readMinutes} min read</p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl">{post.title}</h1>
          <p className="text-muted-foreground mt-4 text-sm tracking-[0.18em] uppercase">
            {post.author} · {post.date}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xl leading-relaxed md:text-2xl">{post.excerpt}</p>
        {post.sections.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.04} className="mt-12">
            <h2 className="text-2xl md:text-3xl">{s.heading}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
        <div className="border-border mt-16 border-t pt-8">
          <Link to="/blog" className="text-ember text-[11px] tracking-[0.25em] uppercase">
            ← All insights
          </Link>
        </div>
      </article>
    </main>
  );
}
