import { forwardRef } from "react";
import { HardwareGroup } from "./HardwareGroup";

type AnimatedPOSProps = {
  assemble: number;
};

/** No image — hardware hub only. Slot your POS render here later. */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble }, ref) {
    return (
      <div ref={ref} className="relative h-[180px] w-[260px]">
        <HardwareGroup visible={assemble > 0.5} />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/40"
          style={{ boxShadow: "0 0 12px rgba(255,110,20,0.25)", transform: "translateZ(0)" }}
          aria-hidden="true"
        />
      </div>
    );
  }
);
