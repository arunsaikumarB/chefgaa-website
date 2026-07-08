import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HardwareCategoryId } from "./data";

type ProductVisualProps = {
  product: HardwareCategoryId | "mobile-ordering" | "workstation" | "hero";
  className?: string;
  floating?: boolean;
};

export function ProductVisual({ product, className = "", floating = false }: ProductVisualProps) {
  const reduce = useReducedMotion();

  const content = (
    <div className={`relative ${className}`}>
      {product === "hero" || product === "workstation" ? (
        <WorkstationRender />
      ) : product === "pos-terminal" ? (
        <PosTerminalRender />
      ) : product === "receipt-printer" ? (
        <PrinterRender />
      ) : product === "barcode-scanner" ? (
        <ScannerRender />
      ) : product === "cash-drawer" ? (
        <DrawerRender />
      ) : product === "kitchen-display" ? (
        <KitchenDisplayRender />
      ) : product === "customer-display" ? (
        <CustomerDisplayRender />
      ) : product === "mobile-ordering" ? (
        <MobileRender />
      ) : (
        <PosTerminalRender />
      )}
    </div>
  );

  if (!floating || reduce) return content;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {content}
    </motion.div>
  );
}

function WorkstationRender() {
  return (
    <div className="relative mx-auto h-[min(420px,50vw)] w-[min(520px,90vw)]">
      <div
        className="absolute left-1/2 top-1/2 h-[min(340px,42vw)] w-[min(340px,42vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(250,144,64,0.22) 0%, rgba(237,60,24,0.08) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <img
        src="/ecosystem/pos-hardware.png"
        alt="Chefgaa restaurant workstation with POS terminal, printer, scanner, and cash drawer"
        className="relative z-10 mx-auto h-full w-full object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.12)]"
        loading="lazy"
      />
      <div className="absolute -right-4 top-8 z-20 scale-75 md:scale-90">
        <CustomerDisplayRender compact />
      </div>
      <div className="absolute -left-6 bottom-16 z-20 scale-75 md:scale-90">
        <PrinterRender compact />
      </div>
      <div className="absolute -right-2 bottom-20 z-20 scale-75 md:scale-90">
        <ScannerRender compact />
      </div>
      <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 scale-90">
        <DrawerRender compact />
      </div>
    </div>
  );
}

function PosTerminalRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-28" : "w-44 md:w-52";
  return (
    <div className={`${w} rounded-[20px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] p-3 shadow-[0_16px_48px_rgba(0,0,0,0.08)]`}>
      <div className="aspect-[4/3] rounded-[12px] bg-gradient-to-br from-[#1a1a1a] to-[#333] p-2">
        <div className="flex h-full flex-col rounded-[8px] bg-[#111] p-2">
          <div className="mb-1.5 h-1.5 w-8 rounded-full bg-chefgaa-orange/80" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-white/20" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
            <div className="h-1 w-1/2 rounded bg-white/10" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded bg-white/10" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-black/[0.06]" />
    </div>
  );
}

function PrinterRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-20" : "w-32 md:w-36";
  return (
    <div className={`${w} rounded-[14px] border border-black/[0.06] bg-gradient-to-b from-[#f8f8f8] to-[#ececec] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)]`}>
      <div className="h-2 rounded-t-[6px] bg-[#444]" />
      <div className="relative -mt-0.5 h-16 rounded-[8px] bg-[#e8e8e8]">
        <div className="absolute -top-3 left-1/2 h-8 w-12 -translate-x-1/2 rounded-sm bg-white shadow-sm" />
        <div className="absolute bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-chefgaa-red/60" />
      </div>
    </div>
  );
}

function ScannerRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-14" : "w-24 md:w-28";
  return (
    <div className={`${w} rounded-[12px] border border-black/[0.06] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.1)]`}>
      <div className="aspect-square rounded-[8px] bg-[#111] p-2">
        <div className="h-full w-full rounded-[4px] border border-chefgaa-orange/40 bg-gradient-to-b from-chefgaa-orange/20 to-transparent" />
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-white/20" />
    </div>
  );
}

function DrawerRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-32" : "w-48 md:w-56";
  return (
    <div className={`${w} rounded-[10px] border border-black/[0.08] bg-gradient-to-b from-[#d4d4d4] to-[#b8b8b8] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]`}>
      <div className="flex h-8 items-center justify-center rounded-[6px] border border-black/[0.06] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0]">
        <div className="h-1 w-6 rounded-full bg-black/20" />
      </div>
    </div>
  );
}

function KitchenDisplayRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-36" : "w-52 md:w-64";
  return (
    <div className={`${w} rounded-[16px] border border-black/[0.06] bg-[#1a1a1a] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.12)]`}>
      <div className="aspect-[16/10] rounded-[10px] bg-[#0a0a0a] p-2">
        <div className="mb-1 flex gap-1">
          <span className="rounded bg-chefgaa-red/80 px-1.5 py-0.5 text-[6px] font-medium text-white">NEW</span>
          <span className="rounded bg-chefgaa-orange/60 px-1.5 py-0.5 text-[6px] font-medium text-white">PREP</span>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded bg-white/25" />
          <div className="h-1.5 w-4/5 rounded bg-white/15" />
          <div className="h-1.5 w-3/5 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function CustomerDisplayRender({ compact }: { compact?: boolean } = {}) {
  const w = compact ? "w-32" : "w-44 md:w-52";
  return (
    <div className={`${w} rounded-[14px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#eee] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)]`}>
      <div className="aspect-[3/4] rounded-[8px] bg-white p-2">
        <div className="text-center text-[8px] font-medium text-[#666]">Total</div>
        <div className="mt-1 text-center text-[14px] font-bold text-[#111]">$42.96</div>
        <div className="mt-2 h-4 rounded-full bg-chefgaa-red/90" />
      </div>
    </div>
  );
}

function MobileRender() {
  return (
    <div className="w-28 rounded-[24px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-1 shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:w-32">
      <div className="aspect-[9/19] overflow-hidden rounded-[20px] bg-[#111] p-2">
        <div className="mb-2 h-1 w-8 rounded-full bg-chefgaa-orange/80" />
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-white/20" />
          <div className="h-1 w-3/4 rounded bg-white/15" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Gallery angle variants */
export function GalleryVisual({ angle, className = "" }: { angle: string; className?: string }) {
  const map: Record<string, ReactNode> = {
    front: <PosTerminalRender />,
    side: <KitchenDisplayRender />,
    hero: <WorkstationRender />,
  };
  return (
    <div className={`flex min-h-[280px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#f8f9fa] to-[#ffffff] p-8 ${className}`}>
      {map[angle] ?? <ProductVisual product="pos-terminal" />}
    </div>
  );
}
