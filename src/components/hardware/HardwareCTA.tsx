import { Link } from "react-router-dom";
import { Reveal } from "../Reveal";
import { GhostButton } from "../Buttons";

export function HardwareCTA() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(500px,60vw)] w-[min(500px,60vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(250,144,64,0.18) 0%, rgba(237,60,24,0.06) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-sf-pro-display text-[32px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[48px] lg:text-[56px]">
            Ready to modernize your restaurant?
          </h2>
          <p className="mt-5 text-[18px] leading-[1.5] text-[#666666] md:text-[21px]">
            Book a live demo and see how Chefgaa hardware works with your operation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#ED3C18] px-8 py-3.5 text-[17px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Request Demo
            </Link>
            <GhostButton to="/contact">Contact Sales</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
