

import { Sandbox } from '../ui/sandbox';
import { PackageHome } from './package-home';
import type { Package } from '../../services/packageService';
import type { Asset } from './Sidebar';
import { L1_GROUPS, type L1Group } from './package-sidebar';

export function PackageRenderer({ pkg, selectedAsset, activeTab }: { pkg: Package, selectedAsset: Asset | null, activeTab?: string }) {

  // If an L1 experience (not 'browse') is selected, show a placeholder for each group item
  if (activeTab !== 'browse' && !selectedAsset) {
    const group: L1Group | undefined = L1_GROUPS.find((t: L1Group) => t.key === activeTab);
    if (group && group.assetTypes && group.assetTypes.length > 0) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
          {group.assetTypes.map((type: string) => (
            <div key={type} className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-8 min-w-[320px] min-h-[120px] bg-white shadow-sm">
              <div className="text-xl text-gray-700 font-semibold mb-2">{type}</div>
              <div className="text-gray-400 text-base">{type} experience coming soon...</div>
            </div>
          ))}
        </div>
      );
    }
    // fallback for groups without assetTypes
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-2xl text-gray-400 font-semibold">{group?.label || (activeTab ? (activeTab.charAt(0).toUpperCase() + activeTab.slice(1)) : '')} experience coming soon...</div>
      </div>
    );
  }
  if (selectedAsset) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Sandbox files={{ [selectedAsset.name + '.yaml']: { code: selectedAsset.yaml } }} />
      </div>
    );
  }
  return <PackageHome pkg={pkg} />;
}
