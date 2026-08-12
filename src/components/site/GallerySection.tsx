import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Glass, SectionHeading } from "./Primitives";
import { Reveal } from "./Reveal";
import { useGetActiveGallery, GalleryImageData } from "@/api/gallery.api";
import { Image as ImageIcon, Sparkles, X, Maximize2, Tag } from "lucide-react";

export function GallerySection() {
  const { data: galleryImages = [], isLoading } = useGetActiveGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeLightbox, setActiveLightbox] = useState<GalleryImageData | null>(null);

  // Extract unique active categories
  const categories = Array.from(new Set(galleryImages.map((item) => item.category)));

  const filteredImages = galleryImages.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-card/20 px-6 py-24 md:px-12">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-120 w-160 rounded-full bg-ember/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Warehouse & Field Work"
            title="Media Gallery & Project Showcase"
            lead="Take a visual tour of our Ranchi steel stockyards, heavy structural logistics, and state highway infrastructure projects."
          />

          {/* Category Filter Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === "ALL"
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
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
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

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-xs text-muted-foreground">
            <Sparkles className="h-6 w-6 animate-spin mx-auto mb-2 text-ember" />
            Loading gallery photos...
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-16 text-center text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl">
            No gallery images available at the moment.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.05}>
                <div onClick={() => setActiveLightbox(item)}>
                  <Glass
                    className="group relative overflow-hidden rounded-2xl border border-border/70 p-2 transition-all duration-300 hover:border-ember/60 hover:shadow-2xl cursor-pointer"
                  >
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
      </div>

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
    </section>
  );
}
