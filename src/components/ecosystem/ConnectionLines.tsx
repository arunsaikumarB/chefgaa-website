import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ANIMATION_ORDER, getFeature } from "./features";

type ConnectionLinesProps = {
  paths: Record<string, string>;
  width: number;
  height: number;
  lineProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
  showParticles: boolean;
};

export function ConnectionLines({
  paths,
  width,
  height,
  lineProgress,
  highlightedId,
  pulseId,
  showParticles,
}: ConnectionLinesProps) {
  const reduce = useReducedMotion();

  if (width < 1 || height < 1) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="eco-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ANIMATION_ORDER.map((id) => {
        const feat = getFeature(id);
        const pathD = paths[id];
        if (!feat || !pathD) return null;

        const progress = lineProgress[id] ?? 0;
        const hovered = highlightedId === id;
        const pulsing = pulseId === id;
        const lit = hovered || pulsing;

        return (
          <g key={id}>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke={hovered ? "#ff6e14" : feat.accent}
              strokeWidth={lit ? 2.2 : 1.2}
              strokeOpacity={lit ? 0.65 : 0.25}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit ? "url(#eco-glow)" : undefined}
            />
            {hovered && progress >= 1 && !reduce && (
              <HubPulse pathD={pathD} active={hovered} />
            )}
            {showParticles && progress >= 1 && !reduce && !hovered && (
              <PathParticle pathD={pathD} color={feat.accent} id={id} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function HubPulse({ pathD, active }: { pathD: string; active: boolean }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle || !active) return;

    let start: number | null = null;
    const duration = 900;

    const tick = (ts: number) => {
      if (!active) return;
      if (start === null) start = ts;
      const elapsed = (ts - start) % duration;
      const t = elapsed / duration;
      const length = path.getTotalLength();
      const pt = path.getPointAtLength(t * length);
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [pathD, active]);

  if (!active) return null;

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle ref={circleRef} r={4.5} fill="#ff6e14" opacity={0.95} filter="url(#eco-glow)" />
    </g>
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
    const duration = 3000 + (id.charCodeAt(0) % 4) * 500;
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
      <circle ref={circleRef} r={3} fill={color} opacity={0.7} />
    </g>
  );
}
