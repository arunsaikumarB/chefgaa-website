import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { FeatureCard } from "./FeatureCard";
import { FloatingMetrics } from "./FloatingMetrics";
import {
  ANIMATION_ORDER,
  ECOSYSTEM_FEATURES,
  featuresByZone,
  featuresInColumn,
} from "./features";

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hasAnimated = useRef(false);

  const [posVisible, setPosVisible] = useState(false);
  const [platformVisible, setPlatformVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState<Record<string, number>>({});
  const [cardVisible, setCardVisible] = useState<Record<string, boolean>>({});
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [posGlowing, setPosGlowing] = useState(false);
  const [floating, setFloating] = useState(false);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.4, triggerOnce: true });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    if (reduce) {
      hasAnimated.current = true;
      setPosVisible(true);
      setPlatformVisible(true);
      setFloating(true);
      const lines: Record<string, number> = {};
      const cards: Record<string, boolean> = {};
      ANIMATION_ORDER.forEach((id) => {
        lines[id] = 1;
        cards[id] = true;
      });
      setLineProgress(lines);
      setCardVisible(cards);
      setSequenceComplete(true);
      return;
    }

    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
        onComplete: () => {
          setSequenceComplete(true);
          setFloating(true);
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0
      );

      tl.to({}, { duration: 0.2 });

      tl.call(() => setPosVisible(true));
      tl.fromTo(
        posRef.current,
        { opacity: 0, scale: 0.75, rotateX: 10 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 0.85, ease: "back.out(1.15)" },
        "<"
      );

      tl.call(() => setPlatformVisible(true));
      tl.fromTo({}, {}, { duration: 0.35 });

      ANIMATION_ORDER.forEach((id) => {
        const obj = { p: 0 };
        tl.to(obj, {
          p: 1,
          duration: 0.42,
          ease: "power2.inOut",
          onUpdate: () => {
            setLineProgress((prev) => ({ ...prev, [id]: obj.p }));
          },
          onComplete: () => {
            setCardVisible((prev) => ({ ...prev, [id]: true }));
          },
        });
      });

      tl.to({}, { duration: 0.15 });
    }, sectionRef);

    return () => ctx.revert();
  }, [inView, reduce]);

  useEffect(() => {
    if (!sequenceComplete || reduce) return;
    const interval = setInterval(() => {
      const id = ANIMATION_ORDER[Math.floor(Math.random() * ANIMATION_ORDER.length)];
      setPulseId(id);
      setTimeout(() => setPulseId(null), 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, [sequenceComplete, reduce]);

  useEffect(() => {
    if (hoveredId) {
      setPosGlowing(true);
      setPulseId(hoveredId);
    } else {
      setPosGlowing(false);
      if (!reduce) setPulseId(null);
    }
  }, [hoveredId, reduce]);

  const anyHovered = hoveredId !== null;

  return (
    <section
      ref={setRefs}
      id="ecosystem"
      className="relative min-h-screen overflow-visible bg-paper py-16 md:py-20 lg:py-24"
      aria-labelledby="ecosystem-heading"
    >
      <SectionBackground />

      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-[720px] px-6 text-center opacity-0 lg:max-w-none"
      >
        <span className="inline-flex items-center rounded-full border border-hairline/80 bg-paper px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ember shadow-sm">
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
        <p className="mt-5 whitespace-normal text-[19px] leading-[1.47] text-mid-gray md:text-[21px] lg:whitespace-nowrap">
          Everything your restaurant needs. Connected beautifully. Powered by one intelligent platform.
        </p>
      </div>

      {/* Desktop — 3-column grid fills full width */}
      <div
        ref={canvasRef}
        className="relative z-10 mx-auto mt-2 hidden w-full min-h-[88vh] px-6 md:block lg:px-12 xl:px-16"
      >
        <ConnectionLines
          lineProgress={lineProgress}
          highlightedId={hoveredId}
          pulseId={pulseId}
          showParticles={sequenceComplete}
        />

        {/* Top — AI */}
        <div className="absolute left-1/2 top-0 z-30 w-full max-w-[400px] -translate-x-1/2">
          {featuresByZone("top").map((f) => (
            <FeatureCard
              key={f.id}
              feature={f}
              visible={!!cardVisible[f.id]}
              dimmed={anyHovered && hoveredId !== f.id}
              highlighted={hoveredId === f.id}
              onHover={setHoveredId}
              align="center"
            />
          ))}
        </div>

        {/* Main row — left | center | right */}
        <div className="absolute inset-x-6 top-[11%] bottom-[16%] flex items-stretch justify-between gap-6 lg:inset-x-12 xl:inset-x-16">
          <div className="flex w-[min(400px,22vw)] min-w-[300px] flex-col justify-between gap-5 py-4">
            {featuresInColumn("left").map((f) => (
              <FeatureCard
                key={f.id}
                feature={f}
                visible={!!cardVisible[f.id]}
                dimmed={anyHovered && hoveredId !== f.id}
                highlighted={hoveredId === f.id}
                onHover={setHoveredId}
                align="left"
              />
            ))}
          </div>

          <div
            className="relative flex shrink-0 items-center justify-center self-center"
            ref={posRef}
          >
            <GlowPlatform visible={platformVisible} breathing={sequenceComplete} />
            <AnimatedPOS
              assemble={posVisible ? 1 : 0}
              glowing={posGlowing}
              floating={floating}
            />
          </div>

          <div className="flex w-[min(400px,22vw)] min-w-[300px] flex-col justify-between gap-5 py-4">
            {featuresInColumn("right").map((f) => (
              <FeatureCard
                key={f.id}
                feature={f}
                visible={!!cardVisible[f.id]}
                dimmed={anyHovered && hoveredId !== f.id}
                highlighted={hoveredId === f.id}
                onHover={setHoveredId}
                align="right"
              />
            ))}
          </div>
        </div>

        {/* Bottom — Website + Analytics */}
        <div className="absolute bottom-0 left-1/2 z-30 flex w-full max-w-[880px] -translate-x-1/2 justify-center gap-8 lg:gap-12">
          {featuresByZone("bottom-left").map((f) => (
            <FeatureCard
              key={f.id}
              feature={f}
              visible={!!cardVisible[f.id]}
              dimmed={anyHovered && hoveredId !== f.id}
              highlighted={hoveredId === f.id}
              onHover={setHoveredId}
            />
          ))}
          {featuresByZone("bottom-right").map((f) => (
            <FeatureCard
              key={f.id}
              feature={f}
              visible={!!cardVisible[f.id]}
              dimmed={anyHovered && hoveredId !== f.id}
              highlighted={hoveredId === f.id}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-8 px-6 md:hidden">
        <AnimatedPOS assemble={1} floating={sequenceComplete} />
        {ECOSYSTEM_FEATURES.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            visible
            dimmed={false}
            highlighted={hoveredId === feature.id}
            onHover={setHoveredId}
          />
        ))}
      </div>

      <FloatingMetrics active={sequenceComplete || !!reduce} />
    </section>
  );
}
