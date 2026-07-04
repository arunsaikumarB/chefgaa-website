import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { StoryCard } from "./StoryCard";
import { CarouselNav } from "./CarouselNav";
import { CAROUSEL_SLIDES, POS_HERO_IMAGE } from "./carouselSlides";

gsap.registerPlugin(ScrollTrigger);

const CARD_GAP = 40;

function updateCardStates(cards: HTMLElement[], activeFloat: number) {
  cards.forEach((card, i) => {
    const dist = Math.abs(i - activeFloat);
    const t = Math.min(dist, 1);
    const opacity = 1 - t * 0.4;
    const scale = 1 - t * 0.1;
    const rotate = t * 2 * (i < activeFloat ? -1 : 1);
    const blur = t * 10;

    gsap.set(card, {
      opacity,
      scale,
      rotation: rotate,
      filter: `blur(${blur}px)`,
      transformOrigin: "center center",
    });
  });
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  const scrollToIndex = useCallback((index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progress = index / (CAROUSEL_SLIDES.length - 1);
    const scrollPos = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    if (reduce) return;

    const pin = pinRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!pin || !track || !section) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-story-card]", track);
    if (!cards.length) return;

    const getScrollDistance = () => {
      const lastCard = cards[cards.length - 1];
      const firstCard = cards[0];
      if (!lastCard || !firstCard) return 0;
      const lastRect = lastCard.getBoundingClientRect();
      const firstRect = firstCard.getBoundingClientRect();
      const offset =
        lastRect.left - firstRect.left + lastRect.width / 2 - window.innerWidth / 2;
      return Math.max(0, offset);
    };

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const steps = CAROUSEL_SLIDES.length - 1;
              return Math.round(value * steps) / steps;
            },
            duration: { min: 0.15, max: 0.45 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const activeFloat = self.progress * (CAROUSEL_SLIDES.length - 1);
            setActiveIndex(Math.round(activeFloat));
            updateCardStates(cards, activeFloat);
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;

      // Initial state
      updateCardStates(cards, 0);
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [reduce]);

  // Reduced motion: show all cards stacked vertically
  if (reduce) {
    return (
      <section
        id="ecosystem"
        className="bg-paper py-20 md:py-28"
        aria-labelledby="ecosystem-heading"
      >
        <EcosystemHeader />
        <PosHero />
        <div className="mx-auto mt-12 flex max-w-[1000px] flex-col gap-8 px-6">
          {CAROUSEL_SLIDES.map((slide) => (
            <StoryCard key={slide.id} slide={slide} active />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="bg-paper"
      aria-labelledby="ecosystem-heading"
    >
      <div className="px-6 pt-20 md:pt-28">
        <EcosystemHeader />
        <PosHero />
      </div>

      {/* Pinned horizontal carousel */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{
            gap: CARD_GAP,
            paddingLeft: "max(24px, calc((100vw - min(88vw, 1000px)) / 2))",
            paddingRight: "max(24px, calc((100vw - min(88vw, 1000px)) / 2))",
          }}
        >
          {CAROUSEL_SLIDES.map((slide, i) => (
            <StoryCard key={slide.id} slide={slide} active={i === activeIndex} />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-paper via-paper/90 to-transparent">
          <CarouselNav activeIndex={activeIndex} onSelect={scrollToIndex} />
        </div>
      </div>
    </section>
  );
}

function EcosystemHeader() {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      <span className="inline-flex items-center rounded-full border border-hairline/80 bg-paper px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ember shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        All-in-One Restaurant Operating System
      </span>
      <h2
        id="ecosystem-heading"
        className="mt-5 font-sf-pro-display text-[36px] font-semibold leading-[1.08] tracking-[-0.2px] text-[#111111] md:text-[48px] lg:text-[56px]"
      >
        The{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #b64400 0%, #ff6e14 45%, #d4540a 100%)",
          }}
        >
          Chefgaa
        </span>{" "}
        Ecosystem
      </h2>
      <p className="mt-5 text-[16px] leading-[1.5] text-mid-gray md:whitespace-nowrap md:text-[18px]">
        Everything your restaurant needs. Connected beautifully. Powered by one intelligent platform.
      </p>
    </div>
  );
}

function PosHero() {
  return (
    <div className="mx-auto mt-12 flex max-w-[900px] flex-col items-center md:mt-16">
      <div className="overflow-hidden rounded-[32px] bg-[#050506] shadow-[0_40px_100px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.06]">
        <img
          src={POS_HERO_IMAGE}
          alt="Chefgaa POS system with receipt printer, cash drawer, and barcode scanner"
          className="h-auto w-full max-w-[900px] object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}
