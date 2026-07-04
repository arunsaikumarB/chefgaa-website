import { useReducedMotion } from "framer-motion";

/** Ambient floating particles in the ecosystem background */
export function AnimatedParticles({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;

  const dots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 15 + (i * 11) % 70,
    top: 20 + (i * 13) % 60,
    delay: i * 0.6,
    size: 3 + (i % 3),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-ember/20"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animation: `ecosystem-float ${6 + d.delay}s ease-in-out ${d.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
