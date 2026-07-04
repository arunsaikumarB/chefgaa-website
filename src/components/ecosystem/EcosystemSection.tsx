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

function DotNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (progress: number) => void;
}) {
  return (
    <nav
      className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block lg:right-8"
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
  primaryLineProgress,
  secondaryLineProgress,
  pulseId,
  storyActive,
}: {
  progress: number;
  reduce: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  primaryLineProgress: Record<string, number>;
  secondaryLineProgress: Record<string, number>;
  pulseId: string | null;
  storyActive: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const pw = stage.clientWidth;
      const ph = stage.clientHeight;
      const s = Math.min(pw / COMPOSITION.width, ph / COMPOSITION.height, 1);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const posAssemble = phaseProgress(progress, SCROLL_PHASES.pos);
  const platformVisible = phaseProgress(progress, SCROLL_PHASES.platform) > 0.05;
  const anyHovered = hoveredId !== null;

  return (
    <div ref={stageRef} className="relative flex h-full w-full items-center justify-center">
      <div
        className="relative"
        style={{
          width: COMPOSITION.width,
          height: COMPOSITION.height,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* Lines behind everything */}
        <div className="absolute inset-0 z-[5]">
          <ConnectionLines
            primaryProgress={primaryLineProgress}
            secondaryProgress={secondaryLineProgress}
            highlightedId={hoveredId}
            pulseId={pulseId}
            showParticles={storyActive}
          />
        </div>

        {/* POS — exact center */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: POS_POSITION.x, top: POS_POSITION.y }}
        >
          <GlowPlatform visible={platformVisible || !!reduce} breathing={storyActive} />
          <AnimatedPOS
            assemble={reduce ? 1 : posAssemble}
            glowing={anyHovered}
          />
        </div>

        {/* Ring 1 — primary cards */}
        {PRIMARY_MODULES.map((mod) => {
          const lineP = primaryLineProgress[mod.id] ?? 0;
          const visible = reduce || lineP > 0.72;
          return (
            <div
              key={mod.id}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
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

        {/* Ring 2 — secondary cards */}
        {SECONDARY_MODULES.map((mod) => {
          const lineP = secondaryLineProgress[mod.id] ?? 0;
          const visible = reduce || lineP > 0.72;
          const parent = mod.parentId ? getModule(mod.parentId) : undefined;
          return (
            <div
              key={mod.id}
              className="absolute z-[28] -translate-x-1/2 -translate-y-1/2"
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
  const storyActive = progress > 0.5;

  const primaryLineProgress = useMemo(() => {
    const map: Record<string, number> = {};
    PRIMARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(progress, SCROLL_PHASES.primary, i, PRIMARY_ORDER.length);
    });
    return map;
  }, [progress]);

  const secondaryLineProgress = useMemo(() => {
    const map: Record<string, number> = {};
    SECONDARY_ORDER.forEach((id, i) => {
      map[id] = itemProgress(
        progress,
        SCROLL_PHASES.secondary,
        i,
        SECONDARY_ORDER.length
      );
    });
    return map;
  }, [progress]);

  const activeNavId = progress >= 0.58 ? "expanded" : "core";

  const scrollToProgress = useCallback((target: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + target * scrollable, behavior: "smooth" });
  }, []);

  const anyHovered = hoveredId !== null;

  useEffect(() => {
    if (!storyActive || reduce || anyHovered) return;
    const interval = setInterval(() => {
      const pool =
        progress >= 0.58 ? [...PRIMARY_ORDER, ...SECONDARY_ORDER] : [...PRIMARY_ORDER];
      const id = pool[Math.floor(Math.random() * pool.length)];
      setPulseId(id);
      setTimeout(() => setPulseId(null), 1100);
    }, 4200);
    return () => clearInterval(interval);
  }, [storyActive, reduce, anyHovered, progress]);

  useEffect(() => {
    if (hoveredId) setPulseId(hoveredId);
    else if (!reduce) setPulseId(null);
  }, [hoveredId, reduce]);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative bg-paper"
      style={{ height: "180vh" }}
      aria-labelledby="ecosystem-heading"
    >
      <div className="sticky top-0 hidden h-screen flex-col overflow-hidden md:flex">
        <SectionBackground />
        <AnimatedParticles active={storyActive} />

        <motion.header
          className="relative z-10 mx-auto max-w-[700px] shrink-0 px-6 pt-12 text-center md:pt-14 lg:pt-16"
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
            primaryLineProgress={primaryLineProgress}
            secondaryLineProgress={secondaryLineProgress}
            pulseId={pulseId}
            storyActive={storyActive}
          />
        </div>

        <DotNav activeId={activeNavId} onSelect={scrollToProgress} />
      </div>

      {/* Mobile — scaled composition, same fixed layout */}
      <div className="relative overflow-hidden px-4 py-16 md:hidden">
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

        <div className="relative z-10 mx-auto mt-8 h-[70vh] min-h-[480px] w-full">
          <EcosystemComposition
            progress={1}
            reduce
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            primaryLineProgress={Object.fromEntries(PRIMARY_ORDER.map((id) => [id, 1]))}
            secondaryLineProgress={Object.fromEntries(SECONDARY_ORDER.map((id) => [id, 1]))}
            pulseId={null}
            storyActive
          />
        </div>
      </div>
    </section>
  );
}
