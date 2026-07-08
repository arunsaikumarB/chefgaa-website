import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type PricingRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function PricingReveal({ children, delay = 0, className = "" }: PricingRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function PricingSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 md:px-10 lg:px-[48px] ${className}`}>
      <div className="mx-auto max-w-[1480px]">{children}</div>
    </section>
  );
}
