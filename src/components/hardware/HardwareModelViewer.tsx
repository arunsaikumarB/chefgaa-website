import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

const IDLE_RESUME_MS = 3500;
const AUTO_ROTATE_SPEED = 0.3;

type HardwareModelViewerProps = {
  /** Public path to a local GLB, e.g. `/models/tv_screen.glb` */
  src: string;
  title?: string;
  /**
   * Framing bias inside the shared viewer container.
   * - default: perfectly centered (Customer Display Stand)
   * - raised: centered horizontally, slightly higher (Kitchen Display)
   */
  frame?: "default" | "raised";
};

function Model({
  src,
  onReady,
  frame,
}: {
  src: string;
  onReady: () => void;
  frame: "default" | "raised";
}) {
  const { scene } = useGLTF(src);

  useEffect(() => {
    onReady();
  }, [scene, onReady]);

  return (
    <group position={[0, frame === "raised" ? 0.12 : 0, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function SceneContent({
  src,
  onReady,
  autoRotate,
  onInteractStart,
  onInteractEnd,
  frame,
}: {
  src: string;
  onReady: () => void;
  autoRotate: boolean;
  onInteractStart: () => void;
  onInteractEnd: () => void;
  frame: "default" | "raised";
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.35}>
          <Model src={src} onReady={onReady} frame={frame} />
        </Bounds>
      </Suspense>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={AUTO_ROTATE_SPEED}
        enablePan
        enableZoom
        minDistance={1.1}
        maxDistance={4.8}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.65}
        onStart={onInteractStart}
        onEnd={onInteractEnd}
      />
    </>
  );
}

/**
 * Reusable local-GLB product viewer for hardware cards (R3F / Three.js).
 * Renders inside a shared premium display container to match the Hardware page.
 */
export function HardwareModelViewer({
  src,
  title = "Hardware product",
  frame = "default",
}: HardwareModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

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
  }, [src]);

  useEffect(() => {
    if (shouldLoad) {
      useGLTF.preload(src);
    }
  }, [shouldLoad, src]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  const handleReady = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleInteractStart = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    setAutoRotate(false);
  }, []);

  const handleInteractEnd = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      setAutoRotate(true);
      idleTimerRef.current = null;
    }, IDLE_RESUME_MS);
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={title}
      className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.04] bg-[#F7F7F7] p-[16px] md:h-[280px] md:p-[20px] lg:h-[320px] lg:p-[24px]"
    >
      <div className="relative h-full w-full">
        {!loaded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[16px]"
          >
            <div className="h-full w-full animate-pulse bg-gradient-to-b from-[#F0F0F0] to-[#E6E6E6]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
            </div>
          </div>
        )}

        {shouldLoad && (
          <Canvas
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0.4, 2.6] }}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            frameloop="always"
          >
            <SceneContent
              src={src}
              onReady={handleReady}
              autoRotate={autoRotate}
              onInteractStart={handleInteractStart}
              onInteractEnd={handleInteractEnd}
              frame={frame}
            />
          </Canvas>
        )}
      </div>
    </div>
  );
}

export default HardwareModelViewer;
