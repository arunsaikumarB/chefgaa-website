import { useEffect, useRef, useState } from "react";
import { hwViewerWellClass } from "./viewerShell";

const EMBED_PARAMS =
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

const DEFAULT_MODEL_ID = "4daf4e22d9d34b949d0ae7cbf3902983";
const DEFAULT_TITLE = "POS receipt printer";

function buildEmbedSrc(modelId: string) {
  return `https://sketchfab.com/models/${modelId}/embed${EMBED_PARAMS}`;
}

type ReceiptPrinterViewerProps = {
  /** Sketchfab model id — defaults to the Receipt Printer model */
  modelId?: string;
  /** iframe title for accessibility */
  title?: string;
};

/**
 * Premium Sketchfab 3D viewer used by hardware product cards (image area only).
 */
export function ReceiptPrinterViewer({
  modelId = DEFAULT_MODEL_ID,
  title = DEFAULT_TITLE,
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

  return (
    <div ref={containerRef} className={`${hwViewerWellClass} shrink-0`}>
      <div className="relative h-full w-full">
        {!loaded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[16px]"
          >
            <div className="h-full w-full animate-pulse bg-[#EBEBEB]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
            </div>
          </div>
        )}

        {shouldLoad && (
          <iframe
            title={title}
            src={buildEmbedSrc(modelId)}
            loading="lazy"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            {...{ mozallowfullscreen: "true", webkitallowfullscreen: "true" }}
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0 bg-transparent"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        )}
      </div>
    </div>
  );
}
