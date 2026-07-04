import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  CANVAS,
  CENTER,
  buildConnection,
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
        <filter id="eco-line-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {ANIMATION_ORDER.map((id) => {
          const feat = getFeature(id);
          if (!feat) return null;
          return (
            <linearGradient
              key={`grad-${id}`}
              id={`eco-grad-${id}`}
              gradientUnits="userSpaceOnUse"
              x1={feat.x}
              y1={feat.y}
              x2={CENTER.x}
              y2={CENTER.y}
            >
              <stop offset="0%" stopColor={feat.accent} stopOpacity="0.12" />
              <stop offset="50%" stopColor={feat.accent} stopOpacity="0.38" />
              <stop offset="100%" stopColor={feat.accent} stopOpacity="0.82" />
            </linearGradient>
          );
        })}
      </defs>

      {ANIMATION_ORDER.map((id) => {
        const feat = getFeature(id);
        if (!feat) return null;

        const { pathD, start, end } = buildConnection(feat.x, feat.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id || glowPulse;
        const drawn = progress > 0.01;

        return (
          <g key={id} data-ecosystem-line={id} opacity={drawn ? 1 : 0}>
            {/* Soft glow layer */}
            <path
              d={pathD}
              fill="none"
              stroke={`url(#eco-grad-${id})`}
              strokeWidth={lit ? 7 : 5}
              strokeLinecap="round"
              strokeOpacity={lit ? 0.2 : 0.08}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter="url(#eco-line-soft-glow)"
            />

            {/* Neutral track */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(15,15,15,0.05)"
              strokeWidth={1}
              strokeLinecap="round"
            />

            {/* Primary Bezier wire */}
            <path
              d={pathD}
              fill="none"
              stroke={`url(#eco-grad-${id})`}
              strokeWidth={lit ? 2.2 : 1.4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              style={{ willChange: "stroke-dashoffset" }}
            />

            {/* Endpoint nodes */}
            {progress >= 0.98 && (
              <>
                <circle
                  cx={start.x}
                  cy={start.y}
                  r={lit ? 4 : 3}
                  fill="#ffffff"
                  stroke={feat.accent}
                  strokeWidth={lit ? 2 : 1.25}
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={lit ? 4 : 3}
                  fill="#ffffff"
                  stroke={feat.accent}
                  strokeWidth={lit ? 2 : 1.25}
                />
              </>
            )}

            {showParticles && progress >= 1 && !reduce && (
              <ParticleOnPath pathD={pathD} id={id} color={feat.accent} lit={lit} />
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
  lit,
}: {
  pathD: string;
  id: string;
  color: string;
  lit: boolean;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const pathEl = pathRef.current;
    const circleEl = circleRef.current;
    if (!pathEl || !circleEl) return;

    let start: number | null = null;
    const duration = 3600 + (id.charCodeAt(0) % 5) * 500;

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
        r={lit ? 3 : 2.25}
        fill={color}
        opacity={lit ? 0.9 : 0.5}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </g>
  );
}
