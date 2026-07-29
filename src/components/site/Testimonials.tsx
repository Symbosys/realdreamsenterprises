import { useCallback, useEffect, useState } from "react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const ITEMS = [
  {
    name: "Vikrant Pandey",
    role: "Project Director",
    quote:
      "Working with Real Dreams Construction has been a fantastic experience. Their TMT bars offer exceptional strength and reliability, ensuring the safety and longevity of our structures. Professional service, consistent quality, and timely deliveries make them our go-to supplier.",
  },
  {
    name: "Aakriti",
    role: "Structural Consultant",
    quote:
      "Real Dreams Construction's TMT bars have been an absolute game-changer for our projects. The quality, strength, and reliability are unmatched. Their excellent customer service and timely delivery ensure every project is a success!",
  },
  {
    name: "Avinash Kumar",
    role: "Site Engineer",
    quote:
      "Real Dreams Construction TMT bars have truly elevated the quality of our construction projects. The strength and durability of their products are top-notch, and their commitment to on-time delivery and customer satisfaction is unparalleled!",
  },
];

export function Testimonials() {
  const root = useGsapReveal<HTMLElement>((tl) => {
    tl.from("[data-t='head'] > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }).from(
      "[data-t='card']",
      { y: 40, opacity: 0, duration: 0.85, stagger: 0.14 },
      "<0.2",
    );
  });

  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const set = () =>
      setPerView(window.innerWidth < 720 ? 1 : window.innerWidth < 1100 ? 2 : 3);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const pages = Math.max(1, ITEMS.length - perView + 1);
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + pages) % pages), [pages]);

  useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1));
  }, [pages]);

  useEffect(() => {
    if (pages < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % pages), 5200);
    return () => window.clearInterval(id);
  }, [pages]);

  return (
    <section ref={root} id="testimonials" className="relative overflow-hidden px-6 py-24 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-t="head" className="max-w-2xl">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 text-3xl md:text-5xl">
            We will always be <span className="text-ember-gradient">ready to serve</span> you
          </h2>
          <p className="text-muted-foreground mt-5">
            Hear from our satisfied clients about the quality, reliability, and exceptional service
            they&rsquo;ve experienced with our products and solutions.
          </p>
        </div>
        <div className="flex gap-3">
          {[
            { l: "←", d: -1 },
            { l: "→", d: 1 },
          ].map((b) => (
            <button
              key={b.l}
              type="button"
              aria-label={b.d < 0 ? "Previous testimonial" : "Next testimonial"}
              onClick={() => go(b.d)}
              className="border-border hover:border-ember hover:text-ember h-11 w-11 rounded-full border transition-colors"
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {ITEMS.map((t) => (
            <figure
              key={t.name}
              data-t="card"
              className="shrink-0 px-3"
              style={{ width: `${100 / perView}%` }}
            >
              <div className="border-border/70 bg-card/45 relative h-full rounded-sm border p-8 backdrop-blur-xl">
                <span className="text-ember/30 font-display absolute top-4 right-6 text-6xl leading-none">
                  &rdquo;
                </span>
                <div className="flex items-center gap-4">
                  <span className="bg-secondary text-ember font-display flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold">
                    {t.name.charAt(0)}
                  </span>
                  <figcaption>
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
                      {t.role}
                    </div>
                  </figcaption>
                </div>
                <blockquote className="text-muted-foreground mt-6 text-sm leading-relaxed">
                  {t.quote}
                </blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "bg-ember w-8" : "bg-border w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
