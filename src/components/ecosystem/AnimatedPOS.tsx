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
      animate={{ opacity: progress, y: (1 - progress) * 12 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-12 w-16 rounded-[8px] bg-deep-gray">
        <div className="mx-auto mt-1.5 h-0.5 w-10 rounded-full bg-quiet-dot/40" />
        <div className="mt-2 h-6 w-full rounded-b-[6px] bg-primary-ink/80" />
      </div>
      <div className="mt-0.5 h-4 w-11 rounded-b-[4px] bg-cool-wash" />
    </motion.div>
  );
}

function HardwareScanner({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: progress, y: (1 - progress) * 12 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-11 w-9 rounded-[6px] bg-deep-gray">
        <div className="mx-auto mt-2 h-1.5 w-5 rounded-sm bg-electric-blue/50" />
      </div>
      <div className="mt-0.5 h-7 w-2 rounded-full bg-hairline" />
    </motion.div>
  );
}

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false }, ref) {
    const hw = Math.min(1, Math.max(0, (assemble - 0.3) / 0.7));

    return (
      <div ref={ref} className="relative h-[240px] w-[240px]">
        {/* Receipt printer — bottom left of POS */}
        <div className="absolute bottom-2 left-[-72px] z-10">
          <HardwareReceipt progress={hw} />
        </div>
        {/* Barcode scanner — bottom right of POS */}
        <div className="absolute bottom-2 right-[-56px] z-10">
          <HardwareScanner progress={hw} />
        </div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{
            opacity: assemble,
            scale: 0.8 + assemble * 0.2,
          }}
          transition={{ duration: 0.01 }}
          style={{ willChange: "transform" }}
        >
          <motion.div
            className="relative z-20 flex h-[200px] w-[200px] items-center justify-center rounded-[20px] border border-hairline bg-canvas"
            animate={{
              boxShadow: glowing
                ? "0 0 48px rgba(255,110,20,0.22)"
                : "0 4px 20px rgba(0,0,0,0.05)",
            }}
            transition={{ duration: 0.35 }}
          >
            <div className="px-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary-ink text-paper">
                <span className="font-sf-pro-display text-[22px] font-semibold">C</span>
              </div>
              <p className="text-[12px] font-medium text-mid-gray">POS Placeholder</p>
              <p className="mt-0.5 text-[10px] text-quiet-dot">Replace image</p>
            </div>
          </motion.div>

          <div
            className="mt-1.5 h-2 w-28 rounded-[4px] bg-deep-gray/70"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    );
  }
);
