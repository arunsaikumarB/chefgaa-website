import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton, ArrowLink } from "./Buttons";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "/hero-product.png";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(media, { opacity: 1, scale: 1, y: 0 });
      if (content) gsap.set(content.children, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(media, { scale: 1.05, opacity: 0, force3D: true });
    if (content) gsap.set(content.children, { opacity: 0, y: 28 });

    const loadTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    loadTl
      .to(media, { opacity: 1, scale: 1, duration: 1.35 }, 0)
      .to(content?.children ?? [], { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35);

    const parallax = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(media, { y: self.progress * 72, force3D: true });
      },
    });

    return () => {
      loadTl.kill();
      parallax.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-hero relative isolate min-h-[90vh] max-h-[100vh] w-full overflow-hidden bg-[#1a1a1a]"
      aria-label="Chefgaa platform hero"
    >
      {/* Cinematic product environment */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform" style={{ transform: "translateZ(0)" }}>
        <img
          src={HERO_IMAGE}
          alt=""
          role="presentation"
          className="absolute left-1/2 top-1/2 h-[112%] w-full min-w-[108%] -translate-x-1/2 -translate-y-[48%] object-cover object-center md:h-[118%] md:min-w-[112%] lg:-translate-y-[46%]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      </div>

      {/* Soft edge blur — far periphery only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-y-0 left-0 w-[10%] max-w-[80px] backdrop-blur-[3px]"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black, transparent)",
            maskImage: "linear-gradient(to right, black, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[10%] max-w-[80px] backdrop-blur-[3px]"
          style={{
            WebkitMaskImage: "linear-gradient(to left, black, transparent)",
            maskImage: "linear-gradient(to left, black, transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[14%] max-h-[100px] backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* Text readability scrim — white to transparent, product stays visible */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/88 via-white/45 to-transparent md:bg-gradient-to-r md:from-white/92 md:via-white/58 md:to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] max-h-[100vh] items-center pt-[var(--site-nav-height)] pb-16 md:pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12">
          <div
            ref={contentRef}
            className="max-w-[620px] text-left md:max-w-[680px] lg:max-w-[720px]"
          >
            <h1 className="font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.5px] text-primary-ink md:text-[56px] md:tracking-[-0.8px] lg:text-[72px] lg:leading-[1.04] lg:tracking-[-1px] xl:text-[80px]">
              <span className="block lg:whitespace-nowrap">All-in-One POS &amp; Online Ordering</span>
              <span className="block lg:whitespace-nowrap">for Restaurants.</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-[17px] leading-[1.5] text-deep-gray sm:text-[18px] md:text-[19px] lg:text-[21px] lg:leading-[1.47]">
              Streamline operations, boost sales, and enhance customer experience with Chefgaa&apos;s powerful restaurant management solution.
            </p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
              <ArrowLink to="/contact">Get in Touch</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
