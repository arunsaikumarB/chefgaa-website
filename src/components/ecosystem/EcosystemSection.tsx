import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  CHILD_MAP,
  NAV_DOTS,
  PARENT_MAP,
  PRIMARY_MODULES,
  PRIMARY_ORDER,
  SCROLL_PHASES,
  SECONDARY_MODULES,
  SECONDARY_ORDER,
  itemProgress,
  phaseProgress,
} from "./features";

function isRelated(hoverId: string | null, moduleId: string): boolean {
  if (!hoverId) return false;
  if (hoverId === moduleId) return true;
  if (CHILD_MAP[hoverId] === moduleId) return true;
  if (PARENT_MAP[moduleId] === hoverId) return true;
  if (PARENT_MAP[hoverId] === moduleId) return true;
  return false;
}

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
  const posAssemble = phaseProgress(progress, SCROLL_PHASES.pos);
  const platformVisible = phaseProgress(progress, SCROLL_PHASES.platform) > 0.05;
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
  const posGlowing = anyHovered;

  useEffect(() => {
    if (!storyActive || reduce || anyHovered) return;
    const interval = setInterval(() => {
      const pool =
        progress >= 0.58 ? [...PRIMARY_ORDER, ...SECONDARY_ORDER] : PRIMARY_ORDER;
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
      {/* Desktop / tablet — pinned scroll story */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <SectionBackground />
        <AnimatedParticles active={storyActive} />

        <motion.header
          className="relative z-10 mx-auto max-w-[700px] px-6 pt-14 text-center md:pt-[72px] lg:pt-20"
          style={{ opacity: reduce ? 1 : headerOpacity, willChange: "opacity" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ember md:text-[12px]">
            All-in-One Restaurant Operating System
          </p>
          <h2
            id="ecosystem-heading"
            className="mt-4 font-sf-pro-display text-[32px] font-semibold leading-[1.08] tracking-[-0.2px] text-primary-ink md:text-[44px] lg:text-[52px]"
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
          <p className="mt-4 text-[17px] leading-[1.45] text-mid-gray md:text-[19px]">
            Everything your restaurant needs.
            <br />
            Powered by one intelligent platform.
          </p>
        </motion.header>

        <div className="relative z-10 mx-auto h-[calc(100vh-200px)] w-full max-w-[1280px] px-4 lg:max-w-[1400px] lg:px-6">
          <ConnectionLines
            primaryProgress={primaryLineProgress}
            secondaryProgress={secondaryLineProgress}
            highlightedId={hoveredId}
            pulseId={pulseId}
            showParticles={storyActive}
          />

          <div className="absolute left-1/2 top-[46%] z-20 -translate-x-1/2 -translate-y-1/2">
            <GlowPlatform visible={platformVisible || !!reduce} breathing={storyActive} />
            <AnimatedPOS
              assemble={reduce ? 1 : posAssemble}
              glowing={posGlowing}
              floating={storyActive}
            />
          </div>

          {PRIMARY_MODULES.map((mod) => {
            const lineP = primaryLineProgress[mod.id] ?? 0;
            const visible = reduce || lineP > 0.72;
            return (
              <div
                key={mod.id}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
              >
                <EcosystemFeatureCard
                  module={mod}
                  visible={visible}
                  dimmed={anyHovered && !isRelated(hoveredId, mod.id)}
                  highlighted={hoveredId === mod.id}
                  related={isRelated(hoveredId, mod.id) && hoveredId !== mod.id}
                  floating={storyActive}
                  onHover={setHoveredId}
                  layout="orbit"
                />
              </div>
            );
          })}

          {SECONDARY_MODULES.map((mod) => {
            const lineP = secondaryLineProgress[mod.id] ?? 0;
            const visible = reduce || lineP > 0.72;
            const parent = PRIMARY_MODULES.find((p) => p.id === mod.parentId);
            return (
              <div
                key={mod.id}
                className="absolute z-[25] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
              >
                <EcosystemFeatureCard
                  module={mod}
                  visible={visible}
                  dimmed={anyHovered && !isRelated(hoveredId, mod.id)}
                  highlighted={hoveredId === mod.id}
                  related={isRelated(hoveredId, mod.id) && hoveredId !== mod.id}
                  floating={storyActive && visible}
                  emergeFrom={parent ? { x: parent.x, y: parent.y } : undefined}
                  onHover={setHoveredId}
                  layout="orbit"
                />
              </div>
            );
          })}
        </div>

        <DotNav activeId={activeNavId} onSelect={scrollToProgress} />
      </div>

      {/* Mobile — vertical storytelling */}
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

        <motion.div
          className="relative z-10 mx-auto mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlowPlatform visible breathing />
          <AnimatedPOS assemble={1} floating />
        </motion.div>

        <div className="relative z-10 mx-auto mt-14 flex max-w-[320px] flex-col gap-5">
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.1em] text-mid-gray">
            Core platform
          </p>
          {PRIMARY_MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <EcosystemFeatureCard
                module={mod}
                visible
                dimmed={false}
                highlighted={hoveredId === mod.id}
                onHover={setHoveredId}
                layout="stack"
              />
            </motion.div>
          ))}

          <p className="mt-6 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-mid-gray">
            Grows with you
          </p>
          {SECONDARY_MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <EcosystemFeatureCard
                module={mod}
                visible
                dimmed={false}
                highlighted={hoveredId === mod.id}
                onHover={setHoveredId}
                layout="stack"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
