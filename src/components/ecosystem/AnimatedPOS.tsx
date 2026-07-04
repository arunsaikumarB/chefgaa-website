import { forwardRef } from "react";
import { motion } from "framer-motion";

type AnimatedPOSProps = {
  assemble: number;
  glowing?: boolean;
};

function HardwareReceipt({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: progress, y: (1 - progress) * 20 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-14 w-[72px] rounded-[8px] bg-deep-gray/90">
        <div className="mx-auto mt-2 h-0.5 w-11 rounded-full bg-quiet-dot/40" />
        <div className="mt-2.5 h-7 w-full rounded-b-[6px] bg-primary-ink/80" />
      </div>
      <div className="mt-0.5 h-5 w-12 rounded-b-[4px] bg-cool-wash/80" />
    </motion.div>
  );
}

function HardwareScanner({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: progress, y: (1 - progress) * 20 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-[52px] w-11 rounded-[6px] bg-deep-gray/90">
        <div className="mx-auto mt-2.5 h-2 w-6 rounded-sm bg-electric-blue/50" />
      </div>
      <div className="mt-0.5 h-8 w-2.5 rounded-full bg-hairline/80" />
    </motion.div>
  );
}

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false }, ref) {
    const hw = Math.min(1, Math.max(0, (assemble - 0.2) / 0.8));

    return (
      <div ref={ref} className="relative h-[300px] w-[300px]">
        <div className="absolute bottom-6 left-[-80px] z-[50]">
          <HardwareReceipt progress={hw} />
        </div>
        <div className="absolute bottom-6 right-[-64px] z-[50]">
          <HardwareScanner progress={hw} />
        </div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ opacity: assemble, scale: 0.85 + assemble * 0.15 }}
          transition={{ duration: 0.01 }}
        >
          <motion.div
            className="relative z-[40] flex h-[250px] w-[250px] items-center justify-center rounded-[24px] border border-hairline/60 bg-canvas/90 backdrop-blur-sm"
            animate={{
              boxShadow: glowing
                ? "0 0 64px rgba(255,110,20,0.28)"
                : "0 8px 32px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[16px] bg-primary-ink text-paper">
                <span className="font-sf-pro-display text-[32px] font-semibold">C</span>
              </div>
              <p className="text-[13px] font-medium text-mid-gray">POS</p>
            </div>
          </motion.div>
          <div className="mt-2 h-2.5 w-32 rounded-[4px] bg-deep-gray/60" aria-hidden="true" />
        </motion.div>
      </div>
    );
  }
);
