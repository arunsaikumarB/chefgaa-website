import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ANIMATION_ORDER, SVG_CENTER, SVG_VIEWBOX, buildCurvePath, getFeature } from "./features";

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
      viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="eco-glow" x="-25%" y="-25%" width="150%" height="150%">
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
        const pathD = buildCurvePath(SVG_CENTER.x, SVG_CENTER.y, feat.svg.x, feat.svg.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id;

        return (
          <g key={id}>
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
              strokeWidth={lit ? 2.5 : 1.75}
              strokeOpacity={lit ? 0.55 : 0.3}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit ? "url(#eco-glow)" : undefined}
              style={{ willChange: lit ? "stroke-dashoffset" : undefined }}
            />
            {showParticles && progress >= 1 && !reduce && lit && (
              <PathParticle pathD={pathD} id={id} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function PathParticle({ pathD, id }: { pathD: string; id: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;
    let start: number | null = null;
    const duration = 900;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const pt = path.getPointAtLength(t * path.getTotalLength());
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [pathD, id]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle ref={circleRef} r={4} fill="#ff6e14" opacity={0.9} />
    </g>
  );
}
