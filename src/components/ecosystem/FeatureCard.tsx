import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemFeature, IconAnimation } from "./features";

type FeatureCardProps = {
  feature: EcosystemFeature;
  visible: boolean;
  highlighted: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
};

function HoverIconAnimation({
  animation,
  active,
  children,
}: {
  animation: IconAnimation;
  active: boolean;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  if (!active || reduce) return <>{children}</>;

  const cfg: Record<IconAnimation, object> = {
    "brain-pulse": { scale: [1, 1.12, 1], transition: { duration: 0.5 } },
    "megaphone-wiggle": { rotate: [-6, 6, -3, 0], transition: { duration: 0.45 } },
    "cube-rotate": { rotateY: [0, 180, 360], transition: { duration: 0.9 } },
    "globe-rotate": { rotate: [0, 14, -14, 0], transition: { duration: 0.8 } },
    "calendar-flip": { rotateX: [0, 20, 0], transition: { duration: 0.5 } },
    steam: { y: [0, -3, 0], transition: { duration: 0.6, repeat: 1 } },
    "users-pulse": { scale: [1, 1.1, 1], transition: { duration: 0.5 } },
    "badge-shine": { scale: [1, 1.1, 1], transition: { duration: 0.45 } },
    "phone-float": { y: [0, -4, 0], transition: { duration: 0.6 } },
    "card-flip": { rotateY: [0, 18, 0], transition: { duration: 0.5 } },
    "bars-animate": { y: [0, -2, 0], transition: { duration: 0.4, repeat: 2 } },
    "cart-slide": { x: [0, 4, 0], transition: { duration: 0.45 } },
    default: {},
  };

  return (
    <motion.div
      animate={cfg[animation] as { scale?: number[]; rotate?: number[]; rotateY?: number[]; rotateX?: number[]; y?: number[]; x?: number[]; transition?: object }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard({ feature, visible, highlighted, dimmed, onHover }, ref) {
    const Icon = feature.icon;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={feature.id}
        role="article"
        aria-label={feature.title}
        tabIndex={0}
        className="pointer-events-auto w-[340px] min-h-[120px] shrink-0 rounded-[28px] border border-black/[0.05] bg-paper px-7 py-6"
        style={{
          boxShadow: highlighted
            ? "0 20px 48px rgba(0,0,0,0.1)"
            : "0 12px 40px rgba(0,0,0,0.06)",
          willChange: "transform, opacity",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.65 : 1) : 0,
          scale: visible ? (highlighted ? 1.03 : 1) : 0.85,
          y: visible ? (highlighted ? -8 : 0) : 20,
        }}
        transition={{
          opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          scale: { type: "spring", stiffness: 300, damping: 26 },
          y: { type: "spring", stiffness: 300, damping: 26 },
        }}
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <div className="flex items-start gap-4">
          <HoverIconAnimation animation={feature.iconAnimation} active={highlighted}>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
              style={{ backgroundColor: `${feature.accent}18`, color: feature.accent }}
            >
              <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
            </div>
          </HoverIconAnimation>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-sf-pro-display text-[17px] font-semibold leading-snug text-[#111111]">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-[1.5] text-mid-gray">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.article>
    );
  }
);
