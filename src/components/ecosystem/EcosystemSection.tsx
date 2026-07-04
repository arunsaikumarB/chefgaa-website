import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { FeatureCard } from "./FeatureCard";
import { AnimatedParticles } from "./AnimatedParticles";
import { FloatingMetrics } from "./FloatingMetrics";
import { ANIMATION_ORDER, CANVAS, CENTER, FEATURES, itemProgress } from "./features";

/** Reveal timeline across the section's scroll pass (0..1) */
const PHASE = {
  header: [0, 0.1] as const,
  pos: [0.06, 0.2] as const,
  wiring: [0.22, 0.85] as const,
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function EcosystemCanvas({
  lineProgress,
  cardVisible,
  platformVisible,
  posVisible,
  active,
  hoveredId,
  setHoveredId,
  pulseId,
  glowPulse,
  posGlowing,
  floating,
}: {
  lineProgress: Record<string, number>;
  cardVisible: Record<string, boolean>;
  platformVisible: boolean;
  posVisible: boolean;
  active: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  pulseId: string | null;
  glowPulse: boolean;
  posGlowing: boolean;
  floating: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useLayoutEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      // Width-driven so the composition always fills the section.
      setScale(Math.min(stage.clientWidth / CANVAS.width, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const anyHover = hoveredId !== null;
  const scaledW = CANVAS.width * scale;
  const scaledH = CANVAS.height * scale;

  return (
    <div ref={stageRef} className="relative mx-auto flex w-full justify-center px-4">
      <div style={{ width: scaledW, height: scaledH }} className="relative">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: CANVAS.width, height: CANVAS.height, transform: `scale(${scale})` }}
        >
          <div className="absolute inset-0 z-[10]">
            <ConnectionLines
              lineProgress={lineProgress}
              highlightedId={hoveredId}
              pulseId={pulseId}
              showParticles={active}
              glowPulse={glowPulse}
            />
          </div>

          <div
            className="absolute z-[15] -translate-x-1/2 -translate-y-1/2"
            style={{ left: CENTER.x, top: CENTER.y }}
          >
            <GlowPlatform visible={platformVisible} breathing={active} />
          </div>

          <div
            className="absolute z-[20] -translate-x-1/2 -translate-y-1/2"
            style={{ left: CENTER.x, top: CENTER.y, width: 620, height: 620 }}
          >
            <AnimatedPOS visible={posVisible} glowing={posGlowing} floating={floating} />
          </div>

          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: feat.x,
                top: feat.y,
                zIndex: hoveredId === feat.id ? 40 : 30,
              }}
            >
              <FeatureCard
                feature={feat}
                visible={!!cardVisible[feat.id]}
                dimmed={anyHover && hoveredId !== feat.id}
                highlighted={hoveredId === feat.id}
                onHover={setHoveredId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Reveal runs from entry until the section reaches viewport center —
    // by the time you're mid-section every card is already shown.
    offset: ["start 0.85", "center center"],
  });

  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [glowPulse, setGlowPulse] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setProgress(Math.round(v * 250) / 250);
  });

  const headerP = reduce
    ? 1
    : clamp01((progress - PHASE.header[0]) / (PHASE.header[1] - PHASE.header[0]));
  const posP = reduce
    ? 1
    : clamp01((progress - PHASE.pos[0]) / (PHASE.pos[1] - PHASE.pos[0]));
  const posVisible = reduce || posP > 0.05;
  const platformVisible = reduce || posP > 0.3;
  const active = reduce || progress > 0.55;
  const metricsActive = reduce || progress > 0.85;

  const lineProgress = useMemo(() => {
    const map: Record<string, number> = {};
    ANIMATION_ORDER.forEach((id, i) => {
      map[id] = reduce
        ? 1
        : itemProgress(progress, PHASE.wiring[0], PHASE.wiring[1], i, ANIMATION_ORDER.length);
    });
    return map;
  }, [progress, reduce]);

  const cardVisible = useMemo(() => {
    const map: Record<string, boolean> = {};
    ANIMATION_ORDER.forEach((id) => {
      map[id] = reduce || (lineProgress[id] ?? 0) > 0.82;
    });
    return map;
  }, [lineProgress, reduce]);

  // Idle: subtle line pulse once revealed
  useEffect(() => {
    if (!active || reduce || hoveredId) return;
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
  }, [active, reduce, hoveredId]);

  // Hover: pulse from POS to the hovered module
  useEffect(() => {
    if (hoveredId) setPulseId(hoveredId);
  }, [hoveredId]);

  const posGlowing = hoveredId !== null;

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-visible bg-paper py-16 md:py-[100px] lg:py-[120px]"
      aria-labelledby="ecosystem-heading"
    >
      <SectionBackground />
      <AnimatedParticles active={active} />

      <div
        className="relative z-10 mx-auto max-w-[720px] px-6 text-center"
        style={{
          opacity: headerP,
          transform: `translateY(${(1 - headerP) * 60}px)`,
          willChange: "opacity, transform",
        }}
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

      {/* Desktop / tablet — scroll-driven ecosystem */}
      <div className="relative z-10 mt-8 hidden md:block md:mt-12">
        <EcosystemCanvas
          lineProgress={lineProgress}
          cardVisible={cardVisible}
          platformVisible={platformVisible}
          posVisible={posVisible}
          active={active}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          pulseId={pulseId}
          glowPulse={glowPulse}
          posGlowing={posGlowing}
          floating={active}
        />
      </div>

      {/* Mobile timeline */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-8 px-6 md:hidden">
        <div className="flex flex-col items-center">
          <GlowPlatform visible breathing={active} />
          <div className="relative scale-[0.45]" style={{ width: 620, height: 620 }}>
            <AnimatedPOS visible floating={active} />
          </div>
        </div>
        {FEATURES.map((feat) => (
          <div key={feat.id} className="w-full max-w-[360px]">
            <FeatureCard
              feature={feat}
              visible
              dimmed={false}
              highlighted={hoveredId === feat.id}
              onHover={setHoveredId}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 px-6">
        <FloatingMetrics active={metricsActive} />
      </div>
    </section>
  );
}
