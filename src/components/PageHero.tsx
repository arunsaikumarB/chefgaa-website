import type { ReactNode } from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  bg?: "white" | "gray";
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
    <section className={`${bgClass} pt-[108px] pb-16 md:pt-[164px] md:pb-[120px]`}>
      <div className="mx-auto w-full max-w-[1000px] px-6 md:px-10">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <p className="mb-4 text-[14px] font-medium text-ember">{eyebrow}</p>
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
