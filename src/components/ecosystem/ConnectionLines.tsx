import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { COMPOSITION } from "./layout";
import {
  buildCurvePath,
  getModule,
  POS_CENTER,
  PRIMARY_MODULES,
  PRIMARY_ORDER,
  SECONDARY_MODULES,
  SECONDARY_ORDER,
} from "./features";

type ConnectionLinesProps = {
  primaryProgress: Record<string, number>;
  secondaryProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
  showParticles: boolean;
};

export function ConnectionLines({
  primaryProgress,
  secondaryProgress,
  highlightedId,
  pulseId,
  showParticles,
}: ConnectionLinesProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={COMPOSITION.width}
      height={COMPOSITION.height}
      viewBox={`0 0 ${COMPOSITION.width} ${COMPOSITION.height}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="eco-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="eco-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6e14" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b64400" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="eco-line-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6e14" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#b64400" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Primary: POS → primary only */}
      {PRIMARY_ORDER.map((id) => {
        const mod = PRIMARY_MODULES.find((m) => m.id === id);
        if (!mod) return null;
        const pathD = buildCurvePath(
          POS_CENTER.x,
          POS_CENTER.y,
          mod.position.x,
          mod.position.y
        );
        const progress = primaryProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id;
        return (
          <LineGroup
            key={`p-${id}`}
            pathD={pathD}
            progress={progress}
            lit={lit}
            secondary={false}
            reduce={!!reduce}
            showParticles={showParticles && progress >= 1}
            particleId={id}
          />
        );
      })}

      {/* Secondary: primary → secondary only */}
      {SECONDARY_ORDER.map((id) => {
        const mod = SECONDARY_MODULES.find((m) => m.id === id);
        if (!mod?.parentId) return null;
        const parent = getModule(mod.parentId);
        if (!parent) return null;
        const pathD = buildCurvePath(
          parent.position.x,
          parent.position.y,
          mod.position.x,
          mod.position.y,
          0.12
        );
        const progress = secondaryProgress[id] ?? 0;
        const lit =
          highlightedId === id ||
          pulseId === id ||
          highlightedId === mod.parentId ||
          pulseId === mod.parentId;
        return (
          <LineGroup
            key={`s-${id}`}
            pathD={pathD}
            progress={progress}
            lit={lit}
            secondary
            reduce={!!reduce}
            showParticles={showParticles && progress >= 1}
            particleId={id}
          />
        );
      })}
    </svg>
  );
}

function LineGroup({
  pathD,
  progress,
  lit,
  secondary,
  reduce,
  showParticles,
  particleId,
}: {
  pathD: string;
  progress: number;
  lit: boolean;
  secondary: boolean;
  reduce: boolean;
  showParticles: boolean;
  particleId: string;
}) {
  return (
    <g data-ecosystem-line={particleId}>
      <path
        d={pathD}
        fill="none"
        stroke="#e8e8ed"
        strokeWidth={secondary ? 1.5 : 2}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke={secondary ? "url(#eco-line-secondary)" : "url(#eco-line)"}
        strokeWidth={lit ? 3 : secondary ? 1.5 : 2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        filter={lit ? "url(#eco-glow)" : undefined}
        style={{ willChange: "stroke-dashoffset" }}
      />
      {showParticles && !reduce && <ParticleOnPath pathD={pathD} id={particleId} />}
    </g>
  );
}

function ParticleOnPath({ pathD, id }: { pathD: string; id: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const pathEl = pathRef.current;
    const circleEl = circleRef.current;
    if (!pathEl || !circleEl) return;

    let start: number | null = null;
    const duration = 3000 + (id.charCodeAt(0) % 4) * 500;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = ((ts - start) % duration) / duration;
      const point = pathEl.getPointAtLength(t * pathEl.getTotalLength());
      circleEl.setAttribute("cx", String(point.x));
      circleEl.setAttribute("cy", String(point.y));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathD, id]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle
        ref={circleRef}
        r="3"
        fill="#ff6e14"
        opacity="0.7"
        style={{ filter: "drop-shadow(0 0 2px rgba(255,110,20,0.6))" }}
      />
    </g>
  );
}
