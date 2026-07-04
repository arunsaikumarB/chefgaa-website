import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { EcosystemFeatureCard } from "./FeatureCard";
import { AnimatedParticles } from "./AnimatedParticles";
import {
  ANIMATION_ORDER,
  ECOSYSTEM_FEATURES,
  METRICS,
  NAV_ITEMS,
} from "./features";

gsap.registerPlugin(ScrollTrigger);

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce || target === 0) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

function MetricItem({
  metric,
  active,
}: {
  metric: (typeof METRICS)[number];
  active: boolean;
}) {
  const count = useCountUp(metric.value, active && metric.value > 0);

  return (
    <div className="text-center">
      <p className="font-sf-pro-display text-[28px] font-bold tracking-[-0.2px] text-primary-ink md:text-[40px]">
        {"text" in metric && metric.text ? (
          metric.text
        ) : (
          <>
            {count}
            {metric.suffix}
          </>
        )}
      </p>
      <p className="mt-1 text-[13px] text-mid-gray md:text-[14px]">{metric.label}</p>
    </div>
  );
}

function MetricsRow({ active }: { active: boolean }) {
  return (
    <div className="mx-auto mt-12 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6 md:mt-16 md:gap-x-14">
      {METRICS.map((m) => (
        <MetricItem key={m.label} metric={m} active={active} />
      ))}
    </div>
  );
}

