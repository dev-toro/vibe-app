import { Sandbox } from '../components/ui/sandbox';
import { PackageHome } from '../components/PackageHome';
import type { Package } from '../services/packageService';
import type { Asset } from '../components/Sidebar';

export function PackageRenderer({ pkg, selectedAsset, activeTab }: { pkg: Package, selectedAsset: Asset | null, activeTab?: string }) {
  // If an L1 experience (not 'browse') is selected, show a placeholder
  console.log(activeTab, selectedAsset)
  if (activeTab && activeTab !== 'browse') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-2xl text-gray-400 font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} experience coming soon...</div>
      </div>
    );
  }
  if (activeTab === 'browse' && selectedAsset) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Sandbox files={{ [selectedAsset.name + '.yaml']: { code: selectedAsset.yaml } }} />
      </div>
    );
  }
  return <PackageHome pkg={pkg} />;
}
