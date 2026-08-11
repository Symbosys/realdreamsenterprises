import { CLIENTS } from "@/data/clients";

export function HomeClientsMarquee() {
  // Duplicate array for seamless infinite scrolling loop
  const marqueeItems = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative py-20 bg-background border-t border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-10 text-center">
        <p className="eyebrow text-ember">Trusted Partners</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Our <span className="text-ember-gradient">Valued Clients</span>
        </h2>
      </div>

      {/* Marquee Track 1 (Forward Infinite Scroll - IMAGE ONLY DEFAULT, NAME ON HOVER) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <div className="animate-marquee flex gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group relative border border-border/70 bg-card/70 hover:border-ember/70 hover:bg-card flex h-24 w-60 shrink-0 items-center justify-center rounded-xl p-4 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Only by Default */}
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-12 w-auto max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105"
              />

              {/* Name Display on Hover Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-background/90 px-3 py-2 text-center opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 border border-ember/50 shadow-md">
                <span className="font-display text-xs font-extrabold tracking-wider text-foreground">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Reverse Infinite Scroll - IMAGE ONLY DEFAULT, NAME ON HOVER) */}
      <div className="relative w-full overflow-hidden py-4 mt-2">
        {/* Left & Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <div className="animate-marquee-reverse flex gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`rev-${item.name}-${idx}`}
              className="group relative border border-border/70 bg-card/70 hover:border-ember/70 hover:bg-card flex h-24 w-60 shrink-0 items-center justify-center rounded-xl p-4 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Only by Default */}
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-12 w-auto max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105"
              />

              {/* Name Display on Hover Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-background/90 px-3 py-2 text-center opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 border border-ember/50 shadow-md">
                <span className="font-display text-xs font-extrabold tracking-wider text-foreground">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
