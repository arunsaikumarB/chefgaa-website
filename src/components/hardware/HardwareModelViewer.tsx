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
};

function Model({
  src,
  onReady,
}: {
  src: string;
  onReady: () => void;
}) {
  const { scene } = useGLTF(src);

  useEffect(() => {
    onReady();
  }, [scene, onReady]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function SceneContent({
  src,
  onReady,
  autoRotate,
  onInteractStart,
  onInteractEnd,
}: {
  src: string;
  onReady: () => void;
  autoRotate: boolean;
  onInteractStart: () => void;
  onInteractEnd: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.25}>
          <Model src={src} onReady={onReady} />
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
 */
export function HardwareModelViewer({
  src,
  title = "Hardware product",
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
      className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent md:h-[300px] lg:h-[340px]"
    >
      {!loaded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[20px]"
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8]" />
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
          />
        </Canvas>
      )}
    </div>
  );
}

export default HardwareModelViewer;
