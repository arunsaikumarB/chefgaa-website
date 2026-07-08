import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const HERO_IMAGE = "/hero-product.png";

function HeroPrimaryBtn({ children, to }: { children: string; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex h-14 items-center justify-center rounded-full bg-[#ED3C18] px-8 text-[18px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-95"
    >
      {children}
    </Link>
  );
}

function HeroGhostBtn({ children, to }: { children: string; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex h-14 items-center justify-center rounded-full border border-white bg-transparent px-8 text-[18px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#111111]"
    >
      {children}
    </Link>
  );
}

export function HomeHero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!media || !content) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const textItems = content.querySelectorAll("[data-hero-text]");
    const buttons = content.querySelector("[data-hero-buttons]");

    if (reduceMotion) {
      gsap.set(media, { opacity: 1, scale: 1 });
      gsap.set(textItems, { opacity: 1, y: 0 });
      if (buttons) gsap.set(buttons, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(media, { scale: 1.05, opacity: 0, force3D: true });
    gsap.set(textItems, { opacity: 0, y: 40 });
    if (buttons) gsap.set(buttons, { opacity: 0, y: 40 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(media, { opacity: 1, scale: 1, duration: 1 }, 0)
      .to(textItems, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, 0.2)
      .to(buttons, { opacity: 1, y: 0, duration: 0.75 }, 0.55);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className="relative isolate min-h-[90vh] max-h-[100vh] w-full overflow-hidden bg-[#111111]"
      aria-label="Chefgaa platform hero"
    >
      {/* Product environment — sole background */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform" style={{ transform: "translateZ(0)" }}>
        <img
          src={HERO_IMAGE}
          alt=""
          role="presentation"
          className="absolute left-1/2 top-1/2 h-[110%] w-full min-w-[105%] -translate-x-1/2 -translate-y-[48%] object-cover object-[52%_46%] md:object-[54%_45%] lg:h-[112%] lg:min-w-[108%]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      </div>

      {/* Subtle readability tint — no gradients on product */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />

      {/* Split composition */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-h-[100vh] w-full max-w-[1440px] flex-col justify-center px-6 pb-12 pt-[var(--site-nav-height)] md:px-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-20 lg:pb-0">
        {/* Left — messaging */}
        <div ref={contentRef} className="w-full max-w-[600px] lg:max-w-[580px]">
          <span
            data-hero-text
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
          >
            Chefgaa Platform
          </span>

          <h1
            data-hero-text
            className="mt-10 max-w-[700px] font-sf-pro-display text-[44px] font-extrabold leading-[0.98] tracking-[-0.03em] text-white md:text-[60px] lg:mt-10 lg:text-[72px] xl:text-[84px]"
          >
            <span className="block">All-in-One POS &amp; Online Ordering</span>
            <span className="block">for Restaurants.</span>
          </h1>

          <p
            data-hero-text
            className="mt-8 max-w-[560px] text-[18px] leading-[1.5] text-white/85 md:text-[20px] lg:mt-8 lg:text-[22px] lg:leading-[1.45]"
          >
            Streamline operations, boost sales, and enhance customer experience with Chefgaa&apos;s powerful restaurant management solution.
          </p>

          <div
            data-hero-buttons
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:mt-10"
          >
            <HeroPrimaryBtn to="/contact">Request a Demo</HeroPrimaryBtn>
            <HeroGhostBtn to="/contact">Get in Touch</HeroGhostBtn>
          </div>
        </div>

        {/* Right — product visible through background */}
        <div
          className="mt-12 min-h-[36vh] shrink-0 lg:mt-0 lg:min-h-[70vh]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
