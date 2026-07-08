import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { VisualId } from "./data";

/* ── Layout ─────────────────────────────────────────────── */

export function HwShell({
  id,
  children,
  className = "bg-paper",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`${className} py-20 md:py-[140px]`}>
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </div>
    </section>
  );
}

export function HwReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Buttons ────────────────────────────────────────────── */

export function HwPrimaryBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full bg-[#ED3C18] px-8 py-3.5 text-[18px] font-medium text-white transition-all duration-350 hover:-translate-y-0.5 hover:opacity-95"
    >
      {children}
    </Link>
  );
}

export function HwGhostBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full border border-[#111111] px-8 py-3.5 text-[18px] font-medium text-[#111111] transition-all duration-350 hover:-translate-y-0.5 hover:bg-[#111111] hover:text-white"
    >
      {children}
    </Link>
  );
}

export function HwLink({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="group relative text-[18px] font-medium text-[#ED3C18] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#ED3C18] after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}

/* ── Product card ───────────────────────────────────────── */

export function HwProductCard({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.article
      id={id}
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-[36px] bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-[40px] ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.article>
  );
}

/* ── Product visual ─────────────────────────────────────── */

export function ProductVisual({
  product,
  className = "",
  floating = false,
  size = "md",
}: {
  product: VisualId;
  className?: string;
  floating?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const reduce = useReducedMotion();
  const scales = { sm: "scale-75", md: "scale-100", lg: "scale-110", xl: "scale-125 md:scale-[1.35]" };

  const inner = (
    <div className={`${scales[size]} ${className}`}>
      {product === "workstation" ? (
        <WorkstationVisual size={size} />
      ) : product === "handheld" || product === "mobile-ordering" ? (
        <HandheldVisual size={size} />
      ) : product === "kitchen-display" ? (
        <KitchenVisual size={size} />
      ) : product === "barcode-scanner" ? (
        <ScannerVisual size={size} />
      ) : product === "receipt-printer" ? (
        <PrinterVisual size={size} />
      ) : product === "customer-display" ? (
        <DisplayVisual size={size} />
      ) : product === "cash-drawer" ? (
        <DrawerVisual size={size} />
      ) : product === "tablet" ? (
        <TabletVisual size={size} />
      ) : (
        <TerminalVisual size={size} />
      )}
    </div>
  );

  if (!floating || reduce) return inner;
  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {inner}
    </motion.div>
  );
}

function WorkstationVisual({ size }: { size: string }) {
  const h = size === "xl" ? "max-h-[min(520px,50vh)]" : size === "lg" ? "max-h-[400px]" : "max-h-[320px]";
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,144,64,0.2) 0%, rgba(237,60,24,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <img
        src="/ecosystem/pos-hardware.png"
        alt="Chefgaa restaurant workstation"
        className={`relative z-10 w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.1)] ${h}`}
        loading="lazy"
      />
    </div>
  );
}

function TerminalVisual({ size }: { size: string }) {
  const w = size === "xl" ? "w-64" : size === "lg" ? "w-52" : size === "sm" ? "w-28" : "w-44";
  return (
    <div className={`${w} rounded-[24px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEF] p-4 shadow-[0_24px_56px_rgba(0,0,0,0.08)]`}>
      <div className="aspect-[4/3] rounded-[16px] bg-gradient-to-br from-[#1A1A1A] to-[#333] p-3">
        <div className="flex h-full flex-col rounded-[10px] bg-[#111] p-3">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-[#FA9040]" />
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded bg-white/20" />
            <div className="h-1 w-3/4 rounded bg-white/15" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-white/10" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-black/[0.05]" />
    </div>
  );
}

function HandheldVisual({ size }: { size: string }) {
  const w = size === "xl" ? "w-36" : size === "lg" ? "w-32" : size === "sm" ? "w-20" : "w-28";
  return (
    <div className={`${w} rounded-[28px] border-[3px] border-[#1A1A1A] bg-[#1A1A1A] p-1 shadow-[0_24px_56px_rgba(0,0,0,0.12)]`}>
      <div className="aspect-[9/19] overflow-hidden rounded-[24px] bg-[#111] p-2">
        <div className="mb-2 h-1 w-8 rounded-full bg-[#FA9040]" />
        <div className="grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

function KitchenVisual({ size }: { size: string }) {
  const w = size === "xl" ? "w-72" : size === "lg" ? "w-60" : size === "sm" ? "w-36" : "w-48";
  return (
    <div className={`${w} rounded-[20px] border border-black/[0.05] bg-[#1A1A1A] p-3 shadow-[0_24px_56px_rgba(0,0,0,0.12)]`}>
      <div className="aspect-[16/10] rounded-[14px] bg-[#0A0A0A] p-3">
        <div className="mb-2 flex gap-1.5">
          <span className="rounded-md bg-[#ED3C18] px-2 py-0.5 text-[8px] font-semibold text-white">NEW</span>
          <span className="rounded-md bg-[#FA9040]/70 px-2 py-0.5 text-[8px] font-semibold text-white">PREP</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/25" />
          <div className="h-1.5 w-4/5 rounded bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function ScannerVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-16" : "w-24";
  return (
    <div className={`${w} rounded-[14px] border border-black/[0.05] bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.1)]`}>
      <div className="aspect-square rounded-[8px] bg-[#111] p-2">
        <div className="h-full w-full rounded-[4px] border border-[#FA9040]/40 bg-gradient-to-b from-[#ED3C18]/20 to-transparent" />
      </div>
    </div>
  );
}

function PrinterVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-24" : "w-32";
  return (
    <div className={`${w} rounded-[16px] border border-black/[0.05] bg-gradient-to-b from-[#F8F8F8] to-[#ECECEC] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.06)]`}>
      <div className="h-2 rounded-t-[6px] bg-[#444]" />
      <div className="relative h-16 rounded-[8px] bg-[#E8E8E8]">
        <div className="absolute -top-3 left-1/2 h-8 w-12 -translate-x-1/2 rounded-sm bg-white shadow-sm" />
      </div>
    </div>
  );
}

function DisplayVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-28" : "w-40";
  return (
    <div className={`${w} rounded-[16px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EEE] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.06)]`}>
      <div className="aspect-[3/4] rounded-[10px] bg-white p-3 text-center">
        <div className="text-[9px] text-[#666]">Total</div>
        <div className="text-[16px] font-bold text-[#111]">$42.96</div>
        <div className="mt-3 h-4 rounded-full bg-[#ED3C18]" />
      </div>
    </div>
  );
}

function DrawerVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-36" : "w-48";
  return (
    <div className={`${w} rounded-[12px] border border-black/[0.06] bg-gradient-to-b from-[#D4D4D4] to-[#B8B8B8] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.08)]`}>
      <div className="flex h-8 items-center justify-center rounded-[8px] bg-gradient-to-b from-[#E8E8E8] to-[#D0D0D0]">
        <div className="h-1 w-8 rounded-full bg-black/20" />
      </div>
    </div>
  );
}

function TabletVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-32" : "w-44";
  return (
    <div className={`${w} rounded-[20px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEF] p-3 shadow-[0_20px_48px_rgba(0,0,0,0.08)]`}>
      <div className="aspect-[4/3] rounded-[12px] bg-[#111] p-2">
        <div className="h-1 w-8 rounded-full bg-[#FA9040] mb-2" />
        <div className="h-1 w-full rounded bg-white/20" />
      </div>
    </div>
  );
}
