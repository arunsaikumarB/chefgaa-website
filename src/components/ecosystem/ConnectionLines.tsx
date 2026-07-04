import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ANIMATION_ORDER,
  CANVAS,
  CENTER,
  buildConnectionPath,
  getFeature,
} from "./features";

type ConnectionLinesProps = {
  lineProgress: Record<string, number>;
  highlightedId: string | null;
  pulseId: string | null;
  showParticles: boolean;
  glowPulse: boolean;
};

type PathCap = { x: number; y: number; angle: number };

function ConnectorCaps({
  pathD,
  color,
  progress,
  lit,
}: {
  pathD: string;
  color: string;
  progress: number;
  lit: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [caps, setCaps] = useState<{ start: PathCap; end: PathCap } | null>(null);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    if (len < 1) return;

    const sample = Math.min(6, len * 0.04);
    const p0 = el.getPointAtLength(0);
    const p1 = el.getPointAtLength(sample);
    const pEnd = el.getPointAtLength(len);
    const pBefore = el.getPointAtLength(Math.max(0, len - sample));

    setCaps({
      start: {
        x: p0.x,
        y: p0.y,
        angle: (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI,
      },
      end: {
        x: pEnd.x,
        y: pEnd.y,
        angle: (Math.atan2(pEnd.y - pBefore.y, pEnd.x - pBefore.x) * 180) / Math.PI,
      },
    });
  }, [pathD]);

  const hubOpacity = lit ? 0.9 : 0.55;
  const arrowOpacity = lit ? 0.95 : 0.6;

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" aria-hidden="true" />

      {caps && progress > 0.06 && (
        <circle
          cx={caps.start.x}
          cy={caps.start.y}
          r={lit ? 4.2 : 3.6}
          fill={color}
          fillOpacity={hubOpacity}
          style={{ filter: lit ? `drop-shadow(0 0 5px ${color})` : undefined }}
        />
      )}

      {caps && progress > 0.9 && (
        <g
          transform={`translate(${caps.end.x}, ${caps.end.y}) rotate(${caps.end.angle})`}
          style={{ filter: lit ? `drop-shadow(0 0 6px ${color})` : undefined }}
        >
          <path
            d="M -11 -5.2 L 0 0 L -11 5.2 Z"
            fill={color}
            fillOpacity={arrowOpacity}
          />
        </g>
      )}
    </g>
  );
}

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
        <filter id="eco-line-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ANIMATION_ORDER.map((id) => {
        const feat = getFeature(id);
        if (!feat) return null;

        const pathD = buildConnectionPath(CENTER.x, CENTER.y, feat.x, feat.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id || glowPulse;
        const visible = progress > 0.02;

        return (
          <g key={id} data-ecosystem-line={id} opacity={visible ? 1 : 0}>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth={2}
              strokeLinecap="round"
            />

            <path
              d={pathD}
              fill="none"
              stroke={feat.accent}
              strokeOpacity={lit ? 0.65 : 0.36}
              strokeWidth={lit ? 2.75 : 2}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
              filter={lit ? "url(#eco-line-glow)" : undefined}
              style={{ willChange: "stroke-dashoffset" }}
            />

            <ConnectorCaps pathD={pathD} color={feat.accent} progress={progress} lit={lit} />

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
        r="3.5"
        fill={color}
        opacity="0.7"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </g>
  );
}
