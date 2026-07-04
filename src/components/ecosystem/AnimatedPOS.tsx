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
      animate={{ opacity: progress, y: (1 - progress) * 16 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-14 w-[72px] rounded-[8px] bg-deep-gray">
        <div className="mx-auto mt-2 h-0.5 w-11 rounded-full bg-quiet-dot/40" />
        <div className="mt-2.5 h-7 w-full rounded-b-[6px] bg-primary-ink/80" />
      </div>
      <div className="mt-0.5 h-5 w-12 rounded-b-[4px] bg-cool-wash" />
    </motion.div>
  );
}

function HardwareScanner({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: progress, y: (1 - progress) * 16 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-[52px] w-11 rounded-[6px] bg-deep-gray">
        <div className="mx-auto mt-2.5 h-2 w-6 rounded-sm bg-electric-blue/50" />
      </div>
      <div className="mt-0.5 h-8 w-2.5 rounded-full bg-hairline" />
    </motion.div>
  );
}

function HardwareCashDrawer({ progress }: { progress: number }) {
  return (
    <motion.div
      animate={{ opacity: progress, y: (1 - progress) * 10 }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-3 w-24 rounded-[4px] bg-deep-gray/90" />
      <div className="mx-auto mt-0.5 h-1 w-4 rounded-full bg-hairline" />
    </motion.div>
  );
}

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false }, ref) {
    const hw = Math.min(1, Math.max(0, (assemble - 0.25) / 0.75));

    return (
      <div ref={ref} className="relative h-[324px] w-[324px]">
        {/* Receipt printer — bottom left */}
        <div className="absolute bottom-4 left-[-88px] z-[50]">
          <HardwareReceipt progress={hw} />
        </div>
        {/* Barcode scanner — bottom right */}
        <div className="absolute bottom-4 right-[-68px] z-[50]">
          <HardwareScanner progress={hw} />
        </div>
        {/* Cash drawer — bottom center */}
        <div className="absolute -bottom-1 left-1/2 z-[50] -translate-x-1/2">
          <HardwareCashDrawer progress={hw} />
        </div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{
            opacity: assemble,
            scale: 0.82 + assemble * 0.18,
          }}
          transition={{ duration: 0.01 }}
          style={{ willChange: "transform" }}
        >
          <motion.div
            className="relative z-[40] flex h-[270px] w-[270px] items-center justify-center rounded-[22px] border border-hairline bg-canvas"
            animate={{
              boxShadow: glowing
                ? "0 0 56px rgba(255,110,20,0.24)"
                : "0 6px 28px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.35 }}
          >
            <div className="px-5 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[14px] bg-primary-ink text-paper">
                <span className="font-sf-pro-display text-[28px] font-semibold">C</span>
              </div>
              <p className="text-[14px] font-medium text-mid-gray">POS Placeholder</p>
              <p className="mt-1 text-[12px] text-quiet-dot">Replace image</p>
            </div>
          </motion.div>

          <div
            className="mt-2 h-2.5 w-36 rounded-[4px] bg-deep-gray/70"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    );
  }
);
