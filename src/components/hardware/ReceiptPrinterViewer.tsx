import { useEffect, useRef, useState } from "react";

const EMBED_SRC =
  "https://sketchfab.com/models/4daf4e22d9d34b949d0ae7cbf3902983/embed" +
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

/**
 * Premium Sketchfab 3D viewer for the Receipt Printer card image area only.
 */
export function ReceiptPrinterViewer() {
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

  return (
    <div
      ref={containerRef}
      className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent"
    >
      {!loaded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]"
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
          </div>
        </div>
      )}

      {shouldLoad && (
        <iframe
          title="POS receipt printer"
          src={EMBED_SRC}
          loading="lazy"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          // Legacy fullscreen attrs required by Sketchfab embed
          {...{ mozallowfullscreen: "true", webkitallowfullscreen: "true" }}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0 bg-transparent"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      )}
    </div>
  );
}
