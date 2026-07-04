import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { FeatureCard } from "./FeatureCard";
import { FloatingMetrics } from "./FloatingMetrics";
import {
  ANIMATION_ORDER,
  CENTER,
  COMPOSITION,
  ECOSYSTEM_FEATURES,
  toPercent,
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
        className="relative z-10 mx-auto max-w-[720px] px-6 text-center opacity-0"
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
        <p className="mt-5 text-[19px] leading-[1.47] text-mid-gray md:text-[21px]">
          Everything your restaurant needs.
          <br />
          Connected beautifully.
          <br />
          Powered by one intelligent platform.
        </p>
      </div>

      {/* Desktop / tablet — full-width radial ecosystem */}
      <div
        ref={canvasRef}
        className="relative z-10 mx-auto mt-6 hidden w-full max-w-[2200px] px-3 md:block lg:mt-8 lg:px-6"
        style={{ aspectRatio: `${COMPOSITION.width} / ${COMPOSITION.height}` }}
      >
        <ConnectionLines
          lineProgress={lineProgress}
          highlightedId={hoveredId}
          pulseId={pulseId}
          showParticles={sequenceComplete}
        />

        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={toPercent(CENTER.x, CENTER.y)}
          ref={posRef}
        >
          <GlowPlatform visible={platformVisible} breathing={sequenceComplete} />
          <AnimatedPOS
            assemble={posVisible ? 1 : 0}
            glowing={posGlowing}
            floating={floating}
          />
        </div>

        {ECOSYSTEM_FEATURES.map((feature, i) => (
          <div
            key={feature.id}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={toPercent(feature.x, feature.y)}
          >
            <motion.div
              animate={
                sequenceComplete && !reduce
                  ? { y: [0, i % 2 === 0 ? -2 : 2, 0] }
                  : { y: 0 }
              }
              transition={
                sequenceComplete && !reduce
                  ? { duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }
                  : undefined
              }
            >
              <FeatureCard
                feature={feature}
                visible={!!cardVisible[feature.id]}
                dimmed={anyHovered && hoveredId !== feature.id}
                highlighted={hoveredId === feature.id}
                onHover={setHoveredId}
              />
            </motion.div>
          </div>
        ))}
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
