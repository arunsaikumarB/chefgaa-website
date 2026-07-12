import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { hwViewerWellClass, hwStageShadow, hwStageShadowHover } from "./viewerShell";

const IDLE_RESUME_MS = 3000;
const AUTO_ROTATE_SPEED = 0.15;
const STAGE_AUTO_ROTATE_SPEED = 0.15;

type ViewerVariant = "well" | "stage";

type HardwareModelViewerProps = {
  /** Public path to a local GLB, e.g. `/models/tv_screen.glb` */
  src: string;
  title?: string;
  frame?: "default" | "raised";
  variant?: ViewerVariant;
};

const STAGE_SHELL =
  "relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.04] bg-[#F5F6F8] p-[16px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] hover:border-black/[0.08] md:h-[400px] md:p-[24px] lg:h-[480px]";

function Model({
  src,
  onReady,
  frame,
  variant,
}: {
  src: string;
  onReady: () => void;
  frame: "default" | "raised";
  variant: ViewerVariant;
}) {
  const { scene } = useGLTF(src);

  useEffect(() => {
    onReady();
  }, [scene, onReady]);

  const y = frame === "raised" ? 0.12 : variant === "stage" ? -0.05 : 0;

  return (
    <group position={[0, y, 0]} rotation={variant === "stage" ? [0, 0.35, 0] : [0, 0, 0]}>
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
  variant,
}: {
  src: string;
  onReady: () => void;
  autoRotate: boolean;
  onInteractStart: () => void;
  onInteractEnd: () => void;
  frame: "default" | "raised";
  variant: ViewerVariant;
}) {
  // Stage ~80% occupancy; catalogue well ~78%
  const fitMargin = variant === "stage" ? 1.12 : 1.1;
  const spinSpeed =
    variant === "stage" ? STAGE_AUTO_ROTATE_SPEED : AUTO_ROTATE_SPEED;

  return (
    <>
      {variant === "stage" ? (
        <>
          <ambientLight intensity={0.45} />
          {/* Key */}
          <directionalLight position={[5, 8, 4]} intensity={1.35} />
          {/* Fill */}
          <directionalLight position={[-5, 3, 2]} intensity={0.45} />
          {/* Rim */}
          <directionalLight position={[-2, 4, -6]} intensity={0.55} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 3]} intensity={1.15} />
          <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        </>
      )}
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={fitMargin}>
          <Model src={src} onReady={onReady} frame={frame} variant={variant} />
        </Bounds>
        {variant === "stage" && (
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.38}
            scale={14}
            blur={2.6}
            far={6}
            resolution={512}
            color="#000000"
          />
        )}
      </Suspense>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={spinSpeed}
        enablePan
        enableZoom
        minDistance={variant === "stage" ? 1.2 : 1.1}
        maxDistance={variant === "stage" ? 5.2 : 4.8}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.7}
        onStart={onInteractStart}
        onEnd={onInteractEnd}
      />
    </>
  );
}

/**
 * Reusable local-GLB product viewer for hardware cards and featured stages.
 */
export function HardwareModelViewer({
  src,
  title = "Hardware product",
  frame = "default",
  variant = "well",
}: HardwareModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible) setShouldLoad(true);
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
      className={
        variant === "stage" ? STAGE_SHELL : `${hwViewerWellClass} shrink-0`
      }
      style={
        variant === "stage"
          ? { boxShadow: loaded ? hwStageShadow : "0 10px 30px rgba(0,0,0,0.04)" }
          : undefined
      }
      onPointerEnter={(e) => {
        handleInteractStart();
        if (variant === "stage") {
          (e.currentTarget as HTMLElement).style.boxShadow = hwStageShadowHover;
        }
      }}
      onPointerLeave={(e) => {
        handleInteractEnd();
        if (variant === "stage") {
          (e.currentTarget as HTMLElement).style.boxShadow = hwStageShadow;
        }
      }}
    >
      {variant === "stage" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[18%] bottom-[12%] top-[55%] rounded-full transition-opacity duration-1000"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)",
            opacity: loaded ? 1 : 0,
            filter: "blur(18px)",
          }}
        />
      )}
      <div
        className={`relative h-full w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          loaded
            ? "scale-100 opacity-100"
            : variant === "stage"
              ? "scale-[0.94] opacity-0"
              : "scale-95 opacity-0"
        }`}
      >
        {!loaded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[20px] opacity-100"
          >
            <div className="h-full w-full animate-pulse bg-[#EBEBEB]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[72px] w-[96px] rounded-[12px] bg-white/70 shadow-sm" />
            </div>
          </div>
        )}

        {shouldLoad && (
          <Canvas
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{
              fov: variant === "stage" ? 30 : 35,
              near: 0.1,
              far: 100,
              position:
                variant === "stage" ? [1.15, 0.55, 2.65] : [0, 0.45, 2.6],
            }}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            frameloop={inView ? "always" : "demand"}
          >
            <SceneContent
              src={src}
              onReady={handleReady}
              autoRotate={autoRotate && inView}
              onInteractStart={handleInteractStart}
              onInteractEnd={handleInteractEnd}
              frame={frame}
              variant={variant}
            />
          </Canvas>
        )}
      </div>
    </div>
  );
}

export default HardwareModelViewer;
