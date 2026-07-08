import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemFeature } from "./features";

type FeatureCardProps = {
  feature: EcosystemFeature;
  visible: boolean;
  highlighted: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  align?: "left" | "right" | "center";
};

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard({ feature, visible, highlighted, dimmed, onHover, align = "left" }, ref) {
    const reduce = useReducedMotion();
    const Icon = feature.icon;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={feature.id}
        role="article"
        aria-label={feature.title}
        tabIndex={0}
        className={`pointer-events-auto w-full max-w-[400px] min-w-[320px] min-h-[132px] rounded-[28px] border border-black/[0.05] bg-paper px-7 py-6 will-change-transform ${
          align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
        }`}
        style={{
          boxShadow: highlighted
            ? "0 20px 48px rgba(0,0,0,0.12)"
            : "0 12px 40px rgba(0,0,0,0.06)",
          transform: "translateZ(0)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{
          opacity: visible ? (dimmed ? 0.65 : 1) : 0,
          y: visible ? (highlighted ? -6 : 0) : 20,
          scale: visible ? (highlighted ? 1.02 : 1) : 0.96,
        }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: visible && !highlighted ? 0.5 : 0.25, ease: REVEAL_EASE },
                y: { duration: highlighted ? 0.25 : 0.5, ease: highlighted ? HOVER_EASE : REVEAL_EASE },
                scale: { duration: highlighted ? 0.25 : 0.5, ease: highlighted ? HOVER_EASE : REVEAL_EASE },
              }
        }
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <div className="flex items-start gap-5">
          <motion.div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]"
            style={{
              backgroundColor: `${feature.accent}15`,
              color: feature.accent,
              transform: "translateZ(0)",
            }}
            animate={{ scale: highlighted ? 1.05 : 1 }}
            transition={{ duration: 0.25, ease: HOVER_EASE }}
          >
            <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
          </motion.div>
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
