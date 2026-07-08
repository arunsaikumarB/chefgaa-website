import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { VisualId } from "./data";

/* ── Design tokens (8pt grid) ───────────────────────────── */

export const hwType = {
  hero: "font-sf-pro-display text-[40px] font-bold leading-[1.6] tracking-[-0.03em] text-[#111111] md:text-[56px] lg:text-[72px]",
  sectionTitle:
    "font-sf-pro-display text-[36px] font-bold leading-[1.6] tracking-[-0.02em] text-[#111111] md:text-[48px]",
  cardTitle: "font-sf-pro-display text-[32px] font-bold leading-[1.6] tracking-[-0.02em] text-[#111111]",
  body: "text-[18px] leading-[1.6] text-[#666666]",
  caption: "text-[16px] leading-[1.6] text-[#666666]",
  eyebrow: "text-[16px] font-semibold uppercase tracking-[0.12em] text-[#ED3C18]",
} as const;

/* ── Layout ─────────────────────────────────────────────── */

/** Offset for fixed global nav (56px) + sticky hardware category bar (~100px) */
export const HW_SCROLL_OFFSET = "scroll-mt-[9.75rem]";

export function HwShell({
  id,
  children,
  className = "bg-white",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`${className} ${id ? HW_SCROLL_OFFSET : ""} pt-[120px] pb-[140px]`}>
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </div>
    </section>
  );
}

export function HwSectionIntro({
  title,
  description,
  align = "center",
}: {
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={alignClass}>
      <h2 className={hwType.sectionTitle}>{title}</h2>
      {description && (
        <p className={`mt-6 max-w-[640px] ${hwType.body} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Buttons ────────────────────────────────────────────── */

const btnBase =
  "inline-flex h-14 items-center justify-center rounded-full px-8 text-[18px] font-medium leading-none transition-all duration-350";

export function HwPrimaryBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className={`${btnBase} bg-[#ED3C18] text-white hover:scale-[1.02] hover:opacity-95`}
    >
      {children}
    </Link>
  );
}

export function HwGhostBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className={`${btnBase} border border-[#111111] text-[#111111] hover:scale-[1.02] hover:bg-[#111111] hover:text-white`}
    >
      {children}
    </Link>
  );
}

export function HwLink({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="group relative inline-flex h-14 items-center text-[18px] font-medium leading-none text-[#ED3C18] after:absolute after:bottom-4 after:left-0 after:h-px after:w-0 after:bg-[#ED3C18] after:transition-all after:duration-300 hover:after:w-full"
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
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  compact?: boolean;
}) {
  return (
    <article
      id={id}
      className={`relative z-0 flex h-full flex-col rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(0,0,0,0.09)] ${
        compact ? "p-8" : "p-10"
      } ${id ? HW_SCROLL_OFFSET : ""} ${className}`}
    >
      {children}
    </article>
  );
}

export function HwFeatureCard({
  children,
  tint,
  className = "",
}: {
  children: ReactNode;
  tint: string;
  className?: string;
}) {
  return (
    <article
      className={`relative z-0 flex h-full flex-col rounded-[32px] p-10 transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(0,0,0,0.06)] ${className}`}
      style={{ backgroundColor: tint }}
    >
      {children}
    </article>
  );
}

export function HwIconBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
      {children}
    </div>
  );
}

/* ── Product visual ─────────────────────────────────────── */

const VISUAL_HEIGHTS = {
  sm: "h-[140px]",
  md: "h-[180px]",
  lg: "h-[220px]",
  xl: "h-[360px]",
  hero: "h-[min(480px,55vh)] md:h-[min(560px,60vh)]",
} as const;

export function ProductVisual({
  product,
  className = "",
  size = "md",
  showcase = false,
}: {
  product: VisualId;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showcase?: boolean;
  /** @deprecated hover-only lift is applied automatically */
  floating?: boolean;
}) {
  const heightKey = size === "xl" && product === "workstation" ? "hero" : size;
  const fill = showcase ? "h-[88%] w-[88%]" : "h-[65%] w-[65%]";
  const height = showcase && size === "xl" ? "h-[min(480px,52vh)] md:h-[min(520px,56vh)]" : VISUAL_HEIGHTS[heightKey];

  return (
    <div
      className={`group/product flex w-full items-center justify-center ${height} ${className}`}
    >
      <div
        className={`flex ${fill} items-center justify-center transition-transform duration-350 group-hover/product:-translate-y-[3px]`}
      >
        <DeviceRender product={product} size={showcase ? "xl" : size} />
      </div>
    </div>
  );
}

function DeviceRender({ product, size }: { product: VisualId; size: string }) {
  if (product === "workstation") return <WorkstationVisual size={size} />;
  if (product === "handheld" || product === "mobile-ordering") return <HandheldVisual size={size} />;
  if (product === "kitchen-display") return <KitchenVisual size={size} />;
  if (product === "barcode-scanner") return <ScannerVisual size={size} />;
  if (product === "receipt-printer") return <PrinterVisual size={size} />;
  if (product === "customer-display") return <DisplayVisual size={size} />;
  if (product === "cash-drawer") return <DrawerVisual size={size} />;
  if (product === "tablet") return <TabletVisual size={size} />;
  return <TerminalVisual size={size} />;
}

