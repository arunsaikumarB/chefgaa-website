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

  const variants: Record<IconAnimation, object> = {
    "brain-pulse": { scale: [1, 1.08, 1] },
    "megaphone-wiggle": { rotate: [-4, 4, 0] },
    "cube-rotate": { rotate: [0, 10, 0] },
    "globe-rotate": { rotate: [0, 8, -8, 0] },
    "calendar-flip": { rotateX: [0, 12, 0] },
    steam: { y: [0, -2, 0] },
    "users-pulse": { scale: [1, 1.06, 1] },
    "badge-shine": { scale: [1, 1.06, 1] },
    "phone-float": { y: [0, -2, 0] },
    "card-flip": { rotateY: [0, 10, 0] },
    "bars-animate": { y: [0, -2, 0] },
    "cart-slide": { x: [0, 2, 0] },
    default: { scale: 1 },
  };

  return (
    <motion.div
      animate={
        variants[animation] as {
          scale?: number | number[];
          rotate?: number[];
          rotateY?: number[];
          rotateX?: number[];
          y?: number[];
          x?: number[];
        }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
        className="pointer-events-auto w-[min(400px,38vw)] min-w-[360px] min-h-[150px] rounded-[30px] border border-black/[0.05] bg-paper p-8"
        style={{
          boxShadow: highlighted
            ? "0 28px 60px rgba(0,0,0,0.12)"
            : "0 12px 40px rgba(0,0,0,0.06)",
          willChange: highlighted || !visible ? "transform, opacity" : undefined,
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.7 : 1) : 0,
          scale: visible ? (highlighted ? 1.04 : 1) : 0.88,
          y: visible ? (highlighted ? -8 : 0) : 24,
        }}
        transition={{
          opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <div className="flex items-start gap-5">
          <HoverIconAnimation animation={feature.iconAnimation} active={highlighted}>
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${feature.accent}18`, color: feature.accent }}
            >
              <Icon size={28} strokeWidth={1.65} aria-hidden="true" />
            </div>
          </HoverIconAnimation>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-sf-pro-display text-[24px] font-semibold leading-[1.2] text-[#111111]">
              {feature.title}
            </h3>
            <p className="mt-2 max-w-[85%] text-[16px] leading-[1.55] text-mid-gray">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.article>
    );
  }
);
