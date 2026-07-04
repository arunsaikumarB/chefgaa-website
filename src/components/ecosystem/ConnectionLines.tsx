import { useRef, type RefObject } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
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

type HubSpokeProps = {
  id: string;
  pathD: string;
  accent: string;
  progress: number;
  lit: boolean;
  showParticles: boolean;
  reduce: boolean | null;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function FlowParticle({
  pathRef,
  color,
  lit,
  delay,
  size,
  opacity,
  duration,
}: {
  pathRef: RefObject<SVGPathElement>;
  color: string;
  lit: boolean;
  delay: number;
  size: number;
  opacity: number;
  duration: number;
}) {
  const x = useMotionValue<number>(CENTER.x);
  const y = useMotionValue<number>(CENTER.y);
  const glow = useTransform(x, () => (lit ? 1.35 : 1));

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (!len) return;
    const t = ((time + delay) % duration) / duration;
    const point = path.getPointAtLength(t * len);
    x.set(point.x);
    y.set(point.y);
  });

  return (
    <motion.g style={{ x, y, opacity: lit ? opacity * 1.2 : opacity }}>
      <motion.circle
        r={size * 2.2}
        fill={color}
        opacity={0.18}
        style={{ scale: glow }}
      />
      <circle r={size} fill={color} opacity={0.95} />
    </motion.g>
  );
}

function HubSpokeConnection({
  id,
  pathD,
  accent,
  progress,
  lit,
  showParticles,
  reduce,
}: HubSpokeProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const complete = progress >= 0.98;
  const active = progress > 0.001;

  return (
    <g data-ecosystem-line={id}>
      {/* Sampling path for particle motion */}
      <path ref={pathRef} d={pathD} fill="none" stroke="none" aria-hidden="true" />

      {/* Ghost track */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(0,0,0,0.035)"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Soft glow layer — follows draw progress */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#eco-flow-${id})`}
        strokeWidth={lit ? 7 : 5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#eco-flow-blur)"
        initial={false}
        animate={{
          pathLength: progress,
          opacity: active ? (lit ? 0.55 : 0.32) : 0,
        }}
        transition={{ pathLength: { duration: 0 }, opacity: { duration: 0.35, ease: EASE } }}
        style={{ pathLength: 1, vectorEffect: "non-scaling-stroke" }}
      />

      {/* Primary data-flow stroke */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#eco-flow-${id})`}
        strokeWidth={lit ? 2.6 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={lit ? "url(#eco-flow-shine)" : undefined}
        initial={false}
        animate={{
          pathLength: progress,
          opacity: active ? (lit ? 1 : 0.82) : 0,
        }}
        transition={{ pathLength: { duration: 0 }, opacity: { duration: 0.3, ease: EASE } }}
        style={{ pathLength: 1, vectorEffect: "non-scaling-stroke" }}
      />

      {/* Module terminal node */}
      {complete && (
        <motion.circle
          cx={getTerminalPoint(pathD).x}
          cy={getTerminalPoint(pathD).y}
          r={lit ? 4 : 3}
          fill={accent}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: lit ? 0.95 : 0.6, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      )}

      {/* Continuous data particles once the path is drawn */}
      {showParticles && complete && !reduce && (
        <>
          <FlowParticle
            pathRef={pathRef}
            color="#ff6e14"
            lit={lit}
            delay={0}
            size={3.2}
            opacity={0.75}
            duration={lit ? 2600 : 3400}
          />
          <FlowParticle
            pathRef={pathRef}
            color={accent}
            lit={lit}
            delay={lit ? 900 : 1400}
            size={2.2}
            opacity={0.5}
            duration={lit ? 3000 : 4000}
          />
        </>
      )}
    </g>
  );
}

function getTerminalPoint(pathD: string) {
  const parts = pathD.trim().split(/\s+/);
  const len = parts.length;
  return {
    x: Number(parts[len - 2]),
    y: Number(parts[len - 1]),
  };
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
      className="pointer-events-none absolute inset-0 h-full w-full"
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="eco-hub-glow">
          <stop offset="0%" stopColor="#ff6e14" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff6e14" stopOpacity="0" />
        </radialGradient>

        <filter id="eco-flow-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="eco-flow-shine" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
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
              key={id}
              id={`eco-flow-${id}`}
              gradientUnits="userSpaceOnUse"
              x1={CENTER.x}
              y1={CENTER.y}
              x2={feat.x}
              y2={feat.y}
            >
              <stop offset="0%" stopColor="#ff6e14" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#ff8a3d" stopOpacity="0.75" />
              <stop offset="100%" stopColor={feat.accent} stopOpacity="0.55" />
            </linearGradient>
          );
        })}
      </defs>

      {/* Central POS hub */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={6}
        fill="#ff6e14"
        initial={false}
        animate={{
          opacity: highlightedId || glowPulse ? 0.95 : 0.55,
          scale: highlightedId ? 1.2 : 1,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
      />

      {/* Central POS hub pulse */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={18}
        fill="url(#eco-hub-glow)"
        initial={false}
        animate={{
          opacity: glowPulse || highlightedId ? [0.12, 0.28, 0.12] : 0.08,
          scale: glowPulse ? [1, 1.08, 1] : 1,
        }}
        transition={{
          duration: glowPulse ? 1.2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
      />

      {ANIMATION_ORDER.map((id) => {
        const feat = getFeature(id);
        if (!feat) return null;
        const pathD = buildCurvePath(CENTER.x, CENTER.y, feat.x, feat.y);
        const progress = lineProgress[id] ?? 0;
        const lit = highlightedId === id || pulseId === id || glowPulse;

        return (
          <HubSpokeConnection
            key={id}
            id={id}
            pathD={pathD}
            accent={feat.accent}
            progress={progress}
            lit={lit}
            showParticles={showParticles}
            reduce={reduce}
          />
        );
      })}
    </svg>
  );
}
