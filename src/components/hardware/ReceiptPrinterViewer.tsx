import { useEffect, useRef, useState } from "react";
import { hwViewerWellStandalone } from "./viewerShell";

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
  "&ui_theme=light" +
  "&autospin=0.12" +
  "&transparent=1";

const DEFAULT_MODEL_ID = "4daf4e22d9d34b949d0ae7cbf3902983";
const DEFAULT_TITLE = "POS receipt printer";

function buildEmbedSrc(modelId: string) {
  return `https://sketchfab.com/models/${modelId}/embed${EMBED_PARAMS}`;
}

type ReceiptPrinterViewerProps = {
  modelId?: string;
  title?: string;
  /** When true, fill parent (HardwareCard image slot) — no outer chrome */
  embedded?: boolean;
};

export function ReceiptPrinterViewer({
  modelId = DEFAULT_MODEL_ID,
  title = DEFAULT_TITLE,
  embedded = false,
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

  const shell = embedded
    ? "relative h-full w-full overflow-hidden bg-transparent"
    : `${hwViewerWellStandalone} shrink-0`;

  return (
    <div ref={containerRef} className={shell}>
      <div className="relative h-full w-full">
        {!loaded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="h-[64px] w-[88px] animate-pulse rounded-[12px] bg-black/[0.04]" />
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
            className={`h-full w-full border-0 bg-transparent transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        )}
      </div>
    </div>
  );
}
