import type { MouseEvent, ReactNode, RefObject } from "react";
import { lazy, Suspense, useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import type { VisualId } from "./data";
import { ReceiptPrinterViewer } from "./ReceiptPrinterViewer";
import { hwCardShadow, hwCardShadowHover, hwViewerWellClass } from "./viewerShell";

const HardwareModelViewer = lazy(() => import("./HardwareModelViewer"));

const EASE = [0.22, 1, 0.36, 1] as const;

/* â”€â”€ Design tokens (8pt grid) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const hwType = {
  hero: "font-sf-pro-display text-[40px] font-bold leading-[1.6] tracking-[-0.03em] text-[#111111] md:text-[56px] lg:text-[72px]",
  sectionTitle:
    "font-sf-pro-display text-[36px] font-bold leading-[1.6] tracking-[-0.02em] text-[#111111] md:text-[48px]",
  cardTitle:
    "font-sf-pro-display text-[32px] font-bold leading-[1.25] tracking-[-0.02em] text-[#111111]",
  body: "text-[18px] leading-[1.6] text-[#666666]",
  caption: "text-[16px] leading-[1.6] text-[#666666]",
  eyebrow: "text-[16px] font-semibold uppercase tracking-[0.12em] text-[#ED3C18]",
  chip: "inline-flex h-[36px] items-center rounded-full bg-[#F3F4F6] px-[16px] text-[14px] leading-none text-[#444444] transition-colors duration-200 hover:bg-[#E8EAED]",
} as const;

/** Clears fixed global nav (96px) + sticky hardware category nav (~88px) */
export const HW_SCROLL_OFFSET = "scroll-mt-[11.5rem]";
export const HW_NAV_SCROLL_PADDING = 184;

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

/* â”€â”€ Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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
    <section
      id={id}
      className={`${className} py-[60px] ${id ? HW_SCROLL_OFFSET : ""}`}
    >
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
        <p className={`mt-[20px] max-w-[640px] ${hwType.body} ${align === "center" ? "mx-auto" : ""}`}>
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
  variant = "section",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "section" | "card";
}) {
  const reduce = useReducedMotion();

  const initial = reduce
    ? { opacity: 0 }
    : variant === "card"
      ? { opacity: 0, y: 30, scale: 0.98 }
      : { opacity: 0, y: 40 };

  const animate = reduce
    ? { opacity: 1 }
    : variant === "card"
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* â”€â”€ Buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const btnBase =
  "inline-flex h-[52px] items-center justify-center rounded-full px-[28px] text-[16px] font-semibold leading-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] active:scale-[0.97]";

export function HwPrimaryBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className={`${btnBase} bg-[#ED3C18] !text-white hover:shadow-[0_10px_25px_rgba(255,92,53,0.25)] hover:opacity-95`}
    >
      {children}
    </Link>
  );
}

export function HwGhostBtn({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className={`${btnBase} border border-[#111111] text-[#111111] hover:bg-[#111111] hover:!text-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)]`}
    >
      {children}
    </Link>
  );
}

export function HwLink({ children, to = "/contact" }: { children: ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="group relative inline-flex h-[48px] items-center text-[16px] font-semibold leading-none text-[#ED3C18] transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] after:absolute after:bottom-[14px] after:left-0 after:h-px after:w-0 after:bg-[#ED3C18] after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}

/* â”€â”€ Product card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export function HwProductCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.4 });

  const handleMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduce || isCoarsePointer() || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(py * -8);
      rotateY.set(px * 8);
    },
    [reduce, rotateX, rotateY],
  );

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.article
      ref={ref as RefObject<HTMLElement>}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      whileHover={
        reduce
          ? undefined
          : {
              y: -8,
              scale: 1.015,
              borderColor: "rgba(0,0,0,0.09)",
            }
      }
      transition={{ duration: 0.3, ease: EASE }}
      className={`flex h-full flex-col rounded-[28px] border border-black/[0.04] bg-white p-[32px] text-left will-change-transform ${className}`}
      style={{
        boxShadow: hovered ? hwCardShadowHover : hwCardShadow,
        rotateX: reduce ? 0 : springX,
        rotateY: reduce ? 0 : springY,
        transformPerspective: 1200,
      }}
    >
      {children}
    </motion.article>
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
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`flex h-full flex-col rounded-[28px] p-[32px] text-left will-change-transform ${className}`}
      style={{ backgroundColor: tint, boxShadow: hwCardShadow }}
    >
      {children}
    </motion.article>
  );
}

export function HwIconBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-white shadow-sm transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[2px]">
      {children}
    </div>
  );
}

export function HwViewerWell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${hwViewerWellClass} ${className}`}>{children}</div>;
}

export function HwFadeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setReady(true)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      animate={
        ready
          ? reduce
            ? { opacity: 1 }
            : { opacity: 1, scale: 1 }
          : reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.98 }
      }
      transition={{ duration: 0.4, ease: EASE }}
      className={className}
    />
  );
}

/* ── Product visual ─────────────────────────────────────── */

const VISUAL_HEIGHTS = {
  sm: "h-[160px]",
  md: "h-[200px]",
  lg: "h-[280px]",
  xl: "h-[360px]",
  hero: "h-[min(480px,55vh)] md:h-[min(560px,60vh)]",
} as const;
export function ProductVisual({
  product,
  className = "",
  size = "md",
}: {
  product: VisualId;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  /** @deprecated hover-only lift is applied automatically */
  floating?: boolean;
}) {
  // Sketchfab viewer fills the image area for these products only
  if (product === "receipt-printer") {
    return (
      <div className={`w-full ${className}`}>
        <ReceiptPrinterViewer />
      </div>
    );
  }

  if (product === "barcode-scanner") {
    return (
      <div className={`w-full ${className}`}>
        <ReceiptPrinterViewer
          modelId="31fdf834a70b42b084c7041870252488"
          title="Barcode Scanner"
        />
      </div>
    );
  }

  if (product === "cash-drawer") {
    return (
      <div className={`w-full ${className}`}>
        <ReceiptPrinterViewer
          modelId="61f07e0842134434a07426891f904353"
          title="Cash Register Drawer for POS System open"
        />
      </div>
    );
  }

  if (product === "customer-display") {
    return (
      <div className={`w-full ${className}`}>
        <ReceiptPrinterViewer
          modelId="d0753b3a481f45999426dab7dc5870ab"
          title="Galaxy Tab S9+"
        />
      </div>
    );
  }

  if (product === "kitchen-display") {
    return (
      <div className={`w-full ${className}`}>
        <Suspense fallback={null}>
          <HardwareModelViewer
            src="/models/tv_screen.glb"
            title="Kitchen Display"
            frame="raised"
          />
        </Suspense>
      </div>
    );
  }

  if (product === "display-stand") {
    return (
      <div className={`w-full ${className}`}>
        <Suspense fallback={null}>
          <HardwareModelViewer
            src="/models/mobile_stand.glb"
            title="Customer Display Stand"
          />
        </Suspense>
      </div>
    );
  }

  const heightKey = size === "xl" && product === "workstation" ? "hero" : size;
  const useCatalogueWell = size === "md" || size === "lg";

  if (useCatalogueWell) {
    return (
      <div className={`w-full shrink-0 ${className}`}>
        <HwViewerWell className="group/product">
          <div className="flex h-[72%] w-[72%] max-h-full items-center justify-center transition-transform duration-350 group-hover/product:-translate-y-[3px]">
            <DeviceRender product={product} size={size} />
          </div>
        </HwViewerWell>
      </div>
    );
  }

  return (
    <div
      className={`group/product flex w-full items-center justify-center ${VISUAL_HEIGHTS[heightKey]} ${className}`}
    >
      <div className="flex h-[65%] w-[65%] items-center justify-center transition-transform duration-350 group-hover/product:-translate-y-[3px]">
        <DeviceRender product={product} size={size} />
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
      <HwFadeImage
        src="/ecosystem/pos-hardware.png"
        alt="Chefgaa restaurant workstation"
        className={`relative z-10 object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.1)] ${h}`}
      />
    </div>
  );
}

function TerminalVisual({ size }: { size: string }) {
  const w =
    size === "hero" || size === "xl"
      ? "w-full max-w-[280px]"
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
