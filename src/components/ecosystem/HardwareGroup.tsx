import { motion } from "framer-motion";

type HardwareGroupProps = {
  visible: boolean;
};

function Placeholder({
  label,
  className,
  delay = 0,
  visible,
}: {
  label: string;
  className: string;
  delay?: number;
  visible: boolean;
}) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center rounded-[12px] border border-hairline/50 bg-canvas/90 ${className}`}
      initial={{ opacity: 0, scale: 0.75, rotateX: 10 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, rotateX: 0 }
          : { opacity: 0, scale: 0.75, rotateX: 10 }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: delay / 1000,
      }}
      style={{ willChange: "transform, opacity", perspective: 800 }}
      aria-hidden="true"
    >
      <span className="text-[10px] font-medium text-quiet-dot">{label}</span>
    </motion.div>
  );
}

export function HardwareGroup({ visible }: HardwareGroupProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Customer display — behind POS */}
      <div className="absolute left-1/2 top-[6%] z-[5] -translate-x-1/2">
        <Placeholder
          label="Customer Display"
          className="h-[100px] w-[220px]"
          delay={visible ? 180 : 0}
          visible={visible}
        />
      </div>

      {/* Receipt printer — left */}
      <div className="absolute left-[-6%] top-[38%] z-[15]">
        <Placeholder
          label="Receipt Printer"
          className="h-[88px] w-[110px]"
          delay={visible ? 60 : 0}
          visible={visible}
        />
      </div>

      {/* Barcode scanner — right */}
      <div className="absolute right-[-4%] top-[36%] z-[15]">
        <Placeholder
          label="Barcode Scanner"
          className="h-[100px] w-[72px]"
          delay={visible ? 120 : 0}
          visible={visible}
        />
      </div>

      {/* Cash drawer — below */}
      <div className="absolute bottom-[2%] left-1/2 z-[15] -translate-x-1/2">
        <Placeholder
          label="Cash Drawer"
          className="h-[36px] w-[200px]"
          delay={visible ? 0 : 0}
          visible={visible}
        />
      </div>
    </div>
  );
}
