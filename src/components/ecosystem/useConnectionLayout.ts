import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ANIMATION_ORDER, getFeature } from "./features";
import {
  buildCurvePath,
  elementCenterInContainer,
  type ConnectionLayout,
  type Point,
} from "./connectionPaths";

type UseConnectionLayoutOptions = {
  enabled: boolean;
  /** Re-run measurement when layout-affecting state changes. */
  deps?: unknown[];
};

const EMPTY_LAYOUT: ConnectionLayout = {
  width: 0,
  height: 0,
  hub: { x: 0, y: 0 },
  anchors: {},
};

export function useConnectionLayout(
  containerRef: React.RefObject<HTMLElement | null>,
  hubRef: React.RefObject<HTMLElement | null>,
  anchorRefs: React.MutableRefObject<Record<string, HTMLElement | null>>,
  { enabled, deps = [] }: UseConnectionLayoutOptions
) {
  const [layout, setLayout] = useState<ConnectionLayout>(EMPTY_LAYOUT);
  const [paths, setPaths] = useState<Record<string, string>>({});
  const rafRef = useRef(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const hub = hubRef.current;
    if (!container || !hub || !enabled) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width < 1 || height < 1) return;

    const hubPoint = elementCenterInContainer(hub, container);
    const anchors: Record<string, Point> = {};
    const nextPaths: Record<string, string> = {};

    for (const id of ANIMATION_ORDER) {
      const anchorEl = anchorRefs.current[id];
      if (!anchorEl) continue;

      const point = elementCenterInContainer(anchorEl, container);
      anchors[id] = point;

      const feature = getFeature(id);
      nextPaths[id] = buildCurvePath(
        hubPoint.x,
        hubPoint.y,
        point.x,
        point.y,
        feature?.zone
      );
    }

    setLayout({ width, height, hub: hubPoint, anchors });
    setPaths(nextPaths);
  }, [anchorRefs, containerRef, enabled, hubRef]);

  const scheduleMeasure = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    if (!enabled) {
      setLayout(EMPTY_LAYOUT);
      setPaths({});
      return;
    }

    scheduleMeasure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => scheduleMeasure());
    observer.observe(container);

    const observedAnchors = new Set<HTMLElement>();
    const observeAnchors = () => {
      for (const id of ANIMATION_ORDER) {
        const el = anchorRefs.current[id];
        if (el && !observedAnchors.has(el)) {
          observer.observe(el);
          observedAnchors.add(el);
        }
      }
      const hub = hubRef.current;
      if (hub && !observedAnchors.has(hub)) {
        observer.observe(hub);
        observedAnchors.add(hub);
      }
    };

    observeAnchors();
    const anchorPoll = window.setInterval(observeAnchors, 200);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.clearInterval(anchorPoll);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure);
    };
  }, [anchorRefs, containerRef, enabled, hubRef, scheduleMeasure, ...deps]);

  return { layout, paths, remeasure: scheduleMeasure };
}
