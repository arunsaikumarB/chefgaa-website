import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { ModuleLabel } from "./ModuleLabel";
import { OrangePulse, PosPulse } from "./OrangePulse";
import {
  CANVAS,
  MODULES,
  POS,
  PRIMARY_ORDER,
  SECONDARY_ORDER,
  TIMELINE,
  currentPhase,
  getModule,
  phaseT,
  primaryPulseActive,
  primaryVisible,
  secondaryPulseActive,
  secondaryVisible,
} from "./features";

const DESKTOP_MIN = 1280;

function StoryCanvas({
  scroll,
  reduce,
  hoveredId,
  setHoveredId,
}: {
  scroll: number;
  reduce: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const pw = stage.clientWidth;
      const ph = stage.clientHeight;
      const fit = Math.min(pw / CANVAS.width, ph / CANVAS.height, 1);
      setScale(window.innerWidth >= DESKTOP_MIN ? 1 : fit);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const phase = currentPhase(scroll);
  const posAssemble = reduce ? 1 : phaseT(scroll, TIMELINE.phase1);
  const showGlow = reduce || scroll > 0.02;
  const wiringOn = reduce || scroll >= TIMELINE.wiring.start;

  const primaryLines = useMemo(() => {
    const map: Record<string, number> = {};
    const t = phaseT(scroll, TIMELINE.wiring);
    const slot = 1 / (PRIMARY_ORDER.length + SECONDARY_ORDER.length);
    PRIMARY_ORDER.forEach((id, i) => {
      map[id] = Math.max(0, Math.min(1, (t - i * slot) / slot));
    });
    return map;
  }, [scroll]);

  const secondaryLines = useMemo(() => {
    const map: Record<string, number> = {};
    const t = phaseT(scroll, TIMELINE.wiring);
    const slot = 1 / (PRIMARY_ORDER.length + SECONDARY_ORDER.length);
    SECONDARY_ORDER.forEach((id, i) => {
      const idx = PRIMARY_ORDER.length + i;
      map[id] = Math.max(0, Math.min(1, (t - idx * slot) / slot));
    });
    return map;
  }, [scroll]);

  const anyHover = hoveredId !== null;
  const primaries = MODULES.filter((m) => m.tier === "primary");
  const secondaries = MODULES.filter((m) => m.tier === "secondary");

  return (
    <div
      ref={stageRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        className="relative"
        style={{
          width: CANVAS.width,
          height: CANVAS.height,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "center center",
        }}
      >
        {/* Glow — phase 1 */}
        <div
          className="absolute z-[10] -translate-x-1/2 -translate-y-1/2"
          style={{ left: POS.x, top: POS.y }}
        >
          <GlowPlatform visible={showGlow} breathing={phase === "complete" || phase === "wiring"} />
        </div>

        {/* Wiring — phase 4, behind everything */}
        <div className="absolute inset-0 z-[15]">
          <ConnectionLines
            primaryProgress={primaryLines}
            secondaryProgress={secondaryLines}
            visible={wiringOn}
          />
        </div>

        {/* POS — always hero */}
        <div
          className="absolute z-[40] -translate-x-1/2 -translate-y-1/2"
          style={{ left: POS.x, top: POS.y }}
        >
          <AnimatedPOS assemble={posAssemble} glowing={anyHover} />
        </div>

        {/* Orange pulses — phase 2 & 3 */}
        {PRIMARY_ORDER.map((id, i) => {
          const mod = getModule(id);
          if (!mod) return null;
          return (
            <OrangePulse
              key={`pulse-p-${id}`}
              from={POS}
              to={{ x: mod.x, y: mod.y }}
              active={!reduce && primaryPulseActive(scroll, i)}
            />
          );
        })}
        {SECONDARY_ORDER.map((id, i) => {
          const mod = getModule(id);
          if (!mod?.parentId) return null;
          const parent = getModule(mod.parentId);
          if (!parent) return null;
          return (
            <OrangePulse
              key={`pulse-s-${id}`}
              from={{ x: parent.x, y: parent.y }}
              to={{ x: mod.x, y: mod.y }}
              active={!reduce && secondaryPulseActive(scroll, i)}
            />
          );
        })}
        {PRIMARY_ORDER.map((_, i) => (
          <PosPulse
            key={`pos-pulse-${i}`}
            x={POS.x}
            y={POS.y}
            active={!reduce && primaryPulseActive(scroll, i)}
          />
        ))}

        {/* Primary labels — phase 2 */}
        {primaries.map((mod, i) => (
          <div
            key={mod.id}
            className="absolute z-[50] -translate-x-1/2 -translate-y-1/2"
            style={{ left: mod.x, top: mod.y }}
          >
            <ModuleLabel
              module={mod}
              visible={reduce || primaryVisible(scroll, i)}
              highlighted={hoveredId === mod.id}
              dimmed={anyHover && hoveredId !== mod.id}
              onHover={setHoveredId}
            />
          </div>
        ))}

        {/* Secondary labels — phase 3 */}
        {secondaries.map((mod, i) => (
          <div
            key={mod.id}
            className="absolute z-[50] -translate-x-1/2 -translate-y-1/2"
            style={{ left: mod.x, top: mod.y }}
          >
            <ModuleLabel
              module={mod}
              visible={reduce || secondaryVisible(scroll, i)}
              highlighted={hoveredId === mod.id}
              dimmed={anyHover && hoveredId !== mod.id}
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
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [scroll, setScroll] = useState(reduce ? 1 : 0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setScroll(v);
  });

  const headerOpacity = reduce ? 1 : Math.min(1, scroll / 0.06);
  const phase = currentPhase(scroll);
  const activeDot =
    phase === "complete" || phase === "wiring"
      ? "wiring"
      : phase === "expansion"
        ? "expansion"
        : phase === "primary"
          ? "primary"
          : "pos";

  const scrollTo = useCallback((target: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + target * scrollable, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative bg-paper"
      style={{ height: "220vh" }}
      aria-labelledby="ecosystem-heading"
    >
      {/* Desktop / tablet cinematic story */}
      <div className="sticky top-0 hidden h-screen flex-col overflow-hidden md:flex">
        <SectionBackground />

        <motion.header
          className="relative z-[60] mx-auto max-w-[700px] shrink-0 px-6 pt-10 text-center"
          style={{ opacity: headerOpacity }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
            All-in-One Restaurant Operating System
          </p>
          <h2
            id="ecosystem-heading"
            className="mt-3 font-sf-pro-display text-[32px] font-semibold leading-[1.08] tracking-[-0.2px] text-primary-ink md:text-[44px]"
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
          <p className="mt-3 text-[16px] leading-[1.5] text-mid-gray">
            Everything your restaurant needs. Powered by one intelligent platform.
          </p>
        </motion.header>

        <div className="relative min-h-0 flex-1">
          <StoryCanvas
            scroll={scroll}
            reduce={!!reduce}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        </div>

        {/* Phase dots */}
        <nav
          className="absolute right-6 top-1/2 z-[60] hidden -translate-y-1/2 md:block"
          aria-label="Story progress"
        >
          <ul className="flex flex-col gap-3">
            {(
              [
                { id: "pos", label: "POS", at: 0 },
                { id: "primary", label: "Core modules", at: TIMELINE.primary.start },
                { id: "expansion", label: "Expansion", at: TIMELINE.expansion.start },
                { id: "wiring", label: "Connected", at: TIMELINE.wiring.start },
              ] as const
            ).map((dot) => (
              <li key={dot.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(dot.at)}
                  aria-label={dot.label}
                  className="flex h-7 w-7 items-center justify-center"
                >
                  <span
                    className={`rounded-full transition-all ${
                      activeDot === dot.id
                        ? "h-2 w-2 bg-ember shadow-[0_0_8px_rgba(255,110,20,0.5)]"
                        : "h-1.5 w-1.5 bg-hairline"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile timeline */}
      <div className="px-6 py-16 md:hidden">
        <SectionBackground />
        <header className="relative z-10 mx-auto max-w-[700px] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
            All-in-One Restaurant Operating System
          </p>
          <h2 className="mt-4 font-sf-pro-display text-[32px] font-semibold text-primary-ink">
            The Chefgaa Ecosystem
          </h2>
        </header>

        <div className="relative z-10 mx-auto mt-10 flex max-w-[280px] flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <GlowPlatform visible breathing />
            <AnimatedPOS assemble={1} />
          </div>

          {MODULES.filter((m) => m.tier === "primary").map((mod) => (
            <ModuleLabel key={mod.id} module={mod} visible highlighted={hoveredId === mod.id} onHover={setHoveredId} />
          ))}

          {MODULES.filter((m) => m.tier === "secondary").map((mod) => (
            <ModuleLabel key={mod.id} module={mod} visible highlighted={hoveredId === mod.id} onHover={setHoveredId} />
          ))}
        </div>
      </div>
    </section>
  );
}
