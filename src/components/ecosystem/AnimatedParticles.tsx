import { useReducedMotion } from "framer-motion";

export function AnimatedParticles({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;

  const dots = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: 12 + (i * 9) % 76,
    top: 15 + (i * 11) % 70,
    delay: i * 0.7,
    size: 3 + (i % 2),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-ember/[0.06]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animation: `ecosystem-float ${7 + d.delay}s ease-in-out ${d.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
