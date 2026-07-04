import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { CarouselSlide } from "./carouselSlides";
import { CardVisual } from "./CardVisual";

type StoryCardProps = {
  slide: CarouselSlide;
  active: boolean;
};

export const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(
  function StoryCard({ slide, active }, ref) {
    const Icon = slide.icon;
    const isGradient = slide.bg.startsWith("linear");

    return (
      <article
        ref={ref}
        data-story-card
        className="story-card relative flex shrink-0 flex-col overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        style={{
          width: "clamp(320px, 88vw, 1000px)",
          height: "clamp(520px, 72vh, 640px)",
          background: isGradient ? slide.bg : slide.bg,
          backgroundColor: isGradient ? undefined : slide.bg,
          willChange: "transform, opacity, filter",
        }}
        aria-label={slide.title}
      >
        {/* Visual area */}
        <div className="relative min-h-0 flex-[1.15] overflow-hidden">
          <CardVisual type={slide.visual} accent={slide.accent} />
        </div>

        {/* Content area */}
        <div className="flex flex-col px-10 pb-10 pt-6 md:px-12 md:pb-12 md:pt-8">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-300"
              style={{
                backgroundColor: `${slide.accent}${active ? "28" : "18"}`,
                color: slide.accent,
              }}
            >
              <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-sf-pro-display text-[26px] font-semibold leading-tight tracking-[-0.02em] text-primary-ink md:text-[32px]">
                {slide.title}
              </h3>
              <p className="mt-1.5 text-[16px] font-medium leading-snug text-primary-ink/80 md:text-[18px]">
                {slide.tagline}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-[640px] text-[15px] leading-[1.55] text-mid-gray md:text-[16px]">
            {slide.description}
          </p>

          <Link
            to={slide.ctaHref}
            className="group mt-5 inline-flex w-fit items-center gap-1.5 text-[15px] font-medium transition-colors md:text-[16px]"
            style={{ color: slide.accent }}
          >
            {slide.cta}
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </article>
    );
  }
);
