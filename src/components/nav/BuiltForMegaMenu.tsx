import { MegaMenu } from "./MegaMenu";
import { BUILT_FOR_MENU_SECTION } from "./builtForMenuData";

type BuiltForMegaMenuProps = {
  pathname: string;
  hash: string;
  onClose: () => void;
};

export function BuiltForMegaMenu({ pathname, hash, onClose }: BuiltForMegaMenuProps) {
  return (
    <MegaMenu
      menuId="built-for"
      ariaLabel="Chefgaa built for"
      leftTitle="Built For"
      previewLabel="Built For"
      section={BUILT_FOR_MENU_SECTION}
      pathname={pathname}
      hash={hash}
      onClose={onClose}
    />
  );
}
