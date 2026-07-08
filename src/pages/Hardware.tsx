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
import { HardwareNav } from "../components/hardware/HardwareNav";

export function Hardware() {
  return (
    <>
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
    </>
  );
}
