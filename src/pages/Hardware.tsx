import { HardwareNav } from "../components/hardware/HardwareNav";
import {
  FeaturedSection,
  ProductGridSection,
  EcosystemSection,
  ComparisonSection,
  ContactlessSection,
  KitsSection,
  WhySection,
  SoftwareSection,
  GallerySection,
  StoriesSection,
  FaqSection,
  CtaSection,
} from "../components/hardware/HardwareSections";

export function Hardware() {
  return (
    <div className="isolate bg-white pt-14 [scroll-padding-top:9.75rem]">
      <HardwareNav />
      <FeaturedSection />
      <ProductGridSection />
      <EcosystemSection />
      <ComparisonSection />
      <ContactlessSection />
      <KitsSection />
      <WhySection />
      <SoftwareSection />
      <GallerySection />
      <StoriesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
