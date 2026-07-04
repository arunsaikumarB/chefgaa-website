import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  CENTER,
  COMPOSITION,
  buildCurvePath,
  getFeature,
} from "./features";

type ConnectionLinesProps = {
  lineProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
  showParticles: boolean;
};

export function ConnectionLines({
  lineProgress,
  highlightedId,
  pulseId,
  showParticles,
}: ConnectionLinesProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${COMPOSITION.width} ${COMPOSITION.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="eco-line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
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
        const lit = highlightedId === id || pulseId === id;

        return (
          <g key={id} data-ecosystem-line={id}>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke={feat.accent}
              strokeWidth={lit ? 2.5 : 1.5}
              strokeOpacity={lit ? 0.55 : 0.28}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit ? "url(#eco-line-glow)" : undefined}
              style={{ willChange: "stroke-dashoffset" }}
            />
            {showParticles && progress >= 1 && !reduce && (
              <PathParticle pathD={pathD} color={feat.accent} id={id} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function PathParticle({ pathD, color, id }: { pathD: string; color: string; id: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;

    let start: number | null = null;
    const duration = 2800 + (id.charCodeAt(0) % 5) * 400;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = ((ts - start) % duration) / duration;
      const pt = path.getPointAtLength(t * path.getTotalLength());
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [pathD, id]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle
        ref={circleRef}
        r={3.5}
        fill={color}
        opacity={0.75}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </g>
  );
}
