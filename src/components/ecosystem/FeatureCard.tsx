import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemFeature, IconAnimation } from "./features";

type FeatureCardProps = {
  feature: EcosystemFeature;
  visible: boolean;
  highlighted: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  align?: "left" | "right" | "center";
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
    "brain-pulse": { scale: [1, 1.1, 1] },
    "megaphone-wiggle": { rotate: [-5, 5, 0] },
    "cube-rotate": { rotate: [0, 12, 0] },
    "globe-rotate": { rotate: [0, 10, -10, 0] },
    "calendar-flip": { rotateX: [0, 15, 0] },
    steam: { y: [0, -3, 0] },
    "users-pulse": { scale: [1, 1.08, 1] },
    "badge-shine": { scale: [1, 1.08, 1] },
    "phone-float": { y: [0, -3, 0] },
    "card-flip": { rotateY: [0, 12, 0] },
    "bars-animate": { y: [0, -2, 0] },
    "cart-slide": { x: [0, 3, 0] },
    default: { scale: 1 },
  };

  return (
    <motion.div
      animate={variants[animation] as { scale?: number | number[]; rotate?: number[]; rotateY?: number[]; rotateX?: number[]; y?: number[]; x?: number[] }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard({ feature, visible, highlighted, dimmed, onHover, align = "left" }, ref) {
    const Icon = feature.icon;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={feature.id}
        role="article"
        aria-label={feature.title}
        tabIndex={0}
        className={`pointer-events-auto w-full max-w-[400px] min-w-[320px] min-h-[132px] rounded-[28px] border border-black/[0.05] bg-paper px-7 py-6 ${
          align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
        }`}
        style={{
          boxShadow: highlighted
            ? "0 24px 56px rgba(0,0,0,0.11)"
            : "0 12px 40px rgba(0,0,0,0.06)",
          willChange: "transform, opacity",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.6 : 1) : 0,
          scale: visible ? (highlighted ? 1.04 : 1) : 0.9,
          y: visible ? (highlighted ? -10 : 0) : 20,
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { type: "spring", stiffness: 400, damping: 28 },
          y: { type: "spring", stiffness: 400, damping: 28 },
        }}
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <div className="flex items-start gap-5">
          <HoverIconAnimation animation={feature.iconAnimation} active={highlighted}>
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]"
              style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
            >
              <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
            </div>
          </HoverIconAnimation>
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="font-sf-pro-display text-[18px] font-semibold leading-snug text-[#111111]">
              {feature.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.5] text-mid-gray">{feature.description}</p>
          </div>
        </div>
      </motion.article>
    );
  }
);
