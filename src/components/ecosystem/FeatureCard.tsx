import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemFeature, IconAnimation } from "./features";

type FeatureCardProps = {
  feature: EcosystemFeature;
  visible: boolean;
  dimmed: boolean;
  highlighted: boolean;
  floating?: boolean;
  onHover: (id: string | null) => void;
};

function IconMotion({
  animation,
  children,
  active,
}: {
  animation: IconAnimation;
  children: ReactNode;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  const cfg: Record<
    IconAnimation,
    { animate: Record<string, number | number[]>; transition: object }
  > = {
    "brain-pulse": {
      animate: active ? { scale: [1, 1.08, 1] } : {},
      transition: { duration: 1.2, repeat: active ? Infinity : 0, repeatDelay: 0.8 },
    },
    "megaphone-wiggle": {
      animate: active ? { rotate: [-4, 4, -2, 0] } : {},
      transition: { duration: 0.5 },
    },
    "cube-rotate": {
      animate: active ? { rotateY: [0, 180, 360] } : {},
      transition: { duration: 1.2, repeat: active ? Infinity : 0, repeatDelay: 1.2 },
    },
    "globe-rotate": {
      animate: active ? { rotate: [0, 10, -10, 0] } : {},
      transition: { duration: 1.6, repeat: active ? Infinity : 0, repeatDelay: 0.6 },
    },
    "calendar-flip": {
      animate: active ? { rotateX: [0, 14, 0] } : {},
      transition: { duration: 0.55 },
    },
    steam: {
      animate: active ? { y: [0, -2, 0], opacity: [1, 0.8, 1] } : {},
      transition: { duration: 1.6, repeat: active ? Infinity : 0 },
    },
    "users-pulse": {
      animate: active ? { scale: [1, 1.08, 1] } : {},
      transition: { duration: 0.8, repeat: active ? 2 : 0 },
    },
    "badge-shine": {
      animate: active ? { scale: [1, 1.06, 1] } : {},
      transition: { duration: 0.65 },
    },
    "phone-float": {
      animate: active ? { y: [0, -3, 0] } : {},
      transition: { duration: 1.4, repeat: active ? Infinity : 0 },
    },
    "card-flip": {
      animate: active ? { rotateY: [0, 12, 0] } : {},
      transition: { duration: 0.7, repeat: active ? 2 : 0 },
    },
    "bars-animate": {
      animate: active ? { y: [0, -2, 0] } : {},
      transition: { duration: 0.5, repeat: active ? 2 : 0 },
    },
    "cart-slide": {
      animate: active ? { x: [0, 3, 0] } : {},
      transition: { duration: 0.8, repeat: active ? 2 : 0 },
    },
    default: { animate: {}, transition: {} },
  };

  const c = cfg[animation] ?? cfg.default;
  return (
    <motion.div animate={c.animate} transition={c.transition} style={{ willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard(
    { feature, visible, dimmed, highlighted, floating = false, onHover },
    ref
  ) {
    const reduce = useReducedMotion();
    const Icon = feature.icon;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={feature.id}
        role="article"
        aria-label={feature.title}
        tabIndex={0}
        className="flex w-[360px] min-h-[132px] flex-col justify-center rounded-[28px] border border-black/[0.05] bg-paper px-8 py-7"
        style={{
          boxShadow: highlighted
            ? "0 28px 60px rgba(0,0,0,0.12)"
            : "0 12px 40px rgba(0,0,0,0.06)",
          zIndex: highlighted ? 40 : 1,
          willChange: "transform, opacity",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.55 : 1) : 0,
          scale: visible ? (highlighted ? 1.04 : 1) : 0.85,
          y: visible
            ? highlighted
              ? -10
              : floating && !reduce
                ? [0, -2, 0]
                : 0
            : 22,
        }}
        transition={{
          opacity: { duration: 0.3, ease: "easeOut" },
          scale: highlighted
            ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          y:
            floating && !reduce && visible && !highlighted
              ? { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: feature.x % 2 }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <IconMotion animation={feature.iconAnimation} active={highlighted || floating}>
          <div
            className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[13px] transition-colors"
            style={{
              backgroundColor: highlighted ? `${feature.accent}22` : `${feature.accent}14`,
              color: feature.accent,
            }}
          >
            <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
          </div>
        </IconMotion>
        <h3 className="font-sf-pro-display text-[19px] font-semibold leading-snug text-[#111111]">
          {feature.title}
        </h3>
        <p className="mt-1.5 text-[15px] leading-[1.5] text-mid-gray">
          {feature.description}
        </p>
      </motion.article>
    );
  }
);
