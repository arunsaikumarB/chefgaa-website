import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  SVG_CENTER,
  SVG_VIEWBOX,
  buildCurvePath,
  getConnectionPoint,
  getFeature,
} from "./features";

type ConnectionLinesProps = {
  lineProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
};

export function ConnectionLines({
  lineProgress,
  highlightedId,
  pulseId,
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
        <filter id="eco-glow" x="-20%" y="-20%" width="140%" height="140%">
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
        const end = getConnectionPoint(feat);
        const pathD = buildCurvePath(SVG_CENTER.x, SVG_CENTER.y, end.x, end.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id;
        const pulsing = pulseId === id;

        return (
          <g key={id}>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke={lit || pulsing ? "#ff6e14" : feat.accent}
              strokeWidth={lit || pulsing ? 2.5 : 1.5}
              strokeOpacity={lit || pulsing ? 0.65 : 0.28}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit || pulsing ? "url(#eco-glow)" : undefined}
              style={{ willChange: "stroke-dashoffset, stroke-opacity" }}
            />
            {pulsing && progress >= 1 && !reduce && (
              <HoverPulse key={`pulse-${id}`} pathD={pathD} color="#ff6e14" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function HoverPulse({ pathD, color }: { pathD: string; color: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;

    let start: number | null = null;
    const duration = 620;
    const length = path.getTotalLength();

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const pt = path.getPointAtLength(eased * length);
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      circle.setAttribute("opacity", String(p < 0.92 ? 0.95 : 1 - (p - 0.92) / 0.08));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [pathD]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle ref={circleRef} r={7} fill={color} filter="url(#eco-glow)" />
    </g>
  );
}
