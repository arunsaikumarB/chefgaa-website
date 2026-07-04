import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  CANVAS,
  CENTER,
  buildCurvePath,
  getFeature,
} from "./features";

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

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="eco-line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ANIMATION_ORDER.map((id) => {
        const feat = getFeature(id);
        if (!feat) return null;
        const pathD = buildCurvePath(CENTER.x, CENTER.y, feat.x, feat.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id || glowPulse;
        return (
          <g key={id} data-ecosystem-line={id}>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke={feat.accent}
              strokeOpacity={lit ? 0.55 : 0.28}
              strokeWidth={lit ? 2.5 : 1.5}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit ? "url(#eco-line-glow)" : undefined}
              style={{ willChange: "stroke-dashoffset" }}
            />
            {showParticles && progress >= 1 && !reduce && (
              <ParticleOnPath pathD={pathD} id={id} color={feat.accent} />
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
  color,
}: {
  pathD: string;
  id: string;
  color: string;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const pathEl = pathRef.current;
    const circleEl = circleRef.current;
    if (!pathEl || !circleEl) return;

    let start: number | null = null;
    const duration = 3200 + (id.charCodeAt(0) % 5) * 600;

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
        fill={color}
        opacity="0.65"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </g>
  );
}
