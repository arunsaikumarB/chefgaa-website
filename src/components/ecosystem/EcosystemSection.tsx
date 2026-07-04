import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { SectionBackground } from "./SectionBackground";
import { AnimatedPOS } from "./AnimatedPOS";
import { GlowPlatform } from "./GlowPlatform";
import { ConnectionLines } from "./ConnectionLines";
import { EcosystemFeatureCard } from "./FeatureCard";
import { AnimatedParticles } from "./AnimatedParticles";
import { COMPOSITION, POS_POSITION } from "./layout";
import {
  isRelatedModule,
  NAV_DOTS,
  PRIMARY_MODULES,
  PRIMARY_ORDER,
  SCROLL_PHASES,
  SECONDARY_MODULES,
  SECONDARY_ORDER,
  getModule,
  itemProgress,
  phaseProgress,
} from "./features";

const DESKTOP_MIN_WIDTH = 1280;

function DotNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (progress: number) => void;
}) {
  return (
    <nav
      className="absolute right-5 top-1/2 z-[80] hidden -translate-y-1/2 md:block lg:right-8"
      aria-label="Ecosystem story navigation"
    >
      <ul className="flex flex-col gap-3">
        {NAV_DOTS.map((dot) => (
          <li key={dot.id}>
            <button
              type="button"
              onClick={() => onSelect(dot.progress)}
              className="group flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-canvas/80"
              aria-label={dot.label}
              aria-current={activeId === dot.id ? "true" : undefined}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  activeId === dot.id
                    ? "h-2 w-2 bg-ember shadow-[0_0_8px_rgba(255,110,20,0.45)]"
                    : "h-1.5 w-1.5 bg-hairline group-hover:bg-mid-gray"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function EcosystemComposition({
  progress,
  reduce,
  hoveredId,
  setHoveredId,
  primaryCardProgress,
  secondaryCardProgress,
  primaryLineProgress,
  secondaryLineProgress,
  pulseId,
  linesActive,
}: {
  progress: number;
  reduce: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  primaryCardProgress: Record<string, number>;
  secondaryCardProgress: Record<string, number>;
  primaryLineProgress: Record<string, number>;
  secondaryLineProgress: Record<string, number>;
  pulseId: string | null;
  linesActive: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const pw = stage.clientWidth;
      const ph = stage.clientHeight;
      const isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH;
      const fitScale = Math.min(pw / COMPOSITION.width, ph / COMPOSITION.height, 1);
      // Desktop: never shrink cards — clip edges instead. Tablet: scale proportionally.
      setScale(isDesktop ? 1 : fitScale);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const posAssemble = phaseProgress(progress, SCROLL_PHASES.pos);
  const platformVisible = phaseProgress(progress, SCROLL_PHASES.platform) > 0.05;
  const anyHovered = hoveredId !== null;

  return (
    <div
      ref={stageRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        className="relative"
        style={{
          width: COMPOSITION.width,
          height: COMPOSITION.height,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "center center",
          willChange: scale < 1 ? "transform" : undefined,
        }}
      >
        {/* z-10 — glow (behind POS) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: POS_POSITION.x, top: POS_POSITION.y }}
        >
          <GlowPlatform visible={platformVisible || !!reduce} breathing={linesActive} />
        </div>

        {/* z-20 — SVG connections (behind cards, above glow) */}
        <div className="absolute inset-0 z-20">
          <ConnectionLines
            primaryProgress={primaryLineProgress}
            secondaryProgress={secondaryLineProgress}
            highlightedId={hoveredId}
            pulseId={pulseId}
            showParticles={linesActive}
          />
        </div>

        {/* z-30 — particles */}
        {linesActive && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            <AnimatedParticles active />
          </div>
        )}

        {/* z-40 — POS */}
        <div
          className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
          style={{ left: POS_POSITION.x, top: POS_POSITION.y }}
        >
          <AnimatedPOS assemble={reduce ? 1 : posAssemble} glowing={anyHovered} />
        </div>

        {/* z-60 — primary cards */}
        {PRIMARY_MODULES.map((mod) => {
          const cardP = primaryCardProgress[mod.id] ?? 0;
          const visible = reduce || cardP > 0.88;
          return (
            <div
              key={mod.id}
              className="absolute z-[60] -translate-x-1/2 -translate-y-1/2"
              style={{ left: mod.position.x, top: mod.position.y }}
            >
              <EcosystemFeatureCard
                module={mod}
                visible={visible}
                dimmed={anyHovered && !isRelatedModule(hoveredId, mod.id)}
                highlighted={hoveredId === mod.id}
                related={isRelatedModule(hoveredId, mod.id) && hoveredId !== mod.id}
                onHover={setHoveredId}
                layout="fixed"
              />
            </div>
          );
        })}

        {/* z-60 — secondary cards */}
        {SECONDARY_MODULES.map((mod) => {
          const cardP = secondaryCardProgress[mod.id] ?? 0;
          const visible = reduce || cardP > 0.88;
          const parent = mod.parentId ? getModule(mod.parentId) : undefined;
          return (
            <div
              key={mod.id}
              className="absolute z-[60] -translate-x-1/2 -translate-y-1/2"
              style={{ left: mod.position.x, top: mod.position.y }}
            >
              <EcosystemFeatureCard
                module={mod}
                visible={visible}
                dimmed={anyHovered && !isRelatedModule(hoveredId, mod.id)}
                highlighted={hoveredId === mod.id}
                related={isRelatedModule(hoveredId, mod.id) && hoveredId !== mod.id}
                emergeFrom={parent?.position}
                onHover={setHoveredId}
                layout="fixed"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileTimeline({
  progress,
  reduce,
  hoveredId,
  setHoveredId,
}: {
  progress: number;
  reduce: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const posVisible = reduce || phaseProgress(progress, SCROLL_PHASES.pos) > 0.5;
  const primaryVisible = (i: number) =>
    reduce || itemProgress(progress, SCROLL_PHASES.primaryCards, i, PRIMARY_ORDER.length) > 0.88;
  const secondaryVisible = (i: number) =>
    reduce ||
    itemProgress(progress, SCROLL_PHASES.secondaryCards, i, SECONDARY_ORDER.length) > 0.88;

  return (
    <div className="relative z-10 mx-auto flex max-w-[320px] flex-col items-center gap-6">
      <motion.div
        initial={false}
        animate={{ opacity: posVisible ? 1 : 0, y: posVisible ? 0 : 24 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <GlowPlatform visible={posVisible} />
        <AnimatedPOS assemble={posVisible ? 1 : 0} />
      </motion.div>

      <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-mid-gray">
        Core platform
      </p>
      {PRIMARY_MODULES.map((mod, i) => (
        <EcosystemFeatureCard
          key={mod.id}
          module={mod}
          visible={primaryVisible(i)}
          dimmed={false}
          highlighted={hoveredId === mod.id}
          onHover={setHoveredId}
          layout="stack"
        />
      ))}

      <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.1em] text-mid-gray">
        Grows with you
      </p>
      {SECONDARY_MODULES.map((mod, i) => (
        <EcosystemFeatureCard
          key={mod.id}
          module={mod}
          visible={secondaryVisible(i)}
          dimmed={false}
          highlighted={hoveredId === mod.id}
          onHover={setHoveredId}
          layout="stack"
        />
      ))}
    </div>
  );
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setProgress(v);
  });

  const headerOpacity = phaseProgress(progress, SCROLL_PHASES.header);
  const linesActive = reduce || progress >= SCROLL_PHASES.primaryLines.start;

  const primaryCardProgress = useMemo(() => {
    const map: Record<string, number> = {};
    PRIMARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(
        progress,
        SCROLL_PHASES.primaryCards,
        i,
        PRIMARY_ORDER.length
      );
    });
    return map;
  }, [progress]);

  const secondaryCardProgress = useMemo(() => {
    const map: Record<string, number> = {};
    SECONDARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(
        progress,
        SCROLL_PHASES.secondaryCards,
        i,
        SECONDARY_ORDER.length
      );
    });
    return map;
  }, [progress]);

  const primaryLineProgress = useMemo(() => {
    const map: Record<string, number> = {};
    PRIMARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(
        progress,
        SCROLL_PHASES.primaryLines,
        i,
        PRIMARY_ORDER.length
      );
    });
    return map;
  }, [progress]);

  const secondaryLineProgress = useMemo(() => {
    const map: Record<string, number> = {};
    SECONDARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(
        progress,
        SCROLL_PHASES.secondaryLines,
        i,
        SECONDARY_ORDER.length
      );
    });
    return map;
  }, [progress]);

  const activeNavId =
    progress >= SCROLL_PHASES.primaryLines.start
      ? "wired"
      : progress >= SCROLL_PHASES.secondaryCards.start
        ? "expanded"
        : "core";

  const scrollToProgress = useCallback((target: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + target * scrollable, behavior: "smooth" });
  }, []);

  const anyHovered = hoveredId !== null;

  useEffect(() => {
    if (!linesActive || reduce || anyHovered) return;
    const interval = setInterval(() => {
      const pool = [...PRIMARY_ORDER, ...SECONDARY_ORDER];
      const id = pool[Math.floor(Math.random() * pool.length)];
      setPulseId(id);
      setTimeout(() => setPulseId(null), 1100);
    }, 4200);
    return () => clearInterval(interval);
  }, [linesActive, reduce, anyHovered]);

  useEffect(() => {
    if (hoveredId) setPulseId(hoveredId);
    else if (!reduce) setPulseId(null);
  }, [hoveredId, reduce]);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative bg-paper"
      style={{ height: "220vh" }}
      aria-labelledby="ecosystem-heading"
    >
      <div className="sticky top-0 hidden h-screen flex-col overflow-hidden md:flex">
        <SectionBackground />

        <motion.header
          className="relative z-10 mx-auto max-w-[700px] shrink-0 px-6 pt-10 text-center md:pt-12"
          style={{ opacity: reduce ? 1 : headerOpacity, willChange: "opacity" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ember md:text-[12px]">
            All-in-One Restaurant Operating System
          </p>
          <h2
            id="ecosystem-heading"
            className="mt-3 font-sf-pro-display text-[30px] font-semibold leading-[1.08] tracking-[-0.2px] text-primary-ink md:text-[40px] lg:text-[48px]"
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
          <p className="mt-3 text-[16px] leading-[1.45] text-mid-gray md:text-[18px]">
            Everything your restaurant needs.
            <br />
            Powered by one intelligent platform.
          </p>
        </motion.header>

        <div className="relative z-10 min-h-0 flex-1">
          <EcosystemComposition
            progress={progress}
            reduce={!!reduce}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            primaryCardProgress={primaryCardProgress}
            secondaryCardProgress={secondaryCardProgress}
            primaryLineProgress={primaryLineProgress}
            secondaryLineProgress={secondaryLineProgress}
            pulseId={pulseId}
            linesActive={linesActive}
          />
        </div>

        <DotNav activeId={activeNavId} onSelect={scrollToProgress} />
      </div>

      {/* Mobile — vertical timeline, full-size cards */}
      <div className="relative px-6 py-16 md:hidden">
        <SectionBackground />
        <header className="relative z-10 mx-auto max-w-[700px] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
            All-in-One Restaurant Operating System
          </p>
          <h2 className="mt-4 font-sf-pro-display text-[32px] font-semibold leading-[1.08] tracking-[-0.2px] text-primary-ink">
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
          <p className="mt-4 text-[17px] leading-[1.45] text-mid-gray">
            Everything your restaurant needs. Powered by one intelligent platform.
          </p>
        </header>

        <div className="relative z-10 mt-10">
          <MobileTimeline
            progress={progress}
            reduce={!!reduce}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        </div>
      </div>
    </section>
  );
}