function EcosystemNav({
  activeGroup,
  onSelect,
}: {
  activeGroup: string;
  onSelect: (group: string) => void;
}) {
  return (
    <nav
      className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Ecosystem navigation"
    >
      <ul className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group flex items-center gap-2 text-left transition-colors ${
                activeGroup === item.id ? "text-ember" : "text-mid-gray hover:text-primary-ink"
              }`}
              aria-current={activeGroup === item.id ? "true" : undefined}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  activeGroup === item.id
                    ? "scale-125 bg-ember"
                    : "bg-hairline group-hover:bg-mid-gray"
                }`}
              />
              <span className="text-[12px] font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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
  const [glowPulse, setGlowPulse] = useState(false);
  const [activeNav, setActiveNav] = useState("pos");
  const [posGlowing, setPosGlowing] = useState(false);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.4, triggerOnce: true });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  // GSAP scroll sequence — runs once
  useEffect(() => {
    if (!inView || hasAnimated.current || reduce) {
      if (reduce && inView) {
        setPosVisible(true);
        setPlatformVisible(true);
        const allLines: Record<string, number> = {};
        const allCards: Record<string, boolean> = {};
        ANIMATION_ORDER.forEach((id) => {
          allLines[id] = 1;
          allCards[id] = true;
        });
        setLineProgress(allLines);
        setCardVisible(allCards);
        setSequenceComplete(true);
      }
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
        onComplete: () => setSequenceComplete(true),
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0
      );

      tl.to({}, { duration: 0.2 }); // pause

      tl.call(() => setPosVisible(true), undefined, "+=0");
      tl.fromTo(
        posRef.current,
        { opacity: 0, scale: 0.75 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        "<"
      );

      tl.call(() => setPlatformVisible(true));
      tl.fromTo(
        {},
        {},
        { duration: 0.5 }
      );

      // Lines + cards clockwise
      ANIMATION_ORDER.forEach((id) => {
        const lineObj = { p: 0 };
        tl.to(lineObj, {
          p: 1,
          duration: 0.45,
          ease: "power2.inOut",
          onUpdate: () => {
            setLineProgress((prev) => ({ ...prev, [id]: lineObj.p }));
          },
          onComplete: () => {
            setCardVisible((prev) => ({ ...prev, [id]: true }));
          },
        });
      });

      tl.call(() => {
        setGlowPulse(true);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [inView, reduce]);

  // Line glow pulse idle
  useEffect(() => {
    if (!sequenceComplete || reduce) return;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * ANIMATION_ORDER.length);
      setPulseId(ANIMATION_ORDER[idx]);
      setTimeout(() => setPulseId(null), 1200);
    }, 4000);
    return () => clearInterval(interval);
  }, [sequenceComplete, reduce]);

  // Hover pulse from POS
  useEffect(() => {
    if (hoveredId) {
      setPosGlowing(true);
      setPulseId(hoveredId);
    } else {
      setPosGlowing(false);
      setPulseId(null);
    }
  }, [hoveredId]);

  const handleNavSelect = (group: string) => {
    setActiveNav(group);
    const match = ECOSYSTEM_FEATURES.find((f) => f.navGroup === group);
    if (match) {
      const el = document.querySelector(`[data-ecosystem-card="${match.id}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setHoveredId(match.id);
      setTimeout(() => setHoveredId(null), 2000);
    } else if (group === "pos" && posRef.current) {
      posRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const anyHovered = hoveredId !== null;

  return (
    <section
      ref={setRefs}
      id="ecosystem"
      className="relative min-h-screen overflow-visible bg-paper py-16 md:py-[120px]"
      aria-labelledby="ecosystem-heading"
    >
      <SectionBackground />
      <AnimatedParticles active={sequenceComplete} />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-[720px] px-6 text-center opacity-0"
      >
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ember">
          All-in-One Restaurant Operating System
        </p>
        <h2
          id="ecosystem-heading"
          className="mt-4 font-sf-pro-display text-[36px] font-semibold leading-[1.08] tracking-[-0.2px] text-primary-ink md:text-[48px] lg:text-[56px]"
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
        <p className="mt-5 text-[19px] leading-[1.45] text-mid-gray md:text-[21px]">
          Everything your restaurant needs.
          <br />
          Connected beautifully.
          <br />
          Powered by one intelligent platform.
        </p>
      </div>

      {/* Desktop / tablet — circular layout */}
      <div
        ref={canvasRef}
        className="relative z-10 mx-auto mt-10 hidden min-h-[720px] w-full max-w-[1400px] md:block lg:min-h-[820px]"
      >
        <ConnectionLines
          lineProgress={lineProgress}
          highlightedId={hoveredId}
          pulseId={pulseId}
          showParticles={sequenceComplete}
          glowPulse={glowPulse}
        />

        {/* Center POS */}
        <div
          className="absolute left-1/2 top-[48%] z-20 -translate-x-1/2 -translate-y-1/2"
          ref={posRef}
        >
          <GlowPlatform visible={platformVisible} breathing={sequenceComplete} />
          <AnimatedPOS
            visible={posVisible}
            glowing={posGlowing}
            floating={sequenceComplete}
          />
        </div>

        {/* Feature cards orbit */}
        {ECOSYSTEM_FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
          >
            <EcosystemFeatureCard
              feature={feature}
              visible={!!cardVisible[feature.id]}
              dimmed={anyHovered && hoveredId !== feature.id}
              highlighted={hoveredId === feature.id}
              floating={sequenceComplete}
              onHover={setHoveredId}
              layout="orbit"
            />
          </div>
        ))}
      </div>

      {/* Mobile — vertical timeline */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-16 px-6 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlowPlatform visible={platformVisible || !!reduce} breathing={sequenceComplete} />
          <AnimatedPOS visible={posVisible || !!reduce} floating={sequenceComplete} />
        </motion.div>

        {ECOSYSTEM_FEATURES.map((feature, i) => (
          <motion.div
            key={feature.id}
            className="relative w-full max-w-[320px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {i > 0 && (
              <div
                className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-ember/40 to-hairline"
                aria-hidden="true"
              />
            )}
            <EcosystemFeatureCard
              feature={feature}
              visible
              dimmed={false}
              highlighted={hoveredId === feature.id}
              onHover={setHoveredId}
              layout="stack"
            />
          </motion.div>
        ))}
      </div>

      <MetricsRow active={sequenceComplete || !!reduce} />

      <EcosystemNav activeGroup={activeNav} onSelect={handleNavSelect} />
    </section>
  );
}
