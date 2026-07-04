import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { HardwareGroup } from "./HardwareGroup";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { FeatureCard } from "./FeatureCard";
import { AnimatedParticles } from "./AnimatedParticles";
import { FloatingMetrics } from "./FloatingMetrics";
import {
  ANIMATION_ORDER,
  CANVAS,
  CENTER,
  FEATURES,
} from "./features";

const TABLET_MAX = 1279;

function EcosystemCanvas({
  lineProgress,
  cardVisible,
  hardwareVisible,
  platformVisible,
  posVisible,
  sequenceComplete,
  hoveredId,
  setHoveredId,
  pulseId,
  glowPulse,
  posGlowing,
  floating,
  heroRef,
}: {
  lineProgress: Record<string, number>;
  cardVisible: Record<string, boolean>;
  hardwareVisible: boolean;
  platformVisible: boolean;
  posVisible: boolean;
  sequenceComplete: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  pulseId: string | null;
  glowPulse: boolean;
  posGlowing: boolean;
  floating: boolean;
  heroRef: RefObject<HTMLDivElement>;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const pw = stage.clientWidth;
      const fit = Math.min(pw / CANVAS.width, 1);
      setScale(window.innerWidth <= TABLET_MAX ? fit : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const anyHover = hoveredId !== null;

  return (
    <div
      ref={stageRef}
      className="relative mx-auto flex w-full max-w-[1600px] items-center justify-center overflow-visible px-4"
    >
      <div
        className="relative overflow-visible"
        style={{
          width: CANVAS.width,
          height: CANVAS.height,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute inset-0 z-[10]">
          <ConnectionLines
            lineProgress={lineProgress}
            highlightedId={hoveredId}
            pulseId={pulseId}
            showParticles={sequenceComplete}
            glowPulse={glowPulse}
          />
        </div>

        <div
          className="absolute z-[15] -translate-x-1/2 -translate-y-1/2"
          style={{ left: CENTER.x, top: CENTER.y }}
        >
          <GlowPlatform visible={platformVisible} breathing={sequenceComplete} />
        </div>

        <div
          ref={heroRef}
          className="absolute z-[20] -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{ left: CENTER.x, top: CENTER.y, width: 620, height: 620, perspective: 900 }}
        >
          <HardwareGroup visible={hardwareVisible} />
          <AnimatedPOS visible={posVisible} glowing={posGlowing} floating={floating} />
        </div>

        {FEATURES.map((feat) => (
          <div
            key={feat.id}
            className="absolute z-[30] -translate-x-1/2 -translate-y-1/2"
            style={{ left: feat.x, top: feat.y }}
          >
            <FeatureCard
              feature={feat}
              visible={!!cardVisible[feat.id]}
              dimmed={anyHover && hoveredId !== feat.id}
              highlighted={hoveredId === feat.id}
              floating={sequenceComplete}
              onHover={setHoveredId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hasAnimated = useRef(false);

  const [lineProgress, setLineProgress] = useState<Record<string, number>>({});
  const [cardVisible, setCardVisible] = useState<Record<string, boolean>>({});
  const [posVisible, setPosVisible] = useState(false);
  const [hardwareVisible, setHardwareVisible] = useState(false);
  const [platformVisible, setPlatformVisible] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [glowPulse, setGlowPulse] = useState(false);
  const [posGlowing, setPosGlowing] = useState(false);

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
      setHardwareVisible(true);
      setPlatformVisible(true);
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
      const tl = gsap.timeline({ onComplete: () => setSequenceComplete(true) });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0
      );

      tl.to({}, { duration: 0.2 });

      tl.call(() => {
        setPosVisible(true);
        setHardwareVisible(true);
      });
      tl.fromTo(
        posRef.current,
        { opacity: 0, scale: 0.75, rotateX: 10 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.2)" },
        "<"
      );

      tl.call(() => setPlatformVisible(true));
      tl.fromTo(
        {},
        {},
        { duration: 0.45 }
      );

      ANIMATION_ORDER.forEach((id) => {
        const lineObj = { p: 0 };
        tl.to(lineObj, {
          p: 1,
          duration: 0.42,
          ease: "power2.inOut",
          onUpdate: () => {
            setLineProgress((prev) => ({ ...prev, [id]: lineObj.p }));
          },
          onComplete: () => {
            setCardVisible((prev) => ({ ...prev, [id]: true }));
          },
        });
      });

      tl.call(() => setGlowPulse(true));
    }, sectionRef);

    return () => ctx.revert();
  }, [inView, reduce]);

  useEffect(() => {
    if (!sequenceComplete || reduce) return;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * ANIMATION_ORDER.length);
      setGlowPulse(true);
      setPulseId(ANIMATION_ORDER[idx]);
      setTimeout(() => {
        setPulseId(null);
        setGlowPulse(false);
      }, 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, [sequenceComplete, reduce]);

  useEffect(() => {
    if (hoveredId) {
      setPosGlowing(true);
      setPulseId(hoveredId);
    } else {
      setPosGlowing(false);
      setPulseId(null);
    }
  }, [hoveredId]);

  return (
    <section
      ref={setRefs}
      id="ecosystem"
      className="relative min-h-screen overflow-visible bg-paper py-16 md:py-[100px] lg:py-[120px]"
      aria-labelledby="ecosystem-heading"
    >
      <SectionBackground />
      <AnimatedParticles active={sequenceComplete} />

      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-[720px] px-6 text-center opacity-0"
      >
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
        <p className="mt-5 text-[17px] leading-[1.5] text-mid-gray md:text-[19px]">
          Everything your restaurant needs.
          <br />
          Connected beautifully.
          <br />
          Powered by one intelligent platform.
        </p>
      </div>

      {/* Desktop / tablet */}
      <div className="relative z-10 mt-6 hidden md:block md:mt-10">
        <EcosystemCanvas
          heroRef={posRef}
          lineProgress={lineProgress}
          cardVisible={cardVisible}
          hardwareVisible={hardwareVisible}
          platformVisible={platformVisible}
          posVisible={posVisible}
          sequenceComplete={sequenceComplete}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          pulseId={pulseId}
          glowPulse={glowPulse}
          posGlowing={posGlowing}
          floating={sequenceComplete}
        />
      </div>

      {/* Mobile timeline */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-8 px-6 md:hidden">
        <div className="flex flex-col items-center">
          <GlowPlatform visible={posVisible || !!reduce} breathing={sequenceComplete} />
          <div className="relative scale-[0.45]" style={{ width: 620, height: 620 }}>
            <HardwareGroup visible={hardwareVisible || !!reduce} />
            <AnimatedPOS visible={posVisible || !!reduce} floating={sequenceComplete} />
          </div>
        </div>
        {FEATURES.map((feat, i) => (
          <div
            key={feat.id}
            className="w-full max-w-[320px] opacity-0"
            style={{
              opacity: cardVisible[feat.id] || reduce ? 1 : 0,
              transition: `opacity 0.5s ease ${i * 0.04}s`,
            }}
          >
            <FeatureCard
              feature={feat}
              visible={!!cardVisible[feat.id] || !!reduce}
              dimmed={false}
              highlighted={hoveredId === feat.id}
              onHover={setHoveredId}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 px-6">
        <FloatingMetrics active={sequenceComplete || !!reduce} />
      </div>
    </section>
  );
}
