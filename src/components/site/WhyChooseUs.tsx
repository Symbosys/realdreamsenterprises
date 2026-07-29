import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const PROMISES = [
  "We Have Professional Workers",
  "On Time In Progress",
  "Friendly To Serve Customers",
  "Give The Best & Fair",
];

const CONTACT = [
  { k: "Head office", v: "2nd Floor, Reena Tower, Behind Rajdhani Manya Tower, Piska More, Ranchi" },
  { k: "Working hours", v: "Mon - Fri : 9:00 am - 5:00 pm" },
  { k: "Call us", v: "0651-3511561" },
];

const SKILLS = [
  { label: "Equipements Used", value: 92 },
  { label: "Factories Production", value: 82 },
  { label: "Management & Services", value: 97 },
  { label: "Modern Technology", value: 73 },
];

function SkillBar({ label, value }: { label: string; value: number }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const num = numRef.current;
    if (!bar || !num) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      bar.style.width = `${value}%`;
      num.textContent = `${value}%`;
      return;
    }
    let io: IntersectionObserver | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.fromTo(bar, { width: "0%" }, { width: `${value}%`, duration: 1.4 }).to(
        { v: 0 },
        {
          v: value,
          duration: 1.4,
          ease: "power2.out",
          onUpdate() {
            num.textContent = `${Math.round((this.targets()[0] as { v: number }).v)}%`;
          },
        },
        "<",
      );
      io = new IntersectionObserver(
        (e) => {
          if (e.some((x) => x.isIntersecting)) {
            io?.disconnect();
            tl.play();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(bar);
    });
    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, [value]);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold tracking-[0.18em] uppercase">{label}</span>
        <span ref={numRef} className="text-ember font-display text-lg font-extrabold">
          0%
        </span>
      </div>
      <span className="bg-border mt-3 block h-0.75 w-full overflow-hidden rounded-full">
        <span
          ref={barRef}
          className="from-ember to-ember/40 block h-full w-0 rounded-full bg-linear-to-r"
        />
      </span>
    </div>
  );
}

export function WhyChooseUs() {
  const root = useGsapReveal<HTMLElement>((tl) => {
    tl.from("[data-w='head'] > *", { y: 32, opacity: 0, duration: 0.8, stagger: 0.1 })
      .from("[data-w='promise']", { y: 26, opacity: 0, duration: 0.7, stagger: 0.09 }, "<0.2")
      .from("[data-w='info']", { x: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "<0.1")
      .from("[data-w='expert']", { y: 34, opacity: 0, duration: 0.8, stagger: 0.12 }, "<0.15");
  });

  return (
    <section ref={root} id="why-choose-us" className="relative px-6 py-24 md:px-12">
      <div data-w="head" className="max-w-2xl">
        <p className="eyebrow">Why Choose Us</p>
        <h2 className="mt-3 text-3xl md:text-5xl">
          Unmatched quality, <span className="text-ember-gradient">trust</span>, and service.
        </h2>
        <p className="text-muted-foreground mt-5 text-base">
          Experience exceptional quality, reliable service, and trusted solutions tailored to meet
          your needs with dedication and expertise.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h3 className="font-display text-2xl font-bold md:text-3xl">
            Are Always Ready To Serve
          </h3>
          <p className="text-muted-foreground mt-4 max-w-xl">
            We are dedicated and always prepared to assist, ensuring fast, reliable solutions for
            all your needs, anytime, anywhere.
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {PROMISES.map((p) => (
              <li
                key={p}
                data-w="promise"
                className="bg-card hover:bg-secondary/60 flex items-center gap-3 p-5 transition-colors"
              >
                <span className="border-ember/60 text-ember flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]">
                  ✓
                </span>
                <span className="text-sm font-semibold">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border/70 bg-card/45 space-y-6 rounded-sm border p-8 backdrop-blur-xl">
          {CONTACT.map((c) => (
            <div key={c.k} data-w="info">
              <div className="text-muted-foreground text-[11px] tracking-[0.28em] uppercase">
                {c.k}
              </div>
              <p className="mt-2 text-sm font-semibold">{c.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div data-w="expert">
          <p className="eyebrow">This Is Our Expertise</p>
          <p className="text-muted-foreground mt-5 max-w-xl">
            Our expertise lies in providing cutting-edge solutions backed by extensive experience,
            attention to detail, and a commitment to excellence. We&rsquo;re passionate about
            delivering results that exceed expectations every time.
          </p>
        </div>
        <div data-w="expert" className="space-y-7">
          {SKILLS.map((s) => (
            <SkillBar key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
