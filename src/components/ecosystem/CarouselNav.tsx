import { CAROUSEL_SLIDES } from "./carouselSlides";

type CarouselNavProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CarouselNav({ activeIndex, onSelect }: CarouselNavProps) {
  return (
    <nav
      className="flex flex-col items-center gap-5 pb-8 pt-4"
      aria-label="Feature carousel navigation"
    >
      {/* Dot indicators */}
      <div className="flex items-center gap-2.5">
        {CAROUSEL_SLIDES.map((slide, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to ${slide.title}`}
              aria-current={active ? "true" : undefined}
              className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: active ? 28 : 8,
                height: 8,
                backgroundColor: active ? "#ff6e14" : "rgba(0,0,0,0.15)",
              }}
            />
          );
        })}
      </div>

      {/* Text labels — hidden on small screens */}
      <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 md:flex">
        {CAROUSEL_SLIDES.map((slide, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(i)}
              className="text-[13px] font-medium transition-all duration-400"
              style={{
                color: active ? "#1d1d1f" : "rgba(0,0,0,0.35)",
                transform: active ? "scale(1.05)" : "scale(1)",
              }}
            >
              {slide.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
