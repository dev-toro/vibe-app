import { Sandbox } from '../components/ui/sandbox';
import { PackageHome } from '../components/PackageHome';
import type { Package } from '../services/packageService';
import type { Asset } from '../components/Sidebar';

export function Renderer({ pkg, selectedAsset }: { pkg: Package, selectedAsset: Asset | null }) {
  if (selectedAsset) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Sandbox files={{ [selectedAsset.name + '.yaml']: { code: selectedAsset.yaml } }} />
      </div>
    );
  }
  return <PackageHome pkg={pkg} />;
}
