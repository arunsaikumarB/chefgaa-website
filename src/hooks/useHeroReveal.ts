import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useHeroReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    const items = el.querySelectorAll("[data-hero-item]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  return ref;
}
