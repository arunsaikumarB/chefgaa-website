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
