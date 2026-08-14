import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHero, SectionHeading, Glass } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { useGetActiveGallery, GalleryImageData } from "@/api/gallery.api";
import { Maximize2, X, Sparkles, Tag, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Media Gallery & Project Showcase — Real Dreams Enterprises Limited" },
      {
        name: "description",
        content:
          "Take a visual tour of our Ranchi steel stockyards, heavy structural logistics, and state highway infrastructure projects across Jharkhand.",
      },
      { property: "og:title", content: "Media Gallery & Project Showcase — Real Dreams Enterprises Limited" },
      {
        property: "og:description",
        content: "Browse our Rashmi TMT steel yards, delivery fleets, and Jharkhand infrastructure sites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: galleryImages = [], isLoading } = useGetActiveGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeLightbox, setActiveLightbox] = useState<GalleryImageData | null>(null);

  // Extract unique active categories
  const categories = Array.from(new Set(galleryImages.map((item) => item.category)));

  const filteredImages = galleryImages.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  return (
    <main className="bg-background text-foreground relative">
      <PageHero
        eyebrow="Media Gallery · Field Work"
        title={
          <>
            Steel you can <span className="text-ember-gradient">depend on</span>
          </>
        }
        lead="Visual inspection of our Ranchi stockyards, heavy transport logistics, and Jharkhand state infrastructure projects."
        height="h-[60vh]"
        scene={
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
              alt="Project Gallery Background"
              className="h-full w-full object-cover opacity-20 scale-102 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-background/40 to-background" />
          </div>
        }
      />

      <section className="px-6 py-20 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Visual Index"
            title="Filter by Category"
            lead="Browse real-time warehouse images, mill test documentation, and site deliveries."
          />

          {/* Dynamic Category Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedCategory === "ALL"
                    ? "bg-ember text-white shadow-md shadow-ember/20 scale-105"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                All Photos ({galleryImages.length})
              </button>
              {categories.map((cat) => {
                const count = galleryImages.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat
                        ? "bg-ember text-white shadow-md shadow-ember/20 scale-105"
                        : "border border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Gallery Grid */}
        {isLoading ? (
          <div className="py-24 text-center text-xs text-muted-foreground">
            <Sparkles className="h-6 w-6 animate-spin mx-auto mb-2 text-ember" />
            Loading gallery photos...
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-20 text-center text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl">
            No media gallery photos found in this category.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.05}>
                <div onClick={() => setActiveLightbox(item)}>
                  <Glass className="group relative overflow-hidden rounded-2xl border border-border/70 p-2 transition-all duration-300 hover:border-ember/60 hover:shadow-2xl cursor-pointer">
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] font-bold text-foreground backdrop-blur-md">
                          <Tag className="h-3 w-3 text-ember" /> {item.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="rounded-full bg-ember/90 p-2 text-white shadow-lg backdrop-blur-md">
                          <Maximize2 className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 space-y-1">
                        <h4 className="font-display font-extrabold text-sm text-white drop-shadow-sm line-clamp-1">
                          {item.title}
                        </h4>
                        {item.caption && (
                          <p className="text-[11px] text-white/80 line-clamp-2 leading-tight">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </Glass>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-muted backdrop-blur-md cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-16/9 w-full bg-black">
                <img
                  src={activeLightbox.imageUrl}
                  alt={activeLightbox.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-6 space-y-2 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-ember/30 bg-ember/10 px-2.5 py-0.5 text-[10px] font-bold text-ember uppercase tracking-wider">
                    {activeLightbox.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-foreground">{activeLightbox.title}</h3>
                {activeLightbox.caption && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{activeLightbox.caption}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
