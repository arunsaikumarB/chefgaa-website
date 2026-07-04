import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  buildCurvePath,
  ECOSYSTEM_FEATURES,
} from "./features";

const CENTER = { x: 50, y: 50 };

type ConnectionLinesProps = {
  lineProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
  showParticles: boolean;
  glowPulse: boolean;
};

export function ConnectionLines({
  lineProgress,
  highlightedId,
  pulseId,
  showParticles,
  glowPulse,
}: ConnectionLinesProps) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="ecosystem-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6e14" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b64400" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {ANIMATION_ORDER.map((id) => {
        const feature = ECOSYSTEM_FEATURES.find((f) => f.id === id);
        if (!feature) return null;

        const pathD = buildCurvePath(CENTER.x, CENTER.y, feature.x, feature.y);
        const progress = lineProgress[id] ?? 0;
        const isHighlighted = highlightedId === id || pulseId === id;

        return (
          <g key={id} data-ecosystem-line={id}>
            {/* Base track */}
            <path
              d={pathD}
              fill="none"
              stroke="#e8e8ed"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth={isHighlighted ? "0.28" : "0.18"}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={isHighlighted ? "url(#ecosystem-glow)" : undefined}
              style={{
                opacity: glowPulse && !reduce ? (isHighlighted ? 1 : 0.7) : 0.85,
                transition: "stroke-width 0.3s ease",
                willChange: "stroke-dashoffset",
              }}
            />
            {showParticles && progress >= 1 && !reduce && (
              <ParticleOnPath pathD={pathD} id={id} active={showParticles} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ParticleOnPath({
  pathD,
  id,
  active,
}: {
  pathD: string;
  id: string;
  active: boolean;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const pathEl = pathRef.current;
    const circleEl = circleRef.current;
    if (!pathEl || !circleEl) return;

    let start: number | null = null;
    const duration = 2800 + (id.charCodeAt(0) % 5) * 400;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) % duration;
      const t = elapsed / duration;
      const len = pathEl.getTotalLength();
      const point = pathEl.getPointAtLength(t * len);
      circleEl.setAttribute("cx", String(point.x));
      circleEl.setAttribute("cy", String(point.y));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, pathD, id]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle
        ref={circleRef}
        r="0.35"
        fill="#ff6e14"
        opacity="0.85"
        style={{ filter: "drop-shadow(0 0 2px rgba(255,110,20,0.8))" }}
      />
    </g>
  );
}