function WorkstationVisual({ size }: { size: string }) {
  const heroScale = size === "hero" || size === "xl";
  const h = heroScale
    ? "max-h-[min(624px,60vh)] w-full"
    : size === "lg"
      ? "max-h-[400px] w-full"
      : "max-h-[320px] w-full";
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(250,144,64,0.2) 0%, rgba(237,60,24,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <img
        src="/ecosystem/pos-hardware.png"
        alt="Chefgaa restaurant workstation"
        className={`relative z-10 object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.1)] ${h}`}
        loading="lazy"
      />
    </div>
  );
}

function TerminalVisual({ size }: { size: string }) {
  const w =
    size === "hero" || size === "xl"
      ? "w-full max-w-[340px]"
      : size === "lg"
        ? "w-full max-w-[220px]"
        : size === "sm"
          ? "w-full max-w-[120px]"
          : "w-full max-w-[180px]";
  return (
    <div
      className={`${w} rounded-[24px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEF] p-4 shadow-[0_24px_56px_rgba(0,0,0,0.08)]`}
    >
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
  const w =
    size === "hero" || size === "xl"
      ? "w-full max-w-[160px]"
      : size === "lg"
        ? "w-full max-w-[140px]"
        : size === "sm"
          ? "w-full max-w-[88px]"
          : "w-full max-w-[120px]";
  return (
    <div
      className={`${w} rounded-[28px] border-[3px] border-[#1A1A1A] bg-[#1A1A1A] p-1 shadow-[0_24px_56px_rgba(0,0,0,0.12)]`}
    >
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
  const w =
    size === "hero" || size === "xl"
      ? "w-full max-w-[320px]"
      : size === "lg"
        ? "w-full max-w-[260px]"
        : size === "sm"
          ? "w-full max-w-[150px]"
          : "w-full max-w-[200px]";
  return (
    <div
      className={`${w} rounded-[20px] border border-black/[0.05] bg-[#1A1A1A] p-3 shadow-[0_24px_56px_rgba(0,0,0,0.12)]`}
    >
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
  const w = size === "sm" ? "w-full max-w-[72px]" : "w-full max-w-[110px]";
  return (
    <div
      className={`${w} rounded-[14px] border border-black/[0.05] bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.1)]`}
    >
      <div className="aspect-square rounded-[8px] bg-[#111] p-2">
        <div className="h-full w-full rounded-[4px] border border-[#FA9040]/40 bg-gradient-to-b from-[#ED3C18]/20 to-transparent" />
      </div>
    </div>
  );
}

function PrinterVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-full max-w-[110px]" : "w-full max-w-[140px]";
  return (
    <div
      className={`${w} rounded-[16px] border border-black/[0.05] bg-gradient-to-b from-[#F8F8F8] to-[#ECECEC] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.06)]`}
    >
      <div className="h-2 rounded-t-[6px] bg-[#444]" />
      <div className="relative h-16 rounded-[8px] bg-[#E8E8E8]">
        <div className="absolute -top-3 left-1/2 h-8 w-12 -translate-x-1/2 rounded-sm bg-white shadow-sm" />
      </div>
    </div>
  );
}

function DisplayVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-full max-w-[130px]" : "w-full max-w-[180px]";
  return (
    <div
      className={`${w} rounded-[16px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EEE] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.06)]`}
    >
      <div className="aspect-[3/4] rounded-[10px] bg-white p-3 text-center">
        <div className="text-[9px] text-[#666]">Total</div>
        <div className="text-[16px] font-bold text-[#111]">$42.96</div>
        <div className="mt-3 h-4 rounded-full bg-[#ED3C18]" />
      </div>
    </div>
  );
}

function DrawerVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-full max-w-[160px]" : "w-full max-w-[210px]";
  return (
    <div
      className={`${w} rounded-[12px] border border-black/[0.06] bg-gradient-to-b from-[#D4D4D4] to-[#B8B8B8] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.08)]`}
    >
      <div className="flex h-8 items-center justify-center rounded-[8px] bg-gradient-to-b from-[#E8E8E8] to-[#D0D0D0]">
        <div className="h-1 w-8 rounded-full bg-black/20" />
      </div>
    </div>
  );
}

function TabletVisual({ size }: { size: string }) {
  const w = size === "sm" ? "w-full max-w-[150px]" : "w-full max-w-[200px]";
  return (
    <div
      className={`${w} rounded-[20px] border border-black/[0.05] bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEF] p-3 shadow-[0_20px_48px_rgba(0,0,0,0.08)]`}
    >
      <div className="aspect-[4/3] rounded-[12px] bg-[#111] p-2">
        <div className="mb-2 h-1 w-8 rounded-full bg-[#FA9040]" />
        <div className="h-1 w-full rounded bg-white/20" />
      </div>
    </div>
  );
}
