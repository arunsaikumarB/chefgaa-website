import { useEffect, useRef, useState } from "react";

const DEFAULT_EMBED_PARAMS =
  "?autostart=1" +
  "&ui_controls=0" +
  "&ui_infos=0" +
  "&ui_stop=0" +
  "&ui_watermark=0" +
  "&ui_watermark_link=0" +
  "&ui_help=0" +
  "&ui_settings=0" +
  "&ui_inspector=0" +
  "&ui_hint=0" +
  "&ui_annotations=0" +
  "&ui_theme=dark" +
  "&autospin=0.15";

/** Clean Sketchfab chrome for premium hardware wells (Kitchen Display / Stand) */
const WELL_EMBED_PARAMS =
  "?autostart=1" +
  "&autospin=0.3" +
  "&preload=1" +
  "&ui_infos=0" +
  "&ui_controls=0" +
  "&ui_watermark=0" +
  "&ui_watermark_link=0" +
  "&ui_annotations=0" +
  "&ui_help=0" +
  "&ui_stop=0" +
  "&ui_settings=0" +
  "&ui_vr=0" +
  "&ui_theme=dark";

const DEFAULT_MODEL_ID = "4daf4e22d9d34b949d0ae7cbf3902983";
const DEFAULT_TITLE = "POS receipt printer";

function buildEmbedSrc(modelId: string, variant: "default" | "well") {
  const params = variant === "well" ? WELL_EMBED_PARAMS : DEFAULT_EMBED_PARAMS;
  return `https://sketchfab.com/models/${modelId}/embed${params}`;
}

type ReceiptPrinterViewerProps = {
  /** Sketchfab model id — defaults to the Receipt Printer model */
  modelId?: string;
  /** iframe title for accessibility */
  title?: string;
  /**
   * - default: transparent image well used by existing Sketchfab cards
   * - well: #F7F7F7 premium container for Kitchen Display / Stand
   */
  variant?: "default" | "well";
};

function ViewerSkeleton({ roundedClass }: { roundedClass: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${roundedClass}`}
    >
      <div className="h-full w-full animate-pulse bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
      </div>
    </div>
  );
}

/**
 * Premium Sketchfab 3D viewer used by hardware product cards (image area only).
 */
export function ReceiptPrinterViewer({
  modelId = DEFAULT_MODEL_ID,
  title = DEFAULT_TITLE,
  variant = "default",
}: ReceiptPrinterViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [modelId]);

  const iframe = shouldLoad ? (
    <iframe
      title={title}
      src={buildEmbedSrc(modelId, variant)}
      loading="lazy"
      allowFullScreen
      allow="autoplay; fullscreen; xr-spatial-tracking"
      {...{ mozallowfullscreen: "true", webkitallowfullscreen: "true" }}
      onLoad={() => setLoaded(true)}
      className="h-full w-full border-0 bg-transparent"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  ) : null;

  if (variant === "well") {
    return (
      <div
        ref={containerRef}
        className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-black/[0.05] bg-[#F7F7F7] p-[16px] md:h-[280px] md:p-[20px] lg:h-[320px] lg:p-[24px]"
      >
        <div className="relative h-full w-full">
          {!loaded && <ViewerSkeleton roundedClass="z-10 rounded-[16px]" />}
          {iframe}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent"
    >
      {!loaded && <ViewerSkeleton roundedClass="rounded-[20px]" />}
      {iframe}
    </div>
  );
}
