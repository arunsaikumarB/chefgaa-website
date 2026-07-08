import { HardwareHero, HardwareCategories } from "../components/hardware/HardwareHero";
import { FeaturedHardware } from "../components/hardware/FeaturedHardware";
import { HardwareEcosystem } from "../components/hardware/HardwareEcosystem";
import { WhyHardware } from "../components/hardware/WhyHardware";
import { ProductComparison } from "../components/hardware/ProductComparison";
import { HardwareGallery } from "../components/hardware/HardwareGallery";
import { SoftwareHardware } from "../components/hardware/SoftwareHardware";
import { CustomerSuccess } from "../components/hardware/CustomerSuccess";
import { HardwareCTA } from "../components/hardware/HardwareCTA";

export function Hardware() {
  return (
    <>
      <HardwareHero />
      <HardwareCategories />
      <FeaturedHardware />
      <HardwareEcosystem />
      <WhyHardware />
      <ProductComparison />
      <HardwareGallery />
      <SoftwareHardware />
      <CustomerSuccess />
      <HardwareCTA />
    </>
  );
}
