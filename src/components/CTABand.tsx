import { Section } from "./Section";
import { PrimaryButton, ArrowLink } from "./Buttons";
import { Reveal } from "./Reveal";
import { BrandMeshGradient } from "./effects/BrandMeshGradient";

type CTABandProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  bg?: "white" | "gray" | "gradient";
};

/** Closing call-to-action band with optional brand gradient. */
export function CTABand({
  title = "Ready to get started?",
  subtitle = "See how Chefgaa can transform your restaurant operations.",
  primaryLabel = "Request a Demo",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
  bg = "gray",
}: CTABandProps) {
  return (
    <Section bg={bg === "gray" ? "gray" : "white"} className="relative overflow-hidden">
      {bg === "gradient" && <BrandMeshGradient intensity={0.2} />}
      <Reveal className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-sf-pro-display text-[32px] font-semibold leading-[1.07] tracking-[-0.01em] md:text-[40px] lg:text-[56px] lg:tracking-[-0.2px]">
          {title}
        </h2>
        <p className="mt-5 max-w-[560px] text-[19px] leading-[1.4] text-mid-gray md:text-[21px]">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <PrimaryButton to={primaryTo}>{primaryLabel}</PrimaryButton>
          {secondaryLabel && secondaryTo && (
            <ArrowLink to={secondaryTo}>{secondaryLabel}</ArrowLink>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
