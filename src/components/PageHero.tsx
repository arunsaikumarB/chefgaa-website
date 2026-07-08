import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BrandMeshGradient } from "./effects/BrandMeshGradient";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  bg?: "white" | "gray" | "gradient";
};

/**
 * Centered hero for interior pages. Big display headline surrounded by
 * generous white space. Eyebrow uses the ember accent (text-only).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  bg = "white",
}: PageHeroProps) {
  const bgClass = bg === "gray" ? "bg-canvas" : "bg-paper";
  return (
    <section className={`relative overflow-hidden ${bgClass} pt-[calc(var(--site-nav-height)+2rem)] pb-16 md:pt-[calc(var(--site-nav-height)+4.25rem)] md:pb-[120px]`}>
      {bg === "gradient" && <BrandMeshGradient intensity={0.22} />}
      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 md:px-10">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <p className="mb-4 text-[14px] font-medium text-brand">{eyebrow}</p>
          )}
          <h1 className="font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.01em] md:text-[64px] md:tracking-[-1px] lg:text-[80px] lg:leading-[1.05] lg:tracking-[-0.8px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-[640px] text-[19px] leading-[1.4] text-mid-gray md:text-[21px]">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
