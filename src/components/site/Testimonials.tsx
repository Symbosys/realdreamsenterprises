import { useGetActiveTestimonials } from "@/api/testimonial.api";
import { Star } from "lucide-react";

const FALLBACK_ITEMS = [
  {
    id: 1,
    name: "Vikrant Pandey",
    role: "Project Director",
    quote:
      "Working with Real Dreams Construction has been a fantastic experience. Their TMT bars offer exceptional strength and reliability, ensuring the safety and longevity of our structures. Professional service, consistent quality, and timely deliveries make them our go-to supplier.",
    avatarUrl: null as string | null,
    company: "Metro Infra Build",
    rating: 5,
  },
  {
    id: 2,
    name: "Aakriti",
    role: "Structural Consultant",
    quote:
      "Real Dreams Construction's TMT bars have been an absolute game-changer for our projects. The quality, strength, and reliability are unmatched. Their excellent customer service and timely delivery ensure every project is a success!",
    avatarUrl: null as string | null,
    company: "Apex Design Studio",
    rating: 5,
  },
  {
    id: 3,
    name: "Avinash Kumar",
    role: "Site Engineer",
    quote:
      "Real Dreams Construction TMT bars have truly elevated the quality of our construction projects. The strength and durability of their products are top-notch, and their commitment to on-time delivery and customer satisfaction is unparalleled!",
    avatarUrl: null as string | null,
    company: "Jharkhand Heights",
    rating: 5,
  },
];

export function Testimonials() {
  const { data: dbTestimonials = [] } = useGetActiveTestimonials();
  const rawItems = dbTestimonials.length > 0 ? dbTestimonials : FALLBACK_ITEMS;

  // Duplicate items array for seamless infinite marquee loop (matching HomeClientsMarquee)
  const marqueeItems = [...rawItems, ...rawItems, ...rawItems, ...rawItems];

  return (
    <section id="testimonials" className="relative py-20 bg-background border-t border-border/40 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-10 text-center">
        <p className="eyebrow text-ember font-bold text-xs uppercase tracking-widest">Testimonials</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          What Our <span className="text-ember-gradient">Clients Say</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Hear from our satisfied project directors, consultants, and site engineers across Jharkhand about the quality, strength & reliability of our TMT bars.
        </p>
      </div>

      {/* Marquee Track 1 (Left to Right Infinite Scroll) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 bg-linear-to-l from-background via-background/80 to-transparent" />

        <div className="animate-marquee-reverse flex gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`t1-${item.id || item.name}-${idx}`}
              className="group relative border border-border/70 bg-card/70 hover:border-ember/70 hover:bg-card flex w-[340px] sm:w-[400px] shrink-0 flex-col justify-between rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:scale-102 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-ember/30 font-display text-3xl font-black leading-none select-none">
                    &rdquo;
                  </span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border/50">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover border border-ember/30 shrink-0"
                  />
                ) : (
                  <span className="bg-ember/15 text-ember font-display flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold border border-ember/30 shrink-0">
                    {item.name.charAt(0)}
                  </span>
                )}
                <div className="overflow-hidden">
                  <div className="font-display text-sm font-bold text-foreground truncate">{item.name}</div>
                  <div className="text-muted-foreground text-[11px] tracking-wider uppercase font-semibold truncate">
                    {item.role} {item.company ? `· ${item.company}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Right to Left Infinite Scroll) */}
      <div className="relative w-full overflow-hidden py-3 mt-1">
        {/* Left & Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 bg-linear-to-l from-background via-background/80 to-transparent" />

        <div className="animate-marquee flex gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`t2-${item.id || item.name}-${idx}`}
              className="group relative border border-border/70 bg-card/70 hover:border-ember/70 hover:bg-card flex w-[340px] sm:w-[400px] shrink-0 flex-col justify-between rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:scale-102 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-ember/30 font-display text-3xl font-black leading-none select-none">
                    &rdquo;
                  </span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border/50">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover border border-ember/30 shrink-0"
                  />
                ) : (
                  <span className="bg-ember/15 text-ember font-display flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold border border-ember/30 shrink-0">
                    {item.name.charAt(0)}
                  </span>
                )}
                <div className="overflow-hidden">
                  <div className="font-display text-sm font-bold text-foreground truncate">{item.name}</div>
                  <div className="text-muted-foreground text-[11px] tracking-wider uppercase font-semibold truncate">
                    {item.role} {item.company ? `· ${item.company}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
