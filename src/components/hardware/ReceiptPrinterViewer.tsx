import { useEffect, useRef, useState } from "react";

const MODEL_ID = "4daf4e22d9d34b949d0ae7cbf3902983";
const AUTOSPIN_SPEED = 0.15;
const IDLE_RESUME_MS = 4000;
const SKETCHFAB_API_SRC =
  "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";

const EMBED_SRC =
  `https://sketchfab.com/models/${MODEL_ID}/embed` +
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
  `&autospin=${AUTOSPIN_SPEED}`;

type SketchfabApi = {
  start: () => void;
  setAutospin: (speed: number) => void;
  addEventListener: (event: string, callback: () => void) => void;
};

type SketchfabClient = {
  init: (
    uid: string,
    options: Record<string, unknown> & {
      success?: (api: SketchfabApi) => void;
      error?: () => void;
    },
  ) => void;
};

declare global {
  interface Window {
    Sketchfab?:
      | (new (iframe: HTMLIFrameElement) => SketchfabClient)
      | (new (version: string, iframe: HTMLIFrameElement) => SketchfabClient);
  }
}

function loadSketchfabApi(): Promise<void> {
  if (window.Sketchfab) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SKETCHFAB_API_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SKETCHFAB_API_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

/**
 * Premium Sketchfab 3D viewer for the Receipt Printer card image area only.
 */
export function ReceiptPrinterViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabApi | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Lazy-load when near viewport
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

  // Init Sketchfab Viewer API once lazy-load triggers
  useEffect(() => {
    if (!shouldLoad) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;

    const clearIdle = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const resumeSpin = () => {
      clearIdle();
      idleTimerRef.current = window.setTimeout(() => {
        apiRef.current?.setAutospin(AUTOSPIN_SPEED);
      }, IDLE_RESUME_MS);
    };

    const pauseSpin = () => {
      apiRef.current?.setAutospin(0);
      resumeSpin();
    };

    const fallbackEmbed = () => {
      if (iframeRef.current && !iframeRef.current.src) {
        iframeRef.current.src = EMBED_SRC;
      }
      setReady(true);
    };

    const init = async () => {
      try {
        await loadSketchfabApi();
        if (cancelled || !window.Sketchfab || !iframeRef.current) {
          fallbackEmbed();
          return;
        }

        // Sketchfab constructor: (version, iframe) or (iframe)
        const SketchfabCtor = window.Sketchfab as unknown as {
          new (a: string | HTMLIFrameElement, b?: HTMLIFrameElement): SketchfabClient;
        };
        const client = new SketchfabCtor("1.12.1", iframeRef.current);
        client.init(MODEL_ID, {
          autostart: 1,
          autospin: AUTOSPIN_SPEED,
          ui_controls: 0,
          ui_infos: 0,
          ui_stop: 0,
          ui_watermark: 0,
          ui_watermark_link: 0,
          ui_help: 0,
          ui_settings: 0,
          ui_inspector: 0,
          ui_hint: 0,
          ui_annotations: 0,
          ui_theme: "dark",
          success: (api) => {
            if (cancelled) return;
            apiRef.current = api;
            api.start();
            api.addEventListener("viewerready", () => {
              if (cancelled) return;
              api.setAutospin(AUTOSPIN_SPEED);
              setReady(true);

              const interactionEvents = [
                "click",
                "mousedown",
                "camerastart",
              ] as const;
              for (const eventName of interactionEvents) {
                try {
                  api.addEventListener(eventName, pauseSpin);
                } catch {
                  /* event may be unsupported in this API version */
                }
              }
            });
          },
          error: () => {
            if (!cancelled) fallbackEmbed();
          },
        });
      } catch {
        if (!cancelled) fallbackEmbed();
      }
    };

    void init();

    return () => {
      cancelled = true;
      clearIdle();
      apiRef.current = null;
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent md:h-[300px] lg:h-[340px]"
    >
      {/* Skeleton loader */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] transition-opacity duration-500 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-full w-full animate-pulse bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
        </div>
      </div>

      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          title="POS receipt printer"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className={`h-full w-full border-0 bg-transparent transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: "none", overflow: "hidden" }}
        />
      ) : null}
    </div>
  );
}
