import { useReducedMotion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import { BRAND_GRADIENT_MESH } from "../../lib/brand";

type BrandMeshGradientProps = {
  className?: string;
  /** 0 = calm, 1 = default motion */
  intensity?: number;
};

/**
 * Soft white-to-orange mesh gradient for hero sections.
 * Best on: Home, Hardware launch hero, final CTA bands.
 */
export function BrandMeshGradient({ className = "", intensity = 0.35 }: BrandMeshGradientProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <MeshGradient
        className="h-full w-full opacity-90"
        colors={[...BRAND_GRADIENT_MESH]}
        speed={reduce ? 0 : intensity}
        distortion={0.45}
        swirl={0.12}
        grainOverlay={0.04}
        fit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/85" />
    </div>
  );
}
