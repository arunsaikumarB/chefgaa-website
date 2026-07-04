import { motion } from "framer-motion";

type HardwareGroupProps = {
  visible: boolean;
};

function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[10px] border border-dashed border-hairline/80 bg-canvas/50 ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-medium text-quiet-dot">{label}</span>
    </div>
  );
}

export function HardwareGroup({ visible }: HardwareGroupProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0, scale: 0.75, rotateX: 10 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, rotateX: 0 }
          : { opacity: 0, scale: 0.75, rotateX: 10 }
      }
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{ transformPerspective: 800, willChange: "transform, opacity" }}
      aria-hidden="true"
    >
      {/* Customer display — behind */}
      <div className="absolute -top-16 left-1/2 z-0 -translate-x-1/2">
        <Placeholder label="Customer Display" className="h-16 w-44" />
      </div>
      {/* Receipt printer — left */}
      <div className="absolute bottom-16 -left-24 z-20">
        <Placeholder label="Receipt Printer" className="h-20 w-24" />
      </div>
      {/* Barcode scanner — right */}
      <div className="absolute bottom-20 -right-20 z-20">
        <Placeholder label="Barcode Scanner" className="h-24 w-16" />
      </div>
      {/* Cash drawer — below */}
      <div className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2">
        <Placeholder label="Cash Drawer" className="h-4 w-36" />
      </div>
    </motion.div>
  );
}
