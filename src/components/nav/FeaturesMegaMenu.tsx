import { MegaMenu } from "./MegaMenu";
import { FEATURE_MENU_SECTION } from "./featuresMenuData";

type FeaturesMegaMenuProps = {
  pathname: string;
  hash: string;
  onClose: () => void;
};

export function FeaturesMegaMenu({ pathname, hash, onClose }: FeaturesMegaMenuProps) {
  return (
    <MegaMenu
      menuId="features"
      ariaLabel="Chefgaa features"
      leftTitle="Features"
      previewLabel="Discover"
      section={FEATURE_MENU_SECTION}
      pathname={pathname}
      hash={hash}
      onClose={onClose}
    />
  );
}
