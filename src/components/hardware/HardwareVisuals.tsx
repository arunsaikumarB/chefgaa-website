import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HardwareCategoryId } from "./data";

export type ProductVisualProps = {
  product: HardwareCategoryId | "mobile-ordering" | "workstation" | "hero";
  className?: string;
  floating?: boolean;
  size?: "sm" | "md" | "lg";
};

export function ProductVisual({
  product,
  className = "",
  floating = false,
  size = "md",
}: ProductVisualProps) {
  const reduce = useReducedMotion();
  const scale =
    size === "sm" ? "scale-75" : size === "lg" ? "scale-125 md:scale-150" : "";

  const content = (
    <div className={`relative ${scale} ${className}`}>
      {product === "hero" || product === "workstation" ? (
        <WorkstationRender size={size} />
      ) : product === "pos-terminal" ? (
        <PosTerminalRender size={size} />
      ) : product === "receipt-printer" ? (
        <PrinterRender size={size} />
      ) : product === "barcode-scanner" ? (
        <ScannerRender size={size} />
      ) : product === "cash-drawer" ? (
        <DrawerRender size={size} />
      ) : product === "kitchen-display" ? (
        <KitchenDisplayRender size={size} />
      ) : product === "customer-display" ? (
        <CustomerDisplayRender size={size} />
      ) : product === "mobile-ordering" ? (
        <MobileRender size={size} />
      ) : (
        <PosTerminalRender size={size} />
      )}
    </div>
  );

  if (!floating || reduce) return content;

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {content}
    </motion.div>
  );
}

function WorkstationRender({ size }: { size?: string }) {
  const imgClass =
    size === "lg"
      ? "max-h-[min(480px,55vh)]"
      : size === "sm"
        ? "max-h-[200px]"
        : "max-h-[min(360px,42vh)]";
  return (
    <div className="relative flex items-center justify-center">
      <img
        src="/ecosystem/pos-hardware.png"
        alt="Chefgaa restaurant workstation"
        className={`w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.1)] ${imgClass}`}
        loading="lazy"
      />
    </div>
  );
}

function PosTerminalRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-24" : size === "lg" ? "w-56 md:w-64" : "w-40 md:w-48";
  return (
    <div
      className={`${w} rounded-[18px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#efefef] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)]`}
    >
      <div className="aspect-[4/3] rounded-[10px] bg-gradient-to-br from-[#1a1a1a] to-[#333] p-2">
        <div className="flex h-full flex-col rounded-[6px] bg-[#111] p-2">
          <div className="mb-1 h-1 w-6 rounded-full bg-[#FA9040]" />
          <div className="space-y-1">
            <div className="h-0.5 w-full rounded bg-white/20" />
            <div className="h-0.5 w-3/4 rounded bg-white/15" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-0.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-sm bg-white/10" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full bg-black/[0.06]" />
    </div>
  );
}

function PrinterRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-20" : size === "lg" ? "w-40" : "w-28 md:w-32";
  return (
    <div
      className={`${w} rounded-[12px] border border-black/[0.06] bg-gradient-to-b from-[#f8f8f8] to-[#ececec] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.06)]`}
    >
      <div className="h-1.5 rounded-t-[4px] bg-[#444]" />
      <div className="relative h-14 rounded-[6px] bg-[#e8e8e8]">
        <div className="absolute -top-2 left-1/2 h-6 w-10 -translate-x-1/2 rounded-sm bg-white shadow-sm" />
      </div>
    </div>
  );
}

function ScannerRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-14" : size === "lg" ? "w-32" : "w-20 md:w-24";
  return (
    <div
      className={`${w} rounded-[10px] border border-black/[0.06] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)]`}
    >
      <div className="aspect-square rounded-[6px] bg-[#111] p-1.5">
        <div className="h-full w-full rounded-[3px] border border-[#FA9040]/40 bg-gradient-to-b from-[#ED3C18]/20 to-transparent" />
      </div>
    </div>
  );
}

function DrawerRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-28" : size === "lg" ? "w-52" : "w-40";
  return (
    <div
      className={`${w} rounded-[8px] border border-black/[0.08] bg-gradient-to-b from-[#d4d4d4] to-[#b8b8b8] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]`}
    >
      <div className="flex h-6 items-center justify-center rounded-[4px] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0]">
        <div className="h-0.5 w-5 rounded-full bg-black/20" />
      </div>
    </div>
  );
}

function KitchenDisplayRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-32" : size === "lg" ? "w-60 md:w-72" : "w-44 md:w-52";
  return (
    <div
      className={`${w} rounded-[14px] border border-black/[0.06] bg-[#1a1a1a] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)]`}
    >
      <div className="aspect-[16/10] rounded-[8px] bg-[#0a0a0a] p-2">
        <div className="mb-1 flex gap-1">
          <span className="rounded bg-[#ED3C18] px-1 py-0.5 text-[5px] font-medium text-white">NEW</span>
          <span className="rounded bg-[#FA9040]/60 px-1 py-0.5 text-[5px] font-medium text-white">PREP</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-white/25" />
          <div className="h-1 w-4/5 rounded bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function CustomerDisplayRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-24" : size === "lg" ? "w-48" : "w-36 md:w-40";
  return (
    <div
      className={`${w} rounded-[12px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#eee] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)]`}
    >
      <div className="aspect-[3/4] rounded-[6px] bg-white p-2 text-center">
        <div className="text-[7px] text-[#666]">Total</div>
        <div className="text-[12px] font-bold text-[#111]">$42.96</div>
        <div className="mt-2 h-3 rounded-full bg-[#ED3C18]" />
      </div>
    </div>
  );
}

function MobileRender({ size }: { size?: string }) {
  const w = size === "sm" ? "w-16" : size === "lg" ? "w-36" : "w-24 md:w-28";
  return (
    <div
      className={`${w} rounded-[20px] border-[2px] border-[#1a1a1a] bg-[#1a1a1a] p-0.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]`}
    >
      <div className="aspect-[9/19] overflow-hidden rounded-[18px] bg-[#111] p-1.5">
        <div className="mb-1 h-0.5 w-5 rounded-full bg-[#FA9040]" />
        <div className="grid grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-sm bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GalleryVisual({ angle, className = "" }: { angle: string; className?: string }) {
  const map: Record<string, ReactNode> = {
    front: <PosTerminalRender size="lg" />,
    side: <KitchenDisplayRender size="lg" />,
    hero: <WorkstationRender size="lg" />,
  };
  return (
    <div
      className={`flex min-h-[280px] items-center justify-center bg-[#F5F5F7] p-8 ${className}`}
    >
      {map[angle] ?? <PosTerminalRender />}
    </div>
  );
}
